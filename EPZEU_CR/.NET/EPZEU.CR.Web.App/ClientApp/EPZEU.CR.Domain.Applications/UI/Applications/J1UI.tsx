﻿import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, ApplicationTitleUI, DocumentsUI, ProcessStates, SectionInfoUI, SectionTitleUI, withApplicationFormContext } from "EPZEU.CR.Domain";
import * as React from "react";
import { J1 } from "../../Models/ModelsAutoGenerated";


interface J1UIProps extends BaseProps, ApplicationFormContextProviderProps {
}

const infoTextKeys1 = ['CR_APP_00027_I', 'CR_APP_00029_I'];

class J1UIImpl extends EPZEUBaseComponent<J1UIProps, J1> {

    constructor(props: J1UIProps) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.J1} />
            {this.props.applicationManager.processState == ProcessStates.ForChange ? <SectionInfoUI infoTextKey={infoTextKeys1} /> : null}
            <SectionTitleUI titleKey={'GL_APPLICATION_L'} anchor="application" />
            {
                this.model.incomingNumber && !ObjectHelper.isStringNullOrEmpty(this.model.incomingNumber.incomingNo)
                    ?
                    <>
                        <div className="field-container">
                            <h3 className="field-title field-title--preview">{this.getResource("GL_APPLICATION_NO_L")}</h3>
                            <p className="field-text">{this.model.incomingNumber.incomingNo}</p>


                        </div>
                        <div className="field-container">
                            <h3 className="field-title field-title--preview">{this.getResource("GL_APPLICATION_TYPE_L")}</h3>
                            <div className="record-container record-container--preview">
                                <p className="field-text">{this.props.applicationManager.additionalData && this.props.applicationManager.additionalData.mainAppType ? this.props.applicationManager.additionalData.mainAppType : null}</p>
                            </div>
                        </div>
                    </>
                    : null
            }
            <SectionTitleUI titleKey={'GL_APPLIEDS_L'} anchor="documents" />
            <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <ApplicationTitleUI appType={ApplicationFormTypes.J1} />
            <SectionTitleUI titleKey={'GL_APPLICATION_L'} anchor="application" isForPreview />
            {
                this.model.incomingNumber && !ObjectHelper.isStringNullOrEmpty(this.model.incomingNumber.incomingNo)
                    ?
                    <>
                        <div className="field-container">
                            <h3 className="field-title field-title--preview">{this.getResource("GL_APPLICATION_NO_L")}</h3>
                            <div className="record-container record-container--preview">
                                <p className="field-text">{this.model.incomingNumber.incomingNo}</p>
                            </div>
                        </div>
                        <div className="field-container">
                            <h3 className="field-title field-title--preview">{this.getResource("CR_GL_COMPANY_NAME_L")}</h3>
                            <div className="record-container record-container--preview">
                                <p className="field-text">{this.model.incomingNumber.name ? this.model.incomingNumber.name : null}</p>
                            </div>
                        </div>
                        <div className="field-container">
                            <h3 className="field-title field-title--preview">{this.getResource("CR_GL_COMPANY_ID_L")}</h3>
                            <div className="record-container record-container--preview">
                                <p className="field-text">{(this.model && this.model.uic) ? this.model.uic.text : null}</p>
                            </div>
                        </div>
                        {this.props.applicationManager.additionalData && this.props.applicationManager.additionalData.mainAppType ?
                            <div className="field-container">
                                <h3 className="field-title field-title--preview">{this.getResource("GL_APPLICATION_TYPE_L")}</h3>
                                <div className="record-container record-container--preview">
                                    <p className="field-text">{this.props.applicationManager.additionalData.mainAppType}</p>
                                </div>
                            </div> : null
                        }

                    </>
                    : null
            }
            {this.props.applicationManager.processContext.isDraftApplicationProcess()
                && <>
                    <SectionTitleUI titleKey={'CR_APP_ATTACHED_DOCUMENTS_L'} anchor="documents" isForPreview={true} />
                    <DocumentsUI {...this.bind(m => m.documents)} possibleDocumentTypesGetter={this.props.applicationManager.getPossibleAttachedDocumentTypes} />
                </>
            }
        </>);
    }
}

export const J1UI = withApplicationFormContext(J1UIImpl);