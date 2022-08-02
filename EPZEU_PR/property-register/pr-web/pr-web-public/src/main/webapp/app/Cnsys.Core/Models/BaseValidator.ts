import { action } from 'mobx';
import * as moment from 'moment';
import { Dictionary } from 'typescript-collections';
import { Helper, ObjectHelper, ValidationHelper } from '../Common';
import { defaultErrorLevel, ErrorLevels, IModelErrors } from './BaseDataModel';

export interface IBaseValidator<TModel extends IModelErrors, TValidationContext> {
    validate(model: TModel): boolean;

    validateProperty(propertyName: string, model: TModel): boolean;

    validateProperty(selector: (model: TModel) => any, model: TModel): boolean;

    getPropertyValidators(propertyName: string): IBaseValidator<IModelErrors, TValidationContext>[];

    getPropertyValidators(selector: (model: TModel) => any): IBaseValidator<IModelErrors, TValidationContext>[];

    setValidationContext(validationContext: TValidationContext): void;

    getValidationContext(): TValidationContext;
}

export class BaseValidator<TModel extends IModelErrors, TValidationContext> implements IBaseValidator<TModel, TValidationContext> {

    validationContext: TValidationContext = null;
    validationsDictionary: Dictionary<string, Validation<TModel, TValidationContext>[]> = new Dictionary<string, Validation<TModel, TValidationContext>[]>();
    validations: Validation<TModel, TValidationContext>[] = [];

    //#region IBaseValidator

    @action validate(obj: TModel): boolean {
        if (obj && obj.clearErrors && ObjectHelper.isFunction(obj.clearErrors))
            obj.clearErrors();

        var lambdaFuncErrors = this.validations.filter(v => {
            var propValue = v.propSelector(obj);

            if (v.condition && !v.condition(obj, propValue)) {
                return false;
            }

            if (v.validationFunc && !v.propValidator) {
                return !v.validationFunc(obj, propValue);
            }

            return false;
        }).map(function (x: Validation<TModel, TValidationContext>) {
            return {
                errorMessage: x.getMessage === undefined ? x.message : x.getMessage(obj, x.propName),
                propertyName: x.propName,
                errorLevel: x.errorLevel
            }
        });

        var propValidatorsWithErrors = this.validations.filter(v => {
            var propValue = v.propSelector(obj);

            if (v.condition && !v.condition(obj, propValue)) {
                return false;
            }

            if (v.validationFunc && v.propValidator) {
                return !v.validationFunc(obj, propValue);
            }

            return false;
        });

        var isValid = propValidatorsWithErrors.length == 0 && lambdaFuncErrors.length == 0;

        if (!isValid) {
            for (var err of lambdaFuncErrors) {
                if (err.errorMessage) {
                    obj.addError(err.propertyName, err.errorMessage, err.errorLevel);
                }
            }
        }

        return isValid;
    }

    validateProperty(propertyName: string, obj: TModel): boolean;

    validateProperty(selector: (model: TModel) => any, model: TModel): boolean;

    validateProperty(propertyName: string, obj: TModel, notRevalidate?: boolean): boolean;

    @action validateProperty(property: any, obj: TModel, notRevalidate?: boolean): boolean {
        let propertyName: string;

        if (ObjectHelper.isFunction(property)) {
            propertyName = Helper.getPropertyNameBySelector(property);
        }
        else {
            propertyName = property;
        }

        if (!this.validationsDictionary.containsKey(propertyName)) {
            if (obj.removeError && ObjectHelper.isFunction(obj.removeError))
                obj.removeError(propertyName);

            return true;
        }
        else {

            var validations = this.validationsDictionary.getValue(propertyName);

            ///Ако има пропартита за които е сетнат флаг revalidateOnModelChange ги валидираме на ново
            if (!notRevalidate) {
                var propsToRevalidate: string[] = [];
                var valWithRevalidate = validations.filter(v => v.revalidateOnModelChange);

                if (valWithRevalidate && valWithRevalidate.length > 0) {
                    for (let val of valWithRevalidate) {
                        if (val.propName != propertyName && !propsToRevalidate.filter(pn => pn == val.propName)) {
                            propsToRevalidate.push(val.propName);
                        }
                    }

                    if (propsToRevalidate.length > 0) {
                        for (let prop of propsToRevalidate) {
                            this.validateProperty(prop, obj, true);
                        }
                    }
                }
            }

            var lambdaFuncErrors = validations.filter(v => {
                var propValue = v.propSelector(obj);

                if (v.condition && !v.condition(obj, propValue)) {
                    return false;
                }

                if (v.validationFunc && !v.propValidator) {
                    return !v.validationFunc(obj, propValue);
                }

                return false;
            }).map(function (x: Validation<TModel, TValidationContext>) {
                return {
                    errorMessage: x.getMessage === undefined ? x.message : x.getMessage(obj, x.propName),
                    propertyName: x.propName,
                    errorLevel: x.errorLevel
                }
            });

            var propValidatorsWithErrors = validations.filter(v => {
                var propValue = v.propSelector(obj);

                if (v.condition && !v.condition(obj, propValue)) {
                    return false;
                }

                if (v.validationFunc && v.propValidator) {
                    return !v.validationFunc(obj, propValue);;
                }

                return false;
            });

            var isPropValid = lambdaFuncErrors.length == 0 && propValidatorsWithErrors.length == 0;

            if (!isPropValid) {
                obj.removeError(propertyName);

                for (var err of lambdaFuncErrors) {
                    if (err.errorMessage) {
                        obj.addError(propertyName, err.errorMessage, err.errorLevel);
                    }
                }
            }
            else {
                obj.removeError(propertyName);
            }

            return isPropValid;
        }
    }

    getPropertyValidators(propertyName: string): IBaseValidator<IModelErrors, TValidationContext>[];

    getPropertyValidators(selector: (model: TModel) => any): IBaseValidator<IModelErrors, TValidationContext>[];

    getPropertyValidators(property: any): IBaseValidator<IModelErrors, TValidationContext>[] | undefined {
        var propertyName: string;

        if (ObjectHelper.isFunction(property)) {
            propertyName = Helper.getPropertyNameBySelector(property);
        }
        else {
            propertyName = property;
        }

        if (ObjectHelper.isStringNullOrEmpty(propertyName))
            return undefined;

        return this.getPropVals(property);
    }

    setValidationContext(validationContext: TValidationContext): void {
        this.validationContext = validationContext;

        for (let i: number = 0; i < this.validations.length; i++) {
            let currValidator = this.validations[i].propValidator;

            if (currValidator) {
                currValidator.setValidationContext(this.validationContext);
            }
        }
    }

    getValidationContext(): TValidationContext {
        return this.validationContext;
    }

    //#endregion

    //#region RuleFor function

    protected ruleFor(propSelector: (model: TModel) => any): IValidationRules<TModel, TValidationContext>;

    protected ruleFor(propName: string): IValidationRules<TModel, TValidationContext>;

    protected ruleFor(propSelector: any): IValidationRules<TModel, TValidationContext> {
        var that = this;

        var prop: (obj: TModel) => any,
            propName: string;

        if (ObjectHelper.isFunction(propSelector)) {
            propName = Helper.getPropertyNameBySelector(propSelector);
            prop = propSelector;
        }
        else {
            propName = propSelector;
            //TODO да се помисли
            prop = function (x) {
                //TODO да се помисли
                //return this.get_deep_index(x, propName);
                throw new Error("Not implemented");
            }
        }

        let validation: Validation<TModel, TValidationContext> = {
            propSelector: prop,
            propName: propName,
            errorLevel: defaultErrorLevel
        };

        if (!this.validationsDictionary.containsKey(propName)) {
            this.validationsDictionary.setValue(propName, []);
        }

        this.validationsDictionary.getValue(propName).push(validation);
        this.validations.push(validation);

        const emailPattern = /(?=^.{1,64}@)^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?=.{1,255}$|.{1,255};)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])(;(?=.{1,64}@)[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?=.{1,255}$|.{1,255};)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9]))*$/i;

        return {
            must(validationFunc: (obj: TModel, value: any) => boolean, propValidator?: IBaseValidator<IModelErrors, TValidationContext>): IValidationAdditionalData<TModel> {
                validation.validationFunc = validationFunc;
                validation.propValidator = propValidator;

                var tObj = {
                    withMessage: function (msg: any) {
                        if (msg && typeof (msg) == "string") {
                            validation.message = propName ? msg.replace('{propertyName}', propName) : msg;
                        }
                        else if (msg && typeof (msg) == "function") {
                            validation.getMessage = msg;
                        }
                        return tObj;
                    },
                    when: function (condition: (obj: TModel, value: any) => boolean) {
                        validation.condition = condition;
                        return tObj;
                    },
                    revalidateOnModelChange: function () {
                        validation.revalidateOnModelChange = true;

                        return tObj;
                    },
                    setErrorLevelStrict: function () {
                        validation.errorLevel = ErrorLevels.Error;
                    },
                    setErrorLevelInformation: function () {
                        validation.errorLevel = ErrorLevels.Information;
                    }
                }

                return tObj;
            },
            setValidator(validator: IBaseValidator<IModelErrors, TValidationContext>): IValidationAdditionalData<TModel> {

                var v = this.must((obj: TModel, x: any) => { return that.execInternalValidator(x, validator) }, validator);
                v.withMessage("");

                return v;
            },
            setCollectionValidator: function (validator: IBaseValidator<IModelErrors, TValidationContext>): IValidationAdditionalData<TModel> {
                var v = this.must(function (obj: TModel, collection: any[]) {
                    if (ObjectHelper.isArrayNullOrEmpty(collection)) {
                        return true;
                    }
                    else {
                        var isValid = true;

                        for (var elem of collection) {
                            isValid = that.execInternalValidator(elem, validator) && isValid;
                        }

                        return isValid;
                    }
                }, validator);

                v.withMessage("");

                return v;
            },
            //Built in validators
            notNull: function (): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) { return x != undefined && x != null && !ObjectHelper.isStringNullOrEmpty(x); });
                v.withMessage("'{propertyName}' must not be null.");
                return v;

            },
            notEmpty: function (): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    if (x === undefined || x === null) return false;
                    if (Number(x)) return x != 0;
                    if (ObjectHelper.isArray(x)) return x.length > 0;
                    return x.toString().trim() != '';
                });
                v.withMessage("'{propertyName}' must not be empty.");
                return v;

            },
            notEqual: function (valueToCompare: any): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    var val = valueToCompare;
                    if (ObjectHelper.isFunction(valueToCompare)) {
                        val = valueToCompare(obj);

                    }
                    return x !== val;
                });

                if (!ObjectHelper.isFunction(valueToCompare))
                    v.withMessage("'{propertyName}' must not be equal to '" + valueToCompare + "'.");

                return v;

            },
            equal: function (valueToCompare: any): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    var val = valueToCompare;
                    if (ObjectHelper.isFunction(valueToCompare)) {
                        val = valueToCompare(obj);

                    }
                    return x === val;
                });

                if (!ObjectHelper.isFunction(valueToCompare))
                    v.withMessage("'{propertyName}' must be equal to '" + valueToCompare + "'.");

                return v;

            },
            length: function (min: number, max?: number): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    var iMax = max || (x || '').length;
                    return ObjectHelper.isStringNullOrEmpty(x) || x.length >= min && x.length <= iMax;
                });
                if (max == undefined)
                    v.withMessage("'{propertyName}' must be at least " + min + " characters.");
                else
                    v.withMessage("'{propertyName}' must be between" + min + " and " + max + " characters.");
                return v;

            },
            lessThan: function (valueToCompare: any): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    x = parseFloat(x);
                    var val = valueToCompare;
                    if (ObjectHelper.isFunction(valueToCompare)) {
                        val = valueToCompare(obj);

                    }
                    return x < val;
                });

                if (!ObjectHelper.isFunction(valueToCompare))
                    v.withMessage("'{propertyName}' must be less than '" + valueToCompare + "'.");

                return v;

            },
            lessThanOrEqualTo: function (valueToCompare: any): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    x = parseFloat(x);
                    var val = valueToCompare;
                    if (ObjectHelper.isFunction(valueToCompare)) {
                        val = valueToCompare(obj);

                    }
                    return x <= val;
                });

                if (!ObjectHelper.isFunction(valueToCompare))
                    v.withMessage("'{propertyName}' must be less than or equal to '" + valueToCompare + "'.");

                return v;

            },
            greaterThan: function (valueToCompare: any) {

                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    x = parseFloat(x);
                    var val = valueToCompare;
                    if (ObjectHelper.isFunction(valueToCompare)) {
                        val = valueToCompare(obj);

                    }

                    return x > val;
                });

                if (!ObjectHelper.isFunction(valueToCompare))
                    v.withMessage("'{propertyName}' must be greater than '" + valueToCompare + "'.");

                return v;

            },

            greaterThanOrEqualTo: function (valueToCompare: any): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    x = parseFloat(x);
                    var val = valueToCompare;
                    if (ObjectHelper.isFunction(valueToCompare)) {
                        val = valueToCompare(obj);

                    }
                    return x >= val;
                });

                if (!ObjectHelper.isFunction(valueToCompare))
                    v.withMessage("'{propertyName}' must be greater than or equal to '" + valueToCompare + "'.");

                return v;

            },

            matches: function (regexPattern: string, flags?: string): IValidationAdditionalData<TModel> {
                // проверката за липсваща стойност се прави от notNull()
                var v = this.must(function (obj: TModel, x: any) { return x == undefined || x == null || x=='' || Helper.regex.isMatch(x, regexPattern, flags) });


                v.withMessage("'{propertyName}' is not in the correct format.");

                return v;

            },
            emailAddress: function (): IValidationAdditionalData<TModel> {
                // проверката за липсваща стойност се прави от notNull()
                var v = this.must(function (obj: TModel, x: any) { return x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x) || emailPattern.test(x) });

                v.withMessage("'{propertyName}' is not a valid email address.");

                return v;

            },
            multiEmailAddresses: function (): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {

                    if (ObjectHelper.isStringNullOrEmpty(x))
                        return true;

                    let emailAddresses;
                    emailAddresses = x.split(';');

                    for (var i = 0; i < emailAddresses.length; i++) {

                        if (!emailPattern.test(emailAddresses[i].trim()))
                            return false;
                    }

                    return true
                });


                v.withMessage("'{propertyName}' is not a valid email address.");

                return v;
            },
            isValidDate: function (): IValidationAdditionalData<TModel> {
                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x)) || x instanceof moment)
                        return true;
                    else
                        return false;
                });

                v.withMessage("'{propertyName}' is not a valid Date.");

                return v;
            },
            isValidEGN: function (): IValidationAdditionalData<TModel> {
                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }
                    if (x.length != 10)
                        return false;
                    if (/[^0-9]/.test(x))
                        return false;
                    var year = Number(x.slice(0, 2));
                    var month = Number(x.slice(2, 4));
                    var day = Number(x.slice(4, 6));

                    if (month >= 40) {
                        year += 2000;
                        month -= 40;
                    } else if (month >= 20) {
                        year += 1800;
                        month -= 20;
                    } else {
                        year += 1900;
                    }
                    var date = new Date(year, month - 1, day);
                    if (!(date && (date.getMonth() + 1) == month && date.getDate() == Number(day)))
                        return false;
                    var checkSum = 0;
                    var weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];

                    for (var ii = 0; ii < weights.length; ++ii) {
                        checkSum += weights[ii] * Number(x.charAt(ii));
                    }

                    checkSum %= 11;
                    checkSum %= 10;

                    if (checkSum !== Number(x.charAt(9)))
                        return false;

                    return true;
                });

                v.withMessage("'{propertyName}' is not a valid EGN.");

                return v;
            },
            isValidLNCh: function (): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: string) {
                    // проверката за липсваща стойност се прави от notNull()
                    if ((x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x))) {
                        return true;
                    }

                    if (x.length != 10)
                        return false

                    var digits: Array<number> = [];
                    for (var index = 0; index < x.length; index++) {
                        var number = Number(x[index]);

                        if (number != NaN)
                            digits.push(number)
                        else
                            return false
                    }

                    var coeffs = [21, 19, 17, 13, 11, 9, 7, 3, 1]
                    var checkSum = 0;
                    coeffs.forEach(function (coeff, index) {
                        checkSum += digits[index] * coeff
                    })

                    checkSum %= 10;
                    if (checkSum == 10) checkSum = 0;

                    if (checkSum != digits[9]) {
                        return false;
                    }

                    return true;
                });

                v.withMessage("'{propertyName}' is not a valid LNCh.");

                return v;
            },

            isValidEGNLNCh: function (): IValidationAdditionalData<TModel> {

                var v = this.must(function (obj: TModel, x: any) {

                    return ValidationHelper.isValidEGNLNCh(x);
                });
             
                v.withMessage("'{propertyName}' is not a valid Identifier.");

                return v;
            },

            isValidBULSTAT: function (): IValidationAdditionalData<TModel> {
                function validateShortUIC(id: string, digits: Array<number>) {
                    var checkSum = 0;

                    for (var j = 0; j < id.length - 1; j++) {
                        checkSum += digits[j] * (j + 1);
                    }

                    checkSum %= 11

                    if (10 == checkSum) {
                        checkSum = 0;

                        for (var j = 0; j < (id.length - 1); j++) {
                            checkSum += digits[j] * (j + 3);
                        }

                        checkSum %= 11;

                        if (10 == checkSum)
                            checkSum = 0;
                    }

                    if (digits[8] != checkSum) {
                        return false;
                    }

                    return true;
                }

                function validateLongUIC(id: string, digits: Array<number>) {
                    var checksum = 0;

                    if (id.length == 13) {
                        var shortID = id.substr(0, 9);
                        var shortDigits: Array<number> = [];

                        for (var index = 0; index < shortID.length; index++) {
                            shortDigits.push(Number(shortID[index]))
                        }

                        if (!validateShortUIC(shortID, shortDigits))
                            return false;

                        checksum = 2 * digits[8] + 7 * digits[9] + 3 * digits[10] + 5 * digits[11];
                        checksum %= 11;

                        if (10 == checksum) {
                            checksum = 4 * digits[8] + 9 * digits[9] + 5 * digits[10] + 7 * digits[11];
                            checksum %= 11;

                            if (10 == checksum)
                                checksum = 0;
                        }

                        if (digits[12] != checksum) {
                            return false;
                        }

                        return true;
                    }
                    else
                        return false;
                }

                function validateUICBulstat(id: string, digits: Array<number>) {
                    if (id.length == 9)
                        return validateShortUIC(id, digits);
                    else if (id.length == 13)
                        return validateLongUIC(id, digits);
                    else
                        return false;
                }


                var v = this.must(function (obj: TModel, x: string) {
                    // проверката за липсваща стойност се прави от notNull()
                    if (x == undefined || x == null || ObjectHelper.isStringNullOrEmpty(x)) {
                        return true;
                    }

                    if (x.length != 9 && x.length != 13 && x[0] != "2")
                        return false

                    if (/^\d{9}$/.test(x) || /^\d{13}$/.test(x)) {
                        var digits: Array<number> = [];
                        for (var index = 0; index < x.length; index++) {
                            var number = Number(x[index]);

                            if (number != NaN)
                                digits.push(number)
                            else
                                return false
                        }

                        return validateUICBulstat(x, digits)
                    } else {
                        return false;
                    }
                });

                v.withMessage("'{propertyName}' is not a valid BULSTAT.");

                return v;
            },

            isValidPhone: function (): IValidationAdditionalData<TModel> {
                var phoneNumPattern = '^([+#*]?)([0-9]{4,20})$';
                var v = this.must(function (obj: TModel, x: any) {
                    // проверката за липсваща стойност се прави от notNull()
                    return x == ""
                        || x == undefined
                        || x == null
                        || Helper.regex.isMatch(x, phoneNumPattern, 'i')
                });


                v.withMessage("'{propertyName}' is not a valid phone number.");

                return v;

            },

            numericDataTypeValidation: function (): IValidationAdditionalData<TModel> {

                var v = this.must((obj: TModel, x: any) => { return x && Number(x) });


                v.withMessage("'{propertyName}' is not a valid number.");

                return v;
            }
        }
    }

    protected clearRules(propSelector: (model: TModel) => any): void;

    protected clearRules(propName: string): void;

    protected clearRules(propSelector: any): void {
        var prop: (obj: TModel) => any,
            propName: string

        if (ObjectHelper.isFunction(propSelector)) {
            propName = Helper.getPropertyNameBySelector(propSelector);
        }
        else {
            propName = propSelector;
            prop = function (x) {
                //TODO да се помисли
                //return this.get_deep_index(x, propName);
                throw new Error("Not implemented");
            }
        }
        //Ако има такова property в Dictionary с валидации , то премахваме двойката с този ключ на property.Валидациите се махат се и от списъка с валидации.
        if (this.validationsDictionary.containsKey(propName)) {
            this.validationsDictionary.remove(propName);
        }

        for (var i = 0; i < this.validations.length; i++) {
            if (this.validations[i].propName == propName) {
                this.validations.splice(i, 1);
                i--;
            }
        }
    }
    //#endregion

    //#region Helpers



    private execInternalValidator(x: any, validator: IBaseValidator<IModelErrors, TValidationContext>): boolean {
        if (x == null || x == undefined) {
            return true;
        }
        else {

            return validator.validate(x);
        }
    }

    protected getPropVals(propertyName: string): IBaseValidator<IModelErrors, TValidationContext>[] {
        var vals: IBaseValidator<IModelErrors, TValidationContext>[] = [];

        var props = propertyName.split(".");

        if (props && props.length > 0) {
            var currentProp: string;
            var currentPropVals: IBaseValidator<IModelErrors, TValidationContext>[] = [];

            if (props[0].indexOf('[') > 0) {
                currentProp = props[0].substring(0, props[0].indexOf('['));
            }
            else {
                currentProp = props[0];
            }

            var validations = this.validationsDictionary.getValue(currentProp);

            if (validations) {
                for (var validation of validations) {
                    if (validation.propValidator) {
                        currentPropVals.push(validation.propValidator);
                    }
                }

                if (props.length == 1) {
                    vals = currentPropVals;
                }
                else {
                    var nextPropertyName = propertyName.substring(propertyName.indexOf('.') + 1);

                    for (var val of currentPropVals) {
                        var valProp: any = val;
                        vals = vals.concat(valProp.getPropVals(nextPropertyName));
                    }
                }
            }
        }

        return vals;
    }

    //#endregion

    protected validateRequiredFieldFromSection(selector: (arg: TModel) => any) {

    }

    protected validatePropertyWithMessage(
        selector: (arg: TModel) => any, obj: TModel, errorMessage: string) {

        var propertyName = Helper.getPropertyNameBySelector(selector);

        var value = selector(obj);
        if (!value) {
            obj.addError(propertyName, errorMessage);
        }
    }
}

interface Validation<TModel extends IModelErrors, TValidationContext> {
    propSelector: (obj: TModel) => any,
    propName: string,
    validationFunc?: (obj: TModel, value: any) => boolean,
    condition?: (obj: TModel, value: any) => boolean,
    revalidateOnModelChange?: boolean,
    message?: string,
    getMessage?: (obj: TModel, propName: string) => string,
    propValidator?: IBaseValidator<IModelErrors, TValidationContext>,
    errorLevel: ErrorLevels
}

interface IValidationRules<TModel extends IModelErrors, TValidationContext> {
    must(validationFunc: (obj: TModel, value: any) => boolean, propValidator?: IBaseValidator<IModelErrors, TValidationContext>): IValidationAdditionalData<TModel>;

    setValidator(validator: IBaseValidator<IModelErrors, any>): IValidationAdditionalData<TModel>;

    setCollectionValidator(validator: IBaseValidator<IModelErrors, any>): IValidationAdditionalData<TModel>;

    notNull(): IValidationAdditionalData<TModel>;

    notEmpty(): IValidationAdditionalData<TModel>;

    notEqual(valueToCompare: any): IValidationAdditionalData<TModel>;

    equal(valueToCompare: any): IValidationAdditionalData<TModel>;

    length(min: number, max?: number): IValidationAdditionalData<TModel>;

    lessThan(valueToCompare: any): IValidationAdditionalData<TModel>;

    lessThanOrEqualTo(valueToCompare: any): IValidationAdditionalData<TModel>;

    greaterThan(valueToCompare: any): IValidationAdditionalData<TModel>;

    greaterThanOrEqualTo(valueToCompare: any): IValidationAdditionalData<TModel>;

    matches(regexPattern: string, flags?: string): IValidationAdditionalData<TModel>;

    emailAddress(): IValidationAdditionalData<TModel>;

    multiEmailAddresses(): IValidationAdditionalData<TModel>;

    numericDataTypeValidation(): IValidationAdditionalData<TModel>;

    isValidDate(): IValidationAdditionalData<TModel>;

    isValidEGN(): IValidationAdditionalData<TModel>;

    isValidLNCh(): IValidationAdditionalData<TModel>;

    isValidEGNLNCh(): IValidationAdditionalData<TModel>;

    isValidBULSTAT(): IValidationAdditionalData<TModel>;

    isValidPhone(): IValidationAdditionalData<TModel>;

}

interface IValidationAdditionalData<TModel extends IModelErrors> {
    withMessage(message: string): IValidationAdditionalData<TModel>;
    withMessage(cb: (obj: TModel, propName: string) => string): IValidationAdditionalData<TModel>;
    when(condition: (obj: TModel, value: any) => boolean): IValidationAdditionalData<TModel>;
    revalidateOnModelChange(): IValidationAdditionalData<TModel>;
    setErrorLevelStrict: () => void;
    setErrorLevelInformation: () => void;
}

