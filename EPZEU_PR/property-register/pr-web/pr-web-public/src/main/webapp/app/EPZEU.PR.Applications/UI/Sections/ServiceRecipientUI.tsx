import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps, withAsyncFrame, AsyncUIProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, fieldTitleLabelAttributes } from 'EPZEU.Core';
import { ApplicantType, SectionTitleUI, LegalEntityDataService, LegalEntityIntegration, PersonType } from 'EPZEU.PR.ApplicationBase';
import { ServiceRecipient } from '../..//Models/Sections/ServiceRecipient';
import * as React from 'react';
import { PersonUI } from "../PersonUI";

interface ServiceRecipientProps extends BaseProps, AsyncUIProps {
  applicantType?: ApplicantType;
}

export class ServiceRecipientUIImpl extends EPZEUBaseComponent<ServiceRecipientProps, ServiceRecipient> {
  private _legalEntityDataService: LegalEntityDataService;

  constructor(props?: ServiceRecipientProps) {
    super(props);
    this.onPersonTypeChange = this.onPersonTypeChange.bind(this);
    this._legalEntityDataService = new LegalEntityDataService();
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'PR_SERVICE_RECIPIENT_L'} anchor="serviceRecipient" />
        <PersonUI {...this.bind(m => m.person)} infoTextKeyForIndividual='PR_APP_00036_I' infoTextKeyForLegalEntity='PR_APP_00035_I' showCompanyCase={true} haveBulstat={true} onPersonTypeChange={this.onPersonTypeChange} />
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("PR_SERVICE_RECIPIENT_L")}</h2>

      {((this.props.applicantType == ApplicantType.Attorney) || (this.props.applicantType == ApplicantType.LegalRepresentative))
        ? <PersonUI {...this.bind(m => m.person)} showCompanyCase={true} />
        :
        <>
          <div className="field-container">
                <h3 className="field-title field-title--preview">{this.getResource("GL_PERSON_TYPE_L")}</h3>
                <p className="field-text">
                  {this.getResource('GL_INDIVIDUAL_L')}
                </p>
                <p className="field-text">
                  {this.model.person.individual.name.firstName && <>{this.model.person.individual.name.firstName + ' '}</>}
                  {this.model.person.individual.name.surName && <>{this.model.person.individual.name.surName + ' '}</>}
                  {this.model.person.individual.name.familyName && <>{this.model.person.individual.name.familyName}</>}
                  {(this.model.person.individual && this.model.person.individual.name &&
                    (this.model.person.individual.name.firstName || this.model.person.individual.name.surName || this.model.person.individual.name.familyName)) && <>, </>}
                  {this.model.person.individual.identity && <>{this.getResource('PR_GL_00001_L')}: {this.model.person.individual.identity}</>}
                </p>
          </div>
          {this.model.person.individual.personNationality.name &&
            <div className="field-container">
              <div className="row">
                <div className="col-12">
                  {this.labelFor(m => m, 'GL_PERSON_NATIONALITY_L', fieldTitleLabelAttributes)}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <p className="field-text">
                    {this.model.person.individual.personNationality.name}
                  </p>
                </div>
              </div>
            </div>
          }
          {this.model.person.individual.birthPlace && ((this.model.person.individual.birthPlace.country) || (this.model.person.individual.birthPlace.place)) &&
            <div className="field-container">
              <div className="row">
                <div className="col-12">
                  {this.labelFor(m => m, 'GL_BIRTHPLACE_L', fieldTitleLabelAttributes)}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <p className="field-text">
                    {this.model.person.individual.birthPlace.country && <>{this.model.person.individual.birthPlace.country}</>}
                    {(this.model.person.individual.birthPlace.country && this.model.person.individual.birthPlace.place) && <>, </>}
                    {this.model.person.individual.birthPlace.place && <>{this.model.person.individual.birthPlace.place}</>}
                  </p>
                </div>
              </div>
            </div>
          }
        </>
      }
      {((this.props.applicantType == ApplicantType.PersonalQuality) || (this.props.applicantType == ApplicantType.OfficialPerson))
        && this.model.applicantCategory && !ObjectHelper.isStringNullOrEmpty(this.model.applicantCategory.name)
        &&
        <div className="field-container">
          <div className="row">
            <div className="col-12">
              {this.labelFor(m => m, 'PR_APP_ON_THE_GROUNDS_L', fieldTitleLabelAttributes)}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-12">
              <p className="field-text">{this.model.applicantCategory.name}</p>
            </div>
          </div>
        </div>
      }
      {(this.props.applicantType == ApplicantType.OfficialPerson) &&
        <>
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m, 'EP_USR_EXTRENAL_USER_KIND_L', fieldTitleLabelAttributes)}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                <p className="field-text">{this.model.specialAccessType}</p>
              </div>
            </div>
          </div>
          <div className="field-container">
            <div className="row">
              <div className="col-12">
                {this.labelFor(m => m, 'PR_DATA_FOR_AN_OFFICIAL_L', fieldTitleLabelAttributes)}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                <p className="field-text">{this.model.dataForAnOfficial}</p>
              </div>
            </div>
          </div>
        </>
      }
    </>);
  }

  private onPersonTypeChange(): void {
    if (this.model.person.type == PersonType.LEGAL_ENTITY) {
      this.props.registerAsyncOperation(this._legalEntityDataService.getLegalEntityNumber().then((res: LegalEntityIntegration) => {
        let matchNumber = '([0-9])+';
        if (!ObjectHelper.isStringNullOrEmpty(res.legalEntityNumber) && res.legalEntityNumber.match(matchNumber) && !ObjectHelper.isStringNullOrEmpty(res.legalEntityNumber.match(matchNumber)[0])) {
          this.model.person.legalEntity.legalEntityNumber = res.legalEntityNumber.match(matchNumber)[0];
        }
      }));
    }
  }
}

export const ServiceRecipientUI = withAsyncFrame(ServiceRecipientUIImpl);
