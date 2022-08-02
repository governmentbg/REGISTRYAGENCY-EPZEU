﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProps, RecordContainerProps, withFieldRecordContainer, SectionSubTitle } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F02204_AddemptionOfForeignTrader } from '../../Models/Fields/ModelsAutoGenerated';

interface F02204_AddemptionOfForeignTraderProps extends ApplicationFormContextProps, RecordContainerProps {

}

class F02204_AddemptionOfForeignTraderImpl extends EPZEUBaseComponent<F02204_AddemptionOfForeignTraderProps, F02204_AddemptionOfForeignTrader> {

    renderEdit(): JSX.Element {
        return <div className="row">
            <div className="form-group col-12">
                <SectionSubTitle subTitleTextKey={"CR_GL_DELETION_FOREIGN_TRADER_L"} />

                <div className="custom-control custom-checkbox">
                    {this.checkBoxFor(x => x.checked, "GL_DELETED_L")}
                </div>
            </div>
        </div>

    }

    renderDisplay(): JSX.Element {
        return <>{this.model.checked && `${this.getResource('CR_GL_DELETION_FOREIGN_TRADER_L')}: ${this.getResource('GL_OK_L')}`}</>
    }
}

export const F02204_AddemptionOfForeignTraderUI = withFieldRecordContainer(F02204_AddemptionOfForeignTraderImpl, {});