import * as React from "react";
import {
  attributesClassFormControl,
  AutoComplete,
  Button,
  EPZEUBaseComponent, labelForAttributes,
  ValidationSummary,
  ValidationSummaryStrategy
} from "EPZEU.Core";
import { observer } from "mobx-react";
import { SearchPropertiesForReport } from "../Models/SearchPropertiesForReport";
import { action, observable } from "mobx";
import { ObjectHelper } from "Cnsys.Core";
import {NomenclaturesPR, PlaceNomenclaturePR, RegistryOffice} from "EPZEU.PR.Core";
import { ApplicationInfoUI } from "EPZEU.PR.ApplicationBase";
import { AsyncUIProps, BaseProps, ViewMode, withAsyncFrame } from 'Cnsys.UI.React';
import { SearchPropertiesForReportValidator } from "../Models/Validators/SearchPropertiesForReportValidator";
import { SubjectFromReportTableUI } from "./SubjectFromReportTableUI";
import { PropertyOfReport } from "../Models/PropertyOfReport";
import { ApplicationsReportsDataService } from "../Services/ApplicationsReportsDataService";

interface SearchPropertiesForReportUIProps extends AsyncUIProps, BaseProps {
  totalSubjectsOfReportCount?: number;
}

const MINIMUM_REQUIRED_INFO = ["minimumRequiredInfo"];
const AREA_PROP_NAME = ["area"];

@observer
export class SearchPropertiesForReportUIImpl extends EPZEUBaseComponent<SearchPropertiesForReportUIProps, SearchPropertiesForReport> {
  @observable open: boolean;
  @observable showResults: boolean;
  @observable private registryOffices: RegistryOffice[];
  @observable settlementFull: string = "";
  @observable private properties: PropertyOfReport[];
  @observable reRender: boolean;

  private service: ApplicationsReportsDataService;
  private resultsTableRef;

  constructor(props?: any) {
    super(props);

    this.model.clearErrors();
    this.showResults = false;
    this.properties = [];
    this.model.items = [];
    this.service = new ApplicationsReportsDataService();
    this.resultsTableRef = React.createRef();
    this.getRegistryOffices();
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.selectSettlement = this.selectSettlement.bind(this);
    this.showSettlementValue = this.showSettlementValue.bind(this);
    this.handleSettlementSelectOption = this.handleSettlementSelectOption.bind(this);
    this.clearData = this.clearData.bind(this);

    this.selectRegistryOffice = this.selectRegistryOffice.bind(this);
    this.clearRegistryOfficeData = this.clearRegistryOfficeData.bind(this);
    this.handleRegistryOfficeSelectOption = this.handleRegistryOfficeSelectOption.bind(this);

    this.clear();
  }

  private toggle() {
    $('#collapsable-content').slideToggle();
  }

  componentDidMount() {
    if (this.props.viewMode == ViewMode.Edit) {
      NomenclaturesPR.getPlaces();
    }
  }

  private getRegistryOffices(): void {
    this.registryOffices = new Array<RegistryOffice>();
    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      registryOffices.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.registryOffices = registryOffices;
    }))
  }

  renderEdit(): JSX.Element {
    let reRender = this.reRender;
    return (
      <>

        <div className="card card--search">
          <div className={"card-header"} onClick={this.toggle.bind(this)}>
            <h3>{this.getResource("PR_SEARCH_FOR_PROPERTY_L")}
              <button className="system-button toggle-collapse">
                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
              </button>
            </h3>
          </div>
          <div id="collapsable-content" className={"collapse show"}>
            <div className="card-body">
              <ValidationSummary key="common" {...this.props} propNames={MINIMUM_REQUIRED_INFO}
                strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                model={this.model} />

              <ApplicationInfoUI infoTextKey={"PR_APP_00077_I"} />
              <div className="row">
                <div className="form-group col-sm-6 col-xl-4">
                  {this.labelFor(m => m.cadastralIdentifier, 'PR_APP_CADASTRAL_IDENTIFIER_L')}
                  {this.textBoxFor(m => m.cadastralIdentifier, attributesClassFormControl)}
                </div>
                <div className="w-100 d-md-block d-xl-none"></div>
                <div className="form-group col-sm-6 col-xl-3">
                  {this.labelFor(m => m.accountNumber, 'PR_APP_ACCOUNT_NUMBER_L')}
                  {this.textBoxFor(m => m.accountNumber, attributesClassFormControl)}
                </div>
                <div className="form-group col-sm-6 col-xl-3">
                  {this.labelFor(m => m.oldAccountNumber, 'PR_APP_OLD_ACCOUNT_NUMBER_L')}
                  {this.textBoxFor(m => m.oldAccountNumber, attributesClassFormControl)}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-xl-4">
                  {this.labelFor(m => m.settlementId, 'GL_PLACE_L')}
                  <AutoComplete {...this.bind(m => m.settlementName)}
                    handleChangeCallback={this.clearData}
                    selector={this.selectSettlement}
                    showValue={this.showSettlementValue}
                    hasSelectedValue={this.model.settlementId && this.model.settlementName != "" ? true : false}
                    placeholder={this.getResource("GL_FILL_LEAST_THREE_CHAR_L")}
                    handleSelectCallback={this.handleSettlementSelectOption}
                    attributes={attributesClassFormControl}
                  />
                  <div className="form-text">{this.settlementFull}</div>
                </div>
                <div className="form-group col-md-6">
                  {this.labelFor(m => m.registryOfficeId, 'PR_REGISTRATION_OFFICE_L')}
                  <AutoComplete {...this.bind(m => m.registryOfficeName)}
                                handleChangeCallback={this.clearRegistryOfficeData}
                                selector={this.selectRegistryOffice}
                                showValue={this.showRegistryOfficeValue}
                                hasSelectedValue={this.model.registryOfficeName && this.model.registryOfficeId && ObjectHelper.isNumber(this.model.registryOfficeId)}
                                handleSelectCallback={this.handleRegistryOfficeSelectOption}
                                triggerLength={0}
                                attributes={attributesClassFormControl}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6 col-xl-4">
                  {this.labelFor(m => m.district, 'PR_APP_RESIDENTIAL_DISTRICT_L')}
                  {this.textBoxFor(m => m.district, attributesClassFormControl)}
                </div>
                <div className="form-group col-sm-6 col-xl-3">
                  {this.labelFor(m => m.street, 'GL_STREET_ABBREVATION_L')}
                  {this.textBoxFor(m => m.street, attributesClassFormControl)}
                </div>
                <div className="form-group col-4 col-sm-2 col-xl-1">
                  {this.labelFor(m => m.streetNumber, 'GL_NUMBER_ABBREVATION_L')}
                  {this.textBoxFor(m => m.streetNumber, attributesClassFormControl)}
                </div>
                <div className="form-group col-4 col-sm-2 col-xl-1">
                  {this.labelFor(m => m.building, 'GL_BUILDING_ABBREVATION_L')}
                  {this.textBoxFor(m => m.building, attributesClassFormControl)}
                </div>
                <div className="form-group col-4 col-sm-2 col-xl-1">
                  {this.labelFor(m => m.entrance, 'GL_ENTRANCE_ABBREVATION_L')}
                  {this.textBoxFor(m => m.entrance, attributesClassFormControl)}
                </div>
                <div className="form-group col-4 col-sm-2 col-xl-1">
                  {this.labelFor(m => m.floor, 'GL_FLOOR_ABBREVATION_L')}
                  {this.textBoxFor(m => m.floor, attributesClassFormControl)}
                </div>
                <div className="form-group col-4 col-sm-2 col-xl-1">
                  {this.labelFor(m => m.flat, 'GL_FLAT_ABBREVATION_L')}
                  {this.textBoxFor(m => m.flat, attributesClassFormControl)}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6 col-xl-4">
                  {this.labelFor(m => m.place, 'PR_APP_PLACE_OF_PROPERTY_L')}
                  {this.textBoxFor(m => m.place, attributesClassFormControl)}
                </div>
                <div className="form-group col-sm-6 col-xl-3">
                  {this.labelFor(m => m.cadastreNumber, 'PR_APP_CADASTRE_NUMBER_L')}
                  {this.textBoxFor(m => m.cadastreNumber, attributesClassFormControl)}
                </div>
                <div className="form-group col-sm-6 col-xl-3">
                  {this.labelFor(m => m.plot, 'PR_APP_PLOT_L')}
                  {this.textBoxFor(m => m.plot, attributesClassFormControl)}
                </div>
                <div className="form-group col-sm-6 col-xl-4">
                  <div className="row">
                    <div className="col-12">
                      {this.labelFor(m => m.minArea, 'PR_APP_00030_L')}
                    </div>
                    <ValidationSummary key="areaError" {...this.props} propNames={AREA_PROP_NAME}
                      strategy={ValidationSummaryStrategy.excludeAllExcept}
                      includeErrorsRecursive={true} model={this.model} />

                    <div className="col-6 col-md-4 col-xl-6">
                      <div className="d-flex">
                        {this.labelFor(m => m.minArea, 'PR_APP_AREA_FROM_L', labelForAttributes)}
                        <div>
                          {this.textBoxFor(m => m.minArea, attributesClassFormControl)}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-4 col-xl-6">
                      <div className="d-flex">
                        {this.labelFor(m => m.maxArea, 'PR_APP_AREA_TO_L', labelForAttributes)}
                        <div>
                          {this.textBoxFor(m => m.maxArea, attributesClassFormControl)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  {this.labelFor(m => m.remark, 'PR_APP_PROPERTY_REMARK_L')}
                  {this.textAreaFor(m => m.remark, null, 3, attributesClassFormControl)}
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="button-bar butt">
                <div className="left-side">
                  <Button type="button" className="btn btn-secondary"
                    lableTextKey="GL_CLEAR_L" onClick={this.clear}>
                  </Button>
                </div>
                <div className="right-side">
                  <Button type="submit" className="btn btn-primary"
                    lableTextKey="GL_SEARCH_L" onClick={this.search}>
                    <i className="ui-icon ui-icon-search ci-btn mr-1"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.showResults
          ?
          <div className="card card--borderless">
            <SubjectFromReportTableUI {...this.bind(this.model, "propertiesFromReport")}
              results={this.properties}
              label={"PR_APP_PROPERTY_DATA_L"}
              totalSubjectsOfReportCount={this.props.totalSubjectsOfReportCount}
              ref={this.resultsTableRef}
            ></SubjectFromReportTableUI

            ></div>
          :
          null
        }
      </>)
  }

  @action
  private search(): void {
    this.model.items = [];
    this.properties = [];
    this.showResults = false;
    let criteriaValidator = new SearchPropertiesForReportValidator();
    var valResult = criteriaValidator.validate(this.model);
    //TODO: Този ререндър ми изглежда безасмислен да се провери без него дали ще работи коректно
    this.reRender = !this.reRender;
    if (valResult) {
      this.props.registerAsyncOperation(this.service.searchPropertiesForReport(this.model).then((properties) => {

        let promiseArray = [];
        properties.map((property, idx) => {

          promiseArray.push(NomenclaturesPR.getRegistryOffice().then(registryOffice => {
            let registryOfficeFiltered = registryOffice.filter(filteredRegistryOffice => property.registryOffice.id == filteredRegistryOffice.id)[0];
            if (registryOfficeFiltered) {
              properties[idx].registryOffice = registryOfficeFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getPlaces().then(settlement => {
            let settlementFiltered = settlement.filter(filteredSettlement => property.settlement.placeId == filteredSettlement.placeId)[0];
            if (settlementFiltered) {
              properties[idx].settlement = settlementFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getPropertyTypes().then(propertyType => {
            let propertyTypeFiltered = propertyType.filter(filteredPropertyType => property.propertyType.id == filteredPropertyType.id)[0];
            if (propertyTypeFiltered) {
              properties[idx].propertyType = propertyTypeFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getPermanentUsages().then(permanentUsages => {
            let permanentUsageFiltered = permanentUsages.filter(filteredPermUs => property.permanentUsage.id == filteredPermUs.id)[0];
            if (permanentUsageFiltered) {
              properties[idx].permanentUsage = permanentUsageFiltered;
            }
          }));

        });
        Promise.all(promiseArray).then(() => {
          this.properties = properties;
          this.showResults = true;
          if (this.resultsTableRef.current) {
            //Reset the initial page from previous searches
            this.resultsTableRef.current.goToFirstPage();
          }
        })
      }));
    } else {
      this.showResults = false;
      this.properties = [];
    }

  }

  @action
  private clear(): void {
    this.model.cadastralIdentifier = null;
    this.model.accountNumber = null;
    this.model.oldAccountNumber = null;
    this.model.settlementId = null;
    this.model.settlementName = null;
    this.model.registryOfficeId = null;
    this.model.registryOfficeName = null;
    this.model.district = null;
    this.model.street = null;
    this.model.streetNumber = null;
    this.model.building = null;
    this.model.entrance = null;
    this.model.floor = null;
    this.model.flat = null;
    this.model.place = null;
    this.model.plot = null;
    this.model.cadastreNumber = null;
    this.model.minArea = null;
    this.model.maxArea = null;
    this.model.remark = null;
    this.settlementFull = "";
    this.model.clearErrors();
  }

  @action clearData() {
    this.settlementFull = "";
    this.model.settlementId = null;
    this.model.registryOfficeId = null;
    this.model.registryOfficeName = null;
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

  @action handleSettlementSelectOption(value?: PlaceNomenclaturePR) {
    if (value) {
      this.model.settlementId = value.placeId;
      this.model.settlementName = value.name;
      this.model.registryOfficeId = value.siteId;
      let registryOffices = this.registryOffices.filter(r => r.id === this.model.registryOfficeId);
      let registryOffice = registryOffices && registryOffices.length > 0 ? registryOffices[0] : null;
      if(registryOffice) {

        this.model.registryOfficeName = registryOffice.name;
      }

      this.settlementFull = `${this.getResource('GL_MUNICIPALITY_L')} ${value.placePR.name}, ${this.getResource('GL_REGION_L')} ${value.placePR.name}`;
    } else {
      this.clearData();
    }
  }

  showRegistryOfficeValue(value: RegistryOffice): string {
    return value.name;
  }

  selectRegistryOffice(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    return Promise.resolve(this.registryOffices.filter(v => v.name.toLowerCase().indexOf(valueLowerCase) > -1));
  }

  @action clearRegistryOfficeData() {
    if (this.model) {
      this.model.registryOfficeId = null;
    }
  }

  @action handleRegistryOfficeSelectOption(value?: RegistryOffice) {
    if (value) {
      this.model.registryOfficeId = value.id;
      this.model.registryOfficeName = value.name;
    } else {
      this.model.registryOfficeId = null;
      this.model.registryOfficeName = null;
    }
  }
}

export const SearchPropertiesForReportUI = withAsyncFrame(SearchPropertiesForReportUIImpl);
