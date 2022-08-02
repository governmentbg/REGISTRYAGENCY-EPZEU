import { ObjectHelper, SelectListItem, BindableReference } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, SelectListItem as ISelectListItem, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { attributesClassFormControl, AutoComplete, Button, Date, EPZEUBaseComponent, ValidationSummaryErrors } from "EPZEU.Core";
import { NomenclaturesPR, ApplicationTypePR, ApplicationStatus, RegistryOffice } from "EPZEU.PR.Core";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ApplicationStatusCheck } from "../../Models/ApplicationStatusCheck";
import { ApplicationStatusCheckValidator } from "../../Models/Validators/ApplicationStatusCheckValidator";
import { ReportsDataService } from "../../Services/ReportsDataService";
import { ApplicationStatusResult, ReceptionTypes } from "../../Models/ApplicationStatusResult";

interface ApplicationStatusCheckUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

@observer
class ApplicationStatusCheckUIImpl extends EPZEUBaseComponent<ApplicationStatusCheckUIProps, ApplicationStatusCheck> {
  private _applicationTypeForNotCertifiedCopy = 76; // В заявление за незаверен препис НЕ трябва да се показва пояснителен текст към статус "С постановен отказ".
  private _registerTypeForReportsID = '1'; // id  на регистър "Регистър Справки чрез отдалечен достъп" - той не трябва да се показва в UI-a.
  private _registerTypeForUpcomingDealsID = '2'; // id  на регистър "Регистър Предстоящи сделки" - той не трябва да се показва в UI-a.
  private _registerTypeForComplaintsID = '10000800000000015194'; // id  на регистър "Жалби" - той не трябва да се показва в UI-a.
  private _registerTypeForRefusalsID = '10000800000000001405'; // id  на регистър "Откази" - той не трябва да се показва в UI-a.
  private _registeredUpcomingDealStatusID = '7'; // id  на статус 'Регистрирана'. По изискване трябва да се показва 'Регистрирана предстояща сделка', а не 'Регистрирана', както е в номенклатурата!
  private _reportsService: ReportsDataService;
  @observable private _registerSelectOptions: ISelectListItem[] = [];
  @observable private _registryOfficesSelectOptions: SelectListItem[];
  @observable private _applicationTypes: ApplicationTypePR[] = [];
  @observable private _applicationStatuses: ApplicationStatus[] = [];
  @observable private _result: ApplicationStatusResult;
  @observable private _foundNoResult: boolean;
  private _cmpUniqueId: string;
  @observable private registryOfficeName: string = '';

  constructor(props: ApplicationStatusCheckUIProps) {
    super(props);
    this.getRegisterTypes = this.getRegisterTypes.bind(this);
    this.search = this.search.bind(this);
    this.getRegistryOffices = this.getRegistryOffices.bind(this);
    this.onRegistryOfficeSelected = this.onRegistryOfficeSelected.bind(this);
    this.onRegisterSelected = this.onRegisterSelected.bind(this);
    this.clear = this.clear.bind(this);
    this.onSelectApplicationRegistration = this.onSelectApplicationRegistration.bind(this);
    this.onSelectApplicationNumber = this.onSelectApplicationNumber.bind(this);
    this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
    this.documentKeyPress = this.documentKeyPress.bind(this);
    this.handleRegistryOfficeSelectOption = this.handleRegistryOfficeSelectOption.bind(this);
    this.clearData = this.clearData.bind(this);
    this.selectRegistryOffice = this.selectRegistryOffice.bind(this);

    this.model = new ApplicationStatusCheck();
    this._cmpUniqueId = ObjectHelper.newGuid();
    this.validators = [];
    this.validators.push(new ApplicationStatusCheckValidator());
    this.model.isSearchByApplicationNumberSelected = false;

    this._reportsService = new ReportsDataService();
    this.getRegisterTypes();
    this.getRegistryOffices();

    NomenclaturesPR.getApplicationTypes().then((appTypes: ApplicationTypePR[]) => {
      this._applicationTypes = appTypes;
    }); // calling them now async so that the cache is ready when the user gets a search result.

    NomenclaturesPR.getApplicationStatuses().bind(this).then(aStatuses => {
      this._applicationStatuses = aStatuses;
    }); // calling them now async so that the cache is ready when the user gets a search result.
  }

  componentDidMount() {
    document.addEventListener('keypress', this.documentKeyPress, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.documentKeyPress, true);
  }

  private getRegisterTypes(): void {
    this._registerSelectOptions = new Array<SelectListItem>();
    let that = this;
    this.props.registerAsyncOperation(NomenclaturesPR.getRegisterTypes().then(registerTypes => {
      runInAction(() => {
        that._registerSelectOptions = registerTypes.filter(r => (r.id != this._registerTypeForReportsID)
          && (r.id != this._registerTypeForComplaintsID)
          && (r.id != this._registerTypeForRefusalsID)
          && (r.id != this._registerTypeForUpcomingDealsID)).map(registerType => {
            return new SelectListItem({
              selected: false,
              text: registerType.name,
              value: registerType.id
            });
          })
      })
    }));
  }

  private getRegistryOffices(): void {
    this._registryOfficesSelectOptions = new Array<SelectListItem>();
    let that = this;
    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      runInAction(() => {

        registryOffices.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        that._registryOfficesSelectOptions = registryOffices.map(registryOffice => {
          return new SelectListItem({
            selected: false,
            text: registryOffice.name,
            value: registryOffice.id
          });
        })
      })
    }));
  }

  render(): JSX.Element {

    return (
      <>
        <div className="search-box search-box--report">
          <div className="card card--search card--collapsible">
            <div id={`colapsable-triger-${this._cmpUniqueId}`} className="card-header">
              <h3>{this.getResource('GL_SEARCHING_L')}</h3>
              <button className="system-button toggle-collapse" onClick={() => { this.onCollapseCriteria(`collapsable-content-${this._cmpUniqueId}`) }}>
                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
              </button>
            </div>
            <div id={`collapsable-content-${this._cmpUniqueId}`} className="collapse" style={{ display: 'block' }}>
              <div className="card-body">
                <div className="help-text">
                  <p>{this.getResource('PR_APPL_ID_I')}</p>
                </div>
                <ValidationSummaryErrors key="registrationParams" errors={this.model.getModelErrors()} />
                <div className="row no-gutters">
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio"
                        id={'registration'} name='searchSelect'
                        checked={!this.model.isSearchByApplicationNumberSelected} onChange={this.onSelectApplicationRegistration} />
                      <label className="custom-control-label" htmlFor={'registration'}></label>
                    </div>
                  </div>
                  <div className="col">
                    <fieldset id="SEARCH_FORM_1" disabled={this.model.isSearchByApplicationNumberSelected}>
                      <div className="row">
                        <div className="col-12">
                          <label className="field-subtitle field-subtitle--search" htmlFor="registration">{this.getResource('PR_REG_DATA_L')}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-6 col-xl">
                          {this.labelFor(m => m, 'PR_APPLICATION_REGNUM_L')}
                          {this.textBoxFor(m => m.regNumber, attributesClassFormControl)}
                        </div>

                        <div className="col-auto col-sm-6 col-xl-auto">
                          <div className="row">
                            <div className="col-12">
                              {this.labelFor(m => m, 'GL_DATE_L')}
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-auto">
                              <Date disabled={this.model.isSearchByApplicationNumberSelected} {...this.bind(m => m.registrationDate)} />
                            </div>
                          </div>
                        </div>

                        <div className="form-group col-xl-6">
                          {this.labelFor(m => m, 'GL_REGISTER_L')}
                          {this.dropDownListFor(m => m.registerId, this._registerSelectOptions, attributesClassFormControl, this.onRegisterSelected, true, this.getResource('GL_CHOICE_L'))}
                        </div>
                        <div className="form-group col-xl-6">
                          {this.labelFor(m => m, 'PR_REGISTRATION_OFFICE_L')}
                          <AutoComplete
                            fullHtmlName="registryOfficeName"
                            modelReference={new BindableReference(this, "registryOfficeName")}
                            handleChangeCallback={this.clearData}
                            selector={this.selectRegistryOffice}
                            showValue={this.showRegistryOfficeValue}
                            hasSelectedValue={this.model.registryOffice && ObjectHelper.isNumber(this.model.registryOffice.id)}
                            handleSelectCallback={this.handleRegistryOfficeSelectOption}
                            triggerLength={0}
                            attributes={attributesClassFormControl}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <hr className='hr--report' />
                <div className="row no-gutters">
                  <div className="col-auto">
                    <div className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio"
                        id={'applicationNumber'} name='searchSelect1'
                        checked={this.model.isSearchByApplicationNumberSelected} onChange={this.onSelectApplicationNumber} />
                      <label className="custom-control-label" htmlFor={'applicationNumber'}></label>
                    </div>
                  </div>
                  <div className="col">

                    <fieldset id="SEARCH_FORM_2" disabled={!this.model.isSearchByApplicationNumberSelected}>
                      <div className="row">
                        <div className="form-group col-md-6">
                          {this.labelFor(m => m.applicationNumber, 'PR_APPLIC_PORTAL_NUM_L')}
                          {this.textBoxFor(m => m.applicationNumber, attributesClassFormControl)}
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="button-bar">
                  <div className="left-side">
                    <Button type="button" className="btn btn-secondary" lableTextKey={"GL_CLEAR_L"} onClick={this.clear}></Button>
                  </div>
                  <div className="right-side">
                    <Button type="button" className="btn btn-primary" lableTextKey={"GL_SEARCH_L"} onClick={this.search} >
                      <i className="ui-icon ui-icon-search" aria-hidden="true"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this._foundNoResult &&
          < div className="alert alert-danger" role="alert">{this.getResource('PR_MISSING_APPL_WITH_THIS_ID_Е')}</div>
        }
        {this._result &&
          <div id="SEARCH_RESULTS" className="card card--borderless">
            <div className="card-header">
              <h3>
                {this._applicationTypes.filter(apType => apType.appType == this._result.applicationType)[0] ?
                  this._applicationTypes.filter(apType => apType.appType == this._result.applicationType)[0].name : this._result.applicationTypeNameFromPR}
              </h3>
            </div>
            <div className="card-body">
              {this._result.applicationIdentifier &&
                <div className="field-container">
                  <h4 className="field-title field-title--preview">{this.getResource('PR_APPLIC_PORTAL_NUM_L')}</h4>
                  <p className="field-text">{this._result.applicationIdentifier}</p>
                </div>
              }
              {!ObjectHelper.isStringNullOrEmpty(this._result.registerNumber) &&
                <div className="field-container">
                  <h4 className="field-title field-title--preview">{this.getResource('PR_REG_DATA_L')}</h4>
                  <p className="field-text">
                    {this.getResource('PR_APPLICATION_REGNUM_L') + ' ' + this._result.registerNumber
                      + ', ' + this.getResource('GL_DATE_L') + ' ' + this.dateDisplayFor(this._result.registerDate, 'DD.MM.YYYY') + ' ' + this.getResource('GL_YEAR_ABBREVIATION_L')
                      + (this._registerSelectOptions.filter(reg => reg.value == this._result.registerIdentifier)[0] ? (', ' + this._registerSelectOptions.filter(reg => reg.value == this._result.registerIdentifier)[0].text) : '')
                      + (this._registryOfficesSelectOptions.filter(office => office.value == this._result.registerSiteId)[0] ? (', ' + this._registryOfficesSelectOptions.filter(office => office.value == this._result.registerSiteId)[0].text) : '')
                    }
                  </p>
                </div>
              }
              {
                this._result.applicationRegTime &&
                <div className="field-container">
                  <h4 className="field-title field-title--preview">{this.getResource('EP_DATE_APPLICATION_RECEPTION_L')}</h4>
                  <p className="field-text">{this.dateDisplayFor(this._result.applicationRegTime, 'DD.MM.YYYY')} {this.getResource('GL_YEAR_ABBREVIATION_L')} {this.dateDisplayFor(this._result.applicationRegTime, 'HH:mm:ss')} {this.getResource('GL_HOUR_ABBREVIATION_L')}</p>
                </div>
              }
              <div className="field-container">
                <h4 className="field-title field-title--preview">{this.getResource('PR_PLACE_OF_APPL_L')}</h4>
                <p className="field-text">
                  {this._result.receptionType == ReceptionTypes.EPZEU ? this.getResource('GL_PORTAL_EPZEU_FULL_NAME_L') :
                    this._registryOfficesSelectOptions.filter(office => office.value == this._result.registerSiteId)[0].text}
                </p>
              </div>
              <div role="alert" className="alert alert-info">
                <p>
                  {(this._result.serviceStatus == this._registeredUpcomingDealStatusID) && <><b>{this.getResource('PR_REGISTERED_UPCOMING_DEAL_L').toUpperCase()}</b> - </>}
                  {
                    (this._result.serviceStatus != this._registeredUpcomingDealStatusID) && (this._applicationStatuses.filter(st => st.id == this._result.serviceStatus)[0]) &&
                    <><b>{this._applicationStatuses.filter(st => st.id == this._result.serviceStatus)[0].name.toUpperCase()}</b> - </>
                  }
                  {this.dateDisplayFor(this._result.serviceStatusTime, 'DD.MM.YYYY')} {this.getResource('GL_YEAR_ABBREVIATION_L')} {this.dateDisplayFor(this._result.serviceStatusTime, 'HH:mm:ss')} {this.getResource('GL_HOUR_ABBREVIATION_L')}
                </p>
                {
                  (this._result.applicationType != this._applicationTypeForNotCertifiedCopy) && this._applicationStatuses.filter(st => st.id == this._result.serviceStatus)[0] && (ObjectHelper.isStringNullOrEmpty(this._applicationStatuses.filter(st => st.id == this._result.serviceStatus)[0].infoTextCode) == false) &&
                  <p>{this.getResource(this._applicationStatuses.filter(st => st.id == this._result.serviceStatus)[0].infoTextCode)}</p>
                }
              </div>
            </div>
          </div>
        }
      </>);
  }

  selectRegistryOffice(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    return NomenclaturesPR.getRegistryOffice().then(s => s.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) > -1));
  }

  @action handleRegistryOfficeSelectOption(value?: RegistryOffice) {
    if (value) {
      this.model.registryOffice = value;
      this.registryOfficeName = value.name;
    } else {
      this.model.registryOffice = null;
    }
  }

  showRegistryOfficeValue(value: RegistryOffice): string {
    return value.name;
  }

  @action clearData() {
    if (this.model) {
      this.model.registryOffice = null;
    }
  }

  @action private search(): void {
    let isValid = this.validators[0].validate(this.model);

    if (isValid) {
      this.props.registerAsyncOperation(this._reportsService.getApplicationStatus(ObjectHelper.isStringNullOrEmpty(this.model.applicationNumber) ? '' : this.model.applicationNumber.toUpperCase(),
        this.model.regNumber, this.model.registrationDate,
        this.model.registerId, (this.model.registryOffice ? this.model.registryOffice.id : null)).then((result: ApplicationStatusResult) => {
          this._foundNoResult = !result;
          this._result = result;
        }));
    }
  }

  @action private clear(): void {
    this.registryOfficeName = "";
    this.model.clear();
    this.model.clearErrors();
    this._result = null;
    this._foundNoResult = null;
  }

  @action private onSelectApplicationRegistration(): void {
    this.model.isSearchByApplicationNumberSelected = false;
    this.model.applicationNumber = null;
    this.model.clearErrors();
    this.registryOfficeName = "";
  }

  @action private onSelectApplicationNumber(): void {
    this.model.isSearchByApplicationNumberSelected = true;
    this.model.clearErrors();
    this.model.clear();
    this.registryOfficeName = "";
  }

  private onRegisterSelected(e: any): void {
    this.model.registerId = e.target.value
  }

  @action onRegistryOfficeSelected(e: any): void {
    var value = e.target.value;
    if (value) {
      NomenclaturesPR.getRegistryOffice().then(registryOffice => {
        var registryOfficeFiltered = registryOffice.filter(filteredRegistryOffice => value == filteredRegistryOffice.id)[0];

        runInAction(() => {
          this.model.registryOffice.id = registryOfficeFiltered.id;
          this.model.registryOffice.name = registryOfficeFiltered.name;
        })
      })
    }
    else {
      this.model.registryOffice.clear();
    }
  }

  private onCollapseCriteria(targetId: string): void {
    let triger = $(`#colapsable-triger-${this._cmpUniqueId}`);
    triger.toggleClass('collapsed');

    $('#' + targetId).slideToggle();
  }

  private documentKeyPress(e: any) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
}

export const ApplicationStatusCheckUI = withRouter(withAsyncFrame(ApplicationStatusCheckUIImpl));
