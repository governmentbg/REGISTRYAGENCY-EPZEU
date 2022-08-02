import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from 'mobx';
import { Document } from "./Document";
import * as moment from 'moment'

@TypeSystem.typeDecorator('SearchDocumentsForReport', moduleContext.moduleName)
export class SearchDocumentsForReport extends BaseDataModel {
  @observable private _registryOfficeId: string = null;
  @observable private _registryOfficeName: string = null;
  @observable private _book: string = null;
  @observable private _year: string = null;
  @observable private _volume: string = null;
  @observable private _actNumber: string = null;
  @observable private _numberIncomingRegistry: string = null;
  @observable private _dateIncomingRegistry: moment.Moment = null;
  @observable private _numberDoubleIncomingRegistry: string = null;
  @observable private _yearDoubleIncomingRegistry: string = null;
  @observable private _bookForm: boolean = true;
  @observable private _doubleIncomingRegistry: boolean = null;
  @observable private _incomingRegistry: boolean = null;
  @observable private _items: Document[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get doubleIncomingRegistry(): boolean {
    return this._doubleIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set doubleIncomingRegistry(value: boolean) {
    this._doubleIncomingRegistry = value;
  }

  public get incomingRegistry(): boolean {
    return this._incomingRegistry;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set incomingRegistry(value: boolean) {
    this._incomingRegistry = value;
  }

  public get bookForm(): boolean {
    return this._bookForm;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set bookForm(value: boolean) {
    this._bookForm = value;
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }

 public get registryOfficeName(): string {
    return this._registryOfficeName;
  }

  @TypeSystem.propertyDecorator('string')
 public set registryOfficeName(value: string) {
    this._registryOfficeName = value;
  }

  public get book(): string {
    return this._book;
  }

  @TypeSystem.propertyDecorator('string')
  public set book(value: string) {
    this._book = value;
  }

  public get year(): string {
    return this._year;
  }

  @TypeSystem.propertyDecorator('string')
  public set year(value: string) {
    this._year = value;
  }

  public get volume(): string {
    return this._volume;
  }

  @TypeSystem.propertyDecorator('string')
  public set volume(value: string) {
    this._volume = value;
  }

  public get actNumber(): string {
    return this._actNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set actNumber(value: string) {
    this._actNumber = value;
  }

  public get numberDoubleIncomingRegistry(): string {
    return this._numberDoubleIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('string')
  public set numberDoubleIncomingRegistry(value: string) {
    this._numberDoubleIncomingRegistry = value;
  }

  public get yearDoubleIncomingRegistry(): string {
    return this._yearDoubleIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('string')
  public set yearDoubleIncomingRegistry(value: string) {
    this._yearDoubleIncomingRegistry = value;
  }

  public get numberIncomingRegistry(): string {
    return this._numberIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('string')
  public set numberIncomingRegistry(value: string) {
    this._numberIncomingRegistry = value;
  }

  public get dateIncomingRegistry(): moment.Moment {
    return this._dateIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('moment')
  public set dateIncomingRegistry(value: moment.Moment) {
    this._dateIncomingRegistry = value;
  }

  public get items(): Document[] {
    return this._items;
  }

  @TypeSystem.propertyDecorator(Document ? Document : moduleContext.moduleName + '.' + 'DocumentFromReport')
  public set items(value: Document[]) {
    this._items = value;
  }
}
