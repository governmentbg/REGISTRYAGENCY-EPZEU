import * as React from "react";
import { moduleContext } from "EPZEU.Core";
import { MasterAssignmentApplication, ApplicationInfo, Constants, AppInfoStatusUI, ApplicationStatuses } from "EPZEU.CR.Core";
import { UrlHelper } from "Cnsys.Core";

export interface IAssignmentsUIProps {
    data: MasterAssignmentApplication[];
}

export const AssignmentsUI = (props: IAssignmentsUIProps) => {
    let rowToggleSlid = function (e: any): void {
        let elem = $(e.target);
        let incomingNum = elem.is('td') ? elem.attr('data-incoming-number') : elem.closest('td').attr('data-incoming-number');

        if (incomingNum) {
            $(`#collapsableBtn-${incomingNum}`).toggleClass('collapsed');
            $(`#collapsableDiv-${incomingNum}`).slideToggle('slow');
        }
    }

    let style15: any = { width: '15%' };
    let style16: any = { width: '16%' };
    let style20: any = { width: '20%' };
    let style21: any = { width: '21%' };
    let style26: any = { width: '26%' };

    if (!props.data) return null;

    return (
        <div className="table-responsive-block">
            <table className="table table-borderless table-striped table-hover table-collapsible">
                <thead>
                    <tr>
                        <th className="single-icon-td"></th>
                        <th>{moduleContext.resourceManager.getResourceByKey('GL_DOCUMENT_TYPE_L')}</th>
                        <th style={style15}>{moduleContext.resourceManager.getResourceByKey('GL_INCOMING_NO_L')}</th>
                        <th style={style20}>{moduleContext.resourceManager.getResourceByKey('GL_RESULT_L')}</th>
                        <th style={style26}>{moduleContext.resourceManager.getResourceByKey('GL_OUTGOING_NO_L')}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item: MasterAssignmentApplication, idx: number) => {
                        return (
                            <React.Fragment key={item.masterApplication.incomingNumber}>
                                <tr className={`${idx % 2 == 0 ? "odd-color" : "even-color"}`}>
                                    <td className="toggle-collapse" data-incoming-number={item.masterApplication.incomingNumber} onClick={item.relatedApplication && item.relatedApplication.length > 0 ? rowToggleSlid : null}>
                                        {item.relatedApplication && item.relatedApplication.length > 0 ?
                                            <button id={`collapsableBtn-${item.masterApplication.incomingNumber}`} className="system-button collapsed">
                                                <i className="ui-icon ui-icon-chevron-right"></i>
                                            </button>
                                            : null}
                                    </td>
                                    <td>
                                        <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.INCOMING_DOCUMENTS}?incomingNumber=${item.masterApplication.incomingNumberWithCtx}`)} target="_blank"><b>{item.masterApplication.applicationTypeName}</b></a>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey('GL_INCOMING_NO_L')}</span>
                                        <p className="field-text">{item.masterApplication.incomingNumber}</p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey('GL_RESULT_L')}</span>
                                        <p className="field-text">
                                            <AppInfoStatusUI data={item.masterApplication} />
                                        </p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey('GL_OUTGOING_NO_L')}</span>
                                        <p className="field-text word-break">{item.masterApplication.outgoingNumber}</p>
                                    </td>
                                </tr>
                                <tr className="collapsible-row">
                                    <td colSpan={5}>
                                        <div id={`collapsableDiv-${item.masterApplication.incomingNumber}`} style={{ display: 'none' }}>
                                            <div className="collapsible-row-content collapsible-row-content--border">
                                                {item.relatedApplication && item.relatedApplication.length > 0 ?
                                                    <table className="table inner-table">
                                                        <thead className="thead-invisible">
                                                            <tr>
                                                                <th></th>
                                                                <th style={style16}></th>
                                                                <th style={style21}></th>
                                                                <th style={style26}></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {item.relatedApplication.map((rApp: ApplicationInfo, i: number) => {
                                                                return (
                                                                    <tr key={rApp.incomingNumber}>
                                                                        <td><a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.INCOMING_DOCUMENTS}?incomingNumber=${rApp.incomingNumberWithCtx}`)} target="_blank">{rApp.applicationTypeName}</a></td>
                                                                        <td>
                                                                            <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey('GL_INCOMING_NO_L')}</span>
                                                                            <p className="field-text">{rApp.incomingNumber}</p>
                                                                        </td>
                                                                        <td>
                                                                            <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey('GL_RESULT_L')}</span>
                                                                            <p className="field-text"><AppInfoStatusUI data={rApp} /></p>
                                                                        </td>
                                                                        <td className="word-break">
                                                                            <span className="field-title field-title--preview d-sm-none">{moduleContext.resourceManager.getResourceByKey('GL_OUTGOING_NO_L')}</span>
                                                                            <p className="field-text">{rApp.outgoingNumber}</p>
                                                                        </td>
                                                                    </tr>)
                                                            })}
                                                        </tbody>
                                                    </table>
                                                    :
                                                    null}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>);
                    })}
                </tbody>
            </table>
        </div>);


}