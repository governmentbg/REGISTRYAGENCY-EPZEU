import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { Book } from "EPZEU.PR.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import { Act } from "EPZEU.Core";

@TypeSystem.typeDecorator('TaxesCalculator', moduleContext.moduleName)
export class TaxesCalculator extends BaseDataModel {
  @observable private _materialInterestInBGN: number = null;
  @observable private _book: Book = null;
  @observable private _act: Act = null;
  
  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('number')
  public set materialInterestInBGN(value: number) {
    this._materialInterestInBGN = value;
  }

  public get materialInterestInBGN(): number {
    return this._materialInterestInBGN;
  }

  @TypeSystem.propertyDecorator(Book ? Book : moduleContext.moduleName + '.' + 'Book')
  public set book(val: Book) {
    this._book = val;
  }

  public get book(): Book {
    return this._book;
  }

  @TypeSystem.propertyDecorator(Act ? Act : moduleContext.moduleName + '.' + 'Act')
  public set act(val: Act) {
    this._act = val;
  }

  public get act(): Act {
    return this._act;
  }
}
