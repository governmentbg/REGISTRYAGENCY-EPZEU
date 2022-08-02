import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A11 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from '../Fields/F005a_SeatForCorrespondenceUI';
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F0223_EuropeanEconomicInterestGroupingFieldUI } from '../Fields/F0223_EuropeanEconomicInterestGroupingUI';
import { F0224_DiscontinuanceOfTheEUIEFieldUI } from '../Fields/F0224_DiscontinuanceOfTheEUIEUI';
import { F0225_InsolvenciesOfEUIEFieldUI } from '../Fields/F0225_InsolvenciesOfEUIEUI';
import { F028a_AddemptionOfEUIEFieldUI } from '../Fields/F028a_AddemptionOfEUIEUI';

interface A11UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00014_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF005а = ['CR_APP_00020_I'];
const fieldInfoKeysF0223 = ['CR_APP_00099_I'];
const fieldInfoKeysF0224 = ['CR_APP_00100_I'];
const fieldInfoKeysF0225 = ['CR_APP_00101_I'];
const fieldInfoKeysF028a = ['CR_APP_00102_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class A11UIImpl extends EPZEUBaseComponent<A11UIProps, A11> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A11} />
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
            <F005a_SeatForCorrespondenceFieldUI fieldInfoKeys={fieldInfoKeysF005а} {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F0223_EuropeanEconomicInterestGroupingFieldUI fieldInfoKeys={fieldInfoKeysF0223} {...this.bind(m => m.fields.europeanEconomicInterestGrouping)} />
            <F0224_DiscontinuanceOfTheEUIEFieldUI fieldInfoKeys={fieldInfoKeysF0224} {...this.bind(m => m.fields.discontinuanceOfTheEUIE)} />
            <F0225_InsolvenciesOfEUIEFieldUI fieldInfoKeys={fieldInfoKeysF0225} {...this.bind(m => m.fields.insolvenciesOfEUIE)} />
            <F028a_AddemptionOfEUIEFieldUI fieldInfoKeys={fieldInfoKeysF028a} {...this.bind(m => m.fields.addemptionOfEUIE)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A11} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F001_UICUI {...this.bind(m => m.fields.uic)} />
            <F002_CompanyFieldUI {...this.bind(m => m.fields.company)} />
            <F003_LegalFormFieldUI {...this.bind(m => m.fields.legalForm)} />
            <F004_TransliterationFieldRecordUI {...this.bind(m => m.fields.transliteration)} />
            <F005_SeatFieldUI {...this.bind(m => m.fields.seat)} />
            <F005a_SeatForCorrespondenceFieldUI {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F0223_EuropeanEconomicInterestGroupingFieldUI {...this.bind(m => m.fields.europeanEconomicInterestGrouping)} />
            <F0224_DiscontinuanceOfTheEUIEFieldUI {...this.bind(m => m.fields.discontinuanceOfTheEUIE)} />
            <F0225_InsolvenciesOfEUIEFieldUI {...this.bind(m => m.fields.insolvenciesOfEUIE)} />
            <F028a_AddemptionOfEUIEFieldUI {...this.bind(m => m.fields.addemptionOfEUIE)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A11UI = withApplicationFormContext(A11UIImpl);