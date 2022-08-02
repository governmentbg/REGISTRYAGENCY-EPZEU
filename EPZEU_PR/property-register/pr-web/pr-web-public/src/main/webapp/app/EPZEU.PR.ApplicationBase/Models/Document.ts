import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from 'mobx';
import { resourceManager } from 'EPZEU.Core';
import { RegistryOffice, Book } from "EPZEU.PR.Core";
import { moduleContext } from "../ModuleContext";
import * as moment from "moment";

@TypeSystem.typeDecorator('Document', moduleContext.moduleName)
export class Document extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _numberIncomingRegistry: number = null;
  @observable private _dateIncomingRegistry: string = null;
  @observable private _numberDoubleIncomingRegistry: string = null;
  @observable private _book: Book = null;
  @observable private _year: string = null;
  @observable private _volume: string = null;
  @observable private _actNumber: string = null;
  @observable private _registryOffice: RegistryOffice = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get id(): string {
    return this._id;
  }

  @TypeSystem.propertyDecorator('string')
  public set id(value: string) {
    this._id = value;
  }

  public get numberIncomingRegistry(): number {
    return this._numberIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('string')
  public set numberIncomingRegistry(value: number) {
    this._numberIncomingRegistry = value;
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

  public get book(): Book {
    return this._book;
  }

  @TypeSystem.propertyDecorator(Book)
  public set book(value: Book) {
    this._book = value;
  }

  public get numberDoubleIncomingRegistry(): string {
    return this._numberDoubleIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('string')
  public set numberDoubleIncomingRegistry(value: string) {
    this._numberDoubleIncomingRegistry = value;
  }

  public get dateIncomingRegistry(): string {
    return this._dateIncomingRegistry;
  }

  @TypeSystem.propertyDecorator('string')
  public set dateIncomingRegistry(value: string) {
    this._dateIncomingRegistry = value;
  }

  public get year(): string {
    return this._year;
  }

  @TypeSystem.propertyDecorator('string')
  public set year(value: string) {
    this._year = value;
  }

  public get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator(RegistryOffice ? RegistryOffice : moduleContext.moduleName + '.' + 'RegistryOffice')
  public set registryOffice(value: RegistryOffice) {
    this._registryOffice = value;
  }

  public toString(): string {
    let toString = "";
    if(this.numberIncomingRegistry && this.dateIncomingRegistry){
      toString+="<p class=\"field-text\"><span class =\"field-title field-title--preview\">"
        +resourceManager.getResourceByKey('PR_APP_00038_L')+"/ " +resourceManager.getResourceByKey('GL_DATE_L')+": </span>"+
        this.numberIncomingRegistry +" / " + (moment(this.dateIncomingRegistry)).format("DD.MM.YYYY") + "г.</p>"
    }
    if(this.numberDoubleIncomingRegistry && this.year){
      toString+="<p class=\"field-text\"><span class =\"field-title field-title--preview\">"
        +resourceManager.getResourceByKey('PR_APP_00017_L')+"/ " +resourceManager.getResourceByKey('GL_YEAR_L')+": </span>"+
        this.numberDoubleIncomingRegistry +" / " + this.year + "г.</p>"
    }
    toString += "";
    if(this.book && this.book.id && this.book.name )
      toString+="<p class=\"field-text\"><span class =\"field-title field-title--preview\">"+resourceManager.getResourceByKey('PR_APP_BOOK_L')+": </span>"+this.book.name + ", ";
    if(this.year)
      toString+=this.year+ "г., ";
    if(this.volume)
      toString+=resourceManager.getResourceByKey('PR_APP_VOLUME_L')+" "+this.volume + ", ";
    if(this.actNumber)
      toString+=resourceManager.getResourceByKey('PR_APP_ACT_NUMBER_L')+" "+this.actNumber;
    toString +="</p>";

    return toString;
  }
}
