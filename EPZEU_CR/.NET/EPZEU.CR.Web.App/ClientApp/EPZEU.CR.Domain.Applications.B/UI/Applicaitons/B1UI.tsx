import { BaseProps, ViewMode } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { B1 } from "../../Models/ApplicationForms/ApplicationFormsB";
import { F041_ProcuratorsFieldUI } from '../Fields/F041_ProcuratorsUI';
import { F042_SepcialPowersFieldUI } from '../Fields/F042_SepcialPowersUI';
import { F043_WayOfRepresentation43FieldUI } from "../Fields/F043_WayOfRepresentation43UI";
import { F044_EraseProcuraFieldUI } from "../Fields/F044_EraseProcuraUI";

interface B1UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF041 = ['CR_APP_00120_I'];
const fieldInfoKeysF042 = ['CR_APP_00121_I'];
const fieldInfoKeysF043 = ['CR_APP_00122_I'];
const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class B1UIImpl extends EPZEUBaseComponent<B1UIProps, B1> {

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B1} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <SectionTitleUI titleKey={'CR_GL_PROCURA_L'} anchor="procura" />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <F041_ProcuratorsFieldUI fieldInfoKeys={fieldInfoKeysF041} {...this.bind(m => m.fields.procurators)} />
            <F042_SepcialPowersFieldUI fieldInfoKeys={fieldInfoKeysF042} {...this.bind(m => m.fields.sepcialPowers)} />
            <F043_WayOfRepresentation43FieldUI fieldInfoKeys={fieldInfoKeysF043} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F044_EraseProcuraFieldUI {...this.bind(m => m.fields.eraseProcura)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.B1} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} viewMode={ViewMode.Edit} />
            <SectionTitleUI titleKey={'CR_GL_PROCURA_L'} anchor="procura" isForPreview={true} />
            <F041_ProcuratorsFieldUI fieldInfoKeys={['CR_APP_00120_I']} {...this.bind(m => m.fields.procurators)} />
            <F042_SepcialPowersFieldUI fieldInfoKeys={['CR_APP_00121_I']} {...this.bind(m => m.fields.sepcialPowers)} />
            <F043_WayOfRepresentation43FieldUI fieldInfoKeys={['CR_APP_00122_I']} {...this.bind(m => m.fields.wayOfRepresentation)} />
            <F044_EraseProcuraFieldUI {...this.bind(m => m.fields.eraseProcura)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const B1UI = withApplicationFormContext(B1UIImpl);