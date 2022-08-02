import { observable } from "mobx";
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { resourceManager } from "EPZEU.Core";
import { RegistryOffice } from 'EPZEU.PR.Core';
import { ServiceTypes } from "EPZEU.PR.ApplicationBase";
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('WayOfProvision', moduleContext.moduleName)
export class WayOfProvision extends BaseDataModel {

  @observable private _issuingAuthority: RegistryOffice = null;
  @observable private _selectedElectronicImageDeliveryMethod: boolean = false;
  @observable private _selectedOnCornerDeliveryMethod: boolean = false;
  @observable private _receivingOffice: RegistryOffice = null;
  @observable private _serviceTypeId: number = ServiceTypes.GL_SERVICE_TYPE_ORDINARY_L;
  @observable private _serviceType: string = resourceManager.getResourceByKey(ServiceTypes[ServiceTypes.GL_SERVICE_TYPE_ORDINARY_L]);

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get issuingAuthority(): RegistryOffice {
    return this._issuingAuthority;
  }

  @TypeSystem.propertyDecorator(RegistryOffice)
  public set issuingAuthority(value: RegistryOffice) {
    this._issuingAuthority = value;
  }

  public get receivingOffice(): RegistryOffice {
    return this._receivingOffice;
  }

  @TypeSystem.propertyDecorator(RegistryOffice)
  public set receivingOffice(value: RegistryOffice) {
    this._receivingOffice = value;
  }

   public get serviceTypeId(): number {
    return this._serviceTypeId;
  }

  @TypeSystem.propertyDecorator('number')
  public set serviceTypeId(value: number) {
    this._serviceTypeId = value;
  }

  public get serviceType(): string {
    return this._serviceType;
  }

  @TypeSystem.propertyDecorator('string')
  public set serviceType(value: string) {
    this._serviceType = value;
  }

  public get selectedElectronicImageDeliveryMethod(): boolean {
    return this._selectedElectronicImageDeliveryMethod;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set selectedElectronicImageDeliveryMethod(value: boolean) {
    this._selectedElectronicImageDeliveryMethod = value;
  }

  public get selectedOnCornerDeliveryMethod(): boolean {
    return this._selectedOnCornerDeliveryMethod;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set selectedOnCornerDeliveryMethod(value: boolean) {
    this._selectedOnCornerDeliveryMethod = value;
  }
}
