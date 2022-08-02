import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes, LegalForms } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { B6 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F501_TermsOfLiquidationFieldUI } from "../Fields/F501_TermsOfLiquidationUI";
import { F502_LiquidatorsFieldUI } from "../Fields/F502_LiquidatorsUI";
import { F503_Representative503FieldUI } from "../Fields/F503_Representative503UI";
import { F504_ContinuingTradeActivityFieldUI } from "../Fields/F504_ContinuingTradeActivityUI";

interface B6UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF501 = ['CR_APP_LIQUIDATION_PERIOD_I'];
const fieldInfoKeysF502 = ['CR_APP_LIQUIDATORS_I'];
const fieldInfoKeysF503 = ['CR_APP_REPRESENTATIVE_I'];
const fieldInfoKeysF504 = ['CR_APP_CONTINUE_BUSINESS_ACTIVITY_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class B6UIImpl extends EPZEUBaseComponent<B6UIProps, B6> {

    renderEdit(): JSX.Element {
        var legalForm = this.props.applicationManager.additionalData.legalForm;
        var isCooperativ = legalForm == LegalForms.K || legalForm == LegalForms.EKD || legalForm == LegalForms.LEKD;
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B6} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_APP_TERMINATION_LIQUIDATION_L'} anchor="liquidation" />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <F501_TermsOfLiquidationFieldUI {...this.bind(m => m.fields.termsOfLiquidation)} fieldInfoKeys={fieldInfoKeysF501} />
            <F502_LiquidatorsFieldUI {...this.bind(m => m.fields.liquidators)} fieldInfoKeys={fieldInfoKeysF502} />
            {isCooperativ ?
                <F503_Representative503FieldUI {...this.bind(m => m.fields.representative503)} fieldInfoKeys={fieldInfoKeysF503} /> :
                null
            }
            <F504_ContinuingTradeActivityFieldUI {...this.bind(m => m.fields.continuingTradeActivity)} fieldInfoKeys={fieldInfoKeysF504} isDisabledForCooperative={isCooperativ} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B6} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_APP_TERMINATION_LIQUIDATION_L'} anchor="liquidation" isForPreview={true} />
            <F501_TermsOfLiquidationFieldUI {...this.bind(m => m.fields.termsOfLiquidation)} />
            <F502_LiquidatorsFieldUI {...this.bind(m => m.fields.liquidators)} />
            <F503_Representative503FieldUI {...this.bind(m => m.fields.representative503)} />
            <F504_ContinuingTradeActivityFieldUI {...this.bind(m => m.fields.continuingTradeActivity)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const B6UI = withApplicationFormContext(B6UIImpl);