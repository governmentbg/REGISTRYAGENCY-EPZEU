import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from "EPZEU.CR.Domain.Applications";
import * as React from "react";
import { A17 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F0103_Representatives103FieldUI } from "../Fields/F0103_Representatives103UI";
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F013g_BoardOfTrusties13gFieldUI } from "../Fields/F013g_BoardOfTrusties13gUI";
import { F015b_VerificationCommission15bFieldUI } from "../Fields/F015b_VerificationCommission15bUI";
import { F025v_SourcesOfInitialFinancing25vFieldUI } from "../Fields/F025v_SourcesOfInitialFinancing25vUI";
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';

interface A17UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00009_I'];
const fieldInfoKeysF004 = ['CR_APP_00193_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF0103 = ['CR_APP_REPRESENTATIVES_CHITALISHTE_I'];
const fieldInfoKeysF011 = ['CR_APP_00230_I'];
const fieldInfoKeysF013g = ['CR_APP_00194_I', 'CR_APP_00195_I'];
const fieldInfoKeysF015b = ['CR_APP_00198_I', 'CR_APP_00197_I'];
const fieldInfoKeysF025v = ['CR_APP_00199_I'];
const fieldInfoKeysF027 = ['CR_APP_00200_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class A17UIImpl extends EPZEUBaseComponent<A17UIProps, A17> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A17} />
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
            <F0103_Representatives103FieldUI {...this.bind(m => m.fields.representatives103)} fieldInfoKeys={fieldInfoKeysF0103} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F013g_BoardOfTrusties13gFieldUI {...this.bind(m => m.fields.boardOfTrusties13g)} fieldInfoKeys={fieldInfoKeysF013g} />
            <F015b_VerificationCommission15bFieldUI {...this.bind(m => m.fields.verificationCommission15b)} fieldInfoKeys={fieldInfoKeysF015b} />
            <F025v_SourcesOfInitialFinancing25vFieldUI {...this.bind(m => m.fields.sourcesOfInitialFinancing25v)} fieldInfoKeys={fieldInfoKeysF025v} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A17} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F0103_Representatives103FieldUI {...this.bind(m => m.fields.representatives103)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F013g_BoardOfTrusties13gFieldUI {...this.bind(m => m.fields.boardOfTrusties13g)} />
            <F015b_VerificationCommission15bFieldUI {...this.bind(m => m.fields.verificationCommission15b)} />
            <F025v_SourcesOfInitialFinancing25vFieldUI {...this.bind(m => m.fields.sourcesOfInitialFinancing25v)} />
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

export const A17UI = withApplicationFormContext(A17UIImpl);