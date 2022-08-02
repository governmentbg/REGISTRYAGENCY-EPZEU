import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A7 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from "../Fields/F005_SeatUI";
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006_SubjectOfActivityFieldUI } from "../Fields/F006_SubjectOfActivityUI";
import { F009_ChairManFieldUI } from "../Fields/F009_ChairMan";
import { F013a_BoardOfManagersSupportersFieldUI } from '../Fields/F013a_BoardOfManagersSupportersUI';
import { F013_BoardOfManagersFieldUI } from '../Fields/F013_BoardOfManagersUI';
import { F015a_ControllingBoardSupportersFieldUI } from '../Fields/F015a_ControllingBoardSupportersUI';
import { F015_ControllingBoardFieldUI } from '../Fields/F015_ControllingBoardUI';
import { F025_SharePaymentResponsibilityFieldUI } from '../Fields/F025_SharePaymentResponsibilityUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';

interface A7UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF009 = ['CR_APP_00085_I'];
const fieldInfoKeysF013 = ['CR_APP_00087_I'];
const fieldInfoKeysF013а = ['CR_APP_00088_I'];
const fieldInfoKeysF015а = ['CR_APP_00090_I'];
const fieldInfoKeysF025 = ['CR_APP_00091_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class A7UIImpl extends EPZEUBaseComponent<A7UIProps, A7> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A7} />
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
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} showIsInsurer insurerLabelKey={'CR_GL_INSURANCE_COOPERATIVE_L'} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F009_ChairManFieldUI fieldInfoKeys={fieldInfoKeysF009} {...this.bind(m => m.fields.chairMan)} />
            <F013_BoardOfManagersFieldUI fieldInfoKeys={fieldInfoKeysF013} {...this.bind(m => m.fields.boardOfManagers)} isMandatoryField />
            <F013a_BoardOfManagersSupportersFieldUI fieldInfoKeys={fieldInfoKeysF013а} {...this.bind(m => m.fields.boardOfManagersSupporters)} />
            <F015_ControllingBoardFieldUI isMandatoryField {...this.bind(m => m.fields.controllingBoard)} />
            <F015a_ControllingBoardSupportersFieldUI fieldInfoKeys={fieldInfoKeysF015а} {...this.bind(m => m.fields.controllingBoardSupporters)} />
            <F025_SharePaymentResponsibilityFieldUI fieldInfoKeys={fieldInfoKeysF025} {...this.bind(m => m.fields.sharePaymentResponsibility)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A7} />
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
            <F009_ChairManFieldUI {...this.bind(m => m.fields.chairMan)} />
            <F013_BoardOfManagersFieldUI {...this.bind(m => m.fields.boardOfManagers)} />
            <F013a_BoardOfManagersSupportersFieldUI {...this.bind(m => m.fields.boardOfManagersSupporters)} />
            <F015_ControllingBoardFieldUI {...this.bind(m => m.fields.controllingBoard)} />
            <F015a_ControllingBoardSupportersFieldUI {...this.bind(m => m.fields.controllingBoardSupporters)} />
            <F025_SharePaymentResponsibilityFieldUI {...this.bind(m => m.fields.sharePaymentResponsibility)} />
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

export const A7UI = withApplicationFormContext(A7UIImpl);