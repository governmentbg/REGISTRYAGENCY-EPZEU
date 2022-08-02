import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from 'mobx-react';
import * as React from "react";
import { isApplicationFormVBaseManager } from '../../Common/ApplicationFormVBaseManager';
import { V1 } from "../../Models/ApplicationForms/ApplicationFormsV";
import { F600_TransferringTypeOfTradeEnterpriseFieldUI } from "../Fields/F600_TransferringTypeOfTradeEnterpriseUI";
import { F601_TransferringEnterpriseFieldUI } from "../Fields/F601_TransferringEnterpriseUI";
import { F602_AcquisitionEnterprisesFieldListUI, F602_AcquisitionEnterprisesFieldUI } from "../Fields/F602_AcquisitionEnterprisesUI";

interface V1UIProps extends BaseProps, ApplicationFormContextProviderProps, AsyncUIProps {
}

const fieldInfoKeysF601 = ['CR_APP_00059_I'];
const fieldInfoKeysF602 = ['CR_APP_00060_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

@observer class V1UIImpl extends EPZEUBaseComponent<V1UIProps, V1> {

    constructor(props?: V1UIProps) {
        super(props);

        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
    }

    renderEdit(): JSX.Element {

        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V1} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFER_CE_L'} anchor="assignment" />
                {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
                <F600_TransferringTypeOfTradeEnterpriseFieldUI {...this.bind(m => m.fields.transferringTypeOfTradeEnterprise)} onChangeForm={this.onChangeFormOfTransforming} />
                <F601_TransferringEnterpriseFieldUI fieldInfoKeys={fieldInfoKeysF601} {...this.bind(m => m.fields.transferringEnterprise)} onUICChange={this.onUICChange} />
                {
                    this.model.fields.transferringTypeOfTradeEnterprise.partialtransfer
                        ? <F602_AcquisitionEnterprisesFieldListUI fieldInfoKeys={fieldInfoKeysF602} {...this.bind(m => m.fields.acquisitionEnterprises)} onUICChange={this.onUICChange} />
                        : <F602_AcquisitionEnterprisesFieldUI fieldInfoKeys={fieldInfoKeysF602} {...this.bind(m => m.fields.acquisitionEnterprises)} onUICChange={this.onUICChange} />
                }
                <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
                <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ApplicationTitleUI appType={ApplicationFormTypes.V1} />
                <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <SectionTitleUI titleKey={'CR_GL_TRANSFER_CE_L'} anchor="assignment" isForPreview={true} />
                <F600_TransferringTypeOfTradeEnterpriseFieldUI {...this.bind(m => m.fields.transferringTypeOfTradeEnterprise)} onChangeForm={this.onChangeFormOfTransforming} />
                <F601_TransferringEnterpriseFieldUI {...this.bind(m => m.fields.transferringEnterprise)} />
                {
                    (this.model.fields.transferringTypeOfTradeEnterprise && this.model.fields.transferringTypeOfTradeEnterprise.partialtransfer)
                        ? <F602_AcquisitionEnterprisesFieldListUI {...this.bind(m => m.fields.acquisitionEnterprises)} />
                        : <F602_AcquisitionEnterprisesFieldUI {...this.bind(m => m.fields.acquisitionEnterprises)} />
                }
                {this.props.applicationManager.processContext.isDraftApplicationProcess()
                    && <>
                        <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                        <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                    </>
                }
            </>
        );
    }

    onChangeFormOfTransforming(): void {
        // ако е било избрано partialtransfer, в поле 602 са въведени повече от един правоприемници
        // и сега е избрано нещо различно от partialtransfer, трябва да оставим само първия.
        if (!this.model.fields.transferringTypeOfTradeEnterprise.partialtransfer)
            this.model.fields.acquisitionEnterprises.acquisitionEnterpriseList.splice(1);
    }

    private onUICChange(uic: string) {
        if (isApplicationFormVBaseManager(this.props.applicationManager) && this.props.applicationManager.onUICChange)
            this.props.registerAsyncOperation(this.props.applicationManager.onUICChange(uic));
    }
}

export const V1UI = withApplicationFormContext(withAsyncFrame(V1UIImpl));