import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { PropertyDocument } from "../PropertyDocument";
import { moduleContext } from "../../ModuleContext";
import { Person } from "../Person";


@TypeSystem.typeDecorator('Owners', moduleContext.moduleName)
export class Owners extends BaseDataModel {
  @observable private _persons: Person[] = null;
  @observable private _propertyDocuments: PropertyDocument[] = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get persons(): Person[] {
    return this._persons;
  }

  @TypeSystem.propertyArrayDecorator(Person)
  public set persons(value: Person[]) {
    this._persons = value;
  }

  public get propertyDocuments(): PropertyDocument[] {
    return this._propertyDocuments;
  }

  @TypeSystem.propertyArrayDecorator(PropertyDocument)
  public set propertyDocuments(value: PropertyDocument[]) {
    this._propertyDocuments = value;
  }
}
