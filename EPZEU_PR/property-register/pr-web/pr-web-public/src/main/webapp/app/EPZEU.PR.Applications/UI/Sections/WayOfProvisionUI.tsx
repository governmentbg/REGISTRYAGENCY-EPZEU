import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable, runInAction } from 'mobx';
import { ObjectHelper, SelectListItem } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import {
  attributesClassFormControl,
  AutoComplete,
  EPZEUBaseComponent,
  fieldTittleRequiredAttributes,
  Nomenclatures,
  ValidationSummaryErrors,
  ValidationSummaryStrategy
} from 'EPZEU.Core';
import { NomenclaturesPR, RegistryOffice } from 'EPZEU.PR.Core';
import {
  ApplicationFormContextProviderProps,
  ServiceTypes,
  InputInfoUI,
  SectionTitleUI,
  ValidationSummaryErrorsPreviewUI,
  ValidationSummaryPreviewUI,
  withApplicationFormContext
} from "EPZEU.PR.ApplicationBase";
import { WayOfProvision } from '../../Models/Sections/WayOfProvision';
import { IApplicationForCertificateForPropertyFormManager } from "../../Common/ApplicationForCertificateForPropertyFormManager";

interface WayOfProvisionUIProps extends AsyncUIProps, BaseProps, ApplicationFormContextProviderProps {
  isCorrectiveApplication?: boolean;
  infoTextKey: string;
  issuingAuthorityReadOnly?: boolean;
}

const ISSUING_AUTHORITY_ID = ['issuingAuthority.name'];
const RECEIVING_OFFICE_ID = ['receivingOffice.name'];
const SERVICE_TYPE = ['serviceType'];

@observer
export class WayOfProvisionUIImpl extends EPZEUBaseComponent<WayOfProvisionUIProps, WayOfProvision> {
  private groupNameDeliveryMethod: string;
  private groupName: string;

  @observable private serviceTypes: SelectListItem[];
  @observable private issuingAuthorities: RegistryOffice[];
  @observable private receivingOffices: RegistryOffice[];
  //@observable private receivingOffice: RegistryOffice;

  constructor(props?: WayOfProvisionUIProps) {
    super(props);

    this.groupName = ObjectHelper.newGuid();
    this.groupNameDeliveryMethod = ObjectHelper.newGuid();

    this.getServiceTypes = this.getServiceTypes.bind(this);
    this.getRegisrtyAndReceivingOffices = this.getRegisrtyAndReceivingOffices.bind(this);
    this.serviceTypeSelectOption = this.serviceTypeSelectOption.bind(this);
    this.onCheckElectronicImageDeliveryMethod = this.onCheckElectronicImageDeliveryMethod.bind(this);
    this.onCheckOnCornerDeliveryMethod = this.onCheckOnCornerDeliveryMethod.bind(this);

    this.handleIssuingAuthoritySelectOption = this.handleIssuingAuthoritySelectOption.bind(this);
    this.clearIssuingAuthorityData = this.clearIssuingAuthorityData.bind(this);
    this.selectIssuingAuthority = this.selectIssuingAuthority.bind(this);

    this.handleReceivingOfficeSelectOption = this.handleReceivingOfficeSelectOption.bind(this);
    this.clearReceivingOfficeData = this.clearReceivingOfficeData.bind(this);
    this.selectReceivingOffice = this.selectReceivingOffice.bind(this);

    this.getServiceTypes();
    this.getRegisrtyAndReceivingOffices();

    if (!this.props.isCorrectiveApplication && this.props.issuingAuthorityReadOnly) {
      (this.props.applicationManager as IApplicationForCertificateForPropertyFormManager).getRegistryOffice().bind(this).then(ro => this.model.issuingAuthority = ro);
    }

    if ((this.model.selectedElectronicImageDeliveryMethod === undefined || !this.model.selectedElectronicImageDeliveryMethod)
      && (this.model.selectedOnCornerDeliveryMethod === undefined || !this.model.selectedOnCornerDeliveryMethod)) {
      this.model.selectedOnCornerDeliveryMethod = true;
    }
    this.model.selectedElectronicImageDeliveryMethod = this.model.selectedElectronicImageDeliveryMethod ? true : false;
  }

  private getServiceTypes(): void {
    this.serviceTypes = new Array<SelectListItem>();
    //TODO only for register
    this.props.registerAsyncOperation(Nomenclatures.getServices().then(services => {
      services.map(service => {
        if (this.props.applicationManager.application.appFormType == service.appTypeID) {
          service.serviceTypeIDs.map(serviceType => {
            this.serviceTypes.push(new SelectListItem({
              selected: false,
              text: this.getResource(ServiceTypes[serviceType]),
              value: serviceType
            }));
          })
        }
      });
      if (this.model.serviceTypeId) {
        this.model.serviceType = this.serviceTypes.filter(dm => dm.value == this.model.serviceTypeId.toString())[0].text;
      }
    }));
  }

  private getRegisrtyAndReceivingOffices(): void {
    this.receivingOffices = new Array<RegistryOffice>();
    this.issuingAuthorities = new Array<RegistryOffice>();

    this.props.registerAsyncOperation(NomenclaturesPR.getRegistryOffice().then(registryOffices => {
      runInAction(() => {

        if (this.props.isCorrectiveApplication && this.model.receivingOffice && registryOffices.filter(r => r.id == this.model.receivingOffice.id)[0]) {
          // There may have been a change in the nomenclature since the initial application was processed. So, we update it in the correction application.
          // Otherwise, the server would return error (because of the invalid nomenclature element), but the user wouldn't know what is the problem because
          // he/she would see the new value/name of the element (dropdowns only take the id of the element
          // and then visualise the value for this id from the nomenclature, not the real value / name which is set in the model)!
          this.model.receivingOffice.name = registryOffices.filter(r => r.id == this.model.receivingOffice.id)[0].name;
        }

        registryOffices.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        this.issuingAuthorities = registryOffices.slice(0);
        this.receivingOffices = registryOffices.slice(0);

      })
    }));
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L'} anchor="wayOfProvision" />
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              <div className="form-text">
              {this.labelFor(m => m.issuingAuthority.id, 'PR_APP_ISSUING_AUTHORITY_L', fieldTittleRequiredAttributes)}
              </div>
             </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.props.isCorrectiveApplication || (this.props.issuingAuthorityReadOnly) ?
                <>
                  {this.model.issuingAuthority && this.model.issuingAuthority.name}
                </> :
                <>
                  <AutoComplete {...this.bind(m => m.issuingAuthority.name)}
                                handleChangeCallback={this.clearIssuingAuthorityData}
                                selector={this.selectIssuingAuthority}
                                showValue={this.showIssuingAuthorityValue}
                                hasSelectedValue={this.model.issuingAuthority && this.model.issuingAuthority.id && ObjectHelper.isNumber(this.model.issuingAuthority.id)}
                                handleSelectCallback={this.handleIssuingAuthoritySelectOption}
                                triggerLength={0}
                                attributes={attributesClassFormControl}
                  />
                </>
              }
              <InputInfoUI infoTextKey={this.props.infoTextKey} />
            </div>
          </div>
        </div>

        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.selectedOnCornerDeliveryMethod, 'PR_APP_RES_DELIVERY_METHOD_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <ValidationSummaryErrors errors={this.model.getModelErrors()} />
          <div className="row">
            <div className="col-12 form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="electronic-image-delivery-method-checkbox" className="custom-control-input"
                  onChange={this.onCheckElectronicImageDeliveryMethod}
                  checked={this.model.selectedElectronicImageDeliveryMethod}></input>
                <label htmlFor="electronic-image-delivery-method-checkbox"
                  className="custom-control-label">{this.getResource('PR_APP_CERT_COPY_ELECTRONICALLY_L')}</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="on-corner-delivery-method-checkbox" className="custom-control-input"
                  onChange={this.onCheckOnCornerDeliveryMethod}
                  checked={this.model.selectedOnCornerDeliveryMethod}></input>
                <label htmlFor="on-corner-delivery-method-checkbox"
                  className="custom-control-label">{this.getResource('PR_ON_THE_COUNTER_L')}</label>
              </div>
            </div>
          </div>
        </div>
        {this.model.selectedOnCornerDeliveryMethod
          ?
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.receivingOffice.id, 'PR_APP_RECEIVING_OFFICE_L', fieldTittleRequiredAttributes)}
              </div>
            </div>
            {this.model.receivingOffice ?
              <ValidationSummaryErrors errors={this.model.receivingOffice.getModelErrors()} />
              : null}
            <div className="row">
              <div className="form-group col-sm-6">
                <AutoComplete {...this.bind(m => m.receivingOffice.name)}
                              handleChangeCallback={this.clearReceivingOfficeData}
                              selector={this.selectReceivingOffice}
                              showValue={this.showReceivingOfficeValue}
                              hasSelectedValue={this.model.receivingOffice && this.model.receivingOffice.id && ObjectHelper.isNumber(this.model.receivingOffice.id)}
                              handleSelectCallback={this.handleReceivingOfficeSelectOption}
                              triggerLength={0}
                              attributes={attributesClassFormControl}
                />
              </div>
            </div>
          </div>
          :
          null}

        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m.serviceType, 'GL_SERVICE_TYPE_L', fieldTittleRequiredAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              {this.props.isCorrectiveApplication ?
                <>{this.model.serviceType}</>
                :
                <>
                  {
                    this.serviceTypes.map(serviceType => {
                      return (
                        <div className="custom-control custom-radio" key={serviceType.value}>
                          <input className={"custom-control-input"} type="radio" onChange={this.serviceTypeSelectOption}
                            id={this.groupName + serviceType.value} name={this.groupName}
                            value={serviceType.value}
                            checked={this.model.serviceTypeId == parseInt(serviceType.value)}
                          />
                          <label className={"custom-control-label"}
                            htmlFor={this.groupName + serviceType.value}>{serviceType.text}</label>
                        </div>
                      )
                    })}
                </>
              }
            </div>
          </div>
        </div>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L")}</h2>

      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_ISSUING_AUTHORITY_L')}</h3>
        <p className="field-text">
          {this.model.issuingAuthority && this.model.issuingAuthority.name}
        </p>
        <ValidationSummaryPreviewUI key="issuingAuthority.name" {...this.props} propNames={ISSUING_AUTHORITY_ID}
          strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          model={this.model} />
      </div>
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_RES_DELIVERY_METHOD_L')}</h3>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getModelErrors()} />
        {this.model.selectedElectronicImageDeliveryMethod
          ?
          <div className="field-container" style={{ marginBottom: 0 }}>
            <p className="field-text">
              {this.getResource('PR_APP_CERT_COPY_ELECTRONICALLY_L')}
            </p>
          </div>
          :
          null
        }

        {this.model.selectedOnCornerDeliveryMethod
          ?
          <div className="field-container">
            <p className="field-text">
              {this.getResource('PR_ON_THE_COUNTER_L')}
            </p>
          </div>
          :
          null
        }
      </div>

      {this.model.selectedOnCornerDeliveryMethod
        ?

        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_APP_RECEIVING_OFFICE_L')}</h3>
          <p className="field-text">
            {this.model.receivingOffice && this.model.receivingOffice.name}
          </p>
          <ValidationSummaryPreviewUI key="receivingOffice.name" {...this.props} propNames={RECEIVING_OFFICE_ID}
            strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
            model={this.model} />
        </div>
        : null
      }

      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('GL_SERVICE_TYPE_L')}</h3>
        <p className="field-text">
          {this.model.serviceType}
        </p>
        <ValidationSummaryPreviewUI key="serviceType" {...this.props} propNames={SERVICE_TYPE}
          strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true}
          model={this.model} />
      </div>
    </>);
  }

  @action clearIssuingAuthorityData() {
    if (this.model && this.model.issuingAuthority) {
      this.model.issuingAuthority.id = null;
    }
  }

  showIssuingAuthorityValue(value: RegistryOffice): string {
    return value.name;
  }

  @action handleIssuingAuthoritySelectOption(value: RegistryOffice) {
      if (value) {
        this.model.issuingAuthority.id = value.id;
        this.model.issuingAuthority.name = value.name;
      } else {
        this.model.issuingAuthority.clear();
      }

  }

  selectIssuingAuthority(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    return Promise.resolve(this.issuingAuthorities && this.issuingAuthorities.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) > - 1));
  }

  @action clearReceivingOfficeData() {
    if (this.model && this.model.receivingOffice) {
      this.model.receivingOffice.id = null;
    }
  }

  showReceivingOfficeValue(value: RegistryOffice): string {
    return value.name;
  }

  @action handleReceivingOfficeSelectOption(value: RegistryOffice) {
    if (value) {
      this.model.receivingOffice.id = value.id;
      this.model.receivingOffice.name = value.name;
    } else {
      this.model.receivingOffice.clear();
    }
  }

  selectReceivingOffice(value: string): Promise<RegistryOffice[]> {
    let valueLowerCase = value.toLowerCase().trim();
    return Promise.resolve(this.receivingOffices && this.receivingOffices.filter(s => s.name.toLowerCase().indexOf(valueLowerCase) > - 1));
  }

  @action serviceTypeSelectOption(e: any) {
    var value = e.target.value;
    if (value) {
      this.model.serviceTypeId = value;
      this.model.serviceType = this.serviceTypes.filter(dm => dm.value == this.model.serviceTypeId.toString())[0].text;
    }
  }

  @action onCheckElectronicImageDeliveryMethod(): void {
    this.model.selectedElectronicImageDeliveryMethod = this.model.selectedElectronicImageDeliveryMethod ? false : true;
  }

  @action onCheckOnCornerDeliveryMethod(): void {
    this.model.selectedOnCornerDeliveryMethod = this.model.selectedOnCornerDeliveryMethod ? false : true;
    this.model.receivingOffice.clear();
    if(!this.model.selectedOnCornerDeliveryMethod) {
      this.model.receivingOffice.clearErrors();
    }
  }
}

export const WayOfProvisionUI = withApplicationFormContext(withAsyncFrame(WayOfProvisionUIImpl));
