import * as React from 'react';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { Button, EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { ApplicationFormContextProviderUI, IApplicationFormManager } from "EPZEU.PR.ApplicationBase";
import { ApplicationSection } from '.';

interface PreviewAppUIProps extends BaseProps {
  appFormType: ApplicationFormTypes;
  sections: ApplicationSection[];
  appFormManager: IApplicationFormManager;
  appFormUIComponentType: any;
  reRender: boolean;
  showCost?: boolean;

  onStartSigning?: () => void;
  onStartSending?: () => void;
  onChangeSection?: (sectionName: string, anchor?: string) => void;
  onDeleteApplicationProcess?: () => void;
}

export class PreviewAppUI extends EPZEUBaseComponent<PreviewAppUIProps, any> {

  hasErrors: boolean;

  constructor(props?: PreviewAppUIProps) {
    super(props);

    this.hasErrors = this.props.sections.filter(s => s.errors && s.errors.length > 0).length > 0;
  }

  componentWillUpdate(nextProps: PreviewAppUIProps, nextState: any, nextContext: any): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);

    if (nextProps.sections.filter(s => s.errors && s.errors.length > 0).length > 0 && !this.hasErrors) {
      this.hasErrors = true;
    }

    if (nextProps.sections.filter(s => s.errors && s.errors.length > 0).length == 0 && this.hasErrors) {
      this.hasErrors = false;
    }
  }

  render(): JSX.Element {
    return (
      <>
    
        {this.hasErrors ?
          <div key="error" className="alert alert-danger" role="alert">
            {this.props.appFormManager.application.getModelErrors().map((err) => (err.message))}
          </div>
          : null
        }
        <ApplicationFormContextProviderUI applicationManager={this.props.appFormManager}>
          {
            this.props.sections.map(((section) => {
              return (
                this.renderSection(section)
              )
            }))
          }

          {(this.props.showCost === undefined || this.props.showCost) && this.props.appFormManager.cost && (!this.props.appFormManager.isTaxFree) ?
            <>
              <div key="tax" className="alert alert-info" role="alert">
                {this.getResource('GL_DUE_FEE_E') + ': '}
                <span className="lead">{this.props.appFormManager.cost.toFixed(2)} {this.getResource("GL_BGN_ABBRAVETION_L")}</span>
              </div>
            </>
            : null
          }
          {(this.props.showCost === undefined || this.props.showCost) && this.props.appFormManager.isTaxFree &&
            <div key="isTaxFree" className="alert alert-info" role="alert">
              {this.getResource('PR_GL_00002_I')}
            </div>
          }
        </ApplicationFormContextProviderUI>
        {this.renderButtons()}
      </>
    );
  }

  renderSection(section: ApplicationSection): JSX.Element {
    return (
      <React.Fragment key={section.name}>
        <div id={"section_"+section.name} className="interactive-container interactive-container--preview">
          <div className="interactive-container__content">
            {React.createElement(this.props.appFormUIComponentType, {
              ...this.bind(this.props.appFormManager.application, ViewMode.Display, section.name, []),
              sectionName: section.name
            })}
          </div>
          {this.props.onChangeSection ?
            <div className="interactive-container__controls">
              {!section.applicationMenuNavItems[0].readonly ?
                <Button className="btn btn-outline-light btn-sm" titlekey="GL_EDITING_L"
                        onClick={() => this.props.onChangeSection(section.name)}
                        onMouseOver={()=>{$("#section_"+section.name).addClass('interactive-container--focus')}}
                        onMouseOut={()=>{$("#section_"+section.name).removeClass('interactive-container--focus')}}>
                  <i className="ui-icon ui-icon-edit-color" aria-hidden="true"></i></Button>
                : null}
            </div> : null}
        </div>
      </React.Fragment>
    );
  }
  //TODO:Тази проверка да излизе извън компонентата
  renderButtons(): JSX.Element {
    if (this.props.onDeleteApplicationProcess) {
      return (
        <div className="button-bar button-bar--form button-bar--sticky">
          <div className="left-side">
            <Button type="button" className="btn btn-secondary" lableTextKey="GL_REFUSE_L" onClick={this.props.onDeleteApplicationProcess} />
          </div>
          {!this.isReport() && !this.hasErrors &&
            <div className="right-side">
              <Button type="button" className="btn btn-primary" lableTextKey="GL_SIGN_L" onClick={this.props.onStartSigning} />
            </div>
          }
          {this.isReport() && !this.hasErrors &&
            <div className="right-side">
              <Button type="button" className="btn btn-primary" lableTextKey="PR_DECLARE_L" onClick={this.props.onStartSending} />
            </div>
          }
        </div>
      );
    }
    else {
      return null;
    }
  }

  isReport(): boolean {
    if (this.props.appFormType == ApplicationFormTypes.RequestForReportForPerson || this.props.appFormType == ApplicationFormTypes.RequestForReportForAccountProperty ||
      this.props.appFormType == ApplicationFormTypes.RequestForReportForDocument || this.props.appFormType == ApplicationFormTypes.RequestForReportForProperty ||
      this.props.appFormType == ApplicationFormTypes.RequestForReportForPersonInAllRegistryOffices) {

      return true;
    }

    return false;
  }
}
