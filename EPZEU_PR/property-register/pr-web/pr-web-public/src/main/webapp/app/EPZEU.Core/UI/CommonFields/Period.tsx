import { BindableReference, moduleContext } from 'Cnsys.Core';
import { runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as moment from 'moment';
import * as React from "react";
import { DateImpl as Date } from './Date';

interface PeriodProps {
    modelReferenceOfFirstDate: BindableReference;
    modelReferenceOfSecondDate: BindableReference;
    dateFormat?: string;
    isValidDate?: (currentDate: any, selectedDate: any) => boolean;
}

@observer export class Period extends React.Component<PeriodProps, any> {

    constructor(props?: PeriodProps, context?: any) {
        super(props, context);

        if (this.props.modelReferenceOfFirstDate ||
            this.props.modelReferenceOfSecondDate
        ) {

            var that = this;
            runInAction("Period:EnsureModelAccess - ctor", () => {

                if (that.props.modelReferenceOfFirstDate)
                    that.props.modelReferenceOfFirstDate.ensureModelAccess();

                if (that.props.modelReferenceOfSecondDate)
                    that.props.modelReferenceOfSecondDate.ensureModelAccess();

            });
        }
    }

    render(): JSX.Element {
        const hasErrors = (this.props.modelReferenceOfFirstDate && this.props.modelReferenceOfFirstDate.hasErrors())
            || (this.props.modelReferenceOfSecondDate && this.props.modelReferenceOfSecondDate.hasErrors());

        return (
            <div className="row">
                <div className="form-group col-auto">
                    <div className="d-flex">
                        <label className="mr-2 col-form-label">{moduleContext.resourceManager.getResourceByKey('GL_START_DATE_L')}</label>
                        <Date modelReference={this.props.modelReferenceOfFirstDate} onChange={this.onFromDateChange} dateFormat={this.props.dateFormat ? this.props.dateFormat : null} isValidDate={this.props.isValidDate ? this.props.isValidDate : null} />
                    </div>
                </div>
                <div className="form-group col-auto">
                    <div className="d-flex">
                        <label className="mr-2 col-form-label">{moduleContext.resourceManager.getResourceByKey('GL_END_DATE_L')}</label>
                        <Date modelReference={this.props.modelReferenceOfSecondDate} onChange={this.onToDateChange} dateFormat={this.props.dateFormat ? this.props.dateFormat : null} isValidDate={this.props.isValidDate ? this.props.isValidDate : null} />
                    </div>
                </div>
                {
                    hasErrors &&
                    <div className='form-group col-12 feedback-up'>
                        <ul className="invalid-feedback">
                            {this.props.modelReferenceOfFirstDate.getErrors().map((err, idx) => { return (<li key={idx}>{err}</li>); })}
                            {this.props.modelReferenceOfSecondDate.getErrors().map((err, idx) => { return (<li key={idx}>{err}</li>); })}
                        </ul>
                    </div>
                }
            </div>
        );
    }

    onFromDateChange(event: any, value: any, modelReference: BindableReference) {
        if (value && moment.isMoment(value)) {
            modelReference.setValue(value.startOf('day'));
        } else {
            modelReference.setValue(value);
        }
    }

    onToDateChange(event: any, value: any, modelReference: BindableReference) {
        if (value && moment.isMoment(value)) {
            modelReference.setValue(value.endOf('day'));
        } else {
            modelReference.setValue(value);
        }
    }
}