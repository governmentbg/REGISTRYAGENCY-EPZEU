import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, DomainModelHepler, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from 'EPZEU.CR.Domain.Applications';
import * as React from "react";
import { A10 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from '../Fields/F005a_SeatForCorrespondenceUI';
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F006a_SubjectOfActivityNKIDFieldUI } from '../Fields/F006a_SubjectOfActivityNKIDUI';
import { F006_SubjectOfActivityFieldUI } from '../Fields/F006_SubjectOfActivityUI';
import { F007_ManagersFieldUI } from '../Fields/F007_ManagersUI';
import { F008_WayOfManagementFieldUI } from '../Fields/F008_WayOfManagementUI';
import { F011_WayOfRepresentationFieldUI } from '../Fields/F011_WayOfRepresentationUI';
import { F016b_TermOfExistingEUIEFieldUI } from '../Fields/F016b_TermOfExistingEUIEUI';
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F020a_UnlimitedLiabilityPartnersEUIEFieldUI } from '../Fields/F020a_UnlimitedLiabilityPartnersEUIEUI';
import { F027a_AddemptionOfTraderSeatChangeFieldUI } from '../Fields/F027a_AddemptionOfTraderSeatChangeUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';
import { F060_DivisionsOfEuropeanUnificationFieldUI } from '../Fields/F060_DivisionsOfEuropeanUnificationUI';
import { F071_SeatChangeFieldUI } from '../Fields/F071_SeatChangeUI';

interface A10UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00013_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF005а = ['CR_APP_00020_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF007 = ['CR_APP_00040_I'];
const fieldInfoKeysF008 = ['CR_APP_00231_I'];
const fieldInfoKeysF011 = ['CR_APP_00229_I'];
const fieldInfoKeysF016b = ['CR_APP_00025_I'];
const fieldInfoKeysF017 = ['CR_APP_00092_I'];
const fieldInfoKeysF020a = ['CR_APP_00093_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const fieldInfoKeysF027a = ['CR_APP_00094_I'];
const fieldInfoKeysF071 = ['CR_APP_00098_I'];
const fieldInfoKeysF060 = ['CR_APP_00095_I', 'CR_APP_00096_I', 'CR_APP_00097_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const infoTextKeys2 = ['CR_APP_00129_I'];

class A10UIImpl extends EPZEUBaseComponent<A10UIProps, A10> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A10} />
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
            <F005a_SeatForCorrespondenceFieldUI fieldInfoKeys={fieldInfoKeysF005а} {...this.bind(m => m.fields.seatForCorrespondence)} />
            <F006_SubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF006} {...this.bind(m => m.fields.subjectOfActivity)} />
            <F006a_SubjectOfActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF006a} {...this.bind(m => m.fields.subjectOfActivityNKID)} />
            <F007_ManagersFieldUI fieldInfoKeys={fieldInfoKeysF007}  {...this.bind(m => m.fields.managers)} />
            <F008_WayOfManagementFieldUI fieldInfoKeys={fieldInfoKeysF008} {...this.bind(m => m.fields.wayOfManagement)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F016b_TermOfExistingEUIEFieldUI fieldInfoKeys={fieldInfoKeysF016b}  {...this.bind(m => m.fields.termOfExistingEUIE)} />
            <F017_SpecialConditionsFieldUI fieldInfoKeys={fieldInfoKeysF017} showConsortium  {...this.bind(m => m.fields.specialConditions)} />
            <F020a_UnlimitedLiabilityPartnersEUIEFieldUI isMandatoryField fieldInfoKeys={fieldInfoKeysF020a}  {...this.bind(m => m.fields.unlimitedLiabilityPartnersEUIE)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <F027a_AddemptionOfTraderSeatChangeFieldUI fieldInfoKeys={fieldInfoKeysF027a} {...this.bind(m => m.fields.addemptionOfTraderSeatChange)} showCountrySectionHeader />
            <SectionTitleUI titleKey={'CR_GL_ADDITIONAL_INFORMATION_L'} anchor="additionalInformation" />
            <F071_SeatChangeFieldUI fieldInfoKeys={fieldInfoKeysF071} {...this.bind(m => m.fields.seatChange)} />
            <SectionTitleUI titleKey={'CR_GL_DEPAR_L'} anchor="depar" />
            <F060_DivisionsOfEuropeanUnificationFieldUI fieldInfoKeys={fieldInfoKeysF060}  {...this.bind(m => m.fields.divisionsOfEuropeanUnification)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A10} />
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
            <F007_ManagersFieldUI  {...this.bind(m => m.fields.managers)} />
            <F008_WayOfManagementFieldUI  {...this.bind(m => m.fields.wayOfManagement)} />
            <F011_WayOfRepresentationFieldUI  {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F016b_TermOfExistingEUIEFieldUI  {...this.bind(m => m.fields.termOfExistingEUIE)} />
            <F017_SpecialConditionsFieldUI showConsortium  {...this.bind(m => m.fields.specialConditions)} />
            <F020a_UnlimitedLiabilityPartnersEUIEFieldUI  {...this.bind(m => m.fields.unlimitedLiabilityPartnersEUIE)} />
            <F027_AddemptionOfTraderFieldUI  {...this.bind(m => m.fields.addemptionOfTrader)} />
            <F027a_AddemptionOfTraderSeatChangeFieldUI  {...this.bind(m => m.fields.addemptionOfTraderSeatChange)} />
            {!DomainModelHepler.isObjectEmpty(this.model.fields.seatChange) ? <SectionTitleUI titleKey={'CR_GL_ADDITIONAL_INFORMATION_L'} anchor="additionalInformation" isForPreview={true} /> : null}
            <F071_SeatChangeFieldUI  {...this.bind(m => m.fields.seatChange)} />
            <SectionTitleUI titleKey={'CR_GL_DEPAR_L'} anchor="depar" isForPreview={true} />
            <F060_DivisionsOfEuropeanUnificationFieldUI  {...this.bind(m => m.fields.divisionsOfEuropeanUnification)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A10UI = withApplicationFormContext(A10UIImpl);