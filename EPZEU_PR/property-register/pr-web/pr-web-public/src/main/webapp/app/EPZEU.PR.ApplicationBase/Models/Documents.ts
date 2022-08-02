import {AttachedDocument} from "EPZEU.PR.ApplicationBase";
import {BaseDataModel, TypeSystem} from "Cnsys.Core";
import {observable} from "mobx";
import {moduleContext} from "../ModuleContext";
import {isUndefined} from "typescript-collections/dist/lib/util";

@TypeSystem.typeDecorator('Documents', moduleContext.moduleName)
export class Documents extends BaseDataModel {
  //Current document for attachment it is also needed for validations
  @observable private _currentDocument: AttachedDocument = null;
  //Already attached documents
  @observable private _attachedDocuments: AttachedDocument[] = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }


 public get currentDocument(): AttachedDocument {
    return this._currentDocument;
  }

  @TypeSystem.propertyDecorator(AttachedDocument ? AttachedDocument : moduleContext.moduleName + '.' + 'AttachedDocument')
  public set currentDocument(value: AttachedDocument) {
    this._currentDocument = value;
  }

  @TypeSystem.propertyArrayDecorator(AttachedDocument ? AttachedDocument : moduleContext.moduleName + '.' + 'AttachedDocument')
  public set attachedDocuments(val: AttachedDocument[]) {
    if (!isUndefined(val)) {
      this._attachedDocuments = val;
    }
  }

  public get attachedDocuments(): AttachedDocument[] {
    return this._attachedDocuments;
  }
}
