import { observable } from 'mobx';
import { isUndefined } from "typescript-collections/dist/lib/util";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { moduleContext } from '../ModuleContext';
import { Documents } from "./Documents";

@TypeSystem.typeDecorator('ApplicationFormBase', moduleContext.moduleName)
export class ApplicationFormBase extends BaseDataModel {

  @observable private _appFormType: ApplicationFormTypes = null;
  @observable private _documents: Documents = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get appFormType(): ApplicationFormTypes {
    return this._appFormType;
  }

  @TypeSystem.propertyDecorator(ApplicationFormTypes)
  public set appFormType(value: ApplicationFormTypes) {
    if (!isUndefined(value)) {
      this._appFormType = value;
    }
  }

  public get documents(): Documents {
    return this._documents;
  }

  @TypeSystem.propertyDecorator(Documents)
  public set documents(value: Documents) {
    this._documents = value;
  }
}
