import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { appConfig, ObjectHelper, UrlHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import {EPZEUBaseComponent, IDataServiceProviderProps, withDataServiceProvider, ApplicationType, Nomenclatures} from "EPZEU.Core";
import {ApplicationFormTypes, ApplicationStatus, DocumentTypePR, NomenclaturesPR, ApplicationTypePR} from "EPZEU.PR.Core";
import { ApplicationStatusEnum, DocumentTypeLabels } from "EPZEU.PR.ApplicationBase";
import { statusHistoryDataService } from "../Services/StatusHistoryDataService";
import { ApplicationStatusResultInfo } from "../Models/ApplicationStatusResultInfo";
import {AttachmentInfo, AttachmentInfoTypeEnum} from "../Models";


interface StatusHistoryUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
  incomingNumber: any;
}

@observer class StatusHistoryUIImpl extends EPZEUBaseComponent<StatusHistoryUIProps, any> {

  @observable statuses: ApplicationStatusResultInfo[];
  @observable private applicationStatuses: ApplicationStatus[];
  @observable private documentTypes: DocumentTypePR[];
  //Refactoring needed first was used ApplicationTypesPR with prices which are get from REAU but REAU do not have translated AppTypes, now for translation is added App Types from EPZEU
  @observable private appTypes: ApplicationType[];
  @observable private applicationTypesPR: ApplicationTypePR[];
  @observable isContextLoading: boolean;

  constructor(props: StatusHistoryUIProps) {
    super(props);

    this.getApplicationTypes();
    this.getApplicationTypesPR();
    this.getApplicationStatuses();
    this.getDocumentTypes();

    this.isContextLoading = true;
    this.props.registerAsyncOperation(statusHistoryDataService.getStatusHistory(this.props.match.params.incomingNumber).then(result => {
      result.sort((a:ApplicationStatusResultInfo, b:ApplicationStatusResultInfo) => {
        return a.statusTime.isBefore(b.statusTime) ? 1 : -1;
      });

      this.statuses = result;
      if(ObjectHelper.isArrayNullOrEmpty(result)) {
        this.isContextLoading = false;
      }
    }));
  }

  private getApplicationTypes() {
    Nomenclatures.getApplicationTypes().then(result => {
      this.appTypes = result;
    });
  }

  private getApplicationTypesPR() {
    NomenclaturesPR.getApplicationTypes().then(result => {
      this.applicationTypesPR = result;
    });
  }

  private getDocumentTypes() {
    this.props.registerAsyncOperation(NomenclaturesPR.getDocumentTypes().then(documentTypes => {
      this.documentTypes = documentTypes;
    }));
  }

  private getApplicationStatuses() {
    this.props.registerAsyncOperation(NomenclaturesPR.getApplicationStatuses().then((appStatuses: ApplicationStatus[]) => {
      this.applicationStatuses = appStatuses;
    }));
  }

  render(): JSX.Element {
    let style20: any = { width: '20%' };
    let style25: any = { width: '25%' };

    return (
      !ObjectHelper.isArrayNullOrEmpty(this.statuses) ? <div className="page-header-wrapper">
        <div className="section-wrapper">
          <div className="fixed-content-width">
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h1 className="page-title">{this.getResource("PR_SHOW_STATUS_HISTRY_L")}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
          <div className="page-wrapper">
            <div className="section-wrapper">
              <div className="row">
                <div className="form-group col-12">
                  <label className="field-title field-title--form">{this.getResource("PR_APPLIC_PORTAL_NUM_L")}</label>
                  <p className="field-text">{this.props.match.params.incomingNumber}</p>
                </div>
                <div className="form-group col-12">
                  <label className="field-title field-title--form">{this.getResource("PR_APPL_TYPE_L")}</label>
                  <p className="field-text">
                    {!ObjectHelper.isArrayNullOrEmpty(this.statuses) && !ObjectHelper.isArrayNullOrEmpty(this.appTypes) ?
                      this.getApplicationTypeName(this.statuses[0].applicationTypeId)
                      : null}
                  </p>
                </div>

              </div>
              <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={style20}>{this.getResource("GL_DATE_L")}</th>
                      <th style={style25}>{this.getResource("GL_CONDITION_L")}</th>
                      <th>{this.getResource("PR_APP_ACT_ADDITIONAL_DATA_L")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!ObjectHelper.isArrayNullOrEmpty(this.statuses) && this.statuses.map((resultInfo, i) => {
                      return (
                        <tr key={ObjectHelper.newGuid()}>
                          <td>
                            <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_DATE_L")}</span>
                            <p className="field-text">
                              {resultInfo.statusTime.format('DD.MM.YYYY') + " " +
                                this.getResource('GL_YEAR_ABBREVIATION_L') + " " +
                                resultInfo.statusTime.format('LTS') + " " +
                                this.getResource('GL_HOUR_ABBREVIATION_L')}
                            </p>
                          </td>
                          <td>
                            <span className="field-title field-title--preview d-sm-none">{this.getResource("GL_CONDITION_L")}</span>
                            <p className="field-text">
                              <span>{!ObjectHelper.isArrayNullOrEmpty(this.applicationStatuses) && this.getResource(this.getApplicationStatusNameCode(resultInfo.status))}</span>
                            </p>
                          </td>
                          <td>
                            {!ObjectHelper.isArrayNullOrEmpty(resultInfo.attachmentInfos) ?
                            <span className="field-title field-title--preview d-sm-none">{this.getResource("PR_APP_ACT_ADDITIONAL_DATA_L")}</span> : null}
                            {!ObjectHelper.isArrayNullOrEmpty(resultInfo.attachmentInfos) ?
                              resultInfo.attachmentInfos.map((attachmentInfo: AttachmentInfo, idx: number) => {
                                return <React.Fragment key={ObjectHelper.newGuid()}>
                                  {attachmentInfo.attachmentInfoType == AttachmentInfoTypeEnum.FILE ?
                                      <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "DocumentAccess/" + encodeURIComponent(attachmentInfo.downloadIdentifier))} target="_blank">{this.getDocumentTypeText(attachmentInfo.fileTypeID)}</a>
                                    : null}

                                   {attachmentInfo.attachmentInfoType == AttachmentInfoTypeEnum.JUDGE_RESOLUTION_TEXT ?
                                      <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "StatusText/" + this.props.match.params.incomingNumber)
                                        + "/" + resultInfo.serviceProcessActionId}
                                           target="_blank">{this.getResource("PR_JUDGE_RESOLUTION_L")}</a>
                                    : null}

                                  {attachmentInfo.attachmentInfoType == AttachmentInfoTypeEnum.REMARK_TEXT ?
                                      <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "StatusText/" + this.props.match.params.incomingNumber)
                                      + "/" + resultInfo.serviceProcessActionId} target="_blank">{this.getResource("PR_REASONS_L")}</a>
                                    : null}

                                  {attachmentInfo.attachmentInfoType == AttachmentInfoTypeEnum.REFUSAL_TEXT ?
                                      this.getApplicationTypeCode(resultInfo.applicationTypeId) == ApplicationFormTypes.ApplicationForNotCertifiedCopy ?
                                          <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "StatusText/" + this.props.match.params.incomingNumber)
                                          + "/" + resultInfo.serviceProcessActionId} target="_blank">{this.getResource("GL_REASON_L")}</a>
                                          :
                                          <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "StatusText/" + this.props.match.params.incomingNumber)
                                          + "/" + resultInfo.serviceProcessActionId} target="_blank">{this.getResource("PR_JUDGE_RESOLUTION_L")}</a>
                                    : null}

                                  {
                                    "/" +
                                    attachmentInfo.createDate.format('DD.MM.YYYY') + " " +
                                    this.getResource('GL_YEAR_ABBREVIATION_L') + " " +
                                    attachmentInfo.createDate.format('LTS') + " " +
                                    this.getResource('GL_HOUR_ABBREVIATION_L')
                                  }

                                  {resultInfo.attachmentInfos.length - 1 != idx ?

                                    <>,<br></br></>

                                    : " "}

                                </React.Fragment>
                              })
                              : null}

                            {resultInfo.status == ApplicationStatusEnum.WITHOUT_MOVEMENT_FOR_REVIEW && !ObjectHelper.isNullOrUndefined(resultInfo.correctionIdentifier) ?
                              <p className="field-text">
                                {this.getResource("PR_SUBMITTED_CORRECTIVE_APPLICATION_L") + " "}
                                <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "ApplicationPreview/" + resultInfo.correctionIdentifier)}
                                  target="_blank">{resultInfo.correctionIdentifier}</a>
                              </p>

                              : null}

                            {resultInfo.status == ApplicationStatusEnum.PROCESS_TERMINATED ?
                              <>
                                <a href={UrlHelper.generateLinkUrl(appConfig.baseUrlName + "StatusText/" + this.props.match.params.incomingNumber)
                                    + "/" + resultInfo.serviceProcessActionId} target="_blank">{this.getResource("PR_TECHNICAL_REASONS_L")}</a>

                                {"/" +
                                  resultInfo.statusTime.format('DD.MM.YYYY') + " " +
                                  this.getResource('GL_YEAR_ABBREVIATION_L') + " " +
                                  resultInfo.statusTime.format('LTS') + " " +
                                  this.getResource('GL_HOUR_ABBREVIATION_L')}
                              </>
                             : null}
                          </td>
                        </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> : !this.isContextLoading ?
      <div className="alert alert-danger" role="alert">
        <p>
          {this.getResource("GL_DOCUMENT_NOT_FOUND_E")}
        </p>
      </div> : null);
  }

  private getApplicationStatusNameCode(status: ApplicationStatusEnum) {
    if (status) {
      return this.applicationStatuses.filter(filteredAppStatus => status.toString() == filteredAppStatus.id)[0].nameCode;
    }
  }

  private getDocumentTypeText(docTypeId: string) {
    if (docTypeId) {
      let docTypeLabel = DocumentTypeLabels[docTypeId];

      if(docTypeLabel) {
        return this.getResource(docTypeLabel);
      } else {
        return this.getDocumentTypeName(docTypeId);
      }
    }
  }

  private getDocumentTypeName(documentTypeId: string) {
    if (documentTypeId) {
      return this.documentTypes.filter(dt => dt.id == documentTypeId)[0].name
    }
  }

  private getApplicationTypeName(appTypeId: number) {
    if (appTypeId) {
      let applicationTypePR = this.applicationTypesPR.filter(filteredAppType => appTypeId == filteredAppType.applicationTypeId)[0];
      return this.appTypes.filter(filteredAppType => applicationTypePR.appType == Number(filteredAppType.appType))[0].name;
    }
  }

  private getApplicationTypeCode(appTypeId: number) {
    if (appTypeId) {
      return Number(this.appTypes.filter(filteredAppType => appTypeId == filteredAppType.applicationTypeID)[0].appType);
    }
  }
}

export const StatusHistoryUI = withRouter(withDataServiceProvider(withAsyncFrame(StatusHistoryUIImpl)));
