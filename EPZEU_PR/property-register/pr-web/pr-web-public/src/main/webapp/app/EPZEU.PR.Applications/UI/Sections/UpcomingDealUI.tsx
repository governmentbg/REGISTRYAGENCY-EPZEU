import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import {
  EPZEUBaseComponent,
  fieldTitleLabelAttributes,
  fieldTittleRequiredAttributes,
  ValidationSummary,
  ValidationSummaryStrategy
} from 'EPZEU.Core';
import { SectionTitleUI, ApplicationInfoUI, ValidationSummaryErrorsPreviewUI, UpcomingDealsSearchResult } from "EPZEU.PR.ApplicationBase";
import { observer } from 'mobx-react';
import * as React from 'react';
import { UpcomingDeal } from '../../Models/Sections/UpcomingDeal';
import { observable, action } from 'mobx';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ObjectHelper, Helper } from 'Cnsys.Core';
import {ReportsDataService} from "../../../EPZEU.PR.Reports/Services/ReportsDataService";

interface UpcomingDealUIProps extends AsyncUIProps, BaseProps {
}

const CADASTRAL_IDS = ['cadastralIds'];

@observer
export class UpcomingDealUIUIImpl extends EPZEUBaseComponent<UpcomingDealUIProps, UpcomingDeal> {
  @observable private _showModal: boolean = false;
  @observable private _foundOtherDeals: boolean = false;
  @observable private _lastIDSearched: string;
  @observable private _cadastralIdToAdd: string = "";
  private _service: ReportsDataService;
  @observable private _isCadastralIdValid: boolean = true;
  @observable private _isCadastralIdDuplicated: boolean = false;
  private _validationError: string;
  private _duplicatedCadastralIdValidationError: string;

  constructor(props?: UpcomingDealUIProps) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeCadastralID = this.onChangeCadastralID.bind(this);
    this.onAddCadastralID = this.onAddCadastralID.bind(this);
    this.deleteCadastralID = this.deleteCadastralID.bind(this);

    this._service = new ReportsDataService();
    this._validationError = this.getResource('PR_APP_00066_E'); // Въведете валиден кадастрален идентификатор
    this._duplicatedCadastralIdValidationError = this.getResource('PR_UPCOMING_DEALS_ALREADY_ADDED_E') // Имот с въведения кадастрален идентификатор вече е добавен в списъка с имоти по сделката
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_UPCOMING_DEALS_L'} anchor="upcomingDeal" />
        <ApplicationInfoUI infoTextKey={'PR_INSTRUCT_UPCOMING_TRANSACT_I'} />
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.cadastralIds, 'PR_PROPERTY_LIST_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <ValidationSummary key="cadastralIds" {...this.props} propNames={CADASTRAL_IDS}
            strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          />
          {
            this.model.cadastralIds && this.model.cadastralIds.map((el, index) =>
              <React.Fragment key={el}>
                <div id={'cadastralId_' + index} className='interactive-container interactive-container--form'>
                  <div className='interactive-container__content record-container'>
                    <div className='row'>
                      <div className='form-group col-12'>
                        <div className='field-container'>
                          <p className='form-text'>
                            <span className='field-title field-title--preview'>{this.getResource('PR_APP_CADASTRAL_IDENTIFIER_L')}: </span>{el}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='interactive-container__controls'>
                    <button title={this.getResource('GL_DELETE_L')} className="btn btn-outline-light btn-sm" onClick={() => this.deleteCadastralID(index)}
                            onMouseOver={()=>{$('#cadastralId_' + index).addClass('interactive-container--focus')}}
                            onMouseOut={()=>{$('#cadastralId_' + index).removeClass('interactive-container--focus')}}
                    >
                      <i className='ui-icon ui-icon-times' aria-hidden></i>
                    </button>
                  </div>
                </div>
                {
                  (index < (this.model.cadastralIds.length - 1)) &&
                  <hr className='hr--doted-line' />
                }
              </React.Fragment>
            )
          }
          <div className="row">
            <div className="form-group col">
              <hr />
              <button id="add-f1" className="btn btn-outline-light text-dark" onClick={this.openModal}>
                <i className='ui-icon ui-icon-plus'></i>
                {' ' + this.getResource('PR_ADD_PROPERTY_L')}
              </button>
            </div>
          </div>
        </div>
        <Modal centered={true} backdrop={true} autoFocus={true} isOpen={this._showModal} onExit={this.closeModal} toggle={this.closeModal}>
          <ModalHeader toggle={this.closeModal} >
            {this.getResource('PR_PROPERTY_LIST_SECT_L')}
          </ModalHeader>
          <ModalBody>
            {
              this._foundOtherDeals &&
              <div className='alert alert-warning'>
                <p>{this.getResource('PR_UPCOMING_DEALS_ALREADY_REGIST_E')}</p>
              </div>
            }
            <div className="field-container">
              <div className="row">
                <div className="form-group col-sm-6">
                  {this.labelFor(m => m.cadastralIds, 'PR_APP_CADASTRAL_IDENTIFIER_L', fieldTitleLabelAttributes)}
                  <input type="text" onChange={this.onChangeCadastralID} value={this._cadastralIdToAdd} className={this._isCadastralIdValid ? 'form-control' : 'form-control input-error'} />
                  {
                    !this._isCadastralIdValid &&
                    <ul className='invalid-feedback'>
                      <li>{this._validationError}</li>
                    </ul>
                  }
                  {
                    this._isCadastralIdValid && this._isCadastralIdDuplicated &&
                    <ul className='invalid-feedback'>
                      <li>{this._duplicatedCadastralIdValidationError}</li>
                    </ul>
                  }
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="button-bar">
              <div className="left-side">
                <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_REFUSE_L')}</button>
              </div>
              <div className="right-side">
                <button id="BTN_MODAL_OK" type="button" className="btn btn-primary" disabled={ObjectHelper.isStringNullOrEmpty(this._cadastralIdToAdd) || this._isCadastralIdDuplicated} onClick={this.onAddCadastralID} data-dismiss="modal">{(!ObjectHelper.isStringNullOrEmpty(this._lastIDSearched) && (this._lastIDSearched == this._cadastralIdToAdd)) ? this.getResource('PR_CONFIRM_PROPERTY_ADD_L') : this.getResource('GL_ADD_L')}</button>
              </div>
            </div>
          </ModalFooter>
        </Modal >
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.propertyDealType, 'PR_TRANSACT_TYPE_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="col-12 form-group">
              {this.textAreaFor(m => m.propertyDealType, null, 3, null, null)}
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.propertyDealDate, 'PR_DEAL_DATE_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.dateFor(m => m.propertyDealDate)}
            </div>
          </div>
        </div>
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.propertyDealTime, 'PR_DEAL_TIME_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.timeFor(m => m.propertyDealTime, null, null, false)}
            </div>
          </div>
        </div>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_UPCOMING_DEALS_L")}</h2>

      <div className='field-container'>
        <h3 className='field-title field-title--preview'>{this.getResource('PR_PROPERTY_LIST_L')}</h3>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('cadastralIds')} />
        {
          this.model.cadastralIds && this.model.cadastralIds.map((el, index) =>
            <React.Fragment key={el}>
              <div className='record-container record-container--preview'>
                <p className='form-text'>{el}</p>
              </div>
              {
                (index < (this.model.cadastralIds.length - 1)) &&
                <hr className='hr--preview' />
              }
            </React.Fragment>
          )
        }
      </div>
      <div className='field-container'>
        <h3 className='field-title field-title--preview'>{this.getResource('PR_TRANSACT_TYPE_L')}</h3>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('propertyDealType')} />
        <p className='field-text'>{this.model.propertyDealType}</p>
      </div>
      <div className='field-container'>
        <h3 className='field-title field-title--preview'>{this.getResource('PR_DEAL_DATE_L')}</h3>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('propertyDealDate')} />
        <p className='field-text'>{this.dateDisplayFor(this.model.propertyDealDate)}  {this.model.propertyDealDate && this.getResource('GL_YEAR_ABBREVIATION_L')}</p>
      </div>
      {this.model.propertyDealTime &&
        <div className='field-container'>
          <h3 className='field-title field-title--preview'>{this.getResource('PR_DEAL_TIME_L')}</h3>
          <p className='field-text'>{this.dateDisplayFor(this.model.propertyDealTime, 'HH:mm')} {this.getResource('GL_HOUR_ABBREVIATION_L')}</p>
        </div>
      }
    </>);
  }

  @action openModal() {
    this._showModal = true;
  }

  @action closeModal() {
    this._cadastralIdToAdd = "";
    this._foundOtherDeals = false;
    this._showModal = false;
    this._lastIDSearched = null;
    this._isCadastralIdValid = true;
    this._isCadastralIdDuplicated = false;
  }

  @action onChangeCadastralID(e: any) {
    this._cadastralIdToAdd = e.target.value;
    this._foundOtherDeals = false;
    this._isCadastralIdValid = Helper.regex.isMatch(this._cadastralIdToAdd, '^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$');
    if(this._isCadastralIdValid) {
     this._isCadastralIdDuplicated = this.model.cadastralIds.filter(id => id == this._cadastralIdToAdd).length > 0;
    }
  }

  @action private onAddCadastralID(): void {
    if (this._isCadastralIdValid) {
      if (this._cadastralIdToAdd == this._lastIDSearched) {
        this.model.cadastralIds.push(this._cadastralIdToAdd);
        this.closeModal();
      } else {
        this.props.registerAsyncOperation(
          this._service.searchUpcomingDeals(this._cadastralIdToAdd).then((response: UpcomingDealsSearchResult) => {
            if (response.deals && response.deals.length > 0) {
              this._lastIDSearched = this._cadastralIdToAdd;
              this._foundOtherDeals = true;
            } else {
              this.model.cadastralIds.push(this._cadastralIdToAdd);
              this.closeModal();
            }
          })
        );
      }
    }
  }

  @action deleteCadastralID(index: number) {
    this.model.cadastralIds.splice(index, 1);
  }
}

export const UpcomingDealUI = withAsyncFrame(UpcomingDealUIUIImpl);
