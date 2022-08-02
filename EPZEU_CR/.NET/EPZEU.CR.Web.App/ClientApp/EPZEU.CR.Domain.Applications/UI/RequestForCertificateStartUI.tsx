import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { attributesClassFormControlMaxL9, Button, EPZEUBaseComponent, NomenclaturesDataService, ValidationSummaryErrors } from 'EPZEU.Core';
import { DeedsDataService, StartUIProps } from 'EPZEU.CR.Domain';
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { RequestForCertificateSearchValidator } from "../Models/Validators/RequestForCertificateSearchValidator";
import { RequestForCertificateSearch, RequestForCertificateSearchResult, RequestForCertificateStart } from '../Models/RequestForCertificateSearch';

//#region Search

interface RequestForCertificateSearchProps extends BaseProps {
    onSearchCallback: (criteria: any) => void;
    errorMessages?: string[];
}

@observer export class RequestForCertificateSearchUI extends EPZEUBaseComponent<RequestForCertificateSearchProps, RequestForCertificateSearch> {

    constructor(props?: RequestForCertificateSearchProps) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    render(): JSX.Element {
        return <div className="field-container">
            {!ObjectHelper.isNullOrUndefined(this.props.errorMessages) && this.props.errorMessages.length > 0 ? <ValidationSummaryErrors errors={this.props.errorMessages} /> : null}
            <div className="row">
                <div className="col-sm-8 col-xl-6">
                    <div className="row">
                        <div className="col">
                            {this.labelFor(m => m, 'GL_COMPANY_ID_L', { className: 'field-title field-title--form' })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col">
                            {this.textBoxFor(m => m.uic, attributesClassFormControlMaxL9)}
                        </div>

                        <div className="form-group col-auto">
                            <button className="btn btn-outline-light text-dark" onClick={this.onSearch}><i className="ui-icon ui-icon-import mr-1"></i> {this.getResource('GL_EXTRACT_DATA_L')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    @action onSearch() {
        if (this.props.onSearchCallback)
            this.props.onSearchCallback(true);
    }
}

//#endregion

//#region SearchResult

@observer export class RequestForCertificateSearchResultUI extends EPZEUBaseComponent<BaseProps, RequestForCertificateSearchResult> {

    render(): JSX.Element {
        if (!ObjectHelper.isStringNullOrEmpty(this.model.name)) {
            return <div className="field-container">
                <div className="row">
                    <div className="form-group col">
                        <label className="field-title field-title--form">{this.getResource("CR_GL_COMPANY_NAME_L")}</label>
                        <p className="field-text">{this.model.name}</p>
                    </div>
                </div>
            </div>
        }

        return null;
    }
}

//#endregion

//#region StartUI

interface RequestForCertificateStartProps extends StartUIProps, AsyncUIProps {
}

@observer class RequestForCertificateStartUIImpl extends EPZEUBaseComponent<RequestForCertificateStartProps, RequestForCertificateStart> {
    @observable errorMessages: string[];

    private searchCriteria: string;
    private isFoundReservedCompanyName: boolean;
    private showResult: boolean;
    private requestForCertificateSearchValidator: RequestForCertificateSearchValidator;

    constructor(props?: RequestForCertificateStartProps) {
        super(props);

        //Bind
        this.searchResult = this.searchResult.bind(this);
        this.continue = this.continue.bind(this);

        //Init
        if (!this.model)
            this.initModel();

        this.requestForCertificateSearchValidator = new RequestForCertificateSearchValidator();
    }

    render(): JSX.Element {
        return (
            <div className="page-wrapper">
                <div className="section-wrapper">
                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                    <RequestForCertificateSearchUI errorMessages={this.errorMessages} onSearchCallback={this.searchResult} {...this.bind(this.model.searchCriteria, 'searchCriteria', [this.requestForCertificateSearchValidator])} />
                    {this.showResult === true ? <RequestForCertificateSearchResultUI  {...this.bind(this.model.requestForCertificateSearchResult, 'requestForCertificateSearchResult')} /> : null}
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

    @action continue(): any {
        this.errorMessages = [];

        this.props.registerAsyncOperation(this.searchResult(false).then(() => {
            if (this.isFoundReservedCompanyName) {
                var request: any = {};
                request.applicationType = this.props.applicationType;
                request.additionalData = {};

                request.additionalData.indent = this.model.requestForCertificateSearchResult.uic;
                request.additionalData.name = this.model.requestForCertificateSearchResult.name;
                request.additionalData.legalFormFull = this.model.requestForCertificateSearchResult.legalFormFull;

                return this.props.createApplicationProcess(request);
            }
        }));
    }

    @action searchResult(showResult: boolean): Promise<any> {
        var that = this;
        this.showResult = showResult;

        return new DeedsDataService().getDeedSummary(that.model.searchCriteria.uic).then(deedSummary => {
            this.errorMessages = [];

            if (deedSummary != null && deedSummary != undefined) {
                runInAction(() => {                   
                    that.model.requestForCertificateSearchResult.name = deedSummary.companyFullName;
                    that.model.requestForCertificateSearchResult.uic = deedSummary.uic;
                    that.isFoundReservedCompanyName = true;
                });

                return new NomenclaturesDataService().getLegalForms().then(legalForms => {
                    that.model.requestForCertificateSearchResult.legalFormFull = legalForms.filter(x => x.id == +deedSummary.legalForm)[0].name;
                });
            } else {
                runInAction(() => {
                    that.searchCriteria = that.model.searchCriteria.uic;
                    that.initModel();
                    that.model.searchCriteria.uic = that.searchCriteria;
                    that.errorMessages.push(this.getResource("GL_INPUT_VALID_ID_E"));
                });
            }
        })
    }

    @action initModel(): void {
        this.model = new RequestForCertificateStart();
        this.model.searchCriteria = new RequestForCertificateSearch();
        this.model.requestForCertificateSearchResult = new RequestForCertificateSearchResult();
        this.isFoundReservedCompanyName = false;
    }
}

export const RequestForCertificateStartUI = withAsyncFrame(RequestForCertificateStartUIImpl, false)

//#endregion