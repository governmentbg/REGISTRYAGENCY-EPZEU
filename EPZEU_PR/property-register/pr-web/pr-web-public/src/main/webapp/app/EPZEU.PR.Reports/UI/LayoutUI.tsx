import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, setCurrentOptionInNavMenu } from "EPZEU.Core";
import { Constants as coreConstants } from "EPZEU.PR.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { ApplicationStatusCheckUI } from "./ApplicationStatusCheck/ApplicationStatusCheckUI";
import { ApplicationsWithoutMovementUI } from "./ApplicationsToBeCorrected/ApplicationsWithoutMovementUI";
import { SearchRegistryOfficeByPropertyLocationUI } from "./SearchForRegistryOffice/SearchRegistryOfficeByPropertyLocationUI";
import { UpcomingDealCheckUI } from "./UpcomingDealCheck/UpcomingDealCheckUI";

interface ReportsProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

@observer class LayoutUI extends EPZEUBaseComponent<ReportsProps, null> {
  constructor(props: ReportsProps) {
    super(props);

    setCurrentOptionInNavMenu('pr_reports');
  }

  render(): JSX.Element {
    return (
      <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
        <button id="show_menu" className="button-menu d-md-none" onClick={this.toggleReportMenu}>
          <i className="ui-icon ui-icon-sub-menu" aria-hidden="true"></i>
        </button>
        <div className="nav-wrapper collapse">
          <nav className="page-nav page-nav--without-state page-nav--menu">
            <ul className="nav-section" onClick={this.toggleReportMenu}>
              <li>
                <Link to={coreConstants.PATHS.REPORTS + "/ApplicationStatusCheck"} className={'nav-item nav-link ' + this.isActiveMenuItem(coreConstants.PATHS.REPORTS + "/ApplicationStatusCheck")}><div className="nav-item-title">{this.getResource("PR_GL_STATUS_CHECK_L")}</div></Link>
                <Link to={coreConstants.PATHS.REPORTS + "/ApplicationsWithoutMovement"} className={'nav-item nav-link ' + this.isActiveMenuItem(coreConstants.PATHS.REPORTS + "/ApplicationsWithoutMovement")}><div className="nav-item-title">{this.getResource("PR_GL_APPLICATIONS_TO_BE_CORRECTED_L")}</div></Link>
                {/*<Link to={coreConstants.PATHS.REPORTS + "/UpcomingDealCheck"} className={'nav-item nav-link ' + this.isActiveMenuItem(coreConstants.PATHS.REPORTS + "/UpcomingDealCheck")}><div className="nav-item-title">{this.getResource("PR_GL_UPCOMING_DEAL_CHECK_L")}</div></Link>*/}
                <Link to={coreConstants.PATHS.REPORTS + "/RegistryOfficeSearch"} className={'nav-item nav-link ' + this.isActiveMenuItem(coreConstants.PATHS.REPORTS + "/RegistryOfficeSearch")}><div className="nav-item-title">{this.getResource("PR_GL_SEARCHING_FOR_REGISTRY_OFFICE_L")}</div></Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="page-wrapper">
          <div className="section-wrapper">
            <Switch>
              <Redirect exact from={`${coreConstants.PATHS.REPORTS}`} to={`${coreConstants.PATHS.REPORTS + "/ApplicationStatusCheck"}`} />
              <Route key={2} path={coreConstants.PATHS.REPORTS + "/ApplicationStatusCheck"} component={ApplicationStatusCheckUI} />
              <Route key={1} path={coreConstants.PATHS.REPORTS + "/ApplicationsWithoutMovement"} component={ApplicationsWithoutMovementUI} />
              {/*<Route key={2} path={coreConstants.PATHS.REPORTS + "/UpcomingDealCheck"} component={UpcomingDealCheckUI} />*/}
              <Route key={2} path={coreConstants.PATHS.REPORTS + "/RegistryOfficeSearch"} component={SearchRegistryOfficeByPropertyLocationUI} />
            </Switch>
          </div>
        </div>
      </div>);
  }

  isActiveMenuItem(menuItemPath: string) {
    return this.props.location.pathname == menuItemPath ? 'active' : ''
  }

  private toggleReportMenu(e: any): void {
    let mobileMenubtn = $('#show_menu');

    if (mobileMenubtn.css('display') != 'none') {
      mobileMenubtn.toggleClass('collapsed');
      $('.nav-wrapper').slideToggle('fast', function () {
        $(this).css('display', '');
        $(this).toggleClass('show');
      });
    }
  }
}

export const ReportsLayoutUI = withRouter(withAsyncFrame(LayoutUI));
