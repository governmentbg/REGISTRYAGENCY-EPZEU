import { TypeSystem } from 'Cnsys.Core';
import { ApplicationFormBase } from 'EPZEU.PR.ApplicationBase';
import { observable } from 'mobx';
import { moduleContext } from '../../ModuleContext';
import { ApplicantData } from '../Sections/ApplicantData';
import { UpcomingDeal } from '../Sections/UpcomingDeal';
import {GdprAgreement} from "../Sections/GdprAgreement";

@TypeSystem.typeDecorator('ApplicationForUpcomingDeal', moduleContext.moduleName)
export class ApplicationForUpcomingDeal extends ApplicationFormBase {

  @observable private _applicantData: ApplicantData = null;
  @observable private _upcomingDealForProperty: UpcomingDeal = null;
  @observable private _gdprAgreement: GdprAgreement = null;

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator(ApplicantData ? ApplicantData : moduleContext.moduleName + '.' + 'ApplicantData')
  public set applicantData(val: ApplicantData) {
    this._applicantData = val;
  }

  public get applicantData(): ApplicantData {
    return this._applicantData;
  }

  @TypeSystem.propertyDecorator(UpcomingDeal ? UpcomingDeal : moduleContext.moduleName + '.' + 'UpcomingDeal')
  public set upcomingDealForProperty(val: UpcomingDeal) {
    this._upcomingDealForProperty = val;
  }

  public get upcomingDealForProperty(): UpcomingDeal {
    return this._upcomingDealForProperty;
  }

  get gdprAgreement(): GdprAgreement {
    return this._gdprAgreement;
  }

  @TypeSystem.propertyDecorator(GdprAgreement)
  set gdprAgreement(value: GdprAgreement) {
    this._gdprAgreement = value;
  }
}
