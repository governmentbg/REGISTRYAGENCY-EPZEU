import * as React from 'react';
import { BaseProps } from 'Cnsys.UI.React';
import { ApplicationFormContextProviderProps, withApplicationFormContext } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { GroupReportForDocument} from "../../Models/Applications/GroupReportForDocument";
import { DocumentSubjectOfReportSectionUI } from "../Sections/DocumentSubjectOfReportSectionUI";
import { ApplicantDataOfReportUI } from "../ApplicantDataOfReportUI";
import {GDPRAgreementUI} from "EPZEU.PR.Applications/UI/Sections/GDPRAgreementUI";

interface ReportForDocumentUIProps extends BaseProps, ApplicationFormContextProviderProps {
  sectionName: string;
}

export class ReportForDocumentUIImpl extends EPZEUBaseComponent<ReportForDocumentUIProps, GroupReportForDocument> {
  constructor(props?: ReportForDocumentUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'documentSubjectOfReportSection' ?
            <DocumentSubjectOfReportSectionUI {...this.bind(m => m.documentSubjectOfReportSection)} /> : null
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
          this.props.sectionName == 'documentSubjectOfReportSection' ?
            <DocumentSubjectOfReportSectionUI {...this.bind(m => m.documentSubjectOfReportSection)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }

      </>)
  }
}

export const GroupReportForDocumentUI = withApplicationFormContext(ReportForDocumentUIImpl);
