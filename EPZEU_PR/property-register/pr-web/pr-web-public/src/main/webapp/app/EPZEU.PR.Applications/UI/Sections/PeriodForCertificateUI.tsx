import * as React from 'react';
import { observer } from 'mobx-react';
import {
  EPZEUBaseComponent, fieldTitleLabelAttributes,
  fieldTittleRequiredAttributes,
  ValidationSummaryErrors,
  ValidationSummaryStrategy
} from 'EPZEU.Core';
import { BaseProps } from 'Cnsys.UI.React';
import {
  InputInfoUI,
  SectionTitleUI,
  ValidationSummaryErrorsPreviewUI,
  ValidationSummaryPreviewUI
} from "EPZEU.PR.ApplicationBase";
import { PeriodForCertificate } from "../../Models/Sections/PeriodForCertificate";
import {action, observable} from "mobx";
import {ObjectHelper} from "Cnsys.Core/Common";
import * as moment from "moment";



@observer export class PeriodForCertificateUI extends EPZEUBaseComponent<BaseProps, PeriodForCertificate> {


  constructor(props?: any) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }

  @observable showError : boolean = false;

  @action private onDateChange(arg){
    if(!ObjectHelper.isStringNullOrEmpty(arg) && !moment.isMoment(arg)){
      this.showError = true;
    }else{
      this.showError = false;
    }
  }

  renderEdit(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--form">
        {this.getResource("PR_CERTIFICATE_FOR_PERIOD_L")}
      </h2>

      <div className="field-container">
        <div className="row">
          <div className="col">
            {this.labelFor(m => m.periodForReport, 'PR_APP_00022_L', fieldTittleRequiredAttributes)}
          </div>
        </div>
        <ValidationSummaryErrors errors={this.model.periodForReport.getModelErrors()} />
        <div className="row">
          <div className="form-group col-auto">
            <div className ="d-flex">
              <label className="mr-2 col-form-label">{this.getResource('GL_START_DATE_L')}</label>
              {this.dateFor(m => m.periodForReport.startDate, "DD.MM.YYYY",null,null, this.onDateChange)}
            </div>
          </div>
          <div className="form-group col-auto">
            <div className ="d-flex">
              <label className="mr-2 col-form-label">{this.getResource('GL_END_DATE_L')}</label>
              {this.dateFor(m => m.periodForReport.endDate, "DD.MM.YYYY",null,null, this.onDateChange)}
            </div>
          </div>
        </div>
        <div className="row">
        {this.showError ?
          <div className='form-group col-12 feedback-up'>
            <ul className="invalid-feedback">
              <li>{this.getResource("GL_INPUT_DATE_E")}</li>
            </ul>
          </div>
          : null}
        </div>
      </div>

      <div className="field-container">
        <div className="row">
          <div className="col">
            {this.labelFor(m => m.expectedRegistrationDate, 'PR_APP_EXPECTED_REGISTRATION_DATE_L', fieldTitleLabelAttributes)}
          </div>
        </div>
        <ValidationSummaryErrors errors={this.model.getModelErrors()} />
        <div className="row">
          <div className="form-group col-auto">
              {this.dateFor(m => m.expectedRegistrationDate, "DD.MM.YYYY")}
            <InputInfoUI infoTextKey={'PR_APP_EXPECTED_REGISTRATION_DATE_I'}/>
          </div>
        </div>
      </div>
    </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_CERTIFICATE_FOR_PERIOD_L")}</h2>
        <p className="field-text">
          <span className="field-title field-title--preview">{this.getResource('PR_APP_00022_L')}</span>
          <p className="field-text">
          {this.model.periodForReport && this.model.periodForReport.startDate ?
            this.dateDisplayFor(this.model.periodForReport.startDate) + " - " + this.dateDisplayFor(this.model.periodForReport.endDate)
            :null}
          </p>
        </p>

      <ValidationSummaryErrorsPreviewUI errors={this.model.periodForReport.getModelErrors()}/>

      {this.model.expectedRegistrationDate?
        <p className="field-text">
          <span className="field-title field-title--preview">{this.getResource('PR_APP_EXPECTED_REGISTRATION_DATE_L')}</span>
          <p className="field-text">
          {this.dateDisplayFor(this.model.expectedRegistrationDate)}
          </p>
        </p>
        :null}
      <ValidationSummaryErrorsPreviewUI errors={this.model.getModelErrors()}/>
    </>);
  }
}
