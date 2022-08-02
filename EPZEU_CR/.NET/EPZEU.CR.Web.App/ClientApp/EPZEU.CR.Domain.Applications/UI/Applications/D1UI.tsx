import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { D1 } from "../../Models/ApplicationForms/ApplicationForms";
import { F002_CompanyUI } from "../Fields/F002_CompanyUI";
import { F004_TransliterationFieldUI } from "../Fields/F004_TransliterationUI";
import { F027b_EraseReservationFieldUI } from "../Fields/F027b_EraseReservationUI";
import { F029_PersonConcernedUI } from "../Fields/F029_PersonConcernedUI";

interface D1UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const fieldInfoKeysF004 = ['CR_APP_00003_I'];
const infoTextKeys1 = ['CR_APP_00226_I'];

class D1UIImpl extends EPZEUBaseComponent<D1UIProps, D1> {

    renderEdit(): JSX.Element {

        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.D1} />
            <SectionTitleUI titleKey={'CR_GL_COMPANY_NAME_RETENTION_L'} anchor="companyRetention" />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <F002_CompanyUI {...this.bind(m => m.fields.company)} />
            <F004_TransliterationFieldUI fieldInfoKeys={fieldInfoKeysF004} {...this.bind(m => m.fields.transliteration)} />
            <F027b_EraseReservationFieldUI processState={this.props.applicationManager.processState} {...this.bind(m => m.fields.eraseReservation)} />
            <F029_PersonConcernedUI {...this.bind(m => m.fields.personConcerned)} />
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.D1} />            
            <div className="mt-2"></div>
            <SectionTitleUI titleKey={'CR_GL_COMPANY_NAME_RETENTION_L'} anchor="companyRetention" isForPreview={true}  />
            <F002_CompanyUI {...this.bind(m => m.fields.company)} />
            <F004_TransliterationFieldUI {...this.bind(m => m.fields.transliteration)} />
            <F027b_EraseReservationFieldUI processState={this.props.applicationManager.processState} {...this.bind(m => m.fields.eraseReservation)} />
            <F029_PersonConcernedUI {...this.bind(m => m.fields.personConcerned)} />
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const D1UI = withApplicationFormContext(D1UIImpl);