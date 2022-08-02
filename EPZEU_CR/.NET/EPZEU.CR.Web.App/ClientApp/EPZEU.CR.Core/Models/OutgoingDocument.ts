import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { FileMetadata } from './ApplicationDocument';

@TypeSystem.typeDecorator('OutgoingDocument', moduleContext.moduleName)
export class OutgoingDocument extends BaseDataModel {

    @observable private _guidWithCtx: string = null;
    @observable private _outgoingNumber: string = null;
    @observable private _outgoingGuid: string = null;
    @observable private _documentTypeID: string = null;
    @observable private _fileMetadata: FileMetadata = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set guidWithCtx(val: string) {
        this._guidWithCtx = val;
    }

    public get guidWithCtx(): string {
        return this._guidWithCtx;
    }

    @TypeSystem.propertyDecorator('string')
    public set outgoingNumber(val: string) {
        this._outgoingNumber = val;
    }

    public get outgoingNumber(): string {
        return this._outgoingNumber;
    }

    @TypeSystem.propertyDecorator('string')
    public set outgoingGuid(val: string) {
        this._outgoingGuid = val;
    }

    public get outgoingGuid(): string {
        return this._outgoingGuid;
    }

    @TypeSystem.propertyDecorator('string')
    public set documentTypeID(val: string) {
        this._documentTypeID = val;
    }

    public get documentTypeID(): string {
        return this._documentTypeID;
    }

    @TypeSystem.propertyDecorator(FileMetadata ? FileMetadata : moduleContext.moduleName + '.' + 'FileMetadata')
    public set fileMetadata(val: FileMetadata) {
        this._fileMetadata = val;
    }

    public get fileMetadata(): FileMetadata {
        return this._fileMetadata;
    }
}