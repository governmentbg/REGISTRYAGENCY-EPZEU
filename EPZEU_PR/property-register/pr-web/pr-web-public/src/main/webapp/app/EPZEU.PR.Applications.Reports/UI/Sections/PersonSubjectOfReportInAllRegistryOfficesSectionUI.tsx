import * as moment from 'moment'
import * as React from "react";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, SelectListItem, withAsyncFrame } from "Cnsys.UI.React";
import {
  attributesClassFormControlMaxL10,
  attributesClassFormControlMaxL9,
  EPZEUBaseComponent,
  ValidationSummaryErrors
} from "EPZEU.Core";
import { NomenclaturesPR } from "EPZEU.PR.Core";
import {
  PersonType,
  LegalEntityDataService,
  SectionTitleUI,
  ValidationSummaryErrorsPreviewUI,
  PeriodForReportUI
} from "EPZEU.PR.ApplicationBase";
import { PersonSubjectOfReportInAllRegistryOfficesSection } from "../../Models/Sections/PersonSubjectOfReportInAllRegistryOfficesSection";
import { PersonSubjectOfReportInAllRegistryOfficesValidator } from "../../Models/Sections/Validators/PersonSubjectOfReportInAllRegistryOfficesValidator";

interface PersonSubjectForReportInAllRegistryOfficesSectionUIProps extends AsyncUIProps, BaseProps {

}

@observer
export class PersonSubjectForReportInAllRegistryOfficesSectionUIImpl extends EPZEUBaseComponent<PersonSubjectForReportInAllRegistryOfficesSectionUIProps, PersonSubjectOfReportInAllRegistryOfficesSection> {

  @observable private _selectListItemsForPersonType: SelectListItem[];
  @observable private _initialDateForReport: moment.Moment;
  @observable private _initialDateForReportAsString: string;

  private personTypeGroupName: string;

  private _service: LegalEntityDataService;

  constructor(props?: PersonSubjectForReportInAllRegistryOfficesSectionUIProps) {
    super(props);

    this._service = new LegalEntityDataService();
    this.personTypeGroupName = ObjectHelper.newGuid();
    this._selectListItemsForPersonType = [];

    this.extractData = this.extractData.bind(this);
    this.onPersonTypeChange = this.onPersonTypeChange.bind(this);

    this.initializeAllPersonTypes();

    if (!this._initialDateForReport) {
      this.getInitialDateForReport();
    }
  }


  private initializeAllPersonTypes(): void {
    this._selectListItemsForPersonType.push({
      selected: true,
      text: this.getResource('GL_INDIVIDUAL_L'),
      value: PersonType.INDIVIDUAL.toString()
    });
    this._selectListItemsForPersonType.push({
      selected: false,
      text: this.getResource('GL_LEGAL_ENTITY_L'),
      value: PersonType.LEGAL_ENTITY.toString()
    });
  }

  @action onPersonTypeChange(e: any) {
    var value = e.target.value;
    this.model.personType = value;
    this.clearFields();
  }

  @action clearFields(): void {
    this.model.legalEntityNumber = null;
    this.model.identity = null;
    this.model.clearErrors();
  }

  @action private extractData() {
    let validator: PersonSubjectOfReportInAllRegistryOfficesValidator = new PersonSubjectOfReportInAllRegistryOfficesValidator();
    if (ObjectHelper.isStringNullOrEmpty(this.model.legalEntityNumber)) {
      if (this.model.getPropertyErrors('legalEntityNumber').length == 0) {
        this.model.addError('legalEntityNumber', this.getResource('PR_APP_00050_E'));
      }
    } else {
      if (validator.validateProperty('legalEntityNumber', this.model)) {
        this.props.registerAsyncOperation(this._service.searchLegalEntity(this.model.legalEntityNumber).then((legalEntity) => {
          if (ObjectHelper.isArrayNullOrEmpty(legalEntity)) {

            this.model.companyName = null;
            if (this.model.getPropertyErrors('').length == 0) {
              this.model.addError('', this.getResource('PR_APP_LEGAL_PERSON_NOT_FOUND_E'));
            }
          }
          else {
            this.model.removeError('');
            this.model.companyName = legalEntity.companyName;
          }
        }));
      }
    }
  }

  @action private getInitialDateForReport(): void {
    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      this._initialDateForReport = registryOffices[0].startDate;
      registryOffices.map(registryOffice => {
        if (registryOffice.startDate.isBefore(this._initialDateForReport, 'days')) {
          this._initialDateForReport = registryOffice.startDate;
        }
      });
      this._initialDateForReportAsString = this._initialDateForReport.format("DD.MM.YYYY г.");
      this.model.periodForReport.minStartDate = this._initialDateForReport;
    }));
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_APP_00048_L'} anchor="personSubjectOfReportInAllRegistryOffices" />

        <div className="help-text"><p>{this.getResource("PR_APP_00024_I")}</p></div>
        <div className="alert alert-info">
          <p>
            {this.getResource("PR_APP_00021_L")}: <b>{this._initialDateForReportAsString}</b>
          </p>
        </div>
        <div className="field-container">
          <PeriodForReportUI {...this.bind(m => m.periodForReport)}
                             initialDateForReport={this._initialDateForReport}
                             isRequired={true}
          />
        </div>

        <div className="field-container">
          <div className="row">
            <div className="col-12">
              <label className="field-title field-title--form required-field" htmlFor="">
                {this.getResource("GL_PERSON_TYPE_L")}
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {this._selectListItemsForPersonType.map(personType => {
                return (
                  <div className="custom-control custom-radio" key={personType.value}>
                    <input className={"custom-control-input"} type="radio" onChange={this.onPersonTypeChange}
                      id={this.personTypeGroupName + personType.value} name={this.personTypeGroupName}
                      value={personType.value}
                      checked={!!this.model.personType && this.model.personType.toLocaleString() == personType.value} />
                    <label className={"custom-control-label"}
                      htmlFor={this.personTypeGroupName + personType.value}>{personType.text}</label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {this.model.personType && this.model.personType == PersonType.INDIVIDUAL ?


            <div className="field-container">
              <div className="row">
                <div className="form-group col-sm-4">
                  <label className="field-title field-title--form" htmlFor="searchSelect1">{this.getResource("GL_PERSON_ID_L")}</label>
                  {this.textBoxFor(m => m.identity, attributesClassFormControlMaxL10)}
              </div>
            </div>
            </div>
          :

            <>
            <div className="help-text"><p>{this.getResource("PR_APP_00052_I")}</p></div>
            <div className="field-container">
              <div className="row">
                <div className="col-12">
                  <label className="field-title field-title--form" htmlFor="">{this.getResource("PR_GL_COMPANY_ID_BULSTAT_L")}</label>
                </div>
              </div>
              <div className="row">
                <div className="form-group col col-sm-4">
                  {this.textBoxFor(m => m.legalEntityNumber, attributesClassFormControlMaxL9)}
                </div>
                <div className="form-group col-auto">
                  <button className="btn btn-outline-light text-dark" onClick={this.extractData}>
                    <i className="ui-icon ui-icon-import" aria-hidden="true"></i>
                    &nbsp;{this.getResource('PR_APP_CHECK_FOR_ENTERED_ACT_L')}
                  </button>
                </div>
              </div>
            </div>

            {
              this.model.companyName ?
                <div className="field-container">
                  <div className="row">
                    <div className="form-group col-12">
                      <label className="field-title field-title--form" htmlFor="">{this.getResource("PR_GL_COMPANY_NAME_L")}</label>
                      <p className="field-text">{this.model.companyName}</p>
                    </div>
                  </div>
                </div>
                : null
            }
            </>
        }

      </>
    )
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        <h2 className="section-title section-title--preview">{this.getResource("PR_APP_00048_L")}</h2>

        <ValidationSummaryErrors errors={this.model.getModelErrors()} />
        <div className="field-container">
          <h3 className="field-title field-title--preview">
            {this.model.personType && this.model.personType == PersonType.INDIVIDUAL ?
              this.getResource('GL_INDIVIDUAL_L')
              :
              this.getResource('GL_LEGAL_ENTITY_L')
            }
          </h3>
          <p className="field-text">

            {
              this.model.identity || this.model.legalEntityNumber || this.model.legalEntityNumber ?

                (this.model.personType && this.model.personType == PersonType.INDIVIDUAL && this.model.identity) ?
                  this.getResource("GL_PERSON_ID_L") + " "
                  :
                  this.getResource("GL_BULSTAT_L") + " "

                : null
            }

            {
              this.model.personType && this.model.personType == PersonType.LEGAL_ENTITY ?
                this.model.legalEntityNumber
                :
                (this.model.personType && this.model.personType == PersonType.INDIVIDUAL && this.model.identity) ?
                  this.model.identity
                  :
                  this.model.legalEntityNumber
            }

            <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('identity')} />
            <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('legalEntityNumber')} />

          </p>
        </div>

        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource("PR_APP_00022_L")}</h3>
          <p className="field-text">
            {
              this.model.periodForReport && this.model.periodForReport.startDate ?
                this.dateDisplayFor(this.model.periodForReport.startDate) + " - " + (this.model.periodForReport.endDate ? this.dateDisplayFor(this.model.periodForReport.endDate) : this.getResource("PR_UNTIL_REPORT_DAY_L"))
                : null
            }
          </p>
          <ValidationSummaryErrorsPreviewUI errors={this.model.periodForReport.getModelErrors()} />
        </div>

      </>
    )
  }
}
export const PersonSubjectForReportInAllRegistryOfficesSectionUI = withAsyncFrame(PersonSubjectForReportInAllRegistryOfficesSectionUIImpl);
