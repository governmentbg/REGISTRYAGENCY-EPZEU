import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, F001_UICUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { F002_CompanyFieldUI, F003_LegalFormFieldUI, F004_TransliterationFieldRecordUI } from "EPZEU.CR.Domain.Applications";
import * as React from "react";
import { A4 } from '../../Models/ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceFieldUI } from "../Fields/F005a_SeatForCorrespondenceUI";
import { F005_SeatFieldUI } from '../Fields/F005_SeatUI';
import { F006a_SubjectOfActivityNKIDFieldUI } from '../Fields/F006a_SubjectOfActivityNKIDUI';
import { F006_SubjectOfActivityFieldUI } from '../Fields/F006_SubjectOfActivityUI';
import { F007_ManagersFieldUI } from '../Fields/F007_ManagersUI';
import { F011_WayOfRepresentationFieldUI } from "../Fields/F011_WayOfRepresentationUI";
import { F016_TermsOfPartnershipFieldUI } from '../Fields/F016_TermsOfPartnershipUI';
import { F017_SpecialConditionsFieldUI } from '../Fields/F017_SpecialConditionsUI';
import { F019_PartnersFieldUI } from '../Fields/F019_PartnersUI';
import { F023_SoleCapitalOwnerFieldUI } from '../Fields/F023_SoleCapitalOwnerUI';
import { F024_ShareTransfersFieldUI } from '../Fields/F024_ShareTransfersUI';
import { F027_AddemptionOfTraderFieldUI } from '../Fields/F027_AddemptionOfTraderUI';
import { F031_FundsFieldUI } from '../Fields/F031_FundsUI';
import { F032_DepositedFundsFieldUI } from '../Fields/F032_DepositedFundsUI';
import { F033_NonMonetaryDepositFieldUI } from '../Fields/F033_NonMonetaryDepositsUI';

interface A4UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF002 = ['CR_APP_00012_I'];
const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const fieldInfoKeysF005 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF006 = ['CR_APP_00031_I'];
const fieldInfoKeysF006a = ['CR_APP_00217_I'];
const fieldInfoKeysF007 = ['CR_APP_00004_I'];
const fieldInfoKeysF011 = ['CR_APP_00229_I'];
const fieldInfoKeysF016 = ['CR_APP_00042_I'];
const fieldInfoKeysF019 = ['CR_APP_00047_I'];
const fieldInfoKeysF023 = ['CR_APP_00044_I'];
const fieldInfoKeysF024 = ['CR_APP_00048_I'];
const fieldInfoKeysF027 = ['CR_APP_00045_I'];
const textInfoKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I', 'CR_APP_00129_I'];
const textInfoKeys2 = ['CR_APP_00129_I'];
const textInfoKeys3 = ['CR_APP_00027_I', 'CR_APP_00029_I'];
const textInfoKeys4 = ['CR_APP_00034_I'];

class A4UIImpl extends EPZEUBaseComponent<A4UIProps, A4> {

    renderEdit(): JSX.Element {
        //TODO Motovski - this.props.applicationManager.processContext.processState - в момента processState е undefined трябва да има стойност за да се различават различните
        //стейтове на заявлението - ново, за промяна на обстоятелства и за пререгистрация за А1, А2, А3, Б1, Б2, В1)
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A4} />
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
            <F007_ManagersFieldUI fieldInfoKeys={fieldInfoKeysF007}  {...this.bind(m => m.fields.managers)} />
            <F011_WayOfRepresentationFieldUI fieldInfoKeys={fieldInfoKeysF011} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F016_TermsOfPartnershipFieldUI fieldInfoKeys={fieldInfoKeysF016} showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} showConsortium={true} showHolding={true} />
            <F019_PartnersFieldUI fieldInfoKeys={fieldInfoKeysF019} {...this.bind(m => m.fields.partners)} />
            <F023_SoleCapitalOwnerFieldUI fieldInfoKeys={fieldInfoKeysF023} {...this.bind(m => m.fields.soleCapitalOwner)} />
            <F024_ShareTransfersFieldUI fieldInfoKeys={fieldInfoKeysF024} {...this.bind(m => m.fields.shareTransfers)} />
            <F027_AddemptionOfTraderFieldUI fieldInfoKeys={fieldInfoKeysF027} {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={textInfoKeys3} /> : null}
            <SectionInfoUI infoTextKey={textInfoKeys4} />
            <F031_FundsFieldUI {...this.bind(m => m.fields.funds)} isMandatoryField={true} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.A4} />
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
            <F007_ManagersFieldUI {...this.bind(m => m.fields.managers)} />
            <F011_WayOfRepresentationFieldUI {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F016_TermsOfPartnershipFieldUI showTermType={true} {...this.bind(m => m.fields.termsOfPartnership)} />
            <F017_SpecialConditionsFieldUI {...this.bind(m => m.fields.specialConditions)} />
            <F019_PartnersFieldUI {...this.bind(m => m.fields.partners)} />
            <F023_SoleCapitalOwnerFieldUI {...this.bind(m => m.fields.soleCapitalOwner)} />
            <F024_ShareTransfersFieldUI {...this.bind(m => m.fields.shareTransfers)} />
            <F027_AddemptionOfTraderFieldUI {...this.bind(m => m.fields.addemptionOfTrader)} />
            <SectionTitleUI titleKey={'CR_GL_FUND_L'} anchor="fund" isForPreview={true} />
            <F031_FundsFieldUI {...this.bind(m => m.fields.funds)} />
            <F032_DepositedFundsFieldUI {...this.bind(m => m.fields.depositedFunds)} />
            <F033_NonMonetaryDepositFieldUI {...this.bind(m => m.fields.nonMonetaryDeposits)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const A4UI = withApplicationFormContext(A4UIImpl);