import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { PlaceNomenclaturePR, RegistryOffice } from "EPZEU.PR.Core";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('PlaceNomenclatureSearchResult', moduleContext.moduleName)
export class PlaceNomenclatureSearchResult extends BaseDataModel {

  @observable private _registryOffice: RegistryOffice = null;
  @observable private _placePR: PlaceNomenclaturePR = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator(RegistryOffice)
  public set registryOffice(value: RegistryOffice) {
    this._registryOffice = value;
  }

  public get placePR(): PlaceNomenclaturePR {
    return this._placePR;
  }

  @TypeSystem.propertyDecorator(PlaceNomenclaturePR)
  public set placePR(value: PlaceNomenclaturePR) {
    this._placePR = value;
  }
}
