import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext';
import { observable } from 'mobx';

@TypeSystem.typeDecorator('LegalEntityIntegration', moduleContext.moduleName)
export class LegalEntityIntegration extends BaseDataModel {
  @observable private _companyName: string = null;
  @observable private _legalEntityNumber: string = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get companyName(): string {
    return this._companyName;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyName(value: string) {
    this._companyName = value;
  }

  public get legalEntityNumber(): string {
    return this._legalEntityNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set legalEntityNumber(value: string) {
    this._legalEntityNumber = value;
  }
}
