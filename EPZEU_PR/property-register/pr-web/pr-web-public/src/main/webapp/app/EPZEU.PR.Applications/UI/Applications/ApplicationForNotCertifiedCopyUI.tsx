import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { NomenclaturesPR } from 'EPZEU.PR.Core';
import { ApplicationFormContextProviderProps, withApplicationFormContext } from 'EPZEU.PR.ApplicationBase';
import * as React from 'react';
import { ApplicationForNotCertifiedCopy } from '../../Models/Applications/ApplicationForNotCertifiedCopy';
import { ActRequestingACopyUI } from '../Sections/ActRequestingACopyUI';
import { ApplicantDataUI } from "../Sections/AplicantDataUI";
import { ContactDataUI } from "../Sections/ContactDataUI";
import { WayOfProvisionInfoUI } from '../Sections/WayOfProvisionInfoUI';
import { WayOfProvisionBaseData } from '../../Models/Sections/WayOfProvisionBaseData';
import {GDPRAgreementUI} from "../Sections/GDPRAgreementUI";

interface ApplicationForNotCertificateForPersonUIProps extends BaseProps, ApplicationFormContextProviderProps{
  sectionName: string;
}

export class ApplicationForNotCertifiedCopyUIImpl extends EPZEUBaseComponent<ApplicationForNotCertificateForPersonUIProps, ApplicationForNotCertifiedCopy> {
  constructor(props?: ApplicationForNotCertificateForPersonUIProps) {
    super(props);
    this.onRegistryOfficeSelected = this.onRegistryOfficeSelected.bind(this);

    if (!this.model.wayOfProvision)
      this.model.wayOfProvision = new WayOfProvisionBaseData()

    this.model.wayOfProvision.selectedElectronicImageDeliveryMethod = true;
  }

  renderEdit(): JSX.Element {

    return (
      <>
        {
          typeof this.props.sectionName == "undefined" || this.props.sectionName == 'applicantData' ?
            <ApplicantDataUI {...this.bind(m => m.applicantData)} /> : null
        }
        {
          this.props.sectionName == 'actRequestingACopy' ?
            <ActRequestingACopyUI {...this.bind(m => m.actRequestingACopy)} onRegistryOfficeSelected={this.onRegistryOfficeSelected} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionInfoUI {...this.bind(m => m.wayOfProvision)} infoMessage='PR_APP_UNCERT_COPY_ELECTRONICALLY_L' /> : null
        }
        {
          this.props.sectionName == 'contactData' ?
            <ContactDataUI {...this.bind(m => m.contactData)} /> : null
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
          this.props.sectionName == 'applicantData' ?
            <ApplicantDataUI {...this.bind(m => m.applicantData)} /> : null
        }
        {
          this.props.sectionName == 'actRequestingACopy' ?
            <ActRequestingACopyUI {...this.bind(m => m.actRequestingACopy)} onRegistryOfficeSelected={this.onRegistryOfficeSelected} /> : null
        }
        {
          this.props.sectionName == 'wayOfProvision' ?
            <WayOfProvisionInfoUI {...this.bind(m => m.wayOfProvision)} infoMessage='PR_APP_UNCERT_COPY_ELECTRONICALLY_L' /> : null
        }
        {
          this.props.sectionName == 'contactData' ?
            <ContactDataUI {...this.bind(m => m.contactData)} /> : null
        }
        {
          this.props.sectionName == 'gdprAgreement' ?
            <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
        }
      </>);
  }

  public onRegistryOfficeSelected(registryOfficeID: string): void {
    NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      var registryOfficeFiltered = registryOffices.filter(filteredRegistryOffice => registryOfficeID == filteredRegistryOffice.id)[0];
      this.model.wayOfProvision.issuingAuthority = registryOfficeFiltered;
    });
  }
}

export const ApplicationForNotCertifiedCopyUI = withApplicationFormContext(ApplicationForNotCertifiedCopyUIImpl);
