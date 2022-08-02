import * as React from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react'
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { ObjectHelper } from "Cnsys.Core";
import {
  EPZEUBaseComponent,
  Nomenclatures,
  AutoComplete,
  Settlement,
  Area,
  ValidationSummary,
  ValidationSummaryStrategy, attributesClassFormControlMaxL4, attributesClassFormControl
} from 'EPZEU.Core';
import {ValidationSummaryPreviewUI} from 'EPZEU.PR.ApplicationBase';
import {Address} from "../Models/Address";


const EMPTY_STR_AND_ADDRESS = ["", "address."];
const SETTLEMENT_AND_POST_CODE = ['settlement', 'postCode',];

@observer
export class AddressUI extends EPZEUBaseComponent<BaseProps, Address> {
  @observable settlementFull: string = "";

  constructor(props?: any) {
    super(props);

    this.selectSettlement = this.selectSettlement.bind(this);
    this.selectArea = this.selectArea.bind(this);

    this.showAreaValue = this.showAreaValue.bind(this);
    this.showSettlementValue = this.showSettlementValue.bind(this);

    this.handleAreaSelectOption = this.handleAreaSelectOption.bind(this);
    this.handleSettlementSelectOption = this.handleSettlementSelectOption.bind(this);

    this.clearEkkateData = this.clearEkkateData.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
  }

  componentWillMount() {
    if (this.model.settlementName && (!this.model.settlementId && (this.model.settlementId != 0))) {
      Nomenclatures.getEkatteSettlements(s=>s.ekatteCode == this.model.settlementEkatteCode).then((settlements) => {
        this.model.settlementId = settlements[0].id;
      }).then(() => {
        this.fillFullSettlement();
      });
    } else {
      this.fillFullSettlement();
    }
  }

  componentDidUpdate() {
    if (this.model.settlementName && this.model.settlementName != "") {
      Nomenclatures.getEkatteAreas(x => x.settlementID == this.model.settlementId).then((areas) => {
        if (areas && areas.length > 0)
          this.model.hasAreas = true;
      })
    } else
      this.model.hasAreas = false;

    this.fillFullSettlement();
  }

  componentDidMount() {
    if (this.props.viewMode == ViewMode.Edit) {
      Nomenclatures.getEkatteSettlements();
    }
  }

  renderEdit(): JSX.Element {

    return <>
      <ValidationSummary {...this.props} propNames={EMPTY_STR_AND_ADDRESS}
                         strategy={ValidationSummaryStrategy.excludeAllExcept}
                         includeErrorsRecursive={true}/>
      <div className="row">
        <div className="form-group col-sm-6">
          {this.labelFor(m => m.settlementName, 'GL_PLACE_L')}
          <AutoComplete {...this.bind(m => m.settlementName)}
                        handleChangeCallback={this.clearEkkateData}
                        selector={this.selectSettlement}
                        showValue={this.showSettlementValue}
                        hasSelectedValue={this.model.settlementId && this.model.settlementName && this.model.settlementName != "" ? true : false}
                        placeholder={this.getResource("GL_FILL_LEAST_THREE_CHAR_L")}
                        handleSelectCallback={this.handleSettlementSelectOption}
                        attributes={attributesClassFormControl}
          />
          <div className="form-text">{this.model.settlementId ? this.settlementFull : null}</div>
        </div>
        <div className="form-group col-sm-4">
          {this.labelFor(m => m.areaName, 'GL_AREA_L')}
          {!this.model.hasAreas
            ? <input className="form-control" disabled={true}/>
            : <AutoComplete {...this.bind(m => m.areaName)}
                            handleChangeCallback={this.handleAreaChange}
                            selector={this.selectArea}
                            showValue={this.showAreaValue}
                            hasSelectedValue={this.model.areaName && this.model.areaName != "" && this.model.areaId ? true : false}
                            handleSelectCallback={this.handleAreaSelectOption}
                            triggerLength={1}
                            attributes={attributesClassFormControl}
            />
          }
        </div>
        <div className="form-group col-6 col-sm-2">
          {this.labelFor(m => m.postCode, 'GL_POST_CODE_L')}
          {this.textBoxFor(m => m.postCode, attributesClassFormControlMaxL4, this.handlePostalCodeChange)}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-sm-6">
          {this.labelFor(m => m.housingEstate, 'GL_RESIDENCE_ABBREVATION_L')}
          {this.textBoxFor(m => m.housingEstate)}
        </div>
        <div className="form-group col-sm-6">
          {this.labelFor(m => m.street, 'GL_STREET_ABBREVATION_L')}
          {this.textBoxFor(m => m.street)}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-6 col-sm-2">
          {this.labelFor(m => m.streetNumber, 'GL_NUMBER_ABBREVATION_L')}
          {this.textBoxFor(m => m.streetNumber)}
        </div>
        <div className="form-group col-6 col-sm-2">
          {this.labelFor(m => m.block, 'GL_BUILDING_ABBREVATION_L')}
          {this.textBoxFor(m => m.block)}
        </div>
        <div className="form-group col-6 col-sm-2">
          {this.labelFor(m => m.entrance, 'GL_ENTRANCE_ABBREVATION_L')}
          {this.textBoxFor(m => m.entrance)}
        </div>
        <div className="form-group col-6 col-sm-2">
          {this.labelFor(m => m.floor, 'GL_FLOOR_ABBREVATION_L')}
          {this.textBoxFor(m => m.floor)}
        </div>
        <div className="form-group col-6 col-sm-2">
          {this.labelFor(m => m.apartment, 'GL_FLAT_ABBREVATION_L')}
          {this.textBoxFor(m => m.apartment)}
        </div>
      </div>
    </>
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        <div className="field-container">
          <p className="field-text">
            {this.model.regionName && <>{this.getResource('GL_REGION_L').toLocaleLowerCase()} {this.model.regionName + ', '}</>}
            {this.model.municipalityName && <> {this.getResource('GL_MUNICIPALITY_L').toLocaleLowerCase()} {this.model.municipalityName}, </>}
            {this.model.settlementName && <>{this.model.settlementName + ', '}</>}

          </p>
          <ValidationSummaryPreviewUI key="settlement" {...this.props}
                                      propNames={SETTLEMENT_AND_POST_CODE}
                                      strategy={ValidationSummaryStrategy.excludeAllExcept}
                                      includeErrorsRecursive={true}
                                      model={this.model}/>
          <p className="field-text">
            {this.model.areaName && <>{this.model.areaName}, </>}
            {this.model.postCode && <>{this.getResource("GL_POST_CODE_L") + this.model.postCode + ', '}</>}
            {this.model.housingEstate && <>{this.getResource('GL_RESIDENCE_ABBREVATION_L').toLocaleLowerCase()} {this.model.housingEstate}</>}
          </p>
          <p className="field-text">
            {this.model.street && <>{this.getResource('GL_STREET_ABBREVATION_L').toLocaleLowerCase()} {this.model.street} </>}
            {this.model.streetNumber && <> <span>№</span> {this.model.streetNumber}</>}
            {this.model.block && <>{this.getResource('GL_BUILDING_ABBREVATION_L').toLocaleLowerCase()} {this.model.block} </>}
            {this.model.entrance && <>{this.getResource('GL_ENTRANCE_ABBREVATION_L').toLocaleLowerCase()} {this.model.entrance} </>}
            {this.model.floor && <>{this.getResource('GL_FLOOR_ABBREVATION_L').toLocaleLowerCase()} {this.model.floor} </>}
            {this.model.apartment && <>{this.getResource('GL_FLAT_ABBREVATION_L').toLocaleLowerCase()} {this.model.apartment} </>}
          </p>
        </div>
      </>
    );
  }

  @action handlePostalCodeChange(event: any, value: string) {
    if (!ObjectHelper.isStringNullOrEmpty(value) && /^\d+$/.test(value)) {
      this.model.postCode = parseInt(value.replace(/\D/g, ''));
    }
  }

  @action handleAreaChange() {
    if (!this.model.areaName || this.model.areaName == "") {
      this.model.areaId = null;
      this.model.areaEkatteCode = null;
    }
  }

  selectSettlement(value: string): Promise<Settlement[]> {
    var valueLowerCase = value.toLowerCase();
    valueLowerCase = valueLowerCase.replace(/гр.\s+|с.\s+/, "");

    if (valueLowerCase.trim() != "")
      return Nomenclatures.getEkatteSettlements().then(s => s.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) == 0));
    else
      return Promise.resolve([]);
  }

  showSettlementValue(value: Settlement): string {
    return `${this.getResource('GL_REGION_ABBREVATION_L')} ${value.municipality.district.name},  ${this.getResource('GL_MUNICIPALITY_ABBREVATION_L')}. ${value.municipality.name} ${value.settlementType + " " + value.name} `;
  }

  @action clearEkkateData() {
    this.model.settlementId = null;
    this.model.settlementEkatteCode = null;

    this.model.municipalityName = null;
    this.model.municipalityId = null;
    this.model.municipalityEkatteCode = null;

    this.model.regionName = null;
    this.model.regionId = null;
    this.model.regionEkatteCode = null;

    this.model.areaName = null;
    this.model.areaId = null;
    this.model.areaEkatteCode = null;

    this.model.hasAreas = false;
    this.model.postCode = null;
    this.model.housingEstate = null;
    this.model.street = null;
    this.model.streetNumber = null;
    this.model.block = null;
    this.model.entrance = null;
    this.model.floor = null;
    this.model.apartment = null;
    this.settlementFull = "";
  }

  @action handleSettlementSelectOption(value?: Settlement) {
    if (value) {
      this.model.settlementName = value.settlementType + " " + value.name;
      this.model.settlementId = value.id;
      this.model.settlementEkatteCode = value.ekatteCode;

      this.model.municipalityName = value.municipality.name;
      this.model.municipalityId = value.municipalityID;
      this.model.municipalityEkatteCode = value.municipality.ekatteCode;
      //In EPZEU EKATTE nomenclatures district is used in context of region
      this.model.regionName = value.municipality.district.name;
      this.model.regionId = value.municipality.districtID;
      this.model.regionEkatteCode = value.municipality.district.ekatteCode;

      this.settlementFull = `${this.getResource('GL_MUNICIPALITY_L')} ${value.municipality.name}, ${this.getResource('GL_REGION_L')} ${value.municipality.district.name}`;
      this.model.areaName = null;
      this.model.hasAreas = value.areas && value.areas.length > 0
    } else {
      this.clearEkkateData();
    }
  }

  selectArea(value: string): Promise<Area[]> {
    var valueLowerCase = value.toLowerCase();
    valueLowerCase = valueLowerCase.replace(/р-н\s+/, "");

    if (valueLowerCase.trim() != "")
      return Nomenclatures.getEkatteAreas(s => s.settlementID == this.model.settlementId).then((areas) => areas.filter((area) =>
        (area.name.replace(/р-н\s+/, "").toLowerCase()).indexOf(valueLowerCase) > -1));
    else
      return Promise.resolve([]);
  }

  showAreaValue(value: Area): string {
    return value.name;
  }

  @action handleAreaSelectOption(value?: Area) {
    if (value) {
      this.model.areaName = value.name;
      this.model.areaId = value.id;
      this.model.areaEkatteCode = value.ekatteCode;
    } else {
      this.model.areaName = null;
      this.model.areaId = null;
      this.model.areaEkatteCode = null;
    }
  }

  private fillFullSettlement() {
    if (this.props.viewMode == ViewMode.Edit && this.model.settlementId && !this.settlementFull) {

      Nomenclatures.getEkatteSettlements(x => x.id == this.model.settlementId).then((settlement) => {
        this.settlementFull = `${this.getResource('GL_MUNICIPALITY_L')} ${settlement[0].municipality.name}, ${this.getResource('GL_REGION_L')} ${settlement[0].municipality.district.name}`;
      })
    }
  }
}
