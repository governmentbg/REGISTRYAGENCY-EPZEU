import { ApplicationFormBaseManager, ApplicationManagerInitParams, ApplicationFormBase } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertifiedCopy } from '../Models/Applications/ApplicationForCertifiedCopy';
import { userContext, ObjectHelper } from 'Cnsys.Core';

export class ApplicationForCertifiedCopyFormManager extends ApplicationFormBaseManager<ApplicationForCertifiedCopy> {

  public init(appJson: any, initParams: ApplicationManagerInitParams, appFormType: number): Promise<ApplicationFormBase> {
    return super.init(appJson, initParams, appFormType).then((res: ApplicationFormBase) => {
      if (ObjectHelper.isNullOrUndefined(this.application.contactData.appEmailAddress) && !ObjectHelper.isNullOrUndefined(userContext.user.email)) {
        this.application.contactData.appEmailAddress = userContext.user.email;
      }
      return res;
    })
  }

  protected createApplication(obj: any): ApplicationForCertifiedCopy {
    return new ApplicationForCertifiedCopy(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.nomApplicationType && this.nomApplicationType.prices) {
      price = this.nomApplicationType.prices[0].price;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return ((this.cost === 0) || (userContext.user.roles.indexOf('PR_APP_CERTCOPY_FREE') > -1)) 
  }
}
