import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V33 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F801a_FormOfTransformingFieldUI } from "../Fields/F801a_FormOfTransformingUI";
import { F802a_ReorganizeCoOperativesFieldListUI } from "../Fields/F802a_ReorganizeCoOperativesUI";
import { F803_SuccessorFieldUI } from "../Fields/F803_SuccessorsUI";

interface V33UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF801a = ['CR_APP_00070_I'];
const fieldInfoKeysF802a = ['CR_APP_00071_I'];
const fieldInfoKeysF803 = ['CR_APP_00072_I', 'CR_APP_00073_I', 'CR_APP_00106_I', 'CR_APP_00067_I'];

class V33UIImpl extends EPZEUBaseComponent<V33UIProps, V33> {

    constructor(props?: V33UIProps) {
        super(props);

        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V33} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_REALIGNMENT_L'} anchor="realignment" />
                <F801a_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF801a} {...this.bind(m => m.fields.formOfTransforming801a)} onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
                <F802a_ReorganizeCoOperativesFieldListUI fieldInfoKeys={fieldInfoKeysF802a} {...this.bind(m => m.fields.reorganizeCoOperatives2)} onUICChange={this.onUICChange} />
                <F803_SuccessorFieldUI fieldInfoKeys={fieldInfoKeysF803} {...this.bind(m => m.fields.successors803)} onUICChange={this.onUICChange} />
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V33} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_REALIGNMENT_L'} anchor="realignment" isForPreview={true} />
                <F801a_FormOfTransformingFieldUI {...this.bind(m => m.fields.formOfTransforming801a)} />
                <F802a_ReorganizeCoOperativesFieldListUI {...this.bind(m => m.fields.reorganizeCoOperatives2)} />
                <F803_SuccessorFieldUI {...this.bind(m => m.fields.successors803)} />
                {this.props.applicationManager.processContext.isDraftApplicationProcess()
                    && <>
                        <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                        <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                    </>
                }
            </>
        );
    }

    private onChangeFormOfTransforming(): void {

        if (this.model.fields.formOfTransforming801a.fusion801a)
            this.model.fields.successors803.successorList[0].subject.indent = null;
    }

    private onUICChange(uic: string) {
        if (isApplicationFormVBaseManager(this.props.applicationManager) && this.props.applicationManager.onUICChange)
            this.props.registerAsyncOperation(this.props.applicationManager.onUICChange(uic));
    }
}

export const V33UI = withApplicationFormContext(withAsyncFrame(V33UIImpl));
