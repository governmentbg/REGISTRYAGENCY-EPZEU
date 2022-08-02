import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, moduleContext, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import { F002_Company, withFieldRecordContainer, withTextRecordContainer } from 'EPZEU.CR.Domain';
import * as React from 'react';

export const F002_CompanyFieldUI = withFieldRecordContainer(withTextRecordContainer<F002_Company>(), {
    fieldLabelTextKey: "CR_F_2_L",
    isMandatoryField: true,
    fieldLabelFor: (x: F002_Company) => x.text,
});

export class F002_CompanyUI extends EPZEUBaseComponent<BaseProps, F002_Company> {

    renderEdit() {
        return (
            <div className="field-container">
                <div className="row">
                    <div className="col" >
                        {this.labelFor(m => m.text, "CR_F_2_L", { className: 'field-title field-title--form required-field' })}
                        <div className="help-text">
                            <p>{moduleContext.resourceManager.getResourceByKey('CR_APP_00057_I')}<br /></p>
                        </div>
                        {this.textBoxFor(m => m.text)}
                    </div>
                </div>
            </div>
        );
    }

    renderDisplay(): JSX.Element {
        return (<>
            <div className="field-container">
                <div className="row">
                    <div className="col">
                        {this.labelFor(m => m.text, "CR_F_2_L", { className: 'field-title field-title--preview' })}
                        <div className="field-text">{this.model.text}</div>
                        <ValidationSummaryErrorsPreviewUI errors={this.props.modelReference.getErrors()} />
                    </div>
                </div>
            </div>
        </>);
    }
}