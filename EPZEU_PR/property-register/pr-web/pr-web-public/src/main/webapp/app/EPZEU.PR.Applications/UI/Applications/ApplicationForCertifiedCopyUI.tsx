import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicantType, ApplicationFormContextProviderProps, Country, DocumentsUI, PersonType, withApplicationFormContext } from 'EPZEU.PR.ApplicationBase';
import { ApplicantCategory, NomenclaturesPR } from 'EPZEU.PR.Core';
import * as React from 'react';
import { ApplicationForCertifiedCopy } from '../../Models/Applications/ApplicationForCertifiedCopy';
import { Individual } from "../../Models/Individual";
import { LegalEntity } from "../../Models/LegalEntity";
import { Person } from "../../Models/Person";
import { ServiceRecipient } from '../../Models/Sections/ServiceRecipient';
import { WayOfProvisionBaseData } from '../../Models/Sections/WayOfProvisionBaseData';
import { ActRequestingACopyUI } from '../Sections/ActRequestingACopyUI';
import { ApplicantDataWithQualityUI } from '../Sections/ApplicantDataWithQualityUI';
import { ContactDataUI } from "../Sections/ContactDataUI";
import { ServiceRecipientUI } from '../Sections/ServiceRecipientUI';
import { WayOfProvisionInfoUI } from '../Sections/WayOfProvisionInfoUI';
import {GDPRAgreementUI} from "../Sections/GDPRAgreementUI";

interface ApplicationForCertificateForPersonUIProps extends BaseProps, ApplicationFormContextProviderProps {
  sectionName: string;
}

export class ApplicationForCertifiedCopyUIImpl extends EPZEUBaseComponent<ApplicationForCertificateForPersonUIProps, ApplicationForCertifiedCopy> {
  constructor(props?: ApplicationForCertificateForPersonUIProps) {
    super(props);
    this.setServiceRecipientApplicantType = this.setServiceRecipientApplicantType.bind(this);
    this.setServiceRecipientApplicantCategory = this.setServiceRecipientApplicantCategory.bind(this);
    this.onOfficialPersonSelected = this.onOfficialPersonSelected.bind(this);
    this.onRegistryOfficeSelected = this.onRegistryOfficeSelected.bind(this);
    this.setServiceRecipientSameAsApplicant = this.setServiceRecipientSameAsApplicant.bind(this);
    
    if (!this.model.wayOfProvision)
      this.model.wayOfProvision = new WayOfProvisionBaseData()

    this.model.wayOfProvision.selectedOnCornerDeliveryMethod = true;

    if (this.model.applicantData
      && ((this.model.applicantData.applicantType == ApplicantType.PersonalQuality) || (this.model.applicantData.applicantType == ApplicantType.OfficialPerson))) {
      this.setServiceRecipientSameAsApplicant(); // we set the same reference so that any change on the applicantData tab is reflected on the ServiceRecipient tab.
    }
  }

  renderEdit(): JSX.Element {
    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'applicantData' ?
            <ApplicantDataWithQualityUI {...this.bind(m => m.applicantData)}
              onApplicantTypeChange={this.setServiceRecipientApplicantType}
              onApplicantCategoryChange={this.setServiceRecipientApplicantCategory}
              onOfficialPersonSelected={this.onOfficialPersonSelected}
            /> : null
        }
        {
          this.props.sectionName == 'serviceRecipient' ?
            <ServiceRecipientUI {...this.bind(m => m.serviceRecipient)}
              applicantType={this.model.applicantData.applicantType}
              viewMode={((this.model.applicantData.applicantType == ApplicantType.PersonalQuality)
                || (this.model.applicantData.applicantType == ApplicantType.OfficialPerson))
                ? ViewMode.Display : ViewMode.Edit} /> : null
        }
        {
          this.props.sectionName == 'actRequestingACopy' ?
            <ActRequestingACopyUI {...this.bind(m => m.actRequestingACopy)} onRegistryOfficeSelected={this.onRegistryOfficeSelected} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionInfoUI {...this.bind(m => m.wayOfProvision)} infoMessage='PR_AT_THE_ISSUING_COUNTER_L' /> : null
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
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'applicantData' ?
            <ApplicantDataWithQualityUI {...this.bind(m => m.applicantData)} /> : null
        }
        {
          this.props.sectionName == 'serviceRecipient' ?
            <ServiceRecipientUI {...this.bind(m => m.serviceRecipient)}
              applicantType={this.model.applicantData.applicantType} /> : null
        }
        {
          this.props.sectionName == 'actRequestingACopy' ?
            <ActRequestingACopyUI {...this.bind(m => m.actRequestingACopy)} onRegistryOfficeSelected={this.onRegistryOfficeSelected} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionInfoUI {...this.bind(m => m.wayOfProvision)} infoMessage='PR_AT_THE_ISSUING_COUNTER_L'/> : null
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

  public setServiceRecipientApplicantType(applicantType: ApplicantType): void {
    if ((applicantType == ApplicantType.PersonalQuality) || (applicantType == ApplicantType.OfficialPerson)) {
      this.setServiceRecipientSameAsApplicant();
    } else {
      if (this.model.serviceRecipient && this.model.serviceRecipient.person) {
        this.model.serviceRecipient.person.type = null;
        this.model.serviceRecipient.person.individual = new Individual();
        this.model.serviceRecipient.person.legalEntity = new LegalEntity();
        this.model.serviceRecipient.person.legalEntity.country = new Country();
      }
    }
  }

  // we set the same reference so that any change on the applicantData tab is reflected on the ServiceRecipient tab.
  private setServiceRecipientSameAsApplicant(): void {
    if (!this.model.serviceRecipient)
      this.model.serviceRecipient = new ServiceRecipient();

    if (!this.model.serviceRecipient.person)
      this.model.serviceRecipient.person = new Person();

    this.model.serviceRecipient.person.individual = this.model.applicantData.individual;
    this.model.serviceRecipient.person.type = PersonType.INDIVIDUAL;
  }

  public setServiceRecipientApplicantCategory(applicantCategory: ApplicantCategory): void {
    if (!this.model.serviceRecipient)
      this.model.serviceRecipient = new ServiceRecipient();

    this.model.serviceRecipient.applicantCategory = applicantCategory;
  }

  public onRegistryOfficeSelected(registryOfficeID: string): void {
    NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      var registryOfficeFiltered = registryOffices.filter(filteredRegistryOffice => registryOfficeID == filteredRegistryOffice.id)[0];

      this.model.wayOfProvision.issuingAuthority = registryOfficeFiltered;
    });
  }

  public onOfficialPersonSelected(specialAccessType: string, dataForAnOfficial: string): void {
    if (!this.model.serviceRecipient)
      this.model.serviceRecipient = new ServiceRecipient();

    this.model.serviceRecipient.specialAccessType = specialAccessType;
    this.model.serviceRecipient.dataForAnOfficial = dataForAnOfficial;
  }
}

export const ApplicationForCertifiedCopyUI = withApplicationFormContext(ApplicationForCertifiedCopyUIImpl);
