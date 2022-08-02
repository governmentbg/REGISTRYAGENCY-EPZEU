import * as React from 'react';
import { ErrorInfo, ObjectHelper }  from 'Cnsys.Core';
import { BaseRouteProps, BaseRouteParams, AsyncUIProps, BaseRoutePropsExt, withRouter, withAsyncFrame } from 'Cnsys.UI.React';
import {
  EPZEUBaseComponent,
  ValidationSummaryErrors,
  appConfig,
  Nomenclatures,
  Registers,
  PageTypes,
  CMS, Button
} from 'EPZEU.Core';
import { ApplicationFormTypes, Constants } from 'EPZEU.PR.Core';
import { MenuNavItem, ApplicationFormBase, ApplicationFormBaseValidator, IApplicationProvider, ApplicationProviderFactory, ApplicationCreateRequest } from 'EPZEU.PR.ApplicationBase';
import { ApplicationProcessContext, ProcessStatuses } from 'EPZEU.PR.ApplicationProcesses';
import { observable, runInAction, action } from 'mobx';
import { observer } from 'mobx-react';
import { EditUI } from './EditUI';
import { SignUI } from './SignUI';
import { ErrorUI } from './ErrorUI';
import { SendingUI } from './SendingUI';
import { AcceptedUI } from './AcceptedUI';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export enum SectionState {
  New,
  WithError,
  Completed
}

export interface ApplicationSection {
  name: string;
  applicationMenuNavItems: MenuNavItem[];
  state: SectionState;
  isCurrent: boolean;
  errors?: ErrorInfo[];
}

interface LayoutUIRouteParams extends BaseRouteParams {
  applicationType: any
  applicationSection?: string
}

interface LayoutUIProps extends BaseRouteProps<LayoutUIRouteParams>, AsyncUIProps, BaseRoutePropsExt {
}

@observer class LayoutUIImpl extends EPZEUBaseComponent<LayoutUIProps, any> {
  processContext: ApplicationProcessContext;
  appFormType: ApplicationFormTypes;
  appFormSections: ApplicationSection[];
  appFormValidator: ApplicationFormBaseValidator<ApplicationFormBase>;
  appProvider: IApplicationProvider;

  isProcessContextLoading: boolean;
  @observable reRender: boolean = false;
  @observable private showModal: boolean;

  private lastSavedApplication: any = undefined;
  private saveAppTimeout: number;

  constructor(props?: LayoutUIProps) {
    super(props);

    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.changeSection = this.changeSection.bind(this);
    this.deleteApplicationProcess = this.deleteApplicationProcess.bind(this);
    this.deleteProcess = this.deleteProcess.bind(this);
    this.startSigning = this.startSigning.bind(this);
    this.signingCompleted = this.signingCompleted.bind(this);
    this.signingRejected = this.signingRejected.bind(this);
    this.returnToBeginningStatus = this.returnToBeginningStatus.bind(this);
    this.startSending = this.startSending.bind(this);
    this.createApplicationProcess = this.createApplicationProcess.bind(this);
    this.saveApplicationPeriodically = this.saveApplicationPeriodically.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    this.showModal = false;

    this.init(this.props.match.params.applicationType);
  }

  componentWillUpdate(nextProps: LayoutUIProps, nextState: any, nextContext: any): void {
    super.componentWillUpdate(nextProps, nextState, nextContext);

    if (nextProps.match.params.applicationType != this.props.match.params.applicationType) {
      this.init(nextProps.match.params.applicationType);
    }

    if (nextProps.match.params.applicationSection != this.props.match.params.applicationSection) {
      var currentSection = this.appFormSections.filter(s => s.isCurrent).length > 0 ? this.appFormSections.filter(s => s.isCurrent)[0] : null;
      if (currentSection) {
        currentSection.isCurrent = false;
      }

      var newSection = this.appFormSections.filter(s => s.name == nextProps.match.params.applicationSection).length > 0 ? this.appFormSections.filter(s => s.name == nextProps.match.params.applicationSection)[0] : null;
      if (newSection) {
        newSection.isCurrent = true;
      }

      this.reRender = !this.reRender;
    }
  }

  componentWillUnmount(): void {
    //Зачистваме периодичното записване на черновата.
    clearTimeout(this.saveAppTimeout);

    if (super.componentWillUnmount) {
      super.componentWillUnmount();
    }

    this.processContext.clearContext();
  }

  render(): JSX.Element {
    //Used oly for rerendering
    var tmp = this.reRender;

    return (
<>
      {this.props.asyncErrorMessages && this.processContext && (!this.processContext.isContextInitialized || this.processContext.status != ProcessStatuses.InProcess) &&
          <div className="general-message-wrapper">
            <div className="section-wrapper">
              <div className="fixed-content-width">
                <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
              </div>
            </div>
          </div>}
      <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
        {this.processContext.applicationProcess && this.processContext.applicationProcess.hasChangesInApplicationsNomenclature ?
          this.renderApplicationCancellationUI() : this.processContext.isContextInitialized && !this.isProcessContextLoading && this.renderApplicationForm()}

        {!this.processContext.isContextInitialized && !this.isProcessContextLoading && this.appProvider && this.appProvider.getStartUIComponentType() &&
          React.createElement(this.appProvider.getStartUIComponentType(), { appFormType: this.appFormType, onCreateApplicationProcess: this.createApplicationProcess })}
      </div>

  <Modal centered={true} backdrop='static' autoFocus={true} isOpen={this.showModal} onExit={this.closeModal}>
    <ModalHeader toggle={this.showModal ? this.closeModal : this.openModal}>
      {this.getResource('GL_REJECT_APPLICATION_L')}
    </ModalHeader>
    <ModalBody>
      <div className="alert alert-warning">
        <p className="font-weight-bold">{this.getResource('GL_REJECT_MSG_00001_L')}</p>
        <p>{this.getResource('GL_REJECT_MSG_00002_L')}</p>
      </div>
    </ModalBody>
    <ModalFooter>
      <div className="button-bar">
        <div className="left-side">
          <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_BACK_TO_APPLICATION_L')}</button>
        </div>
        <div className="right-side">
          <button id="BTN_MODAL_OK" type="button" className="btn btn-primary" onClick={this.deleteProcess} data-dismiss="modal">{this.getResource('GL_DECLINE_APPLICATION_L')}</button>
        </div>
      </div>
    </ModalFooter>
  </Modal >

  </>
    );
  }

  renderApplicationForm() {
    var isApplicationForCorrection = this.processContext.applicationProcess.applications[0].applicationProcessContent.content.initialApplicationData
      && !ObjectHelper.isStringNullOrEmpty(this.processContext.applicationProcess.applications[0].applicationProcessContent.content.initialApplicationData.incomingReauNumber);

    switch (this.processContext.status) {
      case ProcessStatuses.InProcess: {
        return <EditUI
          appFormType={this.appFormType}
          appFormValidator={this.appFormValidator}
          appFormManager={this.processContext.applicationItem.appFormManager}
          sections={this.appFormSections}
          currentSection={this.appFormSections.filter(s => s.isCurrent).length > 0 ? this.appFormSections.filter(s => s.isCurrent)[0] : null}
          appFormUIComponentType={this.appProvider.getUIComponentType()}
          errorMessages={this.props.asyncErrorMessages}

          onDeleteApplicationProcess={this.deleteApplicationProcess}
          onChangeSection={this.changeSection}
          onStartSending={this.startSending}
          onStartSigning={this.startSigning}
          isApplicationForCorrection={isApplicationForCorrection}
        />
      }
      case ProcessStatuses.Signing: {
        return (
          <SignUI
            appFormType={this.appFormType}
            signingGuid={this.processContext.signingGuid}
            sections={this.appFormSections}
            appFormManager={this.processContext.applicationItem.appFormManager}
            appFormUIComponentType={this.appProvider.getUIComponentType()}
            onSingingCompleted={this.signingCompleted}
            onSigningRejected={this.signingRejected}
            errorMessages={this.props.asyncErrorMessages}
            isApplicationForCorrection={isApplicationForCorrection}
          />);
      }
      case ProcessStatuses.ErrorInSignature:
      case ProcessStatuses.ErrorInAccepting:
        return (
          <ErrorUI processContext={this.processContext} errorMessages={this.props.asyncErrorMessages} onDeleteApplicationProcess={this.deleteApplicationProcess} onReturnToBeginningStatus={this.returnToBeginningStatus} />
        );
      case ProcessStatuses.ReadyForSending:
      case ProcessStatuses.Sending:
      case ProcessStatuses.Accepted: {
        return (
          <SendingUI processStatus={this.processContext.status} />
        );
      }
      case ProcessStatuses.Completed: {
        return (
          <AcceptedUI processContext={this.processContext} errorMessages={this.props.asyncErrorMessages} onDeleteApplicationProcess={this.deleteApplicationProcess} />
        );
      }
    }
  }

  saveApplicationPeriodically() {
    let that = this;

    //Стартираме периодичното записване на черновата.
    that.saveAppTimeout = setTimeout(() => {

      that.saveApplicationPeriodically();

      let currentApplication = JSON.stringify(this.processContext.applicationItem.appFormManager.application);

      if (currentApplication != that.lastSavedApplication) {
        that.processContext.saveApplicationContent(that.processContext.applicationItem.appFormManager.application).then(() => {
          that.lastSavedApplication = currentApplication;
        });
      }

    }, appConfig.appSaveIntervalInMs);
  }

  //#region Events

  @action changeSection(sectionName: string, anchor?: string) {
    $(document).scrollTop(0);
    this.props.registerAsyncOperation(this.processContext.saveApplicationContent(this.processContext.applicationItem.appFormManager.application));
    this.props.routerExt.goTo(this.getApplicationProcessURL(sectionName, anchor), null);
  }

  deleteApplicationProcess() {
    if(this.processContext.applicationProcess.status  != ProcessStatuses.Accepted && this.processContext.applicationProcess.status  != ProcessStatuses.Completed){
      this.showModal = true;
    }
    else{
      this.props.registerAsyncOperation(this.processContext.deleteApplicationProcess().bind(this).then(() => {
        if (!this.appProvider.getStartUIComponentType())
          this.createApplicationProcess({ type: this.appFormType });
      }));
    }
  }

  private deleteProcess(){
    this.props.registerAsyncOperation(this.processContext.deleteApplicationProcess().bind(this).then(() => {
      this.closeModal();

      this.returnToInitialPage();
    }));
  }

  createApplicationProcess(createRequest: ApplicationCreateRequest) {
    this.isProcessContextLoading = true;

    this.props.registerAsyncOperation(this.processContext.createApplicationProcess(createRequest).bind(this).then(() => {
      this.initSections();

      this.isProcessContextLoading = false;
      this.reRender = !this.reRender;
    }))
  }

  startSigning() {
    this.props.registerAsyncOperation(this.processContext.startSinging().bind(this).then(() => {
      this.props.routerExt.goTo(this.getApplicationProcessURL(), null);
    }));
  }

  startSending() {
    this.props.registerAsyncOperation(this.processContext.startSending().bind(this).then(() => {
      this.props.routerExt.goTo(this.getApplicationProcessURL(), null);
    }));
  }

  returnToBeginningStatus() {
    this.isProcessContextLoading = true;
    this.props.registerAsyncOperation(this.processContext.returnToBeginningStatus().bind(this).then(() => {
      runInAction(() => {
        this.initSections();
        this.isProcessContextLoading = false;
        this.reRender = !this.reRender;
      });
    }))
  }

  signingCompleted(): Promise<void> {
   this.props.registerAsyncOperation(this.processContext.signingCompleted().bind(this).then(() => {
      this.reRender = !this.reRender;
    }));

    return Promise.resolve();
  }

  @action signingRejected(): Promise<void>{
    this.processContext.signingRejected();
    this.reRender = !this.reRender;

    return Promise.resolve();
  }

  //#endregion

  //#region Helpers

  init(applicationType: any) {
    var appFormType: any = ApplicationFormTypes[applicationType]
    this.appFormType = appFormType;

    if (!this.processContext) {
      this.processContext = new ApplicationProcessContext();
    }

    this.isProcessContextLoading = true;

    var tryLoadPromise = this.processContext.tryLoadApplicationProcess(this.appFormType);
    var providerPromise = ApplicationProviderFactory.getApplicationProvider(this.appFormType);

    this.props.registerAsyncOperation(Promise.all([tryLoadPromise, providerPromise]).bind(this).then(result => {
      this.appProvider = result[1];
      this.appFormValidator = this.appProvider.getValidator();

       if (result[0]) {
         if(this.processContext.applicationProcess && !this.processContext.applicationProcess.hasChangesInApplicationsNomenclature) {
           if (this.processContext.status == ProcessStatuses.InProcess || this.processContext.status == ProcessStatuses.Signing) {
             this.initSections();
           }
         }
         this.isProcessContextLoading = false;
         this.reRender = !this.reRender;
      }
      else {
        if (!this.appProvider.getStartUIComponentType()) {
          this.createApplicationProcess({ type: this.appFormType });
        }
        else {
          this.isProcessContextLoading = false;
          this.reRender = !this.reRender;
        }
      }
      this.saveApplicationPeriodically();
    }));
  }

  initSections() {
    this.appFormSections = [];

    var menuItems = this.appProvider.getMenuNavItems(this.processContext.applicationItem.appFormManager.application);
    var hasCurrent = false;

    for (var menuItem of menuItems) {
      var itemSection: ApplicationSection;

      if (this.appFormSections.filter(s => s.name == menuItem.sectionName).length > 0) {
        itemSection = this.appFormSections.filter(s => s.name == menuItem.sectionName)[0];

        itemSection.applicationMenuNavItems.push(menuItem);
      }
      else {
        var isCurrent: boolean = false;

        if (this.props.match.params.applicationSection) {
          if (this.props.match.params.applicationSection == menuItem.sectionName) {
            hasCurrent = true;
            isCurrent = true;
          }
        }
        else {
          if (!hasCurrent && !menuItem.readonly) {
            hasCurrent = true;
            isCurrent = true;
          }
        }

        itemSection = {
          name: menuItem.sectionName,
          state: SectionState.New,
          isCurrent: isCurrent,
          applicationMenuNavItems: [menuItem]
        }

        this.appFormSections.push(itemSection);
      }
    }
  }
  renderApplicationCancellationUI() {

    return <div className="page-wrapper">
      <div className="section-wrapper">
        <div className="row">
          <div className="form-group col">
            <div className="alert alert-danger">
              {
                   this.getResource("PR_APP_CHANGED_NOMENCLATURES_I")
              }
            </div>
          </div>
        </div>
        <div className="button-bar button-bar--form">
          <div className="left-side">
            <Button type="button" className="btn btn-secondary" lableTextKey={"GL_REFUSE_L"} onClick={() => this.deleteProcess()}/>
          </div>
          <div className="right-side">
          </div>
        </div>
      </div>
    </div>
  }

  getApplicationProcessURL(sectionName?: string, anchor?: string): string {
    let currenntUrl: string = this.props.location.pathname.replace(appConfig.baseUrlName, "");

    let applProcIndex = currenntUrl.lastIndexOf("/ApplicationProcesses");
    let url = currenntUrl.substr(0, applProcIndex);

    url = url + Constants.PATHS.APPLICATION_PROCESSES_SIMPLE;
    url = url.replace(":applicationType", ApplicationFormTypes[this.appFormType]);

    if (sectionName) {
      url = url.replace(":applicationSection?", sectionName);
    }
    else {
      url = url.replace("/:applicationSection?", "");
    }

    if (anchor) {
      url = url + `#${anchor}`
    }

    return url;
  }

  //#endregion

  @action
  private openModal(): void {
    this.showModal = true;
  }

  @action
  private closeModal(): void {
    this.showModal = false;
  }

  returnToInitialPage(): Promise<void> {
    let redirectUrl = Constants.PATHS.APPLICATIONS;

    return Nomenclatures.getServices(srv => srv.applicationType && srv.applicationType.appType == this.appFormType.toString()).bind(this).then(services => {

      if (services && services.length == 1) {
        return CMS.getPages(pg =>
          pg.registerID == Registers.PR
          && pg.type == PageTypes.Service
          && pg.serviceID == services[0].serviceID).bind(this).then(pages => {
          if (pages != null && pages != undefined && pages.length >= 1) {
            redirectUrl = Constants.PATHS.SERVICE.replace(':serviceID', services[0].serviceID.toString())
          }

          this.props.routerExt.goTo(redirectUrl, null);
        })
      }
      else {
        this.props.routerExt.goTo(redirectUrl, null);
      }
    });
  }

}

export const ApplicationProcessLayoutUI = withRouter(withAsyncFrame(LayoutUIImpl, false));
