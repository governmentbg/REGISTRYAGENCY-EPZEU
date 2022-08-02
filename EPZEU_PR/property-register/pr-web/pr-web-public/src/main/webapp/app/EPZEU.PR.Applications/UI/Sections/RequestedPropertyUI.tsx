import * as React from 'react';
import { ObjectHelper, SelectListItem } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { attributesClassFieldTittlePreview, attributesClassFormControl, AutoComplete, EPZEUBaseComponent, fieldTitleLabelAttributes, fieldTittleRequiredAttributes, ValidationSummaryErrors, ValidationSummaryStrategy } from 'EPZEU.Core';
import { NomenclaturesPR, RegistryOffice, PlaceNomenclaturePR,} from 'EPZEU.PR.Core'
import {
  ApplicationInfoUI,  
  SectionTitleUI,  
  ValidationSummaryPreviewUI,
  ValidationSummaryErrorsPreviewUI,
  withApplicationFormContext,
  ApplicationFormContextProviderProps 
} from 'EPZEU.PR.ApplicationBase';
import { RequestedProperty } from "../../Models/Sections/RequestedProperty";

import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { IApplicationForCertificateForPropertyFormManager } from "../../Common/ApplicationForCertificateForPropertyFormManager";

interface RequestedPropertyUIProps extends AsyncUIProps, BaseProps, ApplicationFormContextProviderProps {
  isCorrectiveApplication?: boolean;
}

const SETTLEMENT_NAME = ['settlement.name'];
const TYPE_ID = ['type.id'];

@observer
export class RequestedPropertyUIImpl extends EPZEUBaseComponent<RequestedPropertyUIProps, RequestedProperty> {
  static readonly LAND = "10000500000000000086";
  static readonly BUILDING = "10000500000000000087";
  static readonly PRIVATE_PROPERTY_IN_BUILDING = "10000500000000000088";

  @observable private propertyTypes: SelectListItem[];
  @observable settlementFull: string = "";
  @observable private issuingAuthority : RegistryOffice;

  constructor(props?: RequestedPropertyUIProps) {
    super(props);

    this.selectSettlement = this.selectSettlement.bind(this);
    this.showSettlementValue = this.showSettlementValue.bind(this);
    this.handleSettlementSelectOption = this.handleSettlementSelectOption.bind(this);
    this.clearData = this.clearData.bind(this);
    this.handlePropertyTypeSelectOption = this.handlePropertyTypeSelectOption.bind(this);

    this.defaultSettlementSelectOption();

    this.getPropertyTypes();

    if(this.props.isCorrectiveApplication){
      (this.props.applicationManager as IApplicationForCertificateForPropertyFormManager).getIssuingAuthority().bind(this).then(ro=>
        this.issuingAuthority = ro);
    }

  }

  defaultSettlementSelectOption(): void {
    if (this.model.settlement.name) {
      NomenclaturesPR.getPlaces().then(s => s.filter(s => s.placeId === this.model.settlement.placeId)).then(settlement =>
        settlement.map(s => this.handleSettlementSelectOption(s)));
    }
  }

  @action private getPropertyTypes(): void {
    this.propertyTypes = new Array<SelectListItem>();
    let that = this;
    this.props.registerAsyncOperation(NomenclaturesPR.getPropertyTypes().then(propertyTypes => {
      if (this.props.isCorrectiveApplication && this.model.type && propertyTypes.filter(r => r.id == this.model.type.id)[0]) {
        // There may have been a change in the nomenclature since the initial application was processed. So, we update it in the correction application.
        // Otherwise, the server would return error (because of the invalid nomenclature element), but the user wouldn't know what is the problem because
        // he/she would see the new value/name of the element (dropdowns only take the id of the element
        // and then visualise the value for this id from the nomenclature, not the real value / name which is set in the model)!
        this.model.type.name = propertyTypes.filter(r => r.id == this.model.type.id)[0].name;
      }
      propertyTypes.map(propertyType => {
        that.propertyTypes.push(new SelectListItem({
          selected: false,
          text: propertyType.name,
          value: propertyType.id
        }))
      })
    }));
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_REQUESTED_PROPERTY_L'}/>

        <div className="field-container">
          <div className="row">
            <div className="col-sm-6">
              {this.labelFor(m => m.type, 'PR_APP_KIND_OF_PROPERTY_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.dropDownListFor(m => m.type.id, this.propertyTypes, attributesClassFormControl, this.handlePropertyTypeSelectOption, true)}
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.settlement.placeId, 'GL_PLACE_L', fieldTittleRequiredAttributes)}
              <AutoComplete {...this.bind(m => m.settlement.name)}
                                handleChangeCallback={this.clearData}
                                selector={this.selectSettlement}
                                showValue={this.showSettlementValue}
                                hasSelectedValue={this.model.settlement && this.model.settlement.placeId && this.model.settlement.name != "" ? true : false}
                                placeholder={this.getResource("GL_FILL_LEAST_THREE_CHAR_L")}
                                handleSelectCallback={this.handleSettlementSelectOption}
                                attributes={attributesClassFormControl}
              />
              <div className="form-text">{this.settlementFull}</div>
            </div>
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.countrySide, 'PR_APP_PLACE_OF_PROPERTY_L', fieldTitleLabelAttributes)}
              {this.textBoxFor(m => m.countrySide, attributesClassFormControl)}
            </div>
          </div>
        </div>
        <ValidationSummaryErrors errors={this.model.getModelErrors()}/>
        <ValidationSummaryErrors errors={this.model.getPropertyErrors('isIssuingAuthorityChange')}/>
        <div className="field-container">
          <div className="row">
            <div className="col-sm-6">
              {this.labelFor(m => m.cadastralId, 'PR_APP_CADASTRAL_IDENTIFIER_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.textBoxFor(m => m.cadastralId, attributesClassFormControl)}
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.accountNumber, 'PR_APP_ACCOUNT_NUMBER_L', fieldTitleLabelAttributes)}
              {this.textBoxFor(m => m.accountNumber, attributesClassFormControl)}
            </div>
            <div className="form-group col-sm-6">
              {this.labelFor(m => m.oldAccountNumber, 'PR_APP_OLD_ACCOUNT_NUMBER_L', fieldTitleLabelAttributes)}
              {this.textBoxFor(m => m.oldAccountNumber, attributesClassFormControl)}
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="col-sm-6">
              {this.labelFor(m => m.areaByDocuments, 'PR_APP_00030_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              <div>
                {this.textBoxFor(m => m.areaByDocuments, attributesClassFormControl)}
              </div>
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="col-sm-12">
              {this.labelFor(m => m.propertyRemark, 'PR_APP_PROPERTY_REMARK_L', fieldTitleLabelAttributes)}
            </div>
          </div>

          {this.model.type.id == RequestedPropertyUIImpl.LAND ?
            <ApplicationInfoUI infoTextKey={'PR_APP_00031_I'}/> : null}
          {this.model.type.id == RequestedPropertyUIImpl.BUILDING ?
            <ApplicationInfoUI infoTextKey={'PR_APP_00060_I'}/> : null}
          {this.model.type.id == RequestedPropertyUIImpl.PRIVATE_PROPERTY_IN_BUILDING ?
            <ApplicationInfoUI infoTextKey={'PR_APP_00061_I'}/> : null}

          <div className="row">
            <div className="form-group col-sm-12">
              <div>
                {this.textAreaFor(m => m.propertyRemark, null, 5, attributesClassFormControl)}
              </div>
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="col">
              {this.labelFor(m => m.propertyLimits, 'PR_APP_PROPERTY_LIMITS_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              {this.textAreaFor(m => m.propertyLimits, null, 5, attributesClassFormControl)}
            </div>
          </div>
        </div>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_REQUESTED_PROPERTY_L")}</h2>

      <div className="field-container">
        {this.labelFor(m => m.type, "PR_APP_KIND_OF_PROPERTY_L", attributesClassFieldTittlePreview)}
        <p className="field-text">
          {this.model.type && this.model.type.name}
        </p>
        <ValidationSummaryPreviewUI  {...this.props} propNames={TYPE_ID}
                                     strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                                     model={this.model}/>
      </div>
      <div className="field-container">
        {this.labelFor(m => m.settlement, "GL_PLACE_L", attributesClassFieldTittlePreview)}
        <p className="field-text">
          {this.model.settlement && this.model.settlement.name}
          {this.settlementFull ? ", " + this.settlementFull : ""}
        </p>
        <ValidationSummaryPreviewUI  {...this.props} propNames={SETTLEMENT_NAME}
                                     strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} model={this.model}/>
        <ValidationSummaryPreviewUI  {...this.props} propNames={["isIssuingAuthorityChange"]}
                                     strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} model={this.model}/>
      </div>
      {this.model.countrySide ?
        <div className="field-container">
          {this.labelFor(m => m.countrySide, "PR_APP_PLACE_OF_PROPERTY_L", attributesClassFieldTittlePreview)}
          <p className="field-text">
            {this.model.countrySide}
          </p>
        </div>
        : null}
      {this.model.cadastralId ?
        <div className="field-container">
          {this.labelFor(m => m.cadastralId, "PR_APP_CADASTRAL_IDENTIFIER_L", attributesClassFieldTittlePreview)}
          <p className="field-text">
            {this.model.cadastralId}
          </p>
        </div>
        : null}
      {this.model.accountNumber ?
        <div className="field-container">
          {this.labelFor(m => m.accountNumber, "PR_APP_ACCOUNT_NUMBER_L", attributesClassFieldTittlePreview)}
          <p className="field-text">
            {this.model.accountNumber}
          </p>
        </div>
        : null}
      {this.model.oldAccountNumber ?
        <div className="field-container">
          {this.labelFor(m => m.oldAccountNumber, "PR_APP_OLD_ACCOUNT_NUMBER_L", attributesClassFieldTittlePreview)}
          <p className="field-text">
            {this.model.oldAccountNumber}
          </p>
        </div>
        : null}
      <div className="field-container">
        {this.labelFor(m => m.areaByDocuments, "PR_APP_00030_L", attributesClassFieldTittlePreview)}
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('areaByDocuments')}/>
        <p className="field-text">
          {this.model.areaByDocuments}
        </p>
      </div>
      {this.model.propertyRemark ?
        <div className="field-container">
          {this.labelFor(m => m.propertyRemark, "PR_APP_PROPERTY_REMARK_L", attributesClassFieldTittlePreview)}
          <p className="field-text">
            {this.model.propertyRemark}
          </p>
        </div>
        : null}
      <div className="field-container">
        {this.labelFor(m => m.propertyLimits, "PR_APP_PROPERTY_LIMITS_L", attributesClassFieldTittlePreview)}
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('propertyLimits')}/>
        <p className="field-text">
          {this.model.propertyLimits}
        </p>
      </div>
    </>);
  }

  @action handlePropertyTypeSelectOption(e: any) {
    var value = e.target.value;
    if (value) {
      NomenclaturesPR.getPropertyTypes().then(property => {
        var propertyFiltered = property.filter(filteredProperty => value == filteredProperty.id)[0];

        runInAction(() => {
          this.model.type.name = propertyFiltered.name;
          this.model.type.id = propertyFiltered.id;
        })
      });
    } else {
      this.model.type.name = null;
      this.model.type.id = null;
    }
  }

  selectSettlement(value: string): Promise<PlaceNomenclaturePR[]> {
    var valueLowerCase = value.toLowerCase();

    if (valueLowerCase.trim() != "") {
      let set = NomenclaturesPR.getPlaces().then(s => s.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) > -1));
      return set;
    } else {
      return Promise.resolve([]);
    }
  }

  showSettlementValue(value: PlaceNomenclaturePR): string {
    return `${this.getResource('GL_REGION_ABBREVATION_L')} ${value.placePR.placePR.name},  ${this.getResource('GL_MUNICIPALITY_ABBREVATION_L')} ${value.placePR.name} ${value.name}`;
  }

  @action clearData() {
    this.settlementFull = "";
    this.model.settlement.placeId = null;
    this.model.settlement.siteId = null;
  }

  @action handleSettlementSelectOption(value?: PlaceNomenclaturePR) {
    if (value) {
      this.model.settlement.placeId = value.placeId;
      this.model.settlement.name = value.name;
      if(this.props.isCorrectiveApplication) {
        if (this.issuingAuthority && this.issuingAuthority.id != value.siteId) {
          this.model.isIssuingAuthorityChange = true;
          if(!this.model.getPropertyErrors("isIssuingAuthorityChange")){
            this.model.addError("isIssuingAuthorityChange", this.getResource('PR_APP_00086_E'));
          }
        } else if(this.issuingAuthority && this.issuingAuthority.id == value.siteId) {
          this.model.isIssuingAuthorityChange = false;
        }
      }
      this.model.settlement.siteId = value.siteId;
      this.model.settlement.placePR = value.placePR;
      this.model.settlement.type = value.type;
      this.model.settlement.parentId = value.parentId;
      this.model.settlement.ekatte = value.ekatte;

      this.settlementFull = `${this.getResource('GL_MUNICIPALITY_L')} ${value.placePR.name}, ${this.getResource('GL_REGION_L')} ${value.placePR.placePR.name}`;
    } else {
      this.clearData();
    }
  }

  @action handleAreaByDocumentsChange(event: any, value: string) {
    if (!ObjectHelper.isStringNullOrEmpty(value)) {
      this.model.areaByDocuments = parseInt(value.replace(/\D/g, ''));
    }
  }
}

export const RequestedPropertyUI = withApplicationFormContext(withAsyncFrame(RequestedPropertyUIImpl));
