import { BaseDataModel, TypeSystem, ObjectHelper } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('AttachedDocument', moduleContext.moduleName)
export class AttachedDocument extends BaseDataModel {

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
        this._description = ObjectHelper.isStringNullOrEmpty(val) //Ограничението в базата е 2000, но се слага по-малко защото на места се ползва като име на файл и към него се добавя . + разширение.
            ? val
            : val.length > 1995
                ? val.substr(0, 1995)
                : val;
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

    @observable private _applicationDocumentID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set applicationDocumentID(val: number) {
        this._applicationDocumentID = val;
    }

    public get applicationDocumentID(): number {
        return this._applicationDocumentID;
    }

    @observable private _htmlTemplateContent: string = null;

    @TypeSystem.propertyDecorator('string')
    public set htmlTemplateContent(val: string) {
        this._htmlTemplateContent = val;
    }

    public get htmlTemplateContent(): string {
        return this._htmlTemplateContent;
    }

    @observable private _signingGuid: string = null;

    @TypeSystem.propertyDecorator('string')
    public set signingGuid(val: string) {
        this._signingGuid = val;
    }

    public get signingGuid(): string {
        return this._signingGuid;
    }

    @observable private _isActWithErasedPersonalData: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isActWithErasedPersonalData(val: boolean) {
        this._isActWithErasedPersonalData = val;
    }

    public get isActWithErasedPersonalData(): boolean {
        return this._isActWithErasedPersonalData;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}