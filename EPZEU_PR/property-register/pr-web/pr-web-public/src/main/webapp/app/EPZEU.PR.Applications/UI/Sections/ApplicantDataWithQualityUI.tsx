import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ObjectHelper, userContext } from "Cnsys.Core";
import { BaseProps, SelectListItem, withAsyncFrame, AsyncUIProps } from 'Cnsys.UI.React';
import {
  EPZEUBaseComponent, fieldTitleLabelAttributes,
  fieldTittleRequiredAttributes,
  ValidationSummary,
  ValidationSummaryStrategy,
  Nomenclatures, SpecialAccessUserType
} from 'EPZEU.Core';
import { ApplicantCategory, NomenclaturesPR } from 'EPZEU.PR.Core';
import { ApplicantType, ApplicationInfoUI, SectionTitleUI, ValidationSummaryErrorsPreviewUI } from 'EPZEU.PR.ApplicationBase';
import { ApplicantData } from "../../Models/Sections/ApplicantData";
import { IndividualUI } from "../IndividualUI";

const roleAllowingCertCopyToOfficial = 'PR_APP_PROVIDE_CERTCOPY_TO_OFFICIAL';

interface ApplicantDataWithQualityUIProps extends AsyncUIProps, BaseProps {
  onApplicantTypeChange?: (applicantType: ApplicantType) => void;
  onApplicantCategoryChange?: (applicantCategory: ApplicantCategory) => void;
  onOfficialPersonSelected?: (specialAccessType: string, dataForAnOfficial: string) => void;
  isRegisteringUpcomingDeal?: boolean;
}

const APPLICANT_TYPE = ['applicantType'];
const APPLICANT_CATEGORY = ['applicantCategory'];

@observer
export class ApplicantDataWithQualityUIImpl extends EPZEUBaseComponent<ApplicantDataWithQualityUIProps, ApplicantData> {
  private _groupNameForApplicantType: string;
  private _groupNameForApplicantCategory: string;
  @observable private _selectListItemsForApplicantType: SelectListItem[];
  @observable private _selectListItemsForApplicantCategory: SelectListItem[];

  constructor(props?: ApplicantDataWithQualityUIProps) {
    super(props);
    this._selectListItemsForApplicantType = [];
    this._selectListItemsForApplicantCategory = [];
    this._groupNameForApplicantType = ObjectHelper.newGuid();
    this._groupNameForApplicantCategory = ObjectHelper.newGuid();
    this.initializeAllQualityApplicantTypes();

    this.qualityApplicantSelectOption = this.qualityApplicantSelectOption.bind(this);
    this.setSelectListItemsForApplicantCategory = this.setSelectListItemsForApplicantCategory.bind(this);
    this.applicantCategorySelectOption = this.applicantCategorySelectOption.bind(this);
    this.onDataForAnOfficialChange = this.onDataForAnOfficialChange.bind(this);

    if (!this.model.applicantCategory)
      this.model.applicantCategory = new ApplicantCategory();

    if (ObjectHelper.isStringNullOrEmpty(this.model.applicantType)) {
      this.model.applicantType = this.props.isRegisteringUpcomingDeal ? ApplicantType.OfficialPerson : ApplicantType.PersonalQuality;
      if (this.props.onApplicantTypeChange)
        this.props.onApplicantTypeChange(this.model.applicantType);
    }

    if (!ObjectHelper.isStringNullOrEmpty(this.model.applicantType))
      this.setSelectListItemsForApplicantCategory();
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'GL_APPLICANT_DATA_L'} anchor="applicantData" />
        {!this.props.isRegisteringUpcomingDeal && <ApplicationInfoUI infoTextKey={'PR_APP_00001_I'} />}
        <IndividualUI {...this.bind(model => model.individual)} isAppForUpcomingDeal={this.props.isRegisteringUpcomingDeal} />
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.applicantType, 'PR_APPLICANT_TYPE_L', this.props.isRegisteringUpcomingDeal ? fieldTitleLabelAttributes : fieldTittleRequiredAttributes)}
            </div>
          </div>
          <ValidationSummary key="applicantType" {...this.props} propNames={APPLICANT_TYPE}
            strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          />
          <div className="row">
            <div className="col-12 form-group">
              {this.props.isRegisteringUpcomingDeal ?
                <p className="field-text">{(this._selectListItemsForApplicantType.filter(at => at.value == this.model.applicantType.toString()).length == 1) && this._selectListItemsForApplicantType.filter(at => at.value == this.model.applicantType.toString())[0].text}</p>
                :
                this._selectListItemsForApplicantType.map(qualityApplicant => {
                  return (
                    <div className="custom-control custom-radio" key={qualityApplicant.value}>
                      <input className="custom-control-input" type="radio" onChange={this.qualityApplicantSelectOption}
                        id={this._groupNameForApplicantType + qualityApplicant.value} name={this._groupNameForApplicantType}
                        value={qualityApplicant.value}
                        checked={!!this.model.applicantType && this.model.applicantType.toString() == qualityApplicant.value} />
                      <label className="custom-control-label"
                        htmlFor={this._groupNameForApplicantType + qualityApplicant.value}>{qualityApplicant.text}</label>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        {
          (this.model.applicantType != null) &&
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.applicantCategory, this.props.isRegisteringUpcomingDeal ? 'PR_APP_QLTY_OF_PERSON_DEAL_L' : 'PR_APP_QUALITY_OF_PERSON_', fieldTittleRequiredAttributes)}
              </div>
            </div>
            <ValidationSummary key="applicantCategory" {...this.props} propNames={APPLICANT_CATEGORY}
              strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
            />
            <div className="row">
              <div className="col-12 form-group">
                {this._selectListItemsForApplicantCategory.map(applicantCategory => {
                  return (
                    <div className="custom-control custom-radio" key={applicantCategory.value}>
                      <input className="custom-control-input" type="radio" onChange={this.applicantCategorySelectOption}
                        id={this._groupNameForApplicantCategory + applicantCategory.value} name={this._groupNameForApplicantCategory}
                        value={applicantCategory.value}
                        checked={this.model.applicantCategory.id == applicantCategory.value} />
                      <label className="custom-control-label"
                        htmlFor={this._groupNameForApplicantCategory + applicantCategory.value}>{applicantCategory.text}</label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        }
        {
          (this.model.applicantType == ApplicantType.OfficialPerson) &&
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.applicantType, 'EP_USR_EXTRENAL_USER_KIND_L', fieldTitleLabelAttributes)}
              </div>
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <p className='field-text'>{this.model.specialAccessType}</p>
              </div>
            </div>
          </div>
        }
        {
          (this.model.applicantType == ApplicantType.OfficialPerson) &&
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.applicantType, 'PR_DATA_FOR_AN_OFFICIAL_L', fieldTittleRequiredAttributes)}
              </div>
            </div>
            <div className="row">
              <div className="col-12 form-group">
                {this.textAreaFor(m => m.dataForAnOfficial, null, 3, null, this.onDataForAnOfficialChange)}
                <div className='help-text-inline'>
                  <p>{this.getResource('PR_APP_00084_I')}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("GL_APPLICANT_DATA_L")}</h2>

      <IndividualUI {...this.bind(model => model.individual)} />
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APPLICANT_TYPE_L')}</h3>
        <p className="field-text">
          {(ObjectHelper.isStringNullOrEmpty(this.model.applicantType) == false) &&
            this._selectListItemsForApplicantType.filter(item => item.value == this.model.applicantType.toString())[0].text}
        </p>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('applicantType')} />
      </div>
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_QUALITY_OF_PERSON_')}</h3>
        <p className="field-text">
          {
            this.model.applicantCategory && (ObjectHelper.isStringNullOrEmpty(this.model.applicantCategory.id) == false) && (this._selectListItemsForApplicantCategory.length > 0) &&
            this._selectListItemsForApplicantCategory.filter(item => item.value == this.model.applicantCategory.id)[0] &&
            this._selectListItemsForApplicantCategory.filter(item => item.value == this.model.applicantCategory.id)[0].text
          }
        </p>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('applicantCategory')} />
      </div>
      {(ObjectHelper.isStringNullOrEmpty(this.model.specialAccessType) == false) &&
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('EP_USR_EXTRENAL_USER_KIND_L')}</h3>
          <p className="field-text">
            {this.model.specialAccessType}
          </p>
        </div>
      }
      {(ObjectHelper.isStringNullOrEmpty(this.model.dataForAnOfficial) == false) &&
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_DATA_FOR_AN_OFFICIAL_L')}</h3>
          <p className="field-text">
            {this.model.dataForAnOfficial}
          </p>
        </div>
      }
    </>);
  }

  private initializeAllQualityApplicantTypes(): void {
    this._selectListItemsForApplicantType.push({
      selected: false,
      text: this.getResource('PR_IN_PERSONAL_QUALITY_L'),
      value: ApplicantType.PersonalQuality.toString()
    });
    this._selectListItemsForApplicantType.push({
      selected: false,
      text: this.getResource('PR_ATTORNEY_L'),
      value: ApplicantType.Attorney.toString()
    });
    this._selectListItemsForApplicantType.push({
      selected: false,
      text: this.getResource('PR_LEGAL_REPRESENTATIVE_L'),
      value: ApplicantType.LegalRepresentative.toString()
    });

    if ((this.model.applicantType == ApplicantType.OfficialPerson) || (userContext.user.roles.indexOf(roleAllowingCertCopyToOfficial) >= 0) && (ObjectHelper.isStringNullOrEmpty(userContext.user.accessType) == false)) {
      this._selectListItemsForApplicantType.push({
        selected: false,
        text: this.getResource('PR_APP_OFFICIAL_PERSON_L'),
        value: ApplicantType.OfficialPerson.toString()
      });
    }
  }

  @action private qualityApplicantSelectOption(e: any) {
    var value = e.target.value;
    if (value) {
      this.model.applicantType = value;
      this.setSelectListItemsForApplicantCategory();

      this.props.registerAsyncOperation(Nomenclatures.getSpecialAccessUserTypes().then((res: SpecialAccessUserType[]) => {
        if (this.model.applicantType == ApplicantType.OfficialPerson) {
          this.model.specialAccessType = res.filter(r => r.userTypeId === Number(userContext.user.accessType))[0] ? res.filter(r => r.userTypeId === Number(userContext.user.accessType))[0].name : '';
          this.model.dataForAnOfficial = userContext.user.organization;
        } else {
          this.model.specialAccessType = null;
          this.model.dataForAnOfficial = null;
        }

        if (this.props.onOfficialPersonSelected)
          this.props.onOfficialPersonSelected(this.model.specialAccessType, this.model.dataForAnOfficial);
      }));
    }

    this.model.applicantCategory.id = null;
    this.model.applicantCategory.name = null;
    if (this.props.onApplicantTypeChange)
      this.props.onApplicantTypeChange(this.model.applicantType);
  }

  @action private applicantCategorySelectOption(e: any) {
    var value = e.target.value;
    if (!ObjectHelper.isStringNullOrEmpty(value)) {
      var categoriesPromise = this.props.isRegisteringUpcomingDeal ? NomenclaturesPR.getApplicantCategoriesForUpcomingDeal() : NomenclaturesPR.getApplicantCategories();
      this.props.registerAsyncOperation(categoriesPromise.then(categories => {
        let categorySelected = categories.filter(cat => cat.id == value)[0];
        if (this.props.onApplicantCategoryChange)
          this.props.onApplicantCategoryChange(categorySelected);

        this.model.applicantCategory.id = categorySelected.id;
        this.model.applicantCategory.name = categorySelected.name;
      }));
    }
  }

  private onDataForAnOfficialChange(e: any) {
    let data = e.target.value;
    if (this.props.onOfficialPersonSelected)
      this.props.onOfficialPersonSelected(this.model.specialAccessType, data);
  }

  @action private setSelectListItemsForApplicantCategory(): void {
    if (this.props.isRegisteringUpcomingDeal) {
      this.props.registerAsyncOperation(NomenclaturesPR.getApplicantCategoriesForUpcomingDeal().then(categories => {
        runInAction(() => {
          for (var i = 0; i < categories.length; i++) {
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories[i].name,
              value: categories[i].id
            });
          }
        });
      }));
    } else {
      this.props.registerAsyncOperation(NomenclaturesPR.getApplicantCategories().then(categories => {
        runInAction(() => {
          this._selectListItemsForApplicantCategory.splice(0);
          if (this.model.applicantType == ApplicantType.OfficialPerson) {
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000104')[0].name, // Нотариус или помощник-нотариус
              value: categories.filter(c => c.id === '20001100000000000104')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000106')[0].name, // ЧСИ или ДСИ
              value: categories.filter(c => c.id === '20001100000000000106')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000111')[0].name, // ДСИ
              value: categories.filter(c => c.id === '20001100000000000111')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000105')[0].name, //Адвокат, младши адвокат, адвокатски сътрудник в съответната адвокатска колегия (в района на СВ)
              value: categories.filter(c => c.id === '20001100000000000105')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000107')[0].name, // Съдия
              value: categories.filter(c => c.id === '20001100000000000107')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000108')[0].name,
              value: categories.filter(c => c.id === '20001100000000000108')[0].id // Прокурор
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000109')[0].name, // Разследващ орган 
              value: categories.filter(c => c.id === '20001100000000000109')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000110')[0].name, // Лице, оправомощено от специален закон
              value: categories.filter(c => c.id === '20001100000000000110')[0].id
            });
          } else {
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000100')[0].name, // Страна по акта
              value: categories.filter(c => c.id === '20001100000000000100')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000101')[0].name,
              value: categories.filter(c => c.id === '20001100000000000101')[0].id // Праводател, бивш носител на право за имота
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000102')[0].name, // Правоприемник – приобретател по сделка (ФЛ или ЮЛ)
              value: categories.filter(c => c.id === '20001100000000000102')[0].id
            });
            this._selectListItemsForApplicantCategory.push({
              selected: false,
              text: categories.filter(c => c.id === '20001100000000000103')[0].name, // Правоприемник, наследник по закон или завещание
              value: categories.filter(c => c.id === '20001100000000000103')[0].id
            });
          }
        });
      }));
    }
  }
}

export const ApplicantDataWithQualityUI = withAsyncFrame(ApplicantDataWithQualityUIImpl);
