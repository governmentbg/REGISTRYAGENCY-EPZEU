import * as React from "react";
import { action } from 'mobx'
import { observer } from "mobx-react";
import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { AppealRefusalSearchResult, AppealRefusalSearchResults } from '../Models/AppealRefusalSearch'


@observer export class AppealRefusalSearchResultUI extends EPZEUBaseComponent<BaseProps, AppealRefusalSearchResults> {

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
                (this.model.appealRefusalSearchResults != null && this.model.appealRefusalSearchResults.length > 0) ?
                    < fieldset id="FE_result" className="">
                        <div className="table-responsive-block">
                            <table className="table table-borderless table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{this.getResource('CR_GL_COMPANY_ID_L')}</th>
                                        <th>{this.getResource('CR_GL_COMPANY_NAME_L')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.model.appealRefusalSearchResults.map((item: AppealRefusalSearchResult, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input className={"custom-control-input"} type="radio" id={that.selectGroupName + '_selectedIncomingNumber' + index} onChange={that.handleSelect} name={this.selectGroupName} value={index.toString()} checked={that.model.appealRefusalSearchResults[index].isSelected} />
                                                        <label className={"custom-control-label"} htmlFor={that.selectGroupName + '_selectedIncomingNumber' + index}></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="field-title field-title--preview d-sm-none">{that.getResource('CR_GL_COMPANY_ID_L')}:</span>
                                                    <p className="field-text">{that.model.appealRefusalSearchResults[index].indent}</p>
                                                </td>
                                                <td>
                                                    <span className="field-title field-title--preview d-sm-none">{that.getResource('CR_GL_COMPANY_NAME_L')}: </span>
                                                    <p className="field-text">{that.model
                                                        .appealRefusalSearchResults[index].name}</p>
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
        if (this.model.appealRefusalSearchResults) {
            this.model.appealRefusalSearchResults.forEach((result: AppealRefusalSearchResult, index: number) => { result.isSelected = false });
            var index = +e.target.value;
            this.model.appealRefusalSearchResults[index].isSelected = true;
        }
    }
}