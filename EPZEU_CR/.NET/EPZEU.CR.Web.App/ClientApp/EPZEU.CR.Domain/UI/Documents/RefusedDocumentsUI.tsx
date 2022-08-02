import { BindableReference, ObjectHelper, UrlHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, DropDownList, Label, SelectListItem, withAsyncFrame } from 'Cnsys.UI.React';
import { ApplicationType, attributesClassFormControlMaxL14, Button, DocumentType, EPZEUBaseComponent, IDataServiceProviderProps, Nomenclatures, Registers, TextArea, TextBox, ValidationSummaryErrors, withDataServiceProvider } from 'EPZEU.Core';
import { ApplicationDocumentInfo, ApplicationInfo, ApplicationsService, Constants, downloadDocumentEvent, RefusalTypes } from 'EPZEU.CR.Core';
import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ApplicationFormContextProviderProps, AttachedDocument, SectionInfoUI, ProcessStates } from '../../';
import { withApplicationFormContext } from '../Applications/ApplicationFormContextProviderUI';

interface RefusedDocumentsUIProps extends BaseProps, AsyncUIProps, ApplicationFormContextProviderProps, IDataServiceProviderProps {
    possibleDocumentTypes: { documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[];
    saveRefusedDocuments: (documents: AttachedDocument[]) => Promise<void>;
    attachedDocumetsGuids: string[];
    isAct?: boolean;
}

var attributesClassFormControl = { className: 'form-control' };
var textInfoKeys1 = ['CR_APP_00216_I'];

@observer export class RefusedDocumentsUIImpl extends EPZEUBaseComponent<RefusedDocumentsUIProps, any> {
    applicationService: ApplicationsService = null;
    @observable isModalOpened: boolean = false;
    @observable errors: string[];

    @observable refusedApplication: ApplicationInfo = null;
    @observable refusedIncomingNumber: string = "";

    refusedDocuments: ApplicationDocumentInfo[] = null;
    @observable selectedRefusedDocuments: boolean[] = null;
    @observable editingRefusedDocuments: ApplicationDocumentInfo[] = null;

    @observable deedCaseRefusedApps: ApplicationInfo[];

    @observable refusedPossibleDocumentTypes: { documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[] = [];
    documentTypes: DocumentType[];

    constructor(props?: RefusedDocumentsUIProps) {
        super(props);

        this.applicationService = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveRefusedDocuments = this.saveRefusedDocuments.bind(this);
        this.searchRefusedDocuments = this.searchRefusedDocuments.bind(this);
        this.startEditingRefusedDocument = this.startEditingRefusedDocument.bind(this);
        this.refuseEditingDocument = this.refuseEditingDocument.bind(this);
        this.saveEditingRefusedDocument = this.saveEditingRefusedDocument.bind(this);
        this.onDocumentTypeChange = this.onDocumentTypeChange.bind(this);
        this.renderRefusedDocumentsList = this.renderRefusedDocumentsList.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.setChoosenValue = this.setChoosenValue.bind(this);

        this.props.registerAsyncOperation(Nomenclatures.getDocumentTypes(Registers.CR).bind(this).then(dts => {
            this.documentTypes = dts;
            this.refusedPossibleDocumentTypes = this.props.possibleDocumentTypes.filter(pdt => dts.filter(dt => dt.documentTypeID == pdt.documentTypeID && dt.isRefusalAttachable).length > 0);
        }));
    }

    render() {
        return (
            <>
                <div key="RefusalDocument" className="field-container">
                    <div className="row">
                        <div className="col-12">
                            {this.labelFor(m => m, this.props.isAct ? 'CR_APP_ACTS_REFUSAL_L' : 'CR_APP_DOCS_REFUSAL_L', { className: 'field-title field-title--form' })}
                        </div>
                    </div>
                    <div className="interactive-container interactive-container--form">
                        <div className="interactive-container__content record-container">
                            <div className="row">
                                <div className="col-12">

                                    <button className="btn btn-outline-light text-dark" onClick={this.openModal}><i className="ui-icon ui-icon-upload" aria-hidden="true"></i> {this.getResource('GL_SELECT_DOCUMENTS_REFUSAL_L')}</button>
                                </div>
                            </div>
                        </div>
                        <div className="interactive-container__controls">
                        </div>
                    </div>
                </div>
                <Modal centered={true} backdrop='static' autoFocus={true} isOpen={this.isModalOpened} onExit={this.closeModal}>
                    <ModalHeader toggle={this.isModalOpened ? this.closeModal : this.openModal}>
                        {this.getResource('CR_APP_DOCS_REFUSAL_L')}
                    </ModalHeader>
                    <ModalBody>
                        <>
                            <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                            <ValidationSummaryErrors errors={this.errors} />

                            {this.deedCaseRefusedApps && this.deedCaseRefusedApps.length > 0 &&
                                <>
                                    <div className="row">
                                        <div className="col">
                                            <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this, "refusedIncomingNumber")} labelText={this.getResource('CR_GL_BATCH_REFUSAL_L')} attributes={{ className: 'field-title field-title--form' }} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col col-sm-6 col-lg-5">
                                            <select className="form-control" value={this.refusedIncomingNumber} onChange={this.setChoosenValue} name={"name"} id={null} >
                                                <option key={0} value="">{this.getResource("GL_CHOICE_L")}</option>
                                                {this.deedCaseRefusedApps.map((app, i) => <option value={app.incomingNumber} key={app.incomingNumber}>{app.incomingNumber}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            }

                            <div className="row">
                                <div className="col">
                                    <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this, "refusedIncomingNumber")} labelText={this.getResource('GL_INCOM_APPL_NO_REFUSAL_L')} attributes={{ className: 'field-title field-title--form' }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col col-sm-6 col-lg-5">
                                    <TextBox fullHtmlName={this.refusedIncomingNumber} modelReference={new BindableReference(this, "refusedIncomingNumber")} attributes={attributesClassFormControlMaxL14} />
                                </div>
                                <div className="form-group col-auto">
                                    <Button type="button" className="btn btn-outline-light text-dark" lableTextKey={"GL_CHECK_L"} onClick={this.searchRefusedDocuments}>
                                        <i className="ui-icon ui-icon-import mr-1" aria-hidden="true"></i></Button>
                                </div>
                            </div>
                            {this.renderRefusedDocumentsList()}
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <div className="button-bar">
                            <div className="left-side">
                                <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_REFUSE_L')}</button>
                            </div>
                            <div className="right-side">
                                <button id="BTN_MODAL_OK" type="button" className="btn btn-primary" onClick={this.saveRefusedDocuments} data-dismiss="modal">{this.getResource('GL_SAVE_L')}</button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal >
            </>);
    }

    renderRefusedDocumentsList() {
        return (
            <>
                {this.refusedApplication ?
                    <div className="row">
                        <div className="form-group col-12">
                            {this.labelFor(m => m, 'GL_APPLICATION_TYPE_L', { className: "field-title field-title--form" })}
                            <p className="field-text">{this.refusedApplication.applicationTypeName}</p>
                        </div>
                    </div>
                    : null}

                {this.refusedApplication && this.refusedApplication.incomingLinkedDeeds && this.refusedApplication.incomingLinkedDeeds.length > 0 && (
                    <div>
                        <div className="row">
                            <div className="form-group col-sm-12">
                                {this.labelFor(m => m, 'CR_GL_TRADER_NPO_L', { className: "field-title field-title--form" })}
                                {this.refusedApplication.incomingLinkedDeeds.map((x) => (
                                    <p className="field-text" key={x.uic}>
                                        {!ObjectHelper.isStringNullOrEmpty(x.companyFullName) ? x.companyFullName : ""}
                                        {!ObjectHelper.isStringNullOrEmpty(x.companyFullName) && !ObjectHelper.isStringNullOrEmpty(x.uic) && ", "}
                                        {x.uic ? this.getResource('CR_GL_COMPANY_ID_L') + " " + x.uic : ""}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>)}
                {this.refusedApplication && this.refusedDocuments.length > 0 && (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <SectionInfoUI infoTextKey={textInfoKeys1} />
                                <label className='field-title field-title--form'>{this.getResource('GL_DOCUMENTS_ATTACHED_L')}</label>
                            </div>
                        </div>
                        <div className="table-responsive-block">
                            <table id="SELECTABLE_ROWS_1" className="table table-borderless table-striped table-hover">
                                <tbody>
                                    {this.refusedDocuments.map((doc, index) => {
                                        if (doc.documentTypeID.indexOf('5.') != 0) {
                                            return this.renderRefusedDocumentsListRecord(doc, index);
                                        }
                                        else {
                                            return null;
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className='field-title field-title--form'>{this.getResource('CR_APP_ANNOUNCEMENT_ACTS_L')}</label>
                            </div>
                        </div>
                        <div className="table-responsive-block">
                            <table id="SELECTABLE_ROWS_1" className="table table-borderless table-striped table-hover">
                                <tbody>
                                    {this.refusedDocuments.map((doc, index) => {
                                        let editingRefusedDocument = this.editingRefusedDocuments[index];
                                        if (doc.documentTypeID.indexOf('5.') == 0) {
                                            return this.renderRefusedDocumentsListRecord(doc, index);
                                        }
                                        else {
                                            return null;
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>)}
            </>);
    }

    renderRefusedDocumentsListRecord(doc: ApplicationDocumentInfo, index: number) {
        let editingRefusedDocument = this.editingRefusedDocuments[index];

        if (editingRefusedDocument) {
            return (
                <tr key={index}>
                    <td>
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input" value="option3" type="checkbox" checked />
                            <label className="custom-control-label"><span className="d-sm-none"></span></label>
                        </div>
                    </td>
                    <td className="w-100">
                        <p className="field-text">
                            <label className="field-title field-title--preview" htmlFor={'checkbox_' + index}>{doc.description}</label>
                        </p>
                        <div className="row">
                            <div className="form-group col-12">
                                <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(editingRefusedDocument, "documentTypeID")} labelText={this.getResource('GL_DOCUMENT_KIND_L')} />
                                <DropDownList fullHtmlName={this.props.fullHtmlName}
                                    modelReference={new BindableReference(editingRefusedDocument, "documentTypeID")}
                                    attributes={attributesClassFormControl}
                                    onChange={() => this.onDocumentTypeChange(editingRefusedDocument)}
                                    items={this.refusedPossibleDocumentTypes.map<SelectListItem>((dt) => { return { text: dt.documentTypeName, value: dt.documentTypeID, selected: false } })}
                                    hasEmptyElement={true}
                                    emptyElementValue={this.getResource('GL_CHOICE_L')}
                                />
                            </div>
                            <div className="form-group col-12">
                                <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(editingRefusedDocument, "description")} labelText={this.getResource('GL_NAME_L')} />
                                <TextArea fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(editingRefusedDocument, "description")} rows={3} attributes={{ className: 'form-control' }} />
                            </div>
                        </div>

                    </td>
                    <td className="buttons-td">
                        <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.DOCUMENT_ACCESS.replace(":guid", doc.guidWithCtx)}`)}
                            className="btn btn-secondary"
                            title={this.getResource("GL_DOWNLOAD_FILE_L")}
                            onClick={(event) => downloadDocumentEvent(event, doc.guidWithCtx)}>
                            <i className="ui-icon ui-icon-download" aria-hidden="true"></i>
                        </a>
                        <Button type="button" className="btn btn-secondary" title={this.getResource("GL_SAVE_L")} onClick={() => this.saveEditingRefusedDocument(editingRefusedDocument, index, false)}>
                            <i className="ui-icon ui-icon-check" aria-hidden="true"></i>
                        </Button>
                        <Button type="button" className="btn btn-secondary" title={this.getResource("GL_REFUSE_L")} onClick={() => this.refuseEditingDocument(index)}>
                            <i className="ui-icon ui-icon-ban" aria-hidden="true" data-dismiss></i>
                        </Button>
                    </td>
                </tr>);
        }
        else {
            return (
                <tr key={index}>
                    <td>
                        <div className="custom-control custom-checkbox">
                            {this.refusedPossibleDocumentTypes.filter(pdt => pdt.documentTypeID == doc.documentTypeID).length == 0 ?

                                <input className={"custom-control-input"} disabled={true} type="checkbox" onChange={(event: any) => this.checkBoxChange(event, index, false)} id={'checkbox_' + index} name={'checkbox_' + index} checked={this.selectedRefusedDocuments[index]} /> :
                                <input className={"custom-control-input"} type="checkbox" onChange={(event: any) => this.checkBoxChange(event, index, false)} id={'checkbox_' + index} name={'checkbox_' + index} checked={this.selectedRefusedDocuments[index]} />
                            }
                            <label className="custom-control-label" htmlFor={'checkbox_' + index}></label>
                        </div>
                    </td>
                    <td className="w-100">
                        <p>
                            <label className="field-title field-title--preview" htmlFor={'checkbox_' + index}>{doc.description}</label>
                        </p>
                    </td>
                    <td className="buttons-td">
                        <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.DOCUMENT_ACCESS.replace(":guid", doc.guidWithCtx)}`)}
                            className="btn btn-secondary"
                            title={this.getResource("GL_DOWNLOAD_FILE_L")}
                            onClick={(event) => downloadDocumentEvent(event, doc.guidWithCtx)}>
                            <i className="ui-icon ui-icon-download" aria-hidden="true"></i>
                        </a>
                        <Button type="button" className="btn btn-secondary" title={this.getResource("GL_EDITING_L")} onClick={() => this.startEditingRefusedDocument(index, false)}>
                            <i className="ui-icon ui-icon-edit-color" aria-hidden="true"></i>
                        </Button>
                    </td>
                </tr>);
        }
    }

    //#region EventsrefusedDocumentsActs

    @action setChoosenValue(e: any) {
        this.refusedIncomingNumber = e.target.value;
    }

    @action openModal() {
        if (this.props.applicationManager.additionalData.uic && this.props.applicationManager.processState != ProcessStates.Preregistration) {

            this.props.registerAsyncOperation(this.applicationService.getApplicationsInfoByUIC(this.props.applicationManager.additionalData.uic).bind(this).then(apps => {
                runInAction.bind(this)(() => {
                    this.deedCaseRefusedApps = null;

                    if (apps) {
                        for (var i = 0; i < apps.length; i++) {
                            if (apps[i].refusalType == RefusalTypes.Full || apps[i].refusalType == RefusalTypes.Partial) {

                                if (!this.deedCaseRefusedApps)
                                    this.deedCaseRefusedApps = [];

                                this.deedCaseRefusedApps.push(apps[i]);
                            }
                        }
                    }

                    this.refusedDocuments = null;
                    this.selectedRefusedDocuments = null;
                    this.editingRefusedDocuments = null;
                    this.refusedApplication = null;
                    this.isModalOpened = true;
                    this.refusedIncomingNumber = "";
                    this.errors = [];
                    this.props.clearErrors();
                });
            }));
        }
        else {
            this.deedCaseRefusedApps = null;
            this.refusedDocuments = null;
            this.refusedApplication = null;
            this.selectedRefusedDocuments = null;
            this.editingRefusedDocuments = null;
            this.isModalOpened = true;
            this.refusedIncomingNumber = "";
            this.errors = [];
            this.props.clearErrors();
        }
    }

    @action closeModal() {
        this.refusedDocuments = null;
        this.selectedRefusedDocuments = null;
        this.editingRefusedDocuments = null;
        this.refusedApplication = null;
        this.isModalOpened = false;
        this.refusedIncomingNumber = "";
        this.errors = [];
        this.props.clearErrors();
    }

    @action saveRefusedDocuments() {
        this.errors = null;
        this.props.clearErrors();

        if (this.refusedDocuments && this.refusedDocuments.length > 0) {
            var newRefusedDocuments: AttachedDocument[] = [];

            for (var i = 0; i < this.refusedDocuments.length; i++) {
                if (this.selectedRefusedDocuments[i]) {
                    var attDoc = new AttachedDocument();
                    attDoc.guid = this.refusedDocuments[i].guid;
                    attDoc.documentTypeID = this.refusedDocuments[i].documentTypeID;
                    attDoc.reusedIncomingNumber = this.refusedDocuments[i].incomingNumber;
                    attDoc.description = this.refusedDocuments[i].description;
                    attDoc.isOriginal = this.refusedDocuments[i].isOriginal;

                    attDoc.fileName = this.refusedDocuments[i].fileMetadata.fileName;
                    attDoc.contentType = this.refusedDocuments[i].fileMetadata.contentType;
                    attDoc.contentType = this.refusedDocuments[i].fileMetadata.contentType;
                    attDoc.size = this.refusedDocuments[i].fileMetadata.size;
                    attDoc.hashAlgorithm = this.refusedDocuments[i].fileMetadata.hashAlgorithm;
                    attDoc.hash = this.refusedDocuments[i].fileMetadata.hash;
                    attDoc.numberOfPages = this.refusedDocuments[i].fileMetadata.numberOfPages;

                    newRefusedDocuments.push(attDoc);
                }
            }

            if (newRefusedDocuments.length > 0) {
                if (newRefusedDocuments.filter(d => this.props.attachedDocumetsGuids.indexOf(d.guid) > -1).length > 0) {
                    this.errors = [];
                    this.errors.push(this.getResource('CR_APP_00008_E'));
                }
                else
                    this.props.registerAsyncOperation(this.props.saveRefusedDocuments(newRefusedDocuments).bind(this).then(this.closeModal))
            }
            else {
                this.closeModal();
            }
        }
        else {
            this.closeModal();
        }

    }

    @action searchRefusedDocuments() {
        this.errors = null;
        this.props.clearErrors();
        this.refusedDocuments = null;
        this.selectedRefusedDocuments = null;
        this.editingRefusedDocuments = null;
        this.refusedApplication = null;

        if (!this.refusedIncomingNumber || this.refusedIncomingNumber.trim().length == 0) {
            this.errors = [];
            this.errors.push(this.getResource('GL_NOSELECT_SEARCH_CRITERIA_E'));
        }
        else if (this.refusedIncomingNumber.length != 14) {
            this.errors = [];
            this.errors.push(this.getResource('CR_APP_00002_E'));
        }
        else {
            var appInfoPromise = this.applicationService.getApplicationInfoByIncommingNumber(this.refusedIncomingNumber);
            var appDocInfoPromise = this.applicationService.getApplicationDocumentsInfo(this.refusedIncomingNumber);

            this.props.registerAsyncOperation(Promise.all([appInfoPromise, appDocInfoPromise]).bind(this).then(result => {
                runInAction.bind(this)(() => {

                    if (result[0]) {
                        if (ObjectHelper.isNullOrUndefined(result[0].refusalType)) {
                            this.errors = [];
                            //Въведеният номер не е номер на заявление, по което има постановен отказ.
                            this.errors.push(this.getResource('CR_APP_00002_E'));

                            return;

                        } else {
                            //заявлението трябва да е за промяна
                            if (this.props.applicationManager.additionalData.uic &&
                                result[0].incomingLinkedDeeds &&
                                result[0].incomingLinkedDeeds.filter(d => d.uic).length > 0 &&
                                result[0].incomingLinkedDeeds.filter(d => d.uic == this.props.applicationManager.additionalData.uic).length == 0) {
                                this.errors = [];
                                //Въведеният номер на заявление не се отнася за партидата на търговеца/ЮЛНЦ, по която се иска вписване или обявяване.
                                this.errors.push(this.getResource('CR_APP_00104_E'));

                                return;

                            } else {
                                this.refusedApplication = result[0];
                                this.refusedDocuments = [];
                                this.selectedRefusedDocuments = [];
                                this.editingRefusedDocuments = [];
                            }
                        }

                        if (!result[1] || result[1].length == 0) {
                            this.errors = [];
                            //Няма приложени документи.
                            this.errors.push(this.getResource('GL_NOATTACHED_DOCUMENTS_E'));

                        } else {
                            for (var doc of result[1]) {
                                var docType = this.documentTypes.filter(dt => dt.documentTypeID == doc.documentTypeID)[0];

                                if (docType.isRefusalAttachable) {
                                    this.refusedDocuments.push(doc);
                                    this.selectedRefusedDocuments.push(false);
                                    this.editingRefusedDocuments.push(null);
                                }
                            }
                        }
                    } else {
                        this.errors = [];
                        //Въведеният номер не е номер на заявление, по което има постановен отказ.
                        this.errors.push(this.getResource('CR_APP_00002_E'));
                    }
                })
            }));
        }
    }

    checkBoxChange(event: any, index: number, isAct: boolean) {
        this.selectedRefusedDocuments[index] = event.target.checked;
    }

    @action startEditingRefusedDocument(index: number, act: boolean) {
        this.editingRefusedDocuments[index] = new ApplicationDocumentInfo(JSON.parse(JSON.stringify(this.refusedDocuments[index])));
    }

    @action saveEditingRefusedDocument(applicationDocumentInfo: ApplicationDocumentInfo, index: number, act: boolean) {
        let isAllowedDocumentType = this.refusedPossibleDocumentTypes.filter(pdt => pdt.documentTypeID == applicationDocumentInfo.documentTypeID).length > 0
        this.errors = [];

        if (applicationDocumentInfo.documentTypeID != "" && applicationDocumentInfo.description != null && applicationDocumentInfo.description != "" && isAllowedDocumentType) {
            this.refusedDocuments[index] = this.editingRefusedDocuments[index];
            this.editingRefusedDocuments[index] = null;

        } else if (!isAllowedDocumentType && applicationDocumentInfo.documentTypeID !== "") {

            //Когато имаме документ, който не е позволен за избиране. При опциите за избиране е отбелязано "Избери", въпреки че documentTypeID-то е различо от ""
            //Не е избран вид документ. 
            this.errors.push(this.getResource("GL_NOSELECT_ACTS_KIND_E"));

        } else {

            if (applicationDocumentInfo.documentTypeID == "") {
                //Не е избран вид документ.
                this.errors.push(this.getResource("GL_NOSELECT_ACTS_KIND_E"));

            } if (applicationDocumentInfo.description == null || applicationDocumentInfo.description == "") {
                //Не сте въвели наименование на документа.
                this.errors.push(this.getResource("CR_GL_DOCUMENT_NAME_NOT_INTRODUCED_E"));
            }
        }
    }

    @action refuseEditingDocument(index: number) {
        this.editingRefusedDocuments[index] = null;
        this.errors = [];
    }

    onDocumentTypeChange(document: ApplicationDocumentInfo) {
        document.description = document.documentTypeID ? this.refusedPossibleDocumentTypes.filter(dt => dt.documentTypeID == document.documentTypeID)[0].documentTypeName : null;
    }

    //#endregion
}

export const RefusedDocumentsUI = withDataServiceProvider(withApplicationFormContext(withAsyncFrame(RefusedDocumentsUIImpl, false)));