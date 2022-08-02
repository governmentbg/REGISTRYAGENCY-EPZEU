﻿import { ErrorLevels, ObjectHelper } from 'Cnsys.Core';
import { ProcessStates, RecordOperations, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { B3 } from '../../ApplicationForms/ApplicationFormsB';
import { F201_PledgorsValidator } from '../../Fields/Validators/F201_PledgorsValidator';
import { F203_SecuredClaimDebtorsValidator } from '../../Fields/Validators/F203_SecuredClaimDebtorsValidator';
import { F205_PledgeCreditorsValidator } from '../../Fields/Validators/F205_PledgeCreditorsValidator';
import { F207a_ContractOfPledgeForShareValidator } from '../../Fields/Validators/F207a_ContractOfPledgeForShareValidator';
import { F207_SecuredClaimReasonValidator } from '../../Fields/Validators/F207_SecuredClaimReasonValidator';
import { F208_SecuredClaimSubjectValidator } from '../../Fields/Validators/F208_SecuredClaimSubjectValidator';
import { F213_PledgePropertyDescriptionValidator } from '../../Fields/Validators/F213_PledgePropertyDescriptionValidator';
import { F216a_PledgedCreditorAgreementValidator } from '../../Fields/Validators/F216a_PledgedCreditorAgreementValidator';
import { F217_PledgeExecutionClaimValidator } from '../../Fields/Validators/F217_PledgeExecutionClaimValidator';
import { F218_Partners218Validator } from '../../Fields/Validators/F218_Partners218Validator';
import { F219_PledgeExecutionDepozitarValidator } from '../../Fields/Validators/F219_PledgeExecutionDepozitarValidator';
import { F220_DepozitarValidator } from '../../Fields/Validators/F220_DepozitarValidator';
import { F223a_EntryIntoPledgeCreditorRightsValidator } from '../../Fields/Validators/F223a_EntryIntoPledgeCreditorRightsValidator';
import { B3Fields } from '../ModelsAutoGenerated';
import { ApplicationFormBFieldsBaseValidator, ApplicationFormBValidator } from './ApplicationFormBValidator';
import { F210_SecuredClaimInterestsValidator } from '../../Fields/Validators/F210_SecuredClaimInterestsValidator';
import { F211_SecuredClaimDelayInterestsValidator } from '../../Fields/Validators/F211_SecuredClaimDelayInterestsValidator';
import { F212_PledgeMoneyValidator } from '../../Fields/Validators/F212_PledgeMoneyValidator';
import { F215_ModalityDateValidator } from '../../Fields/Validators/F215_ModalityDateValidator';
import { F216_ModalityConditionValidator } from '../../Fields/Validators/F216_ModalityConditionValidator';
import { F223_StopOfExecutionPropertyValidator } from '../../Fields/Validators/F223_StopOfExecutionPropertyValidator';
import { F209_SecuredClaimAmountValidator } from '../../Fields/Validators/F209_SecuredClaimAmountValidator';
import { F214_PledgePropertyPriceValidator } from '../../Fields/Validators/F214_PledgePropertyPriceValidator';
import { F221_DepozitarDistraintRemoveValidator } from '../../Fields/Validators/F221_DepozitarDistraintRemoveValidator';
import { F222_StopOfExecutionSizeValidator } from '../../Fields/Validators/F222_StopOfExecutionSizeValidator';

export class B3Validator extends ApplicationFormBValidator<B3> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new B3FieldsValidator());
    }

    public validate(obj: B3): boolean {
        let isValid = super.validate(obj);
        let pledgeAddemption = obj.fields.pledgeAddemption;
        let isSubDeedClosureRequired = (pledgeAddemption.recordOperation == RecordOperations.Add || pledgeAddemption.recordOperation == RecordOperations.Current) && pledgeAddemption.addempted;
        obj.fields.pledgeAddemption.clearErrors();

        if (this.validationContext.processStates == ProcessStates.ForChange && isSubDeedClosureRequired && ValidatorHelpers.hasNewRecords(obj.fields, pledgeAddemption)) {
            obj.addError(this.getMessage('CR_APP_00161_E'), ErrorLevels.Error); //Избраният залог/запор е маркиран за заличаване и има полета за вписване.
            isValid = false;
        }

        return isValid;
    }
}

export class B3FieldsValidator extends ApplicationFormBFieldsBaseValidator<B3Fields>{
    constructor() {
        super();

        this.ruleFor(x => x.pledgors).setValidator(new F201_PledgorsValidator());
        this.ruleFor(x => x.securedClaimDebtors).setValidator(new F203_SecuredClaimDebtorsValidator());
        this.ruleFor(x => x.pledgeCreditors).setValidator(new F205_PledgeCreditorsValidator());
        this.ruleFor(x => x.securedClaimReason).setValidator(new F207_SecuredClaimReasonValidator());
        this.ruleFor(x => x.contractOfPledgeForShare).setValidator(new F207a_ContractOfPledgeForShareValidator());
        this.ruleFor(x => x.securedClaimSubject).setValidator(new F208_SecuredClaimSubjectValidator());
        this.ruleFor(x => x.securedClaimAmount).setValidator(new F209_SecuredClaimAmountValidator());
        this.ruleFor(x => x.securedClaimInterests).setValidator(new F210_SecuredClaimInterestsValidator());
        this.ruleFor(x => x.securedClaimDelayInterests).setValidator(new F211_SecuredClaimDelayInterestsValidator());
        this.ruleFor(x => x.pledgeMoney).setValidator(new F212_PledgeMoneyValidator());
        this.ruleFor(x => x.pledgePropertyPrice).setValidator(new F214_PledgePropertyPriceValidator());
        this.ruleFor(x => x.modalityDate).setValidator(new F215_ModalityDateValidator());
        this.ruleFor(x => x.modalityCondition).setValidator(new F216_ModalityConditionValidator());
        this.ruleFor(x => x.depozitarDistraintRemove).setValidator(new F221_DepozitarDistraintRemoveValidator());
        this.ruleFor(x => x.stopOfExecutionSize).setValidator(new F222_StopOfExecutionSizeValidator());
        this.ruleFor(x => x.stopOfExecutionProperty).setValidator(new F223_StopOfExecutionPropertyValidator());
        this.ruleFor(x => x.pledgePropertyDescription).setValidator(new F213_PledgePropertyDescriptionValidator());
        this.ruleFor(x => x.pledgedCreditorAgreement).setValidator(new F216a_PledgedCreditorAgreementValidator());
        this.ruleFor(x => x.pledgeExecutionClaim).setValidator(new F217_PledgeExecutionClaimValidator());
        this.ruleFor(x => x.partners218).setValidator(new F218_Partners218Validator());
        this.ruleFor(x => x.pledgeExecutionDepozitar).setValidator(new F219_PledgeExecutionDepozitarValidator());
        this.ruleFor(x => x.depozitar).setValidator(new F220_DepozitarValidator());
        this.ruleFor(x => x.entryIntoPledgeCreditorRights).setValidator(new F223a_EntryIntoPledgeCreditorRightsValidator());
    }

    public validate(obj: B3Fields): boolean {
        let isValid = super.validate(obj);
        let valCtx = this.getValidationContext();

        let isFilledSecuredClaimAmount = !ObjectHelper.isStringNullOrEmpty(obj.securedClaimAmount.amountDue) && !ObjectHelper.isStringNullOrEmpty(obj.securedClaimAmount.units); //Поле 209
        let isFilledPledgeMoney = !ObjectHelper.isStringNullOrEmpty(obj.pledgeMoney.price.amount) && !ObjectHelper.isStringNullOrEmpty(obj.pledgeMoney.price.units); //Поле 212

        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.securedClaimAmount], true)
            || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeMoney], true)) {

            if (!isFilledSecuredClaimAmount && !isFilledPledgeMoney) {

                //Задължително е попълването или на поле "209. Размер" или на поле "212. Размер".
                obj.securedClaimAmount.addError(this.getMessage('CR_APP_00140_E'));
                obj.pledgeMoney.addError(this.getMessage('CR_APP_00140_E'));
                isValid = false;
            }
        }

        let isPledgeExecutionClaimFilled = !this.validationContext.isRecordEmpty(obj.pledgeExecutionClaim) && obj.pledgeExecutionClaim.recordOperation != RecordOperations.Erase; //Поле 217
        let isPledgeExecutionDepozitarFilled = !this.validationContext.isRecordEmpty(obj.pledgeExecutionDepozitar) && obj.pledgeExecutionDepozitar.recordOperation != RecordOperations.Erase; //Поле 219

        let isPartnersFilled = (obj.partners218.partner218List.filter(x => !this.validationContext.isRecordEmpty(x) && x.recordOperation != RecordOperations.Erase).length > 0
            || !this.validationContext.isRecordEmpty(obj.partners218.partner218Part) && obj.partners218.partner218Part.recordOperation != RecordOperations.Erase) //Поле 218

        let isPartnersAllFilled = (obj.partners218.partner218List.filter(x => !this.validationContext.isRecordEmpty(x) && x.recordOperation != RecordOperations.Erase).length > 0
            && !this.validationContext.isRecordEmpty(obj.partners218.partner218Part) && obj.partners218.partner218Part.recordOperation != RecordOperations.Erase) //Поле 218

        if (!isPledgeExecutionClaimFilled && (isPartnersFilled || isPledgeExecutionDepozitarFilled)) {
            isValid = false;

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionClaim], true)
                || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.partners218.partner218List, true)) {

                if (isPartnersFilled)
                    obj.pledgeExecutionClaim.addError(this.getMessage('CR_APP_00143_E')); //Полето е задължително, когато поле "218. Имущество, върху което се насочва за изпълнението" е попълнено!
            }

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionClaim], true)
                || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionDepozitar], true)) {

                if (isPledgeExecutionDepozitarFilled)
                    obj.pledgeExecutionClaim.addError(this.getMessage('CR_APP_00142_E')); //Полето е задължително, когато поле "219. Депозитар" е попълнено!
            }
        }

        if (!isPartnersAllFilled && (isPledgeExecutionClaimFilled || isPledgeExecutionDepozitarFilled)) {

            isValid = false;

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.partners218.partner218List, true)
                || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionClaim], true)) {

                if (isPledgeExecutionClaimFilled)
                    obj.partners218.addError(this.getMessage('CR_APP_00144_E')); //Полето е задължително, когато поле "217. Част от вземането, която се търси" е попълнено!
            }

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.partners218.partner218List, true)
                || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionDepozitar], true)) {

                if (isPledgeExecutionDepozitarFilled)
                    obj.partners218.addError(this.getMessage('CR_APP_00142_E')); //Полето е задължително, когато поле "219. Депозитар" е попълнено!
            }
        }

        if (!isPledgeExecutionDepozitarFilled && (isPartnersFilled || isPledgeExecutionClaimFilled)) {

            isValid = false;

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionDepozitar], true)
                || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.partners218.partner218List, true)) {

                if (isPartnersFilled)
                    obj.pledgeExecutionDepozitar.addError(this.getMessage('CR_APP_00143_E')); //Полето е задължително, когато поле "218. Имущество, върху което се насочва за изпълнението" е попълнено!
            }

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionDepozitar], true)
                || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.pledgeExecutionClaim], true)) {
                if (isPledgeExecutionClaimFilled) {
                    obj.pledgeExecutionDepozitar.clearErrors();
                    obj.pledgeExecutionDepozitar.addError(this.getMessage('CR_APP_00144_E')); //Полето е задължително, когато поле "217. Част от вземането, която се търси" е попълнено!
                }
            }
        }

        if (!this.validationContext.isRecordEmpty(obj.stopOfExecutionSize) && ObjectHelper.isStringNullOrEmpty(obj.stopOfExecutionProperty.text)) {

            if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.stopOfExecutionSize], true)) {
                //Полето е задължително, когато поле "222. Размер" е попълнено!
                obj.stopOfExecutionProperty.addError(this.getMessage('CR_APP_00145_E'));
                isValid = false;
            }
        }

        return isValid;
    }
}