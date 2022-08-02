import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from 'mobx-react';
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V24 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F701_FormOfTransformingFieldUI, FormsOfTransforming } from "../Fields/F701_FormOfTransformingUI";
import { F702a_TransformingCompanyFieldListUI } from "../Fields/F702a_TransformingCompanyUI";
import { F703_SuccessorFieldUI } from "../Fields/F703_SuccessorUI";

interface V24UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF701 = ['CR_APP_00008_I'];
const fieldInfoKeysF702a = ['CR_APP_00010_I', 'CR_APP_00063_I'];
const fieldInfoKeysF703 = ['CR_APP_00064_I', 'CR_APP_00112_I', 'CR_APP_00065_I', 'CR_APP_00066_I'];

@observer class V24UIImpl extends EPZEUBaseComponent<V24UIProps, V24> {

    constructor(props?: V24UIProps) {
        super(props);

        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V24} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" />
                <F701_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF701}
                    {...this.bind(m => m.fields.formOfTransforming701)}
                    formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion]}
                    onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
                <F702a_TransformingCompanyFieldListUI fieldInfoKeys={fieldInfoKeysF702a} {...this.bind(m => m.fields.transformingCompanys2)} onUICChange={this.onUICChange} />
                <F703_SuccessorFieldUI fieldInfoKeys={fieldInfoKeysF703} {...this.bind(m => m.fields.successors703)} hideUIC={this.model.fields.formOfTransforming701.fusion} onUICChange={this.onUICChange} />
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V24} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" isForPreview={true} />
                <F701_FormOfTransformingFieldUI
                    {...this.bind(m => m.fields.formOfTransforming701)}
                    formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion]}
                    onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
                <F702a_TransformingCompanyFieldListUI {...this.bind(m => m.fields.transformingCompanys2)} />
                <F703_SuccessorFieldUI
                    {...this.bind(m => m.fields.successors703)}
                    hideUIC={this.model.fields.formOfTransforming701 && this.model.fields.formOfTransforming701.fusion}
                />
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
        if (this.model.fields.formOfTransforming701.fusion)
            this.model.fields.successors703.successorList[0].subject.indent = null;
    }
}

export const V24UI = withApplicationFormContext(withAsyncFrame(V24UIImpl));
