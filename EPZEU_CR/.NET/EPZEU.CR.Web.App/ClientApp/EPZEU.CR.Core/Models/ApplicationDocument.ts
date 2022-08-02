import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from "Cnsys.Core";
import { moduleContext } from '../ModuleContext'
import { ApplicationFormTypes } from "EPZEU.CR.Core";

@TypeSystem.typeDecorator('FileMetadata', moduleContext.moduleName)
export class FileMetadata extends BaseDataModel {

    @observable private _guid: string = null;

    @TypeSystem.propertyDecorator('string')
    public set guid(val: string) {
        this._guid = val;
    }

    public get guid(): string {
        return this._guid;
    }


    @observable private _fileName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set fileName(val: string) {
        this._fileName = val;
    }

    public get fileName(): string {
        return this._fileName;
    }


    @observable private _contentType: string = null;

    @TypeSystem.propertyDecorator('string')
    public set contentType(val: string) {
        this._contentType = val;
    }

    public get contentType(): string {
        return this._contentType;
    }


    @observable private _size: number = null;

    @TypeSystem.propertyDecorator('number')
    public set size(val: number) {
        this._size = val;
    }

    public get size(): number {
        return this._size;
    }


    @observable private _hashAlgorithm: string = null;

    @TypeSystem.propertyDecorator('string')
    public set hashAlgorithm(val: string) {
        this._hashAlgorithm = val;
    }

    public get hashAlgorithm(): string {
        return this._hashAlgorithm;
    }


    @observable private _hash: any = null;

    @TypeSystem.propertyDecorator('any')
    public set hash(val: any) {
        this._hash = val;
    }

    public get hash(): any {
        return this._hash;
    }


    @observable private _numberOfPages: number = null;

    @TypeSystem.propertyDecorator('number')
    public set numberOfPages(val: number) {
        this._numberOfPages = val;
    }

    public get numberOfPages(): number {
        return this._numberOfPages;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ApplicationDocument', moduleContext.moduleName)
export class ApplicationDocument extends BaseDataModel {

    @observable private _guidWithCtx: string = null;

    @TypeSystem.propertyDecorator('string')
    public set guidWithCtx(val: string) {
        this._guidWithCtx = val;
    }

    public get guidWithCtx(): string {
        return this._guidWithCtx;
    }

    @observable private _guid: string = null;

    @TypeSystem.propertyDecorator('string')
    public set guid(val: string) {
        this._guid = val;
    }

    public get guid(): string {
        return this._guid;
    }


    @observable private _documentTypeID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set documentTypeID(val: string) {
        this._documentTypeID = val;
    }

    public get documentTypeID(): string {
        return this._documentTypeID;
    }


    @observable private _isOriginal: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isOriginal(val: boolean) {
        this._isOriginal = val;
    }

    public get isOriginal(): boolean {
        return this._isOriginal;
    }


    @observable private _description: string = null;

    @TypeSystem.propertyDecorator('string')
    public set description(val: string) {
        this._description = val;
    }

    public get description(): string {
        return this._description;
    }


    @observable private _reusedIncomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set reusedIncomingNumber(val: string) {
        this._reusedIncomingNumber = val;
    }

    public get reusedIncomingNumber(): string {
        return this._reusedIncomingNumber;
    }


    @observable private _fileMetadata: FileMetadata = null;

    @TypeSystem.propertyDecorator(FileMetadata ? FileMetadata : moduleContext.moduleName + '.' + 'FileMetadata')
    public set fileMetadata(val: FileMetadata) {
        this._fileMetadata = val;
    }

    public get fileMetadata(): FileMetadata {
        return this._fileMetadata;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ApplicationDocumentInfo', moduleContext.moduleName)
export class ApplicationDocumentInfo extends ApplicationDocument {

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }


    @observable private _originalIncomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set originalIncomingNumber(val: string) {
        this._originalIncomingNumber = val;
    }

    public get originalIncomingNumber(): string {
        return this._originalIncomingNumber;
    }


    @observable private _isSigned: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isSigned(val: boolean) {
        this._isSigned = val;
    }

    public get isSigned(): boolean {
        return this._isSigned;
    }


    @observable private _applicationType: ApplicationFormTypes = null;

    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set applicationType(val: ApplicationFormTypes) {
        this._applicationType = val;
    }

    public get applicationType(): ApplicationFormTypes {
        return this._applicationType;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}