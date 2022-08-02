import { TypeSystem } from 'Cnsys.Core';
import { ApplicationFormBase } from 'EPZEU.PR.ApplicationBase';
import { observable } from 'mobx';
import { moduleContext } from "../../ModuleContext";
import { Individual } from "../Individual";
import { ActRequestingACopy } from '../Sections/ActRequestingACopy';
import { ContactData } from "../Sections/ContactData";
import { WayOfProvisionBaseData } from '../Sections/WayOfProvisionBaseData';
import {GdprAgreement} from "../Sections/GdprAgreement";

@TypeSystem.typeDecorator('ApplicationForNotCertifiedCopy', moduleContext.moduleName)
export class ApplicationForNotCertifiedCopy extends ApplicationFormBase {

  @observable private _applicantData: Individual = null;
  @observable private _actRequestingACopy: ActRequestingACopy = null;
  @observable private _wayOfProvision: WayOfProvisionBaseData = null;
  @observable private _contactData: ContactData = null;
  @observable private _gdprAgreement: GdprAgreement = null;

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator(Individual ? Individual : moduleContext.moduleName + '.' + 'Individual')
  public set applicantData(val: Individual) {
    this._applicantData = val;
  }

  public get applicantData(): Individual {
    return this._applicantData;
  }

  @TypeSystem.propertyDecorator(ActRequestingACopy ? ActRequestingACopy : moduleContext.moduleName + '.' + 'ActRequestingACopy')
  public set actRequestingACopy(val: ActRequestingACopy) {
    this._actRequestingACopy = val;
  }

  public get actRequestingACopy(): ActRequestingACopy {
    return this._actRequestingACopy;
  }

  @TypeSystem.propertyDecorator(WayOfProvisionBaseData ? WayOfProvisionBaseData : moduleContext.moduleName + '.' + 'WayOfProvisionBaseData')
  public set wayOfProvision(val: WayOfProvisionBaseData) {
    this._wayOfProvision = val;
  }

  public get wayOfProvision(): WayOfProvisionBaseData {
    return this._wayOfProvision;
  }

  @TypeSystem.propertyDecorator(ContactData ? ContactData : moduleContext.moduleName + '.' + 'ContactData')
  public set contactData(val: ContactData) {
    this._contactData = val;
  }

  public get contactData(): ContactData {
    return this._contactData;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }
  @TypeSystem.propertyDecorator(GdprAgreement ? GdprAgreement : moduleContext.moduleName + '.' + "GdprAgreement")
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
