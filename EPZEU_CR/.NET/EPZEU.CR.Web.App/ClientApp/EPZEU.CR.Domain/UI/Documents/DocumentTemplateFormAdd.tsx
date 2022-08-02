import { BindableReference } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, Label, TextArea, withAsyncFrame } from 'Cnsys.UI.React';
import { DocTemplateForm, DocTemplateFormUI, DocumentTemplate, DocumentTemplateFields, EPZEUBaseComponent, Nomenclatures, ValidationSummaryErrors, attributesClassFormControl, fieldTitleLabelAttributes } from 'EPZEU.Core';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ApplicationFormContextProviderProps, withApplicationFormContext } from '../Applications/ApplicationFormContextProviderUI';

interface DocTemplateFormAddUIProps extends BaseProps, AsyncUIProps, ApplicationFormContextProviderProps {
    documentTypeID: string;
    documentTypeName: string;
    documentName: string;
    saveFormContent: (formContent: string, documentName: string) => Promise<void>;
    onFormInitialized: (loadContext: { hasTemplate: boolean }) => void;
}

@observer class DocTemplateFormAddUIImpl extends EPZEUBaseComponent<DocTemplateFormAddUIProps, any> {
    @observable template: DocumentTemplate;
    @observable templateForm: DocTemplateForm;
    @observable documentName: string;
    @observable errors: string[] = [];

    constructor(props?: DocTemplateFormAddUIProps) {
        super(props);

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.addTemplateForm = this.addTemplateForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleOpenCloseModal = this.toggleOpenCloseModal.bind(this);

        this.loadTemplate();
        this.documentName = this.props.documentName ? this.props.documentName : "";
    }

    componentDidUpdate(prevProps: DocTemplateFormAddUIProps, prevState: any, snapshot?: any): void {
        if (prevProps.documentTypeID != this.props.documentTypeID) {
            this.loadTemplate();
        }

        if (prevProps.documentName != this.props.documentName) {
            this.documentName = this.props.documentName ? this.props.documentName : "";
        }
    }

    render() {
        if (this.template) {
            return (
                <>
                    <button type="button" className="btn btn-outline-light text-dark" onClick={this.openModal}>
                        <i className="ui-icon ui-icon-edit-color mr-1" aria-hidden="true"></i>{this.getResource('GL_FILL_DECLARATION_L')}
                    </button>
                    <Modal centered={true} backdrop='static' autoFocus={true} isOpen={!!this.templateForm} onExit={this.closeModal}>
                        <ModalHeader tag={'h3'} toggle={this.toggleOpenCloseModal}>
                            {this.props.documentTypeName}
                        </ModalHeader>
                        <ModalBody>
                            <>
                                <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                                <ValidationSummaryErrors errors={this.errors} />
                                <div className='row'>
                                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                                    <div className="form-group col-12">
                                        <Label fullHtmlName="form" modelReference={new BindableReference(this, "documentName")} attributes={fieldTitleLabelAttributes} labelText={this.getResource('GL_NAME_L')} />
                                        <TextArea fullHtmlName="form" modelReference={new BindableReference(this, "documentName")} attributes={{ className: "form-control", maxLength: 2000 }} rows={3} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='form-group col-12'>
                                        <div className='form-control-box'>
                                            <DocTemplateFormUI
                                                getTemplateFieldData={(key: any) => {
                                                    var keyEnum: any = DocumentTemplateFields[key];
                                                    return this.props.applicationManager.getTemplateFieldData(keyEnum);
                                                }}
                                                isNewTemplateForm={true}
                                                templateForm={this.templateForm} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        </ModalBody>
                        <ModalFooter>
                            <div className="button-bar">
                                <div className="left-side">
                                    <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_REFUSE_L')}</button>
                                </div>
                                <div className="right-side">
                                    <button id="BTN_MODAL_OK" type="button" className="btn btn-primary" onClick={this.addTemplateForm} data-dismiss="modal">{this.getResource('GL_SAVE_L')}</button>
                                </div>
                            </div>
                        </ModalFooter>
                    </Modal >
                </>);
        }

        return null;
    }

    //#region Modal events

    openModal() {
        this.props.registerAsyncOperation(this.createNewTemplateForm());
    }

    closeModal() {
        this.templateForm = null;
    }

    toggleOpenCloseModal() {
        this.templateForm ? this.closeModal() : this.openModal();
    }

    addTemplateForm() {
        this.errors = [];

        if (!this.documentName || this.documentName.trim().length == 0) {
            this.errors.push(this.getResource('CR_APP_00036_E'));
        }

        if (this.errors.length == 0) {
            this.props.registerAsyncOperation(this.props.saveFormContent(this.templateForm.formContentHtml, this.documentName).bind(this).then(() => this.templateForm = null));
        }
    }

    //#endregion

    //#region Helpers

    loadTemplate() {
        this.props.registerAsyncOperation(Nomenclatures.getDocumentTemplate(this.props.documentTypeID).bind(this).then(t => {
            runInAction(() => {
                this.templateForm = null;
                this.template = t
                this.props.onFormInitialized({ hasTemplate: this.template ? true : false });
            });
        }));
    }

    createNewTemplateForm(): Promise<void> {
        return Nomenclatures.getDocumentTemplateContent(this.template.documentTemplateID).bind(this).then(formContent => {
            runInAction(() => {
                this.templateForm = { formContentHtml: formContent };
            });
        });
    }

    //#endregion
}

export const DocTemplateFormAddUI = withApplicationFormContext(withAsyncFrame(DocTemplateFormAddUIImpl, false));