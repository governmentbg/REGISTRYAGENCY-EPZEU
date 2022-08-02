import * as React from "react";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { BaseProps } from "Cnsys.UI.React";
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "EPZEU.PR.ApplicationBase";
import { GroupReportForProperty } from "../../Models/Applications/GroupReportForProperty";
import { PropertySubjectOfReportSectionUI } from "../Sections/PropertySubjectOfReportSectionUI";
import { ApplicantDataOfReportUI } from "../ApplicantDataOfReportUI";
import {GDPRAgreementUI} from "EPZEU.PR.Applications/UI/Sections/GDPRAgreementUI";

interface ReportForPropertyUIProps extends BaseProps ,ApplicationFormContextProviderProps{
  sectionName: string;
}

export class ReportForPropertyUIImpl extends EPZEUBaseComponent<ReportForPropertyUIProps,GroupReportForProperty>{

  constructor(props?: ReportForPropertyUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {

    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'propertySubjectOfReportSection' ?
            <PropertySubjectOfReportSectionUI {...this.bind(m => m.propertySubjectOfReportSection)} /> : null
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
          this.props.sectionName == 'propertySubjectOfReportSection' ?
            <PropertySubjectOfReportSectionUI {...this.bind(m => m.propertySubjectOfReportSection)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }

      </>)
  }
}
export const GroupReportForPropertyUI = withApplicationFormContext(ReportForPropertyUIImpl);
