import * as React from 'react';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormTypes, NomenclaturesPR, RegistryOffice } from 'EPZEU.PR.Core';
import { ApplicationFormContextProviderProps, DocumentsUI, withApplicationFormContext } from 'EPZEU.PR.ApplicationBase';
import { ApplicantDataUI } from "../Sections/AplicantDataUI";
import { WayOfProvisionUI } from "../Sections/WayOfProvisionUI";
import { ContactDataUI } from "../Sections/ContactDataUI";
import { PeriodForCertificateUI } from "../Sections/PeriodForCertificateUI";
import { ApplicationForCertificateForPeriod } from "../../Models/Applications/ApplicationForCertificateForPeriod";
import { RequestedPropertyUI } from "../Sections/RequestedPropertyUI";
import { CurrentOwnersUI } from "../Sections/CurrentOwnersUI";
import { PreviousOwnersUI } from "../Sections/PreviousOwnersUI";
import { observable } from "mobx";
import { ObjectHelper } from "Cnsys.Core";
import { ApplicationCorrectionUI } from "../Sections/ApplicationCorrectionUI";
import { PersonUI } from "../PersonUI";
import {GDPRAgreementUI} from "../Sections/GDPRAgreementUI";

interface ApplicationForCertificateForPeriodUIProps extends BaseProps, ApplicationFormContextProviderProps {
  sectionName: string;
}

export class ApplicationForCertificateForPeriodUIImpl extends EPZEUBaseComponent<ApplicationForCertificateForPeriodUIProps, ApplicationForCertificateForPeriod> {
  @observable private registerOffice: RegistryOffice;

  constructor(props?: ApplicationForCertificateForPeriodUIProps) {
    super(props);
  }


  renderEdit(): JSX.Element {

    if (this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty && this.model && this.model.requestedProperty && this.model.requestedProperty.settlement) {
      NomenclaturesPR.getRegistryOffice().then(registryOffice => {
        this.registerOffice = registryOffice.filter(filteredRegistryOffice => this.model.requestedProperty.settlement.siteId == filteredRegistryOffice.id)[0];
      });
    }

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
                <ApplicantDataUI {...this.bind(m => m.applicantData)} viewMode={ViewMode.Display}/>
            ) : null
        }
        {
          this.props.sectionName == 'periodForCertificate' ?
            <PeriodForCertificateUI {...this.bind(m => m.periodForCertificate)} /> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson &&
        this.props.sectionName == 'requestedPerson' ?
          <PersonUI {...this.bind(m => m.requestedPerson)} showCompanyCase={true} isCorrectiveApplication={!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
          && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} haveBulstat={true} infoTextKeyForIndividual={'PR_APP_00032_I'} sectionTitle={'PR_REQUESTED_PERSON_L'}/> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty &&
        this.props.sectionName == 'requestedProperty' ?
          <RequestedPropertyUI {...this.bind(m => m.requestedProperty)} isCorrectiveApplication={!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
          && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)}/> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty &&
        this.props.sectionName == 'currentOwners' ?
          <CurrentOwnersUI {...this.bind(m => m.currentOwners)} /> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty &&
        this.props.sectionName == 'previousOwners' ?
          <PreviousOwnersUI {...this.bind(m => m.previousOwners)} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <>
              {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson ?
                <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} isCorrectiveApplication={!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
                && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} infoTextKey={'PR_APP_00005_I'}/>
                : <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} isCorrectiveApplication={!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
                && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)} infoTextKey={'PR_APP_00054_I'} issuingAuthorityReadOnly={true}/>}
            </> : null
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
          this.props.sectionName == 'periodForCertificate' ?
            <PeriodForCertificateUI {...this.bind(m => m.periodForCertificate)} /> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson &&
        this.props.sectionName == 'requestedPerson' ?
          <PersonUI {...this.bind(m => m.requestedPerson)} showCompanyCase={true} sectionTitle={'PR_REQUESTED_PERSON_L'}/> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty &&
        this.props.sectionName == 'requestedProperty' ?
          <RequestedPropertyUI {...this.bind(m => m.requestedProperty)}  isCorrectiveApplication= {!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
          && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)}/> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty &&
        this.props.sectionName == 'currentOwners' ?
          <CurrentOwnersUI {...this.bind(m => m.currentOwners)} /> : null
        }
        {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty &&
        this.props.sectionName == 'previousOwners' ?
          <PreviousOwnersUI {...this.bind(m => m.previousOwners)} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <>
              {this.model.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson ?
                <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} infoTextKey={'PR_APP_00005_I'}/>
                : <WayOfProvisionUI {...this.bind(m => m.wayOfProvision)} infoTextKey={'PR_APP_00054_I'} issuingAuthorityReadOnly={true} isCorrectiveApplication= {!ObjectHelper.isNullOrUndefined(this.model.initialApplicationData)
                && !ObjectHelper.isNullOrUndefined(this.model.initialApplicationData.incomingReauNumber)}/>}
            </> : null
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

export const ApplicationForCertificateForPeriodUI = withApplicationFormContext(ApplicationForCertificateForPeriodUIImpl);
