import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { Constants } from 'EPZEU.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('Address', moduleContext.moduleName)
export class Address extends BaseDataModel {

    @observable private _countryID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set countryID(val: number) {
        this._countryID = val;
    }

    public get countryID(): number {
        return this._countryID;
    }


    @observable private _countryCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set countryCode(val: string) {
        this._countryCode = val;
    }

    public get countryCode(): string {
        return this._countryCode;
    }


    @observable private _country: string = null;

    @TypeSystem.propertyDecorator('string')
    public set country(val: string) {
        this._country = val;
    }

    public get country(): string {
        return this._country;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isForeign(val: boolean) {
    }

    public get isForeign(): boolean {
        return this.countryCode == undefined || this.countryCode == null || this.countryCode != Constants.BG_COUNTRY_CODE;
    }

    @observable private _districtID: number = null;

    /**област*/
    @TypeSystem.propertyDecorator('number')
    public set districtID(val: number) {
        this._districtID = val;
    }

    /**област*/
    public get districtID(): number {
        return this._districtID;
    }

    /**област*/

    @observable private _districtEkatte: string = null;

    @TypeSystem.propertyDecorator('string')
    public set districtEkatte(val: string) {
        this._districtEkatte = val;
    }

    public get districtEkatte(): string {
        return this._districtEkatte;
    }


    @observable private _district: string = null;

    @TypeSystem.propertyDecorator('string')
    public set district(val: string) {
        this._district = val;
    }

    public get district(): string {
        return this._district;
    }


    @observable private _municipalityid: number = null;

    /**община*/
    @TypeSystem.propertyDecorator('number')
    public set municipalityid(val: number) {
        this._municipalityid = val;
    }

    /**община*/
    public get municipalityid(): number {
        return this._municipalityid;
    }

    /**община*/

    @observable private _municipalityEkatte: string = null;

    @TypeSystem.propertyDecorator('string')
    public set municipalityEkatte(val: string) {
        this._municipalityEkatte = val;
    }

    public get municipalityEkatte(): string {
        return this._municipalityEkatte;
    }


    @observable private _municipality: string = null;

    @TypeSystem.propertyDecorator('string')
    public set municipality(val: string) {
        this._municipality = val;
    }

    public get municipality(): string {
        return this._municipality;
    }


    @observable private _settlementID: number = null;

    /**населено място*/
    @TypeSystem.propertyDecorator('number')
    public set settlementID(val: number) {
        this._settlementID = val;
    }

    /**населено място*/
    public get settlementID(): number {
        return this._settlementID;
    }

    /**населено място*/

    @observable private _settlementEKATTE: string = null;

    @TypeSystem.propertyDecorator('string')
    public set settlementEKATTE(val: string) {
        this._settlementEKATTE = val;
    }

    public get settlementEKATTE(): string {
        return this._settlementEKATTE;
    }


    @observable private _settlement: string = null;

    @TypeSystem.propertyDecorator('string')
    public set settlement(val: string) {
        this._settlement = val;
    }

    public get settlement(): string {
        return this._settlement;
    }


    @observable private _areaID: number = null;

    /**район*/
    @TypeSystem.propertyDecorator('number')
    public set areaID(val: number) {
        this._areaID = val;
    }

    /**район*/
    public get areaID(): number {
        return this._areaID;
    }

    /**район*/

    @observable private _area: string = null;

    @TypeSystem.propertyDecorator('string')
    public set area(val: string) {
        this._area = val;
    }

    public get area(): string {
        return this._area;
    }


    @observable private _areaEkatte: string = null;

    @TypeSystem.propertyDecorator('string')
    public set areaEkatte(val: string) {
        this._areaEkatte = val;
    }

    public get areaEkatte(): string {
        return this._areaEkatte;
    }


    @observable private _postCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set postCode(val: string) {
        this._postCode = val;
    }

    public get postCode(): string {
        return this._postCode;
    }


    @observable private _foreignPlace: string = null;

    @TypeSystem.propertyDecorator('string')
    public set foreignPlace(val: string) {
        this._foreignPlace = val;
    }

    public get foreignPlace(): string {
        return this._foreignPlace;
    }


    @observable private _housingEstate: string = null;

    /**квартал*/
    @TypeSystem.propertyDecorator('string')
    public set housingEstate(val: string) {
        this._housingEstate = val;
    }

    /**квартал*/
    public get housingEstate(): string {
        return this._housingEstate;
    }

    /**квартал*/

    @observable private _street: string = null;

    @TypeSystem.propertyDecorator('string')
    public set street(val: string) {
        this._street = val;
    }

    public get street(): string {
        return this._street;
    }


    @observable private _streetNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set streetNumber(val: string) {
        this._streetNumber = val;
    }

    public get streetNumber(): string {
        return this._streetNumber;
    }


    @observable private _block: string = null;

    @TypeSystem.propertyDecorator('string')
    public set block(val: string) {
        this._block = val;
    }

    public get block(): string {
        return this._block;
    }


    @observable private _entrance: string = null;

    @TypeSystem.propertyDecorator('string')
    public set entrance(val: string) {
        this._entrance = val;
    }

    public get entrance(): string {
        return this._entrance;
    }


    @observable private _floor: string = null;

    @TypeSystem.propertyDecorator('string')
    public set floor(val: string) {
        this._floor = val;
    }

    public get floor(): string {
        return this._floor;
    }


    @observable private _apartment: string = null;

    @TypeSystem.propertyDecorator('string')
    public set apartment(val: string) {
        this._apartment = val;
    }

    public get apartment(): string {
        return this._apartment;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}