import * as React from 'react';
import { userContext, ObjectHelper } from "Cnsys.Core";
import { BaseProps, withAsyncFrame, AsyncUIProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, Nomenclatures, SpecialAccessUserType } from 'EPZEU.Core';
import { ApplicantType, ApplicationFormContextProviderProps, withApplicationFormContext } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForUpcomingDeal } from '../../Models/Applications/ApplicationForUpcomingDeal';
import { ApplicantData } from '../../Models/Sections/ApplicantData';
import { ApplicantDataWithQualityUI } from '../Sections/ApplicantDataWithQualityUI';
import { UpcomingDealUI } from "../Sections/UpcomingDealUI";
import {GDPRAgreementUI} from "../Sections/GDPRAgreementUI";

const roleAllowingRegistrationOfUpcomingDeal = 'PR_APP_FUT_DEAL_DECL';
const roleOfAdminForReports = 'PR_APP_ADMIN_REPORTS';

interface ApplicationForCertificateForPersonUIProps extends AsyncUIProps, BaseProps, ApplicationFormContextProviderProps {
  sectionName: string;
}

export class ApplicationForUpcomingDealUIImpl extends EPZEUBaseComponent<ApplicationForCertificateForPersonUIProps, ApplicationForUpcomingDeal> {
  private _isAllowedToRegisterDeal: boolean;

  constructor(props?: ApplicationForCertificateForPersonUIProps) {
    super(props);
    if (!this.model.applicantData)
      this.model.applicantData = new ApplicantData();

    if ((userContext.user.roles.indexOf(roleAllowingRegistrationOfUpcomingDeal) >= 0) && (ObjectHelper.isStringNullOrEmpty(userContext.user.accessType) == false)) {
      this._isAllowedToRegisterDeal = true;
      this.model.applicantData.applicantType = ApplicantType.OfficialPerson;

      this.props.registerAsyncOperation(Nomenclatures.getSpecialAccessUserTypes().then((res: SpecialAccessUserType[]) => {
        this.model.applicantData.specialAccessType = res.filter(r => r.userTypeId === Number(userContext.user.accessType))[0] ? res.filter(r => r.userTypeId === Number(userContext.user.accessType))[0].name : '';
      }));
      if (ObjectHelper.isStringNullOrEmpty(this.model.applicantData.dataForAnOfficial)) {
        this.model.applicantData.dataForAnOfficial = userContext.user.organization;
      }
    }
  }
  renderEdit(): JSX.Element {
    return (
      this._isAllowedToRegisterDeal ?
        <>
          {
            typeof this.props.sectionName == "undefined" || this.props.sectionName == 'applicantData' ?
              <ApplicantDataWithQualityUI {...this.bind(m => m.applicantData)} isRegisteringUpcomingDeal={true} /> : null
          }
          {
            this.props.sectionName == 'upcomingDealForProperty' ?
              <UpcomingDealUI {...this.bind(m => m.upcomingDealForProperty)} /> : null
          }
          {
            this.props.sectionName == 'gdprAgreement' ?
              <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
          }
        </> : <div>{this.getResource('PR_APP_00114_E')}</div>
    );
  }

  renderDisplay(): JSX.Element {
    let isAllowedToViewRegisterDealApplication = userContext.user.roles.indexOf(roleOfAdminForReports) >= 0;
    return (
      (this._isAllowedToRegisterDeal || isAllowedToViewRegisterDealApplication) ?
        <>
          {
            typeof this.props.sectionName == "undefined" || this.props.sectionName == 'applicantData' ?
              <ApplicantDataWithQualityUI {...this.bind(m => m.applicantData)} isRegisteringUpcomingDeal={true} /> : null
          }
          {
            this.props.sectionName == 'upcomingDealForProperty' ?
              <UpcomingDealUI {...this.bind(m => m.upcomingDealForProperty)} /> : null
          }
          {
            this.props.sectionName == 'gdprAgreement' ?
              <GDPRAgreementUI {...this.bind(m => m.gdprAgreement)}/> : null
          }
        </> : <> {this.props.sectionName == 'applicantData' ? <div>{this.getResource('PR_APP_00114_E')}</div> : null} </>
    );
  }
}
export const ApplicationForUpcomingDealUI = withApplicationFormContext(withAsyncFrame(ApplicationForUpcomingDealUIImpl));
