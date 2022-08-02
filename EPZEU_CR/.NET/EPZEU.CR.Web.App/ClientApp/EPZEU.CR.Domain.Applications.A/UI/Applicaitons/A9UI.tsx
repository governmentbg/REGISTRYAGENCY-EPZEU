import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes, LegalForms } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A9 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from "../Fields/F005_SeatUI";
import { F006a_SubjectOfActivityNKIDFieldUI } from "../Fields/F006a_SubjectOfActivityNKIDUI";
import { F006_SubjectOfActivityFieldUI } from "../Fields/F006_SubjectOfActivityUI";
import { F007_ManagersFieldUI } from '../Fields/F007_ManagersUI';
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F013_BoardOfManagersFieldUI } from '../Fields/F013_BoardOfManagersUI';
import { F015_ControllingBoardFieldUI } from '../Fields/F015_ControllingBoardUI';
import { F016a_TermOfExistingFieldUI } from '../Fields/F016a_TermOfExistingUI';
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F023a_OwnerFieldUI } from '../Fields/F023a_OwnerUI';
import { F025a_ConcededEstateValueFieldUI } from '../Fields/F025a_ConcededEstateValueUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';

interface A9UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF007 = ['CR_APP_00004_I'];
const fieldInfoKeysF011 = ['CR_APP_00229_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class A9UIImpl extends EPZEUBaseComponent<A9UIProps, A9> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A9} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" />
            {
                this.props.applicationManager.processState == ProcessStates.ForChange
                    ? <SectionInfoUI infoTextKey={infoTextKeys1} />
                    : null
            }
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI fieldInfoKeys={fieldInfoKeysF002} {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI possibleChoicesOfLegalForm={[LegalForms.TPPD, LegalForms.TPPO]} subTitleResourceKey={"GL_CR_TRADER_PUBLIC_ENTERPRISE_L"} {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI fieldInfoKeys={fieldInfoKeysF004} {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI fieldInfoKeys={fieldInfoKeysF005} {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F007_ManagersFieldUI fieldInfoKeys={fieldInfoKeysF007}  {...this.bind(m => m.fields.managers)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F013_BoardOfManagersFieldUI {...this.bind(m => m.fields.boardOfManagers)} />
            <F015_ControllingBoardFieldUI {...this.bind(m => m.fields.controllingBoard)} />
            <F016a_TermOfExistingFieldUI {...this.bind(m => m.fields.termOfExisting)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F023a_OwnerFieldUI isMandatoryField {...this.bind(m => m.fields.owner)} />
            <F025a_ConcededEstateValueFieldUI {...this.bind(m => m.fields.concededEstateValue)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A9} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI fieldInfoKeys={['CR_APP_00012_I']} {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F007_ManagersFieldUI {...this.bind(m => m.fields.managers)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F013_BoardOfManagersFieldUI {...this.bind(m => m.fields.boardOfManagers)} />
            <F015_ControllingBoardFieldUI {...this.bind(m => m.fields.controllingBoard)} />
            <F016a_TermOfExistingFieldUI {...this.bind(m => m.fields.termOfExisting)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F023a_OwnerFieldUI {...this.bind(m => m.fields.owner)} />
            <F025a_ConcededEstateValueFieldUI {...this.bind(m => m.fields.concededEstateValue)} />
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

export const A9UI = withApplicationFormContext(A9UIImpl);