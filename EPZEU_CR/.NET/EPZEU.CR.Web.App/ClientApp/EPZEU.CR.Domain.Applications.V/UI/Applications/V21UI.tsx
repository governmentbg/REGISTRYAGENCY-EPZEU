import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from 'mobx-react';
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V21 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F701_FormOfTransformingFieldUI, FormsOfTransforming } from "../Fields/F701_FormOfTransformingUI";
import { F702_TransformingCompanyFieldListUI, F702_TransformingCompanyFieldUI } from "../Fields/F702_TransformingCompanyUI";
import { F703_SuccessorFieldUI } from "../Fields/F703_SuccessorUI";

interface V21UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF701 = ['CR_APP_00054_I'];
const fieldInfoKeysF702 = ['CR_APP_00061_I', 'CR_APP_00233_I', 'CR_APP_00234_I'];
const fieldInfoKeysF703 = ['CR_APP_00062_I', 'CR_APP_00235_I', 'CR_APP_00236_I', 'CR_APP_00237_I', 'CR_APP_00238_I', 'CR_APP_00239_I', 'CR_APP_00240_I'];

@observer class V21UIImpl extends EPZEUBaseComponent<V21UIProps, V21> {

    constructor(props?: V21UIProps) {
        super(props);

        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V21} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" />
                <F701_FormOfTransformingFieldUI fieldInfoKeys={fieldInfoKeysF701}
                    {...this.bind(m => m.fields.formOfTransforming701)}
                    formsOfTransforming={[
                        FormsOfTransforming.Influx,
                        FormsOfTransforming.Fusion,
                        FormsOfTransforming.ChangeLegalForm,
                        FormsOfTransforming.TransferringProperty,
                        FormsOfTransforming.ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC,
                        FormsOfTransforming.ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany]}
                    onChangeFormOfTransforming={this.onChangeFormOfTransforming} />
                {
                    (this.model.fields.formOfTransforming701.fusion || this.model.fields.formOfTransforming701.influx)
                        ? <F702_TransformingCompanyFieldListUI fieldInfoKeys={fieldInfoKeysF702} {...this.bind(m => m.fields.transformingCompanys)} onUICChange={this.onUICChange} />
                        : <F702_TransformingCompanyFieldUI fieldInfoKeys={fieldInfoKeysF702} {...this.bind(m => m.fields.transformingCompanys)} onUICChange={this.onUICChange} />
                }
                <F703_SuccessorFieldUI fieldInfoKeys={fieldInfoKeysF703}
                    {...this.bind(m => m.fields.successors703)}
                    showLegalFormDropdown={
                        this.model.fields.formOfTransforming701.influx
                        || this.model.fields.formOfTransforming701.fusion
                        || this.model.fields.formOfTransforming701.changeLegalForm
                    }
                    hideUIC={this.model.fields.formOfTransforming701.fusion || this.model.fields.formOfTransforming701.changeLegalForm}
                    onUICChange={this.onUICChange}
                />
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V21} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFORMATION_L'} anchor="transformation" isForPreview={true} />
                <F701_FormOfTransformingFieldUI {...this.bind(m => m.fields.formOfTransforming701)} formsOfTransforming={[FormsOfTransforming.Separation, FormsOfTransforming.Division]} />
                {
                    (this.model.fields.formOfTransforming701 && (this.model.fields.formOfTransforming701.fusion || this.model.fields.formOfTransforming701.influx)) ?
                        <F702_TransformingCompanyFieldListUI {...this.bind(m => m.fields.transformingCompanys)} />
                        :
                        <F702_TransformingCompanyFieldUI {...this.bind(m => m.fields.transformingCompanys)} />
                }
                <F703_SuccessorFieldUI {...this.bind(m => m.fields.successors703)} />
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
        if (this.model.fields.formOfTransforming701.fusion || this.model.fields.formOfTransforming701.changeLegalForm)
            this.model.fields.successors703.successorList[0].subject.indent = null;
    }

    private onUICChange(uic: string) {
        if (isApplicationFormVBaseManager(this.props.applicationManager) && this.props.applicationManager.onUICChange)
            this.props.registerAsyncOperation(this.props.applicationManager.onUICChange(uic));
    }
}

export const V21UI = withApplicationFormContext(withAsyncFrame(V21UIImpl));
