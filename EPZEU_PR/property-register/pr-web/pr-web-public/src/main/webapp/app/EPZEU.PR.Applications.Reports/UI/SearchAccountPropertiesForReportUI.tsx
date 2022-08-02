import { ObjectHelper, UIHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControl, AutoComplete, Button, EPZEUBaseComponent, ValidationSummaryErrors } from "EPZEU.Core";
import { ApplicationInfoUI } from "EPZEU.PR.ApplicationBase";
import { NomenclaturesPR, RegistryOffice } from "EPZEU.PR.Core";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { AccountPropertyOfReport } from "../Models/AccountPropertyOfReport";
import { SearchAccountPropertiesForReport } from "../Models/SearchAccountPropertiesForReport";
import { SearchAccountPropertiesForReportValidator } from "../Models/Validators/SearchAccountPropertiesForReportValidator";
import { ApplicationsReportsDataService } from "../Services/ApplicationsReportsDataService";
import { SubjectFromReportTableUI } from "./SubjectFromReportTableUI";

interface SearchAccountsForReportUIProps extends AsyncUIProps, BaseProps {
  totalSubjectsOfReportCount?: number;
}

@observer
export class SearchAccountsForReportUIImpl extends EPZEUBaseComponent<SearchAccountsForReportUIProps, SearchAccountPropertiesForReport> {
  @observable private registryOffices: RegistryOffice[];
  @observable open: boolean;
  @observable showResults: boolean;
  @observable private accounts: AccountPropertyOfReport[];
  @observable reRender: boolean;
  private _service: ApplicationsReportsDataService;
  private groupName: string;
  private resultsTableRef;

  constructor(props?: SearchAccountsForReportUIProps) {
    super(props);

    this.model.clearErrors();
    this.accounts = [];
    this._service = new ApplicationsReportsDataService();
    this.model.items = [];
    this.groupName = ObjectHelper.newGuid();

    this.resultsTableRef = React.createRef();

    this.getRegistryOffices = this.getRegistryOffices.bind(this);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clear = this.clear.bind(this);

    this.showResults = false;

    this.selectRegistryOffice = this.selectRegistryOffice.bind(this);
    this.clearRegistryOfficeData = this.clearRegistryOfficeData.bind(this);
    this.handleRegistryOfficeSelectOption = this.handleRegistryOfficeSelectOption.bind(this);

    this.clear();

    this.getRegistryOffices();
    this.model.cadastralIdentifierForm = true;
    this.model.accountNumberForm = false;
  }

  componentDidMount(): void {
    UIHelper.enableElement('cadastralIdentifierForm');
    UIHelper.disableElement('accountNumberForm');
  }

  private getRegistryOffices(): void {
    this.registryOffices = new Array<RegistryOffice>();
    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      registryOffices.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      this.registryOffices = registryOffices;
    }));
  }

  private toggle() {
    $('#collapsable-content').slideToggle();
  }

  renderEdit(): JSX.Element {
    let reRender = this.reRender;
    return (
      <>
        <div className="card card--search">
          <div className={"card-header"} onClick={this.toggle.bind(this)}>
            <h3>{this.getResource("PR_SEARCH_FOR_ACCOUNT_L")}
              <button className="system-button toggle-collapse">
                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
              </button>
            </h3>
          </div>
          <div id="collapsable-content" className={"collapse show"}>
            <div className="card-body">
              <ValidationSummaryErrors errors={this.model.getModelErrors()} />
              <ApplicationInfoUI infoTextKey={"PR_APP_00082_I"} />
              <div className="row no-gutters">
                <div className="col-auto">
                  <div className="custom-control custom-radio">
                    <input className={"custom-control-input"} type="radio" onChange={this.handleChange}
                      id={this.groupName + '_cadastralIdentifierForm'} name={this.groupName}
                      value={'cadastralIdentifierForm'} checked={this.model.cadastralIdentifierForm} />
                    <label className={"custom-control-label"}
                      htmlFor={this.groupName + '_cadastralIdentifierForm'}></label>
                  </div>
                </div>
                <div className="col">
                  <div id='cadastralIdentifierForm'>
                    <div className="row">
                      <div className="form-group col-md-6 col-xl-4">
                        {this.labelFor(m => m.cadastralIdentifier, 'PR_APP_CADASTRAL_IDENTIFIER_L')}
                        {this.textBoxFor(m => m.cadastralIdentifier, attributesClassFormControl)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hr--report"></hr>
              <div className="row no-gutters">
                <div className="col-auto">
                  <div className="custom-control custom-radio">
                    <input className={"custom-control-input"} type="radio" onChange={this.handleChange}
                      id={this.groupName + '_accountNumberForm'} name={this.groupName} value={'accountNumberForm'}
                      checked={this.model.accountNumberForm} />
                    <label className={"custom-control-label"} htmlFor={this.groupName + '_accountNumberForm'}></label>
                  </div>
                </div>
                <div className="col">
                  <div id='accountNumberForm'>
                    <div className="row">
                      <div className="form-group col-md-6 col-xl-4">
                        {this.labelFor(m => m.accountNumber, 'PR_APP_ACCOUNT_NUMBER_L')}
                        {this.textBoxFor(m => m.accountNumber, attributesClassFormControl)}
                      </div>
                      <div className="form-group col-md-6 col-xl-4">
                        {this.labelFor(m => m.registryOfficeId, 'PR_REGISTRATION_OFFICE_L')}
                        <AutoComplete  {...this.bind(m => m.registryOfficeName)}
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
                  </div>
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
            <SubjectFromReportTableUI {...this.bind(this.model, "accountsFromReport")}
              results={this.accounts}
              label={"PR_APP_PROPERTY_DATA_L"}
              totalSubjectsOfReportCount={this.props.totalSubjectsOfReportCount}
              ref={this.resultsTableRef}
            ></SubjectFromReportTableUI>
          </div>
          :
          null
        }
      </>)
  }

  @action
  private clear(): void {
    this.model.registryOfficeId = null;
    this.model.registryOfficeName = null;
    this.model.cadastralIdentifier = null;
    this.model.accountNumber = null;
    this.model.clearErrors();
  }

  @action
  private search(): void {
    this.model.items = [];
    this.showResults = false;
    this.accounts = [];
    let criteriaValidator = new SearchAccountPropertiesForReportValidator();

    //TODO: Този ререндър ми изглежда безасмислен да се провери без него дали ще работи коректно
    this.reRender = !this.reRender;
    if (criteriaValidator.validate(this.model)) {
      this.prepareModelForRequest();
      this.props.registerAsyncOperation(this._service.searchAccountPropertiesForReport(this.model).then((accountProperties) => {

        let promiseArray = [];
        accountProperties.map((accountProperty, idx) => {

          promiseArray.push(NomenclaturesPR.getRegistryOffice().then(registryOffice => {
            let registryOfficeFiltered = registryOffice.filter(filteredRegistryOffice => accountProperty.registryOffice.id == filteredRegistryOffice.id)[0];
            if (registryOfficeFiltered) {
              accountProperties[idx].registryOffice = registryOfficeFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getPlaces().then(settlement => {
            let placeFiltered = settlement.filter(filteredPlace => accountProperty.settlement.placeId == filteredPlace.placeId)[0];
            if (placeFiltered) {
              accountProperties[idx].settlement = placeFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getPropertyTypes().then(propertyType => {
            let propertyTypeFiltered = propertyType.filter(filteredPropertyType => accountProperty.propertyType.id == filteredPropertyType.id)[0];
            if (propertyTypeFiltered) {
              accountProperties[idx].propertyType = propertyTypeFiltered;
            }
          }));

          promiseArray.push(NomenclaturesPR.getPermanentUsages().then(permanentUsages => {
            let permanentUsageFiltered = permanentUsages.filter(filteredPermUs => accountProperty.permanentUsage.id == filteredPermUs.id)[0];
            if (permanentUsageFiltered) {
              accountProperties[idx].permanentUsage = permanentUsageFiltered;
            }
          }));
        });
        Promise.all(promiseArray).then(() => {
          this.accounts = accountProperties;
          this.showResults = true;
          if (this.resultsTableRef.current) {
            //Reset the initial page from previous searches
            this.resultsTableRef.current.goToFirstPage();
          }
        })
      }));
    } else {
      this.showResults = false;
      this.accounts = [];
    }
  }

  private prepareModelForRequest() {
    if (this.model.accountNumberForm) {
      this.model.cadastralIdentifier = null;
    } else if (this.model.cadastralIdentifierForm) {
      this.model.accountNumber = null;
      this.model.registryOfficeId = null;
    }
  }

  @action
  private handleChange(e: any) {
    if (e.target.value == 'cadastralIdentifierForm') {
      this.model.cadastralIdentifierForm = true;
      this.model.accountNumberForm = false;
      UIHelper.enableElement('cadastralIdentifierForm');
      UIHelper.disableElement('accountNumberForm');
    } else if (e.target.value == 'accountNumberForm') {
      this.model.cadastralIdentifierForm = false;
      this.model.accountNumberForm = true;
      UIHelper.enableElement('accountNumberForm');
      UIHelper.disableElement('cadastralIdentifierForm');
    }
    this.clear();
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

export const SearchAccountPropertiesForReportUI = withAsyncFrame(SearchAccountsForReportUIImpl);
