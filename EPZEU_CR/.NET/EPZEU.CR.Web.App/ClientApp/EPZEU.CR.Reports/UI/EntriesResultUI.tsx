import * as React from "react";
import { observer } from "mobx-react";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { Link } from "react-router-dom";
import { EntriesResult, Entry } from "EPZEU.CR.Core";
import { Constants } from "../Constants";

interface EntriesResultUIProps extends BaseProps {
}

@observer export class EntriesResultUI extends EPZEUBaseComponent<EntriesResultUIProps, EntriesResult> {
    constructor(props: EntriesResultUIProps) {
        super(props);
    }

    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) return null;

        return (
            <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: "50%" }}>{this.getResource('CR_GL_COMPANY_NAME_L')}</th>
                            <th style={{ width: "25%" }}>{this.getResource('CR_GL_COMPANY_ID_L')}</th>
                            <th style={{ width: "25%" }}>{this.getResource('CR_GL_DATE_TIME_REGISTRATION_ANNOUNCE_ERASURE_L')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.model.items.map((item: Entry, idx: number) => {
                            return (
                                <tr key={`${item.uic}_${idx}`}>
                                    <td>
                                        <p className="field-text">
                                            <Link to={`${Constants.PATHS.ACTIVE_CONDITION_RESULT}?uic=${item.uic}`} target="_blank"><b>{item.companyFullName}</b></Link>
                                        </p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource('CR_GL_COMPANY_ID_L')}</span>
                                        <p className="field-text">{`${item.uic}`}</p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource('CR_GL_DATE_TIME_REGISTRATION_ANNOUNCE_ERASURE_L')}</span>
                                        <p className="field-text">{this.dateDisplayFor(item.date, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>);
    }
}