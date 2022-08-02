import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('OutgoingNumber', moduleContext.moduleName)
export class OutgoingNumber extends BaseDataModel {

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    @observable private _outgoingDate: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set outgoingDate(val: moment.Moment) {
        this._outgoingDate = val;
    }

    public get outgoingDate(): moment.Moment {
        return this._outgoingDate;
    }

    @observable private _fullOutgoingNumberSpecified: boolean = false;

    @TypeSystem.propertyDecorator('boolean')
    public set fullOutgoingNumberSpecified(val: boolean) {
        this._fullOutgoingNumberSpecified = val;
    }

    public get fullOutgoingNumberSpecified(): boolean {
        return this._fullOutgoingNumberSpecified;
    }

    @observable private _docNumber: number = null;

    @TypeSystem.propertyDecorator('number')
    public set docNumber(val: number) {
        this._docNumber = val;
    }

    public get docNumber(): number {
        return this._docNumber;
    }

    @observable private _fullOutgoingNumber: string = null;

    public get fullOutgoingNumber(): string {
        var result = "";

        if (this._incomingNumber)
            result += this.incomingNumber;

        if (this._docNumber && this._docNumber > 1) {
            if (this._incomingNumber)
                result += "-" + this._docNumber;
            else
                result += this._docNumber;
        }

        if (moment.isMoment(this._outgoingDate) && this._outgoingDate.isValid())
            result += "/" + this._outgoingDate.format("L");

        return result;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}