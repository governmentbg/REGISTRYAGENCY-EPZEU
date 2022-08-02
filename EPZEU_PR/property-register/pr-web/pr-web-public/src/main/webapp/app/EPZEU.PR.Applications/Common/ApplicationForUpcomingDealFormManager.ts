import { ApplicationFormBaseManager } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForUpcomingDeal } from '../Models/Applications/ApplicationForUpcomingDeal';

export class ApplicationForUpcomingDealFormManager extends ApplicationFormBaseManager<ApplicationForUpcomingDeal> {

  protected createApplication(obj: any): ApplicationForUpcomingDeal {
    return new ApplicationForUpcomingDeal(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.nomApplicationType && this.nomApplicationType.prices) {
      price = this.nomApplicationType.prices[0].price;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return (this.cost == 0);
  }
}
