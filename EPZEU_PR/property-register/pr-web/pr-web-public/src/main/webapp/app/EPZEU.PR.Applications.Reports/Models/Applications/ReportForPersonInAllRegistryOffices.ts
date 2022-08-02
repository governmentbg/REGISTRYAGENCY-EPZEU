import { TypeSystem } from "Cnsys.Core";
import { ApplicationFormBase } from "EPZEU.PR.ApplicationBase";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";
import { ApplicantDataOfReport } from "../ApplicantDataOfReport";
import { PersonSubjectOfReportInAllRegistryOfficesSection } from "../Sections/PersonSubjectOfReportInAllRegistryOfficesSection";
import {GdprAgreement} from "../../../EPZEU.PR.Applications/Models/Sections/GdprAgreement";

@TypeSystem.typeDecorator('RequestForReportForPersonInAllRegistryOffices', moduleContext.moduleName)
export class RequestForReportForPersonInAllRegistryOffices extends ApplicationFormBase {//TODO ApplicationFormBase is not appropriate for Reports

  @observable private _applicantDataOfReport: ApplicantDataOfReport = null;
  @observable private _personSubjectOfReportInAllRegistryOfficesSection: PersonSubjectOfReportInAllRegistryOfficesSection = null;
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

  public get personSubjectOfReportInAllRegistryOfficesSection(): PersonSubjectOfReportInAllRegistryOfficesSection {
    return this._personSubjectOfReportInAllRegistryOfficesSection;
  }

  @TypeSystem.propertyDecorator(PersonSubjectOfReportInAllRegistryOfficesSection)
  public set personSubjectOfReportInAllRegistryOfficesSection(value: PersonSubjectOfReportInAllRegistryOfficesSection) {
    this._personSubjectOfReportInAllRegistryOfficesSection = value;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }

  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
