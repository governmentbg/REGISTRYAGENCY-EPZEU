import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import { observer } from "mobx-react";
import * as React from "react";
import { isApplicationFormGManager, IApplicationFormGManager } from "../../Common/ApplicationFormGBaseManager";
import { G1 } from "../../Models/ApplicationForms/ApplicationFormsG";
import { ActsMultiCompaniesUI } from "../Fields/ActsMultiCompaniesUI";
import { F1001_DescriptionOfDeclaredStatementFieldUI } from "../Fields/F1001_DescriptionOfDeclaredStatementUI";

interface G1UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const infoTextKeys1 = ['CR_APP_00023_I', 'CR_GL_00042_I', 'CR_APP_00053_I'];
const infoTextKeys2 = ['CR_APP_00104_I'];

@observer class G1UIImpl extends EPZEUBaseComponent<G1UIProps, G1> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.G1} />
            <SectionTitleUI titleKey={'CR_GL_PUBLICATION_ACTS_L'} anchor="publicationActs" />
            <SectionInfoUI infoTextKey={infoTextKeys1} />
            <F1001_DescriptionOfDeclaredStatementFieldUI {...this.bind(m => m.fields.statements)} possibleDocumentTypesGetter={isApplicationFormGManager(this.props.applicationManager) ? this.props.applicationManager.getPossibleActAttachedDocumentTypes : null} />
            {(this.props.applicationManager as any).isMainApplication
                ? <> <SectionTitleUI titleKey={'CR_GL_TRANSFORMING_COMPANIES_L'} anchor="transformingCompanies" />
                    {this.model.documents.filter(x => x.documentTypeID == "5.29").length > 0 ? <SectionInfoUI infoTextKey={infoTextKeys2} /> : null}
                    <ActsMultiCompaniesUI {...this.bind(m => m.actsCompanies)} /></>
                : null}
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        //TRIR-5163 - 2008 година ГФО се е заявявало с Г1
        var possibleDocumentTypesGetter = isApplicationFormGManager(this.props.applicationManager) ? () => {
            return (this.props.applicationManager as IApplicationFormGManager).getPossibleActAttachedDocumentTypes()
                .then(dt => {
                    dt.push({ documentTypeID: '5.2', documentTypeName: null, maxOccurs: null, minOccurs: null })
                    return dt;
                })
        } : null;

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.G1} />
            <SectionTitleUI titleKey={'CR_GL_PUBLICATION_ACTS_L'} anchor="publicationActs" isForPreview={true} />
            <F1001_DescriptionOfDeclaredStatementFieldUI {...this.bind(m => m.fields.statements)} possibleDocumentTypesGetter={possibleDocumentTypesGetter} />
            {(this.props.applicationManager as any).isMainApplication
                ? <> <SectionTitleUI titleKey={'CR_GL_TRANSFORMING_COMPANIES_L'} anchor="transformingCompanies" isForPreview={true} />
                    <ActsMultiCompaniesUI {...this.bind(m => m.actsCompanies)} /></>
                : null}

            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const G1UI = withApplicationFormContext(G1UIImpl);