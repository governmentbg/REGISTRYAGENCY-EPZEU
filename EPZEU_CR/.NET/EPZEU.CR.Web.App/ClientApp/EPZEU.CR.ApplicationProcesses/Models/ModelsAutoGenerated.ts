

// Auto Generated Object
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { ApplicationFormTypes } from 'EPZEU.CR.Core'
import { ProcessStates, ProcessStatuses } from 'EPZEU.CR.Domain'



/**Модел на заявление.*/
@TypeSystem.typeDecorator('APApplication', moduleContext.moduleName)
export class APApplication extends BaseDataModel { 

    @observable private _applicationID: number = null;
    
	/**Уникален идентификатор на заявление.*/
    @TypeSystem.propertyDecorator('number')
    public set applicationID(val: number){
        this._applicationID = val;
    }
    
	/**Уникален идентификатор на заявление.*/
    public get applicationID(): number{
        return this._applicationID;
    }
    
	/**Уникален идентификатор на заявление.*/ 

    @observable private _applicationProcessID: number = null;
    
	/**Идентификатор на данни за процеси на заявяване на услуга.*/
    @TypeSystem.propertyDecorator('number')
    public set applicationProcessID(val: number){
        this._applicationProcessID = val;
    }
    
	/**Идентификатор на данни за процеси на заявяване на услуга.*/
    public get applicationProcessID(): number{
        return this._applicationProcessID;
    }
    
	/**Идентификатор на данни за процеси на заявяване на услуга.*/ 

    @observable private _type: ApplicationFormTypes = null;
    
	/**Тип на заявление.*/
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set type(val: ApplicationFormTypes){
        this._type = val;
    }
    
	/**Тип на заявление.*/
    public get type(): ApplicationFormTypes{
        return this._type;
    }
    
	/**Тип на заявление.*/ 

    @observable private _order: number = null;
    
	/**Номер на заявлението.*/
    @TypeSystem.propertyDecorator('number')
    public set order(val: number){
        this._order = val;
    }
    
	/**Номер на заявлението.*/
    public get order(): number{
        return this._order;
    }
    
	/**Номер на заявлението.*/ 

    @observable private _applicationContentID: number = null;
    
	/**Идентификатор на данни за съдържание на пакети (JSON).*/
    @TypeSystem.propertyDecorator('number')
    public set applicationContentID(val: number){
        this._applicationContentID = val;
    }
    
	/**Идентификатор на данни за съдържание на пакети (JSON).*/
    public get applicationContentID(): number{
        return this._applicationContentID;
    }
    
	/**Идентификатор на данни за съдържание на пакети (JSON).*/ 
                
    @observable private _content: any = null;
    
	/**Съдържание.*/
    @TypeSystem.propertyDecorator('any')
    public set content(val: any){
        this._content = val;
    }
    
	/**Съдържание.*/
    public get content(): any{
        return this._content;
    } 
                
    @observable private _additionalData: any = null;
    
	/**Допълнителни данни.*/
    @TypeSystem.propertyDecorator('any')
    public set additionalData(val: any){
        this._additionalData = val;
    }
    
	/**Допълнителни данни.*/
    public get additionalData(): any{
        return this._additionalData;
    } 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Модел на данни за процеси на заявяване на услуга.*/
@TypeSystem.typeDecorator('APApplicationProcess', moduleContext.moduleName)
export class APApplicationProcess extends BaseDataModel { 

    @observable private _applicationProcessID: number = null;
    
	/**Уникален идентификатор на данни за процеси на заявяване на услуга.*/
    @TypeSystem.propertyDecorator('number')
    public set applicationProcessID(val: number){
        this._applicationProcessID = val;
    }
    
	/**Уникален идентификатор на данни за процеси на заявяване на услуга.*/
    public get applicationProcessID(): number{
        return this._applicationProcessID;
    }
    
	/**Уникален идентификатор на данни за процеси на заявяване на услуга.*/ 

    @observable private _uic: string = null;
    
	/**ЕИК.*/
    @TypeSystem.propertyDecorator('string')
    public set uic(val: string){
        this._uic = val;
    }
    
	/**ЕИК.*/
    public get uic(): string{
        return this._uic;
    }
    
	/**ЕИК.*/ 

    @observable private _applicantID: number = null;
    
	/**Идентификатор на заявителя.*/
    @TypeSystem.propertyDecorator('number')
    public set applicantID(val: number){
        this._applicantID = val;
    }
    
	/**Идентификатор на заявителя.*/
    public get applicantID(): number{
        return this._applicantID;
    }
    
	/**Идентификатор на заявителя.*/ 

    @observable private _status: ProcessStatuses = null;
    
	/**Статус на пакета: 1 - in_process; 2 - signing; 3 - signed;.*/
    @TypeSystem.propertyDecorator(ProcessStatuses ? ProcessStatuses : moduleContext.moduleName + '.' + 'ProcessStatuses')
    public set status(val: ProcessStatuses){
        this._status = val;
    }
    
	/**Статус на пакета: 1 - in_process; 2 - signing; 3 - signed;.*/
    public get status(): ProcessStatuses{
        return this._status;
    }
    
	/**Статус на пакета: 1 - in_process; 2 - signing; 3 - signed;.*/ 

    @observable private _mainApplicationID: number = null;
    
	/**Идентификатор на основно заявление.*/
    @TypeSystem.propertyDecorator('number')
    public set mainApplicationID(val: number){
        this._mainApplicationID = val;
    }
    
	/**Идентификатор на основно заявление.*/
    public get mainApplicationID(): number{
        return this._mainApplicationID;
    }
    
	/**Идентификатор на основно заявление.*/ 

    @observable private _mainApplicationType: ApplicationFormTypes = null;
    
	/**Тип на основно заявление.*/
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set mainApplicationType(val: ApplicationFormTypes){
        this._mainApplicationType = val;
    }
    
	/**Тип на основно заявление.*/
    public get mainApplicationType(): ApplicationFormTypes{
        return this._mainApplicationType;
    }
    
	/**Тип на основно заявление.*/ 

    @observable private _signingGuid: string = null;
    
	/**Идентификатор на заявката за подписване в модула за подписване.*/
    @TypeSystem.propertyDecorator('string')
    public set signingGuid(val: string){
        this._signingGuid = val;
    }
    
	/**Идентификатор на заявката за подписване в модула за подписване.*/
    public get signingGuid(): string{
        return this._signingGuid;
    }
    
	/**Идентификатор на заявката за подписване в модула за подписване.*/ 

    @observable private _parentApplicationProcessID: number = null;
    
	/**Уникален идентификатор родителския процес за заявяване на услуга.*/
    @TypeSystem.propertyDecorator('number')
    public set parentApplicationProcessID(val: number){
        this._parentApplicationProcessID = val;
    }
    
	/**Уникален идентификатор родителския процес за заявяване на услуга.*/
    public get parentApplicationProcessID(): number{
        return this._parentApplicationProcessID;
    }
    
	/**Уникален идентификатор родителския процес за заявяване на услуга.*/ 

    @observable private _childApplicationProcesses: APApplicationProcess[] = null;
    
	/**Списък със под процесите по заявяване на услуга.*/
    @TypeSystem.propertyArrayDecorator(APApplicationProcess ? APApplicationProcess : moduleContext.moduleName + '.' + 'APApplicationProcess')
    public set childApplicationProcesses(val: APApplicationProcess[]){
        this._childApplicationProcesses = val;
    }
    
	/**Списък със под процесите по заявяване на услуга.*/
    public get childApplicationProcesses(): APApplicationProcess[]{
        return this._childApplicationProcesses;
    }
    
	/**Списък със под процесите по заявяване на услуга.*/ 

    @observable private _applications: APApplication[] = null;
    
	/**Списък със заявления.*/
    @TypeSystem.propertyArrayDecorator(APApplication ? APApplication : moduleContext.moduleName + '.' + 'APApplication')
    public set applications(val: APApplication[]){
        this._applications = val;
    }
    
	/**Списък със заявления.*/
    public get applications(): APApplication[]{
        return this._applications;
    }
    
	/**Списък със заявления.*/ 

    @observable private _hasChangeInApplicationsInitialData: boolean = null;
    
	/**Флаг указващ, дали има промяна в първоначалните данни на заявлението.*/
    @TypeSystem.propertyDecorator('boolean')
    public set hasChangeInApplicationsInitialData(val: boolean){
        this._hasChangeInApplicationsInitialData = val;
    }
    
	/**Флаг указващ, дали има промяна в първоначалните данни на заявлението.*/
    public get hasChangeInApplicationsInitialData(): boolean{
        return this._hasChangeInApplicationsInitialData;
    }
    
	/**Флаг указващ, дали има промяна в първоначалните данни на заявлението.*/ 

    @observable private _hasChangesInApplicationsNomenclature: boolean = null;
    
	/**Фла указващ, дали има промяна в номенклатурите след създаване на черновата.*/
    @TypeSystem.propertyDecorator('boolean')
    public set hasChangesInApplicationsNomenclature(val: boolean){
        this._hasChangesInApplicationsNomenclature = val;
    }
    
	/**Фла указващ, дали има промяна в номенклатурите след създаване на черновата.*/
    public get hasChangesInApplicationsNomenclature(): boolean{
        return this._hasChangesInApplicationsNomenclature;
    }
    
	/**Фла указващ, дали има промяна в номенклатурите след създаване на черновата.*/ 

    @observable private _errorMessage: string = null;
    
	/**Съобщение за грешка при обработката на процеса*/
    @TypeSystem.propertyDecorator('string')
    public set errorMessage(val: string){
        this._errorMessage = val;
    }
    
	/**Съобщение за грешка при обработката на процеса*/
    public get errorMessage(): string{
        return this._errorMessage;
    }
    
	/**Съобщение за грешка при обработката на процеса*/ 

    @observable private _incomingNumber: string = null;
    
	/**Входящ номер на заявлението в CR*/
    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string){
        this._incomingNumber = val;
    }
    
	/**Входящ номер на заявлението в CR*/
    public get incomingNumber(): string{
        return this._incomingNumber;
    }
    
	/**Входящ номер на заявлението в CR*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

/**Заявка за създаване на заявление*/
@TypeSystem.typeDecorator('APApplicationRequest', moduleContext.moduleName)
export class APApplicationRequest extends BaseDataModel { 
                
    @observable private _additionalData: any = null;
    
	/**Допълнителни данни*/
    @TypeSystem.propertyDecorator('any')
    public set additionalData(val: any){
        this._additionalData = val;
    }
    
	/**Допълнителни данни*/
    public get additionalData(): any{
        return this._additionalData;
    } 

    @observable private _applicationType: ApplicationFormTypes = null;
    
	/**Тип на заявлението*/
    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set applicationType(val: ApplicationFormTypes){
        this._applicationType = val;
    }
    
	/**Тип на заявлението*/
    public get applicationType(): ApplicationFormTypes{
        return this._applicationType;
    }
    
	/**Тип на заявлението*/ 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}



