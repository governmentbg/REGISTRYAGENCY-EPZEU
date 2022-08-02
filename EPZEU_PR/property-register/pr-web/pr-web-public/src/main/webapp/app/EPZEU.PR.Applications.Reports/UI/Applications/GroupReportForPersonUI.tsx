import * as React from "react";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { BaseProps } from "Cnsys.UI.React";
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "EPZEU.PR.ApplicationBase";
import { GroupReportForPerson } from "../../Models/Applications/GroupReportForPerson";
import { PersonSubjectOfReportSectionUI } from "../Sections/PersonSubjectOfReportSectionUI";
import { ApplicantDataOfReportUI } from "../ApplicantDataOfReportUI";
import {GDPRAgreementUI} from "EPZEU.PR.Applications/UI/Sections/GDPRAgreementUI";

interface ReportForPersonUIProps extends BaseProps ,ApplicationFormContextProviderProps{
  sectionName: string;
}

export class ReportForPersonUIImpl extends EPZEUBaseComponent<ReportForPersonUIProps, GroupReportForPerson> {

  constructor(props?: ReportForPersonUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'personSubjectOfReportSection' ?
            <PersonSubjectOfReportSectionUI {...this.bind(m => m.personSubjectOfReportSection)} /> : null
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
          this.props.sectionName == 'personSubjectOfReportSection' ?
            <PersonSubjectOfReportSectionUI {...this.bind(m => m.personSubjectOfReportSection)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }

      </>)
  }
}
export const GroupReportForPersonUI = withApplicationFormContext(ReportForPersonUIImpl);
