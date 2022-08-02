import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('Country', moduleContext.moduleName)
export class Country extends BaseDataModel {

    @observable private _id: number = 0;
    @observable private _code_ISO3166: number = null;
    @observable private _code: string = null;
    @observable private _name: string = null;
    @observable private _isEUCountry: boolean = null;
    @observable private _brisCountryCode: string = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('number')
    public set id(val: number) {
        this._id = val;
    }

    public get id(): number {
        return this._id;
    }

    @TypeSystem.propertyDecorator('string')
    public set code(val: string) {
        this._code = val;
    }

    public get code(): string {
        return this._code;
    }

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @TypeSystem.propertyDecorator('string')
    public set brisCountryCode(val: string) {
        this._brisCountryCode = val;
    }

    public get brisCountryCode(): string {
        return this._brisCountryCode;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isEUCountry(val: boolean) {
        this._isEUCountry = val;
    }

    public get isEUCountry(): boolean {
        return this._isEUCountry;
    }

    @TypeSystem.propertyDecorator('number')
    public set code_ISO3166(val: number) {
        this._code_ISO3166 = val;
    }

    public get code_ISO3166(): number {
        return this._code_ISO3166;
    }
}

@TypeSystem.typeDecorator('Ekatte', moduleContext.moduleName)
export class Ekatte extends BaseDataModel { 

    @observable private _id: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set id(val: number){
        this._id = val;
    }
    
    public get id(): number{
        return this._id;
    }
     

    @observable private _ekatteCode: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set ekatteCode(val: string){
        this._ekatteCode = val;
    }
    
    public get ekatteCode(): string{
        return this._ekatteCode;
    }
     

    @observable private _name: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set name(val: string){
        this._name = val;
    }
    
    public get name(): string{
        return this._name;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('District', moduleContext.moduleName)
export class District extends Ekatte { 

    @observable private _municipalities: Municipality[] = null;
    
    @TypeSystem.propertyArrayDecorator(Municipality ? Municipality : moduleContext.moduleName + '.' + 'Municipality')
    public set municipalities(val: Municipality[]){
        this._municipalities = val;
    }
    
    public get municipalities(): Municipality[]{
        return this._municipalities;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Municipality', moduleContext.moduleName)
export class Municipality extends Ekatte { 

    @observable private _districtID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set districtID(val: number){
        this._districtID = val;
    }
    
    public get districtID(): number{
        return this._districtID;
    }
     
    @observable private _settlements: Settlement[] = null;
    
    @TypeSystem.propertyArrayDecorator(Settlement ? Settlement : moduleContext.moduleName + '.' + 'Settlement')
    public set settlements(val: Settlement[]){
        this._settlements = val;
    }
    
    public get settlements(): Settlement[]{
        return this._settlements;
    }

    @observable private _district: District = null;

    @TypeSystem.propertyDecorator(District ? District : moduleContext.moduleName + '.' + 'District')
    public set district(val: District) {
        this._district = val;
    }

    public get district(): District {
        return this._district;
    }

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Settlement', moduleContext.moduleName)
export class Settlement extends Ekatte { 

    @observable private _municipalityID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set municipalityID(val: number){
        this._municipalityID = val;
    }
    
    public get municipalityID(): number{
        return this._municipalityID;
    }

    @observable private _areas: Area[] = null;
    
    @TypeSystem.propertyArrayDecorator(Area ? Area : moduleContext.moduleName + '.' + 'Area')
    public set areas(val: Area[]){
        this._areas = val;
    }
    
    public get areas(): Area[]{
        return this._areas;
    }

    @observable private _municipality: Municipality = null;

    @TypeSystem.propertyDecorator(Municipality ? Municipality : moduleContext.moduleName + '.' + 'Municipality')
    public set municipality(val: Municipality) {
        this._municipality = val;
    }

    public get municipality(): Municipality {
        return this._municipality;
    }

    @observable private _settlementType: string = null;

    @TypeSystem.propertyDecorator('string')
    public set settlementType(val: string) {
        this._settlementType = val;
    }

    public get settlementType(): string {
        return this._settlementType;
    }

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Area', moduleContext.moduleName)
export class Area extends Ekatte { 

    @observable private _settlementID: number = null;
    
    @TypeSystem.propertyDecorator('number')
    public set settlementID(val: number){
        this._settlementID = val;
    }
    
    public get settlementID(): number{
        return this._settlementID;
    }

    @observable private _settlement: Settlement = null;

    @TypeSystem.propertyDecorator(Settlement ? Settlement : moduleContext.moduleName + '.' + 'Settlement')
    public set settlement(val: Settlement) {
        this._settlement = val;
    }

    public get settlement(): Settlement {
        return this._settlement;
    }

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}