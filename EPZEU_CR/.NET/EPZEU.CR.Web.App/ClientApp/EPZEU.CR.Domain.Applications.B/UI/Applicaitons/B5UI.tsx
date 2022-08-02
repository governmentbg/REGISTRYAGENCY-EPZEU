import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { B5 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F401_DistraintsFieldListUI } from "../Fields/F401_DistraintsUI";
import { F403_Reason403FieldUI } from "../Fields/F403_Reason403UI";
import { F404a_MoratoryRateFieldUI } from '../Fields/F404a_MoratoryRateUI';
import { F404_Size404FieldUI } from '../Fields/F404_Size404UI';
import { F405_InterestsFieldUI } from '../Fields/F405_InterestsUI';
import { F406_DescriptionsFieldUI } from '../Fields/F406_DescriptionsUI';
import { F408_LiftingDistraintFieldUI } from '../Fields/F408_LiftingDistraintUI';
import { F409_Size409FieldUI } from '../Fields/F409_Size409UI';
import { F410_StopExecutionOverProperty410FieldUI } from '../Fields/F410_StopExecutionOverProperty410UI';

interface B5UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF401 = ['CR_APP_00165_I'];
const fieldInfoKeysF403 = ['CR_APP_00166_I'];
const fieldInfoKeysF404 = ['CR_APP_00167_I'];
const fieldInfoKeysF404a = ['CR_APP_00177_I'];
const fieldInfoKeysF405 = ['CR_APP_00178_I'];
const fieldInfoKeysF406 = ['CR_APP_00168_I'];
const fieldInfoKeysF408 = ['CR_APP_00148_I'];
const fieldInfoKeysF409 = ['CR_APP_00149_I'];
const fieldInfoKeysF410 = ['CR_APP_00169_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class B5UIImpl extends EPZEUBaseComponent<B5UIProps, B5> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B5} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <SectionTitleUI titleKey={'CR_APP_PERSON_FAFOR_SHARE_L'} anchor="personfaforshare" />
            <F401_DistraintsFieldListUI {...this.bind(m => m.fields.distraints)} fieldInfoKeys={fieldInfoKeysF401} />
            <SectionTitleUI titleKey={'CR_APP_SECURED_CLAIM_L'} anchor="securedclaim" />
            <F403_Reason403FieldUI {...this.bind(m => m.fields.reason403)} fieldInfoKeys={fieldInfoKeysF403} />
            <SectionTitleUI titleKey={'CR_APP_AMOUNT_ARREST_L'} anchor="amountarrest" />
            <F404_Size404FieldUI {...this.bind(m => m.fields.size404)} fieldInfoKeys={fieldInfoKeysF404} />
            <F404a_MoratoryRateFieldUI {...this.bind(m => m.fields.moratoryRate)} fieldInfoKeys={fieldInfoKeysF404a} />
            <F405_InterestsFieldUI {...this.bind(m => m.fields.interests)} fieldInfoKeys={fieldInfoKeysF405} />
            <SectionTitleUI titleKey={'CR_APP_ARREST_HAVINGS_L'} anchor="arresthavings" />
            <F406_DescriptionsFieldUI {...this.bind(m => m.fields.descriptions)} fieldInfoKeys={fieldInfoKeysF406} />
            <SectionTitleUI titleKey={'CR_APP_ABANDONMENT_EXECUTION_L'} anchor="abandonmentexecution" />
            <F408_LiftingDistraintFieldUI {...this.bind(m => m.fields.liftingDistraint)} fieldInfoKeys={fieldInfoKeysF408} />
            <F409_Size409FieldUI {...this.bind(m => m.fields.size409)} fieldInfoKeys={fieldInfoKeysF409} />
            <F410_StopExecutionOverProperty410FieldUI {...this.bind(m => m.fields.stopExecutionOverProperty410)} fieldInfoKeys={fieldInfoKeysF410} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B5} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_APP_PERSON_FAFOR_SHARE_L'} anchor="personfaforshare" isForPreview={true} />
            <F401_DistraintsFieldListUI {...this.bind(m => m.fields.distraints)} />
            <SectionTitleUI titleKey={'CR_APP_SECURED_CLAIM_L'} anchor="securedclaim" isForPreview={true} />
            <F403_Reason403FieldUI {...this.bind(m => m.fields.reason403)} />
            <SectionTitleUI titleKey={'CR_APP_AMOUNT_ARREST_L'} anchor="amountarrest" isForPreview={true} />
            <F404_Size404FieldUI {...this.bind(m => m.fields.size404)} />
            <F404a_MoratoryRateFieldUI {...this.bind(m => m.fields.moratoryRate)} />
            <F405_InterestsFieldUI {...this.bind(m => m.fields.interests)} />
            <SectionTitleUI titleKey={'CR_APP_ARREST_HAVINGS_L'} anchor="arresthavings" isForPreview={true} />
            <F406_DescriptionsFieldUI {...this.bind(m => m.fields.descriptions)} />
            <SectionTitleUI titleKey={'CR_APP_ABANDONMENT_EXECUTION_L'} anchor="abandonmentexecution" isForPreview={true} />
            <F408_LiftingDistraintFieldUI {...this.bind(m => m.fields.liftingDistraint)} />
            <F409_Size409FieldUI {...this.bind(m => m.fields.size409)} />
            <F410_StopExecutionOverProperty410FieldUI {...this.bind(m => m.fields.stopExecutionOverProperty410)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const B5UI = withApplicationFormContext(B5UIImpl);