import { UrlHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { appConfig, ApplicationType, Button, EPZEUBaseComponent, Nomenclatures, Obligation, ObligationStatuses, Registers, ValidationSummaryErrors } from "EPZEU.Core";
import { Constants } from 'EPZEU.CR.Core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ApplicationProcessContext } from "../ApplicationProcessContext";
import { ProcessStates } from 'EPZEU.CR.Domain';

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

    render(): JSX.Element {

        if (!this.appTypes)
            return null;

        var paymentUrl = (appConfig.epzeuPublicUIUrl + '/duty-list').replace('//duty-list', '/duty-list');

        return (
            <div className="page-wrapper">
                <section className="section-wrapper">
                    <ValidationSummaryErrors errors={this.props.errorMessages} />
                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                    <div className="alert alert-success" role="alert">
                        {this.props.processContext.allApplicationProcesses.length == 1 ? this.getResource("GL_REGISTERED_APPLICATION_I") : this.getResource("GL_REGISTERED_APPLICATIONS_I")}
                    </div>
                    {this.props.processContext.allApplicationProcesses.map((ap, index) => {
                        var appType = this.appTypes.filter(at => Number(at.appType) == ap.mainApplicationType)[0];
                        var obligations: Obligation[] = [];

                        if (this.obligations)
                            obligations = this.obligations.filter(obl => obl.applicationNumber == ap.incomingNumber);

                        return (
                            <React.Fragment key={ap.applicationProcessID}>
                                <div className="field-container">
                                    <p className="field-text">
                                        <b>{`${this.getResource("GL_INCOMING_NO_L")} ${ap.incomingNumber}`}</b>
                                    </p>
                                    <p className="field-text">
                                        <b><a target="_blank" href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.INCOMING_DOCUMENTS}?incomingNumber=${ap.incomingNumber}`)}>{`${appType.appCode ? appType.appCode + " " : ""}${appType.name}`}</a></b>
                                    </p>
                                    {obligations.map(obl => {
                                        if (obl.status == ObligationStatuses.Paid) {
                                            return (
                                                <p key={obl.obligationNumber} className="text-success">
                                                    <i className="ui-icon ui-icon-processed mr-1"></i>
                                                    {this.getResource("GL_OBLIGATION_PAID_L")}
                                                </p>)
                                        }
                                        else if (obl.status == ObligationStatuses.Requested) {
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
                                {this.props.processContext.allApplicationProcesses.indexOf(ap) != index &&
                                    <hr key={'line_' + ap.applicationProcessID} className="hr--doted-line" />}
                            </React.Fragment>)
                    })}

                    <div className="button-bar button-bar--form">
                        <div className="left-side">
                            <Button type="button" className="btn btn-secondary" lableTextKey={"GL_SUBMIT_NEW_APPLICATION_L"} onClick={this.props.onDeleteApplicationProcess}></Button>
                        </div>
                        {this.obligations && this.obligations.filter(obl => obl.status == ObligationStatuses.Requested).length > 0 &&
                            <div className="right-side">
                                <Button type="button" className="btn btn-primary" lableTextKey={"GL_SWITCH_TO_PAYMENT_L"} onClick={() => { window.location.href = `${paymentUrl}?search=1&registerId=${Registers.CR}&applicationNumber=${this.obligations.filter(obl => obl.status == ObligationStatuses.Requested).map(obl=>obl.applicationNumber).join(',')}` }}></Button>
                            </div>
                        }
                    </div>
                </section>
            </div>);
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

    loadObligations() {
        if (this.refreshInerval) {
            clearInterval(this.refreshInerval);
            this.refreshInerval = null;
        }

        if (this.props.processContext.isContextInitialized) {

            //Проверката се извършва в фонов режим и не трябва да има маргаритка
            this.props.processContext.getObligations().bind(this).then(obligations => {
                let appProcessesWithObligations = this.props.processContext.allApplicationProcesses.filter(proc => !proc.applications || proc.applications.length == 0 || proc.applications.filter(app => app.applicationID == proc.mainApplicationID)[0].additionalData.state != ProcessStates.Preregistration);


                if ((!obligations || obligations.length == 0) && appProcessesWithObligations.length > 0) {
                    if (this.refreshInerval) {
                        clearInterval(this.refreshInerval);
                    }

                    this.refreshInerval = setInterval(this.loadObligations, 1000);
                }
                else if (obligations && obligations.length < appProcessesWithObligations.length) {
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