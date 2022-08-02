import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V32 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F801_FormOfTransformingFieldUI, FormsOfTransforming } from "../Fields/F801_FormOfTransformingUI";
import { F802_TransformingCompanyFieldUI } from "../Fields/F802_ReorganizeCoOperativesUI";
import { F803_SuccessorFieldListUI } from "../Fields/F803_SuccessorsUI";
import { F804_ReorgBranchesFieldListUI } from "../Fields/F804_ReorgBranchesUI";

interface V32UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF801 = ['CR_APP_00054_I'];
const fieldInfoKeysF802 = ['CR_APP_00068_I'];
const fieldInfoKeysF803 = ['CR_APP_00069_I', 'CR_APP_00241_I', 'CR_APP_00242_I', 'CR_APP_00243_I', 'CR_APP_00244_I'];

class V32UIImpl extends EPZEUBaseComponent<V32UIProps, V32> {

    constructor(props: V32UIProps) {
        super(props);

        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V32} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_REALIGNMENT_L'} anchor="realignment" />
                <F801_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF801} {...this.bind(m => m.fields.formOfTransforming801)} formsOfTransforming={[FormsOfTransforming.Division, FormsOfTransforming.Separation]} />
                <F802_TransformingCompanyFieldUI fieldInfoKeys={fieldInfoKeysF802} {...this.bind(m => m.fields.reorganizeCoOperatives)} onUICChange={this.onUICChange} />
                <F803_SuccessorFieldListUI fieldInfoKeys={fieldInfoKeysF803} {...this.bind(m => m.fields.successors803)} onUICChange={this.onUICChange} />
                <SectionTitleUI titleKey={'CR_GL_BRANCHES_L'} anchor="branches" />
                <F804_ReorgBranchesFieldListUI {...this.bind(m => m.fields.branches804)} />
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V32} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_REALIGNMENT_L'} anchor="realignment" isForPreview={true} />
                <F801_FormOfTransformingFieldUI {...this.bind(m => m.fields.formOfTransforming801)} formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion]} />
                <F802_TransformingCompanyFieldUI {...this.bind(m => m.fields.reorganizeCoOperatives)} />
                <F803_SuccessorFieldListUI {...this.bind(m => m.fields.successors803)} />
                <SectionTitleUI titleKey={'CR_GL_BRANCHES_L'} anchor="branches" isForPreview={true} />
                <F804_ReorgBranchesFieldListUI {...this.bind(m => m.fields.branches804)} />
                {this.props.applicationManager.processContext.isDraftApplicationProcess()
                    && <>
                        <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                        <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                    </>
                }
            </>
        );
    }

    private onUICChange(uic: string) {
        if (isApplicationFormVBaseManager(this.props.applicationManager) && this.props.applicationManager.onUICChange)
            this.props.registerAsyncOperation(this.props.applicationManager.onUICChange(uic));
    }
}

export const V32UI = withApplicationFormContext(withAsyncFrame(V32UIImpl));
