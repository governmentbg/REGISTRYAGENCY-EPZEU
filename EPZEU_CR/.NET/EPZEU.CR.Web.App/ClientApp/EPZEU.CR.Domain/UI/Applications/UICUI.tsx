import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import * as React from "react";
import { F001_UIC } from '../../';
import { ObjectHelper } from 'Cnsys.Core';

export class F001_UICUI extends EPZEUBaseComponent<BaseProps, F001_UIC> {
    constructor(props?: any) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return (this.model && !ObjectHelper.isStringNullOrEmpty(this.model.text)) ? (
            <div className="field-container">
                <div className='row'>
                    <div className='col'>
                        {this.labelFor(m => m.text, 'CR_F_1_L', { className: 'field-title field-title--form' })}
                    </div>
                </div>
                <div className="field-text"> {this.model.text}</div>
            </div>
        ) : null;
    }

    renderDisplay(): JSX.Element {
        return (this.model && !ObjectHelper.isStringNullOrEmpty(this.model.text)) ? (
            <div className="field-container">
                <h3 className="field-title field-title--preview">{this.getResource("CR_F_1_L")}</h3>
                <div className="record-container record-container--preview">
                    <p className="field-text"> {this.model.text}</p>
                </div>
            </div>
        ) : null;
    }
}
