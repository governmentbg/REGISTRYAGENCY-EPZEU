import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ProcessStates } from 'EPZEU.CR.Domain';
import * as React from "react";
import { ApplicantInfo } from '../../Models';
import { ApplicantCapacityUI } from '../ApplicantCapacityUI';
import { ApplicantsUI } from '../ApplicantsUI';
import { SectionInfoUI, SectionTitleUI } from '../CommonInfoComponents';
import { ApplicationFormContextProviderProps, withApplicationFormContext } from './';

interface ApplicantInfoUIProps extends ApplicationFormContextProviderProps, BaseProps {
}

var infoTextKeys1 = ['CR_APP_00051_I', 'CR_APP_00026_I'];

export class ApplicantInfoUIImpl extends EPZEUBaseComponent<ApplicantInfoUIProps, ApplicantInfo> {
    constructor(props?: ApplicantInfoUIProps) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <SectionTitleUI titleKey={'GL_APPLICANT_DATA_L'} /> 
                {this.props.applicationManager.processState == ProcessStates.Preregistration
                    ? <SectionInfoUI infoTextKey={infoTextKeys1} /> :
                    <SectionInfoUI infoTextKey={infoTextKeys1} />}
                <ApplicantsUI {...this.bind(m => m.applicants)} />
                <ApplicantCapacityUI {...this.bind(m => m.applicantCapacity)} />
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <SectionTitleUI titleKey={'GL_APPLICANT_DATA_L'} isForPreview={true} />
                <ApplicantsUI {...this.bind(m => m.applicants)} />
                <ApplicantCapacityUI {...this.bind(m => m.applicantCapacity)} />
            </>);
    }
};

export const ApplicantInfoUI = withApplicationFormContext(ApplicantInfoUIImpl);