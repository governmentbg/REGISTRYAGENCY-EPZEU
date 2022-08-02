import { appConfig, ObjectHelper } from 'Cnsys.Core';
import { BaseFieldComponent, BaseFieldProps } from 'Cnsys.UI.React';
import { observable } from 'mobx';
import { observer } from "mobx-react";
import * as moment from 'moment';
import { isMoment } from "moment";
import * as React from "react";
import * as Datetime from 'react-datetime';
import { withSimpleErrorLabel } from "../withSimpleErrorLabel";

interface DateProps extends BaseFieldProps {
    dateFormat?: string;
    isValidDate?: (currentDate: any, selectedDate: any) => boolean;
    disabled?: boolean;
}

@observer export class DateImpl extends BaseFieldComponent<DateProps> {
    dateTimeImputId: string;
    @observable date: any;

    constructor(props?: DateProps, context?: any) {
        super(props, context);

        this.dateTimeImputId = ObjectHelper.newGuid();
        this.calendarIconClick = this.calendarIconClick.bind(this);
        this.checkAndClear = this.checkAndClear.bind(this);
    }

    renderInternal() {
        return (
            <div className="input-group date-control">
                <Datetime
                    locale={moment.locale()}
                    timeFormat={false}
                    value={this.props.modelReference.getValue() || ""}
                    inputProps={{ disabled: this.props.disabled, onBlur: this.checkAndClear, className: "form-control" + (this.fieldAttributes ? " " + this.fieldAttributes.className : ""), id: this.dateTimeImputId }}
                    inputFormat={moment.defaultFormat}
                    onChange={this.handleChange}
                    closeOnSelect={true}                    
                    dateFormat={this.props.dateFormat ? this.props.dateFormat : true}
                    isValidDate={this.props.isValidDate ? this.props.isValidDate : null}
                    {...this.fieldAttributes}
                />

                <div className="input-group-append" onClick={this.calendarIconClick}>
                    <button className="btn btn-secondary" type="button">
                        <i className="ui-icon ui-icon-calendar"></i>
                    </button>
                </div>
            </div>
        );
    }

    protected calendarIconClick(event: any): void {
        document.getElementById(this.dateTimeImputId).focus();
    }

    protected getHandleChangeValue(event: any) {
        var date: moment.Moment = event;

        return date;
    }

    checkAndClear(event: any) {
        var value = this.props.modelReference.getValue();

        if (value != undefined && !isMoment(value))
            this.props.modelReference.setValue(null);
    }
}

export const Date = withSimpleErrorLabel(DateImpl);