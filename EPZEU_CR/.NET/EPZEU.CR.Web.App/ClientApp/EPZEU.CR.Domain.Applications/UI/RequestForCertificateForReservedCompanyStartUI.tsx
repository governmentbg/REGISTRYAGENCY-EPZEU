import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { Button, EPZEUBaseComponent, IDataServiceProviderProps, ValidationSummaryErrors, withDataServiceProvider } from 'EPZEU.Core';
import { CompaniesDataService, ReservedCompany } from 'EPZEU.CR.Core';
import { StartUIProps } from 'EPZEU.CR.Domain';
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { CertificateForReserveFirmSearch, CertificateForReserveFirmStart } from '../Models/CertificateForReserveFirmSearch';

//#region Search

interface RequestForCertificateForReservedCompanySearch extends BaseProps {
    onSearchCallback: (criteria: any) => void;
    errorMessages?: string[];
}

@observer class RequestForCertificateForReservedCompanySearchUI extends EPZEUBaseComponent<RequestForCertificateForReservedCompanySearch, CertificateForReserveFirmSearch> {

    constructor(props?: RequestForCertificateForReservedCompanySearch) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    render(): JSX.Element {
        return <div className="field-container">           
            {!ObjectHelper.isNullOrUndefined(this.props.errorMessages) && this.props.errorMessages.length > 0 ? <ValidationSummaryErrors errors={this.props.errorMessages} /> : null}
            <div className="form-row">
                <div className="col-12">
                    {this.labelFor(m => m, 'CR_GL_COMPANY_NAME_L', { className: 'field-title field-title--form' })}
                </div>
                <div className="form-group col-8 col-sm-6 col-xl-6">
                    {this.textBoxFor(m => m.companyName)}
                </div>
                <div className="form-group col">
                    <button className="btn btn-outline-light text-dark" onClick={this.onSearch}>
                        <i className="ui-icon ui-icon-import mr-1" aria-hidden="true"></i> {this.getResource('GL_CHECK_L')}
                    </button>
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

@observer class RequestForCertificateForReservedCompanySearchResultUI extends EPZEUBaseComponent<BaseProps, ReservedCompany> {

    render(): JSX.Element {
        if (!ObjectHelper.isNullOrUndefined(this.model) && this.model.companyName) {

            return <div className="field-container" >
                <p className="field-text">
                    <span className="field-title field-title--form">{this.getResource('CR_GL_COMPANY_NAME_L')}: </span>{this.model.companyName}
                </p>
                <p className="field-text">
                    <span className="field-title field-title--form">{this.getResource("CR_GL_COMPANY_RIGHTS_L")}: </span>
                    {this.model.interestedPerson ? this.model.interestedPerson : null}
                    {this.model.interestedAs && this.model.interestedPerson ? ", " : null}
                    {this.model.interestedAs ? this.model.interestedAs : null}
                </p>
                <p className="field-text">
                    <span className="field-title field-title--form">{this.getResource("CR_GL_END_DATE_PROTECTION_L")}: </span>{this.dateDisplayFor(this.model.activeTo, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}
                </p>
            </div>
        }

        return null;
    }
}

//#endregion

//#region StartUI

interface RequestForCertificateForReservedCompanyStartProps extends StartUIProps, AsyncUIProps, BaseProps, IDataServiceProviderProps {
}

@observer class RequestForCertificateForReservedCompanyStartUIImpl extends EPZEUBaseComponent<RequestForCertificateForReservedCompanyStartProps, CertificateForReserveFirmStart> {
    @observable errorMessages: string[];

    private searchCriteria: string;
    private isFoundReservedCompanyName: boolean;
    private showResult: boolean;

    constructor(props?: RequestForCertificateForReservedCompanyStartProps) {
        super(props);

        this.searchResult = this.searchResult.bind(this);
        this.continue = this.continue.bind(this);

        if (!this.model)
            this.initModel();
    }

    render(): JSX.Element {
        return <div className="page-wrapper">
            <div className="section-wrapper">
                <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                <RequestForCertificateForReservedCompanySearchUI errorMessages={this.errorMessages} onSearchCallback={this.searchResult} {...this.bind(this.model.searchCriteria, 'searchCriteria')} />
                {this.showResult === true ? <RequestForCertificateForReservedCompanySearchResultUI  {...this.bind(this.model.result, 'result')} /> : null}
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
    }

    @action continue(): void {
        this.errorMessages = [];

        this.props.registerAsyncOperation(this.searchResult(false).then(() => {
            if (this.isFoundReservedCompanyName) {
                var request: any = {};
                request.applicationType = this.props.applicationType;
                request.additionalData = {};

                request.additionalData.companyName = this.model.result.companyName;
                request.additionalData.trasnliteration = this.model.result.trasnliteration;
                request.additionalData.legalFormName = this.model.result.legalFormName;
                request.additionalData.interestedPerson = this.model.result.interestedPerson;
                request.additionalData.interestedAs = this.model.result.interestedAs;
                request.additionalData.activeFrom = this.model.result.activeFrom;
                request.additionalData.activeTo = this.model.result.activeTo;
                request.additionalData.erasedDate = this.model.result.erasedDate;
                request.additionalData.personPosition = this.model.result.personPosition;

                return this.props.createApplicationProcess(request);
            }
        }));
    }

    @action searchResult(showResult: boolean): Promise<any> {
        var that = this;
        this.showResult = showResult;

        let companiesSrv = this.props.dataSrvProvider.getDataService<CompaniesDataService>(CompaniesDataService);

        return companiesSrv.getReservedCompany(this.model.searchCriteria.companyName).then(reservedCompanies => {
            that.errorMessages = [];

            if (reservedCompanies != null && reservedCompanies != undefined && reservedCompanies.length > 0) {

                runInAction.bind(that)(() => {
                    that.model.result.companyName = reservedCompanies[0].companyName;
                    that.model.result.trasnliteration = reservedCompanies[0].trasnliteration;
                    that.model.result.interestedPerson = reservedCompanies[0].interestedPerson;
                    that.model.result.activeFrom = reservedCompanies[0].activeFrom;
                    that.model.result.activeTo = reservedCompanies[0].activeTo;
                    that.model.result.interestedAs = reservedCompanies[0].interestedAs;

                    that.isFoundReservedCompanyName = true;
                })
            } else {
                that.searchCriteria = that.model.searchCriteria.companyName;
                that.initModel();
                that.model.searchCriteria.companyName = that.searchCriteria;
                that.errorMessages.push(this.getResource("GL_NOT_FOUND_RESULTS_E"))
            }
        });
    }

    @action initModel(): void {
        this.model = new CertificateForReserveFirmStart();
        this.model.searchCriteria = new CertificateForReserveFirmSearch();
        this.model.result = new ReservedCompany();
        this.isFoundReservedCompanyName = false;
    }
}

export const RequestForCertificateForReservedCompanyStartUI = withAsyncFrame(withDataServiceProvider(RequestForCertificateForReservedCompanyStartUIImpl), false);

//#endregion