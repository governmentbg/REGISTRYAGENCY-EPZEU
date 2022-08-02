import * as React from "react";
import { moduleContext } from "EPZEU.Core";
import { ApplicationInfo, Constants, AppInfoStatusUI } from "EPZEU.CR.Core";
import { UrlHelper } from "Cnsys.Core";

export const DocumentsWithoutAppointmentResultUI = (props: any) => {
    let width35: any = { width: '35%' };
    let width25: any = { width: '25%' };

    if (!props.data) return null;

    return (
        <div className="table-responsive-block">
            <table className="table table-borderless table-striped table-hover">
                <thead>
                    <tr>
                        <th style={width35}>{moduleContext.resourceManager.getResourceByKey('GL_DOCUMENT_TYPE_L')}</th>
                        <th>{moduleContext.resourceManager.getResourceByKey('GL_INCOMING_NO_L')}</th>
                        <th>{moduleContext.resourceManager.getResourceByKey('GL_CONDITION_L')}</th>
                        <th style={width25}>{moduleContext.resourceManager.getResourceByKey('GL_OUTGOING_NO_L')}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item: ApplicationInfo, idx: number) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <p className="field-text">
                                        <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.INCOMING_DOCUMENTS}?incomingNumber=${item.incomingNumberWithCtx}`)} target="_blank">
                                            <b>{item.applicationTypeName}</b>
                                        </a>
                                    </p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey("GL_INCOMING_NO_L")}</span>
                                    <p className="field-text">{item.incomingNumber}</p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey("GL_CONDITION_L")}</span>
                                    <p className="field-text"><AppInfoStatusUI data={item} /></p>
                                </td>
                                <td>
                                    <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey("GL_OUTGOING_NO_L")}</span>
                                    <p className="field-text word-break">{item.outgoingNumber}</p>
                                </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </div>);
}