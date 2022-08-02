import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as React from "react";
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import {AsyncUIProps, BaseProps, RawHTML, withAsyncFrame} from 'Cnsys.UI.React';
import { EPZEUBaseComponent, Button, ValidationSummaryStrategy, ValidationSummary } from 'EPZEU.Core';
import { NomenclaturesPR, ApplicationFormTypes } from "EPZEU.PR.Core";
import {
  SectionTitleUI,
  SearchDocumentsForReport, 
} from 'EPZEU.PR.ApplicationBase';
import { DocumentSubjectOfReportSection } from "../../Models/Sections/DocumentSubjectOfReportSection";
import { SearchDocumentsForReportUI } from "../SearchDocumentsForReportUI";
import { SearchDocumentsForReportValidator } from "../../Models/Validators/SearchDocumentsForReportValidator";
import {RequestForReportOfDocument} from "../../Models/RequestForReportOfDocument";

interface DocumentSubjectOfReportSectionUIProps extends AsyncUIProps, BaseProps {
}

const REQUEST_FOR_REPORT_OF_DOCUMENT = ["requestsForReportOfDocument"];

@observer export class DocumentSubjectOfReportSectionUIImpl extends EPZEUBaseComponent<DocumentSubjectOfReportSectionUIProps, DocumentSubjectOfReportSection> {
  @observable private showModal: boolean;

  private searchDocumentsForReport: SearchDocumentsForReport;
  private searchDocumentsForReportValidator: SearchDocumentsForReportValidator;

  constructor(props?: DocumentSubjectOfReportSectionUIProps) {
    super(props);

    this.showModal = false;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showSelectRows = this.showSelectRows.bind(this);
    this.removeDocument = this.removeDocument.bind(this);
    this.searchDocumentsForReport = new SearchDocumentsForReport();
    this.searchDocumentsForReportValidator = new SearchDocumentsForReportValidator();
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_DOCUMENTS_SUBJECT_OF_REPORT_L'} anchor="documentsSubjectOfReport"/>
        <ValidationSummary key="requestsForReportOfDocument" {...this.props} propNames={REQUEST_FOR_REPORT_OF_DOCUMENT}
                           strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
        />
        {this.model.requestsForReportOfDocument && this.model.requestsForReportOfDocument.length > 0 ?
          this.model.requestsForReportOfDocument.map((requestForReportForOfDocument, index) => {
            return (
              <>
                <div id={"document_" + index} className="interactive-container interactive-container--form">
                  <div className="interactive-container__content record-container">
                    <div className="row">
                      <div className="form-group col-12">
                        <RawHTML
                              divClassname="field-container"
                              rawHtmlText={requestForReportForOfDocument.document.toString()}/>
                        <div className="field-container">
                          <p className="field-text">
                            {requestForReportForOfDocument.document.registryOffice.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="interactive-container__controls">
                    <Button type="button" className="btn btn-outline-light btn-sm"
                            titlekey="GL_DELETE_L" onClick={() => this.removeDocument(requestForReportForOfDocument)}
                            onMouseOver={()=>{$('#document_' + index).addClass('interactive-container--focus')}}
                            onMouseOut={()=>{$('#document_' + index).removeClass('interactive-container--focus')}}>
                      <i className="ui-icon ui-icon-times" aria-hidden="true"></i>
                    </Button>
                  </div>
                </div>
                {index < this.model.requestsForReportOfDocument.length - 1  ? <hr className="hr--doted-line"></hr> : null}
              </>
            )
          })
          : null}
        {this.model.requestsForReportOfDocument.length > 0  ? <hr /> : null}
        <Button type="button" className="btn btn btn-outline-light text-dark"
                lableTextKey="PR_APP_ADD_DOCUMENT_L" onClick={this.openModal}>
          <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
        </Button>

        <Modal centered={true} backdrop={"static"} keyboard={false} className="modal-lg" autoFocus={true} isOpen={this.showModal} onExit={this.closeModal} toggle={this.closeModal}>
          <ModalHeader toggle={() => this.showModal = !this.showModal}>
            {this.getResource('PR_APP_ADDING_DOCUMENT_L')}
          </ModalHeader>
          <ModalBody>
            <SearchDocumentsForReportUI
              {...this.bind(this.searchDocumentsForReport, "searchDocumentsForReport", [this.searchDocumentsForReportValidator])}
              totalSubjectsOfReportCount={this.model.requestsForReportOfDocument.length}
            ></SearchDocumentsForReportUI>
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
                        lableTextKey="GL_ADD_L" onClick={this.showSelectRows} disabled={this.searchDocumentsForReport.items.length<=0 || this.searchDocumentsForReport.getPropertyErrors("maxAllowedNumberOfObjects").length > 0}>
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
        <h2 className="section-title section-title--preview">{this.getResource("PR_DOCUMENTS_SUBJECT_OF_REPORT_L")}</h2>

        {this.model.requestsForReportOfDocument && this.model.requestsForReportOfDocument.length > 0 ?
          this.model.requestsForReportOfDocument.map((requestForReportForOfDocument, index) => {
            return (
              <React.Fragment key={index}>

                <RawHTML divClassname="field-container" rawHtmlText={requestForReportForOfDocument.document.toString()}/>

                <div className="field-container">
                  <p className="field-text">
                    {requestForReportForOfDocument.document.registryOffice.name}
                  </p>
                  { requestForReportForOfDocument.cost !== undefined ?
                    <p className="field-text">
                      <span className="field-title field-title--preview">{this.getResource("GL_DUE_FEE_L") + ": "}</span>
                      {requestForReportForOfDocument.cost.toFixed(2)} {this.getResource("GL_BGN_ABBRAVETION_L")}
                    </p>
                    : null
                  }
                </div>
                {index < this.model.requestsForReportOfDocument.length - 1  ? <hr className="hr--preview"></hr> : null}
              </React.Fragment>);
          }) : null}
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
    this.searchDocumentsForReport.items.map(item => {
      if (this.model.requestsForReportOfDocument.map(e => e.document.id).indexOf(item.id) < 0) {
        var requestForReportOfDocument = new RequestForReportOfDocument();

        requestForReportOfDocument.document = item;
        this.props.registerAsyncOperation(NomenclaturesPR.getApplicationTypes().then(applicationTypes => {
          var reportForDocumentAppType = applicationTypes.filter(filteredAppType => ApplicationFormTypes.RequestForReportForDocument == filteredAppType.appType)[0];

          requestForReportOfDocument.cost = reportForDocumentAppType.prices[0].price;
        }));

        this.model.requestsForReportOfDocument.push(requestForReportOfDocument);
      }
    });
    this.searchDocumentsForReport.items = [];
    this.showModal = false;
  }

  @action
  private removeDocument(doc: RequestForReportOfDocument) {
    let index = this.model.requestsForReportOfDocument.indexOf(doc);
    if (index > -1) {
      this.model.requestsForReportOfDocument.splice(index, 1);
    }
  }
}

export const DocumentSubjectOfReportSectionUI = withAsyncFrame(DocumentSubjectOfReportSectionUIImpl);
