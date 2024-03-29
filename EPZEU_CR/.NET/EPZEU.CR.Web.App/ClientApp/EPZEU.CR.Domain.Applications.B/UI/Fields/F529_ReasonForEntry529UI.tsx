﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProps, FieldContainerProps, withApplicationFormContext, withFieldContainer } from 'EPZEU.CR.Domain';
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { isIApplicationFormB7Manager } from '../../Common/B7FormManager';
import { F529_ReasonForEntry529 } from '../../Models/Fields/ModelsAutoGenerated';

interface F529_ReasonForEntry529UIProps extends ApplicationFormContextProps, FieldContainerProps {
}

@observer class F529_ReasonForEntry529UIImpl extends EPZEUBaseComponent<F529_ReasonForEntry529UIProps, F529_ReasonForEntry529> {
    private groupName: string;

    constructor(props?: F529_ReasonForEntry529UIProps) {
        super(props);

        this.groupName = ObjectHelper.newGuid();
        this.handleChange = this.handleChange.bind(this);
        this.renderChosenItem = this.renderChosenItem.bind(this);
    }

    renderEdit(): JSX.Element {
        return <>
            <div className="row">
                <div className="form-group col-12">
                    {this.renderChosenItem()}
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return <>{this.renderChosenItem()}
        </>
    }

    private renderChosenItem() {
        if (this.model.article63)
            return (
                <p className="field-text"> {this.getResource('CR_APP_00049_L')}</p>
            );
        else if (this.model.article6)
            return (
                <p className="field-text"> {this.getResource('CR_APP_00050_L')}</p>
            );
        else
            return null;
    }

    @action private handleChange(e: any) {
        if (e.target.value == 'article63') {
            this.model.article63 = true;
            this.model.article6 = false;
            if (isIApplicationFormB7Manager(this.props.applicationManager)) {
                this.props.applicationManager.clearArticle63UnrelatedFields();
            }
        } else if (e.target.value == 'article6') {
            this.model.article63 = false;
            this.model.article6 = true;
        }
    }
}

export const F529_ReasonForEntry529FieldUI = withFieldContainer(withApplicationFormContext(F529_ReasonForEntry529UIImpl), { fieldLabelTextKey: "CR_F_529_L" });
