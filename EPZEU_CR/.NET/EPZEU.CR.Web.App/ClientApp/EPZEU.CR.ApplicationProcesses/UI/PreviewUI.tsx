import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps, ConfirmationModal, ViewMode } from 'Cnsys.UI.React';
import { Button, EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderUI, Form } from 'EPZEU.CR.Domain';
import { action } from 'mobx';
import * as React from 'react';

interface PreviewUIProps extends BaseProps {
    forms: Form[];
    onEditApplication?: (form: Form) => void;
    onDeleteApplication?: (form: Form) => void;
}

var rejectApplication = ['GL_REJECT_MSG_00001_L', 'GL_REJECT_MSG_00002_L'];

export class PreviewUI extends EPZEUBaseComponent<PreviewUIProps, any> {

    constructor(props?: PreviewUIProps) {
        super(props);
        this.onHover = this.onHover.bind(this);
        this.onHoverLeave = this.onHoverLeave.bind(this);

    }

    render(): JSX.Element {

        return (
            <>
                {
                    this.hasErrorsInForms() ? (
                        <div key="error" className="alert alert-danger" role="alert">
                            {this.getResource("CR_APP_00001_E")}
                        </div>
                    ) : null
                }
                {this.props.forms.map((form => {
                    return this.renderForm(form);
                }))}
            </>
        );
    }

    renderForm(form: Form): JSX.Element {
        const guid = ObjectHelper.newGuid();
        var ApplicationUICmp = form.formUICmp;

        return (
            <div id={guid} key={form.order} className="interactive-container interactive-container--preview">
                <div className="interactive-container__content">
                    <ApplicationFormContextProviderUI applicationManager={form.formManager}>
                        <ApplicationUICmp formOrder={form.order} {...this.bind(form.form, ViewMode.Display, "application")} />
                    </ApplicationFormContextProviderUI>
                </div>
                {
                    form.canEdit &&
                    <div className="interactive-container__controls">
                        {this.props.onEditApplication && <Button className="btn btn-outline-light btn-sm" titlekey="GL_EDITING_L" onClick={() => { this.props.onEditApplication(form) }} onMouseOver={() => this.onHover(guid)} onMouseLeave={() => this.onHoverLeave(guid)} ><i className="ui-icon ui-icon-edit-color" aria-hidden="true"></i></Button>}
                        {this.props.onDeleteApplication && form.canDelete &&
                            <ConfirmationModal modalTitleKey='GL_REJECT_APPLICATION_L' modalTextKeys={rejectApplication} onSuccess={() => this.props.onDeleteApplication(form)} yesTextKey='GL_DECLINE_APPLICATION_L' noTextKey='GL_BACK_TO_APPLICATION_L'>
                                <Button className="btn btn-outline-light btn-sm" titlekey="GL_DELETE_L" onMouseOver={this.onHover.bind(this, guid)} onMouseLeave={this.onHoverLeave.bind(this, guid)}><i className="ui-icon ui-icon-times" aria-hidden="true"></i></Button>
                            </ConfirmationModal>
                        }
                    </div>
                }
            </div>
        )
    }

    hasErrorsInForms(): boolean {
        for (var form of this.props.forms) {

            if (form.errors && form.errors.length > 0)
                return true;
        }

        return false;
    }

    @action private onHover(guid: any) {
        $("#" + guid).addClass("interactive-container--focus");
    }

    @action private onHoverLeave(guid: any) {
        $("#" + guid).removeClass("interactive-container--focus");
    }
}