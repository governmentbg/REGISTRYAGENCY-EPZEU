import { UrlHelper } from 'Cnsys.Core';
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { AppInfoStatusUI, ApplicationInfo, DeedSummary, PassedFrom, Constants, ApplicationFormTypes } from "EPZEU.CR.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { ApplicationInfosResult } from "../Models/ApplicationInfosResult";
import { Constants as reportConstants } from "../Constants";

@observer export class ApplicationInfoResultUI extends EPZEUBaseComponent<BaseProps, ApplicationInfosResult> {

    constructor(props: BaseProps) {
        super(props);
    }

    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) return null;

        let isAssignmentReg: boolean = this.isAssignmentRegistration(this.model.items[0]);

        return (
            <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                    <thead>
                        <tr>
                            <th>{this.getResource('GL_DOCUMENTS_SUMITED_L')}</th>
                            <th>{this.getResource('GL_REGISTRATION_L')}</th>
                            <th>{this.getResource('GL_SUBMITTED_VIA_L')}</th>
                            <th>{this.getResource('GL_RESULT_L')}</th>
                            <th>{isAssignmentReg ? this.getResource('GL_OUTGOING_NO_L') : this.getResource('CR_GL_COMPANY_NAME_L')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.model.items.map((item: ApplicationInfo, idx: number) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <p className="field-text">
                                            <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.INCOMING_DOCUMENTS}?incomingNumber=${item.incomingNumberWithCtx}`)} target="_blank"><b>{item.applicationTypeName}</b></a>
                                        </p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_REGISTRATION_L")}</span>
                                        <p className="field-text">{item.incomingNumber}</p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_SUBMITTED_VIA_L")}</span>
                                        <p className="field-text">{item.passedFrom == PassedFrom.Internet ? this.getResource('GL_INTERNET_L') : item.officeName}</p>
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_RESULT_L")}</span>
                                        <p className="field-text"><AppInfoStatusUI data={item} /></p>
                                        {this.renderCompanyLinks(item)}
                                    </td>
                                    <td>
                                        <span className="field-title field-title--preview d-sm-none">{isAssignmentReg ? this.getResource('GL_OUTGOING_NO_L') : this.getResource('CR_GL_COMPANY_NAME_L')}</span>
                                        {isAssignmentReg ?
                                            <p className="field-text">{item.outgoingNumber}</p>
                                            : <p className="field-text" dangerouslySetInnerHTML={{ __html: this.renderCompany(item) }}></p>}
                                        
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>);
    }

    renderCompanyLinks(item: ApplicationInfo): JSX.Element[] {
        let result: JSX.Element[] = null;

        if (item.entryDeeds != undefined && item.entryDeeds != null) {

            result = item.entryDeeds.map((deed: DeedSummary, index: number) => {
                return (
                    <p className="field-text" key={index}>
                        <Link to={`${reportConstants.PATHS.ACTIVE_CONDITION_RESULT}?uic=${deed.uic}`} target="_blank">{deed.companyFullName}</Link>{', ' + this.getResource('CR_GL_COMPANY_ID_L') + ' ' + deed.uic}
                    </p>)
            });
        }

        return result;
    }

    renderCompany(item: ApplicationInfo): string {
        let res: string;

        if (item.entryDeeds != undefined && item.entryDeeds != null) {
            for (let i = 0; i < item.entryDeeds.length; i += 1) {
                if (i == 0)
                    res = item.entryDeeds[i].companyFullName;
                else
                    res += '<br/>' + item.entryDeeds[i].companyFullName;
            }
        }
        else if (item.incomingLinkedDeeds != undefined && item.incomingLinkedDeeds != null) {
            for (let i = 0; i < item.incomingLinkedDeeds.length; i += 1) {
                if (i == 0)
                    res = item.incomingLinkedDeeds[i].companyFullName;
                else
                    res += '<br/>' + item.incomingLinkedDeeds[i].companyFullName;
            }
        }

        return res;
    }

    isAssignmentRegistration(item: ApplicationInfo): boolean {
        return (
            item.applicationType == ApplicationFormTypes.AppointingChangeRequest
            || item.applicationType == ApplicationFormTypes.AppointingPaidDeposit
            || item.applicationType == ApplicationFormTypes.AppointingDeclaration
            || item.applicationType == ApplicationFormTypes.AppointingReportAndExamination
            || item.applicationType == ApplicationFormTypes.AppointingRequestForCorrection
            || item.applicationType == ApplicationFormTypes.NotificationOfExaminationImpossibility
            || item.applicationType == ApplicationFormTypes.AppointingReleaseDeposit
            || item.applicationType == ApplicationFormTypes.AppointingControllerReward
            || item.applicationType == ApplicationFormTypes.AttitudeOfChangeRequest
            || item.applicationType == ApplicationFormTypes.AppointingContactAddressChange
            || item.applicationType == ApplicationFormTypes.AppointingImpossibility
            || item.applicationType == ApplicationFormTypes.NotificationOfLackOfMeans
            || item.applicationType == ApplicationFormTypes.AssignmentInternalReguestForCorrection
            || item.applicationType == ApplicationFormTypes.AppointingExpert
            );
    }
}