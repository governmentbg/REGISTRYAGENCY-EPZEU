import { ObjectHelper, userContext } from 'Cnsys.Core';
import { ApplicationFormBase, ApplicationFormBaseManager, ApplicationManagerInitParams } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForNotCertifiedCopy } from '../Models/Applications/ApplicationForNotCertifiedCopy';

export class ApplicationForNotCertifiedCopyFormManager extends ApplicationFormBaseManager<ApplicationForNotCertifiedCopy> {

  public init(appJson: any, initParams: ApplicationManagerInitParams, appFormType: number): Promise<ApplicationFormBase> {
    return super.init(appJson, initParams, appFormType).then((res: ApplicationFormBase) => {
      if (ObjectHelper.isNullOrUndefined(this.application.contactData.appEmailAddress) && !ObjectHelper.isNullOrUndefined(userContext.user.email)) {
        this.application.contactData.appEmailAddress = userContext.user.email;
      }
      return res;
    })
  }

  protected createApplication(obj: any): ApplicationForNotCertifiedCopy {
    return new ApplicationForNotCertifiedCopy(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.nomApplicationType && this.nomApplicationType.prices) {
      price = this.nomApplicationType.prices[0].price;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return ((this.cost === 0) || (userContext.user.roles.indexOf('PR_APP_UNCERTCOPY_FREE') > -1))
  }
}
