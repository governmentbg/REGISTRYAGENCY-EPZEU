import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ObjectHelper, UrlHelper } from 'Cnsys.Core';
import { BaseProps, AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, ValidationSummaryErrors, Button, Obligation, Nomenclatures, ApplicationType, ObligationStatuses, appConfig, Registers } from "EPZEU.Core";
import { Constants, ApplicationFormTypes } from 'EPZEU.PR.Core';
import { ApplicationProcessContext } from "../ApplicationProcessContext";

interface AcceptedUIProps extends BaseProps, AsyncUIProps {
    processContext: ApplicationProcessContext;
    errorMessages: any;
    onDeleteApplicationProcess: () => void;
}

@observer class AcceptedUIImpl extends EPZEUBaseComponent<AcceptedUIProps, any> {

    @observable obligations: Obligation[];
    @observable appTypes: ApplicationType[];
    private refreshInerval: number;

    constructor(props?: AcceptedUIProps) {
        super(props);

        this.loadObligations = this.loadObligations.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        this.props.registerAsyncOperation(Nomenclatures.getApplicationTypes().bind(this).then(at => {
            this.appTypes = at
        }));

        this.loadObligations();
    }

    componentWillUnmount(): void {
        if (super.componentWillUnmount) {
            super.componentWillUnmount();
        }

        if (this.refreshInerval) {
            clearInterval(this.refreshInerval);
            this.refreshInerval = null;
        }
    }

    render(): JSX.Element {
        if (!this.appTypes) {
            return null;
        }

        var paymentUrl = (appConfig.epzeuPublicUIUrl + '/duty-list').replace('//duty-list', '/duty-list');
        var appType = this.appTypes.filter(at => Number(at.appType) == this.props.processContext.applicationItem.application.type)[0];
        var messageInfoAboutCertificates = this.getResource('PR_APPLICATION_WORK_TIME_I'); //Заявленията за издаване на удостоверения се регистрират в имотния регистър в определеното от Агенция по вписванията работно време.
        var messageForPayTheTax = this.getResource("PR_APPLICATION_TO_BE_PAID_I"); //За да бъде регистрирано в имотния регистър, трябва да бъде заплатена дължимата такса за услугата.
        var messageForSingleAcceptedApp = this.getResource("PR_APPLICATION_WITH_NUMBER_I"); //Заявлението е прието
        var isReport = appType.applicationTypeID == ApplicationFormTypes.RequestForReportForAccountProperty
            || appType.applicationTypeID == ApplicationFormTypes.RequestForReportForDocument
            || appType.applicationTypeID == ApplicationFormTypes.RequestForReportForPerson
            || appType.applicationTypeID == ApplicationFormTypes.RequestForReportForPersonInAllRegistryOffices
            || appType.applicationTypeID == ApplicationFormTypes.RequestForReportForProperty;
        if (isReport) {
            messageForSingleAcceptedApp = this.getResource('PR_QUERY_APPLICATION_WITH_NUMBER_I'); //Искането за справка е регистрирано
            messageForPayTheTax = this.getResource('PR_REPORT_TO_BE_PAID_I'); //За да се изпълни справката, трябва да бъде заплатена дължимата такса за услугата.
        }

        var isPaid = true;
        if (this.obligations) {
            for (var i = 0; i < this.obligations.length; i++)
                if ((this.obligations[i].status != ObligationStatuses.Paid) && (this.obligations[i].status.toString() != 'Paid'))
                    isPaid = false;
        }

        var messageInfoLinkToMyApplications;
        var isApplicationForCorrection = this.props.processContext.applicationProcess.applications[0].applicationProcessContent.content.initialApplicationData
            && !ObjectHelper.isStringNullOrEmpty(this.props.processContext.applicationProcess.applications[0].applicationProcessContent.content.initialApplicationData.incomingReauNumber);
        if (appType.applicationTypeID == ApplicationFormTypes.ApplicationForDeclarationOfUpcomingDealWithProperty) {
            messageInfoLinkToMyApplications = null;
        } else if (this.props.processContext.applicationItem.appFormManager.isTaxFree || isApplicationForCorrection) {
            if (isReport) {
                messageInfoLinkToMyApplications = this.getResource('PR_APP_00109_I'); //Може да видите резултата от справката на страница "Моите заявления" от потребителския Ви профил.
            } else {
                messageInfoLinkToMyApplications = this.getResource('PR_APP_00112_I'); //Актуалния статус на предоставяне на услугата може да видите на страница "Моите заявления" от потребителския Ви профил.
            }
        } else {
            if (isReport) {
                if (isPaid) {
                    messageInfoLinkToMyApplications = this.getResource('PR_APP_00109_I'); //Може да видите резултата от справката на страница "Моите заявления" от потребителския Ви профил.
                } else {
                    messageInfoLinkToMyApplications = this.getResource('PR_APP_00110_I'); //След заплащане на дължимата такса, може да видите резултата от справката на страница "Моите заявления" от потребителския Ви профил.
                }
            } else {
                messageInfoLinkToMyApplications = this.getResource('PR_APP_00111_I'); //Актуалния статус на предоставяне на услугата може да видите на страница "Моите заявления" от потребителския Ви профил.
            }
        }

        return (
            <div className="page-wrapper">
                <section className="section-wrapper">
                    <ValidationSummaryErrors errors={this.props.errorMessages} />
                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                    <div className={(this.props.processContext.applicationItem.appFormManager.isTaxFree || isApplicationForCorrection || isPaid) ? "alert alert-success" : "alert alert-warning"} role="alert">
                        <p>{this.props.processContext.applicationProcess.incomingNumbers.length == 1 ? messageForSingleAcceptedApp : this.getResource("PR_QUERY_APPLICATIONS_WITH_NUMBERS_I")}</p>
                        {(!this.props.processContext.applicationItem.appFormManager.isTaxFree && !isApplicationForCorrection && !isPaid) && (<p>{messageForPayTheTax}</p>)}
                        {
                            (appType.applicationTypeID == ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson
                                || appType.applicationTypeID == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty
                                || appType.applicationTypeID == ApplicationFormTypes.ApplicationForCertificateForPerson
                                || appType.applicationTypeID == ApplicationFormTypes.ApplicationForCertificateForProperty
                                || appType.applicationTypeID == ApplicationFormTypes.ApplicationForCertifiedCopy
                                || appType.applicationTypeID == ApplicationFormTypes.ApplicationForNotCertifiedCopy) &&
                            <p>{messageInfoAboutCertificates}</p>
                        }
                    </div>
                    {this.props.processContext.applicationProcess.incomingNumbers.map((iNum, index) => {

                        var obligations: Obligation[] = [];

                        if (this.obligations) {
                            obligations = this.obligations.filter(obl => obl.applicationNumber == iNum);
                        }

                        return (
                            <React.Fragment key={iNum}>
                                <div className="field-container">
                                    <p className="field-text">
                                        <b>{`${this.getResource("PR_APPLIC_PORTAL_NUM_L")} ${iNum}`}</b>
                                    </p>
                                    <p className="field-text">
                                        <b><a target="_blank" href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.APPLICATION_PREVIEW.replace(':incomingNumber', iNum)}`)}>{`${appType.name}`}</a></b>
                                    </p>
                                    {obligations.map(obl => {
                                        if ((obl.status == ObligationStatuses.Paid || obl.status.toString() == 'Paid') && obl.paidAmount > 0) {
                                            return (
                                                <p key={obl.obligationNumber} className="text-success">
                                                    <i className="ui-icon ui-icon-processed"></i>
                                                    &nbsp;
                          {this.getResource("GL_OBLIGATION_PAID_L")}
                                                </p>)
                                        }
                                        else if (obl.status == ObligationStatuses.Requested || obl.status.toString() == 'Requested') {
                                            return (
                                                <p key={obl.obligationNumber} className="text-warning">
                                                    {this.getResource("GL_WAITING_PAYMENT_AMOUNT_L")} <b>{`${(obl.obligationAmount - obl.paidAmount).toFixed(2)} ${this.getResource("GL_BGN_ABBRAVETION_L")}`}</b>
                                                </p>
                                            )
                                        }
                                        else {
                                            return null;
                                        }
                                    })
                                    }
                                </div>

                                {this.props.processContext.applicationProcess.incomingNumbers.indexOf(iNum) !=
                                this.props.processContext.applicationProcess.incomingNumbers.length -1 &&
                                    <hr key={'line_' + iNum} className="hr--doted-line" />}
                            </React.Fragment>)
                    })}
                    {messageInfoLinkToMyApplications &&
                        <div className="alert alert-info mt-3" role="alert">
                            <p>{messageInfoLinkToMyApplications}</p>
                        </div>
                    }
                    <div className="button-bar button-bar--form">
                        <div className="left-side">
                            <Button type="button" className="btn btn-secondary" lableTextKey={"GL_SUBMIT_NEW_APPLICATION_L"} onClick={this.props.onDeleteApplicationProcess}></Button>
                        </div>
                        {this.obligations && this.obligations.filter(obl => obl.status == ObligationStatuses.Requested || obl.status.toString() == 'Requested').length > 0 &&
                            <div className="right-side">
                                {this.obligations.filter(obl => obl.status == ObligationStatuses.Requested || obl.status.toString() == 'Requested').length == 1 &&
                                    <Button type="button" className="btn btn-primary" lableTextKey={"GL_SWITCH_TO_PAYMENT_L"} onClick={() => { window.location.href = `${paymentUrl}?search=1&registerId=${Registers.PR}&applicationNumber=${this.obligations[0].applicationNumber}` }}></Button>
                                }
                                {this.obligations.filter(obl => obl.status == ObligationStatuses.Requested || obl.status.toString() == 'Requested').length > 1 &&
                                    <Button type="button" className="btn btn-primary" lableTextKey={"GL_SWITCH_TO_PAYMENT_L"} onClick={() => { window.location.href = `${paymentUrl}?search=1&registerId=${Registers.PR}&applicationNumber=${this.obligations.map(item => { return item.applicationNumber }).join()}` }}></Button>
                                }
                            </div>
                        }
                        {(this.props.processContext.applicationItem.appFormManager.isTaxFree || isApplicationForCorrection || isPaid) &&
                            <Button type="button" className="btn btn-primary" lableTextKey={"PR_SWITCH_TO_MY_APPLICATIONS_L"} onClick={() => { window.location.href = appConfig.epzeuPublicUIUrl + Constants.PATHS.MY_APPLICATIONS + '?section=pr' }}></Button>
                        }
                    </div>
                </section>

            </div>);
    }

    loadObligations() {
        if (this.refreshInerval) {
            clearInterval(this.refreshInerval);
            this.refreshInerval = null;
        }

        var isApplicationForCorrection = this.props.processContext.applicationProcess.applications[0].applicationProcessContent.content.initialApplicationData
            && !ObjectHelper.isStringNullOrEmpty(this.props.processContext.applicationProcess.applications[0].applicationProcessContent.content.initialApplicationData.incomingReauNumber);
        if (this.props.processContext.isContextInitialized && !isApplicationForCorrection) {
            this.props.processContext.getObligations().bind(this).then(obligations => {

                if ((!obligations || obligations.length == 0)) {
                    if (this.refreshInerval) {
                        clearInterval(this.refreshInerval);
                    }

                    this.refreshInerval = setInterval(this.loadObligations, 1000);
                }
                if (obligations.length < this.props.processContext.applicationProcess.incomingNumbers.length) {
                    if (this.refreshInerval) {
                        clearInterval(this.refreshInerval);
                    }

                    this.obligations = obligations;

                    this.refreshInerval = setInterval(this.loadObligations, 1000);
                }
                else {
                    if (this.refreshInerval) {
                        clearInterval(this.refreshInerval);
                        this.refreshInerval = null;
                    }

                    this.obligations = obligations;
                }
            });
        }
    }
}

export const AcceptedUI = withAsyncFrame(AcceptedUIImpl, false);
