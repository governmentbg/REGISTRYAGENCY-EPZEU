import * as React from "react";
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import * as Datetime from 'react-datetime';
import * as moment from 'moment';
import { ObjectHelper, Helper } from 'Cnsys.Core';
import { BaseFieldComponent, BaseFieldProps } from '../BaseFieldComponent'

interface TimeProps extends BaseFieldProps {
    showSeparateHoursAndMinutes?: boolean
}

@observer export class Time extends BaseFieldComponent<TimeProps> {
    @observable private hours: string;
    @observable private minutes: string;
    private timeImputId: string;

    constructor(props?: TimeProps, context?: any) {
        super(props, context);

        this.timeImputId = ObjectHelper.newGuid();
        this.calendarIconClick = this.calendarIconClick.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleMinutesChange = this.handleMinutesChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.checkAndClear = this.checkAndClear.bind(this);

        if (this.props.showSeparateHoursAndMinutes) {
            var value = this.props.modelReference.getValue();
            this.hours = this.formatToTwoDigitsTime(moment.isMoment(value) ? value.hours().toString() : "")
            this.minutes = this.formatToTwoDigitsTime(moment.isMoment(value) ? value.minutes().toString() : "")
        }
    }

    @action renderInternal() {
        var value = this.props.modelReference.getValue();

        if (this.props.showSeparateHoursAndMinutes) {
            var hours = "";
            var minutes = "";

            if (moment.isMoment(value)) {
                var h = value.hours()
                var m = value.minutes();

                hours = parseInt(this.hours) != h && this.hours != "" ? this.formatToTwoDigitsTime(h.toString()) : this.hours;
                minutes = parseInt(this.minutes) != m && this.minutes != "" ? this.formatToTwoDigitsTime(m.toString()) : this.minutes;
            } else {
                this.hours = "00";
                this.minutes = "00";
            }

            return (
                <div className="inline-control">
                    <div className="inline-group time-control">
                        <div className="inline-control">
                            <input maxLength={2} onBlur={this.formatHoursValue.bind(this)} value={hours} onChange={this.handleHoursChange} className={"form-control" + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                        </div>
                        <div className="inline-control time-delimiter">
                            :
                        </div>
                        <div className="inline-control">
                            <input maxLength={2} onBlur={this.formatMinutesValue.bind(this)} value={minutes} onChange={this.handleMinutesChange} className={"form-control" + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="input-group date-control">
                    <Datetime
                        locale={moment.locale()}
                        dateFormat={false}
                        timeFormat="HH:mm"
                        viewMode="time"
                        value={value || ""}
                        utc={true}
                        inputProps={
                            {
                                className: "form-control" + (this.fieldAttributes ? " " + this.fieldAttributes.className : ""),
                                id: this.timeImputId,
                                onKeyPress: this.onKeyPress,
                                maxLength: 5,
                                onBlur: this.checkAndClear
                            }
                        }
                        onChange={this.onChange} {...this.fieldAttributes} />
                    <div className="input-group-append" style={{ cursor: "pointer" }} onClick={this.calendarIconClick}>
                        <button type='button' className='btn btn-secondary'>
                            <i className="ui-icon ui-icon-clock"></i>
                        </button>
                    </div>
                </div>
            );
        }
    }

    @action private onChange(value: any): void {
        if (value !== '0' && value !== '1' && value !== '2' && value.length == 1) {
            value = '0' + value;
        }

        if (value.length == 2) {
            if (value[1] === ':') {
                value = '0' + value;
            } else {
                value = value + ':';
            }
        }

        this.handleChange(value);
    }

    // we use onKeyPress (not onChange) because even if we prevent change in the onChange method, the model stays unchanged and the component doesn't rerender, but(!)
    // the DateTime (from 'react-datetime') component internally changes its value and renders the change.
    private onKeyPress(e: any): boolean {
        let chr = String.fromCharCode(e.which);
        let isValidChr = Helper.regex.isMatch(chr, '([0-9:])');

        let currentValue = this.props.modelReference.getValue();
        if (currentValue && currentValue.length == 1 && currentValue === '2') {
            if (chr !== '0' && chr !== '1' && chr !== '2' && chr !== '3' && chr !== ':') {
                isValidChr = false;
            }
        }

        if (currentValue && currentValue.length == 3) {
            if (chr !== '0' && chr !== '1' && chr !== '2' && chr !== '3' && chr !== '4' && chr !== '5') {
                isValidChr = false;
            }
        }

        if (!isValidChr)
            e.preventDefault();

        return isValidChr;
    }

    protected calendarIconClick(event: any): void {
        document.getElementById(this.timeImputId).focus();
    }

    protected getHandleChangeValue(event: any) {
        return event;
    }

    @action private handleHoursChange(event: any) {
        var value = event.target.value;

        if (!isNaN(value) || value == "") {
            if ((parseInt(value) >= 0 && parseInt(value) <= 23) || value == "") {
                this.hours = value;

                var mrValue = this.props.modelReference.getValue()

                if (moment.isMoment(mrValue))
                    this.props.modelReference.setValue(mrValue.hours(!isNaN(parseInt(value)) ? parseInt(this.hours) : 0));
                else
                    this.props.modelReference.setValue(moment().hours(!isNaN(parseInt(value)) ? parseInt(this.hours) : 0).minutes(0));
            }
        }
    }

    @action private handleMinutesChange(event: any) {
        var value = event.target.value;

        if (!isNaN(value) || value == "") {
            if ((parseInt(value) >= 0 && parseInt(value) <= 59) || value == "") {
                this.minutes = value;

                var mrValue = this.props.modelReference.getValue()

                if (moment.isMoment(mrValue))
                    this.props.modelReference.setValue(moment(mrValue).minutes(!isNaN(parseInt(value)) ? parseInt(this.minutes) : 0));
                else
                    this.props.modelReference.setValue(moment().hours(0).minutes(!isNaN(parseInt(value)) ? parseInt(value) : 0));
            }
        }
    }

    formatHoursValue() {
        if (this.hours.length == 1)
            this.hours = "0" + this.hours;
        else if (this.hours == "")
            this.hours = "00"

        this.forceUpdate();
    }

    formatMinutesValue() {
        if (this.minutes.length == 1)
            this.minutes = "0" + this.minutes;
        else if (this.minutes == "")
            this.minutes = "00"

        this.forceUpdate();
    }

    formatToTwoDigitsTime(value: string) {
        if (value.length == 1)
            value = "0" + value;

        return value;
    }

    checkAndClear(event: any) {
        var value = this.props.modelReference.getValue();

        if (value === '0' || value === '1' || value === '2') {
            value = '0' + value + ':';
        }

        if ((ObjectHelper.isStringNullOrEmpty(value) == false) && value.length == 3) {
            this.props.modelReference.setValue(moment().hours(Number((value as string).slice(0, 2))).minutes(0));
            value = this.props.modelReference.getValue();
        }

        if (value != undefined && !moment.isMoment(value)) {
            this.props.modelReference.setValue(null);
        }
    }
}
