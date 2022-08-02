﻿import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import * as React from "react";
import { isApplicationFormGManager } from "../../Common/ApplicationFormGBaseManager";
import { G3 } from "../../Models/ApplicationForms/ApplicationFormsG";
import { F1001_DescriptionOfDeclaredStatementFieldUI } from "../Fields/F1001_DescriptionOfDeclaredStatementUI";

interface G3UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const infoTextKeys1 = ['CR_APP_00053_I', 'CR_APP_00225_I'];

class G3UIImpl extends EPZEUBaseComponent<G3UIProps, G3> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.G3} />
            <SectionTitleUI titleKey={'CR_GL_PUBLICATION_ACTS_L'} anchor="publicationActs" />
            <SectionInfoUI infoTextKey={infoTextKeys1} />
            <F1001_DescriptionOfDeclaredStatementFieldUI {...this.bind(m => m.fields.statements)}
                possibleDocumentTypesGetter={isApplicationFormGManager(this.props.applicationManager) ? this.props.applicationManager.getPossibleActAttachedDocumentTypes : null} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.G3} />
            <SectionTitleUI titleKey={'CR_GL_PUBLICATION_ACTS_L'} anchor="publicationActs" isForPreview={true} />
            <F1001_DescriptionOfDeclaredStatementFieldUI {...this.bind(m => m.fields.statements)} possibleDocumentTypesGetter={isApplicationFormGManager(this.props.applicationManager) ? this.props.applicationManager.getPossibleActAttachedDocumentTypes : null} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const G3UI = withApplicationFormContext(G3UIImpl);