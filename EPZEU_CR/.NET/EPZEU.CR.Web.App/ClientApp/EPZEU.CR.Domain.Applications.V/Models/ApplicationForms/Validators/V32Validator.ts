﻿import { ArrayHelper, ErrorLevels, Helper, ObjectHelper } from 'Cnsys.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormBase, ApplicationItem, Person, SpecificApplicationInfoAccessor, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F8020_CoOperative, F8030_Successor803 } from '../../Fields/ModelsAutoGenerated';
import { V32 } from '../ApplicationFormsV';
import { ApplicationFormVValidator } from './ApplicationFormVValidator';
import { V32FieldsValidator } from './V32FieldsValidator';

export class V32Validator extends ApplicationFormVValidator<V32> {
    private _matchedAdditionalA7ApplicaitonsCount: number;

    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new V32FieldsValidator());
    }

    public validate(obj: V32): boolean {
        let isValid = super.validate(obj);

        isValid = this.validateAdditionalApps(obj) && isValid;
        isValid = this.validateAllUICsAreRegisteredInTR(obj) && isValid;

        return isValid;
    }

    private validateAdditionalApps(mainApp: V32): boolean {
        let isValid = true;
        this._matchedAdditionalA7ApplicaitonsCount = 0;

        let a7List = ArrayHelper.queryable.from(this.validationContext.applicationManager.processContext.applicationItems.filter((applicationItem: ApplicationItem) => {
            return applicationItem.applicationProvider.applicationType == ApplicationFormTypes.A7;
        })).select((element: ApplicationItem) => element.applicationManager.application).toArray();

        let errors: string[] = [];
        for (var i = 0; i < mainApp.fields.successors803.successorList.length; i++)
            errors = errors.concat(this.getErrorsForAppsForSuccessor(mainApp.fields.successors803.successorList[i], a7List));

        errors.forEach((error: string) => mainApp.addError(error, ErrorLevels.Error));
        isValid = (errors.length == 0) && isValid;

        this.matchAppsForReorganizeCooperative(mainApp.fields.reorganizeCoOperatives.coOperativeList[0], a7List); // в това заявление има само една преобразуваща се кооперация - затова забиваме индекс 0.
        if (a7List.length > this._matchedAdditionalA7ApplicaitonsCount) {
            // Добавени са допълнителни заявления, които не са подадени коректно за първоначална регистрация или за промяна на данни или не са свързани с правоприемник и/или преобразуваща се кооперация
            isValid = false;
            mainApp.addError(this.getMessage('CR_APP_00203_E'), ErrorLevels.Error);
        }

        return isValid;
    }

    private getErrorsForAppsForSuccessor(successor: F8030_Successor803, additionalApps: ApplicationFormBase[]): string[] {
        let errors = [];

        if (ObjectHelper.isStringNullOrEmpty(successor.subject.indent)) {
            let appsForInitialRegForSuccessorName = additionalApps
                .filter(ap => ((SpecificApplicationInfoAccessor.isApplicationStateNew(ap)) && (SpecificApplicationInfoAccessor.getF002_Company(ap).text == successor.subject.name)));

            if (appsForInitialRegForSuccessorName.length == 0) //Няма подадено допълнително заявление за първоначална регистрация на правоприемник
                errors.push(this.getMessage('CR_APP_00188_E') + ': ' + (successor.subject.name ? successor.subject.name : ''));

            if (appsForInitialRegForSuccessorName.length > 1) // Добавено е повече от едно допълнително заявление за първоначална регистрация на правоприемник
                errors.push(this.getMessage('CR_APP_00189_E') + ': ' + (successor.subject.name ? successor.subject.name : ''));

            this._matchedAdditionalA7ApplicaitonsCount += appsForInitialRegForSuccessorName.length;
        } else {
            let appsForChangeForSuccessorId = additionalApps
                .filter(ap => SpecificApplicationInfoAccessor.isApplicationStateForChange(ap) && (SpecificApplicationInfoAccessor.getF001_UIC(ap).text == successor.subject.indent));

            this._matchedAdditionalA7ApplicaitonsCount += appsForChangeForSuccessorId.length;
        }

        return errors;
    }

    private matchAppsForReorganizeCooperative(reorganizeCooperative: F8020_CoOperative, additionalApps: ApplicationFormBase[]): void {
        let appsForChangeForReorganizeCooperativeIdent = additionalApps
            .filter(ap => ((SpecificApplicationInfoAccessor.isApplicationStateForChange(ap)) && (SpecificApplicationInfoAccessor.getF001_UIC(ap).text == reorganizeCooperative.subject.indent)));

        this._matchedAdditionalA7ApplicaitonsCount += appsForChangeForReorganizeCooperativeIdent.length;
    }

    private validateAllUICsAreRegisteredInTR(mainApp: V32): boolean {
        let isValid = true;

        for (let coOperative of mainApp.fields.reorganizeCoOperatives.coOperativeList) {
            if (ValidatorHelpers.isValidUIC(coOperative.subject.indent)) {

                let summary = mainApp.draftDeedInfoList.filter(d => d.uic == coOperative.subject.indent)[0];

                if (!summary) {
                    isValid = false;
                    coOperative.subject.addError(Helper.getPropertyNameBySelector((m: Person) => m.indent), this.getMessage('GL_NOT_FOUND_COMPANY_E'), ErrorLevels.Error); // Няма намерена фирма/ЮЛНЦ.
                } else if (!ObjectHelper.isStringNullOrEmpty(coOperative.subject.name) && summary.companyName != coOperative.subject.name) {
                    //Наименованието {COMPANY_NAME} е различно от наименованието, което е регистрирано в Търговския регистър за посочения ЕИК. 
                    //Натиснете "Извлечи данни", за да се попълни коректното наименование!
                    isValid = false;
                    coOperative.addError(this.getMessage('CR_APP_00248_E').replace('{COMPANY_NAME}', coOperative.subject.name), ErrorLevels.Error);
                }
            }
        }

        for (let successor of mainApp.fields.successors803.successorList) {
            if (ValidatorHelpers.isValidUIC(successor.subject.indent)) {

                let summary = mainApp.draftDeedInfoList.filter(d => d.uic == successor.subject.indent)[0];

                if (!summary) {
                    isValid = false;
                    successor.subject.addError(Helper.getPropertyNameBySelector((m: Person) => m.indent), this.getMessage('GL_NOT_FOUND_COMPANY_E'), ErrorLevels.Error); // Няма намерена фирма/ЮЛНЦ.
                } else if (!ObjectHelper.isStringNullOrEmpty(successor.subject.name) && summary.companyName != successor.subject.name) {
                    //Наименованието {COMPANY_NAME} е различно от наименованието, което е регистрирано в Търговския регистър за посочения ЕИК. 
                    //Натиснете "Извлечи данни", за да се попълни коректното наименование!
                    isValid = false;
                    successor.addError(this.getMessage('CR_APP_00248_E').replace('{COMPANY_NAME}', successor.subject.name), ErrorLevels.Error);
                }
            }
        }

        return isValid;
    }
}