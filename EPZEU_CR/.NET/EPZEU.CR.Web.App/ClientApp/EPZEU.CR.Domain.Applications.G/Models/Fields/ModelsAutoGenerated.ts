

// Auto Generated Object
import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import {  CompositeField, Record } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'



@TypeSystem.typeDecorator('Statement', moduleContext.moduleName)
export class Statement extends Record { 

    @observable private _actModeText: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actModeText(val: string){
        this._actModeText = val;
    }
    
    public get actModeText(): string{
        return this._actModeText;
    }
     

    @observable private _actModeValue: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actModeValue(val: string){
        this._actModeValue = val;
    }
    
    public get actModeValue(): string{
        return this._actModeValue;
    }
     

    @observable private _description: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set description(val: string){
        this._description = val;
    }
    
    public get description(): string{
        return this._description;
    }
     

    @observable private _actDate: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actDate(val: string){
        this._actDate = val;
    }
    
    public get actDate(): string{
        return this._actDate;
    }
     

    @observable private _actYear: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actYear(val: string){
        this._actYear = val;
    }
    
    public get actYear(): string{
        return this._actYear;
    }
     

    @observable private _actID: string = null;
    
    @TypeSystem.propertyDecorator('string')
    public set actID(val: string){
        this._actID = val;
    }
    
    public get actID(): string{
        return this._actID;
    }
     

    @observable private _isActWithErasedPersonalData: boolean = null;
    
    @TypeSystem.propertyDecorator('boolean')
    public set isActWithErasedPersonalData(val: boolean){
        this._isActWithErasedPersonalData = val;
    }
    
    public get isActWithErasedPersonalData(): boolean{
        return this._isActWithErasedPersonalData;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F10019A0_StatementA', moduleContext.moduleName)
export class F10019A0_StatementA extends Statement { 

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('F10019A_StatementsA', moduleContext.moduleName)
export class F10019A_StatementsA extends CompositeField { 

    @observable private _statements: F10019A0_StatementA[] = null;
    
    @TypeSystem.propertyArrayDecorator(F10019A0_StatementA ? F10019A0_StatementA : moduleContext.moduleName + '.' + 'F10019A0_StatementA')
    public set statements(val: F10019A0_StatementA[]){
        this._statements = val;
    }
    
    public get statements(): F10019A0_StatementA[]{
        return this._statements;
    }
     

    constructor(obj?: any){
        super(obj)

        this.copyFrom(obj);
    }
}
