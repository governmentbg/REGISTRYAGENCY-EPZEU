﻿import { ArrayHelper, ErrorLevels, Helper, ObjectHelper } from 'Cnsys.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormBase, ApplicationItem, Person, SpecificApplicationInfoAccessor, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F7020_TransformingCompany, F7030_Successor } from '../../Fields/ModelsAutoGenerated';
import { V22 } from '../ApplicationFormsV';
import { ApplicationFormVValidator } from './ApplicationFormVValidator';
import { V22FieldsValidator } from './V22FieldsValidator';

export class V22Validator extends ApplicationFormVValidator<V22> {

    private _matchedAdditionalApplicationsCount: number = 0;

    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new V22FieldsValidator());
    }

    public validate(obj: V22): boolean {
        let isValid = super.validate(obj);

        isValid = this.validateAdditionalApps(obj) && isValid;
        isValid = this.validateAllUICsAreRegisteredInTR(obj) && isValid;

        return isValid;
    }

    private validateAdditionalApps(mainApp: V22): boolean {
        let isValid = true;
        this._matchedAdditionalApplicationsCount = 0;

        let applicationTypesToSearch =
            [ApplicationFormTypes.A2,
            ApplicationFormTypes.A3,
            ApplicationFormTypes.A4,
            ApplicationFormTypes.A5,
            ApplicationFormTypes.A6,
            ApplicationFormTypes.A9,
            ApplicationFormTypes.A14];

        let applicationsToSearch = ArrayHelper.queryable.from(this.validationContext.applicationManager.processContext.applicationItems.filter((applicationItem: ApplicationItem) => {
            return applicationTypesToSearch.indexOf(applicationItem.applicationProvider.applicationType) >= 0;
        })).select((element: ApplicationItem) => element.applicationManager.application).toArray();

        let errors: string[] = [];
        for (var i = 0; i < mainApp.fields.successors703.successorList.length; i++)
            errors = errors.concat(this.getErrorsForAppsForSuccessor(mainApp.fields.successors703.successorList[i], applicationsToSearch));

        errors.forEach((error: string) => mainApp.addError(error, ErrorLevels.Error));
        isValid = (errors.length == 0) && isValid;

        this.matchAppsForTransformingCompany(mainApp.fields.transformingCompanys.transformingCompanyList[0], applicationsToSearch);

        if (applicationsToSearch.length > this._matchedAdditionalApplicationsCount) {
            // Добавени са допълнителни заявления, които не са подадени коректно за първоначална регистрация или за промяна на данни или не са свързани с правоприемник и/или преобразуващо се дружество
            isValid = false;
            mainApp.addError(this.getMessage('CR_APP_00197_E'), ErrorLevels.Error);
        }

        return isValid;
    }

    private getErrorsForAppsForSuccessor(successor: F7030_Successor, additionalApps: ApplicationFormBase[]): string[] {
        let errors = [];

        if (ObjectHelper.isStringNullOrEmpty(successor.subject.indent)) {
            let appsForInitialRegForSuccessorName = additionalApps
                .filter(ap => ((SpecificApplicationInfoAccessor.isApplicationStateNew(ap)) && (SpecificApplicationInfoAccessor.getF002_Company(ap).text == successor.subject.name)));

            if (appsForInitialRegForSuccessorName.length == 0) //Няма подадено допълнително заявление за първоначална регистрация на правоприемник
                errors.push(this.getMessage('CR_APP_00188_E') + ': ' + (successor.subject.name ? successor.subject.name : ''));

            if (appsForInitialRegForSuccessorName.length > 1) // Добавено е повече от едно допълнително заявление за първоначална регистрация на правоприемник
                errors.push(this.getMessage('CR_APP_00189_E') + ': ' + (successor.subject.name ? successor.subject.name : ''));

            this._matchedAdditionalApplicationsCount += appsForInitialRegForSuccessorName.length;
        } else {
            let appsForChangeForSuccessorId = additionalApps
                .filter(ap => SpecificApplicationInfoAccessor.isApplicationStateForChange(ap) && (SpecificApplicationInfoAccessor.getF001_UIC(ap).text == successor.subject.indent));

            if (appsForChangeForSuccessorId.length > 1) // Добавено е повече от едно допълнително заявление за промяна на обстоятелства на правоприемник
                errors.push(this.getMessage('CR_APP_00198_E') + ': ' + (successor.subject.name ? (successor.subject.name + ', ') : '') + this.getMessage('GL_COMPANY_ID_L') + ': ' + (successor.subject.indent ? successor.subject.indent : ''));

            this._matchedAdditionalApplicationsCount += appsForChangeForSuccessorId.length;
        }

        return errors;
    }

    private matchAppsForTransformingCompany(transformingCompany: F7020_TransformingCompany, additionalApps: ApplicationFormBase[]): void {
        let appsForChangeForTransformingCompanyId = additionalApps
            .filter(app => SpecificApplicationInfoAccessor.isApplicationStateForChange(app) && (SpecificApplicationInfoAccessor.getF001_UIC(app).text == transformingCompany.subject.indent));

        this._matchedAdditionalApplicationsCount += appsForChangeForTransformingCompanyId.length;
    }

    private validateAllUICsAreRegisteredInTR(mainApp: V22): boolean {
        let isValid = true;

        for (let transformingCompany of mainApp.fields.transformingCompanys.transformingCompanyList) {
            if (ValidatorHelpers.isValidUIC(transformingCompany.subject.indent)) {
                let summary = mainApp.draftDeedInfoList.filter(d => d.uic == transformingCompany.subject.indent)[0];

                if (!summary) {
                    isValid = false;
                    transformingCompany.subject.addError(Helper.getPropertyNameBySelector((m: Person) => m.indent), this.getMessage('GL_NOT_FOUND_COMPANY_E'), ErrorLevels.Error); // Няма намерена фирма/ЮЛНЦ.
                } else if (!ObjectHelper.isStringNullOrEmpty(transformingCompany.subject.name) && summary.companyName != transformingCompany.subject.name) {
                    isValid = false;
                    transformingCompany.addError(this.getMessage('CR_APP_00248_E').replace('{COMPANY_NAME}', transformingCompany.subject.name), ErrorLevels.Error);
                }
            }
        }

        for (let successor of mainApp.fields.successors703.successorList) {
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