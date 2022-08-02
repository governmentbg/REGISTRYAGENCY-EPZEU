import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ObjectHelper, SelectListItem } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import {
  attributesClassFormControl,
  attributesClassFormControlDisabled,
  attributesClassFormControlMaxL4, attributesClassFormControlMaxL9,
  AutoComplete,
  Country,
  EPZEUBaseComponent,
  fieldTitleLabelAttributes,
  fieldTittleRequiredAttributes,
  ValidationSummary,
  ValidationSummaryStrategy
} from 'EPZEU.Core';
import {
  Constants,
  NomenclaturesPR
} from 'EPZEU.PR.Core';
import {
  ValidationSummaryPreviewUI,
  ApplicationInfoUI,
  ValidationSummaryErrorsPreviewUI,
  LegalEntityDataService,
  Country as CurrentCountry
} from 'EPZEU.PR.ApplicationBase';
import { LegalEntity } from '../Models/LegalEntity';
import { LegalEntityValidator } from "../Models/Validators/LegalEntityValidator";


interface LegalEntityProps extends AsyncUIProps, BaseProps {
  showCompanyCase?: boolean;
  infoTextKey?: string;
  isCorrectiveApplication?: boolean;
}

const EMPTY_PROP_NAME = [''];
const COUNTRY_CODE = ['country.code'];
const LEGAL_ENTITY_NUMBER = ['legalEntityNumber'];
const COMMUNICATION_ERROR_LEGAL_ENTITY_NUMBER_EXCEPTION = ["communicationError", "legalEntityNumberExceptionError"];
const COMPANY_CASE_NUMBER_YEAR_AND_REGISTRATION_COURT_NAME = ['companyCase.number', 'companyCase.year', 'companyCase.registrationCourt.name'];

@observer
export class LegalEntityUIImpl extends EPZEUBaseComponent<LegalEntityProps, LegalEntity> {
  @observable countries: Country[];
  @observable _registrationCourts: SelectListItem[];
  @observable disableCompanyName: boolean = false;
  private _service: LegalEntityDataService;

  constructor(props?: LegalEntityProps) {
    super(props);
    this._registrationCourts = [];
    this._service = new LegalEntityDataService();

    this.getCountries();

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCountrySelectOption = this.handleCountrySelectOption.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleLegalEntityNumberChange = this.handleLegalEntityNumberChange.bind(this);

    this.getRegistrationCourts = this.getRegistrationCourts.bind(this);
    this.handleRegistrationCourtSelectOption = this.handleRegistrationCourtSelectOption.bind(this);
    this.extractData = this.extractData.bind(this);


    this.getRegistrationCourts();
  }


  private handleLegalEntityNumberChange() {
    if (this.disableCompanyName) {
      this.disableCompanyName = false;
      this.model.companyName = "";
    }
  }

  private getCountries(): void {
    this.countries = new Array<Country>();
    NomenclaturesPR.getSortedCountries().then(cc => {
      runInAction(() => {
        cc.map(ccChilds => {
          if (!this.model.country.name && ccChilds.code_ISO3166 == Constants.BG_COUNTRY_CODE && !this.model.country.code_ISO3166) {
            // ако от този таб отидем на друг, в този модел остават грешки (ако няма въведена държава).
            // После се връщаме на този таб и грешките стоят, въпреки че тук сетватме държавата.
            this.model.country.clearErrors();
            this.model.country.code_ISO3166 = ccChilds.code_ISO3166;
            this.model.country.name = ccChilds.name;
          }
          this.countries.push(ccChilds);
        })
      })
    });
  }

  private getRegistrationCourts(): void {
    if (this.props.showCompanyCase) {
      this.props.registerAsyncOperation(NomenclaturesPR.getSortedAuthorities((authority) => authority.authoritySybtype == 2).then(authorities => {
        runInAction(() => {
          authorities.map(authority => {
            this._registrationCourts.push(new SelectListItem(
              {
                selected: false,
                text: authority.authorityName,
                value: authority.authorityID
              }));
          })
        })
      }));
    }
  }

  renderEdit(): JSX.Element {
    let infotextKey = (ObjectHelper.isStringNullOrEmpty(this.props.infoTextKey) == false) ? this.props.infoTextKey : (this.props.showCompanyCase ? 'PR_APP_00035_I' : 'PR_APP_00003_I')
    return <>
      <ValidationSummary key="communicationError" {...this.props}
        propNames={COMMUNICATION_ERROR_LEGAL_ENTITY_NUMBER_EXCEPTION}
        strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
      />
      <ApplicationInfoUI infoTextKey={infotextKey} />
      <ValidationSummary key="legalEntityErrors" {...this.props} propNames={EMPTY_PROP_NAME}
        strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
      />
      <div className="field-container">
        <div className="row">
          <div className="col-sm-6">
            {this.labelFor(m => m.country.name, 'GL_COUNTRY_L', fieldTittleRequiredAttributes)}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            <AutoComplete {...this.bind(m => m.country.name)}
              handleChangeCallback={this.handleCountryChange}
              selector={this.selectCountry}
              showValue={this.showCountryValue}
              hasSelectedValue={this.model.country && this.model.country.code_ISO3166 && this.model.country.name && this.model.country.name != "" ? true : false}
              handleSelectCallback={this.handleCountrySelectOption}
              triggerLength={1}
              attributes={attributesClassFormControl}
            />
          </div>
        </div>
      </div>

      {this.model.country.code_ISO3166 == Constants.BG_COUNTRY_CODE
        ? <div className="field-container">
          <div className="row">
            <div className="col-6">
              {this.labelFor(m => m.legalEntityNumber, 'PR_GL_COMPANY_ID_BULSTAT_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.props.isCorrectiveApplication ?
                <div className="form-text">{this.model.legalEntityNumber}</div>
                :
                this.textBoxFor(m => m.legalEntityNumber, attributesClassFormControlMaxL9, this.handleLegalEntityNumberChange)}
            </div>
            <div className="form-group col-sm-6">
              <button className="btn btn-outline-light text-dark" onClick={this.extractData}
                disabled={this.props.isCorrectiveApplication}>
                <i className="ui-icon ui-icon-import" aria-hidden="true"></i>
                &nbsp;{this.getResource('GL_EXTRACT_DATA_L')}
              </button>
            </div>
          </div>
        </div>
        : null
      }

      {this.props.showCompanyCase && this.model.country.code_ISO3166 == Constants.BG_COUNTRY_CODE
        ? <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.companyCase, 'PR_COMPANY_CASE_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6 col-sm-3">
              {this.labelFor(m => m.companyCase.number, 'GL_NUMBER_L')}
              {this.textBoxFor(m => m.companyCase.number)}
            </div>
            <div className="form-group col-6 col-sm-3">
              {this.labelFor(m => m.companyCase.year, 'GL_YEAR_L')}
              {this.textBoxFor(m => m.companyCase.year, attributesClassFormControlMaxL4)}
            </div>
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.companyCase.registrationCourt.id, 'PR_REGISTRATION_COURT_L')}
              {this.dropDownListFor(m => m.companyCase.registrationCourt.id, this._registrationCourts, attributesClassFormControl, this.handleRegistrationCourtSelectOption, true)}
            </div>
          </div>
        </div>
        : null
      }

      <div className="field-container">
        <div className="row">
          <div className="form-group col-12">
            {this.labelFor(m => m.companyName, 'PR_APP_COMPANY_NAME_AND_LEGAL_FORM_L', fieldTittleRequiredAttributes)}
            {this.disableCompanyName ?
              <React.Fragment
                key="disabled">{this.textBoxFor(m => m.companyName, attributesClassFormControlDisabled)}</React.Fragment>
              : <React.Fragment
                key="enabled">{this.textBoxFor(m => m.companyName, attributesClassFormControl)}</React.Fragment>
            }
          </div>
        </div>
      </div>

      {this.model.country.code_ISO3166 != Constants.BG_COUNTRY_CODE
        ?
        <div className="field-container">
          <div className="row">
            <div className="form-group col-sm-12">
              {this.labelFor(m => m.id, 'PR_APP_ID_L', fieldTitleLabelAttributes)}
              {this.textBoxFor(m => m.id, attributesClassFormControl)}
            </div>
          </div>
        </div>
        : null}
    </>
  }

  renderDisplay(): JSX.Element {
    return <>
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('GL_COUNTRY_L')}</h3>
        <p className="field-text">
          {this.model.country.code_ISO3166 && this.model.country.name && <> {this.model.country.name}</>}
        </p>
        <ValidationSummaryPreviewUI key="country" {...this.props} propNames={COUNTRY_CODE}
          strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          model={this.model} />
      </div>
      <div className="field-container">
        <ValidationSummaryErrorsPreviewUI errors={this.model.getModelErrors()} />
      </div>

      {this.model.country.code_ISO3166 == Constants.BG_COUNTRY_CODE
        ? <>
          {this.model.legalEntityNumber ?
            <div className="field-container">
              <h3 className="field-title field-title--preview">{this.getResource('PR_GL_COMPANY_ID_BULSTAT_L')}</h3>
              <p className="field-text">
                {this.model.legalEntityNumber && <> {this.model.legalEntityNumber}</>}
              </p>
              <ValidationSummaryPreviewUI key="companyIdBulstat" {...this.props} propNames={LEGAL_ENTITY_NUMBER}
                strategy={ValidationSummaryStrategy.excludeAllExcept}
                includeErrorsRecursive={true}
                model={this.model} />
            </div>
            : null}
          {this.model.companyCase && this.props.showCompanyCase && (this.model.companyCase.number || this.model.companyCase.year || this.model.companyCase.registrationCourt.id)
            ? <div className="field-container">
              <h3 className="field-title field-title--preview">{this.getResource('PR_COMPANY_CASE_L')}</h3>
              <p className="field-text">
                {this.model.companyCase && this.model.companyCase.number && <> {this.model.companyCase.number + '/'}</>}
                {this.model.companyCase && this.model.companyCase.year && <> {this.model.companyCase.year + ','}</>}
                {this.model.companyCase && this.model.companyCase.registrationCourt.name && <> {this.model.companyCase.registrationCourt.name}</>}
              </p>
              <ValidationSummaryPreviewUI key="companyCase" {...this.props}
                propNames={COMPANY_CASE_NUMBER_YEAR_AND_REGISTRATION_COURT_NAME}
                strategy={ValidationSummaryStrategy.excludeAllExcept}
                includeErrorsRecursive={true}
                model={this.model} />
            </div>
            : null
          }
        </>
        : null
      }
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_COMPANY_NAME_AND_LEGAL_FORM_L')}</h3>
        <p className="field-text">
          {this.model.companyName && <> {this.model.companyName}</>}
        </p>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('companyName')} />
      </div>
      {this.model.id && this.model.country.code_ISO3166 != Constants.BG_COUNTRY_CODE
        ? <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_APP_ID_L')}</h3>
          <p className="field-text">
            {this.model.id && <> {this.model.id}</>}
          </p>
        </div>
        : null}
    </>
  }

  @action
  private extractData() {
    let legalEntityValidator = new LegalEntityValidator();

    if (ObjectHelper.isStringNullOrEmpty(this.model.legalEntityNumber)) {
      if (this.model.getPropertyErrors('legalEntityNumber').length == 0) {
        this.model.addError('legalEntityNumber', this.getResource('PR_APP_00050_E'));
      }
    } else {
      if (legalEntityValidator.validateProperty('legalEntityNumber', this.model)) {
        this.props.registerAsyncOperation(this._service.searchLegalEntity(this.model.legalEntityNumber).then((legalEntity) => {
          this.model.removeError('communicationError');
          if (ObjectHelper.isArrayNullOrEmpty(legalEntity)) {
            this.disableCompanyName = false;
            this.model.companyName = null;
            if (this.model.getPropertyErrors('').length == 0) {
              this.model.addError('', this.getResource('PR_APP_LEGAL_PERSON_NOT_FOUND_E'));
            }
          } else {
            this.model.removeError('');
            this.disableCompanyName = true;
            this.model.companyName = legalEntity.companyName;
          }
        }).catch((e: any) => {
          if (e.code === "PR_APP_00115_E") {
            if (this.model.getPropertyErrors("communicationError").length == 0) {
              this.model.addError("communicationError", this.getResource("PR_APP_00078_E"));
            }
          } else {
            if (this.model.getPropertyErrors("legalEntityNumberExceptionError").length == 0) {
              this.model.addError("legalEntityNumberExceptionError", this.getResource(e.code));
            }
          }
        }));
      }
    }
  }

  @action handleCountrySelectOption(value?: Country) {
    if (value) {
      this.model.country.name = value.name;
      this.model.country.code_ISO3166 = value.code_ISO3166;
    } else {
      this.model.country.name = null;
      this.model.country.code_ISO3166 = null;
    }
  }

  @action handleCountryChange() {
    if (this.model && this.model.country) {
      this.model.country.code_ISO3166 = null;
    }
  }

  @action handleRegistrationCourtSelectOption(e: any) {
    var value = e.target.value;
    if (value) {
      NomenclaturesPR.getSortedAuthorities().then(authorities => {
        var authorityFiltered = authorities.filter(filteredAuthority => value == filteredAuthority.authorityID)[0];

        runInAction(() => {
          this.model.companyCase.registrationCourt.name = authorityFiltered.authorityName;
          this.model.companyCase.registrationCourt.id = authorityFiltered.authorityID;
        })
      })
    } else {
      this.model.companyCase = null;
    }
  }

  selectCountry(value: string): Promise<Country[]> {
    var valueLowerCase = value.toLowerCase();

    if (valueLowerCase.trim() != "")
      return Promise.resolve(this.countries.filter(c => c.name.toLowerCase().indexOf(valueLowerCase) > -1));
    else
      return Promise.resolve([]);
  }

  showCountryValue(value: Country): string {
    return value.name;
  }

}
export const LegalEntityUI = withAsyncFrame(LegalEntityUIImpl);
