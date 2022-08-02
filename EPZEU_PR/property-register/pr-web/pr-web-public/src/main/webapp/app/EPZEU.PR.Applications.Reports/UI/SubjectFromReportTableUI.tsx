import * as React from 'react';
import { observable, action, computed } from "mobx";
import { observer } from 'mobx-react';
import { ArrayHelper, ObjectHelper } from "Cnsys.Core";
import { BaseProps, RawHTML } from "Cnsys.UI.React";
import {EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy} from "EPZEU.Core";
import { Pagination } from "EPZEU.PR.Core";
import { MaxSubjectsForReportValidator } from "../Models/Validators/MaxSubjectsForReportValidator";
import {ReportConstants} from "../Common/ReportConstants";


interface SubjectFromReportTableUIProps extends BaseProps {
  results: any;
  label: any;
  totalSubjectsOfReportCount: number
}

const MAX_ALLOWED_NUMBER_OF_OBJECTS = ["maxAllowedNumberOfObjects"];

@observer export class SubjectFromReportTableUI extends EPZEUBaseComponent<SubjectFromReportTableUIProps, any> {

  private readonly itemsPerPage: number = 5;

  @observable private activePage: number;
  @observable private resultsFrom: number;
  @observable private resultsTo: number;

  private _objects: any;
  private _totalPages: number;

  private criteriaValidator: MaxSubjectsForReportValidator;

  constructor(props?: SubjectFromReportTableUIProps) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.goToFirstPage();
    this.criteriaValidator = new MaxSubjectsForReportValidator();
  }

  componentWillUpdate(): void {
    this.calculateData();
  }

  @computed get objects() {
    this._objects = this.props.results.slice(this.resultsFrom - 1, this.resultsFrom + this.itemsPerPage - 1);
    return this._objects;
  }

  @computed get totalPages(): number {
    this._totalPages = Math.ceil(this.props.results.length / this.itemsPerPage);
    return this._totalPages;
  }


  renderEdit(): JSX.Element {

    let rows: any[] = [];
    for (let obj of this.objects) {
      let value = <RawHTML divClassname="field-container" rawHtmlText={obj.toString()} />
      let isCurrentItemSelected = this.isSelected(obj);
      rows.push(<tr key={ObjectHelper.newGuid()} onClick={(e) => {
        $(e.currentTarget).find(':checkbox').trigger('click');
      }} style={{ cursor: 'pointer' }}>
        <td className='single-icon-td'>
          <div className="custom-control custom-checkbox">
            <input type="checkbox"
                   className="custom-control-input"
                   id="inlineCheckboxAT1"
                   value=""
                   defaultChecked={isCurrentItemSelected}
                   onClick={(e) => {
                     e.stopPropagation();
                     this.onCheckBoxChange(e.target, obj);
                   }}
            />
            <label className="custom-control-label" htmlFor="inlineCheckboxAT1"></label>
          </div>
        </td>
        <td>{value}</td>
        <td>{obj.registryOffice.name}</td>
      </tr>);
    }

    return (

      <>
        <div className="card-header">
          <h3>{this.getResource("GL_RESULTS_FROM_SEARCH_L")}</h3>
        </div>
        <div className="card-body">
          {this.props.results.length > 200 ?
            <div className="alert alert-warning">
              {this.getResource("PR_APP_00026_I")}
            </div>
            : null}
          {!this.props.results.length ?
            <div className="alert alert-warning">
              {this.getResource("GL_NO_RESULTS_I")}
            </div>
            : <>
              {this.totalPages > 1 ?
                <nav className="pagination-container pagination-container--page-top" aria-label="Page navigation">
                    <div className="result-count">
                      {this.getResource("GL_RESULT_L")}: {this.resultsFrom} - {this.resultsTo} {this.getResource("GL_START_DATE_L")} {this.props.results.length}
                    </div>
                    <Pagination
                      currentPage={this.activePage}
                      itemsCountPerPage={this.itemsPerPage}
                      totalPages={this.totalPages}
                      onChange={this.onPageChange}
                    />

                </nav>
                :
                null
              }
              <ValidationSummary key="maxAllowedNumberOfObjects" {...this.props} propNames={MAX_ALLOWED_NUMBER_OF_OBJECTS}
                                 strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}/>
              <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                  <thead>
                  <tr>
                    <th></th>
                    <th>
                      {this.getResource(this.props.label)}
                    </th>
                    <th className="w-30">
                      {this.getResource("PR_REGISTRATION_OFFICE_L")}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {rows}
                  </tbody>
                </table>
              </div>
              {this.totalPages > 1 ?
                <nav className="pagination-container pagination-container--page-bottom" aria-label="Page navigation">
                  <div className="pagination-container">
                    <div className="result-count">
                      {this.getResource("GL_RESULT_L")}: {this.resultsFrom} - {this.resultsTo} {this.getResource("GL_START_DATE_L")} {this.props.results.length}
                    </div>
                    <Pagination
                      currentPage={this.activePage}
                      itemsCountPerPage={this.itemsPerPage}
                      totalPages={this.totalPages}
                      onChange={this.onPageChange}
                    />
                  </div>
                </nav>
                :
                null}
            </>
          }
        </div>
      </>);
  }

  @action
  private onPageChange(page: any): void {
    this.activePage = page;
    this.calculateData();
  }

  @action
  public goToFirstPage(): void {
    this.activePage = 1;
    this.calculateData();
  }

  private isSelected(item: any): boolean {
    if (this.model && this.model.items && this.model.items.length > 0) {
      return ArrayHelper.queryable.from(this.model.items).count((el) => {
        return el === item;
      }) > 0;
    } else {
      return false;
    }
  }

  @action
  private onCheckBoxChange(cBox: any, value: any) {

    if (cBox.checked === true) {
      this.model.items.push(value);

      this.model.itemsCount = {
        itemsFromSearchCount: this.model.items.length,
        alreadyAddedItemsCount: this.props.totalSubjectsOfReportCount
      };

      this.criteriaValidator.validate(this.model);

    } else {
      let idx = this.model.items.indexOf(value);
      if(this.model.items.length > ReportConstants.ALLOWED_NUMBER_OF_OBJECTS) {
        this.model.items.splice(ReportConstants.ALLOWED_NUMBER_OF_OBJECTS, this.model.items.length);

      } else {
        this.model.items.splice(idx, 1);
      }

      this.model.itemsCount.itemsFromSearchCount = this.model.items.length;

      if (this.criteriaValidator.validate(this.model)) {
        this.model.clearErrors();
      }
    }
  }


  private calculateData() {
    this.resultsFrom = ((this.activePage - 1) * this.itemsPerPage) + 1;
    let temp = this.activePage * this.itemsPerPage;
    if (temp > this.props.results.length) {
      this.resultsTo = this.props.results.length;
    } else {
      this.resultsTo = temp
    }
  }
}
