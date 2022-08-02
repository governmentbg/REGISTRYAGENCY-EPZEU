

// Auto Generated Object
import * as moment from 'moment'
import { observable, computed } from 'mobx'
import { TypeSystem, BaseDataModel, BasePagedSearchCriteria } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { ApplicationFormTypes, ApplicationStatuses, RefusalTypes, PassedFrom, ApplicationState } from './Enums'
import { DeedSummary } from './DeedSummary'



@TypeSystem.typeDecorator('ApplicationInfo', moduleContext.moduleName)
export class ApplicationInfo extends BaseDataModel { 

    @observable private _incomingNumberWithCtx: string = null;
    
	/**Входящ номер на заявление с контекстна информация.*/
    @TypeSystem.propertyDecorator('string')
    public set incomingNumberWithCtx(val: string){
        this._incomingNumberWithCtx = val;
    }
    
	/**Входящ номер на заявление с контекстна информация.*/
    public get incomingNumberWithCtx(): string{
        return this._incomingNumberWithCtx;
    }
    
	/**Входящ номер на заявление с контекстна информация.*/ 

    @observable private _incomingNumber: string = null;
    
	/**Входящ номер на заявление.*/
    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string){
        this._incomingNumber = val;
    }
    
	/**Входящ номер на заявление.*/
    public get incomingNumber(): string{
        return this._incomingNumber;
    }
    
	/**Входящ номер на заявление.*/ 

    @observable private _applicationTypeName: string = null;
    
	/**Име на типа на заявлението.*/
    @TypeSystem.propertyDecorator('string')
    public set applicationTypeName(val: string){
        this._applicationTypeName = val;
    }
    
	/**Име на типа на заявлението.*/
    public get applicationTypeName(): string{
        return this._applicationTypeName;
    }
    
	/**Име на типа на заявлението.*/ 

    @observable private _applicationType: ApplicationFormTypes = null;
    
	/**Тип на заявление.*/
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set applicationType(val: ApplicationFormTypes){
        this._applicationType = val;
    }
    
	/**Тип на заявление.*/
    public get applicationType(): ApplicationFormTypes{
        return this._applicationType;
    }
    
	/**Тип на заявление.*/ 

    @observable private _applicationStatus: ApplicationStatuses = null;
    
	/**Статус на заявлението.*/
    @TypeSystem.propertyDecorator(ApplicationStatuses ? ApplicationStatuses : moduleContext.moduleName + '.' + 'ApplicationStatuses')
    public set applicationStatus(val: ApplicationStatuses){
        this._applicationStatus = val;
    }
    
	/**Статус на заявлението.*/
    public get applicationStatus(): ApplicationStatuses{
        return this._applicationStatus;
    }
    
	/**Статус на заявлението.*/ 

    @observable private _passedFrom: PassedFrom = null;
    
	/**Място на подаване на заявлението.*/
    @TypeSystem.propertyDecorator(PassedFrom ? PassedFrom : moduleContext.moduleName + '.' + 'PassedFrom')
    public set passedFrom(val: PassedFrom){
        this._passedFrom = val;
    }
    
	/**Място на подаване на заявлението.*/
    public get passedFrom(): PassedFrom{
        return this._passedFrom;
    }
    
	/**Място на подаване на заявлението.*/ 

    @observable private _applicationState: ApplicationState = null;
    
	/**Статус на пакета*/
    @TypeSystem.propertyDecorator(ApplicationState ? ApplicationState : moduleContext.moduleName + '.' + 'ApplicationState')
    public set applicationState(val: ApplicationState){
        this._applicationState = val;
    }
    
	/**Статус на пакета*/
    public get packageState(): ApplicationState{
        return this._applicationState;
    }
    
	/**Статус на пакета*/ 

    @observable private _officeName: string = null;
    
	/**Име на офиса*/
    @TypeSystem.propertyDecorator('string')
    public set officeName(val: string){
        this._officeName = val;
    }
    
	/**Име на офиса*/
    public get officeName(): string{
        return this._officeName;
    }
    
	/**Име на офиса*/ 
    
    @observable private _entryDate: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set entryDate(val: moment.Moment){
        this._entryDate = val;
    }
    
    public get entryDate(): moment.Moment{
        return this._entryDate;
    } 
    
    @observable private _registrationDate: moment.Moment = null;
    
	/**Дата на входиране на заявление.*/
    @TypeSystem.propertyDecorator('moment')
    public set registrationDate(val: moment.Moment){
        this._registrationDate = val;
    }
    
	/**Дата на входиране на заявление.*/
    public get registrationDate(): moment.Moment{
        return this._registrationDate;
    } 

    @observable private _entryNumber: string = null;
    
	/**Входящ номер на заявлението*/
    @TypeSystem.propertyDecorator('string')
    public set entryNumber(val: string){
        this._entryNumber = val;
    }
    
	/**Входящ номер на заявлението*/
    public get entryNumber(): string{
        return this._entryNumber;
    }
    
	/**Входящ номер на заявлението*/ 

    @observable private _refusalType: RefusalTypes = null;
    
	/**Вид на отказа ако иама отказ*/
    @TypeSystem.propertyDecorator(RefusalTypes ? RefusalTypes : moduleContext.moduleName + '.' + 'RefusalTypes')
    public set refusalType(val: RefusalTypes){
        this._refusalType = val;
    }
    
	/**Вид на отказа ако иама отказ*/
    public get refusalType(): RefusalTypes{
        return this._refusalType;
    }
    
	/**Вид на отказа ако иама отказ*/ 

    @observable private _outgoingNumber: string = null;
    
	/**Номер на изходящ документ*/
    @TypeSystem.propertyDecorator('string')
    public set outgoingNumber(val: string){
        this._outgoingNumber = val;
    }
    
	/**Номер на изходящ документ*/
    public get outgoingNumber(): string{
        return this._outgoingNumber;
    }
    
	/**Номер на изходящ документ*/ 

    @observable private _resultHTML: string = null;
    
	/**HTML резилтат от изпълнението на заявлението.*/
    @TypeSystem.propertyDecorator('string')
    public set resultHTML(val: string){
        this._resultHTML = val;
    }
    
	/**HTML резилтат от изпълнението на заявлението.*/
    public get resultHTML(): string{
        return this._resultHTML;
    }
    
	/**HTML резилтат от изпълнението на заявлението.*/ 

    @observable private _incomingLinkedDeeds: DeedSummary[] = null;
    
	/**Партиди подадени за вписване в заявлението*/
    @TypeSystem.propertyArrayDecorator(DeedSummary ? DeedSummary : moduleContext.moduleName + '.' + 'DeedSummary')
    public set incomingLinkedDeeds(val: DeedSummary[]){
        this._incomingLinkedDeeds = val;
    }
    
	/**Партиди подадени за вписване в заявлението*/
    public get incomingLinkedDeeds(): DeedSummary[]{
        return this._incomingLinkedDeeds;
    }
    
	/**Партиди подадени за вписване в заявлението*/ 

    @observable private _entryDeeds: DeedSummary[] = null;
    
	/**Партиди по които заявлението вписва данни*/
    @TypeSystem.propertyArrayDecorator(DeedSummary ? DeedSummary : moduleContext.moduleName + '.' + 'DeedSummary')
    public set entryDeeds(val: DeedSummary[]){
        this._entryDeeds = val;
    }
    
	/**Партиди по които заявлението вписва данни*/
    public get entryDeeds(): DeedSummary[]{
        return this._entryDeeds;
    }
    
	/**Партиди по които заявлението вписва данни*/ 

    @observable private _hasRequestsForCorrectionForScanning: boolean = null;
    
	/**Дали има активна комуникация за текущата регистрация*/
    @TypeSystem.propertyDecorator('boolean')
    public set hasRequestsForCorrectionForScanning(val: boolean){
        this._hasRequestsForCorrectionForScanning = val;
    }
    
	/**Дали има активна комуникация за текущата регистрация*/
    public get hasRequestsForCorrectionForScanning(): boolean{
        return this._hasRequestsForCorrectionForScanning;
    }
    
	/**Дали има активна комуникация за текущата регистрация*/ 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('ApplicationTransformationsSearchCriteria', moduleContext.moduleName)
export class ApplicationTransformationsSearchCriteria extends BasePagedSearchCriteria { 
    
    @observable private _dateFrom: moment.Moment = null;
    
	/**От дата.*/
    @TypeSystem.propertyDecorator('moment')
    public set dateFrom(val: moment.Moment){
        this._dateFrom = val;
    }
    
	/**От дата.*/
    public get dateFrom(): moment.Moment{
        return this._dateFrom;
    } 
    
    @observable private _dateTo: moment.Moment = null;
    
	/**До дата.*/
    @TypeSystem.propertyDecorator('moment')
    public set dateTo(val: moment.Moment){
        this._dateTo = val;
    }
    
	/**До дата.*/
    public get dateTo(): moment.Moment{
        return this._dateTo;
    } 

    @observable private _companyName: string = null;
    
	/**Фирма/Наименование.*/
    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string){
        this._companyName = val;
    }
    
	/**Фирма/Наименование.*/
    public get companyName(): string{
        return this._companyName;
    }
    
	/**Фирма/Наименование.*/ 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('DocumentsWithoutDeedSearchCriteria', moduleContext.moduleName)
export class DocumentsWithoutDeedSearchCriteria extends BasePagedSearchCriteria { 
    
    @observable private _dateFrom: moment.Moment = null;
    
	/**От дата.*/
    @TypeSystem.propertyDecorator('moment')
    public set dateFrom(val: moment.Moment){
        this._dateFrom = val;
    }
    
	/**От дата.*/
    public get dateFrom(): moment.Moment{
        return this._dateFrom;
    } 
    
    @observable private _dateTo: moment.Moment = null;
    
	/**До дата.*/
    @TypeSystem.propertyDecorator('moment')
    public set dateTo(val: moment.Moment){
        this._dateTo = val;
    }
    
	/**До дата.*/
    public get dateTo(): moment.Moment{
        return this._dateTo;
    } 

    @observable private _companyName: string = null;
    
	/**Фирма/Наименование.*/
    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string){
        this._companyName = val;
    }
    
	/**Фирма/Наименование.*/
    public get companyName(): string{
        return this._companyName;
    }
    
	/**Фирма/Наименование.*/ 

    @observable private _incomingNumber: string = null;
    
	/**Входящ номер.*/
    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string){
        this._incomingNumber = val;
    }
    
	/**Входящ номер.*/
    public get incomingNumber(): string{
        return this._incomingNumber;
    }
    
	/**Входящ номер.*/ 

    @observable private _status: ApplicationStatuses = null;
    
	/**Ресултат.*/
    @TypeSystem.propertyDecorator(ApplicationStatuses ? ApplicationStatuses : moduleContext.moduleName + '.' + 'ApplicationStatuses')
    public set status(val: ApplicationStatuses){
        this._status = val;
    }
    
	/**Ресултат.*/
    public get status(): ApplicationStatuses{
        return this._status;
    }
    
	/**Ресултат.*/ 

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}

@TypeSystem.typeDecorator('Entry', moduleContext.moduleName)
export class Entry extends BaseDataModel { 
    
    @observable private _date: moment.Moment = null;
    
    @TypeSystem.propertyDecorator('moment')
    public set date(val: moment.Moment){
        this._date = val;
    }
    
    public get date(): moment.Moment{
        return this._date;
    } 

    @observable private _uic: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set uic(val: string){
        this._uic = val;
    }
    
    public get uic(): string{
        return this._uic;
    }
     

    @observable private _companyFullName: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set companyFullName(val: string){
        this._companyFullName = val;
    }
    
    public get companyFullName(): string{
        return this._companyFullName;
    }
     

    constructor(obj?: any){
        super(obj)
        
        this.copyFrom(obj);       
    }
}      






