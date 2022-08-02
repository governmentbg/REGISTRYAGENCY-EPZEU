import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps, withAsyncFrame, AsyncUIProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, LegalForm, Nomenclatures } from 'EPZEU.Core';
import { LegalForms } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, F003_LegalForm, FieldContainerProps, withApplicationFormContext, withFieldRecordContainer, SectionSubTitle } from "EPZEU.CR.Domain";
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";

interface F003_LegalFormProps extends BaseProps, ApplicationFormContextProviderProps, FieldContainerProps, AsyncUIProps {
    possibleChoicesOfLegalForm?: LegalForms[];
    subTitleResourceKey?: string;
}

@observer class F003_LegalFormUI extends EPZEUBaseComponent<F003_LegalFormProps, F003_LegalForm> {
    @observable private _legalFormName: string
    private groupName: string;

    constructor(props?: F003_LegalFormProps) {
        super(props);

        if (this.model.code && Number(this.model.code))
            this.props.registerAsyncOperation(Nomenclatures.getLegalForm(+this.model.code).then(legalForm => this._legalFormName = legalForm.name))

        this.groupName = ObjectHelper.newGuid();
        this.handleChange = this.handleChange.bind(this);
    }

    renderEdit() {
        if (this.props.possibleChoicesOfLegalForm) {
            return <>
                {this.props.subTitleResourceKey ? <SectionSubTitle subTitleTextKey={this.props.subTitleResourceKey} /> : null}
                <div className="row">
                    <div className="form-group col-12">
                        {this.renderRadioButtons()}
                    </div>
                </div>
            </>;
        } else if (this._legalFormName) {
            return <>{this._legalFormName}</>
        }

        return null;
    }

    renderDisplay() {

        if (this.props.possibleChoicesOfLegalForm)
            return <>{this.radioButtonLabelResource(+this.model.code)}</>
        else if (this._legalFormName)
            return <div>{this._legalFormName}</div>

        return null;
    }

    private renderRadioButtons() {

        if (this.props.possibleChoicesOfLegalForm) {
            return this.props.possibleChoicesOfLegalForm.map((legalForm: any) => {
                let legalFormStr = LegalForms[legalForm];
                let legalFormType = ObjectHelper.toEnum(LegalForms, legalFormStr);

                return <div className="custom-control custom-radio" key={legalForm}>
                    <input className="custom-control-input" type="radio" onChange={this.handleChange} id={this.groupName + "_" + legalFormStr} name={this.groupName} value={legalForm} checked={this.model.code == legalForm ? true : false} />
                    <label className="custom-control-label" htmlFor={this.groupName + "_" + legalFormStr}>{this.radioButtonLabelResource(legalFormType)}</label>
                </div>
            })
        } else
            return null
    }

    radioButtonLabelResource(legalFormType: LegalForms) {
        switch (legalFormType) {
            case LegalForms.TPPD:
                return this.getResource("CR_GL_STATE_COMPANY_L");
            case LegalForms.TPPO:
                return this.getResource("CR_GL_MUNICIPAL_COMPANY_L");
            case LegalForms.EKD:
                return this.getResource("CR_GL_EUROPEAN_COOPERATIVE_COMPANY_L");
            case LegalForms.LEKD:
                return this.getResource("CR_GL_EUROPEAN_COOPERATIVE_LIMITED_COMPANY_L");

            default: return "LegalFormType_Key_NotFound"
        }
    }

    @action private handleChange(e: any) {
        this.model.code = e.target.value;
        this.model.text = this.radioButtonLabelResource(+e.target.value);
    }
}

export const F003_LegalFormFieldUI = withFieldRecordContainer(withApplicationFormContext(withAsyncFrame(F003_LegalFormUI)), {
    fieldLabelTextKey: "CR_F_3_L",
    isMandatoryField: true
});