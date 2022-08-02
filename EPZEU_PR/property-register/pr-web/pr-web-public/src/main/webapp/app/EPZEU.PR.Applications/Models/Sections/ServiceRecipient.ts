import { observable } from "mobx";
import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { ApplicantCategory } from 'EPZEU.PR.Core';
import { moduleContext } from "../../ModuleContext";
import { Person } from "../Person";

@TypeSystem.typeDecorator('ServiceRecipient', moduleContext.moduleName)
export class ServiceRecipient extends BaseDataModel {

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @observable private _person: Person = null;

  public  get person(): Person {
    return this._person;
  }
  @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
  public set person(value: Person) {
    this._person = value;
  }

  @observable private _dataForAnOfficial: string = null;

  public get dataForAnOfficial(): string {
    return this._dataForAnOfficial;
  }

  @TypeSystem.propertyDecorator('string')
  public set dataForAnOfficial(value: string) {
    this._dataForAnOfficial = value;
  }

  @observable private _specialAccessType: string = null;

  public get specialAccessType(): string {
    return this._specialAccessType;
  }

  @TypeSystem.propertyDecorator('string')
  public set specialAccessType(value: string) {
    this._specialAccessType = value;
  }

  @observable private _applicantCategory: ApplicantCategory = null;

  public get applicantCategory(): ApplicantCategory {
    return this._applicantCategory;
  }
  @TypeSystem.propertyDecorator(ApplicantCategory ? ApplicantCategory : moduleContext.moduleName + '.' + 'ApplicantCategory')
  public set applicantCategory(value: ApplicantCategory) {
    this._applicantCategory = value;
  }
  
}
