import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from 'mobx-react';
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V26 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F701_FormOfTransformingFieldUI, FormsOfTransforming } from '../Fields/F701_FormOfTransformingUI';
import { F702b_TransformingNPOFieldUI } from '../Fields/F702b_TransformingNPOsUI';
import { F703_SuccessorFieldListUI } from '../Fields/F703_SuccessorUI';
import { F704_BranchSubjectFieldListUI } from '../Fields/F704_BranchSubjectUI';

interface V26UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF701 = ['CR_APP_00054_I'];
const fieldInfoKeysF702b = ['CR_APP_00256_I'];
const fieldInfoKeysF703 = ['CR_APP_00253_I', 'CR_APP_00257_I', 'CR_APP_00258_I'];

@observer class V26UIImpl extends EPZEUBaseComponent<V26UIProps, V26> {

    constructor(props?: V26UIProps) {
        super(props);

        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.V26} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" />
            <F701_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF701} {...this.bind(m => m.fields.formOfTransforming701)} formsOfTransforming={[FormsOfTransforming.Division, FormsOfTransforming.Separation]} />
            <F702b_TransformingNPOFieldUI fieldInfoKeys={fieldInfoKeysF702b} {...this.bind(m => m.fields.transformingNPOs)} onUICChange={this.onUICChange} />
            <F703_SuccessorFieldListUI fieldInfoKeys={fieldInfoKeysF703} {...this.bind(m => m.fields.successors703)} onUICChange={this.onUICChange} showLegalFormDropdown={true}
                companyLabel="GL_NAME_L"
                legalFormLabel="CR_APP_CHOOSE_LEGAL_FORM_FOR_FOUNDING_NPLE_L" />
            <SectionTitleUI titleKey={'CR_GL_BRANCHES_SEPARATION_L'} anchor="branchesSeparation" />
            <F704_BranchSubjectFieldListUI {...this.bind(m => m.fields.branches704)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.V26} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" isForPreview />
            <F701_FormOfTransformingFieldUI {...this.bind(m => m.fields.formOfTransforming701)} formsOfTransforming={[FormsOfTransforming.Separation, FormsOfTransforming.Division]} />
            <F702b_TransformingNPOFieldUI {...this.bind(m => m.fields.transformingNPOs)} />
            <F703_SuccessorFieldListUI {...this.bind(m => m.fields.successors703)} showLegalFormDropdown={true}
                companyLabel="GL_NAME_L"
                legalFormLabel="CR_APP_CHOOSE_LEGAL_FORM_FOR_FOUNDING_NPLE_L" />
            <SectionTitleUI titleKey={'CR_GL_BRANCHES_SEPARATION_L'} anchor="branchesSeparation" isForPreview />
            <F704_BranchSubjectFieldListUI {...this.bind(m => m.fields.branches704)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }

    private onUICChange(uic: string) {
        if (isApplicationFormVBaseManager(this.props.applicationManager) && this.props.applicationManager.onUICChange)
            this.props.registerAsyncOperation(this.props.applicationManager.onUICChange(uic));
    }
}

export const V26UI = withApplicationFormContext(withAsyncFrame(V26UIImpl));
