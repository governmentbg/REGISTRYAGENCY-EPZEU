﻿import { ArrayHelper, ErrorLevels, Helper, ObjectHelper } from 'Cnsys.Core';
import { CompaniesDataService } from 'EPZEU.CR.Core';
import { ApplicationFormFieldsBaseValidator, Person, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F702a_TransformingCompaniesValidator } from '../../Fields/Validators/F702a_TransformingCompaniesValidator';
import { F702_TransformingCompaniesValidator } from '../../Fields/Validators/F702_TransformingCompaniesValidator';
import { F703_SuccessorsValidator } from '../../Fields/Validators/F703_SuccessorsValidator';
import { F706_NumberApplicationValidator } from '../../Fields/Validators/F706_NumberApplicationValidator';
import { V23 } from '../ApplicationFormsV';
import { V23Fields } from '../ModelsAutoGenerated';
import { ApplicationFormVValidator } from './ApplicationFormVValidator';

export class V23Validator extends ApplicationFormVValidator<V23> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new V23FieldsValidator());
    }

    public validate(obj: V23): boolean {
        let isValid = super.validate(obj);

        isValid = this.validateAllUICsAreRegisteredInTR(obj) && isValid;

        return isValid;
    }

    private validateAllUICsAreRegisteredInTR(mainApp: V23): boolean {
        let isValid = true;

        for (let transformingCompany of mainApp.fields.transformingCompanys.transformingCompanyList) {
            let summary = mainApp.draftDeedInfoList.filter(d => d.uic == transformingCompany.subject.indent)[0];

            if (!summary) {
                isValid = false;
                transformingCompany.subject.addError(Helper.getPropertyNameBySelector((m: Person) => m.indent), this.getMessage('GL_NOT_FOUND_COMPANY_E'), ErrorLevels.Error); // Няма намерена фирма/ЮЛНЦ.
            } else if (!ObjectHelper.isStringNullOrEmpty(transformingCompany.subject.name) && summary.companyName != transformingCompany.subject.name) {
                isValid = false;
                transformingCompany.addError(this.getMessage('CR_APP_00248_E').replace('{COMPANY_NAME}', transformingCompany.subject.name), ErrorLevels.Error);
            }
        }

        for (let transformingCompany2 of mainApp.fields.transformingCompanys2.transformingCompany2List) {
            let summary = mainApp.draftDeedInfoList.filter(d => d.uic == transformingCompany2.subject.indent)[0];

            if (!summary) {
                isValid = false;
                transformingCompany2.subject.addError(Helper.getPropertyNameBySelector((m: Person) => m.indent), this.getMessage('GL_NOT_FOUND_COMPANY_E'), ErrorLevels.Error); // Няма намерена фирма/ЮЛНЦ.
            } else if (!ObjectHelper.isStringNullOrEmpty(transformingCompany2.subject.name) && summary.companyName != transformingCompany2.subject.name) {
                isValid = false;
                transformingCompany2.addError(this.getMessage('CR_APP_00248_E').replace('{COMPANY_NAME}', transformingCompany2.subject.name), ErrorLevels.Error);
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

export class V23FieldsValidator extends ApplicationFormFieldsBaseValidator<V23Fields>{
    constructor() {
        super();

        this.ruleFor(m => m.transformingCompanys).setValidator(new F702_TransformingCompaniesValidator());
        this.ruleFor(m => m.successors703).setValidator(new F703_SuccessorsValidator());
        this.ruleFor(m => m.transformingCompanys2).setValidator(new F702a_TransformingCompaniesValidator());
        this.ruleFor(m => m.numberApplication).setValidator(new F706_NumberApplicationValidator());
    }

    public validate(obj: V23Fields): boolean {
        let isValid = super.validate(obj);

        obj.stoppingEntry.clearErrors();
        if (ObjectHelper.isStringNullOrEmpty(obj.stoppingEntry.incomingNumber) == false) {

            if (!obj.stoppingEntry.hasTransformation === true) {
                obj.stoppingEntry.transformingCompanies = [];
                obj.stoppingEntry.successors = [];
                obj.stoppingEntry.removeError('incomingNumber');
                obj.stoppingEntry.addError('incomingNumber', this.getMessage('CR_GL_NO_APPL_WITH_THIS_INCOMING_NUMBER_E')); //  Няма заявление с този входящ номер.
                isValid = false;
            }
        } else {
            obj.stoppingEntry.addError(this.getMessage('GL_INPUT_FIELD_MUST_E')); // Полето е задължително.
            isValid = false;
        }

        // Поле 702 се държи като 702 или 702а (съответно има различни модели - transformingCompanys или transformingCompanys2) в зависимост от типа на заявлението, 
        // чийто входящ номер сме въвели в поле 705.
        let transformingCompanies = obj.transformingCompanys ? obj.transformingCompanys : obj.transformingCompanys2;
        let transformingCompaniesList = obj.transformingCompanys ? obj.transformingCompanys.transformingCompanyList : obj.transformingCompanys2.transformingCompany2List;
        let hasAtLeastOneTransformingCompany =
            ArrayHelper.queryable.from(obj.transformingCompanys.transformingCompanyList).where(m => !this.validationContext.isRecordEmpty(m)).count() > 0
            ||
            ArrayHelper.queryable.from(obj.transformingCompanys2.transformingCompany2List).where(m => !this.isTransformingCompany2RecordEmpty(m.subject)).count() > 0;

        if (hasAtLeastOneTransformingCompany == false) {
            transformingCompanies.clearErrors();
            transformingCompanies.addError(this.getMessage('CR_APP_00028_E')); // Задължително е попълването поне на едно "Преобразуващо се дружество"!
            isValid = false;
        }

        for (var i = 0; i < transformingCompaniesList.length; i++) {
            let company = transformingCompaniesList[i];
            if (this.validationContext.isRecordEmpty(company) && transformingCompaniesList.length > 1) {
                company.clearErrors();
                company.addError(this.getMessage('CR_APP_00063_E')); //Попълнете данните за полето или го изтрийте.
                isValid = false;
            }
        }


        for (var i = 0; i < obj.successors703.successorList.length; i++) {
            let company = obj.successors703.successorList[i];
            if (this.validationContext.isRecordEmpty(company) && obj.successors703.successorList.length > 1) {
                company.clearErrors();
                company.addError('subject', this.getMessage('CR_APP_00063_E')); //Попълнете данните за полето или го изтрийте.
                isValid = false;
            } else if (!company.subject.name) {
                company.addError('subject', this.getMessage('CR_APP_00018_E')); //Полето "Фирма" е задължително!
                isValid = false;
            }
        }

        return isValid;
    }

    // не можем да ползваме this.validationContext.isRecordEmpty, защото countryName се сетва по подразбиране да е България!
    private isTransformingCompany2RecordEmpty(company: Person): boolean {
        return (!company.name && !company.indent && !company.isForeignTrader);
    }
}