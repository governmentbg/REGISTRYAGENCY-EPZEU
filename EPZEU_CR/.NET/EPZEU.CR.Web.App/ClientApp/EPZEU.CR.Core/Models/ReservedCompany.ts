import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import * as moment from 'moment';

@TypeSystem.typeDecorator('ReservedCompany', moduleContext.moduleName)
export class ReservedCompany extends BaseDataModel {

    @observable private _companyName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyName = val;
    }

    public get companyName(): string {
        return this._companyName;
    }

    @observable private _trasnliteration: string = null;

    @TypeSystem.propertyDecorator('string')
    public set trasnliteration(val: string) {
        this._trasnliteration = val;
    }

    public get trasnliteration(): string {
        return this._trasnliteration;
    }

    @observable private _legalFormName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set legalFormName(val: string) {
        this._legalFormName = val;
    }

    public get legalFormName(): string {
        return this._legalFormName;
    }

    @observable private _interestedPerson: string = null;

    @TypeSystem.propertyDecorator('string')
    public set interestedPerson(val: string) {
        this._interestedPerson = val;
    }

    public get interestedPerson(): string {
        return this._interestedPerson;
    }

    @observable private _interestedAs: string = null;

    @TypeSystem.propertyDecorator('string')
    public set interestedAs(val: string) {
        this._interestedAs = val;
    }

    public get interestedAs(): string {
        return this._interestedAs;
    }

    @observable private _activeFrom: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set activeFrom(val: moment.Moment) {
        this._activeFrom = val;
    }

    public get activeFrom(): moment.Moment {
        return this._activeFrom;
    }

    @observable private _activeTo: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set activeTo(val: moment.Moment) {
        this._activeTo = val;
    }

    public get activeTo(): moment.Moment {
        return this._activeTo;
    }

    @observable private _erasedDate: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set erasedDate(val: moment.Moment) {
        this._erasedDate = val;
    }

    public get erasedDate(): moment.Moment {
        return this._erasedDate;
    }

    @observable private _personPosition: string = null;

    @TypeSystem.propertyDecorator('string')
    public set personPosition(val: string) {
        this._personPosition = val;
    }

    public get personPosition(): string {
        return this._personPosition;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}