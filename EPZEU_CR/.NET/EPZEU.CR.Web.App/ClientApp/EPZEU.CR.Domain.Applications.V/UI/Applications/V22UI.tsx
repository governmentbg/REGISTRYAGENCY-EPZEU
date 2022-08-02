import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V22 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F701_FormOfTransformingFieldUI, FormsOfTransforming } from "../Fields/F701_FormOfTransformingUI";
import { F702_TransformingCompanyFieldUI } from "../Fields/F702_TransformingCompanyUI";
import { F703_SuccessorFieldListUI } from "../Fields/F703_SuccessorUI";
import { F704_BranchSubjectFieldListUI } from "../Fields/F704_BranchSubjectUI";

interface V22UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF701 = ['CR_APP_00054_I'];
const fieldInfoKeysF702 = ['CR_APP_00055_I'];
const fieldInfoKeysF703 = ['CR_APP_00062_I', 'CR_APP_00056_I', 'CR_APP_00236_I', 'CR_APP_00245_I', 'CR_APP_00246_I', 'CR_APP_00247_I'];

class V22UIImpl extends EPZEUBaseComponent<V22UIProps, V22> {

    constructor(props: V22UIProps) {
        super(props);

        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V22} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" />
                <F701_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF701} {...this.bind(m => m.fields.formOfTransforming701)} formsOfTransforming={[FormsOfTransforming.Division, FormsOfTransforming.Separation]} />
                {/*за заявление V22 се въвежда само 1 transformingCompnay. Затова взимаме само първата от списъка.*/}
                <F702_TransformingCompanyFieldUI fieldInfoKeys={fieldInfoKeysF702} {...this.bind(m => m.fields.transformingCompanys)} onUICChange={this.onUICChange} />
                <F703_SuccessorFieldListUI fieldInfoKeys={fieldInfoKeysF703} {...this.bind(m => m.fields.successors703)} showLegalFormDropdown={true} onUICChange={this.onUICChange} />
                <SectionTitleUI titleKey={'CR_GL_BRANCHES_SEPARATION_L'} anchor="branches" />
                <F704_BranchSubjectFieldListUI {...this.bind(m => m.fields.branches704)} />
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V22} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" isForPreview={true} />
                <F701_FormOfTransformingFieldUI {...this.bind(m => m.fields.formOfTransforming701)} formsOfTransforming={[FormsOfTransforming.Separation, FormsOfTransforming.Division]} />
                {/*за заявление V22 се въвежда само 1 transformingCompnay. Затова взимаме само първата от списъка.*/}
                <F702_TransformingCompanyFieldUI {...this.bind(m => m.fields.transformingCompanys)} />
                <F703_SuccessorFieldListUI {...this.bind(m => m.fields.successors703)} />
                <SectionTitleUI titleKey={'CR_GL_BRANCHES_SEPARATION_L'} anchor="branches" isForPreview={true} />
                <F704_BranchSubjectFieldListUI {...this.bind(m => m.fields.branches704)} />
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

export const V22UI = withApplicationFormContext(withAsyncFrame(V22UIImpl));