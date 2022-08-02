import * as React from "react";
import {
  Button,
  EPZEUBaseComponent,
  ValidationSummary,
  ValidationSummaryStrategy
} from "EPZEU.Core";
import {AsyncUIProps, BaseProps, RawHTML, withAsyncFrame} from "Cnsys.UI.React";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import {
  ApplicationFormTypes,  
  NomenclaturesPR,
} from "EPZEU.PR.Core";
import {  
  ApplicationInfoUI,  
  PeriodForReport,
  SectionTitleUI,
  ValidationSummaryErrorsPreviewUI
} from"EPZEU.PR.ApplicationBase";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { PropertySubjectOfReportSection } from "../../Models/Sections/PropertySubjectOfReportSection";
import { SearchPropertiesForReport } from "../../Models/SearchPropertiesForReport";
import { SearchPropertiesForReportUI } from "../SearchPropertiesForReportUI";
import { SearchPropertiesForReportValidator } from "../../Models/Validators/SearchPropertiesForReportValidator";
import { RequestForReportOfProperty } from "../../Models/RequestForReportOfProperty";
import { PeriodForReportUI } from "EPZEU.PR.ApplicationBase";

interface PropertySubjectOfReportSectionUIProps extends AsyncUIProps, BaseProps {
}

const REQUEST_FOR_REPORT_OF_PROPERTY = ["requestsForReportOfProperty"];

@observer export class PropertySubjectOfReportSectionUIImpl extends EPZEUBaseComponent<PropertySubjectOfReportSectionUIProps, PropertySubjectOfReportSection>  {
  @observable private showModal: boolean;

  private searchPropertiesForReport: SearchPropertiesForReport;
  private searchPropertiesForReportValidator: SearchPropertiesForReportValidator;

  constructor(props?: PropertySubjectOfReportSectionUIProps) {
    super(props);

    this.showModal = false;
    this.searchPropertiesForReport = new SearchPropertiesForReport();
    this.searchPropertiesForReportValidator = new SearchPropertiesForReportValidator();

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showSelectRows = this.showSelectRows.bind(this);
    this.removeProperty = this.removeProperty.bind(this);
  }

  renderEdit(): JSX.Element {

    return (
      <>
        <SectionTitleUI titleKey={'PR_SELECTED_PROPERTIES_L'} anchor="propertySubjectOfReportUI"/>
        <ValidationSummary key="requestsForReportOfProperty" {...this.props} propNames={REQUEST_FOR_REPORT_OF_PROPERTY}
                           strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
        />
        {this.model.requestsForReportOfProperty && this.model.requestsForReportOfProperty.length >0 ?
          <>
          <ApplicationInfoUI infoTextKey={"PR_APP_00024_I"}/>
          {this.model.requestsForReportOfProperty.map((requestForReportOfProperty, index) => {
            return (
              <>
                <div id={"property_" + index} className="interactive-container interactive-container--form">
                  <div className="interactive-container__content record-container">
                    <div className="row">
                      <div className="form-group col-12">
                        <RawHTML divClassname="field-container" rawHtmlText={requestForReportOfProperty.propertyOfReport.toString()}/>
                        <div className="field-container">
                            <p className="field-text">
                            { requestForReportOfProperty.propertyOfReport.registryOffice.name + ", "}
                            <span className="field-title field-title--preview">{this.getResource('PR_APP_00021_L')+ ": "}</span>
                            {this.dateDisplayFor(requestForReportOfProperty.propertyOfReport.registryOffice.startDate) + " г."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <PeriodForReportUI {...this.bindArrayElement(m => m.requestsForReportOfProperty[index].periodForReport, [index])}
                                        initialDateForReport={requestForReportOfProperty.propertyOfReport.registryOffice.startDate} />

                  </div>
                  <div className="interactive-container__controls">
                    <Button type="button" className="btn btn-outline-light btn-sm"
                            titlekey="GL_DELETE_L" onClick={() => this.removeProperty(requestForReportOfProperty)}
                            onMouseOver={()=>{$('#property_' + index).addClass('interactive-container--focus')}}
                            onMouseOut={()=>{$('#property_' + index).removeClass('interactive-container--focus')}}>
                      <i className="ui-icon ui-icon-times" aria-hidden="true"></i>
                    </Button>
                  </div>
                </div>
                {index < this.model.requestsForReportOfProperty.length - 1  ? <hr className="hr--doted-line"></hr> : null}

              </>
            )
          })

          }
          </>
        : null}

        {this.model.requestsForReportOfProperty.length > 0  ? <hr /> : null}

        <Button type="button" className="btn btn btn-outline-light text-dark"
                lableTextKey="PR_APP_ADD_PROPERTY_L" onClick={this.openModal}>
          <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
        </Button>

        <Modal centered={true} backdrop={"static"} keyboard={false} className="modal-lg" autoFocus={true} isOpen={this.showModal}
               onExit={this.closeModal} toggle={this.closeModal}>
          <ModalHeader toggle={() => this.showModal = !this.showModal}>
            {this.getResource('PR_APP_ADDING_PROPERTY_L')}
          </ModalHeader>
          <ModalBody>
            <SearchPropertiesForReportUI
              {...this.bind(this.searchPropertiesForReport, "searchPropertiesForReport", [this.searchPropertiesForReportValidator])}
              totalSubjectsOfReportCount={this.model.requestsForReportOfProperty.length}>
            </SearchPropertiesForReportUI>
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
                        disabled={this.searchPropertiesForReport.items.length <= 0 || this.searchPropertiesForReport.getPropertyErrors("maxAllowedNumberOfObjects").length > 0}>
                </Button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        <h2 className="section-title section-title--preview">{this.getResource("PR_SELECTED_PROPERTIES_L")}</h2>

        {this.model.requestsForReportOfProperty && this.model.requestsForReportOfProperty.length > 0 ?
          this.model.requestsForReportOfProperty.map((requestForReportOfProperty, index) => {
            return (
              <React.Fragment key={index}>

               <RawHTML divClassname="field-container" rawHtmlText={requestForReportOfProperty.propertyOfReport.toString()}/>

                <div className="field-container">
                  <p className="field-text">
                    {requestForReportOfProperty.propertyOfReport.registryOffice.name}
                  </p>
                  <p className="field-text">
                    <span className="field-title field-title--preview">{this.getResource('PR_APP_00022_L') + ": "}</span>
                    { this.dateDisplayFor(requestForReportOfProperty.periodForReport.startDate) + " - " + (this.dateDisplayFor(requestForReportOfProperty.periodForReport.endDate)
                       ? this.dateDisplayFor(requestForReportOfProperty.periodForReport.endDate) : this.getResource("PR_UNTIL_REPORT_DAY_L"))
                    }
                  </p>
                  <ValidationSummaryErrorsPreviewUI errors={requestForReportOfProperty.periodForReport.getModelErrors()}/>
                  { requestForReportOfProperty.cost !== undefined ?
                    <p className="field-text">
                      <span className="field-title field-title--preview">{this.getResource("GL_DUE_FEE_L") + ": "}</span>
                      {requestForReportOfProperty.cost.toFixed(2)} {this.getResource("GL_BGN_ABBRAVETION_L")}
                    </p>
                    : null
                  }
                </div>
                {index < this.model.requestsForReportOfProperty.length - 1  ? <hr className="hr--preview"></hr> : null}
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
    this.searchPropertiesForReport.items.map(item => {
      if (this.model.requestsForReportOfProperty.map(e => e.propertyOfReport.propertyId).indexOf(item.propertyId) < 0) {
        var requestForReportOfProperty = new RequestForReportOfProperty();

        requestForReportOfProperty.periodForReport = new PeriodForReport();
        requestForReportOfProperty.periodForReport.startDate = item.registryOffice.startDate;
        requestForReportOfProperty.propertyOfReport = item;
        this.props.registerAsyncOperation(NomenclaturesPR.getApplicationTypes().then(applicationTypes => {
          var reportForPersonAppType = applicationTypes.filter(filteredAppType => ApplicationFormTypes.RequestForReportForProperty == filteredAppType.appType)[0];

          requestForReportOfProperty.cost = reportForPersonAppType.prices[0].price;
        }));

        this.model.requestsForReportOfProperty.push(requestForReportOfProperty);
      }
    });
    this.searchPropertiesForReport.items = [];
    this.showModal = false;
  }

  @action
  private removeProperty(property: RequestForReportOfProperty) {
    let index = this.model.requestsForReportOfProperty.indexOf(property);
    if (index > -1) {
      this.model.requestsForReportOfProperty.splice(index, 1);
    }
  }
}

export const PropertySubjectOfReportSectionUI = withAsyncFrame(PropertySubjectOfReportSectionUIImpl);
