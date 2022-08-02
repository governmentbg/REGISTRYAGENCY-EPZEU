﻿import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicantCapacityUI, ApplicantExchangeUI, ApplicantsUI, ApplicationFormContextProviderProps, DocumentsUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import * as React from "react";
import { IncomingRequestForCorrection } from '../Models/ModelsAutoGenerated';
import { RequestDataUI } from './RequestDataUI';

interface IncomingRequestForCorrectionUIProps extends BaseProps, ApplicationFormContextProviderProps {
}

class IncomingRequestForCorrectionUIImpl extends EPZEUBaseComponent<IncomingRequestForCorrectionUIProps, IncomingRequestForCorrection> {

    renderEdit(): JSX.Element {
        return (<>
            <SectionTitleUI anchor="interestedPerson" titleKey="CR_APP_DETAILS_ABOUT_INTERESTED_PERSON_L" />
            <ApplicantsUI addButtonLabelKey="CR_APP_ADD_INTERESTED_PERSON_L" {...this.bind(m => m.applicantInfo.applicants)} />
            <ApplicantCapacityUI titleKey="GL_QUALITY_PERSON_CONCERNED_L" {...this.bind(m => m.applicantInfo.applicantCapacity)} />
            <ApplicantExchangeUI anchor="address" {...this.bind(m => m.applicantExchange)} />
            <SectionTitleUI titleKey={'CR_APP_REQUEST_FOR_ERRORS_AND_INCOMPLETENESS_L'} anchor="requestData" />
            <RequestDataUI {...this.bind(m => m.requestForCorrection)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} labelTextKey={'CR_APP_ANOTHER_ATTACHED_DOCUMENTS_L'} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} disableDocumentRefusal={true} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <SectionTitleUI anchor="interestedPerson" titleKey="CR_APP_DETAILS_ABOUT_INTERESTED_PERSON_L" isForPreview={true} />
            {
                this.model.applicantInfo &&
                <>
                    <ApplicantsUI {...this.bind(m => m.applicantInfo.applicants)} />
                    <ApplicantCapacityUI titleKey="GL_QUALITY_PERSON_CONCERNED_L" {...this.bind(m => m.applicantInfo.applicantCapacity)} />
                </>
            }
            
            <ApplicantExchangeUI anchor="address" {...this.bind(m => m.applicantExchange)} />
            <SectionTitleUI titleKey={'CR_APP_REQUEST_FOR_ERRORS_AND_INCOMPLETENESS_L'} anchor="requestData" isForPreview={true} />
            <RequestDataUI {...this.bind(m => m.requestForCorrection)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} labelTextKey={'CR_APP_ANOTHER_ATTACHED_DOCUMENTS_L'} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const IncomingRequestForCorrectionUI = withApplicationFormContext(IncomingRequestForCorrectionUIImpl);