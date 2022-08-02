import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { Registers } from './ApplicationDocumentType';
import { ApplicationType } from './ApplicationType'
import { Service } from './Service';


/**Типове страници.*/
export enum PageTypes {
    /**страници с услуги.*/
    Service = 1,

    /**страница със заявления/искания/удостоверения.*/
    Application = 2,

    /**страница с образци на документи.*/
    Pattern = 3,

    /**страница с нормативната уредба.*/
    Legislation = 4
}
TypeSystem.registerEnumInfo(PageTypes, 'PageTypes', moduleContext.moduleName)

/**Страница*/
@TypeSystem.typeDecorator('Page', moduleContext.moduleName)
export class Page extends BaseDataModel {

    @observable private _pageID: number = null;

    /**Идентификатор на страница.*/
    @TypeSystem.propertyDecorator('number')
    public set pageID(val: number) {
        this._pageID = val;
    }

    /**Идентификатор на страница.*/
    public get pageID(): number {
        return this._pageID;
    }

    /**Идентификатор на страница.*/

    @observable private _registerID: Registers = null;

    @TypeSystem.propertyDecorator(Registers ? Registers : moduleContext.moduleName + '.' + 'Registers')
    public set registerID(val: Registers) {
        this._registerID = val;
    }

    public get registerID(): Registers {
        return this._registerID;
    }

    /**Идентификатор на регистър.*/

    @observable private _title: string = null;

    /**Заглавие.*/
    @TypeSystem.propertyDecorator('string')
    public set title(val: string) {
        this._title = val;
    }

    /**Заглавие.*/
    public get title(): string {
        return this._title;
    }

    /**Заглавие.*/

    @observable private _content: string = null;

    /**Съдържание.*/
    @TypeSystem.propertyDecorator('string')
    public set content(val: string) {
        this._content = val;
    }

    /**Съдържание.*/
    public get content(): string {
        return this._content;
    }

    /**Съдържание.*/

    /**Тип.*/
    @observable private _type: PageTypes = null;

    /**Тип.*/
    @TypeSystem.propertyDecorator(PageTypes ? PageTypes : moduleContext.moduleName + '.' + 'PageTypes')
    public set type(val: PageTypes) {
        this._type = val;
    }

    /**Тип.*/
    public get type(): PageTypes {
        return this._type;
    }

    @observable private _applicationID: number = null;

    /**Идентификатор на заявление.*/
    @TypeSystem.propertyDecorator('number')
    public set applicationID(val: number) {
        this._applicationID = val;
    }

    /**Идентификатор на заявление.*/
    public get applicationID(): number {
        return this._applicationID;
    }

    /**Идентификатор на заявление.*/

    @observable private _serviceID: number = null;

    /**Идентификатор на услуга.*/
    @TypeSystem.propertyDecorator('number')
    public set serviceID(val: number) {
        this._serviceID = val;
    }

    /**Идентификатор на услуга.*/
    public get serviceID(): number {
        return this._serviceID;
    }

    /**Идентификатор на услуга.*/

    @observable private _parentID: number = null;

    /**Идентификатор на родителски елемент.*/
    @TypeSystem.propertyDecorator('number')
    public set parentID(val: number) {
        this._parentID = val;
    }

    /**Идентификатор на родителски елемент.*/
    public get parentID(): number {
        return this._parentID;
    }

    /**Идентификатор на родителски елемент.*/

    @observable private _orderNum: number = null;

    /**Пореден номер.*/
    @TypeSystem.propertyDecorator('number')
    public set orderNum(val: number) {
        this._orderNum = val;
    }

    /**Пореден номер.*/
    public get orderNum(): number {
        return this._orderNum;
    }

    /**Пореден номер.*/

    @observable private _isGroup: boolean = null;

    /**Флаг указващ дали е група.*/
    @TypeSystem.propertyDecorator('boolean')
    public set isGroup(val: boolean) {
        this._isGroup = val;
    }

    /**Флаг указващ дали е група.*/
    public get isGroup(): boolean {
        return this._isGroup;
    }

    /**Флаг указващ дали е група.*/

    /**Тип на заявление.*/

    @observable private _applicationType: ApplicationType = null;

    @TypeSystem.propertyDecorator(ApplicationType ? ApplicationType : moduleContext.moduleName + '.' + 'ApplicationType')
    public set applicationType(val: ApplicationType) {
        this._applicationType = val;
    }

    public get applicationType(): ApplicationType {
        return this._applicationType;
    }

    /**Услуга.*/

    @observable private _service: Service = null;

    @TypeSystem.propertyDecorator(Service ? Service : moduleContext.moduleName + '.' + 'Service')
    public set service(val: Service) {
        this._service = val;
    }

    public get service(): Service {
        return this._service;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

