import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, attributesClassFormControlMaxL14, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { action } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { AppealRefusalSearchCriteria } from '../Models/AppealRefusalSearch';

interface AppealRefusalSearchCriteriaProps extends BaseProps {
    onSearchCallback: (criteria: AppealRefusalSearchCriteria) => void;
}

const valSummaryPropNames = ["outgoingNumber"];

@observer export class AppealRefusalSearchCriteriaUI extends EPZEUBaseComponent<AppealRefusalSearchCriteriaProps, AppealRefusalSearchCriteria> {

    constructor(props?: AppealRefusalSearchCriteriaProps) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    render(): JSX.Element {
        let that = this;

        return <>
            <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} />

            <div className="field-container">
                <div className="form-row">
                    <div className="col-12">
                        {this.labelFor(m => m, 'GL_INCOMING_APPLICATION_NUMBER_L', { className: 'field-title field-title--form' })}
                    </div>
                    <div className="form-group col-12 col-sm-4 col-xl-3">
                        {this.textBoxFor(m => m.incomingNumber, attributesClassFormControlMaxL14)}
                    </div>
                    <div className="form-group col">
                        <button className="btn btn-outline-light text-dark" onClick={this.onSearch}>
                            <i className="ui-icon ui-icon-import mr-1" aria-hidden="true"></i> {this.getResource('GL_EXTRACT_DATA_L')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    }

    @action onSearch() {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback(this.model);
        }
    }
}