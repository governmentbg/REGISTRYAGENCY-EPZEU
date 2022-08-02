import { BindableReference, IModelErrors } from 'Cnsys.Core';
import { BaseComponent, BaseProps, SelectListItem } from 'Cnsys.UI.React';
import * as moment from 'moment';
import * as React from "react";
import { moduleContext } from '../ModuleContext';
import { Date } from './CommonFields/Date';
import { DateTime } from './CommonFields/DateTime';
import { TextArea } from './CommonFields/TextArea';
import { TextBox } from './CommonFields/TextBox';
import { DropDownList } from './CommonFields/DropDownList';

//TODO: Да се обмисли дали да се ползва или да се разкара и да се замени с алтернативно решение. Използва за disable на районите в адреса и за компонентата на датата, тък като
// там не сработва disable-а с JQuary.
export const DisabledContentContext = (React as any).createContext();

export var attributesClassFormControl = { className: 'form-control' };
export var attributesClassCustomControlInput = { className: "custom-control-input" };
export var attributesClassCustomControlLabel = { className: "custom-control-label" };
var txtBoxLabelForAttributes = { className: "ml-2 col-form-label" };
export var fieldTitleLabelAttributes = { className: "field-title field-title--form" };
export var attributesClassFormControlDisabled = { className: 'form-control', disabled: true };
export var attributesClassFormControlTextRight = { className: "form-control text-right" };
export var attributesClassFormControlMaxL2 = { className: 'form-control', maxLength: 2 }
export var attributesClassFormControlMaxL3 = { className: 'form-control', maxLength: 3 }
export var attributesClassFormControlMaxL4 = { className: 'form-control', maxLength: 4 }
export var attributesClassFormControlMaxL8 = { className: 'form-control', maxLength: 8 }
export var attributesClassFormControlMaxL9 = { className: 'form-control', maxLength: 9 }
export var attributesClassFormControlMaxL10 = { className: 'form-control', maxLength: 10 };
export var attributesClassFormControlMaxL13 = { className: 'form-control', maxLength: 13 };
export var attributesClassFormControlMaxL500 = { className: 'form-control', maxLength: 500 };
export var attributesClassFormControlMaxL13TextRight = { className: "form-control text-right", maxLength: 13 }
export var attributesClassFormControlMaxL14 = { className: 'form-control', maxLength: 14 };
export var attributesClassFormControlMaxL22 = { className: 'form-control', maxLength: 22 }
export var attributesClassFormControlMaxL50 = { className: 'form-control', maxLength: 50 }
export var labelForAttributes = { className: 'mr-2 col-form-label' };
export var fieldTittleAttribute = { className: 'field-title' };
export var fieldTittleRequiredAttributes = { className: 'field-title field-title--form required-field' };
export var requiredFieldAttribute = { className: 'required-field' };
export var controlLabelRequiredField = { className: 'control-label required-field' };
export var attributesClassControlLabel = { className: 'control-label' };
export var attributesClassFieldTittlePreview = { className: 'field-title field-title--preview' };

export abstract class EPZEUBaseComponent<TProps extends BaseProps, TModel extends IModelErrors> extends BaseComponent<TProps, TModel> {
    constructor(props?: TProps, context?: any) {
        super(props, context);
    }

    protected getResource(resourceKey: string) {
        return moduleContext.resourceManager.getResourceByKey(resourceKey);
    }

    protected labelFor(selector: (model: TModel) => any, labelKey?: string, attributes?: any): any {
        var labelResource = labelKey ? moduleContext.resourceManager.getResourceByKey(labelKey) : null;
        return super.labelFor(selector, labelResource, attributes)
    }

    protected textBoxFor(selector: (model: TModel) => any, attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void, suffixTextKey?: string): any {

        attributes = attributes ? attributes : attributesClassFormControl;

        if (suffixTextKey) {
            return <span className="input-group">
                <TextBox {...this.bind(selector)} attributes={attributes} onChange={onChange} />
                {this.labelFor(selector, suffixTextKey, txtBoxLabelForAttributes)}
            </span>
        }

        return <TextBox {...this.bind(selector)} attributes={attributes} onChange={onChange} />;
    }

    protected textAreaFor(selector: (model: TModel) => string, cols?: number, rows?: number, attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void): any {
        attributes = attributes ? attributes : attributesClassFormControl;

        return <TextArea {...this.bind(selector)} cols={cols} rows={rows} attributes={attributes} onChange={onChange} />;
    }

    protected dropDownListFor(selector: (model: TModel) => any, items: SelectListItem[], attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void, hasEmptyElement?: boolean, emptyElementValue?: string): any {
        attributes = attributes ? attributes : attributesClassFormControl;

        return <DropDownList {...this.bind(selector)} items={items} attributes={attributes} onChange={onChange} hasEmptyElement={hasEmptyElement} emptyElementValue={emptyElementValue} />;
    }

    protected checkBoxFor(selector: (model: TModel) => boolean, labelTextKey?: string, attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void): any {
        var labelText = labelTextKey ? labelTextKey : null;
        return <>
            {super.checkBoxFor(selector, !attributes ? attributesClassCustomControlInput : attributes, onChange)}
            {this.labelFor(selector, labelText, attributesClassCustomControlLabel)}
        </>
    }

    //#region
    //Date

    protected dateFor(selector: (model: TModel) => any, dateFormat?: string, isValidDate?: (currentDate: any, selectedDate: any) => boolean, attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void): any;
    protected dateFor(propertyName: string, dateFormat?: string, isValidDate?: (currentDate: any, selectedDate: any) => boolean, attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void): any;
    protected dateFor(selector: any, dateFormat?: string, isValidDate?: (currentDate: any, selectedDate: any) => boolean, attributes?: any, onChange?: (event: any, value: any, modelReference: BindableReference) => void): any {
        return <DisabledContentContext.Consumer>
            {
                (hasDisabledContent: any) => {
                    return <Date disabled={hasDisabledContent} {...this.bind(selector)} attributes={attributes} onChange={onChange} dateFormat={dateFormat ? dateFormat : null} isValidDate={isValidDate ? isValidDate : null} />;
                }
            }
        </DisabledContentContext.Consumer>
    }

    protected dateDisplayFor(date: moment.Moment, format?: string, abbr?:string) {
        if (date && moment.isMoment(date)) {
            if (format)
                return abbr ? `${date.format(format)} ${abbr}` : date.format(format);
            else
                return abbr ? `${date.format("l")} ${abbr}` : date.format("l")
        } 

        return "";
    }

    protected dateTimeFor(selector: (model: TModel) => any, attributes?: any, dateFormat?: string | boolean, showSeparateDateAndTime?: boolean): any {
        return <DateTime {...this.bind(selector)} attributes={attributes} dateFormat={dateFormat} showSeparateDateAndTime={showSeparateDateAndTime} />
    }

    //#endregion
}