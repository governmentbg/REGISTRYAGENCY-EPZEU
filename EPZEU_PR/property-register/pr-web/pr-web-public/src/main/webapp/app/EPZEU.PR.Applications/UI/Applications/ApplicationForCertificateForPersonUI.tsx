import * as React from 'react';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps, DocumentsUI, withApplicationFormContext } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForPerson } from "../../Models/Applications/ApplicationForCertificateForPerson";
import { ApplicantDataUI } from "../Sections/AplicantDataUI";
import { WayOfProvisionUI } from "../Sections/WayOfProvisionUI";
import { ContactDataUI } from "../Sections/ContactDataUI";
import { ObjectHelper } from "Cnsys.Core";
import { ApplicationCorrectionUI } from "../Sections/ApplicationCorrectionUI";
import { PersonUI } from "../PersonUI";
import {GDPRAgreementUI} from "../Sections/GDPRAgreementUI";

interface ApplicationForCertificateForPersonUIProps extends BaseProps, ApplicationFormContextProviderProps {
  sectionName: string;
}

export class ApplicationForCertificateForPersonUIImpl extends EPZEUBaseComponent<ApplicationForCertificateForPersonUIProps, ApplicationForCertificateForPerson> {
  constructor(props?: ApplicationForCertificateForPersonUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {

    return (
      <>
        {
          (!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData) && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)) &&
            this.props.sectionName == "applicationCorrection" ?
            <ApplicationCorrectionUI{...this.bind(m => m.initialApplicationData)} /> : null
        }
        {
          this.props.sectionName == 'applicantData' ?
            (!this.model.initialApplicationData || !this.model.initialApplicationData.incomingReauNumber ?
              <ApplicantDataUI {...this.bind(m => m.applicantData)} /> :
              <ApplicantDataUI {...this.bind(m => m.applicantData)} viewMode={ViewMode.Display} />
            ) : null
        }
        {
          this.props.sectionName == 'requestedPerson' ?
            <PersonUI {...this.bind(m => m.requestedPerson)} showCompanyCase={true} isCorrectiveApplication={!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
              && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} haveBulstat={true} infoTextKeyForIndividual={'PR_APP_00032_I'} sectionTitle={'PR_REQUESTED_PERSON_L'} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} isCorrectiveApplication={!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
              && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} infoTextKey={'PR_APP_00005_I'} /> : null
        }
        {
          this.props.sectionName == 'contactData' ?
            <ContactDataUI {...this.bind(m => m.contactData)} /> : null
        }
        {
          this.props.sectionName == 'documents' ?

            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>
    );
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        {
          this.props.sectionName == 'applicationCorrection' ?
            <ApplicationCorrectionUI{...this.bind(m => m.initialApplicationData)} /> : null
        }
        {
          this.props.sectionName == 'applicantData' ?
            <ApplicantDataUI {...this.bind(m => m.applicantData)} /> : null
        }
        {
          this.props.sectionName == 'requestedPerson' ?
            <PersonUI {...this.bind(m => m.requestedPerson)} showCompanyCase={true} sectionTitle={'PR_REQUESTED_PERSON_L'} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} infoTextKey={'PR_APP_00005_I'} /> : null
        }
        {
          this.props.sectionName == 'contactData' ?
            <ContactDataUI {...this.bind(m => m.contactData)} /> : null
        }
        {
          this.props.sectionName == 'documents' ?
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>);

  }
}

export const ApplicationForCertificateForPersonUI = withApplicationFormContext(ApplicationForCertificateForPersonUIImpl);
