import * as React from "react";
import {
  attributesClassFormControl, attributesClassFormControlMaxL10,
  attributesClassFormControlMaxL4,
  attributesClassFormControlMaxL50, attributesClassFormControlMaxL9, AutoComplete,
  Button, Country, Constants,
  EPZEUBaseComponent,
  Nomenclatures,
  ValidationSummaryErrors
} from "EPZEU.Core";
import {NomenclaturesPR, RegistryOffice} from "EPZEU.PR.Core";
import { observer } from "mobx-react";
import { SearchPersonsOfReport } from "../Models/SearchPersonsOfReport";
import { action, observable, runInAction } from "mobx";
import { PersonOfReport } from "../Models/PersonOfReport";
import { ApplicationInfoUI, PersonType, } from "EPZEU.PR.ApplicationBase";
import { SearchPersonsForReportValidator } from "../Models/Validators/SearchPersonsForReportValidator";
import { ObjectHelper, SelectListItem} from "Cnsys.Core";
import { IndividualSearchCriteria } from "../Models/IndividualSearchCriteria";
import { LegalEntitySearchCriteria, SearchModeForLegalEntity } from "../Models/LegalEntitySearchCriteria";
import { SubjectFromReportTableUI } from "./SubjectFromReportTableUI";
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { ApplicationsReportsDataService } from "../Services/ApplicationsReportsDataService";

interface SearchPersonsOfReportUIProps extends AsyncUIProps, BaseProps {
  totalSubjectsOfReportCount?: number;
}

@observer
export class SearchPersonsOfReportUIImpl extends EPZEUBaseComponent<SearchPersonsOfReportUIProps, SearchPersonsOfReport> {
  @observable error: any = null;
  @observable open: boolean;
  @observable private showResults: boolean;
  @observable private persons: PersonOfReport[];
  @observable private _selectListItemsForPersonType: SelectListItem[];
  @observable private countries: Country[];
  @observable _registrationCourts: SelectListItem[];
  @observable private registryOffices: RegistryOffice[];
  @observable private _selectListItemsForLegalEntitySearchMode: SelectListItem[];
  @observable reRender: boolean;


  private _service: ApplicationsReportsDataService;
  private groupName: string;
  private resultsTableRef;
  private criteriaValidator = new SearchPersonsForReportValidator();

  constructor(props?: any) {
    super(props);

    this.persons = [];
    this._service = new ApplicationsReportsDataService();
    this.showResults = false;
    this._selectListItemsForPersonType = [];
    this._registrationCourts = [];
    this.model.items = [];
    this.model.clearErrors();
    this.groupName = ObjectHelper.newGuid();
    this.resultsTableRef = React.createRef();

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCountrySelectOption = this.handleCountrySelectOption.bind(this);
    this.selectCountry = this.selectCountry.bind(this);

    this.getRegistrationCourts = this.getRegistrationCourts.bind(this);
    this.getRegistryOffices = this.getRegistryOffices.bind(this);
    this.getCountries = this.getCountries.bind(this);

    this.onPersonTypeChange = this.onPersonTypeChange.bind(this);
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.onByPartOfName = this.onByPartOfName.bind(this);
    this.onSearchModeChange = this.onSearchModeChange.bind(this);

    this.selectRegistryOffice = this.selectRegistryOffice.bind(this);
    this.clearRegistryOfficeData = this.clearRegistryOfficeData.bind(this);
    this.handleRegistryOfficeSelectOption = this.handleRegistryOfficeSelectOption.bind(this);

    this.getRegistrationCourts();
    this.getRegistryOffices();
    this.initializeAllPersonTypes();
    this.initializeAllSearchModesForLegalEntity();
    this.clear();

    this.model.individualSearchCriteria = new IndividualSearchCriteria();
    this.model.legalEntitySearchCriteria = new LegalEntitySearchCriteria();
  }

  private getCountries(): void {
    this.countries = new Array<Country>();
    this.props.registerAsyncOperation(NomenclaturesPR.getSortedCountries().then(cc => {
      runInAction(() => {
        cc.map(ccChilds => {
          if (ccChilds.code == Constants.BG_COUNTRY_CODE && !this.model.legalEntitySearchCriteria.countryCode) {
            this.model.legalEntitySearchCriteria.countryCode = ccChilds.code;
            this.model.legalEntitySearchCriteria.countryCodeISO = ccChilds.code_ISO3166;
            this.model.legalEntitySearchCriteria.countryID = ccChilds.id;
            this.model.legalEntitySearchCriteria.countryName = ccChilds.name;
          }

          this.countries.push(new Country({ name: ccChilds.name, code: ccChilds.code, code_ISO3166: ccChilds.code_ISO3166 }));
        })
      })
    }));
  }

  private getRegistrationCourts(): void {
    this.props.registerAsyncOperation(NomenclaturesPR.getSortedAuthorities((authority) => authority.authoritySybtype == 2).then(authorities => {
      runInAction(() => {
        authorities.map(authority => {
          this._registrationCourts.push(new SelectListItem(
            {
              selected: false,
              text: authority.authorityName,
              value: authority.authorityID
            }));
        })
      })
    }));
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

  private initializeAllPersonTypes(): void {
    this._selectListItemsForPersonType.push(new SelectListItem({
      selected: false,
      text: this.getResource('GL_INDIVIDUAL_L'),
      value: PersonType.INDIVIDUAL.toString()
    }));
    this._selectListItemsForPersonType.push(new SelectListItem({
      selected: false,
      text: this.getResource('GL_LEGAL_ENTITY_L'),
      value: PersonType.LEGAL_ENTITY.toString()
    }));
  }

  private initializeAllSearchModesForLegalEntity(): void {
    this._selectListItemsForLegalEntitySearchMode = new Array<SelectListItem>();
    this._selectListItemsForLegalEntitySearchMode.push(new SelectListItem({
      selected: false,
      text: this.getResource('PR_SEARCH_WHOLE_FOELD_L'),
      value: SearchModeForLegalEntity.DEFAULT
    }));
    this._selectListItemsForLegalEntitySearchMode.push(new SelectListItem({
      selected: false,
      text: this.getResource('PR_SEARCH_START_OF_FIELD_L'),
      value: SearchModeForLegalEntity.STARTS_WITH
    }));
    this._selectListItemsForLegalEntitySearchMode.push(new SelectListItem({
      selected: false,
      text: this.getResource('PR_SEARCH_ANY_PART_OF_FIELD_L'),
      value: SearchModeForLegalEntity.CONTAINS
    }));
  }

  @action
  private onSearchModeChange(e: any) {
    this.model.legalEntitySearchCriteria.searchModeForLegalEntity = e.target.value;
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
            <h3>{this.getResource("PR_SEARCH_FOR_PERSON_LEGAL_ENTITY_L")}
              <button className="system-button toggle-collapse">
                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
              </button>
            </h3>
          </div>
          <div id="collapsable-content" className={"collapse show"}>
            <div className="card-body">
              {this.model.individualSearchCriteria ?
                <ValidationSummaryErrors errors={this.model.individualSearchCriteria.getModelErrors()} /> : null}
              {this.model.legalEntitySearchCriteria ?
                <ValidationSummaryErrors errors={this.model.legalEntitySearchCriteria.getModelErrors()} /> : null}


              <div className="row">
                <div className="form-group col-md-6 col-xl-4">
                  {this.labelFor(m => m.registryOfficeId, 'PR_REGISTRATION_OFFICE_L')}
                  <AutoComplete {...this.bind(m => m.registryOfficeName)}
                                handleChangeCallback={this.clearRegistryOfficeData}
                                selector={this.selectRegistryOffice}
                                showValue={this.showRegistryOfficeValue}
                                hasSelectedValue={this.model.registryOfficeName && this.model.registryOfficeId && ObjectHelper.isNumber(this.model.registryOfficeId)}
                                placeholder={this.getResource("GL_CHOICE_ALL_L")}
                                handleSelectCallback={this.handleRegistryOfficeSelectOption}
                                triggerLength={0}
                                attributes={attributesClassFormControl}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  {this._selectListItemsForPersonType.map(personType => {
                    return (
                      <div className="custom-control-inline custom-control custom-radio" key={personType.value}>
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

              {this.model.type == PersonType.INDIVIDUAL
                ?
                <fieldset>
                  <ApplicationInfoUI infoTextKey={"PR_APP_00012_I"} />
                  <div className="row">
                    <div className="form-group col-sm-6 col-md-4">
                      {this.labelFor(m => m.individualSearchCriteria.identity, 'PR_GL_00001_L')}
                      {this.textBoxFor(m => m.individualSearchCriteria.identity, attributesClassFormControlMaxL10)}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-sm-6 col-md-4">
                      {this.labelFor(m => m.individualSearchCriteria.firstName, 'GL_PERSON_FIRSTNAME_L')}
                      {this.textBoxFor(m => m.individualSearchCriteria.firstName, attributesClassFormControlMaxL50)}
                    </div>

                    <div className="form-group col-12 order-last inline-control feedback-up">
                      <div className="help-text-inline">{this.getResource('PR_APP_00002_I')}
                      </div>
                    </div>

                    <div className="form-group col-sm-6 col-md-12 order-md-last inline-control">
                      <label className="d-none d-sm-block d-md-none" aria-hidden="true">&nbsp;</label>
                      <div className="form-inline">
                        <div className="custom-control custom-checkbox custom-control-inline">
                          <input type="checkbox" id="by-part-of-name" className="custom-control-input"
                                 onChange={this.onByPartOfName}
                                 checked={this.model.individualSearchCriteria.byPartOfName}></input>
                          <label htmlFor="by-part-of-name"
                                 className="custom-control-label">{this.getResource('PR_SEARCH_BY_PART_OF_FIRST_NAME_L')}</label>
                        </div>
                      </div>
                    </div>

                    <div className="w-100 d-sm-block d-md-none"></div>
                    <div className="form-group col-sm-6 col-md-4">
                      {this.labelFor(m => m.individualSearchCriteria.surName, 'GL_PERSON_SURNAME_L')}
                      {this.textBoxFor(m => m.individualSearchCriteria.surName, attributesClassFormControlMaxL50)}
                    </div>
                    <div className="form-group col-sm-6 col-md-4">
                      {this.labelFor(m => m.individualSearchCriteria.familyName, 'GL_PERSON_FAMILYNAME_L')}
                      {this.textBoxFor(m => m.individualSearchCriteria.familyName, attributesClassFormControlMaxL50)}
                    </div>
                  </div>
                </fieldset>
                : this.model.type == PersonType.LEGAL_ENTITY ?
                  <fieldset>
                    <div className="row">
                      <div className="form-group col-sm-6 col-md-4">
                        {this.labelFor(m => m.legalEntitySearchCriteria.countryID, 'GL_COUNTRY_L')}

                        <AutoComplete {...this.bind(m => m.legalEntitySearchCriteria.countryName)}
                          handleChangeCallback={this.handleCountryChange}
                          selector={this.selectCountry}
                          showValue={this.showCountryValue}
                          hasSelectedValue={this.model.legalEntitySearchCriteria && this.model.legalEntitySearchCriteria.countryCodeISO && this.model.legalEntitySearchCriteria.countryName && this.model.legalEntitySearchCriteria.countryName != "" ? true : false}
                          handleSelectCallback={this.handleCountrySelectOption}
                          triggerLength={1}
                          attributes={attributesClassFormControl}
                        />
                      </div>

                      {this.model.legalEntitySearchCriteria.countryCode == Constants.BG_COUNTRY_CODE ?
                        <>
                          <div className="form-group col-sm-6 col-md-4">
                            {this.labelFor(m => m.legalEntitySearchCriteria.companyIdBulstat, 'PR_GL_COMPANY_ID_BULSTAT_L')}
                            {this.textBoxFor(m => m.legalEntitySearchCriteria.companyIdBulstat, attributesClassFormControlMaxL9)}
                          </div>
                        </>
                        :
                        <div className="form-group col-sm-6 col-md-4">
                          {this.labelFor(m => m.legalEntitySearchCriteria.foreignLegalEntityIdentifier, 'PR_APP_ID_L')}
                          {this.textBoxFor(m => m.legalEntitySearchCriteria.foreignLegalEntityIdentifier, attributesClassFormControl)}
                        </div>
                      }

                    </div>
                    <div className="row">
                      <div className="form-group col-md-8">
                        {this.labelFor(m => m.legalEntitySearchCriteria.companyName, 'PR_GL_COMPANY_NAME_L')}
                        {this.textBoxFor(m => m.legalEntitySearchCriteria.companyName, attributesClassFormControl)}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">

                        {this._selectListItemsForLegalEntitySearchMode.map(searchMode => {
                          return (
                            <div className="custom-control-inline custom-control custom-radio" key={searchMode.value}>
                              <input className={"custom-control-input"}
                                type="radio"
                                onChange={this.onSearchModeChange}
                                id={'search-mode-' + searchMode.value}
                                name={'search-mode-group'}
                                value={searchMode.value}
                                checked={searchMode.value == this.model.legalEntitySearchCriteria.searchModeForLegalEntity.toString()}
                              />
                              <label className={"custom-control-label"}
                                htmlFor={'search-mode-' + searchMode.value}>{searchMode.text}</label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {this.model.legalEntitySearchCriteria.countryCode == Constants.BG_COUNTRY_CODE ?
                      <div className="row">
                        <div className="col-12">
                          {this.labelFor(m => m.legalEntitySearchCriteria.companyCaseNumber, 'PR_COMPANY_CASE_L')}
                        </div>
                      </div>
                      &&
                      <>
                        <div className="row">
                          <div className="col-12">
                            {this.labelFor(m => m.legalEntitySearchCriteria, 'PR_COMPANY_CASE_L')}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-sm-3 col-md-2">
                            {this.labelFor(m => m.legalEntitySearchCriteria.companyCaseNumber, 'GL_NUMBER_L')}
                            {this.textBoxFor(m => m.legalEntitySearchCriteria.companyCaseNumber)}
                          </div>
                          <div className="form-group col-sm-3 col-md-2">
                            {this.labelFor(m => m.legalEntitySearchCriteria.companyCaseYear, 'GL_YEAR_L')}
                            {this.textBoxFor(m => m.legalEntitySearchCriteria.companyCaseYear, attributesClassFormControlMaxL4)}
                          </div>
                          <div className="form-group col-sm-6 col-md-4">
                            {this.labelFor(m => m.legalEntitySearchCriteria.companyCaseCourtId, 'PR_REGISTRATION_COURT_L')}
                            {this.dropDownListFor(m => m.legalEntitySearchCriteria.companyCaseCourtId, this._registrationCourts, attributesClassFormControl, null, true)}
                          </div>
                        </div>
                      </>
                      : null}
                  </fieldset>
                  : null}

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
            <SubjectFromReportTableUI
              {...this.bind(this.model, "personsFromReport")}
              results={this.persons}
              label={"PR_APP_INDIVIDUAL_LEGAL_ENTITY_DATA_L"}
              totalSubjectsOfReportCount={this.props.totalSubjectsOfReportCount}
              ref={this.resultsTableRef}
            ></SubjectFromReportTableUI>
          </div>
          :
          null
        }
      </>)
  }

  renderDisplay(): JSX.Element {
    return (
      <>
      </>)
  }

  @action
  private clear(): void {
    this.clearSearchCriteria();
    this.model.type = null;
    this.model.registryOfficeId = null;
    this.model.registryOfficeName = null;
  }

  @action
  private clearSearchCriteria(): void {
    this.model.clearErrors(true);

    if (this.model.type == PersonType.LEGAL_ENTITY) {
      this.model.legalEntitySearchCriteria.foreignLegalEntityIdentifier = null;
      this.model.legalEntitySearchCriteria.registryOfficeId = null;
      this.model.legalEntitySearchCriteria.countryID = null;
      this.model.legalEntitySearchCriteria.countryName = null;
      this.model.legalEntitySearchCriteria.countryCodeISO = null;
      this.model.legalEntitySearchCriteria.countryCode = null;
      this.model.legalEntitySearchCriteria.companyCaseNumber = null;
      this.model.legalEntitySearchCriteria.companyCaseYear = null;
      this.model.legalEntitySearchCriteria.companyCaseCourtId = null;
      this.model.legalEntitySearchCriteria.companyName = null;
      this.model.legalEntitySearchCriteria.companyIdBulstat = null;
    } else if (this.model.type == PersonType.INDIVIDUAL) {
      this.model.individualSearchCriteria.registryOfficeId = null;
      this.model.individualSearchCriteria.identity = null;
      this.model.individualSearchCriteria.byPartOfName = false;
      this.model.individualSearchCriteria.firstName = null;
      this.model.individualSearchCriteria.surName = null;
      this.model.individualSearchCriteria.familyName = null;
    }
  }

  @action
  private search(): void {
    this.showResults = false;
    this.model.items = [];
    this.persons = [];

    //TODO: Този ререндър ми изглежда безасмислен да се провери без него дали ще работи коректно
    this.reRender = !this.reRender;
    if (this.criteriaValidator.validate(this.model)) {
      this.props.registerAsyncOperation(this._service.searchPersonsForReport(this.model).then((persons) => {

        let promiseArray = [];
        persons.map((person, idx) => {
          promiseArray.push(NomenclaturesPR.getRegistryOffice().then(registryOffice => {
            let registryOfficeFiltered = registryOffice.filter(filteredRegistryOffice => person.registryOffice.id == filteredRegistryOffice.id)[0];
            if (registryOfficeFiltered) {
              persons[idx].registryOffice = registryOfficeFiltered;
            }
          }));

          promiseArray.push(Nomenclatures.getCountries().then(country => {
            if (person.type.toString() == PersonType[PersonType.INDIVIDUAL]) {
              let countryIndividualFiltered = country.filter(filteredCountry => person.individual.personNationality ?
                person.individual.personNationality.code_ISO3166 == filteredCountry.code_ISO3166 : false)[0];
              if (countryIndividualFiltered) {
                person.individual.personNationality.code_ISO3166 = countryIndividualFiltered.code_ISO3166;
                person.individual.personNationality.name = countryIndividualFiltered.name;
                return;
              }
            } else if (person.type.toString() == PersonType[PersonType.LEGAL_ENTITY]) {
              let countryLegalEntityFiltered = country.filter(filteredCountry => person.legalEntity.country.code_ISO3166 == filteredCountry.code_ISO3166)[0];
              if (countryLegalEntityFiltered) {
                person.legalEntity.country.code_ISO3166 = countryLegalEntityFiltered.code_ISO3166;
                person.legalEntity.country.name = countryLegalEntityFiltered.name;
              }
            }
          }));

          if(person.type.toString() == PersonType[PersonType.LEGAL_ENTITY]
            && !ObjectHelper.isNullOrUndefined(person.legalEntity.companyCase)
            && !ObjectHelper.isNullOrUndefined(person.legalEntity.companyCase.registrationCourt)) {
              promiseArray.push(Nomenclatures.getCourts().then(court => {
                let courtFiltered = court.filter(filteredCourt => person.legalEntity.companyCase.registrationCourt.id == filteredCourt.authorityID)[0];
                if (courtFiltered) {
                  person.legalEntity.companyCase.registrationCourt.name = courtFiltered.authorityName;
                }
              }));
          }

        });
        Promise.all(promiseArray).then(() => {
          this.persons = persons;
          this.showResults = true;

          if (this.resultsTableRef.current) {
            //Reset the initial page from previous searches
            this.resultsTableRef.current.goToFirstPage();
          }
        })
      }));
    } else {
      this.showResults = false;
      this.persons = [];
    }
  }

  @action onPersonTypeChange(e: any) {
    this.showResults = false;
    this.persons = [];
    var value = e.target.value;
    this.model.type = value;

    if (value == PersonType.LEGAL_ENTITY.toLocaleString()) {
      this.getCountries();
    }
    this.clearSearchCriteria();
  }

  @action onByPartOfName(): void {
    this.model.individualSearchCriteria.byPartOfName = this.model.individualSearchCriteria.byPartOfName ? false : true;
  }

  @action handleCountrySelectOption(value?: Country) {
    if (value) {
      this.model.legalEntitySearchCriteria.countryCodeISO = value.code_ISO3166;
      this.model.legalEntitySearchCriteria.countryName = value.name;
      this.model.legalEntitySearchCriteria.countryCode = value.code;
      this.model.legalEntitySearchCriteria.foreignLegalEntityIdentifier = null;
      this.model.legalEntitySearchCriteria.companyIdBulstat = null;
      this.model.legalEntitySearchCriteria.companyCaseCourtId = null;
      this.model.legalEntitySearchCriteria.companyCaseNumber = null;
      this.model.legalEntitySearchCriteria.companyCaseYear = null;
    } else {
      this.model.legalEntitySearchCriteria.countryName = null;
      this.model.legalEntitySearchCriteria.countryCode = null;
      this.model.legalEntitySearchCriteria.countryID = null;
    }
  }

  @action handleCountryChange() {
    if (this.model && this.model.legalEntitySearchCriteria.countryName) {
      if (!this.model.legalEntitySearchCriteria.countryName || this.model.legalEntitySearchCriteria.countryName == "") {
        this.model.legalEntitySearchCriteria.countryName = null;
        this.model.legalEntitySearchCriteria.countryName = null;
      }
    }
  }
  selectCountry(value: string): Promise<Country[]> {
    var valueLowerCase = value.toLowerCase();

    if (valueLowerCase.trim() != "")
      return Promise.resolve(this.countries.filter(c => c.name.toLowerCase().indexOf(valueLowerCase) > -1));
    else
      return Promise.resolve([]);
  }

  showCountryValue(value: Country): string {
    return value.name;
  }

  showRegistryOfficeValue(value: RegistryOffice): string {
    return value.name;
  }

  selectRegistryOffice(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    if(valueLowerCase === this.getResource("GL_CHOICE_ALL_L").toLowerCase()) {
      return Promise.resolve(this.registryOffices);
    }
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

export const SearchPersonsOfReportUI = withAsyncFrame(SearchPersonsOfReportUIImpl);
