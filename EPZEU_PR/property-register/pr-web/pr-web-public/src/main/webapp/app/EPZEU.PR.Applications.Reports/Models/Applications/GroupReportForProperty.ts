import { TypeSystem } from "Cnsys.Core";
import { ApplicationFormBase } from "EPZEU.PR.ApplicationBase";
import { observable } from "mobx";
import { PropertySubjectOfReportSection } from "../Sections/PropertySubjectOfReportSection";
import { moduleContext } from "../../ModuleContext";
import { ApplicantDataOfReport } from "../ApplicantDataOfReport";
import {GdprAgreement} from "../../../EPZEU.PR.Applications/Models/Sections/GdprAgreement";

@TypeSystem.typeDecorator('GroupReportForProperty', moduleContext.moduleName)
export class GroupReportForProperty extends ApplicationFormBase {
  @observable private _applicantDataOfReport: ApplicantDataOfReport = null;
  @observable private _propertySubjectOfReportSection: PropertySubjectOfReportSection = null;
  @observable private _gdprAgreement: GdprAgreement = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get propertySubjectOfReportSection(): PropertySubjectOfReportSection {
    return this._propertySubjectOfReportSection;
  }

  @TypeSystem.propertyDecorator(PropertySubjectOfReportSection)
  public set propertySubjectOfReportSection(value: PropertySubjectOfReportSection) {
    this._propertySubjectOfReportSection = value;
  }

  public get applicantDataOfReport(): ApplicantDataOfReport {
    return this._applicantDataOfReport;
  }

  @TypeSystem.propertyDecorator(ApplicantDataOfReport)
  public set applicantDataOfReport(value: ApplicantDataOfReport) {
    this._applicantDataOfReport = value;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }

  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
