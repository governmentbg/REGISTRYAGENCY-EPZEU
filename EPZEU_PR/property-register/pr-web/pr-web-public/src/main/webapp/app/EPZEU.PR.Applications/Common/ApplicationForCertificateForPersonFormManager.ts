import { ObjectHelper, userContext } from 'Cnsys.Core';
import { ApplicationFormBase, ApplicationFormBaseManager, ApplicationManagerInitParams } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForPerson } from "../Models/Applications/ApplicationForCertificateForPerson";

export class ApplicationForCertificateForPersonFormManager extends ApplicationFormBaseManager<ApplicationForCertificateForPerson> {

  public init(appJson: any, initParams: ApplicationManagerInitParams, appFormType: number): Promise<ApplicationFormBase> {
    return super.init(appJson, initParams, appFormType).then((res: ApplicationFormBase) => {
      if (ObjectHelper.isNullOrUndefined(this.application.contactData.appEmailAddress) && !ObjectHelper.isNullOrUndefined(userContext.user.email)) {
        this.application.contactData.appEmailAddress = userContext.user.email;
      }
      return res;
    })
  }

  protected createApplication(obj: any): ApplicationForCertificateForPerson {
    return new ApplicationForCertificateForPerson(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.application && this.application.wayOfProvision && this.application.wayOfProvision.serviceTypeId && this.nomApplicationType) {
      price = this.nomApplicationType.prices.filter(price => this.application.wayOfProvision.serviceTypeId == price.epzeuServiceTypeID)[0].price;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return ((this.cost === 0) || (userContext.user.roles.indexOf('PR_APP_UVT_PERSON_FREE') > -1))
  }
}
