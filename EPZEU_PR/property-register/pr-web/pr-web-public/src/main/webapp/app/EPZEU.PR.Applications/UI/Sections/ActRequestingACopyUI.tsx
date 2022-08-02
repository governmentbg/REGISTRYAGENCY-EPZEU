import { ObjectHelper, SelectListItem } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import {
    attributesClassFormControl,
    attributesClassFormControlMaxL4,
    AutoComplete,
    controlLabelRequiredField,
    Date,
    EPZEUBaseComponent,
    fieldTitleLabelAttributes,
    fieldTittleRequiredAttributes,
    requiredFieldAttribute,
    ValidationSummary,
    ValidationSummaryStrategy
} from 'EPZEU.Core';
import {
    ApplicationInfoUI,
    SectionTitleUI,
    ValidationSummaryErrorsPreviewUI,
    ValidationSummaryPreviewUI
} from 'EPZEU.PR.ApplicationBase';
import { NomenclaturesPR, RegistryOffice } from 'EPZEU.PR.Core';
import { action, observable, runInAction } from 'mobx';
import * as React from "react";
import { ActRequestingACopy } from "../../Models/Sections/ActRequestingACopy";


interface ActRequestingACopyUIProps extends AsyncUIProps, BaseProps {
  onRegistryOfficeSelected: (registryOfficeId: string) => void;
}

const REGISTRY_OFFICE = ['registryOffice.'];
const REGISTRY_OFFICE_NAME = ['registryOffice.name'];
const IS_BEFORE_START_DATE = ['isBeforeStartDate'];
const ACT_OLD_DATA = ['actOldData.'];
const ACT_DATA_AND_ACT_OLD_DATA = ['actData, actOldData'];
const ACT_DATA_AND_DATA_FOR_REGISTRATION_OF_DOCUMENT_IN_BOOK = ['actData.', 'actData.dataForRegistrationOfDocumentInBook'];
const DATA_FOR_REGISTRATION_OF_DOCUMENT_IN_INCOMING_REGISTER = ['actData.dataForRegistrationOfDocumentInIncomingRegister'];
const DATA_FOR_REGISTRATION_OF_DOCUMENT_IN_DOUBLE_INCOMING_REGISTER = ['actData.dataForRegistrationOfDocumentInDoubleIncomingRegister'];

export class ActRequestingACopyUIImpl extends EPZEUBaseComponent<ActRequestingACopyUIProps, ActRequestingACopy> {
  private groupNameForStartDate: string;
  private groupNameForActData: string;
  @observable private registryOfficesSelectOptions: RegistryOffice[];
  @observable private bookSelectOptions: SelectListItem[];
  @observable private isDoubleIncomingRegisterSelected: boolean = false;
  @observable private isInIncomingRegisterSelected: boolean = false;
  @observable private isSelectedAfterStartDate: boolean;
  @observable private isSelectedBeforeStartDate: boolean;

  constructor(props?: ActRequestingACopyUIProps) {
    super(props);
    this.onSelectBeforeStartDate = this.onSelectBeforeStartDate.bind(this);
    this.onSelectAfterStartDate = this.onSelectAfterStartDate.bind(this);
    this.onSelectDoubleIncomingRegister = this.onSelectDoubleIncomingRegister.bind(this);
    this.onSelectIncomingRegister = this.onSelectIncomingRegister.bind(this);
    this.onBookSelected = this.onBookSelected.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.renderActOldData = this.renderActOldData.bind(this);
    this.renderActData = this.renderActData.bind(this);
    this.isActDataNotEmpty = this.isActDataNotEmpty.bind(this);
    this.isInBookDataNotEmpty = this.isInBookDataNotEmpty.bind(this);
    this.isInRegisterDataNotEmpty = this.isInRegisterDataNotEmpty.bind(this);
    this.isInDoubleRegisterDataNotEmpty = this.isInDoubleRegisterDataNotEmpty.bind(this);
    this.handleRegistryOfficeSelectOption = this.handleRegistryOfficeSelectOption.bind(this);
    this.clearData = this.clearData.bind(this);
    this.selectRegistryOffice = this.selectRegistryOffice.bind(this);

    this.groupNameForStartDate = ObjectHelper.newGuid();
    this.groupNameForActData = ObjectHelper.newGuid();

    this.isInIncomingRegisterSelected = this.isInRegisterDataNotEmpty();
    this.isDoubleIncomingRegisterSelected = this.isInDoubleRegisterDataNotEmpty();

    if (!this.model.registryOffice || (this.model.registryOffice && ObjectHelper.isStringNullOrEmpty(this.model.registryOffice.id))) {
      this.model.isBeforeStartDate = null;
      this.isSelectedAfterStartDate = false;
      this.isSelectedBeforeStartDate = false;
    }
    if(this.model.isBeforeStartDate) {
      this.isSelectedAfterStartDate = false;
      this.isSelectedBeforeStartDate = true;
    } else if(this.model.isBeforeStartDate === false) {
      this.isSelectedAfterStartDate = true;
      this.isSelectedBeforeStartDate = false;
    }

    this.getRegistryOffices();
    this.getBooks();
  }

  componentDidMount(): void {
    this.changeDisabledProperty(this.isDoubleIncomingRegisterSelected, 'DoubleIncomingRegisterFieldset');
    this.changeDisabledProperty(this.isInIncomingRegisterSelected, 'IncomingRegisterFieldset');
  }

  private getRegistryOffices(): void {
    this.registryOfficesSelectOptions = new Array<RegistryOffice>();
    let that = this;
    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      runInAction(() => {
        if (this.model.registryOffice && !ObjectHelper.isStringNullOrEmpty(this.model.registryOffice.id) && ObjectHelper.isStringNullOrEmpty(this.model.registryOffice.startDate)) {
          this.model.registryOffice.startDate = registryOffices.filter(reg => reg.id == this.model.registryOffice.id)[0].startDate;
        }

        registryOffices.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        that.registryOfficesSelectOptions = registryOffices;
      })
    }));
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_APP_COPY_OF_ACT_L'} anchor="actRequestingACopy"/>
        <div className="field-container">
          <div className="row">
            <div className="col">
              {this.labelFor(m => m.copyReason, 'PR_APP_REASON_FOR_THE_COPY_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row" id='copyReason'>
            <div className="form-group col">
              {this.textAreaFor(m => m.copyReason, null, 3, attributesClassFormControl)}
              <div className="help-text-inline">( {this.getResource('PR_APP_REASON_FOR_THE_COPY_I')} )</div>
            </div>
          </div>
        </div>
        <ApplicationInfoUI infoTextKey='PR_APP_00087_I'/>
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.registryOffice, 'PR_REGISTRATION_OFFICE_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <ValidationSummary key="registryOffice" {...this.props} propNames={REGISTRY_OFFICE}
                             strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          />
          <div className="row">
            <div className="form-group col-sm-8 col-md-9 col-lg-6 col-xl-5">

              <AutoComplete {...this.bind(m => m.registryOffice.name)}
                            fullHtmlName="registryOfficeName"
                            handleChangeCallback={this.clearData}
                            selector={this.selectRegistryOffice}
                            showValue={this.showRegistryOfficeValue}
                            hasSelectedValue={this.model.registryOffice.id && ObjectHelper.isNumber(this.model.registryOffice.id)}
                            handleSelectCallback={this.handleRegistryOfficeSelectOption}
                            triggerLength={0}
                            attributes={attributesClassFormControl}
              />

            </div>
            {this.model.registryOffice && this.model.registryOffice.startDate &&
            <div id='SLUJBA_FORM_START_DATE' className="col-12">
              <div className="alert alert-info">
                <p>{this.getResource('PR_APP_00021_L')}: <b>{this.dateDisplayFor(this.model.registryOffice.startDate, 'YYYY')} {this.getResource('GL_YEAR_ABBREVIATION_L')}</b>
                </p>
              </div>
            </div>
            }
          </div>
        </div>
        {this.model.registryOffice && this.model.registryOffice.startDate &&
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.isBeforeStartDate, 'PR_APP_THE_ACT_IS_ENTERED_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <ValidationSummary key="isBeforeStartDate" {...this.props} propNames={IS_BEFORE_START_DATE}
                             strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          />
          <div className="row">
            <div className="col-12 form-group">
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio"
                       id={'after' + this.groupNameForStartDate} name={this.groupNameForStartDate}
                       checked={this.isSelectedAfterStartDate} onChange={this.onSelectAfterStartDate}/>
                <label className="custom-control-label"
                       htmlFor={'after' + this.groupNameForStartDate}>{this.getResource('PR_APP_AFTER_THE_DATE_L')}</label>
              </div>
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio"
                       id={'before' + this.groupNameForStartDate} name={this.groupNameForStartDate}
                       checked={this.isSelectedBeforeStartDate} onChange={this.onSelectBeforeStartDate}/>
                <label className="custom-control-label"
                       htmlFor={'before' + this.groupNameForStartDate}>{this.getResource('PR_APP_BEFORE_THE_DATE_L')}</label>
              </div>
            </div>
          </div>
        </div>
        }
        {this.model.isBeforeStartDate &&
        <>
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.actOldData, 'PR_APP_DATA_FOR_ACT_L', fieldTitleLabelAttributes)}
                <div className="help-text">
                  <p>{this.getResource('PR_APP_00091_I')}</p>
                </div>
                <ValidationSummary key="actOldData" {...this.props} propNames={ACT_OLD_DATA}
                                   strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-8 col-md-8 col-lg-5 col-xl-3">
                {this.labelFor(m => m.actOldData.actOldNumber, 'PR_APP_ACT_NUMBER_L', requiredFieldAttribute)}
                {this.textBoxFor(m => m.actOldData.actOldNumber, attributesClassFormControl)}
              </div>
              <div className="form-group col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                {this.labelFor(m => m.actOldData.volumeOld, 'PR_APP_VOLUME_L', controlLabelRequiredField)}
                {this.textBoxFor(m => m.actOldData.volumeOld, attributesClassFormControl)}
              </div>
              <div className="form-group col-sm-8 col-md-8 col-lg-5 col-xl-3">
                {this.labelFor(m => m.actOldData.caseNumber, 'PR_APP_FILE_NUMBER_L')}
                {this.textBoxFor(m => m.actOldData.caseNumber, attributesClassFormControl)}
              </div>
              <div className="form-group col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                {this.labelFor(m => m.actOldData.year, 'GL_YEAR_L', requiredFieldAttribute)}
                {this.textBoxFor(m => m.actOldData.year, attributesClassFormControlMaxL4)}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.actOldData.actAdditionalData, 'PR_APP_ACT_ADDITIONAL_DATA_L', requiredFieldAttribute)}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                {this.textAreaFor(m => m.actOldData.actAdditionalData, null, 3, attributesClassFormControl)}
                <div className="help-text-inline">( {this.getResource('PR_APP_ACT_ADDITIONAL_DATA_I')} )</div>
              </div>
            </div>
          </div>
        </>
        }
        <fieldset id='afterStartDate' className={(this.model.isBeforeStartDate === false) ? '' : 'd-none'}>
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.actData, 'PR_APP_DATA_FOR_ACT_L', fieldTitleLabelAttributes)}
                <ValidationSummary key="actData" {...this.props}
                                   propNames={ACT_DATA_AND_DATA_FOR_REGISTRATION_OF_DOCUMENT_IN_BOOK}
                                   strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                />
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col">
                <fieldset id='InBookFieldset'>
                  <div className="row">
                    <div className="form-group col-sm-8 col-md-8 col-lg-5 col-xl-3">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInBook.actNumber, 'PR_APP_ACT_NUMBER_L', fieldTittleRequiredAttributes)}
                      {this.textBoxFor(m => m.actData.dataForRegistrationOfDocumentInBook.actNumber, attributesClassFormControl)}
                    </div>
                    <div className="form-group col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInBook.volume, 'PR_APP_VOLUME_L', fieldTittleRequiredAttributes)}
                      {this.textBoxFor(m => m.actData.dataForRegistrationOfDocumentInBook.volume, attributesClassFormControl)}
                    </div>
                    <div className="form-group col-sm-8 col-md-8 col-lg-8 col-xl">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInBook.book, 'PR_APP_BOOK_L', fieldTittleRequiredAttributes)}
                      {
                        this.dropDownListFor(m => m.actData.dataForRegistrationOfDocumentInBook.book.id,
                          this.bookSelectOptions, attributesClassFormControl,
                          this.onBookSelected,
                          true,
                          this.getResource('GL_CHOICE_L'))
                      }
                    </div>
                    <div className="form-group col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInBook.year, 'GL_YEAR_L', fieldTittleRequiredAttributes)}
                      {this.textBoxFor(m => m.actData.dataForRegistrationOfDocumentInBook.year, attributesClassFormControlMaxL4)}
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="help-text">
                  <p>{this.getResource('PR_APP_00090_I')}</p>
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-12">
                <ValidationSummary key="actData" {...this.props}
                                   propNames={DATA_FOR_REGISTRATION_OF_DOCUMENT_IN_INCOMING_REGISTER}
                                   strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                />
              </div>
              <div className="col-auto">
                <div className="custom-control custom-checkbox">
                  <input className="custom-control-input" type="checkbox"
                         id='IncomingRegister'
                         checked={this.isInIncomingRegisterSelected} onChange={this.onSelectIncomingRegister}/>
                  <label className="custom-control-label" htmlFor='IncomingRegister'></label>
                </div>
              </div>
              <div className="col">
                <fieldset id='IncomingRegisterFieldset'>
                  <div className="row">
                    <div className="form-group col-sm-8 col-md-8 col-lg-5 col-xl-3">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInIncomingRegister.incomingRegisterNumber, 'PR_APP_00038_L')}
                      {this.textBoxFor(m => m.actData.dataForRegistrationOfDocumentInIncomingRegister.incomingRegisterNumber, attributesClassFormControl)}
                    </div>
                    <div className="form-group col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInIncomingRegister.registrationDate, 'GL_DATE_L')}
                      <Date
                        disabled={!this.isInIncomingRegisterSelected} {...this.bind(m => m.actData.dataForRegistrationOfDocumentInIncomingRegister.registrationDate)} />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-12">
                <ValidationSummary key="actData" {...this.props}
                                   propNames={DATA_FOR_REGISTRATION_OF_DOCUMENT_IN_DOUBLE_INCOMING_REGISTER}
                                   strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                />
              </div>
              <div className="col-auto">
                <div className="custom-control custom-checkbox">
                  <input className="custom-control-input" type="checkbox"
                         id='DoubleIncomingRegister' name={this.groupNameForActData}
                         checked={this.isDoubleIncomingRegisterSelected}
                         onChange={this.onSelectDoubleIncomingRegister}/>
                  <label className="custom-control-label" htmlFor='DoubleIncomingRegister'></label>
                </div>
              </div>
              <div className="col">
                <fieldset id='DoubleIncomingRegisterFieldset'>
                  <div className="row">
                    <div className="form-group col-sm-8 col-md-8 col-lg-5 col-xl-3">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.doubleIncomingRegisterNumber, 'PR_APP_00017_L')}
                      {this.textBoxFor(m => m.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.doubleIncomingRegisterNumber, attributesClassFormControl)}
                    </div>
                    <div className="form-group col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
                      {this.labelFor(m => m.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.year, 'GL_YEAR_L')}
                      {this.textBoxFor(m => m.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.year, attributesClassFormControlMaxL4)}
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </fieldset>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_APP_COPY_OF_ACT_L")}</h2>

      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_REASON_FOR_THE_COPY_L')}</h3>
        <p className="field-text">
          {this.model.copyReason}
        </p>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('copyReason')}/>
      </div>
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_REGISTRATION_OFFICE_L')}</h3>
        <p className="field-text">
          {this.model.registryOffice && this.model.registryOffice.name}
        </p>
        <ValidationSummaryPreviewUI  {...this.props} propNames={REGISTRY_OFFICE_NAME}
                                     strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                                     model={this.model}/>
      </div>
      {// we check this.model.isBeforeStartDate != null because isBeforeStartDate is not saved in the xml and when we load from xml (when user opens old application) it will not be initialized!
        this.model.registryOffice && this.model.registryOffice.name &&
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_APP_THE_ACT_IS_ENTERED_L')}</h3>
          {(this.model.isBeforeStartDate != null) && (this.model.isBeforeStartDate != undefined) &&
          <p className="field-text">
            {
              this.model.isBeforeStartDate &&
              <>{this.getResource('PR_APP_BEFORE_THE_DATE_L')}</>
            }
            {
              (this.model.isBeforeStartDate === false) &&
              <>{this.getResource('PR_APP_AFTER_THE_DATE_L')}</>
            }
          </p>
          }
          <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('isBeforeStartDate')}/>
        </div>
      }
      {(this.model.isBeforeStartDate != null) &&
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_DATA_FOR_ACT_L')}</h3>
        <p className="field-text">
          {this.isActDataNotEmpty() ? this.renderActData() : this.renderActOldData()}
        </p>
        {this.model.actData &&
        <ValidationSummaryErrorsPreviewUI errors={this.model.actData.getModelErrors()}/>}
        {this.model.actOldData &&
        <ValidationSummaryErrorsPreviewUI errors={this.model.actOldData.getModelErrors()}/>}
        {this.model.actOldData &&
        <ValidationSummaryErrorsPreviewUI errors={this.model.actOldData.getPropertyErrors('actAdditionalData')}/>}
        <ValidationSummaryPreviewUI key="actDataactOldData" {...this.props} propNames={ACT_DATA_AND_ACT_OLD_DATA}
                                    strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
                                    model={this.model}/>
      </div>
      }
      {this.model.actOldData && (ObjectHelper.isStringNullOrEmpty(this.model.actOldData.actAdditionalData) == false) &&
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_ACT_ADDITIONAL_DATA_L')}</h3>
        <p className="field-text">
          {this.model.actOldData.actAdditionalData}
        </p>
      </div>
      }
    </>);
  }

  private renderActOldData(): string {
    let result = [];
    if (this.model.actOldData) {
      if (ObjectHelper.isStringNullOrEmpty(this.model.actOldData.actOldNumber) == false)
        result.push(this.getResource('PR_APP_ACT_NUMBER_L') + ': ' + this.model.actOldData.actOldNumber);

      if (ObjectHelper.isStringNullOrEmpty(this.model.actOldData.year) == false)
        result.push(this.model.actOldData.year + ' ' + this.getResource('GL_YEAR_ABBREVIATION_L'));

      if (ObjectHelper.isStringNullOrEmpty(this.model.actOldData.volumeOld) == false)
        result.push(this.getResource('PR_APP_VOLUME_L') + ': ' + this.model.actOldData.volumeOld);

      if (ObjectHelper.isStringNullOrEmpty(this.model.actOldData.caseNumber) == false)
        result.push(this.getResource('PR_APP_FILE_NUMBER_L') + ': ' + this.model.actOldData.caseNumber);
    }

    return result.join(', ');
  }

  private renderActData(): JSX.Element {
    let inBookData = [];
    let inIncomingRegisterData = [];
    let inDoubleIncomingRegisterData = [];

    if (this.model.actData && this.model.actData.dataForRegistrationOfDocumentInBook) {
      if (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.actNumber) == false)
        inBookData.push(this.getResource('PR_APP_ACT_NUMBER_L') + ': ' + this.model.actData.dataForRegistrationOfDocumentInBook.actNumber);

      if (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.year) == false)
        inBookData.push(this.model.actData.dataForRegistrationOfDocumentInBook.year + ' ' + this.getResource('GL_YEAR_ABBREVIATION_L'));

      if (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.volume) == false)
        inBookData.push(this.getResource('PR_APP_VOLUME_L') + ' ' + this.model.actData.dataForRegistrationOfDocumentInBook.volume);

      if (this.model.actData.dataForRegistrationOfDocumentInBook.book &&
        (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.book.name) == false))
        inBookData.push(this.getResource('PR_APP_BOOK_L') + ': ' + this.model.actData.dataForRegistrationOfDocumentInBook.book.name);
    }

    if (this.model.actData && this.model.actData.dataForRegistrationOfDocumentInIncomingRegister) {
      if (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.incomingRegisterNumber) == false)
        inIncomingRegisterData.push(this.getResource('PR_APP_00038_L') + ': ' + this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.incomingRegisterNumber);

      if (this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.registrationDate) {
        inIncomingRegisterData.push(this.getResource('GL_DATE_L') + ': '
          + this.dateDisplayFor(this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.registrationDate)
          + ' ' + this.getResource('GL_YEAR_ABBREVIATION_L'));
      }
    }

    if (this.model.actData && this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister) {
      if (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.doubleIncomingRegisterNumber) == false)
        inDoubleIncomingRegisterData.push(this.getResource('PR_APP_00017_L') + ': ' + this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.doubleIncomingRegisterNumber);

      if (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.year) == false)
        inDoubleIncomingRegisterData.push(this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.year + ' ' + this.getResource('GL_YEAR_ABBREVIATION_L'));
    }

    let inBookResultLine = inBookData.join(', ');
    let inIncomingRegisterResultLine = inIncomingRegisterData.join(', ');
    let inDoubleIncomingRegisterResultLine = inDoubleIncomingRegisterData.join(', ');

    return (
      <>
        {inBookResultLine}
        {inBookResultLine && (inIncomingRegisterResultLine || inDoubleIncomingRegisterResultLine) && <br/>}
        {inIncomingRegisterResultLine}
        {inIncomingRegisterResultLine && inDoubleIncomingRegisterResultLine && <br/>}
        {inDoubleIncomingRegisterResultLine}
      </>
    );
  }

  selectRegistryOffice(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    return Promise.resolve(this.registryOfficesSelectOptions.filter(v => v.name.toLowerCase().indexOf(valueLowerCase) > -1));
  }

  @action handleRegistryOfficeSelectOption(value?: RegistryOffice) {
    if (value) {
      this.model.registryOffice.id = value.id;
      this.model.registryOffice.name = value.name;
      this.model.registryOffice.startDate = value.startDate;
      this.props.onRegistryOfficeSelected(value.id);
    } else {
      this.model.registryOffice.clear();
    }
  }

  showRegistryOfficeValue(value: RegistryOffice): string {
    return value.name;
  }

  @action clearData() {
    if (this.model) {
      this.model.registryOffice.id = null;
      this.model.registryOffice.startDate = null;
      this.model.isBeforeStartDate = null;
      this.isSelectedAfterStartDate = false;
      this.isSelectedBeforeStartDate = false;
    }
  }

  @action onBookSelected(e: any) {
    var value = e.target.value;
    if (value) {
      NomenclaturesPR.getBooks().then(books => {
        var bookSelected = books.filter(book => value == book.id)[0];

        runInAction(() => {
          this.model.actData.dataForRegistrationOfDocumentInBook.book.id = bookSelected.id;
          this.model.actData.dataForRegistrationOfDocumentInBook.book.name = bookSelected.name;
          this.model.actData.dataForRegistrationOfDocumentInBook.book.typeId = bookSelected.typeId;
        })
      })
    } else {
      this.model.actData.dataForRegistrationOfDocumentInBook.book.clear();
    }
  }

  @action onSelectBeforeStartDate(): void {
    this.model.isBeforeStartDate = true;
    this.isSelectedAfterStartDate = false;
    this.isSelectedBeforeStartDate = true;

    if (this.model.actData) {
      this.model.actData.dataForRegistrationOfDocumentInBook.clear();
      this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.clear();
      this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.clear();
    }
  }

  @action onSelectAfterStartDate(): void {
    this.model.isBeforeStartDate = false;
    this.isSelectedBeforeStartDate = false;
    this.isSelectedAfterStartDate = true;

    if (this.model.actOldData)
      this.model.actOldData.clear();
  }

  @action getBooks(): void {
    this.props.registerAsyncOperation(NomenclaturesPR.getBooks().then(books => {
      this.bookSelectOptions = books.map(book => {
        return new SelectListItem({
          selected: false,
          text: book.name,
          value: book.id
        });
      });
    }));
  }

  @action onSelectDoubleIncomingRegister(): void {
    this.isDoubleIncomingRegisterSelected = !this.isDoubleIncomingRegisterSelected;
    this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.clear();
    this.changeDisabledProperty(this.isDoubleIncomingRegisterSelected, 'DoubleIncomingRegisterFieldset');
  }

  @action onSelectIncomingRegister(): void {
    this.isInIncomingRegisterSelected = !this.isInIncomingRegisterSelected;
    this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.clear();
    this.changeDisabledProperty(this.isInIncomingRegisterSelected, 'IncomingRegisterFieldset');
  }

  private changeDisabledProperty(enable: boolean, elementId: string): void {
    // fieldset with attribute 'disabled' doesn't work in IE
    if (enable)
      $('#' + elementId).find('input, textarea, select, button').removeAttr('disabled');
    else
      $('#' + elementId).find('input, textarea, select, button').attr('disabled', 'disabled');
  }

  private isActDataNotEmpty(): boolean {
    return (this.model.actData && (this.isInBookDataNotEmpty() || this.isInRegisterDataNotEmpty() || this.isInDoubleRegisterDataNotEmpty()));
  }

  private isInBookDataNotEmpty(): boolean {
    if (this.model.actData && this.model.actData.dataForRegistrationOfDocumentInBook) {
      if ((ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.actNumber) == false)
        || (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.volume) == false)
        || (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.book.id) == false)
        || (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInBook.year) == false)) {
        return true;
      }
    }
    return false;
  }

  private isInRegisterDataNotEmpty(): boolean {
    if (this.model.actData && this.model.actData.dataForRegistrationOfDocumentInIncomingRegister) {
      if ((ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.incomingRegisterNumber) == false)
        || this.model.actData.dataForRegistrationOfDocumentInIncomingRegister.registrationDate) {
        return true;
      }
    }
    return false;
  }

  private isInDoubleRegisterDataNotEmpty(): boolean {
    if (this.model.actData && this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister) {
      if ((ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.doubleIncomingRegisterNumber) == false)
        || (ObjectHelper.isStringNullOrEmpty(this.model.actData.dataForRegistrationOfDocumentInDoubleIncomingRegister.year) == false)) {
        return true;
      }
    }
    return false;
  }
}

export const ActRequestingACopyUI = withAsyncFrame(ActRequestingACopyUIImpl);
