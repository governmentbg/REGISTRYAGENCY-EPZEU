import {BaseProps, RawHTML, withAsyncFrame} from 'Cnsys.UI.React';
import {EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy, withDataServiceProvider} from 'EPZEU.Core';
import {observer} from "mobx-react";
import * as React from "react";
import {SectionTitleUI, withApplicationFormContext} from 'EPZEU.PR.ApplicationBase';
import {GdprAgreement} from '../../Models/Sections/GdprAgreement';

const valSummaryPropNameIsGDPRAgreementAccepted = ["isGDPRAgreementAccepted"];

@observer
class GDPRAgreementUIImpl extends EPZEUBaseComponent<BaseProps, GdprAgreement> {

  constructor(props?: BaseProps) {
    super(props);
    this.model.gdprAgreementText = this.getResource('PR_INFORMED_AGREEMENT_TEXT_L');
  }

  renderEdit(): JSX.Element {
    return (<>
      <SectionTitleUI titleKey={'GL_INFORMED_AGREEMENT_L'} anchor="gdpr"/>
      <ValidationSummary {...this.props} propNames={valSummaryPropNameIsGDPRAgreementAccepted}
                         strategy={ValidationSummaryStrategy.excludeAllExcept}/>
      <div className="field-container">
            <div>
              <RawHTML
                rawHtmlText={this.model && this.model.gdprAgreementText}/>
            </div>
      </div>
      <div className="field-container">
            <div className="row">
              <div className="col-12 form-group">
                <div className="custom-control custom-checkbox">
                  {this.checkBoxFor(m => m.gdprAgreementAcceptance, 'GL_CONFORMATION_INFORMED_AGREEMENT_L')}
                </div>
              </div>
            </div>
      </div>
    </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("GL_INFORMED_AGREEMENT_L")}</h2>

      <div className="field-container">
            <RawHTML
              rawHtmlText={this.model && this.model.gdprAgreementText}/>
      </div>
      {this.model && this.model.gdprAgreementAcceptance ?
      <div className="field-container">
          <p className="field-text">{this.model && this.model.gdprAgreementAcceptance && this.getResource('GL_CONFORMATION_INFORMED_AGREEMENT_L')}</p>
      </div>
        :null}
      <ValidationSummary {...this.props} propNames={valSummaryPropNameIsGDPRAgreementAccepted}
                         strategy={ValidationSummaryStrategy.excludeAllExcept}/>
    </>);
  }
}

export const GDPRAgreementUI = withApplicationFormContext(withDataServiceProvider(withAsyncFrame(GDPRAgreementUIImpl)));
