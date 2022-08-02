import { ObjectHelper } from 'Cnsys.Core';
import { BaseFieldComponent, BaseFieldProps } from 'Cnsys.UI.React';
import { action, observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { withSimpleErrorLabel } from "../withSimpleErrorLabel";

interface AutoCompleteProps extends BaseFieldProps {
    selector: (value?: string) => Promise<any[]>;
    handleSelectCallback: (value: any) => any;
    showValue: (item: any) => string;
    hasSelectedValue: boolean;
    handleChangeCallback: (value: any) => any;
    triggerLength?: number;
    placeholder?: string;
}

@observer class AutoCompleteImpl extends BaseFieldComponent<AutoCompleteProps> {
    @observable private selectOptions: any[];
    @observable private text: string = "";
    @observable private indexOfCurrentSelection: number;

    private isSelectedOption: boolean = undefined;
    private autoCompleteRef: any;
    private id: string;

    constructor(props: AutoCompleteProps, context?: any) {
        super(props, context);

        this.documentClickDelegat = this.documentClickDelegat.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKey = this.handleKey.bind(this);

        this.id = ObjectHelper.newGuid();

        document.addEventListener('onerror', (error) => alert(error))
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClickDelegat);
    }

    //#region renders

    renderInternal() {
        var value = this.props.modelReference ? this.props.modelReference.getValue() ? this.props.modelReference.getValue() : "" : this.text;

        return (<span className="auto-complete-container" id={this.id}>
            <input onKeyDown={this.handleKey}
                onFocus={this.handleFocus}
                type="text"
                placeholder={this.props.placeholder ? this.props.placeholder : ""}
                onChange={this.handleChange}
                value={value}
                name={this.props.modelReference ? this.getName() : ""}
                id={this.props.modelReference ? this.getId() : ""}
                autoComplete="off"
                {...this.fieldAttributes} />
            {this.renderSelectOptions()}
        </span>);
    }

    private renderSelectOptions() {

        if (this.selectOptions && this.selectOptions.length > 0) {
            return (
                <ul className={'auto-complete-options'} ref={(ref) => { this.autoCompleteRef = ref }}>
                    {this.selectOptions.map((item, i: number) => {
                        var value = this.props.showValue(item);
                        return <li className={this.indexOfCurrentSelection == i ? "auto-complete-active-option" : null} onMouseOver={() => this.handleMouseOver(i)} key={i} onClick={() => this.handleSelect(this.selectOptions[i], value)}>{value}</li>
                    })}
                </ul>)
        }
    }

    //#endregion

    //#region helpers

    private moveToSelectedElement() {
        var scrollTo = 0;

        if (this.indexOfCurrentSelection > 2)
            scrollTo = this.indexOfCurrentSelection * 29;
        else
            scrollTo = 0;

        $(this.autoCompleteRef).animate({ scrollTop: scrollTo + 'px' }, 'fast')
    }

    @action private clearAutoCompleteState() {
        if (this.selectOptions == null ||
            this.selectOptions.length > 0)
            this.selectOptions = [];

        if (this.indexOfCurrentSelection != null)
            this.indexOfCurrentSelection = null;

        if (!this.isSelectedOption && !this.props.hasSelectedValue)
            this.setValue("")
    }

    private setValue(value: any) {
        if (this.props.modelReference) {
            let currentValue = this.props.modelReference.getValue()

            if (currentValue != value)
                this.props.modelReference.setValue(value);
        } else
            this.text = value;
    }

    //#endregion

    //#region event handlers

    private handleFocus(e: any) {
        //За да се отваря падащото меню с опциите на onfocus
        if (this.props.triggerLength == 0 || (e.target.value && this.props.triggerLength <= e.target.value.length) || (!this.props.triggerLength && e.target.value.length >= 3))
            this.handleChange(e, true);
    }

    @action documentClickDelegat(event: any): void {
        if ($(event.target).parents(`#${this.id}`).length == 0) {
            /*проверките се правят, за да не се променят обектите ненужно заради mobx*/
            this.clearAutoCompleteState();
        }
    }

    @action handleChange(e: any, preventChangeCallback?: boolean) {

        var value: string = e.target.value;
        this.indexOfCurrentSelection = null;
        this.setValue(value);

        if (this.props.handleChangeCallback && !preventChangeCallback) {
            this.props.handleChangeCallback(e);
            this.isSelectedOption = false;
        }

        if ((this.props.triggerLength != null && this.props.triggerLength != undefined && (this.props.triggerLength <= value.length || value.length == 0)) || (!this.props.triggerLength && 3 <= value.length)) {
            this.props.selector(value).bind(this).then(items => this.selectOptions = items);
            document.addEventListener("click", this.documentClickDelegat);

        } else if (value.length >= 0)
            this.selectOptions = [];
        else
            this.props.handleSelectCallback(null);
    }

    @action private handleSelect(obj: any, value: any) {
        this.selectOptions = []
        this.setValue(value);
        this.isSelectedOption = true;

        this.props.handleSelectCallback(obj);
    }

    //#endregion

    //#region keys handlers

    handleKey(e: any) {
        if (e.keyCode == 13 || e.keyCode == 9)
            this.handleEnterOrTab(e);
        else if (e.keyCode == 40)
            this.handleArrowDown(e);//Arrow down key
        else if (e.keyCode == 38)
            this.handleArrowUp(e);//Arrow up key
    }

    private handleEnterOrTab(еvent: any) {
        if (this.selectOptions && this.selectOptions.length > 0 && this.indexOfCurrentSelection != null && this.indexOfCurrentSelection != undefined) {
            var value = this.props.showValue(this.selectOptions[this.indexOfCurrentSelection]);
            this.handleSelect(this.selectOptions[this.indexOfCurrentSelection], value);
            event.preventDefault();
        } else
            this.clearAutoCompleteState();
    }

    private handleMouseOver(currentIndex: number) {
        this.indexOfCurrentSelection = currentIndex;
    }

    private handleArrowDown(event: any) {
        if (this.selectOptions && this.selectOptions.length > 0) {
            if (this.indexOfCurrentSelection == null && this.indexOfCurrentSelection == undefined)
                this.indexOfCurrentSelection = 0;
            else {
                if (this.indexOfCurrentSelection + 1 > this.selectOptions.length - 1)
                    this.indexOfCurrentSelection = 0;
                else
                    this.indexOfCurrentSelection += 1;
            }

            event.preventDefault();
            this.moveToSelectedElement();
        }
    }

    private handleArrowUp(event: any) {
        if (this.selectOptions && this.selectOptions.length > 0) {
            if (this.indexOfCurrentSelection == null && this.indexOfCurrentSelection == undefined)
                this.indexOfCurrentSelection = this.selectOptions.length - 1;
            else {
                if (this.indexOfCurrentSelection - 1 < 0)
                    this.indexOfCurrentSelection = this.selectOptions.length - 1;
                else
                    this.indexOfCurrentSelection -= 1;
            }

            event.preventDefault();
            this.moveToSelectedElement();
        }
    }

    //#endregion
}

export const AutoComplete = withSimpleErrorLabel(AutoCompleteImpl);