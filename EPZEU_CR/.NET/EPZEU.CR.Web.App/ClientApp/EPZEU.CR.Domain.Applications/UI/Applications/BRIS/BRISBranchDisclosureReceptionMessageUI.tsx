import * as React from 'react';
import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps, DocumentsUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { BRISBranchDisclosureReceptionMessage } from '../../../Models/ApplicationForms/BRISApplicationForms';
import { BRISCompaniesUI } from '../../BRISCompaniesUI';
import { BRISMesageDetailsUI } from '../../BRISMesageDetailsUI';

interface BRISBranchDisclosureReceptionMessageUIProps extends BaseProps, ApplicationFormContextProviderProps {
}


class BRISBranchDisclosureReceptionMessageUIImpl extends EPZEUBaseComponent<BRISBranchDisclosureReceptionMessageUIProps, BRISBranchDisclosureReceptionMessage> {

    renderEdit(): JSX.Element {
        return null;
    }

    renderDisplay(): JSX.Element {
        return (<>
            <BRISMesageDetailsUI {...this.bind(m => m.fields.brisMesageDetails)} />
            <SectionTitleUI titleKey={'GL_IDENTIFICATION_L'} isForPreview={true} />
            <BRISCompaniesUI {...this.bind(m => m.fields.brisCompanies)} />

            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const BRISBranchDisclosureReceptionMessageUI = withApplicationFormContext(BRISBranchDisclosureReceptionMessageUIImpl);