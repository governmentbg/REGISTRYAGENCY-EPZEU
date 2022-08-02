﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps, ProcessStates, RecordContainerProps, withApplicationFormContext, withRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F02534_DonationAndWills25v } from '../../Models/Fields/ModelsAutoGenerated';

interface F02534_DonationAndWills25vProps extends ApplicationFormContextProviderProps, RecordContainerProps {
}

class F02534_DonationAndWills25vUIImpl extends EPZEUBaseComponent<F02534_DonationAndWills25vProps, F02534_DonationAndWills25v> {

    renderEdit(): JSX.Element {
        return <div className="row">
            <div className="form-group col-12">
                <div className="custom-control custom-checkbox">
                    {this.checkBoxFor(x => x.cheked, "CR_APP_DONATIONS_L",
                        { className: "custom-control-input", disabled: this.props.applicationManager.processState == ProcessStates.ForChange && this.model.initialState.cheked === true ? true : false })}
                </div>
            </div>
        </div>
    }

    renderDisplay(): JSX.Element {
        return (<>{
            this.model.cheked && this.getResource('CR_APP_DONATIONS_L')} <br /></>);
    }
}

export const F02534_DonationAndWills25vUI = withApplicationFormContext(withRecordContainer(F02534_DonationAndWills25vUIImpl));