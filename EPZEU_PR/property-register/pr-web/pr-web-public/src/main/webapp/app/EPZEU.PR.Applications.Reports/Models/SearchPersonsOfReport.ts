import { TypeSystem, BaseDataModel } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import {computed, observable} from "mobx";
import { PersonOfReport } from "./PersonOfReport";
import { PersonType } from "EPZEU.PR.ApplicationBase";
import { IndividualSearchCriteria } from "./IndividualSearchCriteria";
import { LegalEntitySearchCriteria } from "./LegalEntitySearchCriteria";

@TypeSystem.typeDecorator('SearchPersonsOfReport', moduleContext.moduleName)
export class SearchPersonsOfReport extends BaseDataModel {

  @observable private _registryOfficeId: string = null;
  @observable private _registryOfficeName: string = null;
  @observable private _type: PersonType = null;
  @observable private _individualSearchCriteria: IndividualSearchCriteria = null;
  @observable private _legalEntitySearchCriteria: LegalEntitySearchCriteria = null;
  @observable private _items: PersonOfReport[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }

 public get registryOfficeName(): string {
    return this._registryOfficeName;
  }

  @TypeSystem.propertyDecorator('string')
 public set registryOfficeName(value: string) {
    this._registryOfficeName = value;
  }

  public get individualSearchCriteria(): IndividualSearchCriteria {
    return this._individualSearchCriteria;
  }

  @TypeSystem.propertyDecorator(IndividualSearchCriteria)
  public set individualSearchCriteria(value: IndividualSearchCriteria) {
    this._individualSearchCriteria = value;
  }

  public get legalEntitySearchCriteria(): LegalEntitySearchCriteria {
    return this._legalEntitySearchCriteria;
  }

  @TypeSystem.propertyDecorator(LegalEntitySearchCriteria)
  public set legalEntitySearchCriteria(value: LegalEntitySearchCriteria) {
    this._legalEntitySearchCriteria = value;
  }

  public get type(): PersonType {
    return this._type;
  }

  @TypeSystem.propertyDecorator(PersonType)
  public set type(value: PersonType) {
    this._type = value;
  }

  public get items(): PersonOfReport[] {
    return this._items;
  }

  @TypeSystem.propertyDecorator(PersonOfReport)
  public set items(value: PersonOfReport[]) {
    this._items = value;
  }
}
