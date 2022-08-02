﻿import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { ApplicationInfo } from './ModelsAutoGenerated';

@TypeSystem.typeDecorator('MasterAssignmentApplication', moduleContext.moduleName)
export class MasterAssignmentApplication extends BaseDataModel {
    @observable private _masterApplication: ApplicationInfo = null;
    @observable private _relatedApplication: ApplicationInfo[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator(ApplicationInfo ? ApplicationInfo : moduleContext.moduleName + '.' + 'ApplicationInfo')
    public set masterApplication(val: ApplicationInfo) {
        this._masterApplication = val;
    }

    public get masterApplication(): ApplicationInfo {
        return this._masterApplication;
    }

    @TypeSystem.propertyArrayDecorator(ApplicationInfo ? ApplicationInfo : moduleContext.moduleName + '.' + 'ApplicationInfo')
    public set relatedApplication(val: ApplicationInfo[]) {
        this._relatedApplication = val;
    }

    public get relatedApplication(): ApplicationInfo[] {
        return this._relatedApplication;
    }
}