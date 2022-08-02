import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

export enum Registers {
    /**ТРРЮЛНЦ*/
    CR = 1,
    /**ИР*/
    PR = 2
}
TypeSystem.registerEnumInfo(Registers, 'Registers', moduleContext.moduleName)

@TypeSystem.typeDecorator('ApplicationDocumentType', moduleContext.moduleName)
export class ApplicationDocumentType extends BaseDataModel {

    @observable private _applicationTypeID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set applicationTypeID(val: string) {
        this._applicationTypeID = val;
    }

    public get applicationTypeID(): string {
        return this._applicationTypeID;
    }


    @observable private _documentTypeID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set documentTypeID(val: string) {
        this._documentTypeID = val;
    }

    public get documentTypeID(): string {
        return this._documentTypeID;
    }

    @observable private _documentName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set documentName(val: string) {
        this._documentName = val;
    }

    public get documentName(): string {
        return this._documentName;
    }

    @observable private _register: Registers = null;

    @TypeSystem.propertyDecorator(Registers ? Registers : moduleContext.moduleName + '.' + 'Registers')
    public set register(val: Registers) {
        this._register = val;
    }

    public get register(): Registers {
        return this._register;
    }


    @observable private _isScannedDocument: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isScannedDocument(val: boolean) {
        this._isScannedDocument = val;
    }

    public get isScannedDocument(): boolean {
        return this._isScannedDocument;
    }


    @observable private _isNew: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isNew(val: boolean) {
        this._isNew = val;
    }

    public get isNew(): boolean {
        return this._isNew;
    }


    @observable private _isForChange: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isForChange(val: boolean) {
        this._isForChange = val;
    }

    public get isForChange(): boolean {
        return this._isForChange;
    }


    @observable private _isForPreregistration: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isForPreregistration(val: boolean) {
        this._isForPreregistration = val;
    }

    public get isForPreregistration(): boolean {
        return this._isForPreregistration;
    }


    @observable private _isPublicVisible: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isPublicVisible(val: boolean) {
        this._isPublicVisible = val;
    }

    public get isPublicVisible(): boolean {
        return this._isPublicVisible;
    }


    @observable private _documentType: DocumentType = null;

    @TypeSystem.propertyDecorator(DocumentType ? DocumentType : moduleContext.moduleName + '.' + 'DocumentType')
    public set documentType(val: DocumentType) {
        this._documentType = val;
    }

    public get documentType(): DocumentType {
        return this._documentType;
    }

    @observable private _minOccurs: number = null;

    @TypeSystem.propertyDecorator('number')
    public set minOccurs(val: number) {
        this._minOccurs = val;
    }

    public get minOccurs(): number {
        return this._minOccurs;
    }


    @observable private _maxOccurs: number = null;

    @TypeSystem.propertyDecorator('number')
    public set maxOccurs(val: number) {
        this._maxOccurs = val;
    }

    public get maxOccurs(): number {
        return this._maxOccurs;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('DocumentType', moduleContext.moduleName)
export class DocumentType extends BaseDataModel {

    @observable private _documentTypeID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set documentTypeID(val: string) {
        this._documentTypeID = val;
    }

    public get documentTypeID(): string {
        return this._documentTypeID;
    }
    
    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }


    @observable private _parentID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set parentID(val: string) {
        this._parentID = val;
    }

    public get parentID(): string {
        return this._parentID;
    }



    @observable private _isRefusalAttachable: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isRefusalAttachable(val: boolean) {
        this._isRefusalAttachable = val;
    }

    public get isRefusalAttachable(): boolean {
        return this._isRefusalAttachable;
    }




    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('ReleaseReasons', moduleContext.moduleName)
export class ReleaseReasons extends BaseDataModel {

    @observable private _reasonID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set reasonID(val: number) {
        this._reasonID = val;
    }

    public get reasonID(): number {
        return this._reasonID;
    }

    @observable private _description: string = null;

    @TypeSystem.propertyDecorator('string')
    public set description(val: string) {
        this._description = val;
    }

    public get description(): string {
        return this._description;
    }

    @observable private _expertTypeID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set expertTypeID(val: number) {
        this._expertTypeID = val;
    }

    public get expertTypeID(): number {
        return this._expertTypeID;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}