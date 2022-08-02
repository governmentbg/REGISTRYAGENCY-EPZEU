import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from "EPZEU.CR.Domain.Applications";
import * as React from "react";
import { A18 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006b_ObjectivesFieldUI } from "../Fields/F006b_ObjectivesUI";
import { F006g_SubjectToAdditionalBusinessActivityFieldUI } from "../Fields/F006g_SubjectToAdditionalBusinessActivityUI";
import { F006v_MeansOfAchievingTheObjectivesFieldUI } from "../Fields/F006v_MeansOfAchievingTheObjectivesUI";
import { F0103_Representatives103FieldUI } from "../Fields/F0103_Representatives103UI";
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F017a_DesignatedToPerformPublicBenefitFieldUI } from "../Fields/F017a_DesignatedToPerformPublicBenefitUI";
import { F017g_DesignatedToCarryOutPrivateActivityFieldUI } from "../Fields/F017g_DesignatedToCarryOutPrivateActivityUI";
import { F017v_RestorationOfStatusInPublicBenefitFieldUI } from "../Fields/F017v_RestorationOfStatusInPublicBenefitUI";
import { F022a_DiscontinuanceOfForeignTraderFieldUI } from "../Fields/F022a_DiscontinuanceOfForeignTraderUI";
import { F022b_InsolvenciesOfForeignTraderFieldUI } from "../Fields/F022b_InsolvenciesOfForeignTraderUI";
import { F022_ForeignTradersFieldUI } from "../Fields/F022_ForeignTradersUI";
import { F028_ClosureBranchOfForeignTraderFieldUI } from "../Fields/F028_ClosureBranchOfForeignTraderUI";
import { F054a_VolumeOfRepresentationPower541FieldUI } from "../Fields/F054a_VolumeOfRepresentationPower541UI";

interface A18UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00011_I'];
const fieldInfoKeysF004 = ['CR_APP_00201_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006b = ['CR_APP_00180_I'];
const fieldInfoKeysF006g = ['CR_APP_00203_I'];
const fieldInfoKeysF006a = ['CR_APP_00202_I'];
const fieldInfoKeysF0103 = ['CR_APP_REPRESENTATIVES_I'];
const fieldInfoKeysF011 = ['CR_APP_00230_I'];
const fieldInfoKeysF054a = ['CR_APP_00204_I'];
const fieldInfoKeysF022a = ['CR_APP_00206_I'];
const fieldInfoKeysF028 = ['CR_APP_00052_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];
const infoTextKeys2 = ['CR_APP_00205_I'];
const designatedToPerformPublicBenefitPropname = ['designatedToPerformPublicBenefit'];

class A18UIImpl extends EPZEUBaseComponent<A18UIProps, A18> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A18} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={infoTextKeys1} />
                    : null
            }
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI fieldInfoKeys={fieldInfoKeysF002} {...this.bind(m => m.fields.company)} />
            <F004_TransliterationFieldRecordUI fieldInfoKeys={fieldInfoKeysF004} {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI fieldInfoKeys={fieldInfoKeysF005} {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006b_ObjectivesFieldUI showTextExt={true} {...this.bind(m => m.fields.objectives)} fieldInfoKeys={fieldInfoKeysF006b} />
            <F006v_MeansOfAchievingTheObjectivesFieldUI {...this.bind(m => m.fields.meansOfAchievingTheObjectives)} />
            <F006g_SubjectToAdditionalBusinessActivityFieldUI {...this.bind(m => m.fields.subjectToAdditionalBusinessActivity)} fieldInfoKeys={fieldInfoKeysF006g} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} fieldInfoKeys={fieldInfoKeysF006a} />
            <F0103_Representatives103FieldUI {...this.bind(m => m.fields.representatives103)} fieldInfoKeys={fieldInfoKeysF0103} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F054a_VolumeOfRepresentationPower541FieldUI isMandatoryField={false} {...this.bind(m => m.fields.volumeOfRepresentationPower)} fieldInfoKeys={fieldInfoKeysF054a} />
            <SectionInfoUI infoTextKey={infoTextKeys2} />
            <ValidationSummary {...this.bind(x => x.fields)} propNames={designatedToPerformPublicBenefitPropname} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            <F017a_DesignatedToPerformPublicBenefitFieldUI {...this.bind(m => m.fields.designatedToPerformPublicBenefit)} />
            <F017v_RestorationOfStatusInPublicBenefitFieldUI {...this.bind(m => m.fields.restorationOfStatusInPublicBenefit)} />
            <F017g_DesignatedToCarryOutPrivateActivityFieldUI {...this.bind(m => m.fields.designatedToCarryOutPrivateActivity)} />
            <F022_ForeignTradersFieldUI {...this.bind(m => m.fields.foreignTraders)} />
            <F022a_DiscontinuanceOfForeignTraderFieldUI {...this.bind(m => m.fields.discontinuanceOfForeignTrader)} fieldInfoKeys={fieldInfoKeysF022a} />
            <F022b_InsolvenciesOfForeignTraderFieldUI {...this.bind(m => m.fields.insolvenciesOfForeignTrader)} />
            <F028_ClosureBranchOfForeignTraderFieldUI {...this.bind(m => m.fields.closureBranchOfForeignTrader)} fieldInfoKeys={fieldInfoKeysF028} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A18} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006b_ObjectivesFieldUI showTextExt={true} {...this.bind(m => m.fields.objectives)} />
            <F006v_MeansOfAchievingTheObjectivesFieldUI {...this.bind(m => m.fields.meansOfAchievingTheObjectives)} />
            <F006g_SubjectToAdditionalBusinessActivityFieldUI {...this.bind(m => m.fields.subjectToAdditionalBusinessActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F0103_Representatives103FieldUI {...this.bind(m => m.fields.representatives103)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F054a_VolumeOfRepresentationPower541FieldUI {...this.bind(m => m.fields.volumeOfRepresentationPower)} />
            <ValidationSummary {...this.bind(x => x.fields)} propNames={designatedToPerformPublicBenefitPropname} strategy={ValidationSummaryStrategy.excludeAllExcept} viewMode={ViewMode.Display} />
            <F017a_DesignatedToPerformPublicBenefitFieldUI {...this.bind(m => m.fields.designatedToPerformPublicBenefit)} />
            <F017v_RestorationOfStatusInPublicBenefitFieldUI {...this.bind(m => m.fields.restorationOfStatusInPublicBenefit)} />
            <F017g_DesignatedToCarryOutPrivateActivityFieldUI {...this.bind(m => m.fields.designatedToCarryOutPrivateActivity)} />
            <F022_ForeignTradersFieldUI {...this.bind(m => m.fields.foreignTraders)} />
            <F022a_DiscontinuanceOfForeignTraderFieldUI {...this.bind(m => m.fields.discontinuanceOfForeignTrader)} />
            <F022b_InsolvenciesOfForeignTraderFieldUI {...this.bind(m => m.fields.insolvenciesOfForeignTrader)} />
            <F028_ClosureBranchOfForeignTraderFieldUI {...this.bind(m => m.fields.closureBranchOfForeignTrader)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A18UI = withApplicationFormContext(A18UIImpl);