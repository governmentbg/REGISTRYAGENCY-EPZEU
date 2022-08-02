import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('FieldsSectionsGroups', moduleContext.moduleName)
export class FieldsGroupsSections extends BaseDataModel {

    @observable private _fields: FieldGroupSection[] = null;

    @TypeSystem.propertyArrayDecorator(FieldGroupSection ? FieldGroupSection : moduleContext.moduleName + '.' + 'FieldGroupSection')
    public set fields(val: FieldGroupSection[]) {
        this._fields = val;
    }

    public get fields(): FieldGroupSection[] {
        return this._fields;
    }

    @observable private _groups: FieldGroupSection[] = null;

    @TypeSystem.propertyArrayDecorator(FieldGroupSection ? FieldGroupSection : moduleContext.moduleName + '.' + 'FieldGroupSection')
    public set groups(val: FieldGroupSection[]) {
        this._groups = val;
    }

    public get groups(): FieldGroupSection[] {
        return this._groups;
    }

    @observable private _sections: FieldGroupSection[] = null;

    @TypeSystem.propertyArrayDecorator(FieldGroupSection ? FieldGroupSection : moduleContext.moduleName + '.' + 'FieldGroupSection')
    public set sections(val: FieldGroupSection[]) {
        this._sections = val;
    }

    public get sections(): FieldGroupSection[] {
        return this._sections;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('FieldGroupSection', moduleContext.moduleName)
export class FieldGroupSection extends BaseDataModel {

    @observable private _id: string = null;

    @TypeSystem.propertyDecorator('string')
    public set id(val: string) {
        this._id = val;
    }

    public get id(): string {
        return this._id;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @observable private _parentId: string = null;

    @TypeSystem.propertyDecorator('string')
    public set parentId(val: string) {
        this._parentId = val;
    }

    public get parentId(): string {
        return this._parentId;
    }

    @observable private _fieldIdent: string = null;

    @TypeSystem.propertyDecorator('string')
    public set fieldIdent(val: string) {
        this._fieldIdent = val;
    }

    public get fieldIdent(): string {
        return this._fieldIdent;
    }

    @observable private _isDateNotifActAnnouncement: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isDateNotifActAnnouncement(val: boolean) {
        this._isDateNotifActAnnouncement = val;
    }

    public get isDateNotifActAnnouncement(): boolean {
        return this._isDateNotifActAnnouncement;
    }

    @observable private _isAnnualActAnnouncement: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isAnnualActAnnouncement(val: boolean) {
        this._isAnnualActAnnouncement = val;
    }

    public get isAnnualActAnnouncement(): boolean {
        return this._isAnnualActAnnouncement;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}