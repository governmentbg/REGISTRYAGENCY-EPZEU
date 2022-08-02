import { TypeSystem } from "Cnsys.Core";
import { ApplicationFormBase } from "EPZEU.PR.ApplicationBase";
import { observable } from "mobx";
import { AccountPropertySubjectOfReportSection } from "../Sections/AccountPropertySubjectOfReportSection";
import { moduleContext } from '../../ModuleContext';
import { ApplicantDataOfReport } from "../ApplicantDataOfReport";
import {GdprAgreement} from "../../../EPZEU.PR.Applications/Models/Sections/GdprAgreement";

@TypeSystem.typeDecorator('GroupReportForAccountProperty', moduleContext.moduleName)
export class GroupReportForAccountProperty extends ApplicationFormBase {
  @observable private _applicantDataOfReport: ApplicantDataOfReport = null;
  @observable private _accountPropertySubjectOfReportSection: AccountPropertySubjectOfReportSection = null;
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

  public get accountPropertySubjectOfReportSection(): AccountPropertySubjectOfReportSection {
    return this._accountPropertySubjectOfReportSection;
  }

  @TypeSystem.propertyDecorator(AccountPropertySubjectOfReportSection)
  public set accountPropertySubjectOfReportSection(value: AccountPropertySubjectOfReportSection) {
    this._accountPropertySubjectOfReportSection = value;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }

  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
