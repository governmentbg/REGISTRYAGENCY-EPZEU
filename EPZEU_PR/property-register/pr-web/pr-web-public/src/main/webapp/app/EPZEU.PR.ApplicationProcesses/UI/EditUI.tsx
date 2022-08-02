import * as React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { ErrorHelper, ErrorInfo, IBaseValidator, IModelErrors } from 'Cnsys.Core';
import { ViewMode, BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, Button, ValidationSummaryErrors } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import {
  ApplicationFormBase,
  IApplicationFormManager,
  ApplicationFormContextProviderUI,
  ApplicationFormBaseValidator
} from 'EPZEU.PR.ApplicationBase';
import { LeftMenuUI } from './LeftMenuUI';
import { PreviewAppUI } from './PreviewAppUI';
import { ApplicationSection, SectionState } from '.';


interface EditUIProps extends BaseProps {
  appFormType: ApplicationFormTypes;
  appFormValidator: ApplicationFormBaseValidator<ApplicationFormBase>;
  appFormManager: IApplicationFormManager;
  sections: ApplicationSection[];
  currentSection: ApplicationSection;
  appFormUIComponentType: any;
  errorMessages: string[];

  onDeleteApplicationProcess: () => void;
  onChangeSection: (sectionName: string, anchor?: string) => void;
  onStartSigning: () => void;
  onStartSending: () => void;
  isApplicationForCorrection: boolean;
}

@observer export class EditUI extends EPZEUBaseComponent<EditUIProps, any> {

  @observable reRender: boolean = false;
  @observable reRenderMenu: boolean;

  modelValidators: IBaseValidator<IModelErrors, any>[];

  constructor(props?: EditUIProps) {
    super(props);

    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.preview = this.preview.bind(this);
    this.next = this.next.bind(this);
    this.changeSection = this.changeSection.bind(this);

    this.modelValidators = [this.props.appFormValidator];

    this.init(this.props);
  }

  componentWillUpdate(nextProps: EditUIProps, nextState: any, nextContext: any): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);

    if (nextProps.currentSection != this.props.currentSection) {
      this.init(nextProps);
    }
  }

  render(): JSX.Element {
    //Used oly for rerendering
    var tmp = this.reRender;

    return (
      <>
        <button id="show_menu" className="button-menu d-md-none" onClick={this.toggleMobileMenu}>
          <i className="ui-icon ui-icon-sub-menu" aria-hidden="true"></i>
        </button>
        <LeftMenuUI sections={this.props.sections} reRender={this.reRenderMenu} onChangeSection={this.changeSection} />
        <div className="page-wrapper">
          <div className="section-wrapper">
            {this.renderError()}
            {
              this.props.currentSection ?
                this.renderEdit() :
                <PreviewAppUI
                  appFormType={this.props.appFormType}
                  sections={this.props.sections}
                  appFormManager={this.props.appFormManager}
                  appFormUIComponentType={this.props.appFormUIComponentType}
                  reRender={this.reRender}
                  onStartSigning={this.props.onStartSigning}
                  onStartSending={this.props.onStartSending}
                  onChangeSection={this.props.onChangeSection}
                  onDeleteApplicationProcess={this.props.onDeleteApplicationProcess}
                  showCost={!this.props.isApplicationForCorrection}
                />
            }

          </div>
        </div>
      </>
    );
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <ApplicationFormContextProviderUI applicationManager={this.props.appFormManager}>
          <this.props.appFormUIComponentType {...this.bind(this.props.appFormManager.application, ViewMode.Edit, this.props.currentSection.name, this.modelValidators)} sectionName={this.props.currentSection.name} />
        </ApplicationFormContextProviderUI>
        {this.renderEditButtons()}
      </>
    );
  }

  renderError(): JSX.Element {
    if (this.props.errorMessages && this.props.errorMessages.length > 0) {
      return (
        <ValidationSummaryErrors errors={this.props.errorMessages} />
      );
    }
  }

  renderEditButtons(): JSX.Element {
    return (
      <div className="button-bar button-bar--form button-bar--sticky">
        <div className="left-side">
          {
            <Button type="button" className="btn btn-secondary" lableTextKey="GL_REFUSE_L" onClick={this.props.onDeleteApplicationProcess}></Button>
          }
        </div>
        <div className="right-side">
          {
            <Button type="button" className="btn btn-secondary" lableTextKey="GL_ACTION_VIEW_L" onClick={this.preview} />
          }
          {
            <Button type="button" className="btn btn-primary" lableTextKey="GL_CONTINUE_L" onClick={this.next} />
          }
        </div>
      </div>
    );
  }

  //#region Events

  preview(): void {
    this.changeSection("preview");
  }

  next(): void {
    var currentFormIndex = this.props.sections.indexOf(this.props.currentSection);

    if (currentFormIndex == this.props.sections.length - 1) {
      this.changeSection("preview");
    }
    else {
      this.changeSection(this.props.sections[currentFormIndex + 1].name);
    }
  }

  changeSection(sectionName: string): void {
    $(window).scrollTop(0);
    if (this.props.currentSection) {
      var isValid = this.props.appFormValidator.validateProperty(this.props.currentSection.name, this.props.appFormManager.application);
      var hasChange = isValid;
      this.reRenderMenu = !this.reRenderMenu;

      if (!isValid) {
        var allErrors = ErrorHelper.getErrorsRecursive(this.props.appFormManager.application);
        var propErrors = allErrors.filter(err => err.propertyName.indexOf(this.props.currentSection.name) == 0)

        this.props.currentSection.state = SectionState.WithError;

        if (this.compareErrors(this.props.currentSection.errors, propErrors)) {
          hasChange = true;
        }
        else {
          this.props.currentSection.errors = propErrors;
        }
      }
      else {
        this.props.currentSection.state = SectionState.Completed;
      }

      if (hasChange) {
        this.props.onChangeSection(sectionName);
      }

    }
    else {
      this.props.onChangeSection(sectionName);
    }
  }

  //#endregion

  //#region Helepers

  @action init(props: EditUIProps) {

    //Preview
    if (!props.currentSection) {
      //Validate all sections on preview
      props.appFormValidator.validate(props.appFormManager.application)
      var allErrors = ErrorHelper.getErrorsRecursive(this.props.appFormManager.application);

      for (var section of props.sections) {
        section.errors = allErrors.filter(err => err.propertyName.indexOf(section.name) == 0)
        section.state = section.errors && section.errors.length > 0 ? SectionState.WithError : SectionState.Completed;
      }

      this.reRender = !this.reRender;
    }
    else {
      this.reRender = !this.reRender;
    }
  }

  compareErrors(errs1: ErrorInfo[], errs2: ErrorInfo[]): boolean {
    if ((!errs1 || errs1.length == 0) &&
      (!errs2 || errs2.length == 0)) {
      return true;
    }

    if (!errs1 || errs1.length == 0) {
      return false;
    }

    if (!errs2 || errs2.length == 0) {
      return false;
    }

    if (errs1.length != errs2.length) {
      return false;
    }

    for (var i = 0; i < errs1.length; i++) {
      if (errs2.filter(error => errs1[i].error == error.error).length == 0
        ||
        errs2.filter(error => errs1[i].propertyName == error.propertyName).length == 0) {
        return false;
      }

      // if (errs1[i].error != errs2[i].error || errs1[i].propertyName != errs2[i].propertyName) {
      //   return false;
      // }
    }

    return true;
  }

  //#endregion

  private toggleMobileMenu(e: any): void {
    let mobileMenubtn = $('#show_menu');
    if (mobileMenubtn.css('display') != 'none') {
      mobileMenubtn.toggleClass('collapsed');
      $('.nav-wrapper').slideToggle('fast', function () {
        $(this).css('display', '');
        $(this).toggleClass('show');
      });
    }
  }
}
