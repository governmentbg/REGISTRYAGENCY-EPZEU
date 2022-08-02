import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from "EPZEU.CR.Domain.Applications";
import * as React from "react";
import { A16 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006b_ObjectivesFieldUI } from "../Fields/F006b_ObjectivesUI";
import { F006g_SubjectToAdditionalBusinessActivityFieldUI } from "../Fields/F006g_SubjectToAdditionalBusinessActivityUI";
import { F006v_MeansOfAchievingTheObjectivesFieldUI } from "../Fields/F006v_MeansOfAchievingTheObjectivesUI";
import { F0103_Representatives103FieldUI } from "../Fields/F0103_Representatives103UI";
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F012d_ManagementBodies12dFieldUI } from "../Fields/F012d_ManagementBodies12dUI";
import { F012g_Authorities12gFieldUI } from "../Fields/F012g_Authorities12gUI";
import { F016v_TermOfExistenceNonProfitLegalEntityFieldUI } from "../Fields/F016v_TermOfExistenceNonProfitLegalEntityUI";
import { F017a_DesignatedToPerformPublicBenefitFieldUI } from "../Fields/F017a_DesignatedToPerformPublicBenefitUI";
import { F017g_DesignatedToCarryOutPrivateActivityFieldUI } from "../Fields/F017g_DesignatedToCarryOutPrivateActivityUI";
import { F017v_RestorationOfStatusInPublicBenefitFieldUI } from "../Fields/F017v_RestorationOfStatusInPublicBenefitUI";
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F025b_TotalAmountOfInitialPropertyContributionsFieldUI } from "../Fields/F025b_TotalAmountOfInitialPropertyContributionsUI";
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';

interface A16UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00007_I'];
const fieldInfoKeysF004 = ['CR_APP_00192_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006b = ['CR_APP_00179_I'];
const fieldInfoKeysF006g = ['CR_APP_00184_I'];
const fieldInfoKeysF006a = ['CR_APP_00185_I'];
const fieldInfoKeysF0103 = ['CR_APP_REPRESENTATIVES_FONDATION_I'];
const fieldInfoKeysF011 = ['CR_APP_00230_I'];
const fieldInfoKeysF012g = ['CR_APP_00186_I'];
const fieldInfoKeysF012d = ['CR_APP_00187_I', 'CR_APP_00172_I'];
const fieldInfoKeysF017 = ['CR_APP_00188_I'];
const fieldInfoKeysF025b = ['CR_APP_00175_I'];
const fieldInfoKeysF027 = ['CR_APP_00190_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const infoTextKeys2 = ['CR_APP_00129_I'];
const infoTextKeys3 = ['CR_APP_00189_I'];
const designatedToPerformPublicBenefitPropname = ['designatedToPerformPublicBenefit'];

class A16UIImpl extends EPZEUBaseComponent<A16UIProps, A16> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A16} />
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
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006b_ObjectivesFieldUI {...this.bind(m => m.fields.objectives)} fieldInfoKeys={fieldInfoKeysF006b} />
            <F006v_MeansOfAchievingTheObjectivesFieldUI {...this.bind(m => m.fields.meansOfAchievingTheObjectives)} />
            <F006g_SubjectToAdditionalBusinessActivityFieldUI fieldInfoKeys={fieldInfoKeysF006g}  {...this.bind(m => m.fields.subjectToAdditionalBusinessActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} fieldInfoKeys={fieldInfoKeysF006a} />
            <F0103_Representatives103FieldUI {...this.bind(m => m.fields.representatives103)} fieldInfoKeys={fieldInfoKeysF0103} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012g_Authorities12gFieldUI {...this.bind(m => m.fields.authorities12g)} fieldInfoKeys={fieldInfoKeysF012g} />
            <F012d_ManagementBodies12dFieldUI {...this.bind(m => m.fields.managementBodies12d)} fieldInfoKeys={fieldInfoKeysF012d} />
            <F016v_TermOfExistenceNonProfitLegalEntityFieldUI {...this.bind(m => m.fields.termOfExistenceNonProfitLegalEntity)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} fieldInfoKeys={fieldInfoKeysF017} />
            <SectionInfoUI infoTextKey={infoTextKeys3} />
            <ValidationSummary {...this.bind(x => x.fields)} propNames={designatedToPerformPublicBenefitPropname} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            <F017a_DesignatedToPerformPublicBenefitFieldUI {...this.bind(m => m.fields.designatedToPerformPublicBenefit)} />
            <F017v_RestorationOfStatusInPublicBenefitFieldUI {...this.bind(m => m.fields.restorationOfStatusInPublicBenefit)} />
            <F017g_DesignatedToCarryOutPrivateActivityFieldUI {...this.bind(m => m.fields.designatedToCarryOutPrivateActivity)} />
            <F025b_TotalAmountOfInitialPropertyContributionsFieldUI {...this.bind(m => m.fields.totalAmountOfInitialPropertyContributions)} fieldInfoKeys={fieldInfoKeysF025b} />
            <F027_AddemptionOfTraderFieldUI {...this.bind(m => m.fields.addemptionOfTrader)} fieldInfoKeys={fieldInfoKeysF027} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A16} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006b_ObjectivesFieldUI {...this.bind(m => m.fields.objectives)} />
            <F006v_MeansOfAchievingTheObjectivesFieldUI {...this.bind(m => m.fields.meansOfAchievingTheObjectives)} />
            <F006g_SubjectToAdditionalBusinessActivityFieldUI {...this.bind(m => m.fields.subjectToAdditionalBusinessActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F0103_Representatives103FieldUI {...this.bind(m => m.fields.representatives103)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F012g_Authorities12gFieldUI {...this.bind(m => m.fields.authorities12g)} />
            <F012d_ManagementBodies12dFieldUI {...this.bind(m => m.fields.managementBodies12d)} />
            <F016v_TermOfExistenceNonProfitLegalEntityFieldUI {...this.bind(m => m.fields.termOfExistenceNonProfitLegalEntity)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F017a_DesignatedToPerformPublicBenefitFieldUI {...this.bind(m => m.fields.designatedToPerformPublicBenefit)} />
            <F017v_RestorationOfStatusInPublicBenefitFieldUI {...this.bind(m => m.fields.restorationOfStatusInPublicBenefit)} />
            <F017g_DesignatedToCarryOutPrivateActivityFieldUI {...this.bind(m => m.fields.designatedToCarryOutPrivateActivity)} />
            <ValidationSummary {...this.bind(x => x.fields)} propNames={designatedToPerformPublicBenefitPropname} strategy={ValidationSummaryStrategy.excludeAllExcept} viewMode={ViewMode.Display} />
            <F025b_TotalAmountOfInitialPropertyContributionsFieldUI {...this.bind(m => m.fields.totalAmountOfInitialPropertyContributions)} />
            <F027_AddemptionOfTraderFieldUI {...this.bind(m => m.fields.addemptionOfTrader)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A16UI = withApplicationFormContext(A16UIImpl);