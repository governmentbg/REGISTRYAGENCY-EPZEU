import { TypeSystem } from "Cnsys.Core";
import { ApplicationFormBase } from "EPZEU.PR.ApplicationBase";
import { observable } from "mobx";
import { PersonSubjectOfReportSection } from "../Sections/PersonSubjectOfReportSection";
import { moduleContext } from "../../ModuleContext";
import { ApplicantDataOfReport } from "../ApplicantDataOfReport";
import {GdprAgreement} from "../../../EPZEU.PR.Applications/Models/Sections/GdprAgreement";

@TypeSystem.typeDecorator('GroupReportForPerson', moduleContext.moduleName)
export class GroupReportForPerson extends ApplicationFormBase {//TODO ApplicationFormBase is not appropriate for Reports
  @observable private _applicantDataOfReport: ApplicantDataOfReport = null;
  @observable private _personSubjectOfReportSection: PersonSubjectOfReportSection = null;
  @observable private _gdprAgreement: GdprAgreement = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get applicantDataOfReport(): ApplicantDataOfReport {
    return this._applicantDataOfReport;
  }

  @TypeSystem.propertyDecorator(ApplicantDataOfReport)
  public set applicantDataOfReport(value: ApplicantDataOfReport) {
    this._applicantDataOfReport = value;
  }

  public get personSubjectOfReportSection(): PersonSubjectOfReportSection {
    return this._personSubjectOfReportSection;
  }

  @TypeSystem.propertyDecorator(PersonSubjectOfReportSection)
  public set personSubjectOfReportSection(value: PersonSubjectOfReportSection) {
    this._personSubjectOfReportSection = value;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }

  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
