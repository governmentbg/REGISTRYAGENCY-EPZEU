import { ArrayHelper, BindableReference } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, Label, SelectListItem, withAsyncFrame } from 'Cnsys.UI.React';
import { attributesClassFormControl, AutoComplete, Button, DocTemplateForm, DocTemplateFormUI, DocumentTemplateFields, EPZEUBaseComponent, fieldTitleLabelAttributes, TextArea, ValidationSummaryErrors } from 'EPZEU.Core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ApplicationFormContextProviderProps, AttachedDocument } from '../../';
import { withApplicationFormContext } from '../Applications/ApplicationFormContextProviderUI';
import { DocumentType } from './DocumentsGroupEditUI';

interface EditDocumentUIProps extends BaseProps, AsyncUIProps, ApplicationFormContextProviderProps {
    possibleDocumentTypes: DocumentType[];
    updateDocument: (document: AttachedDocument) => Promise<void>;
    containerID: string;
}

@observer export class EditDocumentUIImpl extends EPZEUBaseComponent<EditDocumentUIProps, AttachedDocument> {
    @observable editingDocument: AttachedDocument;
    @observable errors: string[] = [];
    @observable possibleDocumentTypes: DocumentType[];
    @observable templateForm: DocTemplateForm;
    @observable private selectedDocumentTypeName: string;

    constructor(props?: EditDocumentUIProps) {
        super(props);

        this.startEditing = this.startEditing.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateDocument = this.updateDocument.bind(this);
        this.onDocumentTypeChange = this.onDocumentTypeChange.bind(this);
        this.selectDocumentType = this.selectDocumentType.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onHoverLeave = this.onHoverLeave.bind(this);
    }

    render() {
        return (
            <>
                <Button type="button" className="btn btn-outline-light btn-sm" title={this.getResource('GL_EDITING_L')} onClick={this.startEditing} onMouseOver={() => { this.onHover(this.props.containerID) }} onMouseLeave={() => { this.onHoverLeave(this.props.containerID) }}>
                    <i className="ui-icon ui-icon-edit-color" aria-hidden="true"></i>
                </Button>
                <Modal centered={true} backdrop='static' autoFocus={true} isOpen={!!this.editingDocument} onExit={this.closeModal}>
                    <ModalHeader toggle={this.editingDocument ? this.closeModal : this.startEditing}>
                        {this.getResource('CR_GL_DOCUMENT_EDIT_L')}
                    </ModalHeader>
                    <ModalBody>
                        <>
                            <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                            <ValidationSummaryErrors errors={this.errors} />
                            {this.editingDocument && this.editingDocument.guid &&
                                this.renderEditDocument()}
                            {this.editingDocument && !this.editingDocument.guid &&
                                this.renderEditDocumentFromTemplate()}
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <div className="button-bar">
                            <div className="left-side">
                                <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_REFUSE_L')}</button>
                            </div>
                            <div className="right-side">
                                <button id="BTN_MODAL_OK" type="button" className="btn btn-primary" onClick={this.updateDocument} data-dismiss="modal">{this.getResource('GL_SAVE_L')}</button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal >
            </>);
    }

    renderEditDocumentFromTemplate() {
        return (
            <div className="row">
                <div className="form-group col-12" >
                    <p className="field-text">
                        {this.props.possibleDocumentTypes.filter(dt => dt.documentTypeID == this.editingDocument.documentTypeID)[0].documentTypeName}
                    </p>
                </div>
                <div className="form-group col-12">
                    <Label fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.editingDocument, "description")} labelText={this.getResource('GL_NAME_L')} />
                    <TextArea fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.editingDocument, "description")} attributes={attributesClassFormControl} rows={3} />
                </div>
                {!this.editingDocument.signingGuid &&
                    <DocTemplateFormUI
                        getTemplateFieldData={(key: any) => {
                            var keyEnum: any = DocumentTemplateFields[key];
                            return this.props.applicationManager.getTemplateFieldData(keyEnum);
                        }}
                        isNewTemplateForm={false}
                        templateForm={this.templateForm} />
                }
            </div>);
    }

    renderEditDocument() {
        return (
            <div className="row">
                <div className="form-group col-12" >
                    <Label attributes={fieldTitleLabelAttributes} fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.editingDocument, "documentTypeID")} labelText={this.getResource('GL_DOCUMENT_KIND_L')} />
                    <AutoComplete
                        fullHtmlName={this.props.fullHtmlName}
                        modelReference={new BindableReference(this, () => this.selectedDocumentTypeName)}
                        selector={this.selectDocumentType}
                        showValue={(value: SelectListItem): string => { return value.text.toString(); }}
                        handleSelectCallback={(value?: SelectListItem) => { this.editingDocument.description = value.text; this.editingDocument.documentTypeID = value.value }}
                        hasSelectedValue={this.editingDocument.documentTypeID ? true : false}
                        handleChangeCallback={() => { this.editingDocument.documentTypeID = null; }}
                        triggerLength={0}
                        attributes={attributesClassFormControl}/>
                </div>
                <div className="form-group col-12">
                    <Label attributes={fieldTitleLabelAttributes} fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.editingDocument, "description")} labelText={this.getResource('GL_NAME_L')} />
                    <TextArea fullHtmlName={this.props.fullHtmlName} modelReference={new BindableReference(this.editingDocument, "description")} rows={3} attributes={attributesClassFormControl} />
                </div>
            </div>
        )
    }

    //#region Events

    private onHover(containerID: string) {
        $("#" + containerID).addClass("interactive-container--focus");
    }

    private onHoverLeave(containerID: string) {
        $("#" + containerID).removeClass("interactive-container--focus");
    }

    onDocumentTypeChange() {
        this.editingDocument.description = this.editingDocument.documentTypeID ? this.props.possibleDocumentTypes.filter(dt => dt.documentTypeID == this.editingDocument.documentTypeID)[0].documentTypeName : null;
    }

    @action startEditing() {
        this.editingDocument = new AttachedDocument(JSON.parse(JSON.stringify(this.model)));
        this.templateForm = { formContentHtml: this.editingDocument.htmlTemplateContent }

        this.selectedDocumentTypeName = ArrayHelper.queryable.from(this.props.possibleDocumentTypes)
            .firstOrDefault((docType: DocumentType) => docType.documentTypeID == this.model.documentTypeID).documentTypeName;
    }

    @action closeModal() {
        this.editingDocument = null;
        this.templateForm = null;
    }

    @action updateDocument() {
        this.props.clearErrors();
        this.errors = [];

        if (!this.editingDocument.documentTypeID) {
            this.errors.push(this.getResource('GL_NOSELECT_ACTS_KIND_E'));
        }

        if (!this.editingDocument.description || this.editingDocument.description.trim().length == 0) {
            this.errors.push(this.getResource('CR_APP_00036_E'));
        }

        if (this.errors.length == 0) {
            this.editingDocument.htmlTemplateContent = this.templateForm.formContentHtml;

            this.props.registerAsyncOperation(this.props.updateDocument(this.editingDocument).bind(this).then(() => {
                this.closeModal();
            }))
        }
    }

    //#endregion

    //#region Document Types

    selectDocumentType(value: string): Promise<SelectListItem[]> {

        var valueLowerCase = value.toLowerCase();

        let res = this.props.possibleDocumentTypes.filter(s => {
            return s.documentTypeName.toString().toLowerCase().indexOf(" " + valueLowerCase) > -1
                || s.documentTypeName.toString().toLowerCase().indexOf(valueLowerCase) == 0;
        }).map<SelectListItem>((dt) => { return { text: dt.documentTypeName, value: dt.documentTypeID, selected: false } })

        return Promise.resolve(res);
    }

    //#endregion
}

export const EditDocumentUI = withApplicationFormContext(withAsyncFrame(EditDocumentUIImpl, false));