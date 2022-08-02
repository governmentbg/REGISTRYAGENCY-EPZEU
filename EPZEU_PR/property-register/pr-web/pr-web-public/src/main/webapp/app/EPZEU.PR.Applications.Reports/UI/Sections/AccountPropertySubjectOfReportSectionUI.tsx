import {Button, EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy} from "EPZEU.Core";
import {AsyncUIProps, BaseProps, RawHTML, withAsyncFrame} from "Cnsys.UI.React";
import { AccountPropertySubjectOfReportSection } from "../../Models/Sections/AccountPropertySubjectOfReportSection";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import * as React from "react";
import { NomenclaturesPR, ApplicationFormTypes } from "EPZEU.PR.Core";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { SearchAccountPropertiesForReport } from "../../Models/SearchAccountPropertiesForReport";
import { SearchAccountPropertiesForReportUI } from "../SearchAccountPropertiesForReportUI";
import { SearchAccountPropertiesForReportValidator } from "../../Models/Validators/SearchAccountPropertiesForReportValidator";
import {RequestForReportOfAccountProperty} from "../../Models/RequestForReportOfAccountProperty";

interface AccountPropertySubjectOfReportSectionUIProps extends AsyncUIProps, BaseProps {
}

const REQUEST_FOR_REPORT_OF_ACCOUNT_PROPERTY = ["requestsForReportOfAccountProperty"];

@observer
export class AccountPropertySubjectOfReportSectionUIImpl extends EPZEUBaseComponent<AccountPropertySubjectOfReportSectionUIProps, AccountPropertySubjectOfReportSection> {

  @observable private showModal: boolean;

  private searchAccountsForReport: SearchAccountPropertiesForReport;
  private searchAccountsForReportValidator: SearchAccountPropertiesForReportValidator;

  constructor(props?: AccountPropertySubjectOfReportSectionUIProps) {
    super(props);

    this.showModal = false;
    this.searchAccountsForReport = new SearchAccountPropertiesForReport();
    this.searchAccountsForReportValidator = new SearchAccountPropertiesForReportValidator();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showSelectRows = this.showSelectRows.bind(this);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <h2 className="section-title section-title--preview">{this.getResource("PR_SELECTED_ACCOUNT_PROPERTIES_L")}</h2>

        <ValidationSummary key="requestsForReportOfAccountProperty" {...this.props} propNames={REQUEST_FOR_REPORT_OF_ACCOUNT_PROPERTY}
                           strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
        />
        {this.model.requestsForReportOfAccountProperty && this.model.requestsForReportOfAccountProperty.length > 0 ?
          this.model.requestsForReportOfAccountProperty.map((account, index) => {
            return (
              <React.Fragment key={index}>
                <div id={"accproperty_" + index} className="interactive-container interactive-container--form" >
                  <div className="interactive-container__content record-container">
                    <div className="row">
                      <div className="form-group col-12">
                        <RawHTML divClassname="field-container" rawHtmlText={account.accountPropertyOfReport.toString()}/>
                        <div className="field-container">
                          <p className="field-text">
                            {account.accountPropertyOfReport.registryOffice.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="interactive-container__controls">

                    <Button type="button" className="btn btn-outline-light btn-sm"
                            titlekey="GL_DELETE_L" onClick={() => this.removeAccount(account)}
                            onMouseOver={()=>{$('#accproperty_' + index).addClass('interactive-container--focus')}}
                            onMouseOut={()=>{$('#accproperty_' + index).removeClass('interactive-container--focus')}}>
                      <i className="ui-icon ui-icon-times" aria-hidden="true"></i>
                    </Button>
                  </div>
                </div>
                {index < this.model.requestsForReportOfAccountProperty.length - 1  ? <hr className="hr--doted-line"></hr> : null}
              </React.Fragment>
            )
          })
          : null}
        {this.model.requestsForReportOfAccountProperty.length > 0  ? <hr /> : null}
        <Button type="button" className="btn btn btn-outline-light text-dark"
                lableTextKey="PR_APP_ADD_ACCOUNT_L" onClick={this.openModal}>
          <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
        </Button>

        <Modal centered={true} backdrop={"static"} keyboard={false} className="modal-lg" autoFocus={true} isOpen={this.showModal}
               onExit={this.closeModal} toggle={this.closeModal}>
          <ModalHeader toggle={() => this.showModal = !this.showModal}>
            {this.getResource('PR_APP_ADDING_ACCOUNT_L')}
          </ModalHeader>
          <ModalBody>
            <SearchAccountPropertiesForReportUI
              {...this.bind(this.searchAccountsForReport, "searchDocumentsForReport", [this.searchAccountsForReportValidator])}
              totalSubjectsOfReportCount={this.model.requestsForReportOfAccountProperty.length}
            ></SearchAccountPropertiesForReportUI>
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
                        lableTextKey="GL_ADD_L" onClick={this.showSelectRows} disabled={this.searchAccountsForReport.items.length<=0 || this.searchAccountsForReport.getPropertyErrors("maxAllowedNumberOfObjects").length > 0}>
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
        <h2 className="section-title section-title--preview">{this.getResource("PR_SELECTED_ACCOUNT_PROPERTIES_L")}</h2>

        {this.model.requestsForReportOfAccountProperty && this.model.requestsForReportOfAccountProperty.length > 0 ?
          this.model.requestsForReportOfAccountProperty.map((account, index) => {
            return (
              <>

                <RawHTML divClassname="field-container" rawHtmlText={account.accountPropertyOfReport.toString()}/>

                <div className="field-container">
                  <p className="field-text">
                    {account.accountPropertyOfReport.registryOffice.name}
                  </p>
                  { account.cost !== undefined ?
                    <p className="field-text">
                      <span className="field-title field-title--preview">{this.getResource("GL_DUE_FEE_L") + ": "}</span>
                      {account.cost.toFixed(2)} {this.getResource("GL_BGN_ABBRAVETION_L")}
                    </p>
                    : null
                  }
                </div>
                {index < this.model.requestsForReportOfAccountProperty.length - 1  ? <hr className="hr--preview"></hr> : null}
              </>);
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
    this.searchAccountsForReport.items.map(item => {
      if (this.model.requestsForReportOfAccountProperty.map(e => e.accountPropertyOfReport.propertyId).indexOf(item.propertyId) < 0) {
        var requestForReportOfAccountProperty = new RequestForReportOfAccountProperty();

        requestForReportOfAccountProperty.accountPropertyOfReport = item;
        this.props.registerAsyncOperation(NomenclaturesPR.getApplicationTypes().then(applicationTypes => {
          var reportForPropertyAppType = applicationTypes.filter(filteredAppType => ApplicationFormTypes.RequestForReportForProperty == filteredAppType.appType)[0];

          requestForReportOfAccountProperty.cost = reportForPropertyAppType.prices[0].price;
        }));

        this.model.requestsForReportOfAccountProperty.push(requestForReportOfAccountProperty);
      }
    });
    this.searchAccountsForReport.items = [];
    this.showModal = false;
  }

  @action
  private removeAccount(acc: RequestForReportOfAccountProperty) {
    let index = this.model.requestsForReportOfAccountProperty.indexOf(acc);
    if (index > -1) {
      this.model.requestsForReportOfAccountProperty.splice(index, 1);
    }
  }
}

export const AccountPropertySubjectOfReportSectionUI = withAsyncFrame(AccountPropertySubjectOfReportSectionUIImpl);
