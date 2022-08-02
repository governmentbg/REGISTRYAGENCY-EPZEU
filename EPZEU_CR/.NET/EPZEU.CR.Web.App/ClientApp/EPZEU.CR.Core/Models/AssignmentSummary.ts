import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('AssignmentSummary', moduleContext.moduleName)
export class AssignmentSummary extends BaseDataModel {

    @observable private _experts: AssignedExpertSummary[] = null;

    @TypeSystem.propertyArrayDecorator(AssignedExpertSummary ? AssignedExpertSummary : moduleContext.moduleName + '.' + 'AssignedExpertSummary')
    public set experts(val: AssignedExpertSummary[]) {
        this._experts = val;
    }

    public get experts(): AssignedExpertSummary[] {
        return this._experts;
    }

    @observable private _assignmentExpertType: number = null;

    @TypeSystem.propertyDecorator('number')
    public set assignmentExpertType(val: number) {
        this._assignmentExpertType = val;
    }

    public get assignmentExpertType(): number {
        return this._assignmentExpertType;
    }

    @observable private _assignmentID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set assignmentID(val: number) {
        this._assignmentID = val;
    }

    public get assignmentID(): number {
        return this._assignmentID;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AssignedExpertSummary', moduleContext.moduleName)
export class AssignedExpertSummary extends BaseDataModel {

    @observable private _guid: string = null;

    @TypeSystem.propertyDecorator('string')
    public set guid(val: string) {
        this._guid = val;
    }

    public get guid(): string {
        return this._guid;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @observable private _egn: string = null;

    @TypeSystem.propertyDecorator('string')
    public set egn(val: string) {
        this._egn = val;
    }

    public get egn(): string {
        return this._egn;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}