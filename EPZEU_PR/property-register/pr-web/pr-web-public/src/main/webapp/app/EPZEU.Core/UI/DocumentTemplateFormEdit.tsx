import * as React from 'react'
import { observable, runInAction } from 'mobx'
import { observer } from 'mobx-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BaseProps, AsyncUIProps, withAsyncFrame } from 'Cnsys.UI.React'
import { EPZEUBaseComponent } from './EPZEUBaseComponent'
import { Button } from './CommonFields/Button'
import { ValidationSummaryErrors } from './ValidationSummary'
import { DocTemplateFormUI, DocTemplateForm } from './DocumentTemplateForm'

interface DocTemplateFormEditUIProps extends BaseProps, AsyncUIProps {
    getTemplateFieldData: (key: string) => string;
    loadFormContent: () => Promise<string>;
    saveFormContent: (formContent: string) => Promise<void>;
}

@observer class DocTemplateFormEditUIImpl extends EPZEUBaseComponent<DocTemplateFormEditUIProps, any> {
    @observable templateForm: DocTemplateForm;

    constructor(props?: DocTemplateFormEditUIProps) {
        super(props);

        this.addTemplateForm = this.addTemplateForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    render() {
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
                            <DocTemplateFormUI getTemplateFieldData={this.props.getTemplateFieldData} templateForm={this.templateForm} isNewTemplateForm={false} />
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

    //#region Modal events

    openModal() {
        this.props.registerAsyncOperation(this.props.loadFormContent().bind(this).then(formContent => {
            this.templateForm = { formContentHtml: formContent };
        }));
    }

    closeModal() {
        this.templateForm = null;
    }

    addTemplateForm() {
        this.props.registerAsyncOperation(this.props.saveFormContent(this.templateForm.formContentHtml).bind(this).then(() => this.templateForm = null));
    }

    //#endregion
}

export const DocTemplateFormEditUI = withAsyncFrame(DocTemplateFormEditUIImpl, false);