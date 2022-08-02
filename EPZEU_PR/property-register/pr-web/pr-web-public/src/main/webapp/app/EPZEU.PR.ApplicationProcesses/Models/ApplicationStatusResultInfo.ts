import {BaseDataModel, ObjectHelper, TypeSystem} from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import * as moment from "moment";
import { AttachmentInfo } from "./AttachmentInfo";
import { ApplicationStatusEnum } from "EPZEU.PR.ApplicationBase";
import {AttachmentInfoTypeEnum} from "./AttachmentInfoTypeEnum";
import {ApplicationFormTypes} from "../../EPZEU.PR.Core/Models";

@TypeSystem.typeDecorator('ApplicationStatusResultInfo', moduleContext.moduleName)
export class ApplicationStatusResultInfo extends BaseDataModel {

  @observable private _applicationTypeId: number = null;
  @observable private _status: ApplicationStatusEnum = null;
  @observable private _statusTime: moment.Moment = null;
  @observable private _textContent: string = null;
  //Result document, this array is returned and filled from server
  @observable private _statusResultDocuments: AttachmentInfo[] = null;
  //Attachment infos, this array is filled by client, it is comprised by status documents/result document and text related with status, this array is used for sorting of
  //how links with dates will be showed to client, for example judge resolution files and judge resolution texts
  @observable private _attachmentInfos: AttachmentInfo[] = null;
  @observable private _correctionIdentifier: string = null;
  @observable private _serviceProcessActionId: number = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get applicationTypeId(): number {
    return this._applicationTypeId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationTypeId(value: number) {
    this._applicationTypeId = value;
  }

  public get status(): ApplicationStatusEnum {
    return this._status;
  }

  @TypeSystem.propertyDecorator(ApplicationStatusEnum)
  public set status(value: ApplicationStatusEnum) {
    this._status = value;
  }

  public  get statusTime(): moment.Moment {
    return this._statusTime;
  }

  @TypeSystem.propertyDecorator('moment')
  public set statusTime(value: moment.Moment) {
    this._statusTime = value;
  }

  public get textContent(): string {
    return this._textContent;
  }

  @TypeSystem.propertyDecorator('string')
  public set textContent(value: string) {
    this._textContent = value;
  }

  public get statusResultDocuments(): AttachmentInfo[] {
    return this._statusResultDocuments;
  }

  @TypeSystem.propertyArrayDecorator(AttachmentInfo)
  public set statusResultDocuments(value: AttachmentInfo[]) {

    this.attachmentInfos = [];

    if(!ObjectHelper.isArrayNullOrEmpty(value)) {
      this.attachmentInfos = value;

      this.attachmentInfos.forEach(resultDocument => {
        resultDocument.attachmentInfoType = AttachmentInfoTypeEnum.FILE;
      });
    }

    if(!ObjectHelper.isNullOrUndefined(this.textContent)) {
      if(this.status == ApplicationStatusEnum.CANCELED) {

        let textAttachmentInfo = new AttachmentInfo();
        textAttachmentInfo.attachmentInfoType = AttachmentInfoTypeEnum.REMARK_TEXT;

        textAttachmentInfo.createDate = this.statusTime;
        this.attachmentInfos.push(textAttachmentInfo);
      } else if(this.status == ApplicationStatusEnum.WITH_A_REFUSAL) {

        let textAttachmentInfo = new AttachmentInfo();
        textAttachmentInfo.attachmentInfoType = AttachmentInfoTypeEnum.REFUSAL_TEXT;
        textAttachmentInfo.createDate = this.statusTime;

        this.attachmentInfos.push(textAttachmentInfo);

      } else if(this.status == ApplicationStatusEnum.WITHOUT_MOVEMENT
        || this.status == ApplicationStatusEnum.REFUSAL_TO_ISSUE_CERTIFICATE) {

        let textAttachmentInfo = new AttachmentInfo();
        textAttachmentInfo.attachmentInfoType = AttachmentInfoTypeEnum.JUDGE_RESOLUTION_TEXT;

        textAttachmentInfo.createDate = this.statusTime;
        this.attachmentInfos.push(textAttachmentInfo);
      }
    }

    this.attachmentInfos = this.attachmentInfos.sort((a:AttachmentInfo, b:AttachmentInfo) => {
      return a.createDate.isBefore(b.createDate) ? 1 : -1;
    });

    this._statusResultDocuments = value;
  }

  public get attachmentInfos(): AttachmentInfo[] {
    return this._attachmentInfos;
  }

  @TypeSystem.propertyArrayDecorator(AttachmentInfo)
  public set attachmentInfos(value: AttachmentInfo[]) {
    this._attachmentInfos = value;
  }

  public get correctionIdentifier(): string {
    return this._correctionIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set correctionIdentifier(value: string) {
    this._correctionIdentifier = value;
  }

  public get serviceProcessActionId(): number {
    return this._serviceProcessActionId;
  }

  @TypeSystem.propertyDecorator('number')
  public set serviceProcessActionId(value: number) {
    this._serviceProcessActionId = value;
  }
}
