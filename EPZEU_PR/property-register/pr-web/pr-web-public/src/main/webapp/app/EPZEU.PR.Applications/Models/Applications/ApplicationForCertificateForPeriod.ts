import { ApplicationFormBase } from 'EPZEU.PR.ApplicationBase';
import { TypeSystem } from 'Cnsys.Core';
import { moduleContext } from '../../ModuleContext';
import { observable } from "mobx";
import { WayOfProvision } from "../Sections/WayOfProvision";
import { ContactData } from "../Sections/ContactData";
import { PeriodForCertificate } from "../Sections/PeriodForCertificate";
import { RequestedProperty } from "../Sections/RequestedProperty";
import { Owners } from "../Sections/Owners";
import { Individual } from "../Individual";
import { InitialApplicationData } from "../Sections/InitialApplicationData";
import { Person } from "../Person";
import {GdprAgreement} from "../Sections/GdprAgreement";

@TypeSystem.typeDecorator('ApplicationForCertificateForPeriod', moduleContext.moduleName)
export class ApplicationForCertificateForPeriod extends ApplicationFormBase {
  @observable private _applicantData: Individual = null;
  @observable private _periodForCertificate: PeriodForCertificate = null;
  @observable private _requestedPerson: Person = null;
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

  get applicantData(): Individual {
    return this._applicantData;
  }

  @TypeSystem.propertyDecorator(Individual)
  set applicantData(value: Individual) {
    this._applicantData = value;
  }

  get periodForCertificate(): PeriodForCertificate {
    return this._periodForCertificate;
  }

  @TypeSystem.propertyDecorator(PeriodForCertificate)
  set periodForCertificate(value: PeriodForCertificate) {
    this._periodForCertificate = value;
  }

  get requestedPerson(): Person {
    return this._requestedPerson;
  }

  @TypeSystem.propertyDecorator(Person)
  set requestedPerson(value: Person) {
    this._requestedPerson = value;
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

  get wayOfProvision(): WayOfProvision {
    return this._wayOfProvision;
  }

  @TypeSystem.propertyDecorator(WayOfProvision)
  set wayOfProvision(value: WayOfProvision) {
    this._wayOfProvision = value;
  }

  get contactData(): ContactData {
    return this._contactData;
  }

  @TypeSystem.propertyDecorator(ContactData)
  set contactData(value: ContactData) {
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
