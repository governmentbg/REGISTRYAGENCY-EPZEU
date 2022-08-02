import * as React from 'react';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps,  DocumentsUI, withApplicationFormContext } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForProperty } from "../../Models/Applications/ApplicationForCertificateForProperty";
import { RequestedPropertyUI } from "../Sections/RequestedPropertyUI";
import { CurrentOwnersUI } from "../Sections/CurrentOwnersUI";
import { PreviousOwnersUI } from "../Sections/PreviousOwnersUI";
import { ApplicantDataUI } from "../Sections/AplicantDataUI";
import { WayOfProvisionUI } from "../Sections/WayOfProvisionUI";
import { ContactDataUI } from "../Sections/ContactDataUI";
import { ObjectHelper } from "Cnsys.Core";
import { ApplicationCorrectionUI } from "../Sections/ApplicationCorrectionUI";
import {GDPRAgreementUI} from "../Sections/GDPRAgreementUI";

interface ApplicationForCertificateForPropertyUIProps extends BaseProps, ApplicationFormContextProviderProps {
  sectionName: string;
}

export class ApplicationForCertificateForPropertyUIImpl extends EPZEUBaseComponent<ApplicationForCertificateForPropertyUIProps, ApplicationForCertificateForProperty> {
  constructor(props?: ApplicationForCertificateForPropertyUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {

    return (
      <>
        {
          (!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)  && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber))&&
          this.props.sectionName =="applicationCorrection"?
            <ApplicationCorrectionUI{...this.bind(m => m.initialApplicationData)}/>:null
        }
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'applicantData' ?
            (!this.model.initialApplicationData || !this.model.initialApplicationData.incomingReauNumber ?
                <ApplicantDataUI {...this.bind(m => m.applicantData)} /> :
                <ApplicantDataUI {...this.bind(m => m.applicantData)} viewMode={ViewMode.Display} />
            ) : null
        }
        {
          this.props.sectionName == 'requestedProperty' ?
            <RequestedPropertyUI {...this.bind(m => m.requestedProperty)} isCorrectiveApplication= {!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
            && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} /> : null
        }
        {
          this.props.sectionName == 'currentOwners' ?
            <CurrentOwnersUI {...this.bind(m => m.currentOwners)} /> : null
        }
        {
          this.props.sectionName == 'previousOwners' ?
            <PreviousOwnersUI {...this.bind(m => m.previousOwners)} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} isCorrectiveApplication= {!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
            && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} infoTextKey={'PR_APP_00054_I'} issuingAuthorityReadOnly={true}/> : null
        }
        {
          this.props.sectionName == 'contactData' ?
            <ContactDataUI {...this.bind(m => m.contactData)} /> : null
        }
        {
          this.props.sectionName == 'documents' ?

            <DocumentsUI {...this.bind(m => m.documents)}
                         possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes}/> : null
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
            <ApplicationCorrectionUI{...this.bind(m => m.initialApplicationData)}/>:null
        }
        {
          this.props.sectionName == 'applicantData' ?
            <ApplicantDataUI {...this.bind(m => m.applicantData)} /> : null
        }
        {
          this.props.sectionName == 'requestedProperty' ?
            <RequestedPropertyUI {...this.bind(m => m.requestedProperty)} isCorrectiveApplication= {!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
            && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} /> : null
        }
        {
          this.props.sectionName == 'currentOwners' ?
            <CurrentOwnersUI {...this.bind(m => m.currentOwners)} /> : null
        }
        {
          this.props.sectionName == 'previousOwners' ?
            <PreviousOwnersUI {...this.bind(m => m.previousOwners)} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} infoTextKey={'PR_APP_00054_I'} issuingAuthorityReadOnly={true} isCorrectiveApplication= {!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
            && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)}/> : null
        }
        {
          this.props.sectionName == 'contactData' ?
            <ContactDataUI {...this.bind(m => m.contactData)} /> : null
        }
        {
          this.props.sectionName == 'documents' ?
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes}/> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>);

  }
}

export const ApplicationForCertificateForPropertyUI = withApplicationFormContext(ApplicationForCertificateForPropertyUIImpl);
