﻿import { ArrayHelper } from 'Cnsys.Core';
import { ApplicationFormFieldsBaseValidator, Person } from 'EPZEU.CR.Domain';
import { F801_FormOfTransformingValidator } from '../../Fields/Validators/F801_FormOfTransformingValidator';
import { F802_ReorganizeCoOperativesValidator } from '../../Fields/Validators/F802_ReorganizeCoOperativesValidator';
import { F803_SuccessorsValidator } from '../../Fields/Validators/F803_SuccessorsValidator';
import { F804_ReorgBranchesValidator } from '../../Fields/Validators/F804_ReorgBranchesValidator';
import { V32Fields } from '../ModelsAutoGenerated';

export class V32FieldsValidator extends ApplicationFormFieldsBaseValidator<V32Fields>{
    constructor() {
        super();
        this.ruleFor(m => m.formOfTransforming801).setValidator(new F801_FormOfTransformingValidator());
        this.ruleFor(m => m.reorganizeCoOperatives).setValidator(new F802_ReorganizeCoOperativesValidator());
        this.ruleFor(m => m.successors803).setValidator(new F803_SuccessorsValidator());
        this.ruleFor(m => m.branches804).setValidator(new F804_ReorgBranchesValidator());
    }

    public validate(obj: V32Fields): boolean {
        let isValid = super.validate(obj);

        let hasAtLeastOneReorganizeCoOperative = ArrayHelper.queryable.from(obj.reorganizeCoOperatives.coOperativeList).where(m => !this.validationContext.isRecordEmpty(m)).count() > 0;
        if (hasAtLeastOneReorganizeCoOperative == false) {
            obj.reorganizeCoOperatives.clearErrors();
            obj.reorganizeCoOperatives.addError(this.getMessage('CR_APP_00037_E')); // Полето "Преобразуващи се кооперации" е задължително!
            isValid = false;
        }

        for (var i = 0; i < obj.successors803.successorList.length; i++) {
            let successor = obj.successors803.successorList[i];
            if (this.isReorganizeCooperativeRecordEmpty(successor.subject) && obj.successors803.successorList.length > 1) {
                successor.clearErrors();
                successor.addError(this.getMessage('CR_APP_00063_E')); //Попълнете данните за полето или го изтрийте.
                isValid = false;
            }
        }

        for (var i = 0; i < obj.branches804.branchList.length; i++) {
            let subject804 = obj.branches804.branchList[i];

            if (subject804.branchSubject.indent) {
                if (ArrayHelper.queryable.from(obj.successors803.successorList)
                    .where(successor => successor.subject.indent == subject804.branchSubject.indent)
                    .count() == 0) {
                    subject804.addError(this.getMessage('CR_APP_00146_E')); // Фирмата не е от списъка от фирми изброени в поле 803!
                    isValid = false;
                    break;
                }
            }

            if (subject804.branchSubject.name) {
                if (ArrayHelper.queryable.from(obj.successors803.successorList)
                    .where(successor => successor.subject.name == subject804.branchSubject.name)
                    .count() == 0) {
                    subject804.addError(this.getMessage('CR_APP_00146_E')); // Фирмата не е от списъка от фирми изброени в поле 803!
                    isValid = false;
                }
            }
        }

        return isValid;
    }

    // не можем да ползваме this.validationContext.isRecordEmpty, защото legalForm се сетва по подразбиране да е -1!
    private isReorganizeCooperativeRecordEmpty(company: Person): boolean {
        return (!company.name && !company.indent);
    }
}