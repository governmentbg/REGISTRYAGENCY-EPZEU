import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ObjectHelper } from "Cnsys.Core";
import {AsyncUIProps, BaseProps, withAsyncFrame} from "Cnsys.UI.React";
import {Button, EPZEUBaseComponent} from "EPZEU.Core";
import {
  NomenclaturesPR,
  Pagination
} from "EPZEU.PR.Core";
import {PlaceNomenclatureSearchResult} from "../../Models/PlaceNomenclatureSearchResult";



interface SearchRegistryOfficeByPropertyLocationUIProps extends AsyncUIProps, BaseProps {
}

@observer
class SearchRegistryOfficeByPropertyLocationUIImpl extends EPZEUBaseComponent<SearchRegistryOfficeByPropertyLocationUIProps, any> {

  private _cmpUniqueId: string;
  private readonly itemsPerPage: number = 5;
  @observable private _results: PlaceNomenclatureSearchResult[];
  @observable private _searchCriteria: string;
  @observable private _noDataFound: boolean;
  @observable private activePage: number;
  @observable private resultsFrom: number;
  @observable private _totalPages: number;
  @observable private currentResults: PlaceNomenclatureSearchResult[];


  constructor(props: SearchRegistryOfficeByPropertyLocationUIProps) {
    super(props);
    this._cmpUniqueId = ObjectHelper.newGuid();
    this._searchCriteria = '';

    this.goToFirstPage();
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
    this.onChangeCriteria = this.onChangeCriteria.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  render(): JSX.Element {
    return (
      <>
        <div className="search-box search-box--report">
          <div className="card card--search card--collapsible">
            <div id={`colapsable-triger-${this._cmpUniqueId}`} className="card-header">
              <h3>{this.getResource('GL_SEARCHING_L')}</h3>
              <button className="system-button toggle-collapse" onClick={() => {
                this.onCollapseCriteria(`collapsable-content-${this._cmpUniqueId}`)
              }}>
                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
              </button>
            </div>
            <div id={`collapsable-content-${this._cmpUniqueId}`} className="collapse" style={{display: 'block'}}>
              <div className="card-body">
                <div className="help-text">
                  <p>{this.getResource('PR_APP_00083_I')}</p>
                </div>
                <div className='row'>
                  <div className='form-group col-md-6'>
                    <label>{this.getResource('PR_APP_SETTLEMENT_NAME_OR_EKATTE_L')}</label>
                    <input type='text' className={'form-control'} value={this._searchCriteria}
                           onChange={this.onChangeCriteria}></input>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="button-bar">
                  <div className="left-side">
                    <Button type="button" className="btn btn-secondary" lableTextKey={"GL_CLEAR_L"}
                            onClick={this.clear}></Button>
                  </div>
                  <div className="right-side">
                    <Button type="button" className="btn btn-primary" lableTextKey={"GL_SEARCH_L"}
                            onClick={this.search}>
                      <i className="ui-icon ui-icon-search ci-btn" aria-hidden="true"></i>&nbsp;
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>

        {this.currentResults && this.currentResults.length > 0 ?
          <>
            <nav className="pagination-container pagination-container--page-top">
              <div className="result-count">
                {this.getResource("GL_RESULT_L")}: {this._results.length}
              </div>

              { this._results.length > this.itemsPerPage ?
              <Pagination
                currentPage={this.activePage}
                itemsCountPerPage={this.itemsPerPage}
                totalPages={this.totalPages}
                onChange={this.onPageChange}
              />
              : null }
            </nav>

            <div className='table-responsive-block'>
              <table className="table table-borderless table-striped table-hover">
                <thead>
                <tr>
                  <th>{this.getResource('PR_CODE_EKATTE_L')}</th>
                  <th>{this.getResource('GL_PLACE_L')}</th>
                  <th>{this.getResource('GL_MUNICIPALITY_L')}</th>
                  <th>{this.getResource('GL_REGION_L')}</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {this.currentResults && this.currentResults.map((res: PlaceNomenclatureSearchResult, idx: number) => {
                  return (
                    <tr key={idx}>
                      <td>
                    <span
                      className='field-title field-title--preview d-sm-none'>{this.getResource('PR_CODE_EKATTE_L')}</span>
                        <p className='field-text'>
                          {res.placePR.ekatte}
                        </p>
                      </td>
                      <td>
                    <span
                      className='field-title field-title--preview d-sm-none'>{this.getResource('GL_PLACE_L')}</span>
                        <p className='field-text'>
                          {res.placePR.name}
                        </p>
                      </td>
                      <td>
                    <span
                      className='field-title field-title--preview d-sm-none'>{this.getResource('GL_MUNICIPALITY_L')}</span>
                        <p className='field-text'>
                          {res.placePR.placePR.name}
                        </p>
                      </td>
                      <td>
                    <span
                      className='field-title field-title--preview d-sm-none'>{this.getResource('GL_REGION_L')}</span>
                        <p className='field-text'>
                          {res.placePR.placePR.placePR.name}
                        </p>
                      </td>
                      <td>
                        <p className='field-text'>
                          <b> {res.registryOffice.name} </b>
                        </p>
                      </td>
                    </tr>);
                })}
                </tbody>
              </table>
            </div>
            <nav className="pagination-container pagination-container--page-bottom">
              <div className="result-count">
                {this.getResource("GL_RESULT_L")}: {this._results.length}
              </div>
              { this._results.length > this.itemsPerPage ?
              <Pagination
                currentPage={this.activePage}
                itemsCountPerPage={this.itemsPerPage}
                totalPages={this.totalPages}
                onChange={this.onPageChange}
              />
              : null}
            </nav>
          </>
          : null}
        {
          this._noDataFound &&
          < div className="alert alert-info" role="alert"><p>{this.getResource('PR_APP_NO_DATA_FOUND_L')}</p></div>
        }
      </>
    );
  }

  @action
  private onPageChange(page: any): void {
    this.activePage = page;
    this.calculateData();
  }

  @computed get totalPages(): number {
    this._totalPages = Math.ceil(this._results.length / this.itemsPerPage);
    return this._totalPages;
  }

  @action
  public goToFirstPage(): void {
    this.activePage = 1;
  }

  private onCollapseCriteria(targetId: string): void {
    let triger = $(`#colapsable-triger-${this._cmpUniqueId}`);
    triger.toggleClass('collapsed');

    $('#' + targetId).slideToggle();
  }

  @action
  private clear(): void {
    this._searchCriteria = '';
    this.currentResults = null;
    this._results = null;
    this._noDataFound = false;
    this.activePage = 1;
  }

  @action
  private onChangeCriteria(e: any): void {
    this._searchCriteria = e.target.value;
  }

  private calculateData() {
    this.resultsFrom = ((this.activePage - 1) * this.itemsPerPage) + 1;
    this.currentResults = this._results.slice(this.resultsFrom - 1, this.resultsFrom + this.itemsPerPage - 1);
  }

  @action
  private async search(): Promise<void> {
    this._results = [];
    this.currentResults = [];
    this.activePage = 1;
    let searchCriteriaLowerCase = this._searchCriteria && this._searchCriteria.trim() != "" ? this._searchCriteria.toLowerCase() : null;

    if (searchCriteriaLowerCase) {
      this.props.registerAsyncOperation(NomenclaturesPR.getPlaces().then((places) => {
        let foundResults = [];
        let promiseArray = [];

        places.filter(place => place.siteId).map(settlement => {
          if (settlement.name.toLowerCase().indexOf(searchCriteriaLowerCase) > -1 ||
            settlement.ekatte.toString().toLowerCase().indexOf(searchCriteriaLowerCase) > -1) {

            let searchResult = new PlaceNomenclatureSearchResult();

            searchResult.placePR = settlement;

            promiseArray.push(NomenclaturesPR.getRegistryOffice().then(registryOffice => {
              let registryOfficeFiltered = registryOffice.filter(filteredRegistryOffice => settlement.siteId == filteredRegistryOffice.id)[0];
              if (registryOfficeFiltered) {
                searchResult.registryOffice = registryOfficeFiltered;
                foundResults.push(searchResult);
              }
            }));
          }
        });

        Promise.all(promiseArray).then(() => {
          this._noDataFound = foundResults.length == 0;
          if (!ObjectHelper.isArrayNullOrEmpty(foundResults)) {
            this._results = foundResults;
            this.calculateData();
          }
        })
      }));
    } else {
      this._results = [];
    }
  }
}

export const SearchRegistryOfficeByPropertyLocationUI = withAsyncFrame(SearchRegistryOfficeByPropertyLocationUIImpl);
