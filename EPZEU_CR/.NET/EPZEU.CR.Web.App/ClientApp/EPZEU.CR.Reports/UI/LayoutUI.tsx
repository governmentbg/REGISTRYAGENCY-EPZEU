import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, MobileMenuToggle, setCurrentOptionInNavMenu, toggleMobileMenu } from "EPZEU.Core";
import { Constants as coreConstants } from 'EPZEU.CR.Core';
import { observer } from "mobx-react";
import * as React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Constants } from "../Constants";
import { ActiveConditionTabResultUI } from './ActiveCondition/ActiveConditionTabResultUI';
import { ActiveConditionUI } from './ActiveCondition/ActiveConditionUI';
import { AssignmentsWithoutLotUI } from './AssignmentsWithoutLot/AssignmentsWithoutLotUI';
import { BankruptcyUI } from "./Bankruptcy/Index";
import { BulstatDeedsUI } from './BulstatDeeds/BulstatDeedsUI';
import { DocumentsWithoutAppointmentUI } from './DocumentsWithoutAppointment/DocumentsWithoutAppointmentUI';
import { DocumentsWithoutDeedUI } from './DocumentsWithoutDeed/DocumentsWithoutDeedUI';
import { EntriesUI } from './EntriesDelitionsAnnouncements/EntriesUI';
import { InstructionsWithoutDeedUI } from "./InstructionsWithoutDeed/InstructionsWithoutDeedUI";
import { LiquidationUI } from "./Liquidation/LiquidationUI";
import { NotificationsUnderNPOUI } from './NotificationsUnderNPO/NotificationsUnderNPOUI';
import { PreservedCompaniesUI } from './PreservedCompanies/PreservedCompaniesUI';
import { RegistrationsUI } from './Registrations/RegistrationsUI';
import { RightsForCompanyUI } from './RightsForCompany/RightsForCompanyUI';
import { StabilizationUI } from './Stabilization/StabilizationUI';
import { StatementsByDateUI } from "./StatementsByDate/StatementsByDateUI";
import { TransformationsUI } from './Transformations/TransformationsUI';
import { VerificationActsTabResultUI } from './VerificationActs/VerificationActsTabResultUI';
import { VerificationActsUI } from './VerificationActs/VerificationActsUI';
import { VerificationPersonOrgUI } from './VerificationPersonOrg/VerificationPersonOrgUI';

interface ReportsProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

@observer class LayoutUI extends EPZEUBaseComponent<ReportsProps, null> {
    constructor(props: ReportsProps) {
        super(props);

        setCurrentOptionInNavMenu('cr_reports');
    }

    render(): JSX.Element {
        return (
            <>
                {(this.props.location.pathname.indexOf('ActiveConditionTabResult') < 0
                    && this.props.location.pathname.indexOf('VerificationActsResult') < 0) ?
                    <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
                        <MobileMenuToggle scrollTopOnClick />
                        <div className="nav-wrapper collapse">
                            <nav className="page-nav page-nav--without-state page-nav--menu">
                                <ul className="nav-section" onClick={this.toggleReportMenu}>
                                    <li>
                                        <Link to={Constants.PATHS.VERIFICATION_PERSON_ORG} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.VERIFICATION_PERSON_ORG)}><div className="nav-item-title">{this.getResource("CR_GL_REPORT_INDIVIDUAL_LEGAL_ENTRIES_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.ACTIVE_CONDITION} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.ACTIVE_CONDITION)}><div className="nav-item-title">{this.getResource("CR_GL_CURRENT_STATUS_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.PRESERVED_COMPANIES} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.PRESERVED_COMPANIES)}><div className="nav-item-title">{this.getResource("CR_GL_LIST_SAVE_COMPANIES_NAME_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.RIGHTS_FOR_COMPANY} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.RIGHTS_FOR_COMPANY)}><div className="nav-item-title">{this.getResource("CR_GL_COMPANY_RIGHTS_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.ENTRIES_DELITIONS_ANNOUNCEMENTS} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.ENTRIES_DELITIONS_ANNOUNCEMENTS)}><div className="nav-item-title">{this.getResource("CR_GL_ENTRIES_DELETIONS_ANNOUNCES_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.VERIFICATION_ACTS} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.VERIFICATION_ACTS)}><div className="nav-item-title">{this.getResource("CR_GL_RECCORDED_CIRCUMSTANCE_ACT_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.STATEMENTS_BY_DATE} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.STATEMENTS_BY_DATE)}><div className="nav-item-title">{this.getResource("CR_GL_ANNOUNCED_ACTS_L")}</div></Link>
                                    </li>
                                </ul>
                                <hr />
                                <ul className="nav-section" onClick={this.toggleReportMenu}>
                                    <li>
                                        <Link to={Constants.PATHS.INSTRUCTIONS_WITHOUT_DEED} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.INSTRUCTIONS_WITHOUT_DEED)}><div className="nav-item-title">{this.getResource("CR_GL_INSTRUCTIONS_FOR_NO_REG_COMPANIES_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.DOCUMENTS_WITHOUT_DEED} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.DOCUMENTS_WITHOUT_DEED)}><div className="nav-item-title">{this.getResource("CR_GL_DOCUMENTS_WITHOUT_BATCH_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.REGISTRATIONS} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.REGISTRATIONS)}><div className="nav-item-title">{this.getResource("CR_GL_INCOMING_APPLICATION_NUMBER_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.DOCUMENTS_WITHOUT_APPOINTMENT} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.DOCUMENTS_WITHOUT_APPOINTMENT)}><div className="nav-item-title">{this.getResource("CR_GL_DOCUMENTS_WITHOUT_APPOINTMENT_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.ASSIGNMENTS_WITHOUT_LOT} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.ASSIGNMENTS_WITHOUT_LOT)}><div className="nav-item-title">{this.getResource("CR_GL_APPOINTMENT_WITHOUT_BATCH_L")}</div></Link>
                                    </li>
                                </ul>
                                <hr />
                                <ul className="nav-section" onClick={this.toggleReportMenu}>
                                    <li>
                                        <Link to={Constants.PATHS.STABILIZATION} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.STABILIZATION)}><div className="nav-item-title">{this.getResource('CR_GL_REPORT_STABILIZATION_L')}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.BANKRUPTCY} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.BANKRUPTCY)}><div className="nav-item-title">{this.getResource("CR_GL_REPORT_INSOLVENCY_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.LIQUIDATION} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.LIQUIDATION)}><div className="nav-item-title">{this.getResource("CR_GL_REPORT_LIQUIDATION_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.NOTIFICATIONS_UNDER_NPO} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.NOTIFICATIONS_UNDER_NPO)}><div className="nav-item-title">{this.getResource("CR_GL_NOTIFICATION_44A_L")}</div></Link>
                                    </li>
                                </ul>
                                <hr />
                                <ul className="nav-section" onClick={this.toggleReportMenu}>
                                    <li>
                                        <Link to={Constants.PATHS.BULSTATDEEDS} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.BULSTATDEEDS)}><div className="nav-item-title">{this.getResource("CR_GL_RE_REGISTER_COMPANY_L")}</div></Link>
                                    </li>
                                    <li>
                                        <Link to={Constants.PATHS.TRANSFORMATIONS_BY_PERIOD} className={'nav-item nav-link ' + this.isActiveMenuItem(Constants.PATHS.TRANSFORMATIONS_BY_PERIOD)}><div className="nav-item-title">{this.getResource("CR_GL_TRANSFORMATION_OVER_PERIOD_L")}</div></Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="page-wrapper">
                            <div className="section-wrapper">
                                <Switch>
                                    <Redirect exact from={`${coreConstants.PATHS.REPORTS}`} to={`${Constants.PATHS.VERIFICATION_PERSON_ORG}`} />
                                    <Route key={2} path={Constants.PATHS.VERIFICATION_PERSON_ORG} component={VerificationPersonOrgUI} />
                                    <Route key={3} path={Constants.PATHS.ACTIVE_CONDITION} component={ActiveConditionUI} />
                                    <Route key={4} path={Constants.PATHS.PRESERVED_COMPANIES} component={PreservedCompaniesUI} />
                                    <Route key={5} path={Constants.PATHS.RIGHTS_FOR_COMPANY} component={RightsForCompanyUI} />
                                    <Route key={6} path={Constants.PATHS.ENTRIES_DELITIONS_ANNOUNCEMENTS} component={EntriesUI} />
                                    <Route key={7} path={Constants.PATHS.VERIFICATION_ACTS} component={VerificationActsUI} />
                                    <Route key={8} path={Constants.PATHS.STATEMENTS_BY_DATE} component={StatementsByDateUI} />

                                    <Route key={9} path={Constants.PATHS.INSTRUCTIONS_WITHOUT_DEED} component={InstructionsWithoutDeedUI} />
                                    <Route key={10} path={Constants.PATHS.DOCUMENTS_WITHOUT_DEED} component={DocumentsWithoutDeedUI} />
                                    <Route key={11} path={Constants.PATHS.REGISTRATIONS} component={RegistrationsUI} />
                                    <Route key={12} path={Constants.PATHS.DOCUMENTS_WITHOUT_APPOINTMENT} component={DocumentsWithoutAppointmentUI} />
                                    <Route key={13} path={Constants.PATHS.ASSIGNMENTS_WITHOUT_LOT} component={AssignmentsWithoutLotUI} />

                                    <Route key={14} path={Constants.PATHS.STABILIZATION} component={StabilizationUI} />
                                    <Route key={15} path={Constants.PATHS.BANKRUPTCY} component={BankruptcyUI} />
                                    <Route key={16} path={Constants.PATHS.LIQUIDATION} component={LiquidationUI} />
                                    <Route key={17} path={Constants.PATHS.NOTIFICATIONS_UNDER_NPO} component={NotificationsUnderNPOUI} />

                                    <Route key={18} path={Constants.PATHS.BULSTATDEEDS} component={BulstatDeedsUI} />
                                    <Route key={19} path={Constants.PATHS.TRANSFORMATIONS_BY_PERIOD} component={TransformationsUI} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                    :
                    <Switch>
                        <Route key={0} path={Constants.PATHS.ACTIVE_CONDITION_RESULT} component={ActiveConditionTabResultUI} />
                        <Route key={1} path={Constants.PATHS.VERIFICATION_ACTS_RESULT} component={VerificationActsTabResultUI} />
                    </Switch>}
            </>
        );
    }

    isActiveMenuItem(menuItemPath: string) {
        return this.props.location.pathname == menuItemPath ? 'active' : ''
    }

    private toggleReportMenu() {
        toggleMobileMenu(true);
    }
}

export const ReportsLayoutUI = withRouter(LayoutUI);