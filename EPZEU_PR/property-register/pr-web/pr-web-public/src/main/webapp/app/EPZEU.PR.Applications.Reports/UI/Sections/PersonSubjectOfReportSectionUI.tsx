import * as React from "react";
import * as moment from "moment";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AsyncUIProps, BaseProps, RawHTML, withAsyncFrame } from "Cnsys.UI.React";
import {
  Button,
  EPZEUBaseComponent, resourceManager,
  ValidationSummary,
  ValidationSummaryStrategy
} from "EPZEU.Core";
import { ApplicationFormTypes, NomenclaturesPR} from 'EPZEU.PR.Core';
import {  
  ApplicationInfoUI, 
  PeriodForReport,
  SectionTitleUI,
  ValidationSummaryErrorsPreviewUI,
  PeriodForReportUI
} from "EPZEU.PR.ApplicationBase";

import { SearchPersonsOfReport } from "../../Models/SearchPersonsOfReport";
import { SearchPersonsOfReportUI } from "../SearchPersonsOfReportUI";
import { RequestForReportOfPerson } from "../../Models/RequestForReportOfPerson";
import { SearchPersonsForReportValidator } from "../../Models/Validators/SearchPersonsForReportValidator";
import { PersonSubjectOfReportSection } from "../../Models/Sections/PersonSubjectOfReportSection";



interface PersonSubjectOfReportSectionUIProps extends AsyncUIProps, BaseProps {
}

const REQUEST_FOR_REPORT_OF_PERSON = ['requestsForReportOfPerson'];

@observer export class PersonSubjectOfReportSectionUIImpl extends EPZEUBaseComponent<PersonSubjectOfReportSectionUIProps, PersonSubjectOfReportSection> {

  @observable private showModal: boolean;
  @observable private _initialDateForReport: moment.Moment;

  private searchPersonsForReport: SearchPersonsOfReport;
  private searchPersonsForReportValidator: SearchPersonsForReportValidator;

  constructor(props?: PersonSubjectOfReportSectionUIProps) {
    super(props);

    this.showModal = false;
    this.searchPersonsForReport = new SearchPersonsOfReport();
    this.searchPersonsForReportValidator = new SearchPersonsForReportValidator();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showSelectRows = this.showSelectRows.bind(this);
    this.removeRequestForReportOfPerson = this.removeRequestForReportOfPerson.bind(this);
    
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_SELECTED_INDIVIDUALS_L'} anchor="personSubjectOfReportUI" />
        <ValidationSummary key="requestsForReportOfPerson" {...this.props} propNames={REQUEST_FOR_REPORT_OF_PERSON}
          strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
        />
        {this.model.requestsForReportOfPerson && this.model.requestsForReportOfPerson.length > 0 ?
          <>
            <ApplicationInfoUI infoTextKey={"PR_APP_00024_I"} />
            {this.model.requestsForReportOfPerson.map((requestForReportOfPerson, index) => {
              return (
                <React.Fragment key={index}>
                  <div id={"person_" + index} className="interactive-container interactive-container--form" key={"person_" + index}>
                    <div className="interactive-container__content record-container">
                      <div className="row">
                        <div className="form-group col-12">

                          <RawHTML divClassname="field-container" rawHtmlText={requestForReportOfPerson.personOfReport.toString()} />

                          <div className="field-container">

                            {requestForReportOfPerson.personOfReport.registryOffice.name + ", "}
                            <span className="field-title field-title--preview">{this.getResource('PR_APP_00021_L') + ": "}</span>
                            {this.dateDisplayFor(requestForReportOfPerson.personOfReport.registryOffice.startDate) + " г."}
                          </div>
                        </div>
                      </div>
                      <PeriodForReportUI {...this.bindArrayElement(m => m.requestsForReportOfPerson[index].periodForReport, [index])}
                        initialDateForReport={requestForReportOfPerson.personOfReport.registryOffice.startDate}
                      />

                    </div>
                    <div className="interactive-container__controls">
                      <Button type="button" className="btn btn-outline-light btn-sm"
                        titlekey="GL_DELETE_L" onClick={() => this.removeRequestForReportOfPerson(requestForReportOfPerson)}
                              onMouseOver={()=>{$('#person_' + index).addClass('interactive-container--focus')}}
                              onMouseOut={()=>{$('#person_' + index).removeClass('interactive-container--focus')}}>
                        <i className="ui-icon ui-icon-times" aria-hidden="true"></i>
                      </Button>
                    </div>
                  </div>
                  {index < this.model.requestsForReportOfPerson.length - 1  ? <hr className="hr--doted-line"></hr> : null}
                </React.Fragment>
              )
            })}

          </>
          : null}
        {this.model.requestsForReportOfPerson.length > 0  ? <hr /> : null}
        <Button type="button" className="btn btn btn-outline-light text-dark"
          lableTextKey="PR_APP_ADD_PERSON_L" onClick={this.openModal}>
          <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
        </Button>

        <Modal centered={true} backdrop={"static"} keyboard={false} className="modal-lg" autoFocus={true} isOpen={this.showModal}
          onExit={this.closeModal} toggle={this.closeModal}>
          <ModalHeader toggle={() => this.showModal = !this.showModal}>
            {this.getResource('PR_APP_ADDING_PERSON_L')}
          </ModalHeader>
          <ModalBody>
            <SearchPersonsOfReportUI
              {...this.bind(this.searchPersonsForReport, "searchPersonsForReport", [this.searchPersonsForReportValidator])}
              totalSubjectsOfReportCount={this.model.requestsForReportOfPerson.length}
            ></SearchPersonsOfReportUI>
          </ModalBody>
          <ModalFooter>
            <div className="button-bar">
              <div className="left-side">
                <Button type="button" className="btn btn-secondary"
                  lableTextKey="GL_REFUSE_L" onClick={this.closeModal}>
                </Button>
              </div>
              <div className="right-side">
                <Button type="button" className="btn btn-primary"
                  lableTextKey="GL_ADD_L" onClick={this.showSelectRows}
                  disabled={this.searchPersonsForReport.items.length <= 0 || this.searchPersonsForReport.getPropertyErrors("maxAllowedNumberOfObjects").length > 0}>
                </Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      </>)
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        <h2 className="section-title section-title--preview">{this.getResource("PR_SELECTED_INDIVIDUALS_L")}</h2>

        {this.model.requestsForReportOfPerson && this.model.requestsForReportOfPerson.length > 0 ?
          this.model.requestsForReportOfPerson.map((requestForReportOfPerson, index) => {
            return (
              <React.Fragment key={index}>
                <RawHTML divClassname="field-container" rawHtmlText={requestForReportOfPerson.personOfReport.toString()} />

                <div className="field-container">
                  <p className="field-text">

                    {requestForReportOfPerson.personOfReport.registryOffice.name}
                  </p>
                  <p className="field-text">
                    <span className="field-title field-title--preview">{this.getResource('PR_APP_00022_L') + ": "}</span>
                    {this.dateDisplayFor(requestForReportOfPerson.periodForReport.startDate) + " - " + (this.dateDisplayFor(requestForReportOfPerson.periodForReport.endDate)
                      ? this.dateDisplayFor(requestForReportOfPerson.periodForReport.endDate) : this.getResource("PR_UNTIL_REPORT_DAY_L"))}
                  </p>
                  <ValidationSummaryErrorsPreviewUI errors={requestForReportOfPerson.periodForReport.getModelErrors()} />
                  {requestForReportOfPerson.cost !== undefined ?
                    <p className="field-text">
                      <span className="field-title field-title--preview">{this.getResource("GL_DUE_FEE_L") + ": "}</span>
                      {requestForReportOfPerson.cost.toFixed(2)} {this.getResource("GL_BGN_ABBRAVETION_L")}
                    </p>
                    : null
                  }
                </div>
                {index < this.model.requestsForReportOfPerson.length - 1  ? <hr className="hr--preview"></hr> : null}
              </React.Fragment>
            )
          })
          : null}
      </>)
  }

  @action
  private openModal(): void {
    this.showModal = true;
  }

  @action
  private closeModal(): void {
    this.showModal = false;
  }

  @action
  private showSelectRows(): void {
    let criteriaValidator = new SearchPersonsForReportValidator();
    if (criteriaValidator.validate(this.searchPersonsForReport)) {
      this.searchPersonsForReport.items.map(item => {
        if (this.model.requestsForReportOfPerson.map(e => e.personOfReport.id).indexOf(item.id) < 0) {
          var requestForReportOfPersion = new RequestForReportOfPerson();

          requestForReportOfPersion.periodForReport = new PeriodForReport();
          requestForReportOfPersion.periodForReport.startDate = item.registryOffice.startDate;
          requestForReportOfPersion.personOfReport = item;
          this.props.registerAsyncOperation(NomenclaturesPR.getApplicationTypes().then(applicationTypes => {
            var reportForPersonAppType = applicationTypes.filter(filteredAppType => ApplicationFormTypes.RequestForReportForPerson == filteredAppType.appType)[0];

            requestForReportOfPersion.cost = reportForPersonAppType.prices[0].price;
          }));

          this.model.requestsForReportOfPerson.push(requestForReportOfPersion);
        }
      });
      this.searchPersonsForReport.items = [];
      this.showModal = false;
    }
  }

  @action
  private removeRequestForReportOfPerson(requestForReportOfPerson: RequestForReportOfPerson) {
    let index = this.model.requestsForReportOfPerson.indexOf(requestForReportOfPerson);
    if (index > -1) {
      this.model.requestsForReportOfPerson.splice(index, 1);
    }
  }
}

export const PersonSubjectOfReportSectionUI = withAsyncFrame(PersonSubjectOfReportSectionUIImpl);
