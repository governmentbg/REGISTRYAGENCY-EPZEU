import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from "EPZEU.CR.Domain.Applications";
import * as React from "react";
import { A5 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from "../Fields/F005_SeatUI";
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006_SubjectOfActivityFieldUI } from "../Fields/F006_SubjectOfActivityUI";
import { F010_RepresentativesFieldUI } from "../Fields/F010_RepresentativesUI";
import { F011_WayOfRepresentationFieldUI } from "../Fields/F011_WayOfRepresentationUI";
import { F012_BoardOfDirectorsFieldUI } from "../Fields/F012_BoardOfDirectorsUI";
import { F013_BoardOfManagers2FieldUI } from "../Fields/F013_BoardOfManagers2UI";
import { F014_SupervisingBoardFieldUI } from "../Fields/F014_SupervisingBoardUI";
import { F016_TermsOfPartnershipFieldUI } from "../Fields/F016_TermsOfPartnershipUI";
import { F017_SpecialConditionsFieldUI } from "../Fields/F017_SpecialConditionsUI";
import { F023b_EuropeanHoldingCompanysAsShareholdersFieldUI } from "../Fields/F023b_EuropeanHoldingCompanysAsShareholdersUI";
import { F023_SoleCapitalOwnerFieldUI } from "../Fields/F023_SoleCapitalOwnerUI";
import { F024a_HiddenNonMonetaryDepositFieldUI } from "../Fields/F024a_HiddenNonMonetaryDepositUI";
import { F027_AddemptionOfTraderFieldUI } from "../Fields/F027_AddemptionOfTraderUI";
import { F0310a_SharesFieldUI } from "../Fields/F031a_SharesUI";
import { F031_FundsFieldUI } from "../Fields/F031_FundsUI";
import { F032_DepositedFundsFieldUI } from "../Fields/F032_DepositedFundsUI";
import { F033_NonMonetaryDepositFieldUI } from "../Fields/F033_NonMonetaryDepositsUI";
import { F034_BuyBackDecisionFieldUI } from "../Fields/F034_BuyBackDecisionUI";

interface A5UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF0010 = ['CR_APP_00079_I'];
const fieldInfoKeysF011 = ['CR_APP_00228_I'];
const fieldInfoKeysF012 = ['CR_APP_00080_I'];
const fieldInfoKeysF013 = ['CR_APP_00082_I'];
const fieldInfoKeysF014 = ['CR_APP_00082_I'];
const fieldInfoKeysF016 = ['CR_APP_00042_I'];
const fieldInfoKeysF023 = ['CR_APP_00083_I'];
const fieldInfoKeysF023b = ['CR_APP_00103_I'];
const fieldInfoKeysF024 = ['CR_APP_00084_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const fieldInfoKeysF031 = ['CR_APP_00041_I'];
const fieldInfoKeysF0310a = ['CR_APP_00002_I'];
const fieldInfoKeysF034 = ['CR_APP_00043_I'];
const textInfoKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const textInfoKeys2 = ['CR_APP_00129_I'];
const textInfoKeys3 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00036_I'];
const textInfoKeys4 = ['CR_APP_00036_I'];

class A5UIImpl extends EPZEUBaseComponent<A5UIProps, A5> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A5} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={textInfoKeys1} />
                    : <SectionInfoUI infoTextKey={textInfoKeys2} />
            }
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI fieldInfoKeys={fieldInfoKeysF002} {...this.bind(m => m.fields.company)} />
            <F004_TransliterationFieldRecordUI fieldInfoKeys={fieldInfoKeysF004} {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI fieldInfoKeys={fieldInfoKeysF005} {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} showIsBank showIsInsurer {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F010_RepresentativesFieldUI fieldInfoKeys={fieldInfoKeysF0010}  {...this.bind(m => m.fields.representatives)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012_BoardOfDirectorsFieldUI fieldInfoKeys={fieldInfoKeysF012} showDirectorsList={true} {...this.bind(m => m.fields.boardOfDirectors)} />
            <F013_BoardOfManagers2FieldUI fieldInfoKeys={fieldInfoKeysF013} {...this.bind(m => m.fields.boardOfManagers2)} />
            <F014_SupervisingBoardFieldUI fieldInfoKeys={fieldInfoKeysF014} {...this.bind(m => m.fields.supervisingBoard)} />
            <F016_TermsOfPartnershipFieldUI fieldInfoKeys={fieldInfoKeysF016} showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI showConsortium showHolding {...this.bind(m => m.fields.specialConditions)} />
            <F023_SoleCapitalOwnerFieldUI fieldInfoKeys={fieldInfoKeysF023} {...this.bind(m => m.fields.soleCapitalOwner)} />
            <F023b_EuropeanHoldingCompanysAsShareholdersFieldUI fieldInfoKeys={fieldInfoKeysF023b} {...this.bind(m => m.fields.europeanHoldingCompanysAsShareholders)} />
            <F024a_HiddenNonMonetaryDepositFieldUI fieldInfoKeys={fieldInfoKeysF024} {...this.bind(m => m.fields.hiddenNonMonetaryDeposit)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" />
            {this.props.applicationManager.processState == ProcessStates.ForChange
                ? <SectionInfoUI infoTextKey={textInfoKeys3} />
                : <SectionInfoUI infoTextKey={textInfoKeys4} />}
            <F031_FundsFieldUI fieldInfoKeys={fieldInfoKeysF031} {...this.bind(m => m.fields.funds)} isMandatoryField={true} />
            <F0310a_SharesFieldUI fieldInfoKeys={fieldInfoKeysF0310a} isMandatoryField {...this.bind(m => m.fields.shares)} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            <F034_BuyBackDecisionFieldUI fieldInfoKeys={fieldInfoKeysF034} {...this.bind(m => m.fields.buyBackDecision)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A5} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances_1" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI showIsBank showIsInsurer {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F010_RepresentativesFieldUI {...this.bind(m => m.fields.representatives)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012_BoardOfDirectorsFieldUI showDirectorsList={true} {...this.bind(m => m.fields.boardOfDirectors)} />
            <F013_BoardOfManagers2FieldUI {...this.bind(m => m.fields.boardOfManagers2)} />
            <F014_SupervisingBoardFieldUI {...this.bind(m => m.fields.supervisingBoard)} />
            <F016_TermsOfPartnershipFieldUI showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F023_SoleCapitalOwnerFieldUI {...this.bind(m => m.fields.soleCapitalOwner)} />
            <F023b_EuropeanHoldingCompanysAsShareholdersFieldUI {...this.bind(m => m.fields.europeanHoldingCompanysAsShareholders)} />
            <F024a_HiddenNonMonetaryDepositFieldUI {...this.bind(m => m.fields.hiddenNonMonetaryDeposit)} />
            <F027_AddemptionOfTraderFieldUI {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" isForPreview={true} />
            <F031_FundsFieldUI {...this.bind(m => m.fields.funds)} />
            <F0310a_SharesFieldUI {...this.bind(m => m.fields.shares)} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} />
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

export const A5UI = withApplicationFormContext(A5UIImpl);