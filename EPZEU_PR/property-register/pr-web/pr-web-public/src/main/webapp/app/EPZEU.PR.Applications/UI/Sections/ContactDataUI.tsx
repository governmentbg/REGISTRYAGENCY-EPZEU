import * as React from 'react';
import { observer } from 'mobx-react';
import { attributesClassFormControl, EPZEUBaseComponent, fieldTitleLabelAttributes, fieldTittleRequiredAttributes } from 'EPZEU.Core';
import { BaseProps } from 'Cnsys.UI.React';
import { ContactData } from '../../Models/Sections/ContactData';
import { InputInfoUI, SectionTitleUI, ValidationSummaryErrorsPreviewUI } from "EPZEU.PR.ApplicationBase";
import { AddressUI } from "../AddressUI";
import { AddressValidator } from "../../Models/Validators/AddressValidator";
import { ObjectHelper, userContext } from "Cnsys.Core";

@observer export class ContactDataUI extends EPZEUBaseComponent<BaseProps, ContactData> {

  constructor(props?: any) {
    super(props);

  }

  renderEdit(): JSX.Element {
    return (<>
      <SectionTitleUI titleKey={'PR_APP_CONTACT_DATA_L'} anchor="contactData"/>
      <div className="field-container">
        <div className="row">
          <div className="col">
            {this.labelFor(m => m.appEmailAddress, 'PR_APP_EMAIL_ADDRESS_L', fieldTittleRequiredAttributes)}
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            {this.textBoxFor(m => m.appEmailAddress, attributesClassFormControl)}
          </div>
        </div>
      </div>

      <div className="field-container">
        <div className="row">
          <div className="col">
            {this.labelFor(m => m.phone, 'GL_PHONE_L', fieldTittleRequiredAttributes)}
          </div>
        </div>
        <div className="row">
          <div className="form-group col">
            {this.textBoxFor(m => m.phone, attributesClassFormControl)}
            <InputInfoUI infoTextKey={'PR_APP_00009_I'}/>
          </div>
        </div>
      </div>

      <div className="field-container">
        <div className="row">
          <div className="col-12">
            {this.labelFor(m => m.address, 'PR_APP_00008_L', fieldTitleLabelAttributes)}<br/>
          </div>
        </div>
        <AddressUI {...this.bind(m => m.address)}/>
        <div className="row">
          <div className="form-group col-12">
            {this.labelFor(m => m.appAddressee, 'PR_APP_ADDRESSEE_L')}
            {this.textBoxFor(m => m.appAddressee)}
          </div>
        </div>
      </div>
    </>);

  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_APP_CONTACT_DATA_L")}</h2>

      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_EMAIL_ADDRESS_L')}</h3>
        <p className="field-text">
          {this.model.appEmailAddress}
        </p>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('appEmailAddress')}/>
      </div>
      {<></>}
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('GL_PHONE_L')}</h3>
        <p className="field-text">
          {this.model.phone}
        </p>
        <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('phone')}/>
      </div>
      {!(new AddressValidator()).isEmptyAddress(this.model.address) ?
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_APP_00008_L')}</h3>
          <ValidationSummaryErrorsPreviewUI errors={this.model.address.getModelErrors()}/>
          <AddressUI {...this.bind(m => m.address)}/>
        </div>
      : null}

      {this.model.appAddressee ?
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_APP_ADDRESSEE_L')}</h3>
          {this.model.appAddressee}
        </div>
        : null}
    </>);
  }
}
