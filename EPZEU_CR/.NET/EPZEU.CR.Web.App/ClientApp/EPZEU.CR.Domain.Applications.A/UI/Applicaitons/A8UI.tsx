import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A8 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from '../Fields/F005a_SeatForCorrespondenceUI';
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F006a_SubjectOfActivityNKIDFieldUI } from '../Fields/F006a_SubjectOfActivityNKIDUI';
import { F006_SubjectOfActivityFieldUI } from '../Fields/F006_SubjectOfActivityUI';
import { F0102_Representatives102FieldUI } from '../Fields/F0102_Representatives102UI';
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F022a_DiscontinuanceOfForeignTraderFieldUI } from '../Fields/F022a_DiscontinuanceOfForeignTraderUI';
import { F022b_InsolvenciesOfForeignTraderFieldUI } from '../Fields/F022b_InsolvenciesOfForeignTraderUI';
import { F022_ForeignTradersFieldUI } from '../Fields/F022_ForeignTradersUI';
import { F028_ClosureBranchOfForeignTraderFieldUI } from '../Fields/F028_ClosureBranchOfForeignTraderUI';
import { F054a_VolumeOfRepresentationPower541FieldUI } from '../Fields/F054a_VolumeOfRepresentationPower541UI';

interface A8UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF011 = ['CR_APP_00228_I'];
const fieldInfoKeysF054а = ['CR_APP_00105_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class A8UIImpl extends EPZEUBaseComponent<A8UIProps, A8> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A8} />
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
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F0102_Representatives102FieldUI {...this.bind(m => m.fields.representatives102)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F054a_VolumeOfRepresentationPower541FieldUI fieldInfoKeys={fieldInfoKeysF054а} {...this.bind(m => m.fields.volumeOfRepresentationPower541)} isMandatoryField />
            <F022_ForeignTradersFieldUI {...this.bind(m => m.fields.foreignTraders)} />
            <F022a_DiscontinuanceOfForeignTraderFieldUI {...this.bind(m => m.fields.discontinuanceOfForeignTrader)} />
            <F022b_InsolvenciesOfForeignTraderFieldUI {...this.bind(m => m.fields.insolvenciesOfForeignTrader)} />
            <F028_ClosureBranchOfForeignTraderFieldUI {...this.bind(m => m.fields.closureBranchOfForeignTrader)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A8} />
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
            <F0102_Representatives102FieldUI {...this.bind(m => m.fields.representatives102)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F022_ForeignTradersFieldUI {...this.bind(m => m.fields.foreignTraders)} />
            <F022a_DiscontinuanceOfForeignTraderFieldUI {...this.bind(m => m.fields.discontinuanceOfForeignTrader)} />
            <F022b_InsolvenciesOfForeignTraderFieldUI {...this.bind(m => m.fields.insolvenciesOfForeignTrader)} />
            <F028_ClosureBranchOfForeignTraderFieldUI {...this.bind(m => m.fields.closureBranchOfForeignTrader)} />
            <F054a_VolumeOfRepresentationPower541FieldUI {...this.bind(m => m.fields.volumeOfRepresentationPower541)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A8UI = withApplicationFormContext(A8UIImpl);