import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes, LegalForms } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A13 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from "../Fields/F005_SeatUI";
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006_SubjectOfActivityFieldUI } from "../Fields/F006_SubjectOfActivityUI";
import { F010_RepresentativesFieldUI } from '../Fields/F010_RepresentativesUI';
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F012a_BoardOfManagers3FieldUI } from '../Fields/F012a_BoardOfManagers3UI';
import { F012b_AdministrativeBoardFieldUI } from '../Fields/F012b_AdministrativeBoardUI';
import { F012v_AdministrativeBoardSupportersFieldUI } from '../Fields/F012v_AdministrativeBoardSupportersUI';
import { F013v_BoardOfManagersSupporters2FieldUI } from '../Fields/F013v_BoardOfManagersSupporters2UI';
import { F014b_SupervisingBoard2FieldUI } from '../Fields/F014b_SupervisingBoard2UI';
import { F014v_SupervisingBoardSupportersFieldUI } from '../Fields/F014v_SupervisingBoardSupportersUI';
import { F016_TermsOfPartnershipFieldUI } from '../Fields/F016_TermsOfPartnershipUI';
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F025_SharePaymentResponsibilityFieldUI } from '../Fields/F025_SharePaymentResponsibilityUI';
import { F027a_AddemptionOfTraderSeatChangeFieldUI } from '../Fields/F027a_AddemptionOfTraderSeatChangeUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';
import { F031b_MinimumAmountFieldUI } from '../Fields/F031b_MinimumAmountUI';
import { F032_DepositedFundsFieldUI } from '../Fields/F032_DepositedFundsUI';
import { F033_NonMonetaryDepositFieldUI } from '../Fields/F033_NonMonetaryDepositsUI';
import { F070a_WayOfEstablishingEuropeanCooperativeSocietyFieldUI } from '../Fields/F070a_WayOfEstablishingEuropeanCooperativeSocietyUI';
import { F071_SeatChangeFieldUI } from '../Fields/F071_SeatChangeUI';

interface A13UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00118_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF010 = ['CR_APP_00123_I'];
const fieldInfoKeysF011 = ['CR_APP_00228_I'];
const fieldInfoKeysF016 = ['CR_APP_00042_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const fieldInfoKeysF027a = ['CR_APP_00094_I'];
const fieldInfoKeysF071 = ['CR_APP_00128_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const infoTextKeys2 = ['CR_APP_00129_I'];
const infoTextKeys3 = ['CR_APP_00124_I'];
const infoTextKeys4 = ['CR_APP_00125_I'];
const infoTextKeys5 = ['CR_APP_00126_I'];
const infoTextKeys6 = ['CR_APP_00127_I'];
const infoTextKeys7 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00035_I', 'CR_APP_00039_I'];
const infoTextKeys8 = ['CR_APP_00035_I', 'CR_APP_00039_I'];

class A13UIImpl extends EPZEUBaseComponent<A13UIProps, A13> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A13} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={infoTextKeys1} />
                    : <SectionInfoUI infoTextKey={infoTextKeys2} />
            }
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI fieldInfoKeys={fieldInfoKeysF002} {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI possibleChoicesOfLegalForm={[LegalForms.EKD, LegalForms.LEKD]} {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI fieldInfoKeys={fieldInfoKeysF004} {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI fieldInfoKeys={fieldInfoKeysF005} {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} showIsBank insurerLabelKey={'CR_GL_BANK_COMPANY_L'} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F010_RepresentativesFieldUI fieldInfoKeys={fieldInfoKeysF010} {...this.bind(m => m.fields.representatives)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <SectionInfoUI infoTextKey={infoTextKeys3} />
            <F012b_AdministrativeBoardFieldUI {...this.bind(m => m.fields.administrativeBoard)} />
            <F012v_AdministrativeBoardSupportersFieldUI {...this.bind(m => m.fields.administrativeBoardSupporters)} />
            <SectionInfoUI infoTextKey={infoTextKeys4} />
            <F012a_BoardOfManagers3FieldUI {...this.bind(m => m.fields.boardOfManagers3)} />
            <F013v_BoardOfManagersSupporters2FieldUI {...this.bind(m => m.fields.boardOfManagersSupporters2)} />
            <SectionInfoUI infoTextKey={infoTextKeys5} />
            <F014b_SupervisingBoard2FieldUI {...this.bind(m => m.fields.supervisingBoard2)} />
            <F014v_SupervisingBoardSupportersFieldUI {...this.bind(m => m.fields.supervisingBoardSupporters)} />
            <F016_TermsOfPartnershipFieldUI showTermType={true} fieldInfoKeys={fieldInfoKeysF016} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <F027a_AddemptionOfTraderSeatChangeFieldUI fieldInfoKeys={fieldInfoKeysF027a} {...this.bind(m => m.fields.addemptionOfTraderSeatChange)} />
            <SectionTitleUI titleKey={'CR_GL_ADDITIONAL_INFORMATION_L'} anchor="additionalInformation" />
            <SectionInfoUI infoTextKey={infoTextKeys6} />
            <F070a_WayOfEstablishingEuropeanCooperativeSocietyFieldUI {...this.bind(m => m.fields.wayOfEstablishingEuropeanCooperativeSociety)} />
            <F071_SeatChangeFieldUI fieldInfoKeys={fieldInfoKeysF071} {...this.bind(m => m.fields.seatChange)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={infoTextKeys7} />
                    : <SectionInfoUI infoTextKey={infoTextKeys8} />
            }
            <F031b_MinimumAmountFieldUI {...this.bind(m => m.fields.minimumAmount)} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} hasRadioButtonsCurrency={true} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            <F025_SharePaymentResponsibilityFieldUI {...this.bind(m => m.fields.sharePaymentResponsibility)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A13} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI showIsInsurer insurerLabelKey={'CR_GL_INSURANCE_COOPERATIVE_L'} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F010_RepresentativesFieldUI {...this.bind(m => m.fields.representatives)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012b_AdministrativeBoardFieldUI {...this.bind(m => m.fields.administrativeBoard)} />
            <F012v_AdministrativeBoardSupportersFieldUI {...this.bind(m => m.fields.administrativeBoardSupporters)} />
            <F012a_BoardOfManagers3FieldUI {...this.bind(m => m.fields.boardOfManagers3)} />
            <F013v_BoardOfManagersSupporters2FieldUI {...this.bind(m => m.fields.boardOfManagersSupporters2)} />
            <F014b_SupervisingBoard2FieldUI {...this.bind(m => m.fields.supervisingBoard2)} />
            <F014v_SupervisingBoardSupportersFieldUI {...this.bind(m => m.fields.supervisingBoardSupporters)} />
            <F016_TermsOfPartnershipFieldUI showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F027_AddemptionOfTraderFieldUI {...this.bind(m => m.fields.addemptionOfTrader)} />
            <F027a_AddemptionOfTraderSeatChangeFieldUI {...this.bind(m => m.fields.addemptionOfTraderSeatChange)} />
            <SectionTitleUI titleKey={'CR_GL_ADDITIONAL_INFORMATION_L'} anchor="additionalInformation" isForPreview={true} />
            <F070a_WayOfEstablishingEuropeanCooperativeSocietyFieldUI {...this.bind(m => m.fields.wayOfEstablishingEuropeanCooperativeSociety)} />
            <F071_SeatChangeFieldUI {...this.bind(m => m.fields.seatChange)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" isForPreview={true} />
            <F031b_MinimumAmountFieldUI {...this.bind(m => m.fields.minimumAmount)} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} hasRadioButtonsCurrency={true} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            <F025_SharePaymentResponsibilityFieldUI {...this.bind(m => m.fields.sharePaymentResponsibility)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A13UI = withApplicationFormContext(A13UIImpl);