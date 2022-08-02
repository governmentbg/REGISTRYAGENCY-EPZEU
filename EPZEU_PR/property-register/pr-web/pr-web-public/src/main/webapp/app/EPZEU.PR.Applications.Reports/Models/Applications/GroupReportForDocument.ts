import { TypeSystem } from "Cnsys.Core";
import { ApplicationFormBase } from "EPZEU.PR.ApplicationBase";
import { observable } from "mobx";
import { DocumentSubjectOfReportSection } from "../Sections/DocumentSubjectOfReportSection";
import { moduleContext } from "../../ModuleContext";
import { ApplicantDataOfReport } from "../ApplicantDataOfReport";
import {GdprAgreement} from "../../../EPZEU.PR.Applications/Models/Sections/GdprAgreement";

@TypeSystem.typeDecorator('GroupReportForDocument', moduleContext.moduleName)
export class GroupReportForDocument extends ApplicationFormBase {
  @observable private _applicantDataOfReport: ApplicantDataOfReport = null;
  @observable private _documentSubjectOfReportSection: DocumentSubjectOfReportSection = null;
  @observable private _gdprAgreement: GdprAgreement = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get applicantDataOfReport(): ApplicantDataOfReport {
    return this._applicantDataOfReport;
  }

  @TypeSystem.propertyDecorator(ApplicantDataOfReport ? ApplicantDataOfReport : moduleContext.moduleName + '.' + 'ApplicantDataOfReport')
  public set applicantDataOfReport(value: ApplicantDataOfReport) {
    this._applicantDataOfReport = value;
  }

  public get documentSubjectOfReportSection(): DocumentSubjectOfReportSection {
    return this._documentSubjectOfReportSection;
  }

  @TypeSystem.propertyDecorator(DocumentSubjectOfReportSection ? DocumentSubjectOfReportSection : moduleContext.moduleName + '.' + 'DocumentsSubjectOfReport')
  public set documentSubjectOfReportSection(value: DocumentSubjectOfReportSection) {
    this._documentSubjectOfReportSection = value;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }

  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
