import { observable } from 'mobx';
import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { Book } from 'EPZEU.PR.Core';
import { moduleContext } from "../ModuleContext";


@TypeSystem.typeDecorator('DataForRegistrationOfDocumentInBook', moduleContext.moduleName)
export class DataForRegistrationOfDocumentInBook extends BaseDataModel {
  @observable private _actNumber: number = null;
  @observable private _volume: number = null;
  @observable private _year: number = null;
  @observable private _book: Book = null;

  public get actNumber(): number {
    return this._actNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set actNumber(value: number) {
    this._actNumber = value;
  }

  public get volume(): number {
    return this._volume;
  }

  @TypeSystem.propertyDecorator('number')
  public set volume(val: number) {
    this._volume = val;
  }

  public get year(): number {
    return this._year;
  }

  @TypeSystem.propertyDecorator('number')
  public set year(val: number) {
    this._year = val;
  }

  public get book(): Book {
    return this._book;
  }

  @TypeSystem.propertyDecorator(Book ? Book : moduleContext.moduleName + '.' + 'Book')
  public set book(val: Book) {
    this._book = val;
  }

  public clear(): void {
    this.actNumber = null;
    this.volume = null;
    this.year = null;
    this.book.clear();
  }

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }
}
