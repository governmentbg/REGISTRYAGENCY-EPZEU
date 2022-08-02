import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes, LegalForms } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { B2 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F051a_BranchFirmFieldUI } from "../Fields/F051a_BranchFirmUI";
import { F051b_BranchIdentifierFieldUI } from "../Fields/F051b_BranchIdentifierUI";
import { F051_BranchSeatFieldUI } from "../Fields/F051_BranchSeatUI";
import { F052a_MainActivityNKIDFieldUI } from "../Fields/F052a_MainActivityNKIDUI";
import { F052_BranchSubjectOfActivityFieldUI } from "../Fields/F052_BranchSubjectOfActivityUI";
import { F053_BranchManagersFieldUI } from "../Fields/F053_BranchManagersUI";
import { F054_VolumeOfRepresentationPowerFieldUI } from "../Fields/F054_VolumeOfRepresentationPowerUI";
import { F055_BranchClosureFieldUI } from "../Fields/F055_BranchClosureUI";

interface B2UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF051a = ['CR_APP_00028_I'];
const fieldInfoKeysF051 = ['CR_APP_00033_I'];
const fieldInfoKeysF052 = ['CR_APP_00022_I'];
const fieldInfoKeysF052a = ['CR_APP_00218_I'];
const fieldInfoKeysF053 = ['CR_APP_00015_I'];
const fieldInfoKeysF054 = ['CR_APP_00105_I'];
const fieldInfoKeysF055 = ['CR_APP_00052_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class B2UIImpl extends EPZEUBaseComponent<B2UIProps, B2> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B2} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_BRANCH_L'} anchor="branch" />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <F051a_BranchFirmFieldUI fieldInfoKeys={fieldInfoKeysF051a} {...this.bind(m => m.fields.branchFirm)} />
            <F051b_BranchIdentifierFieldUI {...this.bind(m => m.fields.branchIdentifier)} isMandatoryField={this.props.applicationManager.processState == ProcessStates.Preregistration} />
            <F051_BranchSeatFieldUI fieldInfoKeys={fieldInfoKeysF051}  {...this.bind(m => m.fields.branchSeat)} />
            <F052_BranchSubjectOfActivityFieldUI fieldInfoKeys={fieldInfoKeysF052} {...this.bind(m => m.fields.branchSubjectOfActivity)} isMandatoryField={this.isF052Mandatory} />
            <F052a_MainActivityNKIDFieldUI fieldInfoKeys={fieldInfoKeysF052a} {...this.bind(m => m.fields.mainActivityNKID)} />
            <F053_BranchManagersFieldUI fieldInfoKeys={fieldInfoKeysF053} {...this.bind(m => m.fields.branchManagers)} />
            <F054_VolumeOfRepresentationPowerFieldUI fieldInfoKeys={fieldInfoKeysF054} {...this.bind(m => m.fields.volumeOfRepresentationPower)} />
            <F055_BranchClosureFieldUI fieldInfoKeys={fieldInfoKeysF055} {...this.bind(m => m.fields.branchClosure)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B2} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_BRANCH_L'} anchor="branch" isForPreview={true} />
            <F051a_BranchFirmFieldUI  {...this.bind(m => m.fields.branchFirm)} />
            <F051b_BranchIdentifierFieldUI {...this.bind(m => m.fields.branchIdentifier)} />
            <F051_BranchSeatFieldUI {...this.bind(m => m.fields.branchSeat)} />
            <F052_BranchSubjectOfActivityFieldUI {...this.bind(m => m.fields.branchSubjectOfActivity)} />
            <F052a_MainActivityNKIDFieldUI {...this.bind(m => m.fields.mainActivityNKID)} />
            <F053_BranchManagersFieldUI {...this.bind(m => m.fields.branchManagers)} />
            <F054_VolumeOfRepresentationPowerFieldUI {...this.bind(m => m.fields.volumeOfRepresentationPower)} />
            <F055_BranchClosureFieldUI {...this.bind(m => m.fields.branchClosure)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }

    private get isF052Mandatory(): boolean {

        let mainAppType = (this.props.applicationManager.processContext as any).mainApplicationProcess.mainApplicationType;
        let legalForm = (this.props.applicationManager.additionalData.legalForm);

        // Ако в пакета има А15(Сдружение), без значение дали е за нова регистрация или за пререгистрация
        if (mainAppType == ApplicationFormTypes.A15 || legalForm == LegalForms.ASSOC)
            return false;

        // Ако в пакета има А16(Фондация), без значение дали е за нова регистрация или за пререгистрация
        else if (mainAppType == ApplicationFormTypes.A16 || legalForm == LegalForms.FOUND)
            return false;

        // Ако в пакета има А17(читалище), без значение дали е за нова регистрация или за пререгистрация
        else if (mainAppType == ApplicationFormTypes.A17 || legalForm == LegalForms.CC)
            return false;

        return true;
    }
}

export const B2UI = withApplicationFormContext(B2UIImpl);