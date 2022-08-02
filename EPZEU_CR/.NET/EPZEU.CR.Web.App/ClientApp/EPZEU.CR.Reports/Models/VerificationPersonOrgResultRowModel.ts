﻿import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { SubjectInFieldItem } from './ModelsAutoGenerated';

@TypeSystem.typeDecorator('VerificationPersonOrgResultRowModel', moduleContext.moduleName)
export class VerificationPersonOrgResultRowModel extends BaseDataModel {
    @observable private _isPhysical: boolean;
    @observable private _name: string;
    @observable private _ident: string;
    @observable private _includeHistory: boolean;
    @observable private _isExpand: boolean;
    @observable private _subData: SubjectInFieldItem[] = null;
    @observable private _isClicked: boolean;
    @observable private _isSubDataLoaded: boolean;
    @observable private _errorOnSubDataLoading: boolean;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isPhysical(val: boolean) {
        this._isPhysical = val;
    }

    public get isPhysical(): boolean {
        return this._isPhysical;
    }

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @TypeSystem.propertyDecorator('string')
    public set ident(val: string) {
        this._ident = val;
    }

    public get ident(): string {
        return this._ident;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set includeHistory(val: boolean) {
        this._includeHistory = val;
    }

    public get includeHistory(): boolean {
        return this._includeHistory;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isExpand(val: boolean) {
        this._isExpand = val;
    }

    public get isExpand(): boolean {
        return this._isExpand;
    }

    @TypeSystem.propertyArrayDecorator(SubjectInFieldItem ? SubjectInFieldItem : moduleContext.moduleName + '.' + 'SubjectInFieldItem')
    public set subData(val: SubjectInFieldItem[]) {
        this._subData = val;
    }

    public get subData(): SubjectInFieldItem[] {
        return this._subData;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isClicked(val: boolean) {
        this._isClicked = val;
    }

    public get isClicked(): boolean {
        return this._isClicked;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isSubDataLoaded(val: boolean) {
        this._isSubDataLoaded = val;
    }

    public get isSubDataLoaded(): boolean {
        return this._isSubDataLoaded;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set errorOnSubDataLoading(val: boolean) {
        this._errorOnSubDataLoading = val;
    }

    public get errorOnSubDataLoading(): boolean {
        return this._errorOnSubDataLoading;
    }
}