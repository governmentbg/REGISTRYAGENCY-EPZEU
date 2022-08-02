﻿import * as React from "react";
import { observable, action } from 'mobx';
import { observer } from "mobx-react";
import * as moment from 'moment';
import { moduleContext } from 'Cnsys.Core';
import { BaseFieldComponent, BaseFieldProps } from '../BaseFieldComponent'

interface DurationProps extends BaseFieldProps {
    showSecondsWithDecimalPoint?: boolean;
}

@observer export class Duration extends BaseFieldComponent<DurationProps> {
    @observable private focusedInputBox: string;
    @observable private focusedInputBoxValue: string;

    constructor(props?: DurationProps, context?: any) {
        super(props, context);

        this.handleDaysChange = this.handleDaysChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleMinutesChange = this.handleMinutesChange.bind(this);
        this.handleSecondsChange = this.handleSecondsChange.bind(this);
        this.handleMillisecondsChange = this.handleMillisecondsChange.bind(this);
        this.removeFocus = this.removeFocus.bind(this);
        this.getDisplayValue = this.getDisplayValue.bind(this);
        this.changeDurationValue = this.changeDurationValue.bind(this);
    }

    @action renderInternal(): JSX.Element {
        var value = this.props.modelReference.getValue();
        let secondsValueAfterDecimalPoint = moment.isDuration(value) ? (value.milliseconds() / 100) : "";
        return (
            <div className="form-inline period-control">
                <div className="form-group">
                    <label className="control-label">{moduleContext.resources.Days}:</label>
                    <input maxLength={2} onBlur={this.removeFocus} value={this.getDisplayValue("days")} onChange={this.handleDaysChange} className={"form-control period-control-2 period-control-distance" + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                </div>
                <div className="form-group">
                    <label className="control-label">{moduleContext.resources.Hours}:</label>
                    <input maxLength={2} onBlur={this.removeFocus} value={this.getDisplayValue("hours")} onChange={this.handleHoursChange} className={"form-control period-control-2 period-control-distance" + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                </div>
                <div className="form-group">
                    <label className="control-label">{moduleContext.resources.Minutes}:</label>
                    <input maxLength={2} onBlur={this.removeFocus} value={this.getDisplayValue("minutes")} onChange={this.handleMinutesChange} className={"form-control period-control-2 period-control-distance" + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                </div>
                <div className="form-group">
                    <label className="control-label">{moduleContext.resources.Seconds}:</label>
                    <input maxLength={2} onBlur={this.removeFocus} value={this.getDisplayValue("seconds")} onChange={this.handleSecondsChange} className={"form-control period-control-2 " + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                    {this.props.showSecondsWithDecimalPoint ? <span className="time-delimiter">.</span> : null}
                    {this.props.showSecondsWithDecimalPoint ?
                        <input maxLength={2} onBlur={this.removeFocus} value={secondsValueAfterDecimalPoint} onChange={this.handleMillisecondsChange} className={"form-control period-control-1" + (this.fieldAttributes ? " " + this.fieldAttributes.className : "")} />
                        : 
                        null
                    }
                    

                </div>
            </div>
        );
    }

    protected getHandleChangeValue(event: any) {
        return event;
    }


    @action private changeDurationValue(property: string, newPropertyValue: number) {
        var value = this.props.modelReference.getValue();
        if (moment.isDuration(value)) {
            let oldDurationValue = value as any;
            // model.days() ще ни върне само дните (месеците ги брои отделно), а ние искаме да извадим всички дни от старата стойност и да ги подменим с въведената.
            // Например: сетнали сме days на 72. model.days() връща 11 (72 - 30 - 31).
            let oldPropertyValue = property == "days" ? parseInt(oldDurationValue.asDays()) : oldDurationValue.get(property);
            let newValue: moment.Duration = oldDurationValue.clone().subtract(oldPropertyValue, property).add(Number(newPropertyValue), property);
            this.props.modelReference.setValue(newValue);
        }
        else {
            this.props.modelReference.setValue(moment()
                .days(property == "days" ? newPropertyValue : 0)
                .hours(property == "hours" ? newPropertyValue : 0)
                .minutes(property == "minutes" ? newPropertyValue : 0)
                .seconds(property == "seconds" ? newPropertyValue : 0));
        }
    }

    @action private handleDaysChange(event: any) {
        let value = event.target.value;

        if (!isNaN(value) && Number(value) <= 99) {
            if (value.length < 2) {
                this.focusedInputBox = "days";
                this.focusedInputBoxValue = value;
            } else {
                this.focusedInputBox = null;
                this.focusedInputBoxValue = null;
            }

            this.changeDurationValue("days", Number(value));
        }
    }

    @action private handleHoursChange(event: any) {
        let value = event.target.value;

        if (!isNaN(value) && Number(value) <= 23) {
            if (value.length < 2 && value < 3) {
                this.focusedInputBox = "hours";
                this.focusedInputBoxValue = value;
            } else {
                this.focusedInputBox = null;
                this.focusedInputBoxValue = null;
            }

            this.changeDurationValue("hours", Number(value));
        }
    }

    @action private handleMinutesChange(event: any) {
        let value = event.target.value;

        if (!isNaN(value) && Number(value) <= 59) {
            if (value.length < 2 && value < 6) {
                this.focusedInputBox = "minutes";
                this.focusedInputBoxValue = value;
            } else {
                this.focusedInputBox = null;
                this.focusedInputBoxValue = null;
            }

            this.changeDurationValue("minutes", Number(value));
        }
    }

    @action private handleSecondsChange(event: any) {
        let value = event.target.value;

        if (!isNaN(value) && Number(value) <= 59) {
            if (value.length < 2 && value < 6) {
                this.focusedInputBox = "seconds";
                this.focusedInputBoxValue = value;
            } else {
                this.focusedInputBox = null;
                this.focusedInputBoxValue = null;
            }

            this.changeDurationValue("seconds", Number(value));
        }
    }

    @action private handleMillisecondsChange(event: any) {
        let value = event.target.value;

        if (!isNaN(value) && Number(value) <= 9) {
            var mrValue = this.props.modelReference.getValue();
            if (moment.isDuration(mrValue)) {
                let oldDurationValue = mrValue;
                let newValue: moment.Duration = oldDurationValue.clone().subtract(oldDurationValue.milliseconds(), "milliseconds").add(Number(value) * 100, "milliseconds");
                this.props.modelReference.setValue(newValue);
            }
            else {
                this.props.modelReference.setValue(moment().days(0).hours(0).minutes(0).seconds(0).milliseconds(value * 100));
            }
        }
    }

    private getDisplayValue(property: string): string {
        let model = this.props.modelReference.getValue();

        if (moment.isDuration(model) == false) {
            return "";
        }

        if (this.focusedInputBox == property) {
            return this.focusedInputBoxValue;
        }

        // model.days() ще ни върне само дните (месеците ги брои отделно), а ние искаме да покажем всички дни
        // Например: сетнали сме days на 72 и съответно искаме да покажем 72. model.days() връща 11 (72 - 30 - 31).
        let displayValue = property == "days" ? parseInt(model.asDays()) : model.get(property);
        return this.formatToTwoDigitsTime(displayValue);
    }

    @action removeFocus() {
        this.focusedInputBox = null;
        this.focusedInputBoxValue = null;
        this.forceUpdate();
    }

    private formatToTwoDigitsTime(value: number): string {
        let result = value.toString();
        if (result.length == 1)
            result = "0" + value;

        return result;
    }
}