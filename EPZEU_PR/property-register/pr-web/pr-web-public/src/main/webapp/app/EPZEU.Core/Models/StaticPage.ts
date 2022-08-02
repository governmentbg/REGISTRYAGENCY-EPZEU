import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

/**Модули*/
export enum Modules {

    // EPZEU.
    EPZEU = 1,

    // EPZEU Търговски регистър.
    EPZEU_CR = 2,

    // EPZEU Имотен регистър.
    EPZEU_PR = 3
}
TypeSystem.registerEnumInfo(Modules, 'Modules', moduleContext.moduleName)

/**Статична страница*/
@TypeSystem.typeDecorator('StaticPage', moduleContext.moduleName)
export class StaticPage extends BaseDataModel {

    @observable private _pageKey: string = null;

    /**Ключ на страница.*/
    @TypeSystem.propertyDecorator('string')
    public set pageKey(val: string) {
        this._pageKey = val;
    }

    /**Ключ на страница.*/
    public get pageKey(): string {
        return this._pageKey;
    }

    /**Ключ на страница.*/

    @observable private _moduleID: Modules = null;

    /**Идентификатор на модул.*/
    @TypeSystem.propertyDecorator(Modules ? Modules : moduleContext.moduleName + '.' + 'Modules')
    public set moduleID(val: Modules) {
        this._moduleID = val;
    }
    /**Идентификатор на модул.*/
    public get moduleID(): Modules {
        return this._moduleID;
    }

    /**Идентификатор на модул.*/

    @observable private _labelKey: string = null;

    /**Ключ на етикет.*/
    @TypeSystem.propertyDecorator('string')
    public set labelKey(val: string) {
        this._labelKey = val;
    }

    /**Ключ на етикет.*/
    public get labelKey(): string {
        return this._labelKey;
    }

    /**Ключ на етикет.*/

    @observable private _url: string = null;

    /**URL.*/
    @TypeSystem.propertyDecorator('string')
    public set url(val: string) {
        this._url = val;
    }

    /**URL.*/
    public get url(): string {
        return this._url;
    }

    /**URL.*/

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

