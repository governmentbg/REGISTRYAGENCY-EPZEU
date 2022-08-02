import * as React from 'react'
import { observable, runInAction } from 'mobx'
import { observer } from 'mobx-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BaseProps, AsyncUIProps, withAsyncFrame } from 'Cnsys.UI.React'
import { EPZEUBaseComponent } from './EPZEUBaseComponent'
import { Button } from './CommonFields/Button'
import { ValidationSummaryErrors } from './ValidationSummary'
import { DocTemplateFormUI, DocTemplateForm } from './DocumentTemplateForm'
import { DocumentTemplate, Nomenclatures } from '../'

interface DocTemplateFormAddUIProps extends BaseProps, AsyncUIProps {
    documentTypeID: string;
    getTemplateFieldData: (key: string) => string;
    saveFormContent: (formContent: string) => Promise<void>;
}

@observer class DocTemplateFormAddUIImpl extends EPZEUBaseComponent<DocTemplateFormAddUIProps, any> {
    @observable template: DocumentTemplate;
    @observable templateForm: DocTemplateForm;

    constructor(props?: DocTemplateFormAddUIProps) {
        super(props);

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.addTemplateForm = this.addTemplateForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);

        this.loadTemplate();
    }

    componentDidUpdate(prevProps: DocTemplateFormAddUIProps, prevState: any, snapshot?: any): void {
        if (prevProps.documentTypeID != this.props.documentTypeID) {
            this.loadTemplate();
        }
    }

    render() {
        if (this.template) {
            return (
                <>
                    <Button className="btn btn-outline-light text-dark w-100" lableTextKey="TODO_Key_ДобавиШаблон" onClick={this.openModal}></Button>
                    <Modal centered={true} backdrop='static' autoFocus={true} isOpen={!!this.templateForm} onExit={this.closeModal} zIndex={2000}>
                        <ModalHeader toggle={() => this.templateForm ? this.closeModal() : this.openModal()}>
                            {this.getResource('TODO_Key_ДобавоШаблон')}
                        </ModalHeader>
                        <ModalBody>
                            <>
                                <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                                <DocTemplateFormUI getTemplateFieldData={this.props.getTemplateFieldData} isNewTemplateForm={true} templateForm={this.templateForm} />
                            </>
                        </ModalBody>
                        <ModalFooter>
                            <div className="button-bar">
                                <div className="left-side">
                                    <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_REFUSE_L')}</button>
                                </div>
                                <div className="right-side">
                                    <button id="BTN_MODAL_OK" type="button" className="btn btn-primary" onClick={this.addTemplateForm} data-dismiss="modal">{this.getResource('TODO_Key_ДобавиШаблон')}</button>
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

    addTemplateForm() {
        this.props.registerAsyncOperation(this.props.saveFormContent(this.templateForm.formContentHtml).bind(this).then(() => this.templateForm = null));
    }

    //#endregion

    //#region Helpers

    loadTemplate() {
        Nomenclatures.getDocumentTemplate(this.props.documentTypeID).bind(this).then(t => {
            runInAction(() => {
                this.templateForm = null;
                this.template = t
            })
        });
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

export const DocTemplateFormAddUI = withAsyncFrame(DocTemplateFormAddUIImpl, false);