import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { AppInfoStatusUI, PassedFrom } from "EPZEU.CR.Core";
import { action } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { IncomingRequestForCorrectionSearchResult, IncomingRequestForCorrectionSearchResults } from '../Models/IncomingRequestForCorrectionSearch';

@observer export class IncomingRequestForCorrectionSearchResultUI extends EPZEUBaseComponent<BaseProps, IncomingRequestForCorrectionSearchResults> {

    private selectGroupName: string;

    constructor(props?: BaseProps) {
        super(props);

        this.selectGroupName = ObjectHelper.newGuid();
        this.handleSelect = this.handleSelect.bind(this);
    }

    render(): JSX.Element {
        let that = this;

        return <>
            {
                (this.model.incomingRequestForCorrectionSearchResults != null && this.model.incomingRequestForCorrectionSearchResults.length > 0) ?
                    <fieldset id="FE_result" className="">
                        <div className="field-container">
                            <div className="row">
                                <div className="form-group col">
                                    <label className="field-title field-title--form" >{this.getResource('GL_RESULT_L')}</label>
                                    <p className="field-text">
                                        <AppInfoStatusUI data={this.model.applicationInfo} />
                                    </p>
                                    <label className="field-title field-title--form" >{this.getResource('GL_SUBMITTED_VIA_L')}</label>
                                    <p className="field-text">
                                        {this.model.applicationInfo
                                            ? this.model.applicationInfo.passedFrom == PassedFrom.Internet ? this.getResource('GL_INTERNET_L') : this.model.applicationInfo.officeName
                                            : null}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive-block">
                            <table className="table table-borderless table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{this.getResource('CR_GL_ENTRY_NUMBER_L')}</th>
                                        <th>{this.getResource('CR_GL_COMPANY_ID_L')}</th>
                                        <th>{this.getResource('CR_GL_COMPANY_NAME_L')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.model.incomingRequestForCorrectionSearchResults.map((item: IncomingRequestForCorrectionSearchResult, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input className={"custom-control-input"} type="radio" id={that.selectGroupName + '_selectedEntryNumber' + index} onChange={that.handleSelect} name={this.selectGroupName} value={index.toString()} checked={that.model.incomingRequestForCorrectionSearchResults[index].isSelected} />
                                                        <label className={"custom-control-label"} htmlFor={that.selectGroupName + '_selectedEntryNumber' + index}></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="field-title field-title--preview d-sm-none">{that.getResource('CR_GL_ENTRY_NUMBER_L')}:</span>
                                                    <p className="field-text">{that.model.incomingRequestForCorrectionSearchResults[index].entryNumber}</p>
                                                </td>
                                                <td>
                                                    <span className="field-title field-title--preview d-sm-none">{that.getResource('CR_GL_COMPANY_ID_L')}:</span>
                                                    <p className="field-text">{that.model.incomingRequestForCorrectionSearchResults[index].indent}</p>
                                                </td>
                                                <td>
                                                    <span className="field-title field-title--preview d-sm-none">{that.getResource('CR_GL_COMPANY_NAME_L')}: </span>
                                                    <p className="field-text">{that.model
                                                        .incomingRequestForCorrectionSearchResults[index].name}</p>
                                                </td>
                                            </tr>

                                        )

                                    })}


                                </tbody>
                            </table>
                        </div>
                    </fieldset>
                    : null
            }
        </ >
    }

    @action private handleSelect(e: any) {
        if (this.model.incomingRequestForCorrectionSearchResults) {
            this.model.incomingRequestForCorrectionSearchResults.forEach((result: IncomingRequestForCorrectionSearchResult, index: number) => { result.isSelected = false });
            var index = +e.target.value;
            this.model.incomingRequestForCorrectionSearchResults[index].isSelected = true;
        }
    }
}