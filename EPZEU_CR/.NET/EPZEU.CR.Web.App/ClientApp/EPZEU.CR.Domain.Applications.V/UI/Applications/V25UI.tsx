import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from 'mobx-react';
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V25 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F701_FormOfTransformingFieldUI, FormsOfTransforming } from '../Fields/F701_FormOfTransformingUI';
import { F702b_TransformingNPOFieldListUI, F702b_TransformingNPOFieldUI } from '../Fields/F702b_TransformingNPOsUI';
import { F703_SuccessorFieldUI } from '../Fields/F703_SuccessorUI';

interface V25UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF701 = ['CR_APP_00054_I'];
const fieldInfoKeysF702b = ['CR_APP_00131_I', 'CR_APP_00132_I', 'CR_APP_00252_I'];
const fieldInfoKeysF703 = ['CR_APP_00253_I', 'CR_APP_00254_I', 'CR_APP_00255_I'];

@observer class V25UIImpl extends EPZEUBaseComponent<V25UIProps, V25> {

    constructor(props?: V25UIProps) {
        super(props);

        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.V25} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" />
            <F701_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF701}
                {...this.bind(m => m.fields.formOfTransforming701)}
                formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion, FormsOfTransforming.ChangeLegalForm]}
                onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
            {
                (this.model.fields.formOfTransforming701.fusion || this.model.fields.formOfTransforming701.influx)
                    ? <F702b_TransformingNPOFieldListUI fieldInfoKeys={fieldInfoKeysF702b} {...this.bind(m => m.fields.transformingNPOs)} onUICChange={this.onUICChange} />
                    : <F702b_TransformingNPOFieldUI fieldInfoKeys={fieldInfoKeysF702b} {...this.bind(m => m.fields.transformingNPOs)} onUICChange={this.onUICChange} />
            }
            <F703_SuccessorFieldUI fieldInfoKeys={fieldInfoKeysF703} {...this.bind(m => m.fields.successors703)}
                showLegalFormDropdown={true} onUICChange={this.onUICChange}
                companyLabel="GL_NAME_L" legalFormLabel="CR_APP_CHOOSE_LEGAL_FORM_FOR_FOUNDING_NPLE_L" />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.V25} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" isForPreview />
            <F701_FormOfTransformingFieldUI
                {...this.bind(m => m.fields.formOfTransforming701)}
                formsOfTransforming={[FormsOfTransforming.Influx, FormsOfTransforming.Fusion, FormsOfTransforming.ChangeLegalForm]}
                onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
            {
                (this.model.fields.formOfTransforming701 && (this.model.fields.formOfTransforming701.fusion || this.model.fields.formOfTransforming701.influx))
                    ? <F702b_TransformingNPOFieldListUI {...this.bind(m => m.fields.transformingNPOs)} />
                    : <F702b_TransformingNPOFieldUI {...this.bind(m => m.fields.transformingNPOs)} />
            }
            <F703_SuccessorFieldUI fieldInfoKeys={fieldInfoKeysF703} {...this.bind(m => m.fields.successors703)} showLegalFormDropdown={true}
                companyLabel="GL_NAME_L" legalFormLabel="CR_APP_CHOOSE_LEGAL_FORM_FOR_FOUNDING_NPLE_L" />
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

    private onChangeFormOfTransforming(): void {
        if (this.model.fields.formOfTransforming701.fusion)
            this.model.fields.successors703.successorList[0].subject.indent = null;
    }
}

export const V25UI = withApplicationFormContext(withAsyncFrame(V25UIImpl));
