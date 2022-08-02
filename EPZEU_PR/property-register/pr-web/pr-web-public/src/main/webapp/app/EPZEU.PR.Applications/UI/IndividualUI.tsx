import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { NomenclaturesPR, Constants } from 'EPZEU.PR.Core';
import {
  attributesClassFormControlMaxL10,
  attributesClassFormControlMaxL50,
  attributesClassFormControlMaxL9, AutoComplete, Country,
  EPZEUBaseComponent,
  fieldTitleLabelAttributes,
  fieldTittleRequiredAttributes,
  ValidationSummaryErrors,
  ValidationSummaryStrategy,
  attributesClassFormControlDisabled, attributesClassFormControl
} from 'EPZEU.Core';
import { ObjectHelper } from 'Cnsys.Core';
import {
  ValidationSummaryPreviewUI,
  CoreValidators,
  ApplicationInfoUI,
  ValidationSummaryErrorsPreviewUI,
  IndentTypes,
  InputInfoUI,
} from 'EPZEU.PR.ApplicationBase';
import { Country as PersonNationality } from "EPZEU.PR.ApplicationBase";
import { Individual } from '../Models/Individual';

interface IndividualProps extends BaseProps, AsyncUIProps {
  infoTextKey?: string;
  haveBulstat?: boolean;
  isAppForUpcomingDeal?: boolean;
  isBirthPlaceRequired?: boolean;
  isIdentityOptional?: boolean;
  isCorrectiveApplication?: boolean;
}

const IDENTITY_FIRST_NAME_SURNAME_FAMILY_NAME = ['identity', 'name.firstName', 'name.surName', 'name.familyName'];
const PERSON_NATIONALITY_NAME = ['personNationality.name'];

@observer export class IndividualUIImpl extends EPZEUBaseComponent<IndividualProps, Individual> {
  @observable private countries: Country[];

  constructor(props?: any) {
    super(props);

    this.props.registerAsyncOperation(this.getCountries().then((countries: Country[]) => {
      if (this.props.isAppForUpcomingDeal) {
        this.setCountryByCountryCode(Constants.BG_COUNTRY_CODE);
      }
      if (ObjectHelper.isStringNullOrEmpty(this.model.personNationality.name) && !ObjectHelper.isStringNullOrEmpty(this.model.personNationality.code_ISO3166)) {
        this.setCountryByCountryCode(this.model.personNationality.code_ISO3166);
      }
    }));
    this.handleCountrySelectOption = this.handleCountrySelectOption.bind(this);
    this.handlePersonNationalityChange = this.handlePersonNationalityChange.bind(this);
    this.selectNationality = this.selectNationality.bind(this);
  }

  private setCountryByCountryCode(countryCode: number) {
    let country = this.countries.filter(c => c.code_ISO3166 == countryCode)[0];
    this.model.personNationality.name = country.name;
    this.model.personNationality.code_ISO3166 = country.code_ISO3166;
  }

  private getCountries(): Promise<Country[]> {
    this.countries = new Array<Country>();
    return NomenclaturesPR.getSortedCountries().then(cc => {
      this.countries = cc;
      return cc;
    });
  }

  renderEdit(): JSX.Element {
    return <>
      {(ObjectHelper.isStringNullOrEmpty(this.props.infoTextKey) == false) && <ApplicationInfoUI infoTextKey={this.props.infoTextKey} />}
      <div className="field-container">
        <div className="row">
          <div className="col-sm-6">
            {this.labelFor(m => m.personNationality.code_ISO3166, 'GL_PERSON_NATIONALITY_L', fieldTittleRequiredAttributes)}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-6">
            {this.props.isAppForUpcomingDeal ?
              this.textBoxFor(m => m.personNationality.name, attributesClassFormControlDisabled)
              :
              <AutoComplete {...this.bind(m => m.personNationality.name)}
                handleChangeCallback={this.handlePersonNationalityChange}
                selector={this.selectNationality}
                showValue={this.showNationalityValue}
                hasSelectedValue={this.model.personNationality && this.model.personNationality.code_ISO3166
                  && this.model.personNationality.name && this.model.personNationality.name != "" ? true : false}
                handleSelectCallback={this.handleCountrySelectOption}
                triggerLength={1}
                attributes={attributesClassFormControl}
              />
            }
          </div>
        </div>
      </div>
      <div className="field-container">
        <div className="row">
          <div className="form-group col-sm-6">
            {this.labelFor(m => m.identity, this.props.isAppForUpcomingDeal ? 'GL_BULGARIAN_PERSON_ID_L' : 'PR_GL_00001_L', this.props.isIdentityOptional ? fieldTitleLabelAttributes : fieldTittleRequiredAttributes)}
            {this.props.isCorrectiveApplication ?
              <div className="form-text">{this.model.identity}</div>
              :
              this.textBoxFor(m => m.identity, attributesClassFormControlMaxL10)
            }
            {!this.props.isAppForUpcomingDeal && <InputInfoUI infoTextKey={'PR_GL_00001_I'} />}
          </div>
          {this.props.haveBulstat ?
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.bulstat, 'GL_BULSTAT_L', fieldTitleLabelAttributes)}
              {this.textBoxFor(m => m.bulstat, attributesClassFormControlMaxL9)}
            </div>
            : null}
        </div>
      </div>
      <div className="field-container">
        <div className="row">
          <div className="form-group col-sm-4">
            {this.labelFor(m => m.name.firstName, 'GL_PERSON_FIRSTNAME_L', fieldTittleRequiredAttributes)}
            {this.textBoxFor(m => m.name.firstName, attributesClassFormControlMaxL50)}
          </div>
          <div className="form-group col-sm-4">
            {this.labelFor(m => m.name.surName, 'GL_PERSON_SURNAME_L', fieldTitleLabelAttributes)}
            {this.textBoxFor(m => m.name.surName, attributesClassFormControlMaxL50)}
          </div>
          <div className="form-group col-sm-4">
            {this.labelFor(m => m.name.familyName, 'GL_PERSON_FAMILYNAME_L', fieldTittleRequiredAttributes)}
            {this.textBoxFor(m => m.name.familyName, attributesClassFormControlMaxL50)}
          </div>
          {!this.props.isAppForUpcomingDeal &&
            <div className="form-group col feedback-up">
              <div className="help-text-inline">{this.getResource('PR_APP_00002_I')}
              </div>
            </div>
          }
        </div>
      </div>
      {!this.props.isAppForUpcomingDeal &&
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.birthPlace, 'GL_BIRTHPLACE_L', fieldTitleLabelAttributes)}
              {
                this.model.birthPlace && <ValidationSummaryErrors errors={this.model.birthPlace.getModelErrors()} />
              }
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.birthPlace.country, 'GL_COUNTRY_L')}
              {this.textBoxFor(m => m.birthPlace.country)}
            </div>
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.birthPlace.place, 'GL_PLACE_L')}
              {this.textBoxFor(m => m.birthPlace.place)}
            </div>
          </div>
        </div>
      }
    </>
  }

  renderDisplay(): JSX.Element {
    let identityType = CoreValidators.getIdentType(this.model.identity);

    let identityTypeValue = identityType != IndentTypes.Undefined ?
      identityType == IndentTypes.EGN ? <>{this.getResource('GL_BULGARIAN_PERSON_ID_L') + ': ' + this.model.identity}</> :
        identityType == IndentTypes.LNCH ? <>{this.getResource('GL_FOREIGN_PERSON_ID_L') + ': ' + this.model.identity}</> :
          identityType == IndentTypes.BirthDate ? <>{this.getResource('GL_BIRTH_DATE_L') + ': ' + this.model.identity}</> : null : null;

    return (
      <>
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('GL_PERSON_NATIONALITY_L')}</h3>
          <p className="field-text">
            {this.model.personNationality && this.model.personNationality.name}
          </p>
          <ValidationSummaryPreviewUI key="personNationality.name" {...this.props} propNames={PERSON_NATIONALITY_NAME}
            strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
            model={this.model} />
        </div>
        {this.model.name ?
          <div className="field-container">
            <p className="field-text">
              {this.model.name.firstName && <>{this.model.name.firstName + ' '}</>}
              {this.model.name.surName && <>{this.model.name.surName + ' '}</>}
              {this.model.name.familyName && <>{this.model.name.familyName}</>}
              {(this.model.name && (this.model.name.firstName || this.model.name.surName || this.model.name.familyName)) && <></>}
              {this.model.identity ? <>, </> : null}
              {this.model.identity && identityTypeValue}
              {this.model.bulstat && <>{', ' + this.getResource('GL_BULSTAT_L') + ': ' + this.model.bulstat}</>}
            </p>
            {!this.props.isIdentityOptional && !(this.model.identity && CoreValidators.getIdentType(this.model.identity) != IndentTypes.Undefined) && <h3 className="field-title field-title--preview">{this.getResource('PR_GL_00001_L')}</h3>}
            <ValidationSummaryPreviewUI key="individual" {...this.props}
              propNames={IDENTITY_FIRST_NAME_SURNAME_FAMILY_NAME}
              strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
              model={this.model} />

            {this.model.getPropertyErrors('bulstat').length != 0 ?
              <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('bulstat')} />
              : null
            }

          </div>
          : null}
        {(this.model.birthPlace && (this.model.birthPlace.country || this.model.birthPlace.place)) ?
          <div className="field-container">
            <h3 className="field-title field-title--preview">{this.getResource('GL_BIRTHPLACE_L')}</h3>
            <p className="field-text">
              {this.model.birthPlace.country && <>{this.model.birthPlace.country}</>}
              {this.model.birthPlace.place && <>{(this.model.birthPlace.country ? ", " : "") + this.model.birthPlace.place}</>}
            </p>
            <ValidationSummaryErrorsPreviewUI errors={this.model.birthPlace.getModelErrors()} />
          </div>
          : null}
        {(this.model.identity && CoreValidators.getIdentType(this.model.identity) == IndentTypes.BirthDate)
          && !(this.model.birthPlace && this.model.birthPlace.country && this.model.birthPlace.place) ?
          <div className="field-container">
            {!this.props.isBirthPlaceRequired ? <h3 className="field-title field-title--preview">{this.getResource('GL_BIRTHPLACE_L')}</h3> : null}
            <ValidationSummaryErrorsPreviewUI errors={this.model.birthPlace.getModelErrors()} />
          </div>
          : null}
      </>
    );
  }

  @action handleCountrySelectOption(value?: Country) {

    if (value) {
      this.model.personNationality.name = value.name;
      this.model.personNationality.code_ISO3166 = value.code_ISO3166;
    }
    else {
      this.model.personNationality.name = null;
      this.model.personNationality.code_ISO3166 = null;
    }
  }

  selectNationality(value: string): Promise<Country[]> {
    var valueLowerCase = value.toLowerCase();

    if (valueLowerCase.trim() != "")
      return Promise.resolve(this.countries.filter(c => c.name.toLowerCase().indexOf(valueLowerCase) > -1));
    else
      return Promise.resolve([]);
  }

  showNationalityValue(value: Country): string {
    return value.name;
  }

  @action handlePersonNationalityChange() {
    if (this.model && this.model.personNationality) {
      this.model.personNationality.code_ISO3166 = null;
    }
  }

}

export const IndividualUI = withAsyncFrame(IndividualUIImpl);
