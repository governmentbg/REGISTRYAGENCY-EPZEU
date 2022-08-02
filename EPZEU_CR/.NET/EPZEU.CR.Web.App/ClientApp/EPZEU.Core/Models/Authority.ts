import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'


@TypeSystem.typeDecorator('Authority', moduleContext.moduleName)
export class Authority extends BaseDataModel {

    @observable private _authorityID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set authorityID(val: number) {
        this._authorityID = val;
    }

    public get authorityID(): number {
        return this._authorityID;
    }


    @observable private _authorityName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set authorityName(val: string) {
        this._authorityName = val;
    }

    public get authorityName(): string {
        return this._authorityName;
    }


    @observable private _authorityType: number = null;

    @TypeSystem.propertyDecorator('number')
    public set authorityType(val: number) {
        this._authorityType = val;
    }

    public get authorityType(): number {
        return this._authorityType;
    }


    @observable private _actionID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set actionID(val: number) {
        this._actionID = val;
    }

    public get actionID(): number {
        return this._actionID;
    }


    @observable private _authoritySybtype: number = null;

    @TypeSystem.propertyDecorator('number')
    public set authoritySybtype(val: number) {
        this._authoritySybtype = val;
    }

    public get authoritySybtype(): number {
        return this._authoritySybtype;
    }


    @observable private _bankruptcyCourt: string = null;

    @TypeSystem.propertyDecorator('string')
    public set bankruptcyCourt(val: string) {
        this._bankruptcyCourt = val;
    }

    public get bankruptcyCourt(): string {
        return this._bankruptcyCourt;
    }


    @observable private _delfiID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set delfiID(val: number) {
        this._delfiID = val;
    }

    public get delfiID(): number {
        return this._delfiID;
    }


    @observable private _regionID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set regionID(val: number) {
        this._regionID = val;
    }

    public get regionID(): number {
        return this._regionID;
    }


    @observable private _firmCourt: string = null;

    @TypeSystem.propertyDecorator('string')
    public set firmCourt(val: string) {
        this._firmCourt = val;
    }

    public get firmCourt(): string {
        return this._firmCourt;
    }


    @observable private _authorityGUID: string = null;

    @TypeSystem.propertyDecorator('string')
    public set authorityGUID(val: string) {
        this._authorityGUID = val;
    }

    public get authorityGUID(): string {
        return this._authorityGUID;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}