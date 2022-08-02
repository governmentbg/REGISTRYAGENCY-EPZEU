import * as React from 'react';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummaryErrors } from 'EPZEU.Core';
import { PeriodForReport } from "../Models";
import * as moment from "moment";
import {ObjectHelper} from "Cnsys.Core/Common";
import {action, observable} from "mobx";


interface PeriodForReportProps extends AsyncUIProps, BaseProps {
  initialDateForReport?: moment.Moment;
  isRequired ?: boolean;
}

export class PeriodForReportImpl extends EPZEUBaseComponent<PeriodForReportProps, PeriodForReport> {

  @observable showError : boolean = false;

  constructor(props?: any) {
    super(props);
    this.isValidStartDate = this.isValidStartDate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.model.minStartDate = this.props.initialDateForReport ? this.props.initialDateForReport : this.model.minStartDate;
  }

  //Only allow start dates after the initial start date for reports and before the current date
  private isValidStartDate(currentDate: moment.Moment): boolean {
    return currentDate.isSameOrAfter(this.props.initialDateForReport, 'days') &&
            currentDate.isSameOrBefore(moment.now());
  }

  @action private onDateChange(arg){
    if(!ObjectHelper.isStringNullOrEmpty(arg) && !moment.isMoment(arg)){
      this.showError = true;
    }else{
      this.showError = false;
    }
  }

  renderEdit(): JSX.Element {
    return (
      <>
            <div className="field-container">
              <div className="row">
                <div className="col-12">
                  <label className={this.props.isRequired ? "field-title field-title--form required-field" : "field-title field-title--form"}>{this.getResource('PR_APP_00022_L')}</label>
                  <ValidationSummaryErrors
                    errors={this.model.getModelErrors()} />
                </div>
                <div className="form-group col-auto">
                  <div className="d-flex">
                    <label className="mr-2 col-form-label">{this.getResource('GL_START_DATE_L')}</label>
                    {this.dateFor(model => model.startDate, "DD.MM.YYYY", this.isValidStartDate, null, this.onDateChange)}
                  </div>
                </div>
                <div className="form-group col-auto">
                  <div className="d-flex">
                    <label className="mr-2 col-form-label">{this.getResource('GL_END_DATE_L')}</label>
                    {this.dateFor(model => model.endDate, "DD.MM.YYYY", this.isValidStartDate,null, this.onDateChange)}
                  </div>
                </div>
                {this.showError ?
                <div id="errorContainer" className='form-group col-12 feedback-up'>
                  <ul className="invalid-feedback">
                      <li>{this.getResource("GL_INPUT_DATE_E")}</li>
                  </ul>
                </div>
                  : null}
              </div>

            </div>
      </>);
  }

  renderDisplay(): JSX.Element {

    return (<>

    </>);
  }
}

export const PeriodForReportUI = withAsyncFrame(PeriodForReportImpl);
