import { ObjectHelper, userContext } from "Cnsys.Core";
import { ApplicationFormBase, ApplicationFormBaseManager, ApplicationManagerInitParams, ApplicationProcessContextType, IApplicationFormManager } from 'EPZEU.PR.ApplicationBase';
import { NomenclaturesPR, RegistryOffice, ApplicationFormTypes } from "EPZEU.PR.Core";
import { ApplicationForCertificateForPeriod } from "../Models/Applications/ApplicationForCertificateForPeriod";

export class ApplicationForCertificateForPeriodFormManager extends ApplicationFormBaseManager<ApplicationForCertificateForPeriod> implements IApplicationFormManager{

  public init(appJson: any, initParams: ApplicationManagerInitParams, appFormType: number): Promise<ApplicationFormBase> {
    return super.init(appJson, initParams, appFormType).then((res: ApplicationFormBase) => {
      if (ObjectHelper.isNullOrUndefined(this.application.contactData.appEmailAddress) && !ObjectHelper.isNullOrUndefined(userContext.user.email)) {
        this.application.contactData.appEmailAddress = userContext.user.email;
      }
      return res;
    })
  }

  protected createApplication(obj: any): ApplicationForCertificateForPeriod {
    return new ApplicationForCertificateForPeriod(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.application && this.application.wayOfProvision && this.application.wayOfProvision.serviceTypeId && this.nomApplicationType) {
      price = this.nomApplicationType.prices.filter(price => this.application.wayOfProvision.serviceTypeId == price.epzeuServiceTypeID)[0].price;
    }
    return price;
  }

  public getRegistryOffice(): Promise<RegistryOffice>{
    if (this.processContext.contextType == ApplicationProcessContextType.Edit) {
      if (this.application.requestedProperty && this.application.requestedProperty.settlement && this.application.requestedProperty.settlement.siteId) {
        return NomenclaturesPR.getRegistryOffice().then(registryOffices => {
          return registryOffices.filter(filteredRegistryOffice => this.application.requestedProperty.settlement.siteId == filteredRegistryOffice.id)[0];
        })
      } else {
        return Promise.resolve(null);
      }
    } else {
      return Promise.resolve(this.application.wayOfProvision.issuingAuthority)
    }
  }

  public getIssuingAuthority(): Promise<RegistryOffice> {
    if (this.processContext.contextType == ApplicationProcessContextType.Edit) {
      if (this.application.wayOfProvision && this.application.wayOfProvision.issuingAuthority && this.application.wayOfProvision.issuingAuthority.id) {
        return NomenclaturesPR.getRegistryOffice().then(registryOffices => {
          return registryOffices.filter(filteredRegistryOffice => this.application.wayOfProvision.issuingAuthority.id == filteredRegistryOffice.id)[0];
        })
      } else {
        return Promise.resolve(null);
      }
    } else {
      return Promise.resolve(this.application.wayOfProvision.issuingAuthority)
    }
  }

  public get isTaxFree(): boolean {
    let role;
    if (this.application.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson) {
      role = 'PR_APP_UVT_PERIOD_PERSON_FREE';
    } else if (this.application.appFormType == ApplicationFormTypes.ApplicationForCertificateForPeriodForProperty) {
      role = 'PR_APP_UVT_PERIOD_PROPERTY_FREE';
    }
    return ((this.cost === 0) || (userContext.user.roles.indexOf(role) > -1));
  }
}
