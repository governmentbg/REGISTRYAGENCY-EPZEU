import * as React from "react";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { BaseProps } from "Cnsys.UI.React";
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "EPZEU.PR.ApplicationBase";
import { RequestForReportForPersonInAllRegistryOffices } from "../../Models/Applications/ReportForPersonInAllRegistryOffices";
import { ApplicantDataOfReportUI } from "../ApplicantDataOfReportUI";
import { PersonSubjectForReportInAllRegistryOfficesSectionUI } from "../Sections/PersonSubjectOfReportInAllRegistryOfficesSectionUI";
import {GDPRAgreementUI} from "EPZEU.PR.Applications/UI/Sections/GDPRAgreementUI";


interface ReportForPersonInAllRegistryOfficesUIProps extends BaseProps ,ApplicationFormContextProviderProps{
  sectionName: string;
}

export class ReportForPersonInAllRegistryOfficesUIImpl extends EPZEUBaseComponent<ReportForPersonInAllRegistryOfficesUIProps, RequestForReportForPersonInAllRegistryOffices> {

  constructor(props?: ReportForPersonInAllRegistryOfficesUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'personSubjectOfReportInAllRegistryOfficesSection' ?
            <PersonSubjectForReportInAllRegistryOfficesSectionUI {...this.bind(m => m.personSubjectOfReportInAllRegistryOfficesSection)} />  : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>
     )
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        {
          this.props.sectionName == 'applicantDataOfReport' ?
            <ApplicantDataOfReportUI {...this.bind(m => m.applicantDataOfReport)} /> : null
        }
        {
          this.props.sectionName == 'personSubjectOfReportInAllRegistryOfficesSection' ?
            <PersonSubjectForReportInAllRegistryOfficesSectionUI {...this.bind(m => m.personSubjectOfReportInAllRegistryOfficesSection)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>)
  }
}
export const ReportForPersonInAllRegistryOfficesUI = withApplicationFormContext(ReportForPersonInAllRegistryOfficesUIImpl);
