import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { ApplicantCategory } from 'EPZEU.PR.Core';
import { ApplicantType } from "EPZEU.PR.ApplicationBase";
import { moduleContext } from "../../ModuleContext";
import { Individual } from "../Individual";

@TypeSystem.typeDecorator('ApplicantData', moduleContext.moduleName)
export class ApplicantData extends BaseDataModel {

  @observable private _individual: Individual = null;
  @observable private _applicantType: ApplicantType = null;
  @observable private _applicantCategory: ApplicantCategory = null;
  @observable private _specialAccessType: string = null;
  @observable private _dataForAnOfficial: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get individual(): Individual {
    return this._individual;
  }

  @TypeSystem.propertyDecorator(Individual ? Individual : moduleContext.moduleName + '.' + 'Individual')
  public set individual(value: Individual) {
    this._individual = value;
  }

  public get applicantType(): ApplicantType {
    return this._applicantType;
  }

  @TypeSystem.propertyDecorator(ApplicantType ? ApplicantType : moduleContext.moduleName + '.' + 'ApplicantType')
  public set applicantType(value: ApplicantType) {
    this._applicantType = value;
  }

  public get applicantCategory(): ApplicantCategory {
    return this._applicantCategory;
  }

  @TypeSystem.propertyDecorator(ApplicantCategory ? ApplicantCategory : moduleContext.moduleName + '.' + 'ApplicantCategory')
  public set applicantCategory(value: ApplicantCategory) {
    this._applicantCategory = value;
  }

  public get specialAccessType(): string {
    return this._specialAccessType;
  }

  @TypeSystem.propertyDecorator('string')
  public set specialAccessType(value: string) {
    this._specialAccessType = value;
  }

  public get dataForAnOfficial(): string {
    return this._dataForAnOfficial;
  }

  @TypeSystem.propertyDecorator('string')
  public set dataForAnOfficial(value: string) {
    this._dataForAnOfficial = value;
  }
}
