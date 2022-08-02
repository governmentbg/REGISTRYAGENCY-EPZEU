import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { SectionTitleUI } from 'EPZEU.CR.Domain';
import * as React from "react";
import { RequestForCertificateForReservedCompany } from '../Models/RequestForCertificateForReservedCompany';

const valSummaryPropNames = ["certificate.email"]

export class RequestForCertificateForReservedCompanyUI extends EPZEUBaseComponent<BaseProps, RequestForCertificateForReservedCompany> {

    renderEdit(): JSX.Element {
        return <>
            {this.renderCompanyInfo()}
            <SectionTitleUI titleKey={"CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L"} />
            <div className="field-container">
                <div className="row">
                    <div className="col-sm-6">
                        {this.labelFor(m => m.certificate.email, 'GL_APP_EMAIL_ADDRESS_L', { className: "field-title field-title--form" })}
                        {this.textBoxFor(x => x.certificate.email)}
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return <>
            {this.model.certificate && this.renderCompanyInfo()}
            <SectionTitleUI isForPreview titleKey={"CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L"} />
            <div className="field-container">
                {
                    this.model.certificate
                    && !ObjectHelper.isStringNullOrEmpty(this.model.certificate.email)
                    && <>{this.labelFor(m => m.certificate.email, 'GL_APP_EMAIL_ADDRESS_L', { className: "field-title field-title--preview" })}
                        <p className="field-text">{this.model.certificate.email}</p>
                    </>
                }

                <ValidationSummary includeErrorsRecursive={true} {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            </div>
        </>
    }

    renderCompanyInfo() {
        return <div className="field-container" >
            <p className="field-text">
                <span className={`field-title field-title--${this.props.viewMode == ViewMode.Edit ? "form" : "preview"}`}>{this.getResource('CR_GL_COMPANY_NAME_L')}: </span>{this.model.certificate.firm}
            </p>
            <p className="field-text">
                <span className={`field-title field-title--${this.props.viewMode == ViewMode.Edit ? "form" : "preview"}`}>{this.getResource("CR_GL_COMPANY_RIGHTS_L")}: </span>{this.model.certificate.personConcernedName}
            </p>
            <p className="field-text">
                <span className={`field-title field-title--${this.props.viewMode == ViewMode.Edit ? "form" : "preview"}`}>{this.getResource("CR_GL_END_DATE_PROTECTION_L")}: </span>{this.model.certificate.endDate}
            </p>
        </div>
    }
}