import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from "EPZEU.CR.Domain.Applications";
import * as React from "react";
import { A2 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F006a_SubjectOfActivityNKIDFieldUI } from '../Fields/F006a_SubjectOfActivityNKIDUI';
import { F006_SubjectOfActivityFieldUI } from '../Fields/F006_SubjectOfActivityUI';
import { F007a_AssignedManagersFieldUI } from '../Fields/F007a_AssignedManagersUI';
import { F008_WayOfManagementFieldUI } from '../Fields/F008_WayOfManagementUI';
import { F0101_Representatives101FieldUI } from '../Fields/F0101_Representatives101UI';
import { F011_WayOfRepresentationFieldUI } from "../Fields/F011_WayOfRepresentationUI";
import { F016_TermsOfPartnershipFieldUI } from '../Fields/F016_TermsOfPartnershipUI';
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F020_UnlimitedLiabilityPartnersFieldUI } from '../Fields/F020_UnlimitedLiabilityPartnersUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';

interface A2UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF007a = ['CR_APP_00075_I'];
const fieldInfoKeysF008 = ['CR_APP_00231_I'];
const fieldInfoKeysF0101 = ['CR_APP_00076_I'];
const fieldInfoKeysF011 = ['CR_APP_00228_I'];
const fieldInfoKeysF016 = ['CR_APP_00042_I'];
const fieldInfoKeysF020 = ['CR_APP_00077_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const textInfoKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const textInfoKeys2 = ['CR_APP_00129_I'];

class A2UIImpl extends EPZEUBaseComponent<A2UIProps, A2> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A2} />
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
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F007a_AssignedManagersFieldUI fieldInfoKeys={fieldInfoKeysF007a} {...this.bind(m => m.fields.assignedManagers)} />
            <F008_WayOfManagementFieldUI fieldInfoKeys={fieldInfoKeysF008} {...this.bind(m => m.fields.wayOfManagement)} />
            <F0101_Representatives101FieldUI fieldInfoKeys={fieldInfoKeysF0101} {...this.bind(m => m.fields.representatives101)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F016_TermsOfPartnershipFieldUI fieldInfoKeys={fieldInfoKeysF016} showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} showConsortium={true} showHolding={false} />
            <F020_UnlimitedLiabilityPartnersFieldUI fieldInfoKeys={fieldInfoKeysF020} {...this.bind(m => m.fields.unlimitedLiabilityPartners)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A2} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F007a_AssignedManagersFieldUI {...this.bind(m => m.fields.assignedManagers)} />
            <F008_WayOfManagementFieldUI {...this.bind(m => m.fields.wayOfManagement)} />
            <F0101_Representatives101FieldUI {...this.bind(m => m.fields.representatives101)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F016_TermsOfPartnershipFieldUI showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F020_UnlimitedLiabilityPartnersFieldUI {...this.bind(m => m.fields.unlimitedLiabilityPartners)} />
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

export const A2UI = withApplicationFormContext(A2UIImpl);