import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, DomainModelHepler, ProcessStates, Record, RecordOperations, SectionInfoUI, SectionSubTitle, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from "mobx-react";
import * as React from "react";
import { B7 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F001b_NumberNationalRegister1bFieldUI } from "../Fields/F001b_NumberNationalRegister1bUI";
import { F529_ReasonForEntry529FieldUI } from "../Fields/F529_ReasonForEntry529UI";
import { F531_OffshoreCompanyFieldUI } from "../Fields/F531_OffshoreCompanyUI";
import { F532_OffshoreTransliterationFieldUI } from "../Fields/F532_OffshoreTransliterationUI";
import { F533_OffshoreSeatFieldUI } from "../Fields/F533_OffshoreSeatUI";
import { F534_OffshoreRepresentativesFieldUI } from "../Fields/F534_OffshoreRepresentativesUI";
import { F535_OffshoreWayOfRepresentationFieldUI } from "../Fields/F535_OffshoreWayOfRepresentationUI";
import { F536_OffshoreSpecialConditionsFieldUI } from "../Fields/F536_OffshoreSpecialConditionsUI";
import { F53702_OffshoreDirectControlCompanyLegalFormFieldUI } from '../Fields/F53702_OffshoreDirectControlCompanyLegalFormUI';
import { F53703_OffshoreDirectControlCompanyTransliterationFieldUI } from '../Fields/F53703_OffshoreDirectControlCompanyTransliterationUI';
import { F53704_OffshoreDirectControlCompanyNumberInRegisterFieldUI } from '../Fields/F53704_OffshoreDirectControlCompanyNumberInRegisterUI';
import { F53705_OffshoreDirectControlCompanyAddressFieldUI } from '../Fields/F53705_OffshoreDirectControlCompanyAddressUI';
import { F53707_OffshoreDirectControlCompanyWayOfRepresentationFieldUI } from '../Fields/F53707_OffshoreDirectControlCompanyWayOfRepresentationUI';
import { F5370_OffshoreDirectControlCompanyFieldUI } from '../Fields/F5370_OffshoreDirectControlCompanyUI';
import { F5371_OffshoreDirectControlCompanyRepresentativesFieldUI } from "../Fields/F5371_OffshoreDirectControlCompanyRepresentativesUI";
import { F53802_OffshoreNoDirectControlCompanyLegalFormFieldUI } from '../Fields/F53802_OffshoreNoDirectControlCompanyLegalFormUI';
import { F53803_OffshoreNoDirectControlCompanyTransliterationFieldUI } from '../Fields/F53803_OffshoreNoDirectControlCompanyTransliterationUI';
import { F53804_OffshoreNoDirectControlCompanyNumberInRegisterFieldUI } from '../Fields/F53804_OffshoreNoDirectControlCompanyNumberInRegisterUI';
import { F53805_OffshoreNoDirectControlCompanyAddressFieldUI } from '../Fields/F53805_OffshoreNoDirectControlCompanyAddressUI';
import { F53807_OffshoreNoDirectControlCompanyWayOfRepresentationFieldUI } from '../Fields/F53807_OffshoreNoDirectControlCompanyWayOfRepresentationUI';
import { F5380_OffshoreNoDirectControlCompanyFieldUI } from '../Fields/F5380_OffshoreNoDirectControlCompanyUI';
import { F5381_OffshoreNoDirectControlCompanyRepresentativesFieldUI } from '../Fields/F5381_OffshoreNoDirectControlCompanyRepresentativesUI';
import { F540_CircumstanceArticle4FieldUI } from '../Fields/F540_CircumstanceArticle4UI';
import { F550a_ContactPerson550aFieldUI } from '../Fields/F550a_ContactPerson550aUI';
import { F550_ActualOwnersFieldUI } from '../Fields/F550_ActualOwnersUI';
import { F551_EraseActualOwnerFieldUI } from '../Fields/F551_EraseActualOwnerUI';


interface B7UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF531 = ['CR_APP_00210_I'];
const fieldInfoKeysF532 = ['CR_APP_00211_I'];
const fieldInfoKeysF533 = ['CR_APP_00038_I', 'CR_APP_00032_I'];
const fieldInfoKeysF534 = ['CR_APP_00212_I'];
const fieldInfoKeysF535 = ['CR_APP_00213_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

@observer class B7UIImpl extends EPZEUBaseComponent<B7UIProps, B7> {

    constructor(props?: B7UIProps) {
        super(props);

        this.isOffshoreDirectControlCompanyDirty = this.isOffshoreDirectControlCompanyDirty.bind(this);
        this.isOffshoreNoDirectControlCompanyDirty = this.isOffshoreNoDirectControlCompanyDirty.bind(this);
    }

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B7} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <F529_ReasonForEntry529FieldUI {...this.bind(m => m.fields.reasonForEntry529)} />

            {this.model.fields.reasonForEntry529.article6 == true ?
                <F001b_NumberNationalRegister1bFieldUI {...this.bind(m => m.fields.numberNationalRegister1b)} />
                : null
            }

            {this.model.fields.reasonForEntry529.article6 == true ?
                <>
                    <F531_OffshoreCompanyFieldUI {...this.bind(m => m.fields.offshoreCompany)} fieldInfoKeys={fieldInfoKeysF531} />
                    <F532_OffshoreTransliterationFieldUI {...this.bind(m => m.fields.offshoreTransliteration)} fieldInfoKeys={fieldInfoKeysF532} />
                    <F533_OffshoreSeatFieldUI {...this.bind(m => m.fields.offshoreSeat)} fieldInfoKeys={fieldInfoKeysF533} />
                    <F534_OffshoreRepresentativesFieldUI {...this.bind(m => m.fields.offshoreRepresentatives)} fieldInfoKeys={fieldInfoKeysF534} />
                    <F535_OffshoreWayOfRepresentationFieldUI {...this.bind(m => m.fields.offshoreWayOfRepresentation)} fieldInfoKeys={fieldInfoKeysF535} />
                    <F536_OffshoreSpecialConditionsFieldUI {...this.bind(m => m.fields.offshoreSpecialConditions)} />
                </>
                : null
            }

            <SectionTitleUI titleKey={'CR_GL_DIRECT_COMPANY_CONTROL_L'} anchor="offshoreDirectControl" />

            <div className="field-container">
                <div className="row">
                    <div className="col">
                        {this.labelFor(m => m.fields.offshoreDirectControlCompanies, "CR_F_537_L", { className: `field-title field-title--form` })}
                    </div>
                </div>

                <F5370_OffshoreDirectControlCompanyFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompany)} skipFieldContainer />
                <F53702_OffshoreDirectControlCompanyLegalFormFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyLegalForm)} skipFieldContainer />
                <F53703_OffshoreDirectControlCompanyTransliterationFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyTransliteration)} skipFieldContainer />
                <F53704_OffshoreDirectControlCompanyNumberInRegisterFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyNumberInRegister)} skipFieldContainer />
                <SectionSubTitle subTitleTextKey={"CR_APP_00092_L"} />
                <F53705_OffshoreDirectControlCompanyAddressFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyAddress)} skipFieldContainer />
                <SectionSubTitle subTitleTextKey={"CR_APP_00051_L"} />
                <F5371_OffshoreDirectControlCompanyRepresentativesFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanyRepresentatives)} skipFieldContainer />
                <SectionSubTitle subTitleTextKey={"CR_APP_00094_L"} />
                <F53707_OffshoreDirectControlCompanyWayOfRepresentationFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyWayOfRepresentation)} skipFieldContainer />
            </div>

            <SectionTitleUI titleKey={'CR_GL_NO_DIRECT_COMPANY_CONTROL_L'} anchor="offshoreNoDirectControl" />
            <div className="field-container">
                <div className="row">
                    <div className="col">
                        {this.labelFor(m => m.fields.offshoreNoDirectControlCompanies, "CR_F_538_L", { className: `field-title field-title--form` })}
                    </div>
                </div>

                <F5380_OffshoreNoDirectControlCompanyFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompany)} skipFieldContainer />
                <F53802_OffshoreNoDirectControlCompanyLegalFormFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyLegalForm)} skipFieldContainer />
                <F53803_OffshoreNoDirectControlCompanyTransliterationFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyTransliteration)} skipFieldContainer />
                <F53804_OffshoreNoDirectControlCompanyNumberInRegisterFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyNumberInRegister)} skipFieldContainer />
                <SectionSubTitle subTitleTextKey={"CR_APP_00092_L"} />
                <F53805_OffshoreNoDirectControlCompanyAddressFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyAddress)} skipFieldContainer />
                <SectionSubTitle subTitleTextKey={"CR_APP_00052_L"} />
                <F5381_OffshoreNoDirectControlCompanyRepresentativesFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanyRepresentatives)} skipFieldContainer />
                <SectionSubTitle subTitleTextKey={"CR_APP_00094_L"} />
                <F53807_OffshoreNoDirectControlCompanyWayOfRepresentationFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyWayOfRepresentation)} skipFieldContainer />
            </div>


            {this.model.fields.reasonForEntry529.article6 == true ?
                <>
                    <SectionTitleUI titleKey={'CR_GL_CIRCUMSTANCES_PART4_L'} anchor="circumstances4" />
                    <F540_CircumstanceArticle4FieldUI {...this.bind(m => m.fields.article4)} />
                </>
                : null
            }
            <SectionTitleUI titleKey={'CR_GL_ACTUAL_PERSON_OWNERS_L'} anchor="actualOwners" />
            <F550_ActualOwnersFieldUI {...this.bind(m => m.fields.actualOwners)} fieldInfoKeys={['CR_APP_00214_I']} />
            <F550a_ContactPerson550aFieldUI {...this.bind(m => m.fields.contactPerson550a)} fieldInfoKeys={['CR_APP_00215_I']} />
            <F551_EraseActualOwnerFieldUI {...this.bind(m => m.fields.eraseActualOwner)} />

            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B7} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_MAIN_CIRCUMSTANCES_L'} anchor="mainCircumstances" isForPreview={true} />
            <F529_ReasonForEntry529FieldUI {...this.bind(m => m.fields.reasonForEntry529)} />

            {ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529)
                || ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529.article6)
                || this.model.fields.reasonForEntry529.article6 == true ?
                <F001b_NumberNationalRegister1bFieldUI {...this.bind(m => m.fields.numberNationalRegister1b)} />
                : null
            }

            {ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529)
                || ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529.article6)
                || this.model.fields.reasonForEntry529.article6 == true ?
                <><F531_OffshoreCompanyFieldUI {...this.bind(m => m.fields.offshoreCompany)} />
                    <F532_OffshoreTransliterationFieldUI {...this.bind(m => m.fields.offshoreTransliteration)} />
                    <F533_OffshoreSeatFieldUI {...this.bind(m => m.fields.offshoreSeat)} />
                    <F534_OffshoreRepresentativesFieldUI {...this.bind(m => m.fields.offshoreRepresentatives)} />
                    <F535_OffshoreWayOfRepresentationFieldUI {...this.bind(m => m.fields.offshoreWayOfRepresentation)} />
                    <F536_OffshoreSpecialConditionsFieldUI {...this.bind(m => m.fields.offshoreSpecialConditions)} />
                </> : null
            }

            <SectionTitleUI titleKey={'CR_GL_DIRECT_COMPANY_CONTROL_L'} anchor="offshoreDirectControl" isForPreview={true} />
            {this.model.fields.offshoreDirectControlCompanies &&
                <div className="field-container">
                    <div className="record-container record-container--preview">
                        {this.isOffshoreDirectControlCompanyDirty() ?
                            <h3 className="field-title field-title--preview">{this.getResource("CR_F_537_L")}</h3> : null}

                        <F5370_OffshoreDirectControlCompanyFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompany)} />
                        <F53702_OffshoreDirectControlCompanyLegalFormFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyLegalForm)} />
                        <F53703_OffshoreDirectControlCompanyTransliterationFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyTransliteration)} />
                        <F53704_OffshoreDirectControlCompanyNumberInRegisterFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyNumberInRegister)} />
                        {
                            this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyAddress)
                            && <SectionSubTitle subTitleTextKey={"CR_APP_00092_L"} isForPreview />
                        }
                        <F53705_OffshoreDirectControlCompanyAddressFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyAddress)} />

                        {this.isOffshoreDirectControlCompanyRepresentativesDirty(true) && <SectionSubTitle subTitleTextKey={"CR_APP_00051_L"} isForPreview />}
                        <F5371_OffshoreDirectControlCompanyRepresentativesFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanyRepresentatives)} />
                        {
                            this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyWayOfRepresentation)
                                ? <SectionSubTitle subTitleTextKey={"CR_APP_00094_L"} isForPreview />
                                : null
                        }
                        <F53707_OffshoreDirectControlCompanyWayOfRepresentationFieldUI {...this.bind(m => m.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyWayOfRepresentation)} />
                    </div>
                </div>
            }
            <SectionTitleUI titleKey={'CR_GL_NO_DIRECT_COMPANY_CONTROL_L'} anchor="offshoreNoDirectControl" isForPreview={true} />
            {this.model.fields.offshoreNoDirectControlCompanies &&
                <div className="field-container">
                    <div className="record-container record-container--preview">
                        {this.isOffshoreNoDirectControlCompanyDirty() ?
                            <h3 className="field-title field-title--preview">{this.getResource("CR_F_538_L")}</h3> : null}

                        <F5380_OffshoreNoDirectControlCompanyFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompany)} />
                        <F53802_OffshoreNoDirectControlCompanyLegalFormFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyLegalForm)} />
                        <F53803_OffshoreNoDirectControlCompanyTransliterationFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyTransliteration)} />
                        <F53804_OffshoreNoDirectControlCompanyNumberInRegisterFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyNumberInRegister)} />
                        {
                            this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyAddress)
                            && <SectionSubTitle subTitleTextKey={"CR_APP_00092_L"} isForPreview />
                        }
                        <F53805_OffshoreNoDirectControlCompanyAddressFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyAddress)} />
                        {this.isOffshoreNoDirectControlCompanyRepresentativesDirty(true) && <SectionSubTitle subTitleTextKey={"CR_APP_00052_L"} isForPreview />}
                        <F5381_OffshoreNoDirectControlCompanyRepresentativesFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanyRepresentatives)} />
                        {
                            this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyWayOfRepresentation)
                                ? <SectionSubTitle subTitleTextKey={"CR_APP_00094_L"} isForPreview />
                                : null
                        }
                        <F53807_OffshoreNoDirectControlCompanyWayOfRepresentationFieldUI {...this.bind(m => m.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyWayOfRepresentation)} />
                    </div>
                </div>
            }
            {(ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529) || ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529.article6)
                && this.isRecordNotNullDirtyOrChanged(this.model.fields.article4))
                || (!ObjectHelper.isNullOrUndefined(this.model.fields.reasonForEntry529) && this.model.fields.reasonForEntry529.article6 == true) ?
                <>
                    <SectionTitleUI titleKey={'CR_GL_CIRCUMSTANCES_PART4_L'} anchor="circumstances4" isForPreview={true} />
                    <F540_CircumstanceArticle4FieldUI {...this.bind(m => m.fields.article4)} />
                </>
                : null}
            <SectionTitleUI titleKey={'CR_GL_ACTUAL_PERSON_OWNERS_L'} anchor="actualOwners" isForPreview />
            <F550_ActualOwnersFieldUI {...this.bind(m => m.fields.actualOwners)} />
            <F550a_ContactPerson550aFieldUI {...this.bind(m => m.fields.contactPerson550a)} />
            <F551_EraseActualOwnerFieldUI {...this.bind(m => m.fields.eraseActualOwner)} />

            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }

    isOffshoreDirectControlCompanyDirty(): boolean {
        let isDirty: boolean = this.model.fields.offshoreDirectControlCompanies
            && (this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompany)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyLegalForm)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyTransliteration)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyNumberInRegister)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyAddress)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanies.offshoreDirectControlCompanyWayOfRepresentation));


        return isDirty || this.isOffshoreDirectControlCompanyRepresentativesDirty();
    }

    isOffshoreDirectControlCompanyRepresentativesDirty(isValidWhenHasMultipleElements: boolean = false) {
        let isDirty = false;

        if (this.model.fields.offshoreDirectControlCompanyRepresentatives && this.model.fields.offshoreDirectControlCompanyRepresentatives.offshoreDirectControlCompanyRepresentativesList) {

            if (isValidWhenHasMultipleElements && this.model.fields.offshoreDirectControlCompanyRepresentatives.offshoreDirectControlCompanyRepresentativesList.length > 1)
                return true;

            for (var i = 0; i < this.model.fields.offshoreDirectControlCompanyRepresentatives.offshoreDirectControlCompanyRepresentativesList.length; i++) {

                isDirty = isDirty || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreDirectControlCompanyRepresentatives.offshoreDirectControlCompanyRepresentativesList[i]);

                if (isDirty)
                    break;
            }
        }

        return isDirty;
    }

    isOffshoreNoDirectControlCompanyDirty(): boolean {
        let isDirty: boolean = this.model.fields.offshoreNoDirectControlCompanies
            && (this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompany)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyLegalForm)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyTransliteration)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyNumberInRegister)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyAddress)
                || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanies.offshoreNoDirectControlCompanyWayOfRepresentation));

        return isDirty || this.isOffshoreNoDirectControlCompanyRepresentativesDirty();
    }

    isOffshoreNoDirectControlCompanyRepresentativesDirty(isValidWhenHasMultipleElements: boolean = false) {
        let isDirty = false;

        if (this.model.fields.offshoreNoDirectControlCompanyRepresentatives && this.model.fields.offshoreNoDirectControlCompanyRepresentatives.offshoreNoDirectControlCompanyRepresentativesList) {

            if (isValidWhenHasMultipleElements && this.model.fields.offshoreNoDirectControlCompanyRepresentatives.offshoreNoDirectControlCompanyRepresentativesList.length > 1)
                return true;

            for (var i = 0; i < this.model.fields.offshoreNoDirectControlCompanyRepresentatives.offshoreNoDirectControlCompanyRepresentativesList.length; i++) {

                isDirty = isDirty || this.isRecordNotNullDirtyOrChanged(this.model.fields.offshoreNoDirectControlCompanyRepresentatives.offshoreNoDirectControlCompanyRepresentativesList[i]);

                if (isDirty)
                    break;
            }
        }

        return isDirty;
    }

    private isRecordNotNullDirtyOrChanged(record: Record): boolean {
        return !ObjectHelper.isNullOrUndefined(record) &&
            (DomainModelHepler.isRecordDirty(record) || record.recordOperation == RecordOperations.Add || record.recordOperation == RecordOperations.Erase)
    }
}

export const B7UI = withApplicationFormContext(B7UIImpl);