import { observable } from "mobx";
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { RegistryOffice } from "EPZEU.PR.Core";
import { PersonType } from "EPZEU.PR.ApplicationBase";
import { IndividualOfReport } from "./IndividualOfReport";
import { LegalEntityOfReport } from "./LegalEntityOfReport";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('PersonOfReport', moduleContext.moduleName)
export class PersonOfReport extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _individual: IndividualOfReport = null;
  @observable private _type: PersonType = null;
  @observable private _legalEntity: LegalEntityOfReport = null;
  @observable private _registryOffice: RegistryOffice = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get id(): string {
    return this._id;
  }

  @TypeSystem.propertyDecorator('string')
  public set id(value: string) {
    this._id = value;
  }

  public get individual(): IndividualOfReport {
    return this._individual;
  }

  @TypeSystem.propertyDecorator(IndividualOfReport)
  public set individual(value: IndividualOfReport) {
    this._individual = value;
  }

  public get type(): PersonType {
    return this._type;
  }

  @TypeSystem.propertyDecorator(PersonType)
  public  set type(value: PersonType) {
    this._type = value;
  }

  public get legalEntity(): LegalEntityOfReport {
    return this._legalEntity;
  }

  @TypeSystem.propertyDecorator(LegalEntityOfReport)
  public set legalEntity(value: LegalEntityOfReport) {
    this._legalEntity = value;
  }

  public get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator(RegistryOffice)
  public set registryOffice(value: RegistryOffice) {
    this._registryOffice = value;
  }

  public toString(): string {
    if (this.type.toString() == PersonType[PersonType.INDIVIDUAL]) {
      return this.individual.toString();
    } else if (this.type.toString() == PersonType[PersonType.LEGAL_ENTITY]) {
      return this.legalEntity.toString();
    }
  }
}
