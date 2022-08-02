import * as React from "react";
import { observable, action } from 'mobx'
import { observer } from "mobx-react";
import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, attributesClassFormControlMaxL14, ValidationSummaryStrategy, ValidationSummary } from 'EPZEU.Core';
import { IncomingRequestForCorrectionSearchCriteria } from '../Models/IncomingRequestForCorrectionSearch'

interface IncomingRequestForCorrectionSearchCriteriaProps extends BaseProps {
    onSearchCallback: (criteria: IncomingRequestForCorrectionSearchCriteria) => void;
}

const valSummaryPropNames = ["outgoingNumber"];

@observer export class IncomingRequestForCorrectionSearchCriteriaUI extends EPZEUBaseComponent<IncomingRequestForCorrectionSearchCriteriaProps, IncomingRequestForCorrectionSearchCriteria> {

    private groupName: string;

    constructor(props?: IncomingRequestForCorrectionSearchCriteriaProps) {
        super(props);

        this.groupName = ObjectHelper.newGuid();
        this.handleChange = this.handleChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.model.enableIncomingNumber = true;
        this.model.enableEntryNumber = false;
    }

    render(): JSX.Element {

        return <>
            <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            <div className="row">
                <div className="form-group col">
                    {this.labelFor(m => m, 'CR_APP_00038_L', { className: 'field-title field-title--form' })}
                    <div className="custom-control custom-radio">
                        <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_enableIncomingNumber'} name={this.groupName} value={'enableIncomingNumber'} checked={this.model.enableIncomingNumber} />
                        <label className={"custom-control-label"} htmlFor={this.groupName + '_enableIncomingNumber'}>{this.getResource('GL_INCOMING_APPLICATION_NUMBER_L')}</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_enableEntryNumber'} name={this.groupName} value={'enableEntryNumber'} checked={this.model.enableEntryNumber} />
                        <label className={"custom-control-label"} htmlFor={this.groupName + '_enableEntryNumber'}>{this.getResource('CR_GL_ENTRY_NUMBER_L')}</label>
                    </div>
                </div>
            </div>
            <div className="field-container">
                <div className="form-row">
                    {this.model.enableIncomingNumber ?
                        <>
                            <div className="col-12">
                                {
                                    this.labelFor(m => m, 'GL_INCOMING_APPLICATION_NUMBER_L', { className: 'field-title field-title--form' })
                                }
                            </div>
                            <div className="form-group col-12 col-sm-4 col-xl-3">
                                {this.textBoxFor(m => m.incomingNumber, attributesClassFormControlMaxL14)}
                            </div>
                        </>
                        : this.model.enableEntryNumber ?
                            <>
                                <div className="col-12">
                                    {
                                        this.labelFor(m => m, 'CR_GL_ENTRY_NUMBER_L', { className: 'field-title field-title--form ' })
                                    }
                                </div>
                                <div className="form-group col-12 col-sm-4 col-xl-3">
                                    {this.textBoxFor(m => m.entryNumber, attributesClassFormControlMaxL14)}
                                </div>
                            </>

                            : null

                    }
                    <div className="form-group col">
                        <button className="btn btn-outline-light text-dark" onClick={this.onSearch}>
                            <i className="ui-icon ui-icon-import mr-1" aria-hidden="true"></i> {this.getResource('GL_EXTRACT_DATA_L')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    }

    @action private handleChange(e: any) {
        if (e.target.value == 'enableIncomingNumber') {
            this.model.enableIncomingNumber = true;
            this.model.enableEntryNumber = false;

            this.model.entryNumber = null;
        }
        else if (e.target.value == 'enableEntryNumber') {
            this.model.enableEntryNumber = true;
            this.model.enableIncomingNumber = false;

            this.model.incomingNumber = null;
        }
    }

    @action onSearch() {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback(this.model);
        }
    }
}