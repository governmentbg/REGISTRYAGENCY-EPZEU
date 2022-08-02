import {AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter} from "Cnsys.UI.React";
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {
  ApplicationType,
  EPZEUBaseComponent,
  IDataServiceProviderProps,
  Nomenclatures,
  withDataServiceProvider
} from "EPZEU.Core";
import {ApplicationFormTypes, ApplicationStatus, NomenclaturesPR, RegisterType, RegistryOffice} from "EPZEU.PR.Core";
import {ApplicationStatusEnum} from "EPZEU.PR.ApplicationBase";
import {statusTextDataService} from "../Services/StatusTextDataService";
import {ApplicationREAU} from "../Models/ApplicationREAU";

interface StatusTextUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
  incomingDocument: any;
  spid: any;
}

@observer
class StatusTextUIImpl extends EPZEUBaseComponent<StatusTextUIProps, any> {

  @observable app: ApplicationREAU;
  @observable private registerTypes: RegisterType[];
  @observable private registerOffices: RegistryOffice[];
  @observable private statuses: ApplicationStatus[];
  @observable private appTypes: ApplicationType[];
  @observable isContextLoading: boolean;

  constructor(props: StatusTextUIProps) {
    super(props);

    this.getRegisterTypes();
    this.getRegistryOffices();
    this.getApplicationStatuses();

    this.isContextLoading = true;
    this.props.registerAsyncOperation(Nomenclatures.getApplicationTypes().bind(this).then(at => {
      this.appTypes = at
    }));

    this.props.registerAsyncOperation(statusTextDataService.getStatusText(this.props.match.params.incomingDocument, this.props.match.params.spid).then(result => {
      this.app = result;
      if(!result) {
        this.isContextLoading = false;
      }
    }));
  }

  private getApplicationStatuses() {
    NomenclaturesPR.getApplicationStatuses().then(statuses => {
      this.statuses = statuses;
    })
  }

  private getRegistryOffices() {
    NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      this.registerOffices = registryOffices;
    });
  }

  private getRegisterTypes() {
    NomenclaturesPR.getRegisterTypes().then(registerTypes => {
      this.registerTypes = registerTypes;
    });
  }

  render(): JSX.Element {
    return (
      this.app ? <div className="page-header-wrapper">
        <div className="section-wrapper">
          <div className="fixed-content-width">
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h1 className="page-title">
                    {(this.app.applicationStatusResultInfo.status == ApplicationStatusEnum.WITHOUT_MOVEMENT
                      || this.app.applicationStatusResultInfo.status == ApplicationStatusEnum.REFUSAL_TO_ISSUE_CERTIFICATE) ? this.getResource("PR_JUDGE_RESOLUTION_L")
                      : null}
                    {(this.app.applicationStatusResultInfo.status == ApplicationStatusEnum.WITH_A_REFUSAL) ?
                      this.app.applicationType == ApplicationFormTypes.ApplicationForNotCertifiedCopy.toString()
                        ? this.getResource("GL_REASON_L") : this.getResource("PR_JUDGE_RESOLUTION_L")
                      : null}
                    {this.app.applicationStatusResultInfo.status == ApplicationStatusEnum.CANCELED ? this.getResource("PR_REASONS_L")
                      : null}
                    {this.app.applicationStatusResultInfo.status == ApplicationStatusEnum.PROCESS_TERMINATED ? this.getResource("PR_APP_STATUS_PROCESS_TERMINATED_L")
                      : null}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-content-width">
          <div className="page-heading">
            <h1 className="application-title">
              <span className="text-primary">№&nbsp;{this.app.applicationIdentifier}</span><br/>
              {this.appTypes ? this.appTypes.filter(at => at.appType == this.app.applicationType)[0].name : null}
            </h1>
          </div>
        </div>
        <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
          <div className="page-wrapper">
            <div className="section-wrapper">
              <p>
                <em>
                  {
                    this.app.applicationStatusResultInfo.statusTime.format('DD-MM-YYYY') + " " +
                    this.getResource('GL_YEAR_ABBREVIATION_L') + " " +
                    this.app.applicationStatusResultInfo.statusTime.format('LTS') + " " +
                    this.getResource('GL_HOUR_ABBREVIATION_L')
                  }
                </em>
              </p>
              {this.app.applicationStatusResultInfo.status != ApplicationStatusEnum.PROCESS_TERMINATED ?
                <>
                  <p>
                    <b>
                      {
                        <>
                          {this.getResource('PR_ON_REGISTERED_APPLICATION_NO_L') + " " + this.app.registerNumber + "/"}
                          {this.app.registerDate ? this.app.registerDate.format('DD-MM-YYYY') : null}
                          {" " + this.getResource('GL_YEAR_ABBREVIATION_L')}
                          <br/>
                          {this.getRegisterTypeName(this.app.registerTypeID) + ", " + this.getRegistryOfficeName(this.app.registerSiteID)}
                        </>}
                    </b>
                  </p>
                  <p>
                    {this.app.applicationStatusResultInfo.textContent}
                  </p>
                </>
                :
                <p>
                  {this.getResource('PR_APP_PROCESS_TERMINATED_INFO_L')}
                </p>
              }
            </div>
          </div>
        </div>
      </div> : !this.isContextLoading ?
      <div className="alert alert-danger" role="alert">
        <p>
          {this.getResource("GL_DOCUMENT_NOT_FOUND_E")}
        </p>
      </div> : null)
  }

  private getRegisterTypeName(registerTypeID: string) {
    if (registerTypeID) {
      return this.registerTypes.filter(filteredRegisterType => registerTypeID == filteredRegisterType.id)[0].name;
    }
  }

  private getRegistryOfficeName(registerSiteID: string) {
    if (registerSiteID) {
      return this.registerOffices.filter(filteredRegistryOffice => registerSiteID == filteredRegistryOffice.id)[0].name;
    }
  }
}

export const StatusTextUI = withRouter(withDataServiceProvider(withAsyncFrame(StatusTextUIImpl)));
