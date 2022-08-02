import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { Button, EPZEUBaseComponent, ValidationSummaryErrors, IDataServiceProviderProps, withDataServiceProvider } from 'EPZEU.Core';
import { ApplicationStatuses, DeedSummary, RefusalTypes, ApplicationsService } from 'EPZEU.CR.Core';
import { DeedsDataService, StartUIProps } from 'EPZEU.CR.Domain';
import { action, observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { IncomingRequestForCorrectionSearch, IncomingRequestForCorrectionSearchCriteria, IncomingRequestForCorrectionSearchResult, IncomingRequestForCorrectionSearchResults } from '../Models/IncomingRequestForCorrectionSearch';
import { IncomingRequestForCorrectionSearchCriteriaValidator } from '../Models/Validators/IncomingRequestForCorrectionSearchCriteriaValidator';
import { IncomingRequestForCorrectionSearchCriteriaUI } from './IncomingRequestForCorrectionSearchCriteriaUI';
import { IncomingRequestForCorrectionSearchResultUI } from './IncomingRequestForCorrectionSearchResultUI';


interface IncomingRequestForCorrectionSearchProps extends StartUIProps, AsyncUIProps, IDataServiceProviderProps {
}

@observer class IncomingRequestForCorrectionSearchImplUI extends EPZEUBaseComponent<IncomingRequestForCorrectionSearchProps, IncomingRequestForCorrectionSearch> {
    @observable errorCode: string = null;

    constructor(props?: IncomingRequestForCorrectionSearchProps) {
        super(props);

        this.onSearchResult = this.onSearchResult.bind(this);
        this.continue = this.continue.bind(this);

        if (!this.model) {
            this.model = new IncomingRequestForCorrectionSearch();
            this.model.searchCriteria = new IncomingRequestForCorrectionSearchCriteria();
            this.model.searchCriteria.enableIncomingNumber = true;
            this.model.incomingRequestForCorrectionSearchResults = new IncomingRequestForCorrectionSearchResults();
            this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults = []
        }
    }

    render(): JSX.Element {
        return (
            <div className="page-wrapper">
                <div className="section-wrapper">
                    {!ObjectHelper.isStringNullOrEmpty(this.errorCode) &&
                        <div className="alert alert-danger">
                            {this.getResource(this.errorCode)}
                        </div>}
                    <ValidationSummaryErrors errors={this.props.errorMessages} />
                    <IncomingRequestForCorrectionSearchCriteriaUI onSearchCallback={this.onSearchResult} {...this.bind(this.model.searchCriteria, 'searchCriteria')} />
                    <IncomingRequestForCorrectionSearchResultUI {...this.bind(this.model.incomingRequestForCorrectionSearchResults, 'incomingRequestForCorrectionSearchResults')} />
                    <div className="button-bar button-bar--form">
                        <div className="left-side">
                            <Button type="button" className="btn btn-secondary" lableTextKey={"GL_REFUSE_L"} onClick={this.props.returnToInitialPage}></Button>
                        </div>
                        <div className="right-side">
                            <Button type="btn btn-primary" className="btn btn-primary" lableTextKey={"GL_CONTINUE_L"} onClick={this.continue} ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    @action continue(): void {
        let selectedRes = this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults.filter(t => t.isSelected == true);
        if (selectedRes && selectedRes.length > 0 && selectedRes[0]) {
            var request: any = {};
            request.applicationType = this.props.applicationType;
            request.additionalData = {};

            request.additionalData.indent = selectedRes[0].indent;
            request.additionalData.name = selectedRes[0].name;

            if (!ObjectHelper.isStringNullOrEmpty(this.model.searchCriteria.incomingNumber)) {
                request.additionalData.incomingNumber = this.model.searchCriteria.incomingNumber;
            }
            if (!ObjectHelper.isStringNullOrEmpty(this.model.searchCriteria.entryNumber)) {
                request.additionalData.registrationNumber = this.model.searchCriteria.entryNumber;
            }

            this.props.createApplicationProcess(request);

            this.errorCode = null;
        }
        else if (this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults.length == 0) {
            this.errorCode = 'GL_SEARCH_REQUIRED_E';
        }
        else {
            this.errorCode = 'GL_SELECT_ONE_OF_FOUND_RESULTS_E';
        }
    }

    @action onSearchResult(searchCriteria: IncomingRequestForCorrectionSearchCriteria) {

        this.errorCode = null;
        this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults = new Array<IncomingRequestForCorrectionSearchResult>();
        this.model.incomingRequestForCorrectionSearchResults.applicationInfo = null;

        if (!this.model.searchCriteria.enableIncomingNumber && !this.model.searchCriteria.enableEntryNumber) {
            this.errorCode = 'GL_SELECT_SEARCH_CRITERION_E'; //Моля, изберете критерий за търсене.
        }
        else {
            if ((new IncomingRequestForCorrectionSearchCriteriaValidator()).validate(this.model.searchCriteria)) {
                let applicationsDataService = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

                var appInfoPromise = ObjectHelper.isStringNullOrEmpty(searchCriteria.incomingNumber) ? applicationsDataService.getApplicationByEntryNumber(searchCriteria.entryNumber) : applicationsDataService.getApplicationInfoByIncommingNumber(searchCriteria.incomingNumber);

                this.props.registerAsyncOperation(appInfoPromise.bind(this).then(applicationInfo => {

                    if (applicationInfo == undefined || applicationInfo == null
                        || ((applicationInfo.incomingLinkedDeeds == undefined || applicationInfo.incomingLinkedDeeds == null)
                            && (applicationInfo.entryDeeds == undefined || applicationInfo.entryDeeds == null))) {
                        this.errorCode = this.model.searchCriteria.enableIncomingNumber ? 'CR_GL_INVALID_INCOMING_NUMBER_E' : 'CR_GL_INVALID_ENTRY_NUMBER_E';  // Невалиден входящ номер! / Невалиден номер на вписване!
                    }
                    else if (applicationInfo.refusalType == RefusalTypes.Full) {
                        this.errorCode = 'CR_APP_00022_E'; //По въведения вх. номер има постановен отказ. Искане за изправяне на грешка по заявление с постановен отказ не може да бъде подадено по електронен път.
                    }
                    else if (applicationInfo.applicationStatus == ApplicationStatuses.WaitingCourtAct
                        || applicationInfo.applicationStatus == ApplicationStatuses.Waiting14Days
                        || applicationInfo.applicationStatus == ApplicationStatuses.Processing
                        || applicationInfo.applicationStatus == ApplicationStatuses.RequestedCSCFromTheCourt
                        || applicationInfo.applicationStatus == ApplicationStatuses.StopProceeding
                        || applicationInfo.applicationStatus == ApplicationStatuses.WaitingFor3DaysTerm
                        || applicationInfo.applicationStatus == ApplicationStatuses.WaitingForProcessingPreviousApplication
                        || applicationInfo.applicationStatus == ApplicationStatuses.Instruction) {
                        this.errorCode = 'CR_APP_00109_E';  //Входящият документ все още се обработва. Искане за изправяне на грешки и непълноти се подава само за обработени регистрации!
                    }
                    else {

                        this.model.incomingRequestForCorrectionSearchResults.applicationInfo = applicationInfo;

                        if (applicationInfo.entryDeeds != null && applicationInfo.entryDeeds != undefined) {
                            applicationInfo.entryDeeds.forEach((deed: DeedSummary, index: number) => {
                                let companyResult = new IncomingRequestForCorrectionSearchResult();

                                companyResult.name = deed.companyFullName;
                                companyResult.indent = deed.uic;
                                companyResult.entryNumber = applicationInfo.entryNumber;
                                companyResult.isSelected = false;
                                this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults.push(companyResult);
                            })
                        }
                        else if (applicationInfo.incomingLinkedDeeds != null && applicationInfo.incomingLinkedDeeds != undefined) {
                            applicationInfo.incomingLinkedDeeds.forEach((deed: DeedSummary, index: number) => {
                                let companyResult = new IncomingRequestForCorrectionSearchResult();

                                companyResult.name = deed.companyFullName;
                                companyResult.indent = deed.uic;
                                companyResult.entryNumber = applicationInfo.entryNumber;
                                companyResult.isSelected = false;
                                this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults.push(companyResult);
                            })
                        }

                        if (this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults[0] != null)
                            this.model.incomingRequestForCorrectionSearchResults.incomingRequestForCorrectionSearchResults[0].isSelected = true;
                    }
                }));
            }
        }
    }
}

export const IncomingRequestForCorrectionSearchUI = withAsyncFrame(withDataServiceProvider(IncomingRequestForCorrectionSearchImplUI));