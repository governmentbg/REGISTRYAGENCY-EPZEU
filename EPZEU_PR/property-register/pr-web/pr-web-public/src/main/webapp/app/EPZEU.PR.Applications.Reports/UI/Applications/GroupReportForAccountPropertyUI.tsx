import * as React from "react";
import { BaseProps } from "Cnsys.UI.React";
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { GroupReportForAccountProperty } from "../../Models/Applications/GroupReportForAccountProperty";
import { AccountPropertySubjectOfReportSectionUI } from "../Sections/AccountPropertySubjectOfReportSectionUI";
import { ApplicantDataOfReportUI } from "../ApplicantDataOfReportUI";
import {GDPRAgreementUI} from "EPZEU.PR.Applications/UI/Sections/GDPRAgreementUI";

interface ReportForAccountPropertyUIProps extends BaseProps, ApplicationFormContextProviderProps{
  sectionName: string;
}

export class ReportForAccountPropertyUIImpl extends EPZEUBaseComponent<ReportForAccountPropertyUIProps, GroupReportForAccountProperty>{
  constructor(props?: ReportForAccountPropertyUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'accountPropertySubjectOfReportSection' ?
            <AccountPropertySubjectOfReportSectionUI {...this.bind(m => m.accountPropertySubjectOfReportSection)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>);
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        {
          this.props.sectionName == 'applicantDataOfReport' ?
            <ApplicantDataOfReportUI {...this.bind(m => m.applicantDataOfReport)} /> : null
        }
        {
          this.props.sectionName == 'accountPropertySubjectOfReportSection' ?
            <AccountPropertySubjectOfReportSectionUI {...this.bind(m => m.accountPropertySubjectOfReportSection)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }

      </>)
  }

}
export const GroupReportForAccountPropertyUI = withApplicationFormContext(ReportForAccountPropertyUIImpl);
