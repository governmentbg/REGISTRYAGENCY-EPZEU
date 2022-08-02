import { BaseProps } from 'Cnsys.UI.React';
import {EPZEUBaseComponent, fieldTitleLabelAttributes} from 'EPZEU.Core';
import { SectionTitleUI } from 'EPZEU.PR.ApplicationBase';
import * as React from "react";
import { WayOfProvisionBaseData } from '../../Models/Sections/WayOfProvisionBaseData';

interface WayOfProvisionInfoUIProps extends BaseProps {
  infoMessage?: string;
}

export class WayOfProvisionInfoUI extends EPZEUBaseComponent<WayOfProvisionInfoUIProps, WayOfProvisionBaseData> {

  constructor(props?: WayOfProvisionInfoUIProps) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L'} anchor="wayOfProvision" />
        {this.model.issuingAuthority && this.model.issuingAuthority.name &&
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m.issuingAuthority.name, 'PR_APP_ISSUING_AUTHORITY_OF_A_COPY_L', fieldTitleLabelAttributes)}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                <p className='field-text'>{this.model.issuingAuthority.name}</p>
              </div>
            </div>
          </div>
        }
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              <label className="field-title field-title--form">{this.getResource('PR_APP_RES_DELIVERY_METHOD_L')}</label>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <p className="field-text">{this.getResource(this.props.infoMessage)}</p>
            </div>
          </div>
        </div>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L")}</h2>

      {this.model.issuingAuthority && this.model.issuingAuthority.name &&
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('PR_APP_ISSUING_AUTHORITY_OF_A_COPY_L')}</h3>
          <p className='field-text'>{this.model.issuingAuthority.name}</p>
        </div>
      }
      <div className="field-container">
        <h3 className="field-title field-title--preview">{this.getResource('PR_APP_RES_DELIVERY_METHOD_L')}</h3>
        <p className='field-text'>{this.getResource(this.props.infoMessage)}</p>
      </div>
    </>);
  }
}
