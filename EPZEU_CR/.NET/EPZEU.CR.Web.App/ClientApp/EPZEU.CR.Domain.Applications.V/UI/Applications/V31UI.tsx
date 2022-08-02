import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V31 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F801_FormOfTransformingFieldUI, FormsOfTransforming } from "../Fields/F801_FormOfTransformingUI";
import { F802_TransformingCompanyFieldListUI } from "../Fields/F802_ReorganizeCoOperativesUI";
import { F803_SuccessorFieldUI } from "../Fields/F803_SuccessorsUI";

interface V31UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF801 = ['CR_APP_00054_I'];
const fieldInfoKeysF802 = ['CR_APP_00068_I'];
const fieldInfoKeysF803 = ['CR_APP_00069_I', 'CR_APP_00241_I', 'CR_APP_00242_I', 'CR_APP_00243_I', 'CR_APP_00244_I'];

class V31UIImpl extends EPZEUBaseComponent<V31UIProps, V31> {

    constructor(props?: V31UIProps) {
        super(props);

        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V31} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_REALIGNMENT_L'} anchor="realignment" />
                <F801_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF801} {...this.bind(m => m.fields.formOfTransforming801)}
                    formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion]}
                    onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
                <F802_TransformingCompanyFieldListUI fieldInfoKeys={fieldInfoKeysF802} {...this.bind(m => m.fields.reorganizeCoOperatives)} onUICChange={this.onUICChange} />
                <F803_SuccessorFieldUI fieldInfoKeys={fieldInfoKeysF803} {...this.bind(m => m.fields.successors803)} onUICChange={this.onUICChange} />
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V31} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_REALIGNMENT_L'} anchor="realignment" isForPreview={true} />
                <F801_FormOfTransformingFieldUI {...this.bind(m => m.fields.formOfTransforming801)} formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion]} />
                <F802_TransformingCompanyFieldListUI {...this.bind(m => m.fields.reorganizeCoOperatives)} />
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

    private onUICChange(uic: string) {
        if (isApplicationFormVBaseManager(this.props.applicationManager) && this.props.applicationManager.onUICChange)
            this.props.registerAsyncOperation(this.props.applicationManager.onUICChange(uic));
    }

    private onChangeFormOfTransforming(): void {
        if (this.model.fields.formOfTransforming801.fusion)
            this.model.fields.successors803.successorList[0].subject.indent = null;
    }
}

export const V31UI = withApplicationFormContext(withAsyncFrame(V31UIImpl));
