import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('AssembleSignatureWithDocumentRequest', moduleContext.moduleName)
export class AssembleSignatureWithDocumentRequest extends BaseDataModel {
    @observable private _base64SigningCert: string = null;
    @observable private _base64DocSignature: string = null;
    @observable private _hashTime: number = null;
    @observable private _signerID: number = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set base64SigningCert(val: string) {
        this._base64SigningCert = val;
    }

    public get base64SigningCert(): string {
        return this._base64SigningCert;
    }

    @TypeSystem.propertyDecorator('string')
    public set base64DocSignature(val: string) {
        this._base64DocSignature = val;
    }

    public get base64DocSignature(): string {
        return this._base64DocSignature;
    }

    @TypeSystem.propertyDecorator('number')
    public set hashTime(val: number) {
        this._hashTime = val;
    }

    public get hashTime(): number {
        return this._hashTime;
    }

    @TypeSystem.propertyDecorator('number')
    public set signerID(val: number) {
        this._signerID = val;
    }

    public get signerID(): number {
        return this._signerID;
    }
}