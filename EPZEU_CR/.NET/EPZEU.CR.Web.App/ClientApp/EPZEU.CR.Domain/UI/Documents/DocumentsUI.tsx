import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { appConfig, EPZEUBaseComponent, ValidationSummaryErrors, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Fragment } from 'react';
import { AttachedDocument } from '../../Models/AttachedDocument';
import { ApplicationFormContextProviderProps, withApplicationFormContext } from '../Applications/ApplicationFormContextProviderUI';
import { DocumentsGroupEditUI, DocumentType } from './DocumentsGroupEditUI';
import { RefusedDocumentsUI } from './RefusedDocumentsUI';

interface DocumentsUIProps extends BaseProps, AsyncUIProps, ApplicationFormContextProviderProps {
    possibleDocumentTypesGetter: () => Promise<DocumentType[]>,
    disableDocumentRefusal?: boolean;
    isChangingNameDisabled?: boolean;
    isAct?: boolean
    onDocumentSaved?: (doc: AttachedDocument) => void;
    onDocumentUpdated?: (doc: AttachedDocument) => void;
    onDocumentDeleted?: (doc: AttachedDocument) => void;
    outerErrors?: string[]
    labelTextKey?: string;
}

@observer export class DocumentsUIImpl extends EPZEUBaseComponent<DocumentsUIProps, any> {
    @observable private customErrors: string[];
    @observable private isTypesLoaded: boolean = false;
    @observable private isContextInitialized: boolean = false;

    private allPossibleDocumentTypes: DocumentType[];

    // не задължителни за добавяне документи, тези за които minOccurs == 0;
    private groupPossibleDocumentTypes: DocumentType[];
    // задължителни за добавяне документи, тези, за които minOccurs > 0;
    private singlePossibleDocumentTypes: DocumentType[];

    private labelTextKey: string;

    @observable private reRender: boolean = false;

    private get documents(): AttachedDocument[] {
        return this.model;
    }

    constructor(props?: DocumentsUIProps) {
        super(props);

        this.customErrors = [];
        this.labelTextKey = this.props.labelTextKey ? this.props.labelTextKey : "GL_DESCRIPTION_L"

        this.initDocumentTypes = this.initDocumentTypes.bind(this);
        this.startDownloadDocument = this.startDownloadDocument.bind(this);
        this.renderDocumentDisplay = this.renderDocumentDisplay.bind(this);
        this.saveRefusedDocuments = this.saveRefusedDocuments.bind(this);

        this.initDocumentTypes();

        this.isContextInitialized = this.props.applicationManager.processContext.isContextInitialized;
    }

    renderEdit(): JSX.Element {
        //Ако не се ползва reRender в render метода, при промяна на пропартито няма да се викне render
        var reRender = this.reRender;

        if (this.isTypesLoaded) {
            return (
                <>
                    <div className="help-text">
                        <p>{this.getResource('GL_DOCUMENT_ALLOWED_FORMATS_I').replace('{FILE_FORMATS}', appConfig.acceptedFileExt)}<br /></p>
                    </div>
                    <ValidationSummaryErrors key="valSummary" errors={this.props.modelReference.getErrors()} />
                    {this.props.outerErrors && this.props.outerErrors.length > 0 ? <ValidationSummaryErrors key="valSummary-custom-errors" errors={this.props.outerErrors} /> : null}
                    {this.customErrors.length > 0 &&
                        <div key="errors" className="alert alert-danger">
                            <p>
                                {this.customErrors.map((error: string, index: number) => {
                                    return <Fragment key={index}>{error}<br /></Fragment>
                                })}
                            </p>
                        </div>
                    }
                    {this.singlePossibleDocumentTypes && this.singlePossibleDocumentTypes.length > 0 ?
                        this.singlePossibleDocumentTypes.map((dt, index) => {
                            return this.renderDocumentsEdit(index.toString(), [dt])
                        }) : null}
                    {this.groupPossibleDocumentTypes && this.groupPossibleDocumentTypes.length > 0 ?
                        this.renderDocumentsEdit("group", this.groupPossibleDocumentTypes) :
                        null}
                    {!this.props.disableDocumentRefusal &&
                        ((this.groupPossibleDocumentTypes && this.groupPossibleDocumentTypes.length > 0) ||
                            ((!this.groupPossibleDocumentTypes || this.groupPossibleDocumentTypes.length == 0) &&
                                (this.singlePossibleDocumentTypes && this.singlePossibleDocumentTypes.length > 0) &&
                                this.singlePossibleDocumentTypes.filter(dt => dt.maxOccurs > 1 || (dt.maxOccurs == 1 && this.documents.filter(d => d.documentTypeID == dt.documentTypeID).length == 0))
                            )) &&
                        this.renderDocumentRefusal()
                    }
                </>
            );
        }

        return null;
    }

    renderDisplay(): JSX.Element {
        let that = this;
        if (this.isTypesLoaded) {
            return (
                <>
                    <ValidationSummaryErrorsPreviewUI errors={this.props.modelReference.getErrors()} />

                    {this.singlePossibleDocumentTypes && this.singlePossibleDocumentTypes.length > 0 ?
                        this.singlePossibleDocumentTypes.filter(pdt => this.documents.filter(d => pdt.documentTypeID == d.documentTypeID).length > 0).map((docType, index) => {
                            return (
                                <div key={index} className="table-responsive-block">
                                    <table className="table table-borderless table-striped table-hover table-collapsible">
                                        <thead className="thead-invisible">
                                            <tr>
                                                <th className="single-icon-td"></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.documents.filter(docInt => docType.documentTypeID == docInt.documentTypeID).map(this.renderDocumentDisplay)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }) : null
                    }

                    {this.groupPossibleDocumentTypes && this.groupPossibleDocumentTypes.length > 0 && this.documents && this.documents.length > 0 ?
                        <div className="table-responsive-block">
                            <table className="table table-borderless table-striped table-hover table-collapsible">
                                <thead className="thead-invisible">
                                    <tr>
                                        <th className="single-icon-td"></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.documents.filter(dt => this.groupPossibleDocumentTypes.filter(pdt => pdt.documentTypeID == dt.documentTypeID).length > 0).map(this.renderDocumentDisplay)}
                                </tbody>
                            </table>
                        </div>
                        : null}

                </>
            )
        }
        return null;
    }

    //#region Render helpers

    renderDocumentsEdit(key: string, possibleDocumentTypes: DocumentType[]): JSX.Element {
        return (
            <DocumentsGroupEditUI
                key={key}
                applicationManager={this.props.applicationManager}
                documents={this.documents}
                possibleDocumentGroupTypes={possibleDocumentTypes}
                disableDocumentRefusal={this.props.disableDocumentRefusal}
                isChangingNameDisabled={this.props.isChangingNameDisabled}
                isAct={this.props.isAct}
                onDocumentSaved={this.props.onDocumentSaved}
                onDocumentUpdated={this.props.onDocumentUpdated}
                onDocumentDeleted={this.props.onDocumentDeleted}
                labelTextKey={this.labelTextKey}
                startDownloadDocument={this.startDownloadDocument}
                customErrors={this.customErrors}
                fullHtmlName={`${this.props.fullHtmlName}_${key}`}
                viewMode={this.props.viewMode}
            />);
    }

    renderDocumentRefusal() {
        return (
            <RefusedDocumentsUI key="RefusalDocument"
                fullHtmlName="RefusalDocument"
                possibleDocumentTypes={this.allPossibleDocumentTypes}
                attachedDocumetsGuids={this.props.applicationManager.processContext.documents.map(d => d.guid)}
                saveRefusedDocuments={this.saveRefusedDocuments}
                isAct={this.props.isAct}
            />
        );
    }

    renderDocumentDisplay(doc: AttachedDocument, index: number) {
        if (doc.guid) {
            return (
                <Fragment key={doc.guid}>
                    <tr className={index % 2 === 0 ? 'even-color' : 'odd-color'}>
                        <td className="toggle-collapse">
                            <button className="system-button collapsed" id={`collapsable-trigger-${doc.guid}`} onClick={() => this.collapseRow(`collapsable-content-${doc.guid}`, doc.guid)}>
                                <i className="ui-icon ui-icon-chevron-right"></i>
                            </button>
                        </td>
                        <td>
                            <p className="field-text">
                                <i className="ui-icon ui-icon-download-color mr-1"></i><a href={this.isContextInitialized ? this.props.applicationManager.processContext.getAttachedDocumentCopyDownloadURL(doc) : null}
                                    onClick={(event) => this.startDownloadDocument(event, doc)}>
                                    {doc.description}</a>
                            </p>
                        </td>
                    </tr>
                    <tr className="collapsible-row">
                        <td colSpan={2}>
                            <div id={`collapsable-content-${doc.guid}`} className="collapse">
                                <div className="collapsible-row-content">
                                    <p className="field-text">
                                        {doc.isOriginal ? <><span className="text-muted">{this.getResource('GL_DOCUMENT_ORIGINAL_L')}</span><br /></> : null}
                                        {doc.size ? <><span className="text-muted">{this.getResource('GL_DOCUMENT_SIZE_L')}: {(doc.size / (1024 * 1024)).toFixed(2)} MB</span></> : null}
                                        {doc.numberOfPages ? <><br /><span className="text-muted">{this.getResource('GL_COUNT_PAGES_L')}: {doc.numberOfPages}</span></> : null}
                                        <br />{this.allPossibleDocumentTypes.filter(dt => dt.documentTypeID == doc.documentTypeID)[0].documentTypeName}
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </Fragment>)
        }
        else {
            return (
                <tr className={index % 2 === 0 ? 'even-color' : 'odd-color'}>
                    <td></td>
                    <td>
                        <p className="field-text">
                            <i className="ui-icon ui-icon-download-color mr-1"></i>
                            <a href={this.isContextInitialized ? this.props.applicationManager.processContext.getAttachedDocumentCopyDownloadURL(doc) : null}
                                onClick={(event) => this.startDownloadDocument(event, doc)}>
                                {doc.description}</a>
                        </p>
                    </td>
                </tr>)
        }
    }

    //#endregion

    //#region Helpers

    private initDocumentTypes(): void {
        this.props.registerAsyncOperation(this.props.possibleDocumentTypesGetter().bind(this).then(pTypes => {

            if (pTypes && pTypes.length > 0) {
                this.allPossibleDocumentTypes = pTypes;

                for (var pType of pTypes) {
                    if (pType.minOccurs > 0) {
                        if (!this.singlePossibleDocumentTypes) {
                            this.singlePossibleDocumentTypes = [];
                        }

                        this.singlePossibleDocumentTypes.push(pType)
                    }
                    else {
                        if (!this.groupPossibleDocumentTypes) {
                            this.groupPossibleDocumentTypes = [];

                            var document: AttachedDocument = new AttachedDocument();
                            document.isOriginal = false;
                            document.isActWithErasedPersonalData = false;
                        }

                        this.groupPossibleDocumentTypes.push(pType)
                    }
                }

                if (this.singlePossibleDocumentTypes) {
                    this.singlePossibleDocumentTypes = this.singlePossibleDocumentTypes.sort((item1, item2) =>
                        item1.maxOccurs == -1 ? 1 : item2.maxOccurs == -1 ? -1 :
                            item1.maxOccurs < item2.maxOccurs ? -1 : 1);

                    for (var i: number = 0; i < this.singlePossibleDocumentTypes.length; i++) {

                        var document: AttachedDocument = new AttachedDocument();
                        document.isOriginal = false;
                        document.isActWithErasedPersonalData = false;
                        document.documentTypeID = this.singlePossibleDocumentTypes[i].documentTypeID;
                        document.description = this.singlePossibleDocumentTypes[i].documentTypeName;
                    }
                }

                this.isTypesLoaded = true;
            }
        }))
    }

    //#endregion

    //#region Events

    collapseRow(targetId: string, itemId: string): void {
        let triger = $(`#collapsable-trigger-${itemId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    startDownloadDocument(event: any, doc: AttachedDocument) {
        event.preventDefault();

        this.props.registerAsyncOperation(this.props.applicationManager.processContext.getAttachedDocumentDownloadURL(doc).then(downloadUrl => {

            var pom = document.createElement('a');
            pom.setAttribute('href', downloadUrl);
            pom.setAttribute('target', '_blank');

            document.body.appendChild(pom);

            pom.click();

            document.body.removeChild(pom);
        }));
    }

    saveRefusedDocuments(documents: AttachedDocument[]) {
        if (documents && documents.length > 0) {
            var docPromises: Promise<AttachedDocument>[] = []

            for (var doc of documents) {
                docPromises.push(this.props.applicationManager.processContext.addAttachedDocument(this.props.applicationManager.application, doc));
            }

            return Promise.all(docPromises).bind(this).then(docs => {
                if (this.props.onDocumentSaved) {
                    for (var doc of docs) {
                        this.props.onDocumentSaved(doc);
                    }
                }

                this.reRender = !this.reRender;
            })
        }

        return Promise.resolve();
    }

    //#endregion
}

export const DocumentsUI = withApplicationFormContext(withAsyncFrame(DocumentsUIImpl));