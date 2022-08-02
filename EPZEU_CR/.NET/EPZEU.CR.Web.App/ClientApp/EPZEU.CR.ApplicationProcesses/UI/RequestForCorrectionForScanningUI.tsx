import { ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, BaseRouteProps, BaseRoutePropsExt, ViewMode, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, IDataServiceProviderProps, ValidationSummary, ValidationSummaryErrors, ValidationSummaryStrategy, withDataServiceProvider } from "EPZEU.Core";
import { ApplicationInfo } from "EPZEU.CR.Core";
import { Applicant, ApplicantCapacity, ApplicantCapacityHelper, ApplicantCapacityType, ApplicantCapacityUI, ApplicantUIImpl, SectionTitleUI } from "EPZEU.CR.Domain";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { withRouter } from "react-router";
import { RequestForCorrectionForScanning } from '../Models/RequestForCorrectionForScanning';
import { RequestForCorrectionForScanningValidator } from '../Models/Validators/RequestForCorrectionForScanningValidator';
import { CommunicationsDataService } from "../Services/CommunicationsDataService";

interface RequestForCorrectionForScanningProps extends BaseRouteProps<any>, AsyncUIProps, BaseProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

const applicantInfoValPropNames = ['birthPlace', 'address'];

@observer class RequestForCorrectionForScanningImpl extends EPZEUBaseComponent<RequestForCorrectionForScanningProps, RequestForCorrectionForScanning> {

    @observable isAcceptedCommunication: boolean;
    @observable applicationInfo: ApplicationInfo;

    private validator: RequestForCorrectionForScanningValidator;
    private applicantCapacities: ApplicantCapacityType[];
    private dataSrv: CommunicationsDataService = this.props.dataSrvProvider.getDataService<CommunicationsDataService>(CommunicationsDataService);

    constructor(props?: RequestForCorrectionForScanningProps) {
        super(props);

        this.initModels();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.registerAsyncOperation(this.loadApplicationInfo());
    }

    render() {

        if (this.isAcceptedCommunication) {
            return <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="section-wrapper section-wrapper--margins">
                        <div className="fixed-content-width">
                            <div className="alert alert-success" role="alert">
                                <div>{this.getResource('GL_ACCEPTED_NOTIFICATION_ERROR_DURING_SCANNING_I')}</div>
                            </div>
                            <div className="button-bar button-bar--form">
                                <div className="left-side">
                                    <button type="button" className="btn btn-secondary" onClick={this.onRefuse}>{this.getResource('GL_CLOSE_L')}</button>
                                </div>
                                <div className="right-side">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        if (this.props.asyncErrorMessages && this.props.asyncErrorMessages.length > 0) {
            return <div className="main-wrapper">
                <div className="page-wrapper">
                    <div className="section-wrapper section-wrapper--margins">
                        <div className="fixed-content-width">
                            <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                        </div>
                    </div>
                </div>
            </div>
        }

        if (this.applicationInfo) {
            return <>
                <div className="page-header-wrapper">
                    <div className="section-wrapper">
                        <div className="fixed-content-width">
                            <div className="page-header">
                                <div className="row">
                                    <div className="col">
                                        <h1 className="page-title">{this.getResource("GL_NOTIFICATIONS_ERROR_DURING_SCANNING_L")}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
                    <div className="page-wrapper">
                        <div className="section-wrapper">
                            {
                                this.applicationInfo.hasRequestsForCorrectionForScanning
                                    ? this.renderPreview()
                                    : <>
                                        <SectionTitleUI anchor={"detailsAboutInterestedPerson"} titleKey={"GL_DETAILS_ABOUT_INTERESTED_PERSON_L"} />
                                        <ValidationSummary {...this.bind(m => m.applicant)} strategy={ValidationSummaryStrategy.excludeAllExcept} propNames={applicantInfoValPropNames} includeErrorsRecursive={true} />
                                        <ApplicantUIImpl  {...this.bind(m => m.applicant)} viewMode={ViewMode.Edit} />
                                        <ApplicantCapacityUI titleKey="GL_QUALITY_APPLICANT_L" {...this.bind(m => m.applicantCapacity)} viewMode={ViewMode.Edit} possibleApplicantCapacities={this.applicantCapacities} />
                                        <SectionTitleUI anchor={"correctionOfMistake"} titleKey={"GL_CORRECTION_OF_MISTAKE_L"} />
                                        {this.applicationInfo ? this.renderApplicationInfo() : null}
                                        <div className="field-container">
                                            <div className="row">
                                                <div className="form-group col-12">
                                                    {this.labelFor(x => x.communicationNote, 'GL_CAUSE_L', { className: "field-title field-title--form required-field" })}
                                                    {this.textAreaFor(x => x.communicationNote, null, 3)}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                            <div className="button-bar button-bar--form">
                                <div className="left-side">
                                    <button type="button" className="btn btn-secondary" onClick={this.onRefuse}>{this.getResource('GL_CLOSE_L')}</button>
                                </div>
                                <div className="right-side">
                                    {
                                        this.applicationInfo.hasRequestsForCorrectionForScanning
                                            ? null
                                            : <a href="javascript:;" className="btn btn-primary" onClick={this.onSubmit}>{this.getResource('GL_SUBMIT_L')}</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }

        return null;
    }

    //#region Private helpers

    private renderPreview() {
        if (this.model) {
            return <>
                <SectionTitleUI anchor={"detailsAboutInterestedPerson"} titleKey={"GL_DETAILS_ABOUT_INTERESTED_PERSON_L"} isForPreview />
                <ApplicantUIImpl  {...this.bind(m => m.applicant)} viewMode={ViewMode.Display} />
                <ApplicantCapacityUI titleKey="GL_QUALITY_APPLICANT_L" {...this.bind(m => m.applicantCapacity)} viewMode={ViewMode.Display} possibleApplicantCapacities={this.applicantCapacities} />
                <SectionTitleUI anchor={"correctionOfMistake"} titleKey={"GL_CORRECTION_OF_MISTAKE_L"} isForPreview />
                {this.applicationInfo ? this.renderApplicationInfo(true) : null}
                <div className="field-container">
                    <div className="row">
                        <div className="form-group col-12">
                            <label className="field-title field-title--preview">{this.getResource('GL_CAUSE_L')}</label>
                            <p className="field-text">{this.model.communicationNote}</p>
                        </div>
                    </div>
                </div>
            </>
        }

        return null;
    }

    @action private initModels(): void {
        this.model = new RequestForCorrectionForScanning();
        this.model.applicant = new Applicant();
        this.model.applicantCapacity = new ApplicantCapacity();
        this.model.applicantCapacity.anotherFace = false;
        this.model.applicantCapacity.applicantLawyerWithPower = false;
        this.model.applicantCapacity.assignedExpert = false;
        this.model.applicantCapacity.assignmentApplicant = false;
        this.model.applicantCapacity.financialAccountCreator = false;
        this.model.applicantCapacity.lawyerWithLetter = false;
        this.model.applicantCapacity.personRepresentingBranchOfNonProfitForeignLegalEntity = false;
        this.model.applicantCapacity.personRepresentingCommunityCentrer = false;
        this.model.applicantCapacity.personRepresentingTheAssociation = false;
        this.model.applicantCapacity.personRepresentingTheFoundation = false;
        this.model.applicantCapacity.procurator = false;
        this.model.applicantCapacity.trader = false;
        this.validator = new RequestForCorrectionForScanningValidator();
        this.isAcceptedCommunication = false;
    }

    private renderApplicationInfo(isForPreview?: boolean) {
        return <>
            <div className="field-container">
                <div className="row">
                    <div className="form-group col-12">
                        <label className={`field-title field-title--${isForPreview ? 'preview' : 'form'}`}>{this.getResource('GL_INCOMING_NO_L')}</label>
                        <p className="field-text">{this.applicationInfo.incomingNumber}</p>
                    </div>
                </div>
            </div>
            <div className="field-container">
                <div className="row">
                    <div className="form-group col-12">
                        <label className={`field-title field-title--${isForPreview ? 'preview' : 'form'}`}>{this.getResource('GL_REGISTRATION_L')}</label>
                        <p className="field-text">
                            {this.applicationInfo && !ObjectHelper.isStringNullOrEmpty(this.applicationInfo.applicationTypeName) ? this.applicationInfo.applicationTypeName : null}
                        </p>
                    </div>
                </div>
            </div>
            <div className="field-container">
                <div className="row">
                    <div className="form-group col-12">
                        <label className={`field-title field-title--${isForPreview ? 'preview' : 'form'}`}>{this.getResource('GL_SUBMITTED_VIA_L')}</label>
                        <p className="field-text">{this.applicationInfo.officeName}</p>
                    </div>
                </div>
            </div>
            <div className="field-container">
                <div className="row">
                    <div className="form-group col-12">
                        <label className={`field-title field-title--${isForPreview ? 'preview' : 'form'}`}>{this.getResource('GL_SUBMITTED_ON_L')}</label>
                        <p className="field-text">{this.dateDisplayFor(this.applicationInfo.registrationDate, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</p>
                    </div>
                </div>
            </div>
        </>
    }

    private loadApplicationInfo() {

        return this.dataSrv.loadApplicationInfo(this.props.match.params.incomingNumber).then(async (appInfo) => {

            if (appInfo) {

                runInAction.bind(this)(() => {
                    this.applicationInfo = appInfo;
                    this.applicantCapacities = ApplicantCapacityHelper.getApplicantCapacitiesByAppType(appInfo.applicationType)
                    this.model.incomingNumber = appInfo.incomingNumber;
                });

                if (appInfo.hasRequestsForCorrectionForScanning)
                    return this.loadCommunication();
            }
        })
    }

    private loadCommunication() {
        var that = this;
        return this.dataSrv.loadCommunication(this.props.match.params.incomingNumber).then((communicationModel) => {
            that.model = communicationModel;
        })
    }

    private onRefuse() {
        window.close();
    }

    private async onSubmit() {
        let isValid = await this.validator.validate(this.model);
        var that = this;

        if (isValid)
            this.props.registerAsyncOperation(this.dataSrv.createCommunication(this.model).then(() => {
                that.isAcceptedCommunication = true;
            }), true)
    }

    //#endregion
}

export const RequestForCorrectionForScanningUI = withAsyncFrame(withDataServiceProvider(withRouter(RequestForCorrectionForScanningImpl)), false);