import * as moment from 'moment';
import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { NotificationTypes } from './Enums';

@TypeSystem.typeDecorator('NotificationsUnderNPOSearchCriteria', moduleContext.moduleName)
export class NotificationsUnderNPOSearchCriteria extends BasePagedSearchCriteria {
    @observable private _entryDateFrom: moment.Moment = null;
    @observable private _entryDateTo: moment.Moment = null;
    @observable private _companyFullName: string = null;
    @observable private _uic: string = null;
    @observable private _notificationType: NotificationTypes = null;
    
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('moment')
    public set entryDateFrom(val: moment.Moment) {
        this._entryDateFrom = val;
    }

    public get entryDateFrom(): moment.Moment {
        return this._entryDateFrom;
    }

    @TypeSystem.propertyDecorator('moment')
    public set entryDateTo(val: moment.Moment) {
        this._entryDateTo = val;
    }

    public get entryDateTo(): moment.Moment {
        return this._entryDateTo;
    }

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyFullName = val;
    }

    public get companyName(): string {
        return this._companyFullName;
    }

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @TypeSystem.propertyDecorator(NotificationTypes ? NotificationTypes : moduleContext.moduleName + '.' + 'NotificationTypes')
    public set notificationType(val: NotificationTypes) {
        this._notificationType = val;
    }

    public get notificationType(): NotificationTypes {
        return this._notificationType;
    }
}