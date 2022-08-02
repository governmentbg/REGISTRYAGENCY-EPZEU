import { Helper, ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { Button, EPZEUBaseComponent } from "EPZEU.Core";
import { UpcomingDeal } from 'EPZEU.PR.ApplicationBase'
import { ApplicantCategory, NomenclaturesPR } from 'EPZEU.PR.Core';
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import {ReportsDataService} from "../../Services/ReportsDataService";

interface ApplicationStatusCheckUIProps extends AsyncUIProps, BaseProps {
}

@observer
class UpcomingDealCheckUIImpl extends EPZEUBaseComponent<ApplicationStatusCheckUIProps, any> {
  private _cmpUniqueId: string;
  @observable private _cadastreID: string;
  @observable private _isValid: boolean = true;
  @observable private _foundNoData: boolean;
  @observable private _results: UpcomingDeal[];
  @observable private _applicantCategories: ApplicantCategory[] = [];
  private _validationError: string;
  private _service: ReportsDataService;

  constructor(props: ApplicationStatusCheckUIProps) {
    super(props);
    this._cmpUniqueId = ObjectHelper.newGuid();
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.onChangeCadastreID = this.onChangeCadastreID.bind(this);
    this.documentKeyPress = this.documentKeyPress.bind(this);
    this._service = new ReportsDataService();
    this._cadastreID = "";
    NomenclaturesPR.getApplicantCategoriesForUpcomingDeal().then(categories => {
      this._applicantCategories = categories;
    });
    this._validationError = this.getResource('PR_APP_00066_E'); // Въведете валиден кадастрален идентификатор
  }

  componentDidMount() {
    document.addEventListener('keypress', this.documentKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.documentKeyPress);
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
                <div className='row'>
                  <div className='form-group col-md-6'>
                    <label>{this.getResource('PR_APP_CADASTRAL_IDENTIFIER_L')}</label>
                    <input type='text' className={this._isValid ? 'form-control' : 'form-control input-error'} value={this._cadastreID} onChange={this.onChangeCadastreID}></input>
                    {
                      !this._isValid &&
                      <ul className='invalid-feedback'>
                        <li>{this._validationError}</li>
                      </ul>
                    }
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
        <br />
        {this._results && this._results.length > 0 &&
          <div className='table-responsive-block'>
            <table className="table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th>{this.getResource('GL_APPLICANT_L')}</th>
                  <th>{this.getResource('PR_PROPERTY_LIST_L')}</th>
                  <th>{this.getResource('PR_TRANSACT_TYPE_L')}</th>
                  <th>{this.getResource('PR_DEAL_DATE_TIME_L')}</th>
                </tr>
              </thead>
              <tbody>
                {this._results.map((res: UpcomingDeal, idx: number) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <span className='field-title field-title--preview d-sm-none'>{this.getResource('GL_APPLICANT_L')}</span>
                        <p className='field-text'>
                          {res.registratorName} <br />
                          {this.getResource('PR_APP_ON_THE_GROUNDS_L') + ' '
                            + (this._applicantCategories.filter(cat => cat.id == res.registratorRoleId).length > 0 ? this._applicantCategories.filter(cat => cat.id == res.registratorRoleId)[0].name : '')}
                        </p>
                      </td>
                      <td>
                        <span className='field-title field-title--preview d-sm-none'>{this.getResource('PR_PROPERTY_LIST_L')}</span>
                        <p className='field-text'>
                          {res.cadastreNumbers.map((cadId: string, index: number) => {
                            return (
                              <React.Fragment key={index}>
                                {cadId}
                                {index < res.cadastreNumbers.length ? <br /> : null}
                              </React.Fragment>
                            );
                          })}
                        </p>
                      </td>
                      <td>
                        <span className='field-title field-title--preview d-sm-none'>{this.getResource('PR_TRANSACT_TYPE_L')}</span>
                        <p className='field-text'>
                          {res.dealType}
                        </p>
                      </td>
                      <td>
                        <span className='field-title field-title--preview d-sm-none'>{this.getResource('PR_DEAL_DATE_TIME_L')}</span>
                        <p className='field-text'>
                          {
                            this.dateDisplayFor(res.dealDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')}`) + ' '
                            + (((res.dealDate.hour() == 0) && (res.dealDate.minute() == 0) && (res.dealDate.second() == 0)) == false ?
                              this.dateDisplayFor(res.dealDate, `HH:mm:ss`) + ' ' + this.getResource('GL_HOUR_ABBREVIATION_L')
                              :
                              '')}
                        </p>
                      </td>
                    </tr>);
                })}
              </tbody>
            </table>
          </div>
        }
        {
          this._foundNoData &&
          < div className="alert alert-info" role="alert"><p>{this.getResource('PR_UPCOMING_DEALS_MISSING_I')}</p></div>
        }
      </>);
  }

  @action private async search(): Promise<void> {
    this._isValid = Helper.regex.isMatch(this._cadastreID, '^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$');

    if (this._isValid) {
      let promise = this._service.searchUpcomingDeals(this._cadastreID);
      this.props.registerAsyncOperation(promise);
      let response = await promise;
      this._foundNoData = response.deals.length == 0;
      this._results = response.deals;
    }
  }

  @action private clear(): void {
    this._cadastreID = '';
    this._results = null;
    this._foundNoData = false;
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

  @action private onChangeCadastreID(e: any): void {
    this._cadastreID = e.target.value;

    this._isValid = Helper.regex.isMatch(this._cadastreID, '^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$');
  }
}

export const UpcomingDealCheckUI = withAsyncFrame(UpcomingDealCheckUIImpl);
