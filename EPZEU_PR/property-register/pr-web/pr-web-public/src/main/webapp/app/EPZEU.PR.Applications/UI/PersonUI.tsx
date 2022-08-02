import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseProps, SelectListItem } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, fieldTittleRequiredAttributes, ValidationSummary, ValidationSummaryErrors, ValidationSummaryStrategy } from 'EPZEU.Core'
import { observable, action, } from 'mobx';
import { IndividualUI } from './IndividualUI';
import { Person } from '../Models/Person';
import { ValidationSummaryPreviewUI, Country, PersonType, SectionTitleUI } from 'EPZEU.PR.ApplicationBase';
import { ObjectHelper } from "Cnsys.Core";
import { Individual } from "../Models/Individual";
import { LegalEntity } from "../Models/LegalEntity";
import { LegalEntityUI } from "./LegalEntityUI";

interface PersonProps extends BaseProps {
  showCompanyCase?: boolean;
  requestedPerson?: boolean;
  hideLabelPersonType?: boolean;
  haveBulstat?: boolean;
  infoTextKeyForIndividual?: string;
  infoTextKeyForLegalEntity?: string;
  isCorrectiveApplication?: boolean;
  isIdentityOptional?: boolean;
  sectionTitle?: string;
  onPersonTypeChange?: () => void;
}

const TYPE = ['type'];

@observer export class PersonUI extends EPZEUBaseComponent<PersonProps, Person> {
  private groupName: string;

  @observable private _selectListItemsForPersonType: SelectListItem[];

  constructor(props?: any) {
    super(props);

    this.onPersonTypeChange = this.onPersonTypeChange.bind(this);

    this.groupName = ObjectHelper.newGuid();
    this._selectListItemsForPersonType = [];
    this.initializeAllPersonTypes();
  }

  private initializeAllPersonTypes(): void {
    this._selectListItemsForPersonType.push({
      selected: false,
      text: this.getResource('GL_INDIVIDUAL_L'),
      value: PersonType.INDIVIDUAL.toString()
    });
    this._selectListItemsForPersonType.push({
      selected: false,
      text: this.getResource('GL_LEGAL_ENTITY_L'),
      value: PersonType.LEGAL_ENTITY.toString()
    });
  }

  renderEdit(): JSX.Element {
    return <>
      {!ObjectHelper.isNullOrUndefined(this.props.sectionTitle) ?
        <SectionTitleUI titleKey={this.props.sectionTitle} anchor="requestedPerson" />
        : null}
      <div className="field-container">
        <ValidationSummaryErrors errors={this.model.getModelErrors()} />
        <ValidationSummary key="type" {...this.props} propNames={TYPE}
          strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
        />
        {this.props.hideLabelPersonType ? null :
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.type, 'GL_PERSON_TYPE_L', fieldTittleRequiredAttributes)}
            </div>
          </div>}

        <div className="row">
          <div className="col-12 form-group">
            {this._selectListItemsForPersonType.map(personType => {
              return (
                <div className="custom-control custom-radio" key={personType.value}>
                  <input className={"custom-control-input"} type="radio" onChange={this.onPersonTypeChange}
                    id={this.groupName + personType.value} name={this.groupName}
                    value={personType.value}
                    checked={!!this.model.type && this.model.type.toLocaleString() == personType.value} />
                  <label className={"custom-control-label"}
                    htmlFor={this.groupName + personType.value}>{personType.text}</label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {this.model.type == PersonType.INDIVIDUAL
        ?
        <IndividualUI {...this.bind(m => m.individual)} infoTextKey={this.props.infoTextKeyForIndividual} haveBulstat={this.props.haveBulstat} isBirthPlaceRequired={true} isIdentityOptional={this.props.isIdentityOptional} isCorrectiveApplication={this.props.isCorrectiveApplication} />
        : this.model.type == PersonType.LEGAL_ENTITY ?
          <LegalEntityUI {...this.bind(m => m.legalEntity)} infoTextKey={this.props.infoTextKeyForLegalEntity} showCompanyCase={this.props.showCompanyCase} isCorrectiveApplication={this.props.isCorrectiveApplication} /> : null
      }
    </>
  }

  @action onPersonTypeChange(e: any) {
    var value = e.target.value;
    if (!this.props.isCorrectiveApplication) {
      this.model.type = value;
      if (value == PersonType.INDIVIDUAL.toLocaleString()) {
        this.model.individual = new Individual();
        if (this.model && this.model.legalEntity) {
          this.model.legalEntity = null;
        }
      } else {
        this.model.legalEntity = new LegalEntity();
        this.model.legalEntity.country = new Country();
        if (this.model && this.model.individual) {
          this.model.individual = null;
        }
      }
      this.props.onPersonTypeChange && this.props.onPersonTypeChange();
    }
  }

  renderDisplay(): JSX.Element {
    return <>
      {!ObjectHelper.isNullOrUndefined(this.props.sectionTitle) ?
        <h2 className="section-title section-title--preview">{this.getResource(this.props.sectionTitle)}</h2>
        : null}
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('GL_PERSON_TYPE_L')}</h3>
        <p className="field-text">
          {this.model.type && <> {this._selectListItemsForPersonType.filter(e => e.value == this.model.type.toLocaleString())[0].text}</>}
        </p>
        <ValidationSummaryPreviewUI key="type" {...this.props} propNames={TYPE}
          strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          model={this.model} />
      </div>

      {this.model.type == PersonType.INDIVIDUAL
        ?
        <IndividualUI {...this.bind(m => m.individual)} infoTextKey={this.props.infoTextKeyForIndividual} haveBulstat={this.props.haveBulstat} isBirthPlaceRequired={true} isIdentityOptional={this.props.isIdentityOptional} />
        :
        this.model.type == PersonType.LEGAL_ENTITY ?
          <LegalEntityUI {...this.bind(m => m.legalEntity)} showCompanyCase={this.props.showCompanyCase} /> : null
      }
    </>
  }
}
