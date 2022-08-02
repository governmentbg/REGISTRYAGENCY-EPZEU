import * as React from 'react';
import { AsyncUIProps, withAsyncFrame, BaseProps } from "Cnsys.UI.React";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { EPZEUBaseComponent, ValidationSummaryErrors, ApplicationType, Nomenclatures } from "EPZEU.Core";
import { ApplicationProcessPreviewContext } from "../ApplicationProcessPreviewContext";
import { ApplicationSection, SectionState } from './LayoutUI';
import { PreviewAppUI } from './PreviewAppUI';
import { ObjectHelper } from 'Cnsys.Core';


interface ApplicationPreviewUIProps extends BaseProps, AsyncUIProps {
  incomingNumber?: string,
  processID?: number,
  showCost?: boolean
}

@observer class ApplicationPreviewCmpUIImpl extends EPZEUBaseComponent<ApplicationPreviewUIProps, any> {
  appFormSections: ApplicationSection[];
  processContext: ApplicationProcessPreviewContext;
  hasAppForIncomingNumber: boolean;
  @observable isContextLoading: boolean;
  @observable appTypes: ApplicationType[];

  constructor(props?: ApplicationPreviewUIProps) {
    super(props);
    this.processContext = new ApplicationProcessPreviewContext();

    this.props.registerAsyncOperation(Nomenclatures.getApplicationTypes().bind(this).then(at => {
      this.appTypes = at
    }));

    this.init();
  }

  render(): JSX.Element {
    return (
        <>
        {this.props.asyncErrorMessages && this.processContext &&
        <div className="general-message-wrapper">
          <div className="section-wrapper">
            <div className="fixed-content-width">
              <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
            </div>
          </div>
        </div>}
        {!this.isContextLoading && this.hasAppForIncomingNumber && <div className="section-wrapper">
          <div className="fixed-content-width">
            <div className="page-heading">
              <h1 className="application-title">
                <span className="text-primary">№&nbsp;{this.props.incomingNumber}</span>
                <br />
                {this.processContext.applicationItem && this.processContext.applicationItem.appProvider
                && this.appTypes.filter(at => Number(at.appType) == this.processContext.applicationItem.appProvider.appFormType)[0].name}
              </h1>
            </div>
          </div>
        </div>}
        {<div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
          {!this.isContextLoading && this.renderApplicationPreviewUI()}
        </div>}
      </>);
  }

  renderApplicationPreviewUI() {
    return (
      <div className="page-wrapper">
        <div className="section-wrapper">
          {this.hasAppForIncomingNumber &&
          <PreviewAppUI
            appFormType={this.processContext.applicationItem.appFormManager.application.appFormType}
            sections={this.appFormSections}
            appFormManager={this.processContext.applicationItem.appFormManager}
            appFormUIComponentType={this.processContext.applicationItem.appProvider.getUIComponentType()}
            reRender={false}
            showCost={this.props.showCost}
          />
          }
          {!this.hasAppForIncomingNumber &&
          <div className="alert alert-danger" role="alert">
            <p>
              {this.getResource("GL_DOCUMENT_NOT_FOUND_E")}
            </p>
          </div>
          }
        </div>
      </div>);
  }

  //#region Event

  componentWillUpdate(nextProps: ApplicationPreviewUIProps, nextState: any, nextContext: any): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);

    if (this.props.incomingNumber != nextProps.incomingNumber ||
      this.props.processID != nextProps.processID) {
      this.init();
    }
  }

  //#endregion

  //#region Helpers

  @action init() {
    this.isContextLoading = true;

    if (ObjectHelper.isNullOrUndefined(this.props.incomingNumber)) {
      this.props.registerAsyncOperation(this.processContext.tryLoadDraftApplicationProcess(this.props.processID).bind(this).then(hasApp => {
        this.hasAppForIncomingNumber = hasApp;
        if (hasApp) {
          this.initSections();
        }

        this.isContextLoading = false;
      }));
    }
    else {
      this.props.registerAsyncOperation(this.processContext.tryLoadSendApplicationProcess(this.props.incomingNumber).bind(this).then(hasApp => {
        this.hasAppForIncomingNumber = hasApp;
        if (hasApp) {
          this.initSections();
        }

        this.isContextLoading = false;
      }));
    }
  }

  initSections(): void {
    this.appFormSections = [];

    var menuItems = this.processContext.applicationItem.appProvider.getMenuNavItems(this.processContext.applicationItem.appFormManager.application);
    var hasCurrent = false;

    for (var menuItem of menuItems) {
      var itemSection: ApplicationSection;

      if (this.appFormSections.filter(s => s.name == menuItem.sectionName).length > 0) {
        itemSection = this.appFormSections.filter(s => s.name == menuItem.sectionName)[0];

        itemSection.applicationMenuNavItems.push(menuItem);
      }
      else {
        itemSection = {
          name: menuItem.sectionName,
          state: SectionState.Completed,
          isCurrent: false,
          applicationMenuNavItems: [menuItem]
        }

        this.appFormSections.push(itemSection);
      }
    }
  }

  //#endregion
}

export const ApplicationPreviewCmpUI = withAsyncFrame(ApplicationPreviewCmpUIImpl, false); 
