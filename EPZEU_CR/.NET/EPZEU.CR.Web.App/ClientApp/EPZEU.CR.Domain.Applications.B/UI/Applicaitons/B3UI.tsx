import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { B3 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F201_PledgorsFieldUI } from "../Fields/F201_PledgorsUI";
import { F203_SecuredClaimDebtorsFieldUI } from "../Fields/F203_SecuredClaimDebtorsUI";
import { F205_PledgeCreditorsFieldUI } from "../Fields/F205_PledgeCreditorsUI";
import { F207a_ContractOfPledgeForShareFieldUI } from '../Fields/F207a_ContractOfPledgeForShareUI';
import { F207_SecuredClaimReasonFieldUI } from '../Fields/F207_SecuredClaimReasonUI';
import { F208_SecuredClaimSubjectFieldUI } from '../Fields/F208_SecuredClaimSubjectUI';
import { F209_SecuredClaimAmountFieldUI } from '../Fields/F209_SecuredClaimAmountUI';
import { F210_SecuredClaimInterestsUIFieldUI } from '../Fields/F210_SecuredClaimInterestsUI';
import { F211_SecuredClaimDelayInterestsUIFieldUI } from '../Fields/F211_SecuredClaimDelayInterestsUI';
import { F212_PledgeMoneyFieldUI } from '../Fields/F212_PledgeMoneyUI';
import { F213_PledgePropertyDescriptionFieldUI } from '../Fields/F213_PledgePropertyDescriptionUI';
import { F214_PledgePropertyPriceFieldUI } from '../Fields/F214_PledgePropertyPriceUI';
import { F215_ModalityDateFieldUI } from '../Fields/F215_ModalityDateUI';
import { F216a_PledgedCreditorAgreementFieldUI } from '../Fields/F216a_PledgedCreditorAgreementUI';
import { F216_ModalityConditionFieldUI } from '../Fields/F216_ModalityConditionUI';
import { F217_PledgeExecutionClaimFieldUI } from '../Fields/F217_PledgeExecutionClaimUI';
import { F218_Partners218FieldUI } from '../Fields/F218_Partners218UI';
import { F219_PledgeExecutionDepozitarFieldUI } from '../Fields/F219_PledgeExecutionDepozitarUI';
import { F220_DepozitarFieldUI } from '../Fields/F220_DepozitarUI';
import { F221_DepozitarDistraintRemoveFieldUI } from '../Fields/F221_DepozitarDistraintRemoveUI';
import { F222_StopOfExecutionSizeFieldUI } from '../Fields/F222_StopOfExecutionSizeUI';
import { F223a_EntryIntoPledgeCreditorRightsFieldUI } from '../Fields/F223a_EntryIntoPledgeCreditorRightsUI';
import { F223_StopOfExecutionPropertyFieldUI } from '../Fields/F223_StopOfExecutionPropertyUI';
import { F224_PledgeRenewDateFieldUI } from '../Fields/F224_PledgeRenewDateUI';
import { F225_PledgeAddemptionFieldUI } from '../Fields/F225_PledgeAddemptionUI';

interface B3UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF201 = ['CR_APP_00130_I'];
const fieldInfoKeysF203 = ['CR_APP_00133_I'];
const fieldInfoKeysF205 = ['CR_APP_00134_I'];
const fieldInfoKeysF207 = ['CR_APP_00135_I'];
const fieldInfoKeysF208 = ['CR_APP_00136_I'];
const fieldInfoKeysF209 = ['CR_APP_00137_I'];
const fieldInfoKeysF212 = ['CR_APP_00139_I'];
const fieldInfoKeysF213 = ['CR_APP_00140_I'];
const fieldInfoKeysF214 = ['CR_APP_00141_I'];
const fieldInfoKeysF215 = ['CR_APP_00142_I'];
const fieldInfoKeysF216 = ['CR_APP_00143_I'];
const fieldInfoKeysF217 = ['CR_APP_00144_I'];
const fieldInfoKeysF218 = ['CR_APP_00145_I'];
const fieldInfoKeysF219 = ['CR_APP_00146_I'];
const fieldInfoKeysF220 = ['CR_APP_00147_I', 'CR_APP_00160_I', 'CR_APP_00161_I'];
const fieldInfoKeysF221 = ['CR_APP_00148_I'];
const fieldInfoKeysF222 = ['CR_APP_00149_I'];
const fieldInfoKeysF223 = ['CR_APP_00150_I'];
const fieldInfoKeysF224 = ['CR_APP_00151_I'];
const fieldInfoKeysF225 = ['CR_APP_00152_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class B3UIImpl extends EPZEUBaseComponent<B3UIProps, B3> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B3} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <SectionTitleUI titleKey={'CR_APP_PLEDGER_L'} anchor="pledger" />
            <F201_PledgorsFieldUI fieldInfoKeys={fieldInfoKeysF201} {...this.bind(x => x.fields.pledgors)} />
            <SectionTitleUI titleKey={'CR_APP_DEBTOR_SEC_CLAIM_L'} anchor="debtorSecClaim" />
            <F203_SecuredClaimDebtorsFieldUI fieldInfoKeys={fieldInfoKeysF203} {...this.bind(x => x.fields.securedClaimDebtors)} />
            <SectionTitleUI titleKey={'CR_APP_PLEDGEE_L'} anchor="pledgee" />
            <F205_PledgeCreditorsFieldUI fieldInfoKeys={fieldInfoKeysF205} {...this.bind(x => x.fields.pledgeCreditors)} />
            <SectionTitleUI titleKey={'CR_APP_SECURED_CLAIM_L'} anchor="securedClaim" />
            <F207_SecuredClaimReasonFieldUI fieldInfoKeys={fieldInfoKeysF207} {...this.bind(x => x.fields.securedClaimReason)} />
            <F207a_ContractOfPledgeForShareFieldUI {...this.bind(x => x.fields.contractOfPledgeForShare)} />
            <F208_SecuredClaimSubjectFieldUI fieldInfoKeys={fieldInfoKeysF208} {...this.bind(x => x.fields.securedClaimSubject)} />
            <F209_SecuredClaimAmountFieldUI fieldInfoKeys={fieldInfoKeysF209} {...this.bind(x => x.fields.securedClaimAmount)} />
            <F210_SecuredClaimInterestsUIFieldUI {...this.bind(x => x.fields.securedClaimInterests)} />
            <F211_SecuredClaimDelayInterestsUIFieldUI {...this.bind(x => x.fields.securedClaimDelayInterests)} />
            <SectionTitleUI titleKey={'CR_APP_AMOUNT_BET_SET_L'} anchor="amountBetSet" />
            <F212_PledgeMoneyFieldUI fieldInfoKeys={fieldInfoKeysF212} {...this.bind(x => x.fields.pledgeMoney)} />
            <SectionTitleUI titleKey={'CR_APP_PLEDGE_POSSESSION_L'} anchor="pledgePossession" />
            <F213_PledgePropertyDescriptionFieldUI fieldInfoKeys={fieldInfoKeysF213} {...this.bind(x => x.fields.pledgePropertyDescription)} />
            <F214_PledgePropertyPriceFieldUI fieldInfoKeys={fieldInfoKeysF214} {...this.bind(x => x.fields.pledgePropertyPrice)} />
            <SectionTitleUI titleKey={'CR_APP_MODALITIES_L'} anchor="modalities" />
            <F215_ModalityDateFieldUI fieldInfoKeys={fieldInfoKeysF215} {...this.bind(x => x.fields.modalityDate)} />
            <F216_ModalityConditionFieldUI fieldInfoKeys={fieldInfoKeysF216} {...this.bind(x => x.fields.modalityCondition)} />
            <SectionTitleUI titleKey={'CR_GL_CONSENT_PLEDGE_CREDITOR_L'} anchor="consent_pledge_creditor" />
            <F216a_PledgedCreditorAgreementFieldUI {...this.bind(x => x.fields.pledgedCreditorAgreement)} />
            <SectionTitleUI titleKey={'CR_APP_TAKE_BET_L'} anchor="takeBet" />
            <F217_PledgeExecutionClaimFieldUI fieldInfoKeys={fieldInfoKeysF217} {...this.bind(x => x.fields.pledgeExecutionClaim)} />
            <F218_Partners218FieldUI fieldInfoKeys={fieldInfoKeysF218} {...this.bind(x => x.fields.partners218)} />
            <F219_PledgeExecutionDepozitarFieldUI fieldInfoKeys={fieldInfoKeysF219} {...this.bind(x => x.fields.pledgeExecutionDepozitar)} />
            <SectionTitleUI titleKey={'CR_APP_ARREST_AMOUNT_L'} anchor="arrestAmount" />
            <F220_DepozitarFieldUI fieldInfoKeys={fieldInfoKeysF220} {...this.bind(x => x.fields.depozitar)} />
            <F221_DepozitarDistraintRemoveFieldUI fieldInfoKeys={fieldInfoKeysF221} {...this.bind(x => x.fields.depozitarDistraintRemove)} />
            <SectionTitleUI titleKey={'CR_APP_ABANDONMENT_EXECUTION_L'} anchor="abandonmentExecution" />
            <F222_StopOfExecutionSizeFieldUI fieldInfoKeys={fieldInfoKeysF222} {...this.bind(x => x.fields.stopOfExecutionSize)} />
            <F223_StopOfExecutionPropertyFieldUI fieldInfoKeys={fieldInfoKeysF223} {...this.bind(x => x.fields.stopOfExecutionProperty)} />
            <SectionTitleUI titleKey={'CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L'} anchor="entry_pledge_creditor_rights" isForPreview={true} />
            <F223a_EntryIntoPledgeCreditorRightsFieldUI {...this.bind(x => x.fields.entryIntoPledgeCreditorRights)} />
            <SectionTitleUI titleKey={'CR_APP_RENEWAL_ENTRY_BET_L'} anchor="renewalEntryBet" />
            <F224_PledgeRenewDateFieldUI fieldInfoKeys={fieldInfoKeysF224} {...this.bind(x => x.fields.pledgeRenewDate)} />
            <SectionTitleUI titleKey={'CR_APP_DELETE_PLEDGE_L'} anchor="deletePledge" />
            <F225_PledgeAddemptionFieldUI fieldInfoKeys={fieldInfoKeysF225} {...this.bind(x => x.fields.pledgeAddemption)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B3} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_APP_PLEDGER_L'} anchor="pledger" isForPreview={true} />
            <F201_PledgorsFieldUI {...this.bind(x => x.fields.pledgors)} />
            <SectionTitleUI titleKey={'CR_APP_DEBTOR_SEC_CLAIM_L'} anchor="debtorSecClaim" isForPreview={true} />
            <F203_SecuredClaimDebtorsFieldUI {...this.bind(x => x.fields.securedClaimDebtors)} />
            <SectionTitleUI titleKey={'CR_APP_PLEDGEE_L'} anchor="pledgee" isForPreview={true} />
            <F205_PledgeCreditorsFieldUI {...this.bind(x => x.fields.pledgeCreditors)} />
            <SectionTitleUI titleKey={'CR_APP_SECURED_CLAIM_L'} anchor="securedClaim" isForPreview={true} />
            <F207_SecuredClaimReasonFieldUI {...this.bind(x => x.fields.securedClaimReason)} />
            <F207a_ContractOfPledgeForShareFieldUI {...this.bind(x => x.fields.contractOfPledgeForShare)} />
            <F208_SecuredClaimSubjectFieldUI {...this.bind(x => x.fields.securedClaimSubject)} />
            <F209_SecuredClaimAmountFieldUI {...this.bind(x => x.fields.securedClaimAmount)} />
            <F210_SecuredClaimInterestsUIFieldUI {...this.bind(x => x.fields.securedClaimInterests)} />
            <F211_SecuredClaimDelayInterestsUIFieldUI {...this.bind(x => x.fields.securedClaimDelayInterests)} />
            <SectionTitleUI titleKey={'CR_APP_AMOUNT_BET_SET_L'} anchor="amountBetSet" isForPreview={true} />
            <F212_PledgeMoneyFieldUI {...this.bind(x => x.fields.pledgeMoney)} />
            <SectionTitleUI titleKey={'CR_APP_PLEDGE_POSSESSION_L'} anchor="pledgePossession" isForPreview={true} />
            <F213_PledgePropertyDescriptionFieldUI {...this.bind(x => x.fields.pledgePropertyDescription)} />
            <F214_PledgePropertyPriceFieldUI {...this.bind(x => x.fields.pledgePropertyPrice)} />
            <SectionTitleUI titleKey={'CR_APP_MODALITIES_L'} anchor="modalities" isForPreview={true} />
            <F215_ModalityDateFieldUI {...this.bind(x => x.fields.modalityDate)} />
            <F216_ModalityConditionFieldUI {...this.bind(x => x.fields.modalityCondition)} />
            <SectionTitleUI titleKey={'CR_GL_CONSENT_PLEDGE_CREDITOR_L'} anchor="consent_pledge_creditor" isForPreview={true} />
            <F216a_PledgedCreditorAgreementFieldUI {...this.bind(x => x.fields.pledgedCreditorAgreement)} />
            <SectionTitleUI titleKey={'CR_APP_TAKE_BET_L'} anchor="takeBet" isForPreview={true} />
            <F217_PledgeExecutionClaimFieldUI {...this.bind(x => x.fields.pledgeExecutionClaim)} />
            <F218_Partners218FieldUI {...this.bind(x => x.fields.partners218)} />
            <F219_PledgeExecutionDepozitarFieldUI {...this.bind(x => x.fields.pledgeExecutionDepozitar)} />
            <SectionTitleUI titleKey={'CR_APP_ARREST_AMOUNT_L'} anchor="arrestAmount" isForPreview={true} />
            <F220_DepozitarFieldUI {...this.bind(x => x.fields.depozitar)} />
            <F221_DepozitarDistraintRemoveFieldUI {...this.bind(x => x.fields.depozitarDistraintRemove)} />
            <SectionTitleUI titleKey={'CR_APP_ABANDONMENT_EXECUTION_L'} anchor="abandonmentExecution" isForPreview={true} />
            <F222_StopOfExecutionSizeFieldUI {...this.bind(x => x.fields.stopOfExecutionSize)} />
            <F223_StopOfExecutionPropertyFieldUI {...this.bind(x => x.fields.stopOfExecutionProperty)} />
            <SectionTitleUI titleKey={'CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L'} anchor="entry_pledge_creditor_rights" isForPreview={true} />
            <F223a_EntryIntoPledgeCreditorRightsFieldUI {...this.bind(x => x.fields.entryIntoPledgeCreditorRights)} />
            <SectionTitleUI titleKey={'CR_APP_RENEWAL_ENTRY_BET_L'} anchor="renewalEntryBet" isForPreview={true} />
            <F224_PledgeRenewDateFieldUI {...this.bind(x => x.fields.pledgeRenewDate)} />
            <SectionTitleUI titleKey={'CR_APP_DELETE_PLEDGE_L'} anchor="deletePledge" isForPreview={true} />
            <F225_PledgeAddemptionFieldUI {...this.bind(x => x.fields.pledgeAddemption)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const B3UI = withApplicationFormContext(B3UIImpl);