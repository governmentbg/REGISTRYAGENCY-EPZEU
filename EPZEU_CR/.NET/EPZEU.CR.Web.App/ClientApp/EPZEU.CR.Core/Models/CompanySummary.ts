import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('CompanySummary', moduleContext.moduleName)
export class CompanySummary extends BaseDataModel {

    @observable private _entryNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set entryNumber(val: string) {
        this._entryNumber = val;
    }

    public get entryNumber(): string {
        return this._entryNumber;
    }

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    @observable private _incomingID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set incomingID(val: number) {
        this._incomingID = val;
    }

    public get incomingID(): number {
        return this._incomingID;
    }

    @observable private _incomingTypeID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set incomingTypeID(val: number) {
        this._incomingTypeID = val;
    }

    public get incomingTypeID(): number {
        return this._incomingTypeID;
    }
    
    @observable private _companyName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyName = val;
    }

    public get companyName(): string {
        return this._companyName;
    }

    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @observable private _deedGuid: string = null;

    @TypeSystem.propertyDecorator('string')
    public set deedGuid(val: string) {
        this._deedGuid = val;
    }

    public get deedGuid(): string {
        return this._deedGuid;
    }

    @observable private _outgoingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set outgoingNumber(val: string) {
        this._outgoingNumber = val;
    }

    public get outgoingNumber(): string {
        return this._outgoingNumber;
    }

    @observable private _hasRefusalByIncNum: string = null;

    @TypeSystem.propertyDecorator('string')
    public set hasRefusalByIncNum(val: string) {
        this._hasRefusalByIncNum = val;
    }

    public get hasRefusalByIncNum(): string {
        return this._hasRefusalByIncNum;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}