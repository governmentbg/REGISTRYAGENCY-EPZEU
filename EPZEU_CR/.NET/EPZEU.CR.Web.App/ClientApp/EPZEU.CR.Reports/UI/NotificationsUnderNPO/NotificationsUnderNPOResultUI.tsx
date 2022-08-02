import * as React from "react";
import { observer } from "mobx-react";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { Link } from "react-router-dom";
import { NotificationResult } from "../../Models/NotificationResult";
import { Notification } from "../../Models/Notification";
import { Constants } from "../../Constants";

interface NotificationsUnderNPOResultUIProps extends BaseProps {
}

@observer export class NotificationsUnderNPOResultUI extends EPZEUBaseComponent<NotificationsUnderNPOResultUIProps, NotificationResult> {
    constructor(props: NotificationsUnderNPOResultUIProps) {
        super(props);
    }

    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) return null;

        return (
            <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>{this.getResource('GL_OUTGOING_NO_L')}</th>
                            <th>{this.getResource('CR_GL_COMPANY_NAME_L')}</th>
                            <th style={{ width: "15%" }}>{this.getResource('CR_GL_COMPANY_ID_L')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.model.items.map((item: Notification, idx: number) => {
                            return (
                                <tr key={`${item.uic}_${idx}`}>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_OUTGOING_NO_L')}</span>
                                        <p className="field-text word-break" dangerouslySetInnerHTML={{ __html: item.downloadLink }}></p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource('CR_GL_COMPANY_ID_L')}</span>
                                        <p className="field-text">
                                            <Link to={`${Constants.PATHS.ACTIVE_CONDITION_RESULT}?uic=${item.uic}`} target="_blank"><b>{item.companyFullName}</b></Link>
                                        </p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource('CR_GL_COMPANY_ID_L')}</span>
                                        <p className="field-text">{item.uic}</p>
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>);
    }
}