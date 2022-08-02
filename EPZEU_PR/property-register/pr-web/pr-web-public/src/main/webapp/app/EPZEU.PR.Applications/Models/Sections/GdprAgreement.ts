import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('GdprAgreement', moduleContext.moduleName)
export class GdprAgreement extends BaseDataModel {

  @observable private _gdprAgreementText: string = null;
  @observable private _gdprAgreementAcceptance: boolean = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  get gdprAgreementText(): string {
    return this._gdprAgreementText;
  }
  @TypeSystem.propertyDecorator('string')
  set gdprAgreementText(value: string) {
    this._gdprAgreementText = value;
  }
  get gdprAgreementAcceptance(): boolean {
    return this._gdprAgreementAcceptance;
  }
  @TypeSystem.propertyDecorator('boolean')
  set gdprAgreementAcceptance(value: boolean) {
    this._gdprAgreementAcceptance = value;
  }
}
