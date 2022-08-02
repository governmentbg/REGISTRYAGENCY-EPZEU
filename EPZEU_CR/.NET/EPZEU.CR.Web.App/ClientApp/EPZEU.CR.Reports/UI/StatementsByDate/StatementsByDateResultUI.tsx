import { ObjectHelper, UrlHelper } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { Constants, downloadDocumentEvent } from "EPZEU.CR.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { StatementsByDateResultFilter } from "../../Models/Enums";
import { StatementReport } from "../../Models/StatementReport";
import { StatementsByDateResult } from "../../Models/StatementsByDateResult";
import { Constants as reportConstants } from "../../Constants"

interface StatementsByDateResultProps extends BaseProps {
    searchMode: StatementsByDateResultFilter
}

@observer export class StatementsByDateResultUI extends EPZEUBaseComponent<StatementsByDateResultProps, StatementsByDateResult> {

    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) return null;

        return <div className="table-responsive-block">
            <table className="table table-borderless table-striped table-hover">
                <thead>
                    <tr>
                        {this.props.searchMode == StatementsByDateResultFilter.CurrentUpcomingDate ? <th style={{ width: "10%" }}>{this.getResource("CR_APP_DATE_OF_ACTION_L")}</th> : null}
                        <th>{this.getResource('CR_GL_BATCH_CR_L')}</th>
                        <th style={{ width: "20%" }}>{this.getResource('CR_GL_INSCRIPTION_L')}</th>
                        <th style={{ width: "30%" }}>{this.getResource('GL_DOCUMENT_L')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.model.items.map((item: StatementReport, idx: number) => {
                            return <tr key={idx}>
                                {this.props.searchMode == StatementsByDateResultFilter.CurrentUpcomingDate ?
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_APP_DATE_OF_ACTION_L")}</span>
                                        <p className="field-text">{this.dateDisplayFor(item.actDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')}`)}</p>
                                    </td> : null}
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_GL_BATCH_CR_L")}</span>
                                    <p className="field-text">
                                        <Link to={`${reportConstants.PATHS.ACTIVE_CONDITION_RESULT}?uic=${item.deeds.uic}`} target="_blank">
                                            {`${this.getResource('CR_GL_COMPANY_ID_L')}: ${item.deeds.uic}, ${this.getResource('GL_COMPANY_L')}: ${item.deeds.companyName}`}
                                        </Link>
                                    </p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("CR_GL_INSCRIPTION_L")}</span>
                                    <p className="field-text">{this.dateDisplayFor(item.entryDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_DOCUMENT_L")}</span>
                                    <p className="field-text">
                                        <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.DOCUMENT_ACCESS.replace(":guid", item.actDocumentGuid)}`)}
                                            onClick={(event) => downloadDocumentEvent(event, item.actDocumentGuid)}>
                                            {!ObjectHelper.isStringNullOrEmpty(item.description) ? item.description : item.actModeName}
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}