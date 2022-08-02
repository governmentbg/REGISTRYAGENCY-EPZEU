import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { observable } from "mobx";
import { Individual } from "./Individual";
import { LegalEntity } from "./LegalEntity";
import { PersonType } from "EPZEU.PR.ApplicationBase";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('Person', moduleContext.moduleName)
export class Person extends BaseDataModel {
  @observable private _individual: Individual = null;
  @observable private _type: PersonType = null;
  @observable private _legalEntity: LegalEntity = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get type(): PersonType {
    return this._type;
  }

  @TypeSystem.propertyDecorator(PersonType ? PersonType : moduleContext.moduleName + '.' + 'PersonType')
  public set type(value: PersonType) {
    this._type = value;
  }

  public get individual(): Individual {
    return this._individual;
  }

  @TypeSystem.propertyDecorator(Individual)
  public set individual(value: Individual) {
    this._individual = value;
  }

  public get legalEntity(): LegalEntity {
    return this._legalEntity;
  }

  @TypeSystem.propertyDecorator(LegalEntity)
  public set legalEntity(value: LegalEntity) {
    this._legalEntity = value;
  }
}

