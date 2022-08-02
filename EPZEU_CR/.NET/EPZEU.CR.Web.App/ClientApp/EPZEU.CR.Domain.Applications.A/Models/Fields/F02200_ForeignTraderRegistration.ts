import { TypeSystem, moduleContext } from "Cnsys.Core";
import { observable } from "mobx";
import { Record } from "EPZEU.CR.Domain";

@TypeSystem.typeDecorator('F02200_ForeignTraderRegistration', moduleContext.moduleName)
export class F02200_ForeignTraderRegistration extends Record {

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @observable private _legalForm: string = null;

    @TypeSystem.propertyDecorator('string')
    public set legalForm(val: string) {
        this._legalForm = val;
    }

    public get legalForm(): string {
        return this._legalForm;
    }

    @observable private _register: string = null;

    @TypeSystem.propertyDecorator('string')
    public set register(val: string) {
        this._register = val;
    }

    public get register(): string {
        return this._register;
    }

    @observable private _entryNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set entryNumber(val: string) {
        this._entryNumber = val;
    }

    public get entryNumber(): string {
        return this._entryNumber;
    }

    @observable private _foreignRegisterCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set foreignRegisterCode(val: string) {
        this._foreignRegisterCode = val;
    }

    public get foreignRegisterCode(): string {
        return this._foreignRegisterCode;
    }

    @observable private _foreignLegalFormCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set foreignLegalFormCode(val: string) {
        this._foreignLegalFormCode = val;
    }

    public get foreignLegalFormCode(): string {
        return this._foreignLegalFormCode;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}