import * as React from "react";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { Button, EPZEUBaseComponent } from "EPZEU.Core";
import {
  ApplicationStatusEnum,
  DocumentDataSourcesEnum
} from "EPZEU.PR.ApplicationBase";
import {
  ApplicationREAU,
  AttachmentInfo,
  ApplicationProcessDataService,
  ProcessStatuses,
  AttachmentInfoTypeEnum
} from "EPZEU.PR.ApplicationProcesses";
import { BasePagedSearchCriteria, UrlHelper, appConfig, ObjectHelper } from "Cnsys.Core";
import {
  ApplicationFormTypes,
  ApplicationStatus,
  ApplicationTypePR,
  Constants as coreConstants,
  DocumentTypePR,
  NomenclaturesPR, RegisterType, RegistryOffice
} from "EPZEU.PR.Core";
import { ReportsDataService } from "../../Services/ReportsDataService";

interface ApplicationsWithoutMovementUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

@observer class ApplicationsWithoutMovementUIImpl extends EPZEUBaseComponent<ApplicationsWithoutMovementUIProps, any> {
  private _service: ReportsDataService;
  private _applicationProcessService: ApplicationProcessDataService;
  @observable private _applications: ApplicationREAU[];
  @observable private _applicationTypes: ApplicationTypePR[];
  @observable private searchCriteria: BasePagedSearchCriteria;
  @observable isModalOpened: boolean = false;
  @observable private selectedApplicationID: number;
  @observable private registerOffices: RegistryOffice[];
  @observable private registerTypes: RegisterType[];
  @observable private applicationStatuses: ApplicationStatus[];
  @observable private documentTypes: DocumentTypePR[];

  constructor(props: ApplicationsWithoutMovementUIProps) {
    super(props);

    this.searchCriteria = new BasePagedSearchCriteria();
    this.searchCriteria.page = 1;
    this.searchCriteria.pageSize = 10;
    this.searchCriteria.count = 0;
    this._applications = [];
    this._applicationTypes = undefined;

    this._service = new ReportsDataService();
    this._applicationProcessService = new ApplicationProcessDataService();
    this.search = this.search.bind(this);
    this.openDraft = this.openDraft.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getDocumentTypes();
    this.getApplicationTypes();
    this.getRegistryOffices();
    this.getRegisterTypes();
    this.getApplicationStatuses();
    this.search();
  }

  private getRegistryOffices() {
    NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      this.registerOffices = registryOffices;
    });
  }

  private getApplicationStatuses() {
    NomenclaturesPR.getApplicationStatuses().then((appStatuses: ApplicationStatus[]) => {
      this.applicationStatuses = appStatuses;
    });
  }

  private getApplicationTypes(): void {
    this.props.registerAsyncOperation(NomenclaturesPR.getApplicationTypes().bind(this).then(appTypes => {
      this._applicationTypes = appTypes;
    }));
  }

  render(): JSX.Element {
    if (this._applications.length == 0) return (
      <div className="alert alert-info">
        {this.getResource('PR_APP_00076_E')}
      </div>
    );

    return (
      <>
        {/*<EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count}*/}
        {/*pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm"*/}
        {/*onSelect={this.loadDataForPage} aditionalCssClass="pagination-container--page-top"/>*/}
        <div className="table-responsive-block">
          <table className="table table-borderless table-striped table-hover">
            <thead>
              <tr>
                <th className="w-40">{this.getResource('GL_APPLICATION_L')}</th>
                <th className="w-20">{this.getResource('EP_DATE_APPLICATION_RECEPTION_L')}</th>
                <th>{this.getResource('GL_RESULT_L')}</th>
                <th className="buttons-td"></th>
              </tr>
            </thead>
            <tbody>
              {this._applications.map((app: ApplicationREAU, idx: number) => {
                return (
                  <tr key={idx}>
                    <td>
                      <p className="field-text">
                        <b>{!ObjectHelper.isStringNullOrEmpty(app.lastApplicationForCorrectionIdentifier) ?
                          app.lastApplicationForCorrectionIdentifier
                          :
                          app.applicationIdentifier}</b>
                      </p>
                      <b><a href={UrlHelper.generateLinkUrl('~/ApplicationPreview/' +
                        (!ObjectHelper.isStringNullOrEmpty(app.lastApplicationForCorrectionIdentifier) ? app.lastApplicationForCorrectionIdentifier : app.applicationIdentifier))}
                        target="_blank">{this.getApplicationName(app.applicationType)}</a></b>
                    </td>
                    <td>
                      <span className="field-title field-title--preview d-sm-none">{this.getResource('EP_DATE_APPLICATION_RECEPTION_L')}</span>
                      <p className="field-text">
                      {!ObjectHelper.isStringNullOrEmpty(app.lastApplicationForCorrectionIdentifier) ?
                        app.lastApplicationForCorrectionRegTime.format('DD.MM.YYYY HH:mm:ss')
                        :
                        app.registrationTime.format('DD.MM.YYYY HH:mm:ss')}
                      </p>
                      </td>
                    <td>
                      <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_RESULT_L')}</span>
                      <p className="field-text">{this.getApplicationStatusName(app.applicationStatusResultInfo.status)}
                        <br></br>

                        {!ObjectHelper.isArrayNullOrEmpty(app.applicationStatusResultInfo.attachmentInfos) ?
                          app.applicationStatusResultInfo.attachmentInfos.map((attachmentInfo: AttachmentInfo, idx: number) => {
                            return <React.Fragment key={ObjectHelper.newGuid()}>

                              {attachmentInfo.attachmentInfoType == AttachmentInfoTypeEnum.FILE ?
                                <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "DocumentAccess/" + attachmentInfo.downloadIdentifier)} target="_blank">
                                  {this.getDocumentTypeName(attachmentInfo.fileTypeID)}
                                </a>
                                : null}

                              {attachmentInfo.attachmentInfoType == AttachmentInfoTypeEnum.JUDGE_RESOLUTION_TEXT ?

                                <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "StatusText/" + app.applicationIdentifier)
                                + "/" + app.applicationStatusResultInfo.serviceProcessActionId}
                                   target="_blank">{this.getResource("PR_JUDGE_RESOLUTION_L")}</a>

                                : null}

                              {
                                "/" +
                                attachmentInfo.createDate.format('DD.MM.YYYY') + " " +
                                this.getResource('GL_YEAR_ABBREVIATION_L') + " " +
                                attachmentInfo.createDate.format('LTS') + " " +
                                this.getResource('GL_HOUR_ABBREVIATION_L')
                              }

                              {app.applicationStatusResultInfo.attachmentInfos.length - 1 != idx ?

                                <>,<br></br></>

                                : " "}

                            </React.Fragment>
                          })
                          : null}

                        {this.getResource('PR_ON_REGISTERED_APPLICATION_NO_L') + " " +
                          app.registerNumber + "/"}{app.registerDate ? app.registerDate.format('DD.MM.YYYY') : null}
                        {this.getResource('GL_YEAR_ABBREVIATION_L') + ", " +
                          this.getRegisterTypeName(app.registerTypeID) + ", "}
                        {app.registerSiteID ? this.getRegistryOfficeName(app.registerSiteID) : null}
                      </p>
                    </td>
                    <td className="buttons-td">
                      <Button className="btn btn-secondary" titlekey="PR_EDIT_APPLICATION_L"
                        onClick={() => this.editApplication(app)}>
                        <i className="ui-icon ui-icon-edit-color" aria-hidden="true"></i></Button>
                    </td>
                  </tr>);
              })}
            </tbody>
          </table>
        </div>
        {/*<EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} />*/}
        <Modal centered={true} backdrop='static' autoFocus={true} isOpen={!!this.isModalOpened}
          onExit={this.closeModal}>
          <ModalHeader toggle={this.isModalOpened ? this.closeModal : null}>
            {this.getResource('PR_APP_00079_I')}
          </ModalHeader>
          <ModalBody>
            <>
              <div className="alert alert-warning">
                {this.getResource("PR_APP_00080_I")}
              </div>
            </>
          </ModalBody>
          <ModalFooter>
            <div className="button-bar">
              <div className="left-side"></div>
              <div className="right-side">
                <button type="button" className="btn btn-primary" onClick={this.openDraft}
                  data-dismiss="modal">{this.getResource('PR_TO_DRAFT_APPLICATION_L')}</button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      </>);
  }


  private getRegistryOfficeName(registerSiteID: string) {
    if (registerSiteID) {
      return this.registerOffices.filter(filteredRegistryOffice => registerSiteID == filteredRegistryOffice.id)[0].name;
    }
  }

  private getApplicationStatusName(status: ApplicationStatusEnum) {
    if (status) {
      return this.applicationStatuses.filter(filteredAppStatus => status.toString() == filteredAppStatus.id)[0].name;
    }
  }
  private getRegisterTypeName(registerTypeID: string) {
    if (registerTypeID) {
      return this.registerTypes.filter(filteredRegisterType => registerTypeID == filteredRegisterType.id)[0].name;
    }
  }

  @action private search(): void {
    this.props.registerAsyncOperation(this._service.searchApplicationsWithoutMovement().then((applications) => {
      applications.sort(function (a, b) {
        return b.registerDate.isBefore(b.registerDate) ? 1 : -1;
      });
      this._applications = applications
    }));
  }

  private getApplicationName(applicationType: string) {
    if (applicationType) {
      return this._applicationTypes.filter(ap => ap.appType.toString() == applicationType)[0].name;
    }
  }

  private getDocumentTypeName(documentTypeId: string) {
    if (documentTypeId) {
      return this.documentTypes.filter(dt => dt.id == documentTypeId)[0].name
    }
  }

  // @action loadDataForPage(page: any): Promise<void> {
  //   let that = this;
  //   this.searchCriteria.page = page;
  //   return this._service.getApplicationsWithoutMovement(this.searchCriteria).then(res => {
  //     runInAction(() => {
  //       if (res && res.length > 0) {
  //         that._applications = res;
  //       } else {
  //         that._applications = undefined;
  //         that.searchCriteria.page = 1;
  //         that.searchCriteria.count = 0;
  //       }
  //     });
  //   })
  // }

  @action closeModal() {
    this.isModalOpened = false;
  }

  @action openDraft() {
    UrlHelper.openInNewTab(UrlHelper.generateLinkUrl('~/Applications/ApplicationProcesses/' + ApplicationFormTypes[this.selectedApplicationID]));
  }

  private editApplication(app: ApplicationREAU) {
    var appType = this._applicationTypes.filter(ap => ap.appType.toString() == app.applicationType)[0].appType;
    this.props.registerAsyncOperation(this._applicationProcessService.provideApplicationProcessByApplicationFormType(appType, false).then(res => {
      if (res) {
        if (res.status != ProcessStatuses.Accepted && res.status != ProcessStatuses.Completed) {
          this.isModalOpened = true;
          this.selectedApplicationID = appType;
        } else {
          this._applicationProcessService.deleteApplicationProcess(res.applicationProcessId).then(() => {
            this.redirectToApplicationProcess(appType, app);
          });
        }
      } else {
        this.redirectToApplicationProcess(appType, app);
      }
    }));
  }

  private redirectToApplicationProcess(appType: number, application: ApplicationREAU) {
    var request: any = {};
    request.type = appType;
    request.additionalData = {};
    request.additionalData.incomingReauNumber = application.applicationIdentifier;
    request.additionalData.lastApplicationForCorrectionIdentifier = application.lastApplicationForCorrectionIdentifier;
    request.additionalData.registerNumber = application.registerNumber;
    request.additionalData.registerDate = application.registerDate;

    if (request.additionalData.registerDate !== undefined) {
      request.additionalData.registerDate = request.additionalData.registerDate.format('YYYY-MM-DDTHH:mm:ss');
    }

    let registryOfficePromise = NomenclaturesPR.getRegistryOffice(ro => ro.id == application.registerSiteID).then(registryOffice => {
      request.additionalData.registryOffice = {};
      request.additionalData.registryOffice.id = registryOffice[0].id;
      request.additionalData.registryOffice.name = registryOffice[0].name;
    });

    let registerTypesPromise = NomenclaturesPR.getRegisterTypes(rt => rt.id == application.registerTypeID).then(registerType => {
      request.additionalData.registerType = {};
      request.additionalData.registerType.id = registerType[0].id;
      request.additionalData.registerType.name = registerType[0].name;
    });

    Promise.all([registryOfficePromise, registerTypesPromise]).then(value => {
      this.props.registerAsyncOperation(this._applicationProcessService.createApplicationProcess(request).then(() => {
        UrlHelper.openInNewTab(UrlHelper.generateLinkUrl('~/Applications/ApplicationProcesses/' + ApplicationFormTypes[appType]));
      }));
    });
  }

  private getRegisterTypes(): void {
    let that = this;
    this.props.registerAsyncOperation(NomenclaturesPR.getRegisterTypes().then(registerTypes => {
      that.registerTypes = registerTypes;
    }));
  }

  private getDocumentTypes() {
    this.props.registerAsyncOperation(NomenclaturesPR.getDocumentTypes().then(documentTypes => {
      this.documentTypes = documentTypes;
    }));
  }
}

export const ApplicationsWithoutMovementUI = withRouter(withAsyncFrame(ApplicationsWithoutMovementUIImpl));
