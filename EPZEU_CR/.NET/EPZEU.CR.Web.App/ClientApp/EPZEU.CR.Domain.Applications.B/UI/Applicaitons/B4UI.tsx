import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { B4 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F301_DebtorOverSecureClaimsFieldUI } from "../Fields/F301_DebtorOverSecureClaimsUI";
import { F303_AtPawnCreditorsFieldUI } from "../Fields/F303_AtPawnCreditorsUI";
import { F305a_PledgeContractForTraderFieldUI } from "../Fields/F305a_PledgeContractForTraderUI";
import { F305_ReasonFieldUI } from "../Fields/F305_ReasonUI";
import { F306_Object306FieldUI } from "../Fields/F306_Object306UI";
import { F307_Size307FieldUI } from "../Fields/F307_Size307UI";
import { F308_InterestFieldUI } from "../Fields/F308_InterestUI";
import { F309_InterestAndDefaultForDelayFieldUI } from "../Fields/F309_InterestAndDefaultForDelayUI";
import { F310_Size310FieldUI } from "../Fields/F310_Size310UI";
import { F311_DescriptionFieldUI } from "../Fields/F311_DescriptionUI";
import { F312_Price312FieldUI } from "../Fields/F312_Price312UI";
import { F313_TermFieldUI } from "../Fields/F313_TermUI";
import { F314a_PledgedCreditorAgreement2FieldUI } from "../Fields/F314a_PledgedCreditorAgreement2UI";
import { F314_CircumstancesFieldUI } from "../Fields/F314_CircumstancesUI";
import { F315_PartOfClaimwhatIsSeekFieldUI } from "../Fields/F315_PartOfClaimwhatIsSeekUI";
import { F316_PropertyOverExecutionFieldUI } from "../Fields/F316_PropertyOverExecutionUI";
import { F317_DepositorFieldUI } from "../Fields/F317_DepositorUI";
import { F318_InvitationForAppointingOfManagerFieldUI } from "../Fields/F318_InvitationForAppointingOfManagerUI";
import { F319_ManagerOfTradeEnterpriseFieldUI } from "../Fields/F319_ManagerOfTradeEnterpriseUI";
import { F320_RestoringManagementRightFieldUI } from "../Fields/F320_RestoringManagementRightUI";
import { F321_DistraintDataFieldUI } from "../Fields/F321_DistraintDataUI";
import { F322_RaiseDistraintFieldUI } from "../Fields/F322_RaiseDistraintUI";
import { F323_Size323FieldUI } from "../Fields/F323_Size323UI";
import { F324a_EntryIntoPledgeCreditorRight2FieldUI } from "../Fields/F324a_EntryIntoPledgeCreditorRight2UI";
import { F324_StopExecutionOverPropertyFieldUI } from "../Fields/F324_StopExecutionOverPropertyUI";
import { F325a_PartialEraseDistraintFieldUI } from "../Fields/F325a_PartialEraseDistraintUI";
import { F325_EraseDistraintFieldUI } from "../Fields/F325_EraseDistraintUI";
import { F326_DateOfRenewingDistraintFieldUI } from "../Fields/F326_DateOfRenewingDistraintUI";

interface B4UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF301 = ['CR_APP_00133_I'];
const fieldInfoKeysF303 = ['CR_APP_00134_I'];
const fieldInfoKeysF305 = ['CR_APP_00135_I'];
const fieldInfoKeysF306 = ['CR_APP_00136_I'];
const fieldInfoKeysF307 = ['CR_APP_00137_I'];
const fieldInfoKeysF308 = ['CR_APP_00138_I'];
const fieldInfoKeysF310 = ['CR_APP_00139_I'];
const fieldInfoKeysF311 = ['CR_APP_00154_I'];
const fieldInfoKeysF312 = ['CR_APP_00155_I'];
const fieldInfoKeysF313 = ['CR_APP_00142_I'];
const fieldInfoKeysF314 = ['CR_APP_00143_I'];
const fieldInfoKeysF315 = ['CR_APP_00144_I'];
const fieldInfoKeysF316 = ['CR_APP_00156_I'];
const fieldInfoKeysF317 = ['CR_APP_00146_I'];
const fieldInfoKeysF318 = ['CR_APP_00157_I'];
const fieldInfoKeysF319 = ['CR_APP_00158_I'];
const fieldInfoKeysF320 = ['CR_APP_00159_I'];
const fieldInfoKeysF321 = ['CR_APP_00147_I', 'CR_APP_00162_I', 'CR_APP_00161_I'];
const fieldInfoKeysF322 = ['CR_APP_00148_I'];
const fieldInfoKeysF323 = ['CR_APP_00149_I'];
const fieldInfoKeysF324 = ['CR_APP_00163_I'];
const fieldInfoKeysF325 = ['CR_APP_00152_I'];
const fieldInfoKeysF325a = ['CR_APP_00164_I'];
const fieldInfoKeysF326 = ['CR_APP_00151_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];
const infoTextKeys2 = ['CR_APP_00129_I'];

class B4UIImpl extends EPZEUBaseComponent<B4UIProps, B4> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B4} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : <SectionInfoUI infoTextKey={infoTextKeys2} />}

            <SectionTitleUI titleKey={'CR_APP_DEBTOR_SEC_CLAIM_L'} anchor="com_ent_mortgage_1_1" />
            <F301_DebtorOverSecureClaimsFieldUI {...this.bind(m => m.fields.debtorOverSecureClaims)} fieldInfoKeys={fieldInfoKeysF301} />

            <SectionTitleUI titleKey={'CR_APP_PLEDGEE_L'} anchor="com_ent_mortgage_1_2" />
            <F303_AtPawnCreditorsFieldUI {...this.bind(m => m.fields.atPawnCreditors)} fieldInfoKeys={fieldInfoKeysF303} />

            <SectionTitleUI titleKey={'CR_APP_SECURED_CLAIM_L'} anchor="com_ent_mortgage_2_1" />
            <F305_ReasonFieldUI {...this.bind(m => m.fields.reason)} fieldInfoKeys={fieldInfoKeysF305} />
            <F305a_PledgeContractForTraderFieldUI {...this.bind(m => m.fields.pledgeContractForTrader)} />
            <F306_Object306FieldUI {...this.bind(m => m.fields.object306)} fieldInfoKeys={fieldInfoKeysF306} />
            <F307_Size307FieldUI {...this.bind(m => m.fields.size307)} fieldInfoKeys={fieldInfoKeysF307} />
            <F308_InterestFieldUI {...this.bind(m => m.fields.interest)} fieldInfoKeys={fieldInfoKeysF308} />
            <F309_InterestAndDefaultForDelayFieldUI {...this.bind(m => m.fields.interestAndDefaultForDelay)} />

            <SectionTitleUI titleKey={'CR_APP_AMOUNT_BET_SET_L'} anchor="com_ent_mortgage_2_2" />
            <F310_Size310FieldUI {...this.bind(m => m.fields.size310)} fieldInfoKeys={fieldInfoKeysF310} />

            <SectionTitleUI titleKey={'CR_APP_PLEDGE_POSSESSION_L'} anchor="com_ent_mortgage_2_3" />
            <F311_DescriptionFieldUI {...this.bind(m => m.fields.description)} fieldInfoKeys={fieldInfoKeysF311} />
            <F312_Price312FieldUI {...this.bind(m => m.fields.price312)} fieldInfoKeys={fieldInfoKeysF312} />

            <SectionTitleUI titleKey={'CR_APP_MODALITIES_L'} anchor="com_ent_mortgage_2_4" />
            <F313_TermFieldUI {...this.bind(m => m.fields.term)} fieldInfoKeys={fieldInfoKeysF313} />
            <F314_CircumstancesFieldUI {...this.bind(m => m.fields.circumstances)} fieldInfoKeys={fieldInfoKeysF314} />
            <SectionTitleUI titleKey={'CR_GL_CONSENT_PLEDGE_CREDITOR_L'} anchor="com_ent_consent_pledge_creditor_2_5" />
            <F314a_PledgedCreditorAgreement2FieldUI {...this.bind(m => m.fields.pledgedCreditorAgreement2)} />

            <SectionTitleUI titleKey={'CR_APP_TAKE_BET_L'} anchor="com_ent_mortgage_3_1" />
            <F315_PartOfClaimwhatIsSeekFieldUI {...this.bind(m => m.fields.partOfClaimwhatIsSeek)} fieldInfoKeys={fieldInfoKeysF315} />
            <F316_PropertyOverExecutionFieldUI {...this.bind(m => m.fields.propertyOverExecution)} fieldInfoKeys={fieldInfoKeysF316} />
            <F317_DepositorFieldUI {...this.bind(m => m.fields.depositor)} fieldInfoKeys={fieldInfoKeysF317} />
            <F318_InvitationForAppointingOfManagerFieldUI {...this.bind(m => m.fields.invitationForAppointingOfManager)} fieldInfoKeys={fieldInfoKeysF318} />
            <F319_ManagerOfTradeEnterpriseFieldUI {...this.bind(m => m.fields.managerOfTradeEnterprise)} fieldInfoKeys={fieldInfoKeysF319} />
            <F320_RestoringManagementRightFieldUI {...this.bind(m => m.fields.restoringManagementRight)} fieldInfoKeys={fieldInfoKeysF320} />

            <SectionTitleUI titleKey={'CR_APP_ARREST_AMOUNT_REMAIN_DISTRIBUTION_L'} anchor="com_ent_mortgage_4_1" />
            <F321_DistraintDataFieldUI {...this.bind(m => m.fields.distraintData)} fieldInfoKeys={fieldInfoKeysF321} />
            <F322_RaiseDistraintFieldUI {...this.bind(m => m.fields.raiseDistraint)} fieldInfoKeys={fieldInfoKeysF322} />

            <SectionTitleUI titleKey={'CR_APP_ABANDONMENT_EXECUTION_L'} anchor="com_ent_mortgage_4_2" />
            <F323_Size323FieldUI {...this.bind(m => m.fields.size323)} fieldInfoKeys={fieldInfoKeysF323} />
            <F324_StopExecutionOverPropertyFieldUI {...this.bind(m => m.fields.stopExecutionOverProperty)} fieldInfoKeys={fieldInfoKeysF324} />
            <SectionTitleUI titleKey={'CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L'} anchor="com_ent_pledge_creditor_rights" />
            <F324a_EntryIntoPledgeCreditorRight2FieldUI {...this.bind(m => m.fields.entryIntoPledgeCreditorRights2)} />

            <SectionTitleUI titleKey={'CR_APP_DELETE_PLEDGE_L'} anchor="com_ent_mortgage_4_3" />
            <F325_EraseDistraintFieldUI {...this.bind(m => m.fields.eraseDistraint)} fieldInfoKeys={fieldInfoKeysF325} />
            <F325a_PartialEraseDistraintFieldUI {...this.bind(m => m.fields.partialEraseDistraint)} fieldInfoKeys={fieldInfoKeysF325a} />

            <SectionTitleUI titleKey={'CR_APP_RENEWAL_ENTRY_BET_L'} anchor="com_ent_mortgage_4_4" />
            <F326_DateOfRenewingDistraintFieldUI {...this.bind(m => m.fields.dateOfRenewingDistraint)} fieldInfoKeys={fieldInfoKeysF326} />

            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B4} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />

            <SectionTitleUI titleKey={'CR_APP_DEBTOR_SEC_CLAIM_L'} anchor="com_ent_mortgage_1_1" isForPreview={true} />
            <F301_DebtorOverSecureClaimsFieldUI {...this.bind(m => m.fields.debtorOverSecureClaims)} />

            <SectionTitleUI titleKey={'CR_APP_PLEDGEE_L'} anchor="com_ent_mortgage_1_2" isForPreview={true} />
            <F303_AtPawnCreditorsFieldUI {...this.bind(m => m.fields.atPawnCreditors)} />

            <SectionTitleUI titleKey={'CR_APP_SECURED_CLAIM_L'} anchor="com_ent_mortgage_2_1" isForPreview={true} />
            <F305_ReasonFieldUI {...this.bind(m => m.fields.reason)} />
            <F305a_PledgeContractForTraderFieldUI {...this.bind(m => m.fields.pledgeContractForTrader)} />
            <F306_Object306FieldUI {...this.bind(m => m.fields.object306)} />
            <F307_Size307FieldUI {...this.bind(m => m.fields.size307)} />
            <F308_InterestFieldUI {...this.bind(m => m.fields.interest)} />
            <F309_InterestAndDefaultForDelayFieldUI {...this.bind(m => m.fields.interestAndDefaultForDelay)} />

            <SectionTitleUI titleKey={'CR_APP_AMOUNT_BET_SET_L'} anchor="com_ent_mortgage_2_2" isForPreview={true} />
            <F310_Size310FieldUI {...this.bind(m => m.fields.size310)} />

            <SectionTitleUI titleKey={'CR_APP_PLEDGE_POSSESSION_L'} anchor="com_ent_mortgage_2_3" isForPreview={true} />
            <F311_DescriptionFieldUI {...this.bind(m => m.fields.description)} />
            <F312_Price312FieldUI {...this.bind(m => m.fields.price312)} />

            <SectionTitleUI titleKey={'CR_APP_MODALITIES_L'} anchor="com_ent_mortgage_2_4" isForPreview={true} />
            <F313_TermFieldUI {...this.bind(m => m.fields.term)} />
            <F314_CircumstancesFieldUI {...this.bind(m => m.fields.circumstances)} />

            <SectionTitleUI titleKey={'CR_GL_CONSENT_PLEDGE_CREDITOR_L'} anchor="com_ent_consent_pledge_creditor_2_5" isForPreview={true}/>
            <F314a_PledgedCreditorAgreement2FieldUI {...this.bind(m => m.fields.pledgedCreditorAgreement2)} />

            <SectionTitleUI titleKey={'CR_APP_TAKE_BET_L'} anchor="com_ent_mortgage_3_1" isForPreview={true} />
            <F315_PartOfClaimwhatIsSeekFieldUI {...this.bind(m => m.fields.partOfClaimwhatIsSeek)} />
            <F316_PropertyOverExecutionFieldUI {...this.bind(m => m.fields.propertyOverExecution)} />
            <F317_DepositorFieldUI {...this.bind(m => m.fields.depositor)} />
            <F318_InvitationForAppointingOfManagerFieldUI {...this.bind(m => m.fields.invitationForAppointingOfManager)} />
            <F319_ManagerOfTradeEnterpriseFieldUI {...this.bind(m => m.fields.managerOfTradeEnterprise)} />
            <F320_RestoringManagementRightFieldUI {...this.bind(m => m.fields.restoringManagementRight)} />

            <SectionTitleUI titleKey={'CR_APP_ARREST_AMOUNT_REMAIN_DISTRIBUTION_L'} anchor="com_ent_mortgage_4_1" isForPreview={true} />
            <F321_DistraintDataFieldUI {...this.bind(m => m.fields.distraintData)} />
            <F322_RaiseDistraintFieldUI {...this.bind(m => m.fields.raiseDistraint)} />

            <SectionTitleUI titleKey={'CR_APP_ABANDONMENT_EXECUTION_L'} anchor="com_ent_mortgage_4_2" isForPreview={true} />
            <F323_Size323FieldUI {...this.bind(m => m.fields.size323)} />
            <F324_StopExecutionOverPropertyFieldUI {...this.bind(m => m.fields.stopExecutionOverProperty)} />

            <SectionTitleUI titleKey={'CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L'} anchor="com_ent_pledge_creditor_rights" isForPreview={true} />
            <F324a_EntryIntoPledgeCreditorRight2FieldUI {...this.bind(m => m.fields.entryIntoPledgeCreditorRights2)} />

            <SectionTitleUI titleKey={'CR_APP_DELETE_PLEDGE_L'} anchor="com_ent_mortgage_4_3" isForPreview={true} />
            <F325_EraseDistraintFieldUI {...this.bind(m => m.fields.eraseDistraint)} />
            <F325a_PartialEraseDistraintFieldUI {...this.bind(m => m.fields.partialEraseDistraint)} />

            <SectionTitleUI titleKey={'CR_APP_RENEWAL_ENTRY_BET_L'} anchor="com_ent_mortgage_4_4" isForPreview={true} />
            <F326_DateOfRenewingDistraintFieldUI {...this.bind(m => m.fields.dateOfRenewingDistraint)} />

            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const B4UI = withApplicationFormContext(B4UIImpl);