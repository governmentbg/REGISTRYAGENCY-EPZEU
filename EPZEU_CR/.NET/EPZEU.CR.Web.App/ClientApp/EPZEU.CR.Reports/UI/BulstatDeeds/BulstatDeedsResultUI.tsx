import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { DeedSummary } from "EPZEU.CR.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { DeedSummariesResult } from "../../Models/DeedSummariesResult";
import { Constants } from "../../Constants"

@observer export class BulstatDeedsResultUI extends EPZEUBaseComponent<BaseProps, DeedSummariesResult> {
    private width50: any = { width: '50%' };
    private width15: any = { width: '15%' };

    constructor(props: BaseProps) {
        super(props);
    }
    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) return null;

        return (
            <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={this.width50}>{this.getResource('CR_GL_COMPANY_NAME_L')}</th>
                            <th style={this.width15}>{this.getResource('CR_GL_COMPANY_ID_L')}</th>
                            <th>{this.getResource('CR_GL_COMPANY_CASE_L')}</th>
                            <th>{this.getResource('GL_DATE_REREGISTRATION_L')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.model.items.map((deed: DeedSummary, idx: number) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <p className="field-text">
                                            <Link to={`${Constants.PATHS.ACTIVE_CONDITION_RESULT}?uic=${deed.uic}`} target="_blank"><b>{deed.companyFullName}</b></Link>
                                        </p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_GL_COMPANY_ID_L")}</span>
                                        <p className="field-text">{deed.uic}</p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_GL_COMPANY_CASE_L")}</span>
                                        <p className="field-text">{`${deed.caseNumber} / ${deed.caseYear} ${deed.courtNumber}`}</p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_DATE_REREGISTRATION_L")}</span>
                                        <p className="field-text">{this.dateDisplayFor(deed.createdOn, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')}`)}</p>
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>);
    }
}