import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { Button, EPZEUBaseComponent, IDataServiceProviderProps, ValidationSummaryErrors, withDataServiceProvider } from 'EPZEU.Core';
import { ApplicationFormTypes, ApplicationsService, DeedSummary, RefusalTypes } from 'EPZEU.CR.Core';
import { StartUIProps } from 'EPZEU.CR.Domain';
import { action, observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { AppealRefusalSearch, AppealRefusalSearchCriteria, AppealRefusalSearchResult, AppealRefusalSearchResults } from '../Models/AppealRefusalSearch';
import { AppealRefusalSearchCriteriaValidator } from '../Models/Validators/AppealRefusalSearchCriteriaValidator';
import { AppealRefusalSearchCriteriaUI } from './AppealRefusalSearchCriteriaUI';
import { AppealRefusalSearchResultUI } from "./AppealRefusalSearchResultUI";

interface AppealRefusalSearchProps extends StartUIProps, AsyncUIProps, IDataServiceProviderProps {
}

@observer class AppealRefusalSearchImplUI extends EPZEUBaseComponent<AppealRefusalSearchProps, AppealRefusalSearch> {
    @observable errorCode: string = null;

    constructor(props?: AppealRefusalSearchProps) {
        super(props);

        this.onSearchResult = this.onSearchResult.bind(this);
        this.continue = this.continue.bind(this);

        if (!this.model) {
            this.model = new AppealRefusalSearch();
            this.model.searchCriteria = new AppealRefusalSearchCriteria();
            this.model.appealRefusalSearchResults = new AppealRefusalSearchResults();
            this.model.appealRefusalSearchResults.appealRefusalSearchResults = []
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
                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                    <AppealRefusalSearchCriteriaUI onSearchCallback={this.onSearchResult} {...this.bind(this.model.searchCriteria, 'searchCriteria')} />
                    <AppealRefusalSearchResultUI {...this.bind(this.model.appealRefusalSearchResults, 'appealRefusalSearchResults')} />
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
        let selectedRes = this.model.appealRefusalSearchResults.appealRefusalSearchResults.filter(t => t.isSelected == true);
        if (selectedRes && selectedRes.length > 0 && selectedRes[0]) {
            var request: any = {};
            request.applicationType = this.props.applicationType;
            request.additionalData = {};

            request.additionalData.incomingNumber = selectedRes[0].incomingNumber;
            request.additionalData.outgoingNumber = selectedRes[0].outgoingNumber;
            request.additionalData.indent = selectedRes[0].indent;
            request.additionalData.name = selectedRes[0].name;

            this.props.registerAsyncOperation(this.props.createApplicationProcess(request));

            this.errorCode = null;
        }
        else if (this.model.appealRefusalSearchResults.appealRefusalSearchResults.length == 0) {
            this.errorCode = 'GL_SEARCH_REQUIRED_E';
        }
        else {
            this.errorCode = 'GL_SELECT_ONE_OF_FOUND_RESULTS_E';
        }
    }

    @action onSearchResult(searchCriteria: AppealRefusalSearchCriteria) {
        this.errorCode = null;
        this.model.appealRefusalSearchResults.appealRefusalSearchResults = new Array<AppealRefusalSearchResult>();

        if ((new AppealRefusalSearchCriteriaValidator()).validate(this.model.searchCriteria)) {
            let applicationsDataService = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

            this.props.registerAsyncOperation(applicationsDataService.getApplicationInfoByIncommingNumber(searchCriteria.incomingNumber).bind(this).then(applicationInfo => {

                if (applicationInfo == undefined || applicationInfo == null
                    || ((applicationInfo.incomingLinkedDeeds == undefined || applicationInfo.incomingLinkedDeeds == null)
                        && (applicationInfo.entryDeeds == undefined || applicationInfo.entryDeeds == null))) {
                    this.errorCode = 'CR_GL_NO_APPL_WITH_THIS_INCOMING_NUMBER_E'; //Няма заявление с този входящ номер.
                }
                else if (applicationInfo.applicationType == ApplicationFormTypes.D1 || (applicationInfo.refusalType != RefusalTypes.Full && applicationInfo.refusalType != RefusalTypes.Partial)) {
                    this.errorCode = 'CR_APP_00182_E'; //За въведения вх. номер на заявление няма данни за поставен отказ!
                }
                else {
                    if (applicationInfo.entryDeeds != undefined && applicationInfo.entryDeeds != null) {
                        applicationInfo.entryDeeds.forEach((deed: DeedSummary, index: number) => {
                            let companyResult = new AppealRefusalSearchResult();

                            companyResult.name = deed.companyFullName;
                            companyResult.indent = deed.uic;
                            companyResult.incomingNumber = applicationInfo.incomingNumber;
                            companyResult.outgoingNumber = applicationInfo.outgoingNumber;
                            companyResult.isSelected = false;
                            this.model.appealRefusalSearchResults.appealRefusalSearchResults.push(companyResult);
                        })
                    }
                    else if (applicationInfo.incomingLinkedDeeds != undefined && applicationInfo.incomingLinkedDeeds != null) {
                        applicationInfo.incomingLinkedDeeds.forEach((deed: DeedSummary, index: number) => {
                            let companyResult = new AppealRefusalSearchResult();

                            companyResult.name = deed.companyFullName;
                            companyResult.indent = deed.uic;
                            companyResult.incomingNumber = applicationInfo.incomingNumber;
                            companyResult.outgoingNumber = applicationInfo.outgoingNumber;
                            companyResult.isSelected = false;
                            this.model.appealRefusalSearchResults.appealRefusalSearchResults.push(companyResult);
                        })
                    }
                    if (this.model.appealRefusalSearchResults.appealRefusalSearchResults[0] != null)
                        this.model.appealRefusalSearchResults.appealRefusalSearchResults[0].isSelected = true;
                }
            }));
        }
    }
}

export const AppealRefusalSearchUI = withAsyncFrame(withDataServiceProvider(AppealRefusalSearchImplUI), false);