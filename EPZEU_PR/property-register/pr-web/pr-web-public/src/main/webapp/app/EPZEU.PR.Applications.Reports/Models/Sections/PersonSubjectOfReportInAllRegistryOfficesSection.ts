import { observable } from "mobx";
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { PeriodForReport, PersonType } from "EPZEU.PR.ApplicationBase";
import {moduleContext} from "../../ModuleContext";


@TypeSystem.typeDecorator('PersonSubjectOfReportInAllRegistryOfficesSection', moduleContext.moduleName)
export class PersonSubjectOfReportInAllRegistryOfficesSection extends BaseDataModel {

  @observable private _periodForReport: PeriodForReport = new PeriodForReport();
  @observable private _personType: PersonType = PersonType.INDIVIDUAL;
  @observable private _identity: string;
  @observable private _legalEntityNumber: string;
  @observable private _companyName: string;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get periodForReport(): PeriodForReport {
    return this._periodForReport;
  }

  @TypeSystem.propertyDecorator(PeriodForReport)
  public set periodForReport(value: PeriodForReport) {
    this._periodForReport = value;
  }

  public get personType(): PersonType {
    return this._personType;
  }

  @TypeSystem.propertyDecorator(PersonType)
  public set personType(value: PersonType) {
    this._personType = value;
  }

  public get identity(): string {
    return this._identity;
  }

  @TypeSystem.propertyDecorator("string")
  public set identity(value: string) {
    this._identity = value;
  }

  get legalEntityNumber(): string {
    return this._legalEntityNumber;
  }

  @TypeSystem.propertyDecorator("string")
  set legalEntityNumber(value: string) {
    this._legalEntityNumber = value;
  }

  get companyName(): string {
    return this._companyName;
  }

  @TypeSystem.propertyDecorator("string")
  set companyName(value: string) {
    this._companyName = value;
  }

}
