import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import { ApplicationREAU } from "EPZEU.PR.ApplicationProcesses";

@TypeSystem.typeDecorator('ApplicationsWithoutMovement', moduleContext.moduleName)
export class ApplicationsWithoutMovement extends BaseDataModel {

  @observable private _applications: ApplicationREAU[] = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }


  public get applications(): ApplicationREAU[] {
    return this._applications;
  }

  @TypeSystem.propertyArrayDecorator(ApplicationREAU)
  public set applications(value: ApplicationREAU[]) {
    this._applications = value;
  }
}
