import * as React from 'react';
import { observable } from "mobx";
import { BaseProps } from 'Cnsys.UI.React';
import { attributesClassFormControl, EPZEUBaseComponent, ValidationSummaryErrors } from 'EPZEU.Core';
import { SelectListItem } from "Cnsys.Core";
import { RegistryOffice } from "EPZEU.PR.Core";
import { ApplicationFormContextProviderProps,ValidationSummaryErrorsPreviewUI, withApplicationFormContext } from "EPZEU.PR.ApplicationBase";
import { IApplicationForCertificateForPropertyFormManager } from "../Common/ApplicationForCertificateForPropertyFormManager";
import { PropertyDocument, PropertyDocumentType } from "../Models/PropertyDocument";

interface PropertyDocumentUIProps extends BaseProps, ApplicationFormContextProviderProps {
}

class PropertyDocumentUIImpl extends EPZEUBaseComponent<PropertyDocumentUIProps, PropertyDocument> {
  @observable private propertyDocumentTypes: SelectListItem[];
  @observable private registryOffice: RegistryOffice;

  constructor(props?: PropertyDocumentUIProps) {
    super(props);
    this.getPropertyDocumentTypes();

    (this.props.applicationManager as IApplicationForCertificateForPropertyFormManager).getRegistryOffice().bind(this).then(ro=> this.registryOffice = ro);
  }

  private getPropertyDocumentTypes(): void {
    this.propertyDocumentTypes = new Array<SelectListItem>();
    this.propertyDocumentTypes.push(new SelectListItem({
        text: this.getResource("PR_APP_00037_L"),
        value: PropertyDocumentType.ACT_OF_OWNERSHIP
      }),
      new SelectListItem({
        text: this.getResource("PR_APP_CERTIFICATE_OF_INHERITENCE_L"),
        value: PropertyDocumentType.CERTIFICATE_FOR_INHERITANCE
      }),
      new SelectListItem({text: this.getResource("PR_APP_OTHER_DOCUMENT_L"), value: PropertyDocumentType.OTHER}));

  }

  renderEdit(): JSX.Element {
    return (
      <>

          <div className="row">
            <div className="col-12 form-group">
              <ValidationSummaryErrors errors={this.model.getModelErrors()}/>
              {this.labelFor(m => m.type, 'GL_DOCUMENT_KIND_L')}
              {this.dropDownListFor(m => m.type, this.propertyDocumentTypes, attributesClassFormControl, null, true, this.getResource('GL_CHOICE_L'))}
            </div>
          </div>

          <div className="row">
            {this.model.type == PropertyDocumentType.ACT_OF_OWNERSHIP ?
              <>
                {this.registryOffice && this.registryOffice.id && this.registryOffice.name ?
                  <div className="form-group col-12">
                    <div className="form-text">{this.registryOffice.name}</div>
                  </div>
                  : null}
                <div className="form-group col-sm-6 col-lg">
                  {this.labelFor(m => m.actNumber, 'PR_APP_ACT_NUMBER_L')}
                  {this.textBoxFor(m => m.actNumber, attributesClassFormControl)}
                </div>
                <div className="form-group col-6 col-sm-6 col-lg-2">
                  {this.labelFor(m => m.volume, 'PR_APP_VOLUME_L')}
                  {this.textBoxFor(m => m.volume, attributesClassFormControl)}
                </div>
                <div className="form-group col-sm-6 col-lg">
                  {this.labelFor(m => m.incomingRegisterNumber, 'PR_APP_00038_L')}
                  {this.textBoxFor(m => m.incomingRegisterNumber, attributesClassFormControl)}
                </div>
                <div className="form-group col-6 col-sm-6 col-lg-auto">
                  {this.labelFor(m => m.propertyDocumentDate, 'GL_DATE_L')}
                  {this.dateFor(m => m.propertyDocumentDate)}
                </div>
              </>
              :
              this.model.type ?
                <div className="form-group col-12">
                  {this.labelFor(m => m.description, 'PR_APP_00044_L')}
                  {this.textAreaFor(m => m.description, null, 5, attributesClassFormControl)}
                </div>
                : null
            }
          </div>

      </>);
  }

  renderDisplay(): JSX.Element {

    return (<>
      <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors('type')} />
      {this.model.type == PropertyDocumentType.ACT_OF_OWNERSHIP ?
        <>
          <div className="row">
            <div className="col-12">
              <p className="field-text">
                {this.getResource( 'GL_DOCUMENT_KIND_L')}{": "}
                {this.propertyDocumentTypes.filter(docType => this.model.type.toString() == docType.value)[0].text}
              </p>
            </div>
          </div>
          <p className="field-text">
            {this.registryOffice && this.registryOffice.name ?
              <>{this.registryOffice.name + ", "}</>
              : null}
            {this.model.actNumber ?
              <>{this.getResource('PR_APP_ACT_NUMBER_L') + ": " + this.model.actNumber}</>
              : null}
            {this.model.volume ?
              <>{", " + this.getResource('PR_APP_VOLUME_L') + ": " + this.model.volume}</>
              : null}
            {this.model.incomingRegisterNumber ?
              <>{", " + this.getResource('PR_APP_00038_L') + ": " + this.model.incomingRegisterNumber}</>
              : null}
            {this.model.propertyDocumentDate ?
              <>{", " + this.getResource('GL_DATE_L') + ": " + this.model.propertyDocumentDate.format('D.M.YYYY')}</>
              : null}
          </p>
        </>
        :
        <>
          {this.model.type ?
            <div className="field-container">
              <div className="row">
                <div className="col-12">
                  <p className="field-text">
                    {this.getResource( 'GL_DOCUMENT_KIND_L')}{": "}
                    {this.propertyDocumentTypes.filter(docType => this.model.type.toString() == docType.value)[0].text}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="field-text">
                  {this.getResource('PR_APP_00044_L')}{": "}
                  {this.model.description}
                  </p>
                </div>
              </div>
             </div>
            : null}
        </>}
      <ValidationSummaryErrorsPreviewUI errors={this.model.getModelErrors()}/>
    </>);
  }
}

export const PropertyDocumentUI  = withApplicationFormContext(PropertyDocumentUIImpl);
