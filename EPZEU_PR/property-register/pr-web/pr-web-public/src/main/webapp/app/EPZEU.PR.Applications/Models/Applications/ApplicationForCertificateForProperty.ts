import { ApplicationFormBase } from 'EPZEU.PR.ApplicationBase';
import { TypeSystem } from 'Cnsys.Core';
import { moduleContext } from '../../ModuleContext';
import { observable } from "mobx";
import { RequestedProperty } from "../Sections/RequestedProperty";
import { Owners } from "../Sections/Owners";
import { WayOfProvision } from "../Sections/WayOfProvision";
import { ContactData } from "../Sections/ContactData";
import { Individual } from "../Individual";
import {InitialApplicationData} from "../Sections/InitialApplicationData";
import {GdprAgreement} from "../Sections/GdprAgreement";

@TypeSystem.typeDecorator('ApplicationForCertificateForProperty', moduleContext.moduleName)
export class ApplicationForCertificateForProperty extends ApplicationFormBase {
  @observable private _applicantData: Individual = null;
  @observable private _requestedProperty: RequestedProperty = null;
  @observable private _currentOwners: Owners = null;
  @observable private _previousOwners: Owners = null;
  @observable private _wayOfProvision: WayOfProvision = null;
  @observable private _contactData: ContactData = null;
  @observable private _initialApplicationData: InitialApplicationData = null;
  @observable private _gdprAgreement: GdprAgreement = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get applicantData(): Individual {
    return this._applicantData;
  }

  @TypeSystem.propertyDecorator(Individual)
  public set applicantData(value: Individual) {
    this._applicantData = value;
  }

  public get requestedProperty(): RequestedProperty {
    return this._requestedProperty;
  }

  @TypeSystem.propertyDecorator(RequestedProperty)
  public set requestedProperty(value: RequestedProperty) {
    this._requestedProperty = value;
  }

  public get currentOwners(): Owners {
    return this._currentOwners;
  }

  @TypeSystem.propertyDecorator(Owners)
  public set currentOwners(value: Owners) {
    this._currentOwners = value;
  }

  public get previousOwners(): Owners {
    return this._previousOwners;
  }

  @TypeSystem.propertyDecorator(Owners)
  public set previousOwners(value: Owners) {
    this._previousOwners = value;
  }

  public get wayOfProvision(): WayOfProvision {
    return this._wayOfProvision;
  }

  @TypeSystem.propertyDecorator(WayOfProvision)
  public set wayOfProvision(value: WayOfProvision) {
    this._wayOfProvision = value;
  }

  public get contactData(): ContactData {
    return this._contactData;
  }

  @TypeSystem.propertyDecorator(ContactData)
  public set contactData(value: ContactData) {
    this._contactData = value;
  }

  public get initialApplicationData(): InitialApplicationData {
    return this._initialApplicationData;
  }

  @TypeSystem.propertyDecorator(InitialApplicationData)
  public set initialApplicationData(value: InitialApplicationData) {
    this._initialApplicationData = value;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }
  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
