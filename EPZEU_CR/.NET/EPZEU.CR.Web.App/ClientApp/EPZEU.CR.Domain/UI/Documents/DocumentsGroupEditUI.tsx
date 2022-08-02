import { appConfig, BindableReference, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, CheckBox, ConfirmationModal, Label, TextArea, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControl, AutoComplete, Button, EPZEUBaseComponent, FileUpload, SigningProcessUI } from "EPZEU.Core";
import { action, observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from 'react';
import { AttachedDocument } from "../../Models/AttachedDocument";
import { SectionInfoUI } from "../../UI/CommonInfoComponents";
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "../Applications/ApplicationFormContextProviderUI";
import { DocTemplateFormAddUI } from './DocumentTemplateFormAdd';
import { EditDocumentUI } from './EditDocumentUI';

export class DocumentType {
    documentTypeID: string
    documentTypeName: string
    minOccurs: number
    maxOccurs: number
}

interface DocumentsGroupEditUIProps extends BaseProps, AsyncUIProps, ApplicationFormContextProviderProps {
    documents: AttachedDocument[],
    possibleDocumentGroupTypes: DocumentType[],
    disableDocumentRefusal?: boolean;
    isChangingNameDisabled?: boolean;
    isAct?: boolean
    onDocumentSaved?: (doc: AttachedDocument) => void;
    onDocumentUpdated?: (doc: AttachedDocument) => void;
    onDocumentDeleted?: (doc: AttachedDocument) => void;
    labelTextKey?: string;
    startDownloadDocument: (event: any, doc: AttachedDocument) => void;
    customErrors: string[];
}

var infoTextKeys1 = ['CR_APP_00227_I'];

var rejectDocDeleteKeys = ['GL_DELETE_DOCUMENT_MSG_L'];

@observer export class DocumentsGroupEditUIImpl extends EPZEUBaseComponent<DocumentsGroupEditUIProps, any> {
    groupKey: string = ObjectHelper.newGuid();
    document: AttachedDocument;

    @observable private selectedDocumentTypeName: string = '';
    @observable private reRender: boolean = false;
    @observable private hasTemplate: boolean;

    constructor(props?: DocumentsGroupEditUIProps) {
        super(props);

        this.document = new AttachedDocument();

        if (this.props.possibleDocumentGroupTypes.length == 1) {
            this.document.documentTypeID = this.props.possibleDocumentGroupTypes[0].documentTypeID;
            this.document.description = this.props.possibleDocumentGroupTypes[0].documentTypeName;
            this.selectedDocumentTypeName = this.props.possibleDocumentGroupTypes[0].documentTypeName;
        }

        this.startSigningDocument = this.startSigningDocument.bind(this);
        this.onDocumentUploaded = this.onDocumentUploaded.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onUploadError = this.onUploadError.bind(this);
        this.clearCurrentDocumentProperties = this.clearCurrentDocumentProperties.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.searchDocumentTypes = this.searchDocumentTypes.bind(this);
        this.docTemplateFormInitialized = this.docTemplateFormInitialized.bind(this);
        this.documentTypeSelected = this.documentTypeSelected.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onHoverLeave = this.onHoverLeave.bind(this);
    }

    //#region Render

    render(): JSX.Element {
        //Ако не се ползва reRender в render метода, при промяна на пропартито няма да се викне render
        var reRender = this.reRender;

        return (
            <div key={this.groupKey} className="field-container">
                {this.renderTitle()}
                {this.renderDocumentsList()}
                {this.renderDocumentUploadEdit()}
            </div>)
    }

    renderTitle() {
        if (this.props.isAct)
            return null;

        if (this.props.possibleDocumentGroupTypes.length == 1 && this.props.possibleDocumentGroupTypes[0].minOccurs == 1 && this.props.possibleDocumentGroupTypes[0].maxOccurs == 1) {
            return (
                <div key="title" className="row">
                    <div className="col-12">
                        <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document)} labelText={this.props.possibleDocumentGroupTypes[0].documentTypeName} attributes={{ className: 'field-title field-title--form' }} />
                    </div>
                </div>);
        }

        return (
            <div key="title" className="row">
                <div className="col-12">
                    <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document)} labelText={this.getResource(this.props.labelTextKey)} attributes={{ className: 'field-title field-title--form' }} />
                </div>
            </div>);
    }

    renderDocumentsList(): JSX.Element[] {
        {
            let that = this;

            if (this.props.documents && this.props.documents.length > 0) {
                return this.props.documents.filter(dt => this.props.possibleDocumentGroupTypes.filter(pdt => pdt.documentTypeID == dt.documentTypeID).length > 0).map((doc, index) => {
                    return (
                        <React.Fragment key={doc.applicationDocumentID}>
                            <div id={doc.applicationDocumentID.toString()} className="interactive-container interactive-container--form">
                                <div className="interactive-container__content record-container">
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <p className="field-text">
                                                {(this.props.possibleDocumentGroupTypes[0].minOccurs == 1 && this.props.possibleDocumentGroupTypes[0].maxOccurs == 1) ? null :
                                                    <>{this.props.possibleDocumentGroupTypes.filter(dt => dt.documentTypeID == doc.documentTypeID)[0].documentTypeName} </>
                                                }
                                                {doc.isActWithErasedPersonalData && <><br /><span className="text-muted">{this.getResource('CR_APP_00007_L')}</span></>}
                                                {doc.reusedIncomingNumber && <><br /><span className="text-muted">{this.getResource('GL_INCOMING_NO_L')}: {doc.reusedIncomingNumber}</span></>}
                                                {doc.isOriginal && <br />}{doc.isOriginal ? <span className="text-muted">{this.getResource('GL_DOCUMENT_ORIGINAL_L')}</span> : null}
                                                {doc.size ? <><br /><span className="text-muted"> {this.getResource('GL_DOCUMENT_SIZE_L')}: {(doc.size / (1024 * 1024)).toFixed(2)} MB</span></> : null}
                                                {doc.numberOfPages ? <><br /><span className="text-muted">{this.getResource('GL_COUNT_PAGES_L')}: {doc.numberOfPages}</span></> : null}
                                                <br />
                                                {doc.guid ?
                                                    <>
                                                        <i className="ui-icon ui-icon-download-color mr-1"></i>
                                                        <a href={this.props.applicationManager.processContext.getAttachedDocumentCopyDownloadURL(doc)}
                                                            onClick={(event) => this.props.startDownloadDocument(event, doc)}>{doc.description}</a>
                                                    </> :
                                                    <>
                                                        <i className='ui-icon ui-icon-document'></i> {doc.description}
                                                    </>
                                                }
                                            </p>
                                        </div>
                                        {
                                            (ObjectHelper.isStringNullOrEmpty(doc.guid) && ObjectHelper.isStringNullOrEmpty(doc.signingGuid)) &&
                                            <div id={'GO_SIGN'} className='col-12 form-group'>
                                                <Button className="btn btn-outline-light text-dark" onClick={(event) => this.startSigningDocument(event, doc)} lableTextKey={'GL_SIGN_L'}><i className="ui-icon ui-icon-check mr-1" aria-hidden="true"></i></Button>
                                            </div>
                                        }
                                    </div>
                                    {
                                        doc.signingGuid &&
                                        <SigningProcessUI
                                            signingProcessGuid={doc.signingGuid}
                                            onCompleted={() => { return this.props.applicationManager.processContext.signingAttachedDocumentTemplateCompleted(this.props.applicationManager.application, doc); }}
                                            onRejected={() => { return this.props.applicationManager.processContext.signingAttachedDocumentTemplateRejected(this.props.applicationManager.application, doc); }}
                                        />
                                    }
                                </div>
                                <div className="interactive-container__controls">
                                    {!(this.props.possibleDocumentGroupTypes[0].minOccurs == 1 && this.props.possibleDocumentGroupTypes[0].maxOccurs == 1) &&
                                        <EditDocumentUI
                                            fullHtmlName="EditDocument"
                                            modelReference={new BindableReference(doc)}
                                            possibleDocumentTypes={this.props.possibleDocumentGroupTypes}
                                            updateDocument={this.updateDocument}
                                            containerID={doc.applicationDocumentID.toString()} />
                                    }
                                    <ConfirmationModal modalTitleKey='GL_DELETE_DOCUMENT_L' modalTextKeys={rejectDocDeleteKeys} onSuccess={() => { this.deleteDocument(doc); }} yesTextKey='GL_OK_L' noTextKey='GL_NO_L'>
                                        <button className="btn btn-outline-light btn-sm" title={this.getResource('GL_DELETE_L')} onMouseOver={() => { this.onHover(doc.applicationDocumentID.toString()) }} onMouseLeave={() => { this.onHoverLeave(doc.applicationDocumentID.toString()) }} >
                                            <i className="ui-icon ui-icon-times" aria-hidden="true" ></i>
                                        </button>
                                    </ConfirmationModal>

                                </div>
                            </div>
                            {(this.props.possibleDocumentGroupTypes[0].minOccurs == 1 && this.props.possibleDocumentGroupTypes[0].maxOccurs == 1 && index == 0) ? null :
                                <hr className="hr--doted-line" />}
                        </React.Fragment>
                    )
                })
            }
            return null;
        }
    }

    renderDocumentUploadEdit(): JSX.Element {
        //когато имаме само един документ от даден вид и той е прикачен скриваме контролата за прикачване
        if (this.props.possibleDocumentGroupTypes &&
            this.props.possibleDocumentGroupTypes.length == 1 &&
            this.props.possibleDocumentGroupTypes[0].maxOccurs == 1 &&
            this.props.documents.filter(d => d.documentTypeID == this.props.possibleDocumentGroupTypes[0].documentTypeID).length > 0
        ) {
            return null;
        }

        return (
            <div id={`upload_${this.groupKey}`} className="loader-overlay-local">
                <div key="edit" className="interactive-container interactive-container--form">
                    <div className="interactive-container__content record-container">
                        <div className="row">
                            {this.props.possibleDocumentGroupTypes.length > 1 || this.props.isAct ?
                                <>
                                    <div className="form-group col-12" >
                                        <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document, "documentTypeID")} labelText={this.getResource('GL_DOCUMENT_KIND_L')} />
                                        <AutoComplete
                                            fullHtmlName={this.props.fullHtmlName}
                                            modelReference={new BindableReference(this, () => this.selectedDocumentTypeName)}
                                            selector={this.searchDocumentTypes}
                                            showValue={(value: DocumentType): string => { return value.documentTypeName; }}
                                            handleSelectCallback={(value?: DocumentType) => this.documentTypeSelected(value)}
                                            hasSelectedValue={this.document.documentTypeID ? true : false}
                                            handleChangeCallback={() => { this.document.documentTypeID = null; }}
                                            triggerLength={0}
                                            attributes={attributesClassFormControl}/>
                                    </div>
                                    <div className="form-group col-12">
                                        <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document, "description")} labelText={this.getResource('GL_NAME_L')} />
                                        <TextArea fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document, "description")} rows={3} attributes={{ className: 'form-control', disabled: this.props.isChangingNameDisabled }} />
                                    </div>
                                </> : this.props.possibleDocumentGroupTypes[0].minOccurs == 1 && this.props.possibleDocumentGroupTypes[0].maxOccurs == 1 ?
                                    null :
                                    <div className="form-group col-12">
                                        <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document, "description")} labelText={this.getResource('GL_NAME_L')} />
                                        <TextArea fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.document, "description")} rows={3} attributes={{ className: 'form-control', disabled: this.props.isChangingNameDisabled }} />
                                    </div>
                            }

                            <div className="form-group col-lg-6">
                                <div className="custom-control custom-checkbox">
                                    <CheckBox fullHtmlName={this.props.fullHtmlName + '.isOriginal'} modelReference={new BindableReference(this.document, "isOriginal")} attributes={{ className: "custom-control-input" }} />
                                    <Label fullHtmlName={this.props.fullHtmlName + '.isOriginal'} modelReference={new BindableReference(this.document, "isOriginal")} labelText={this.getResource('GL_DOCUMENT_ORIGINAL_L')} attributes={{ className: 'custom-control-label' }} />
                                </div>
                            </div>
                            {this.props.isAct &&
                                <div className="form-group col-lg-6">
                                    <div className="custom-control custom-checkbox">
                                        <CheckBox fullHtmlName={this.props.fullHtmlName + '.isActWithErasedPersonalData'} modelReference={new BindableReference(this.document, "isActWithErasedPersonalData")} attributes={{ className: "custom-control-input" }} />
                                        <Label fullHtmlName={this.props.fullHtmlName + '.isActWithErasedPersonalData'} modelReference={new BindableReference(this.document, "isActWithErasedPersonalData")} labelText={this.getResource('CR_APP_00007_L')} attributes={{ className: 'custom-control-label' }} />
                                    </div>
                                </div>
                            }
                            {this.hasTemplate &&
                                <div className="form-group col-12">
                                    <SectionInfoUI infoTextKey={infoTextKeys1} />
                                </div>
                            }
                            <div className="col-12">
                                <div className="form-row">
                                    <div className="col-auto form-group">
                                        <span onClickCapture={() => this.onUploadClick()}>
                                            <FileUpload
                                                maxFilesize={appConfig.maxRequestLengthInKB / 1024}
                                                acceptedFiles={appConfig.acceptedFileExt.replace(' ', '')}
                                                onAddedFile={null}
                                                onRemovedfile={null}
                                                allowUpload={true}
                                                onUploaded={(documentSent, response, dropzone) => this.onDocumentUploaded(documentSent, response, dropzone)}
                                                onError={this.onUploadError}
                                                instantUpload={true}
                                                uploadURL={this.props.applicationManager.processContext.getAttachedDocumentUploadURL(this.props.applicationManager.application)}
                                                params={this.document}
                                                dictInvalidFileType='GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E'
                                                dictDefaultMessage='GL_UPLOAD_ERR_E'
                                                dictFileTooBig='GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E'
                                                dictRemoveFile='GL_DELETE_L'
                                                dictMaxFilesExceeded='GL_MAX_COUNT_ATTACHMENTS_E'
                                                selectFileText={this.props.isAct === true ? 'CR_APP_ADD_ACT_L' : 'GL_SELECT_FILE_L'}
                                                addFileText='GL_ADD_DOCUMENT_L'
                                                showUploadedFilesPreview={false}
                                                isEnabled={this.document.documentTypeID ? true : false}
                                                idOfParentOfLoadingUI={`upload_${this.groupKey}`}
                                                accepts={function (file: any, done: any) {
                                                    if (file.size == 0) {
                                                        done("GL_UPLOAD_FILE_E");
                                                    }
                                                    else { done(); }
                                                }}
                                            />
                                        </span>
                                    </div>
                                    <div className="col-auto form-group">
                                        <DocTemplateFormAddUI
                                            documentTypeID={this.document.documentTypeID}
                                            documentName={this.document.description}
                                            documentTypeName={this.document.documentTypeID ? this.props.possibleDocumentGroupTypes.filter(dt => dt.documentTypeID == this.document.documentTypeID)[0].documentTypeName : null}
                                            saveFormContent={(formContent: string, documentName: string) => {
                                                return this.saveDocumentFromTemplate(formContent, documentName)
                                            }}
                                            onFormInitialized={this.docTemplateFormInitialized}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    //#endregion 

    //#region Event

    docTemplateFormInitialized(loadContext: { hasTemplate: boolean }): void {
        this.hasTemplate = loadContext.hasTemplate;
    }

    searchDocumentTypes(value: string): Promise<DocumentType[]> {

        var valueLowerCase = value.toLowerCase();

        let res = this.props.possibleDocumentGroupTypes.filter(s => {
            return s.documentTypeName.toString().toLowerCase().indexOf(" " + valueLowerCase) > -1
                || s.documentTypeName.toString().toLowerCase().indexOf(valueLowerCase) == 0;
        }).sort((docA: any, docB: any) => docA.documentTypeName > docB.documentTypeName ? 1 : -1);

        return Promise.resolve(res);
    }

    documentTypeSelected(value?: DocumentType): void {
        this.selectedDocumentTypeName = this.document.description = value.documentTypeName;
        this.document.documentTypeID = value.documentTypeID;
    }

    onHover(containerID: string) {
        $("#" + containerID).addClass("interactive-container--focus");
    }

    onHoverLeave(containerID: string) {
        $("#" + containerID).removeClass("interactive-container--focus");
    }

    startSigningDocument(event: any, document: AttachedDocument) {
        this.props.registerAsyncOperation(this.props.applicationManager.processContext.startSigningAttachedDocumentTemplate(this.props.applicationManager.application, document))
    }

    deleteDocument(document: AttachedDocument) {
        this.props.registerAsyncOperation(this.props.applicationManager.processContext.deleteAttachedDocument(this.props.applicationManager.application, document).bind(this).then(() => {
            if (this.props.onDocumentDeleted) {
                this.props.onDocumentDeleted(document);
            }
        }));
    }

    @action saveDocumentFromTemplate(formContent: string, documentName: string): Promise<void> {
        this.document.isOriginal = true;
        this.document.description = documentName;
        this.document.htmlTemplateContent = formContent;


        return this.props.applicationManager.processContext.addAttachedDocument(this.props.applicationManager.application, this.document).bind(this).then(d => {
            this.clearCurrentDocumentProperties();
            if (this.props.onDocumentSaved) {
                this.props.onDocumentSaved(this.document);
            }
            this.reRender = !this.reRender;
        });
    }

    updateDocument(document: AttachedDocument): Promise<void> {
        return this.props.applicationManager.processContext.updateAttachedDocument(this.props.applicationManager.application, document).bind(this).then(() => {
            if (this.props.onDocumentUpdated) {
                this.props.onDocumentUpdated(document);
            }
        });
    }

    @action clearCurrentDocumentProperties(): void {
        this.document.isOriginal = false;
        this.document.isActWithErasedPersonalData = false;
        this.document.documentTypeID = null;
        this.document.description = null;

        if (this.props.possibleDocumentGroupTypes.length == 1) {
            this.document.documentTypeID = this.props.possibleDocumentGroupTypes[0].documentTypeID;
            this.document.description = this.props.possibleDocumentGroupTypes[0].documentTypeName;
        } else {
            this.selectedDocumentTypeName = '';
        }
    }

    //#endregion

    //#region Document Upload Events

    @action onUploadClick() {
        if (!this.document.documentTypeID) {
            this.props.customErrors.splice(0, this.props.customErrors.length);

            // грешките се зачистват на 3 места, а не само в началото на onUploadClick, защото реда на изпълнение на event-ите е различен в IE И Chrome
            this.props.customErrors.push(this.getResource('GL_NOSELECT_ACTS_KIND_E'));
        } else {
            if (this.document.description == null || this.document.description == undefined || this.document.description.trim() == "")
                this.document.description = this.props.possibleDocumentGroupTypes.filter(dt => dt.documentTypeID == this.document.documentTypeID)[0].documentTypeName;
        }
    }

    @action onUploadError(errorMessage: string | Error, file: Dropzone.DropzoneFile) {
        this.props.customErrors.splice(0, this.props.customErrors.length);

        // грешките се зачистват на 3 места, а не само в началото на onUploadClick, защото реда на изпълнение на event-ите е различен в IE И Chrome
        if (errorMessage == this.getResource('GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E').replace('{FILE_FORMATS}', appConfig.acceptedFileExt)) {
            this.props.customErrors.push(errorMessage);
        } else if (errorMessage == this.getResource('GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E')) {
            this.props.customErrors.push(errorMessage.replace('{FILE_SIZE_IN_KB}', (file.size / (1024)).toFixed().toString() + ' kB')
                .replace('{MAX_FILE_SIZE}', appConfig.maxRequestLengthInKB + ' kB'));
        } else if (errorMessage == "GL_UPLOAD_FILE_E") {
            this.props.customErrors.push(this.getResource(errorMessage));
        } else {
            this.props.customErrors.push(this.getResource('GL_UPLOAD_ERR_E'));
        }
    }

    onDocumentUploaded(documentSent: any, response: any, dropzone: Dropzone): void {
        this.props.customErrors.splice(0, this.props.customErrors.length);

        // грешките се зачистват на 3 места, а не само в началото на onUploadClick, защото реда на изпълнение на event-ите е различен в IE И Chrome
        var attachedDocument = new AttachedDocument(response);
        attachedDocument.size = documentSent.size;

        this.props.registerAsyncOperation(this.props.applicationManager.processContext.addAttachedDocument(this.props.applicationManager.application, attachedDocument).bind(this).then(() => {
            if (this.props.onDocumentSaved) {
                this.props.onDocumentSaved(attachedDocument);
            }
        }));

        this.clearCurrentDocumentProperties();
        dropzone.removeAllFiles();
    }

    //#endregion
}

export const DocumentsGroupEditUI = withApplicationFormContext(withAsyncFrame(DocumentsGroupEditUIImpl));