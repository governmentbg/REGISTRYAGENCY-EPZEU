import { BindableReference, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, ConfirmationModal, Label, withAsyncFrame } from 'Cnsys.UI.React';
import { appConfig, attributesClassFormControl, AutoComplete, EPZEUBaseComponent, fieldTitleLabelAttributes, FileUpload, TextArea, ValidationSummaryErrors } from "EPZEU.Core";
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from 'react';
import { Fragment } from 'react';
import { AttachedDocument } from "../Models/AttachedDocument";
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "./Applications";
import { SectionTitleUI } from "./CommonInfoComponents";
import { EditDocumentUI } from './EditDocumentUI';
import { ValidationSummaryErrorsPreviewUI } from "./ValidationSummaryPreviewUI";
import { Documents } from "../Models/Documents";

export class DocumentType {
  documentTypeID: string
  documentTypeName: string
  minOccurs: number
  maxOccurs: number
}

interface DocumentsUIProps extends BaseProps, AsyncUIProps, ApplicationFormContextProviderProps {
  possibleDocumentTypesGetter: () => Promise<DocumentType[]>
}

@observer export class DocumentsUIImpl extends EPZEUBaseComponent<DocumentsUIProps, Documents> {
  @observable private customErrors: string[];
  @observable private possibleDocumentTypes: DocumentType[] = [];
  @observable private selectedDocumentTypeName: string = '';
  @observable private areTypesLoaded: boolean = false;

  constructor(props?: DocumentsUIProps) {
    super(props);


    this.selectedDocumentTypeName = this.model.currentDocument.documentTypeName ? this.model.currentDocument.documentTypeName : "";
    this.customErrors = [];

    this.onDocumentUploaded = this.onDocumentUploaded.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.onUploadError = this.onUploadError.bind(this);
    this.onDocumentNameChange = this.onDocumentNameChange.bind(this);
    this.downloadDocument = this.downloadDocument.bind(this);
    this.deleteAttachedDocument = this.deleteAttachedDocument.bind(this);
    this.clearCurrentDocumentProperties = this.clearCurrentDocumentProperties.bind(this);
    this.documentTypeSelected = this.documentTypeSelected.bind(this);
    this.searchDocumentTypes = this.searchDocumentTypes.bind(this);
    this.updateDocument = this.updateDocument.bind(this);

    if (this.props.possibleDocumentTypesGetter) {
      this.props.registerAsyncOperation(this.props.possibleDocumentTypesGetter().bind(this).then(pTypes => {
        runInAction(() => {
          this.possibleDocumentTypes = pTypes;
          this.areTypesLoaded = true;
        });
      }))
    }
  }

  renderEdit(): JSX.Element {
    var tmp = this.model.currentDocument.documentTypeId;
    var currentDocumentModel = new BindableReference(this.model.currentDocument);
    return (
      this.areTypesLoaded &&
      <>
        <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
        <div className="help-text">
          <p>{this.getResource('GL_DOCUMENT_ALLOWED_FORMATS_I').replace('{FILE_FORMATS}', appConfig.acceptedFileExt)}<br /></p>
        </div>

        <ValidationSummaryErrors errors={this.props.modelReference.getErrors()} />
        {this.customErrors.length > 0 &&
          <div className="alert alert-danger">
            <p>
              {this.customErrors.map((error: string, index: number) => {
                return <Fragment key={index}>{error}<br /></Fragment>
              })}
            </p>
          </div>
        }
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              <Label fullHtmlName={this.props.fullHtmlName}
                modelReference={new BindableReference(currentDocumentModel)}
                labelText={this.getResource('GL_DESCRIPTION_L')} attributes={fieldTitleLabelAttributes} />
            </div>
          </div>
          {this.model.attachedDocuments != undefined ? this.model.attachedDocuments.map((doc, index) => {
            return (
              <React.Fragment key={doc.documentUniqueId}>
                <div id={ObjectHelper.isNumber(doc.applicationDocumentId) ? doc.applicationDocumentId.toString() : 'todoRemoveAfterBackendReturnsIt'} className="interactive-container interactive-container--form">
                  <div className="interactive-container__content record-container">
                    <div className="row">
                      <div className="col-12 form-group">
                        <p className="field-text">
                          {doc.documentTypeName}
                          {doc.size ? <><br /><span className="text-muted"> {this.getResource('GL_DOCUMENT_SIZE_L')}: {(doc.size / (1024 * 1024)).toFixed(2)}MB</span></> : null}
                          <br />
                          <i className="ui-icon ui-icon-download"></i>
                          &nbsp;
                          <a href="#" onClick={(event) => this.downloadDocument(event, doc)}>{doc.name}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  {
                    !(this.props.applicationManager.additionalData && this.props.applicationManager.additionalData.initialApplicationDocuments
                    && (this.props.applicationManager.additionalData.initialApplicationDocuments.indexOf(doc.documentUniqueId) > -1))
                    &&
                    <div className="interactive-container__controls">
                      {!(this.possibleDocumentTypes[0].minOccurs == 1 && this.possibleDocumentTypes[0].maxOccurs == 1) &&
                        <EditDocumentUI
                          fullHtmlName="EditDocument"
                          modelReference={new BindableReference(doc)}
                          possibleDocumentTypes={this.possibleDocumentTypes}
                          updateDocument={this.updateDocument}
                          containerID={ObjectHelper.isNumber(doc.applicationDocumentId) ? doc.applicationDocumentId.toString() : 'todoRemoveAfterBackendReturnsIt'} />
                      }
                      <ConfirmationModal modalTitleKey="GL_DELETE_DOCUMENT_L" modalTextKeys={["GL_DELETE_DOCUMENT_MSG_L"]} noTextKey="GL_NO_L" yesTextKey="GL_OK_L" onSuccess={() => this.deleteAttachedDocument(doc)}>
                        <button className="btn btn-outline-light btn-sm" title={this.getResource('GL_DELETE_L')}
                          onMouseOver={() => { $('#' + doc.applicationDocumentId.toString()).addClass('interactive-container--focus') }}
                          onMouseOut={() => { $('#' + doc.applicationDocumentId.toString()).removeClass('interactive-container--focus') }}>
                          <i className="ui-icon ui-icon-times" aria-hidden="true"></i></button>
                      </ConfirmationModal>
                    </div>
                  }
                </div>
                <hr key={doc.documentUniqueId + "-line"} className="hr--doted-line" />
              </React.Fragment>
            )
          }) : null}
          <div id="document-upload-form" className="loader-overlay-local">
            <div className="interactive-container interactive-container--form">
              <div className="interactive-container__content record-container">
                <div className="row">
                  <div className={"form-group col-12" + ((this.customErrors.length > 0 && !this.model.currentDocument.documentTypeId) ? ' documents-ui-validation-error' : '')}>
                    <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(currentDocumentModel, "documentTypeId")} labelText={this.getResource('GL_DOCUMENT_KIND_L')} />
                    <AutoComplete
                      fullHtmlName={this.props.fullHtmlName}
                      modelReference={new BindableReference(this, () => this.selectedDocumentTypeName)}
                      selector={this.searchDocumentTypes}
                      showValue={(value: DocumentType): string => { return value.documentTypeName; }}
                      handleSelectCallback={(value?: DocumentType) => this.documentTypeSelected(value)}
                      hasSelectedValue={this.model.currentDocument.documentTypeId ? true : false}
                      handleChangeCallback={() => { this.model.currentDocument.documentTypeId = null; this.model.currentDocument.documentTypeName = null; }}
                      triggerLength={0}
                      attributes={attributesClassFormControl}
                    />
                  </div>
                  <div className="form-group col-12">
                    <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(currentDocumentModel, "name")} labelText={this.getResource('GL_NAME_L')} />
                    <TextArea fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(currentDocumentModel, "name")} rows={3} attributes={attributesClassFormControl} onChange={this.onDocumentNameChange} />
                  </div>
                  <div className="form-group col-12" onClickCapture={() => this.onUploadClick()}>
                    <FileUpload
                      maxFilesize={appConfig.maxRequestLengthInKB / 1024}
                      acceptedFiles={appConfig.acceptedFileExt}
                      onAddedFile={null}
                      onRemovedfile={null}
                      allowUpload={true}
                      onUploaded={this.onDocumentUploaded}
                      onError={this.onUploadError}
                      instantUpload={true}
                      uploadURL={this.props.applicationManager.processContext.getAttachedDocumentUploadURL(this.props.applicationManager.application)}
                      params={this.model.currentDocument}
                      dictInvalidFileType='GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E'
                      dictDefaultMessage='GL_UPLOAD_ERR_E'
                      dictFileTooBig='GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E'
                      dictRemoveFile='GL_DELETE_L'
                      dictMaxFilesExceeded='GL_MAX_COUNT_ATTACHMENTS_E'
                      selectFileText='GL_SELECT_FILE_L'
                      addFileText='GL_ADD_DOCUMENT_L'
                      showUploadedFilesPreview={false}
                      isEnabled={this.model.currentDocument.documentTypeId ? true : false}
                      idOfParentOfLoadingUI="document-upload-form"
                      accepts={function (file: any, done: any) {
                        if (file.size == 0) {
                          done("GL_UPLOAD_FILE_E");
                        }
                        else { done(); }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        <h2 className="section-title section-title--preview">{this.getResource("GL_APPLIEDS_L")}</h2>

        <ValidationSummaryErrorsPreviewUI errors={this.props.modelReference.getErrors()} />
        <div className="table-responsive-block">
          <table className="table table-borderless table-striped table-hover table-collapsible">
            <thead className="thead-invisible">
              <tr>
                <th className="single-icon-td"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.model.attachedDocuments != undefined ? this.model.attachedDocuments.map((doc, index) => {
                if (doc.documentUniqueId) {
                  return (<Fragment key={doc.documentUniqueId}>
                    <tr className={index % 2 === 0 ? 'even-color' : 'odd-color'}>
                      <td className="toggle-collapse">
                        <button className="system-button collapsed" id={`collapsable-trigger-${doc.documentUniqueId}`} onClick={() => this.onCollapseCriteria(`collapsable-content-${doc.documentUniqueId}`, doc.documentUniqueId)}>
                          <i className="ui-icon ui-icon-chevron-right"></i>
                        </button>
                      </td>
                      <td>
                        <p className="field-text">
                          <i className="ui-icon ui-icon-download-color mr-1"></i><a href="#" onClick={(event) => this.downloadDocument(event, doc)}>{doc.name}</a>
                        </p>
                      </td>
                    </tr>
                    <tr className="collapsible-row">
                      <td colSpan={2}>
                        <div id={`collapsable-content-${doc.documentUniqueId}`} className="collapse">
                          <div className="collapsible-row-content">
                            <p className="field-text">
                              {doc.size ? <><span className="text-muted">{this.getResource('GL_DOCUMENT_SIZE_L')}: {(doc.size / (1024 * 1024)).toFixed(2)} MB</span></> : null}
                              {doc.documentTypeName ? <><br />{doc.documentTypeName}</> : null}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>)
                }
              }) : null}
            </tbody>
          </table>
        </div>
      </>);

  }

  documentTypeSelected(value?: DocumentType): void {
    this.selectedDocumentTypeName = this.model.currentDocument.documentTypeName = value.documentTypeName;
    this.model.currentDocument.documentTypeId = value.documentTypeID;
    this.model.currentDocument.name = this.model.currentDocument.documentTypeId
      ? this.possibleDocumentTypes.filter(dt => dt.documentTypeID == this.model.currentDocument.documentTypeId.toString())[0].documentTypeName
      : null;
  }

  searchDocumentTypes(value: string): Promise<DocumentType[]> {

    var valueLowerCase = value.toLowerCase();

    let res = this.possibleDocumentTypes.filter(s => {
      return s.documentTypeName.toString().toLowerCase().indexOf(" " + valueLowerCase) > -1
        || s.documentTypeName.toString().toLowerCase().indexOf(valueLowerCase) == 0;
    }).sort((docA: any, docB: any) => docA.documentTypeName > docB.documentTypeName ? 1 : -1);

    return Promise.resolve(res);
  }

  updateDocument(document: AttachedDocument): Promise<void> {
    return this.props.applicationManager.processContext.updateAttachedDocument(this.props.applicationManager.application, document).bind(this);
  }

  @action onUploadClick() {
    if (!this.model.currentDocument.documentTypeId) {
      // грешките се зачистват на 3 места, а не само в началото на onUploadClick, защото реда на изпълнение на event-ите е различен в IE �? Chrome
      this.customErrors = [];
      this.customErrors.push(this.getResource('GL_NOSELECT_ACTS_KIND_E'));
    } else {
      if (this.model.currentDocument.name == null || this.model.currentDocument.name == undefined || this.model.currentDocument.name.trim() == "") {
        this.model.currentDocument.name = this.possibleDocumentTypes.filter(dt => dt.documentTypeID == this.model.currentDocument.documentTypeId.toString())[0].documentTypeName;
      }
    }
  }

  @action onUploadError(errorMessage: string | Error, file: Dropzone.DropzoneFile) {
    // грешките се зачистват на 3 места, а не само в началото на onUploadClick, защото реда на изпълнение на event-ите е различен в IE �? Chrome
    this.customErrors = [];

    if (errorMessage == this.getResource('GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E').replace('{FILE_FORMATS}', appConfig.acceptedFileExt)) {
      this.customErrors.push(errorMessage);
    } else if (errorMessage == this.getResource('GL_UPLOAD_FILE_E')) {
      this.customErrors.push(errorMessage);
    } else if (errorMessage == this.getResource('GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E')) {
      this.customErrors.push(errorMessage.replace('{FILE_SIZE_IN_KB}', (file.size / (1024)).toFixed().toString() + 'kB')
        .replace('{MAX_FILE_SIZE}', appConfig.maxRequestLengthInKB + 'kB'));
    } else {
      this.customErrors.push(this.getResource('GL_UPLOAD_ERR_E'));
    }
  }

  onDocumentUploaded(documentSent: any, response: any, dropzone: Dropzone): void {
    // грешките се зачистват на 3 места, а не само в началото на onUploadClick, защото реда на изпълнение на event-ите е различен в IE �? Chrome
    this.customErrors = [];

    var attachedDocument = new AttachedDocument(response);
    if (attachedDocument && attachedDocument.size == 0) {
      this.customErrors.push(this.getResource('GL_UPLOAD_FILE_E'));
    }
    else {
      attachedDocument.size = documentSent.size;
      this.props.registerAsyncOperation(this.props.applicationManager.processContext.addAttachedDocument(this.props.applicationManager.application, attachedDocument));
    }
    this.clearCurrentDocumentProperties();
    dropzone.removeAllFiles();
  }

  @action clearCurrentDocumentProperties(): void {
    this.selectedDocumentTypeName = '';
    this.model.currentDocument.documentTypeId = null;
    this.model.currentDocument.documentTypeName = null;
    this.model.currentDocument.name = null;
  }

  @action onDocumentNameChange(e: any) {
    let name = e.target.value;
    this.model.currentDocument.name = name ? name : "";
  }

  deleteAttachedDocument(document: AttachedDocument) {
    this.props.registerAsyncOperation(this.props.applicationManager.processContext.deleteAttachedDocument(this.props.applicationManager.application, document));
  }

  downloadDocument(event: any, attDocument: AttachedDocument) {
    event.preventDefault();

    this.props.applicationManager.processContext.getAttachedDocumentDownloadURL(this.props.applicationManager.application, attDocument).bind(this).then(downloadUrl => {

      var pom = document.createElement('a');
      pom.setAttribute('href', downloadUrl);
      pom.setAttribute('target', '_blank');

      document.body.appendChild(pom);

      pom.click();

      document.body.removeChild(pom);
    });
  }

  onCollapseCriteria(targetId: string, itemId: string): void {
    let triger = $(`#collapsable-trigger-${itemId}`);
    triger.toggleClass('collapsed');

    $('#' + targetId).slideToggle();
  }

}

export const DocumentsUI = withApplicationFormContext(withAsyncFrame(DocumentsUIImpl));
