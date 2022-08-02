import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { DataForRegistrationOfDocumentInBook } from './DataForRegistrationOfDocumentInBook';
import { DataForRegistrationOfDocumentInDoubleIncomingRegister } from './DataForRegistrationOfDocumentInDoubleIncomingRegister';
import { DataForRegistrationOfDocumentInIncomingRegister } from './DataForRegistrationOfDocumentInIncomingRegister';
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('ActData', moduleContext.moduleName)
export class ActData extends BaseDataModel {
  @observable private _dataForRegistrationOfDocumentInBook: DataForRegistrationOfDocumentInBook = null;
  @observable private _dataForRegistrationOfDocumentInDoubleIncomingRegister: DataForRegistrationOfDocumentInDoubleIncomingRegister = null;
  @observable private _dataForRegistrationOfDocumentInIncomingRegister: DataForRegistrationOfDocumentInIncomingRegister = null;

  public get dataForRegistrationOfDocumentInBook(): DataForRegistrationOfDocumentInBook {
    return this._dataForRegistrationOfDocumentInBook;
  }

  @TypeSystem.propertyDecorator(DataForRegistrationOfDocumentInBook ? DataForRegistrationOfDocumentInBook : moduleContext.moduleName + '.' + 'DataForRegistrationOfDocumentInBook')
  public set dataForRegistrationOfDocumentInBook(val: DataForRegistrationOfDocumentInBook) {
    this._dataForRegistrationOfDocumentInBook = val;
  }

  public get dataForRegistrationOfDocumentInDoubleIncomingRegister(): DataForRegistrationOfDocumentInDoubleIncomingRegister {
    return this._dataForRegistrationOfDocumentInDoubleIncomingRegister;
  }

  @TypeSystem.propertyDecorator(DataForRegistrationOfDocumentInDoubleIncomingRegister ? DataForRegistrationOfDocumentInDoubleIncomingRegister : moduleContext.moduleName + '.' + 'DataForRegistrationOfDocumentInDoubleIncomingRegister')
  public set dataForRegistrationOfDocumentInDoubleIncomingRegister(val: DataForRegistrationOfDocumentInDoubleIncomingRegister) {
    this._dataForRegistrationOfDocumentInDoubleIncomingRegister = val;
  }
  public get dataForRegistrationOfDocumentInIncomingRegister(): DataForRegistrationOfDocumentInIncomingRegister {
    return this._dataForRegistrationOfDocumentInIncomingRegister;
  }

  @TypeSystem.propertyDecorator(DataForRegistrationOfDocumentInIncomingRegister ? DataForRegistrationOfDocumentInIncomingRegister : moduleContext.moduleName + '.' + 'DataForRegistrationOfDocumentInIncomingRegister')
  public set dataForRegistrationOfDocumentInIncomingRegister(val: DataForRegistrationOfDocumentInIncomingRegister) {
    this._dataForRegistrationOfDocumentInIncomingRegister = val;
  }

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }
}
