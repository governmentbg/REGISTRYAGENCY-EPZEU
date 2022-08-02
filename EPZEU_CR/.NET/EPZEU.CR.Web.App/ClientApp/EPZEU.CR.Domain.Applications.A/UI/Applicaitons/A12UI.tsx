import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A12 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from "../Fields/F005_SeatUI";
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006_SubjectOfActivityFieldUI } from "../Fields/F006_SubjectOfActivityUI";
import { F010_RepresentativesFieldUI } from '../Fields/F010_RepresentativesUI';
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F012a_BoardOfManagers3FieldUI } from '../Fields/F012a_BoardOfManagers3UI';
import { F013b_LeadingBoardFieldUI } from '../Fields/F013b_LeadingBoardUI';
import { F014b_SupervisingBoard2FieldUI } from '../Fields/F014b_SupervisingBoard2UI';
import { F016_TermsOfPartnershipFieldUI } from '../Fields/F016_TermsOfPartnershipUI';
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F023b_EuropeanHoldingCompanysAsShareholdersFieldUI } from '../Fields/F023b_EuropeanHoldingCompanysAsShareholdersUI';
import { F023_SoleCapitalOwnerFieldUI } from '../Fields/F023_SoleCapitalOwnerUI';
import { F024a_HiddenNonMonetaryDepositFieldUI } from '../Fields/F024a_HiddenNonMonetaryDepositUI';
import { F027a_AddemptionOfTraderSeatChangeFieldUI } from '../Fields/F027a_AddemptionOfTraderSeatChangeUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';
import { F0310a_SharesFieldUI } from '../Fields/F031a_SharesUI';
import { F031_FundsFieldUI } from '../Fields/F031_FundsUI';
import { F032_DepositedFundsFieldUI } from '../Fields/F032_DepositedFundsUI';
import { F033_NonMonetaryDepositFieldUI } from '../Fields/F033_NonMonetaryDepositsUI';
import { F034_BuyBackDecisionFieldUI } from '../Fields/F034_BuyBackDecisionUI';
import { F070_WayOfEstablishingEuropeanCompanyFieldUI } from '../Fields/F070_WayOfEstablishingEuropeanCompanyUI';
import { F071_SeatChangeFieldUI } from '../Fields/F071_SeatChangeUI';

interface A12UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF005а = ['CR_APP_00020_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I', 'CR_APP_00117_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF010 = ['CR_APP_00107_I'];
const fieldInfoKeysF011 = ['CR_APP_00228_I'];
const fieldInfoKeysF012a = ['CR_APP_00108_I'];
const fieldInfoKeysF013b = ['CR_APP_00109_I'];
const fieldInfoKeysF014b = ['CR_APP_00110_I'];
const fieldInfoKeysF016 = ['CR_APP_00042_I'];
const fieldInfoKeysF017 = ['CR_APP_00111_I'];
const fieldInfoKeysF023 = ['CR_APP_00113_I'];
const fieldInfoKeysF023b = ['CR_APP_00103_I', 'CR_APP_00114_I'];
const fieldInfoKeysF024a = ['CR_APP_00084_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const fieldInfoKeysF027a = ['CR_APP_00094_I'];
const fieldInfoKeysF070 = ['CR_APP_00115_I'];
const fieldInfoKeysF071 = ['CR_APP_00116_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const infoTextKeys2 = ['CR_APP_00129_I'];
const infoTextKeys3 = ['CR_APP_00027_I', 'CR_APP_00029_I'];
const infoTextKeys4 = ['CR_APP_00037_I', 'CR_APP_00041_I', 'CR_APP_00043_I'];

class A12UIImpl extends EPZEUBaseComponent<A12UIProps, A12> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A12} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={infoTextKeys1} />
                    : <SectionInfoUI infoTextKey={infoTextKeys2} />
            }
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI fieldInfoKeys={fieldInfoKeysF002} {...this.bind(m => m.fields.company)} />
            <F004_TransliterationFieldRecordUI fieldInfoKeys={fieldInfoKeysF004} {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI fieldInfoKeys={fieldInfoKeysF005} {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI fieldInfoKeys={fieldInfoKeysF005а} {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} showIsBank showIsInsurer {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F010_RepresentativesFieldUI fieldInfoKeys={fieldInfoKeysF010} {...this.bind(m => m.fields.representatives)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012a_BoardOfManagers3FieldUI fieldInfoKeys={fieldInfoKeysF012a} {...this.bind(m => m.fields.boardOfManagers3)} />
            <F013b_LeadingBoardFieldUI fieldInfoKeys={fieldInfoKeysF013b} {...this.bind(m => m.fields.leadingBoard)} />
            <F014b_SupervisingBoard2FieldUI fieldInfoKeys={fieldInfoKeysF014b} {...this.bind(m => m.fields.supervisingBoard2)} />
            <F016_TermsOfPartnershipFieldUI fieldInfoKeys={fieldInfoKeysF016} showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI fieldInfoKeys={fieldInfoKeysF017} showHolding {...this.bind(m => m.fields.specialConditions)} />
            <F023_SoleCapitalOwnerFieldUI fieldInfoKeys={fieldInfoKeysF023} {...this.bind(m => m.fields.soleCapitalOwner)} />
            <F023b_EuropeanHoldingCompanysAsShareholdersFieldUI fieldInfoKeys={fieldInfoKeysF023b} {...this.bind(m => m.fields.europeanHoldingCompanysAsShareholders)} />
            <F024a_HiddenNonMonetaryDepositFieldUI fieldInfoKeys={fieldInfoKeysF024a} {...this.bind(m => m.fields.hiddenNonMonetaryDeposit)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <F027a_AddemptionOfTraderSeatChangeFieldUI fieldInfoKeys={fieldInfoKeysF027a} {...this.bind(m => m.fields.addemptionOfTraderSeatChange)} />
            <SectionTitleUI titleKey={'CR_GL_ADDITIONAL_INFORMATION_L'} anchor="additionalInformation" />
            <F070_WayOfEstablishingEuropeanCompanyFieldUI fieldInfoKeys={fieldInfoKeysF070} {...this.bind(m => m.fields.wayOfEstablishingEuropeanCompany)} />
            <F071_SeatChangeFieldUI fieldInfoKeys={fieldInfoKeysF071} {...this.bind(m => m.fields.seatChange)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={infoTextKeys3} />
                    : <SectionInfoUI infoTextKey={infoTextKeys4} />
            }
            <F031_FundsFieldUI {...this.bind(m => m.fields.funds)} hasRadioButtonsCurrency={true} />
            <F0310a_SharesFieldUI {...this.bind(m => m.fields.shares)} isMandatoryField={true} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} hasRadioButtonsCurrency={true} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            <F034_BuyBackDecisionFieldUI {...this.bind(m => m.fields.buyBackDecision)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A12} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI showIsInsurer insurerLabelKey={'CR_GL_INSURANCE_COMPANY_L'} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F010_RepresentativesFieldUI {...this.bind(m => m.fields.representatives)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012a_BoardOfManagers3FieldUI {...this.bind(m => m.fields.boardOfManagers3)} />
            <F013b_LeadingBoardFieldUI {...this.bind(m => m.fields.leadingBoard)} />
            <F014b_SupervisingBoard2FieldUI {...this.bind(m => m.fields.supervisingBoard2)} />
            <F016_TermsOfPartnershipFieldUI {...this.bind(m => m.fields.termsOfPartnership)} showTermType={true} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F023_SoleCapitalOwnerFieldUI {...this.bind(m => m.fields.soleCapitalOwner)} />
            <F023b_EuropeanHoldingCompanysAsShareholdersFieldUI {...this.bind(m => m.fields.europeanHoldingCompanysAsShareholders)} />
            <F024a_HiddenNonMonetaryDepositFieldUI {...this.bind(m => m.fields.hiddenNonMonetaryDeposit)} />
            <F027_AddemptionOfTraderFieldUI {...this.bind(m => m.fields.addemptionOfTrader)} />
            <F027a_AddemptionOfTraderSeatChangeFieldUI {...this.bind(m => m.fields.addemptionOfTraderSeatChange)} />
            <SectionTitleUI titleKey={'CR_GL_ADDITIONAL_INFORMATION_L'} anchor="additionalInformation" isForPreview={true} />
            <F070_WayOfEstablishingEuropeanCompanyFieldUI {...this.bind(m => m.fields.wayOfEstablishingEuropeanCompany)} />
            <F071_SeatChangeFieldUI {...this.bind(m => m.fields.seatChange)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" isForPreview={true} />
            <F031_FundsFieldUI {...this.bind(m => m.fields.funds)} hasRadioButtonsCurrency={true} />
            <F0310a_SharesFieldUI {...this.bind(m => m.fields.shares)} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} hasRadioButtonsCurrency={true} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            <F034_BuyBackDecisionFieldUI {...this.bind(m => m.fields.buyBackDecision)} />

            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A12UI = withApplicationFormContext(A12UIImpl);