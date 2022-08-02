﻿import { ArrayHelper, ObjectHelper } from 'Cnsys.Core';
import { RecordOperations, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { A6 } from '../../ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceValidator } from '../../Fields/Validators/F005a_SeatForCorrespondenceValidator';
import { F010_RepresentativesValidator } from '../../Fields/Validators/F010_RepresentativesValidator';
import { F011_WayOfRepresentationValidator } from '../../Fields/Validators/F011_WayOfRepresentationValidator';
import { F012_BoardOfDirectorsValidatorSimple } from '../../Fields/Validators/F012_BoardOfDirectorsValidator';
import { F016_TermsOfPartnershipValidator } from '../../Fields/Validators/F016_TermsOfPartnershipValidator';
import { F017_SpecialConditionsValidator } from '../../Fields/Validators/F017_SpecialConditionsValidator';
import { F020_UnlimitedLiabilityPartnersValidators } from '../../Fields/Validators/F020_UnlimitedLiabilityPartnersValidators';
import { F027_AddemptionOfTraderValidator } from '../../Fields/Validators/F027_AddemptionOfTraderValidator';
import { F031a_SharesValidator } from '../../Fields/Validators/F031a_SharesValidator';
import { F031_FundsValidator } from '../../Fields/Validators/F031_FundsValidator';
import { F032_DepositedFundsValidator } from '../../Fields/Validators/F032_DepositedFundsValidator';
import { F033_NonMonetaryDepositsValidator } from '../../Fields/Validators/F033_NonMonetaryDepositsValidator';
import { F034_BuyBackDecisionValidator } from '../../Fields/Validators/F034_BuyBackDecisionValidator';
import { A6Fields } from '../ModelsAutoGenerated';
import { ApplicationFormAFieldsBaseValidator, ApplicationFormAValidator } from './ApplicationFormAValidator';

export class A6Validator extends ApplicationFormAValidator<A6> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new A6FieldsValidator());
    }

    public validate(obj: A6): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}

export class A6FieldsValidator extends ApplicationFormAFieldsBaseValidator<A6Fields>{
    constructor() {
        super();

        this.ruleFor(m => m.seatForCorrespondence).setValidator(new F005a_SeatForCorrespondenceValidator());
        this.ruleFor(m => m.representatives).setValidator(new F010_RepresentativesValidator());
        this.ruleFor(m => m.wayOfRepresentation).setValidator(new F011_WayOfRepresentationValidator());
        this.ruleFor(m => m.boardOfDirectors).setValidator(new F012_BoardOfDirectorsValidatorSimple());
        this.ruleFor(m => m.termsOfPartnership).setValidator(new F016_TermsOfPartnershipValidator());
        this.ruleFor(m => m.specialConditions).setValidator(new F017_SpecialConditionsValidator);
        this.ruleFor(m => m.unlimitedLiabilityPartners).setValidator(new F020_UnlimitedLiabilityPartnersValidators());
        this.ruleFor(m => m.addemptionOfTrader).setValidator(new F027_AddemptionOfTraderValidator());

        //Капитал
        this.ruleFor(m => m.funds).setValidator(new F031_FundsValidator());
        this.ruleFor(m => m.shares).setValidator(new F031a_SharesValidator());
        this.ruleFor(m => m.depositedFunds).setValidator(new F032_DepositedFundsValidator());
        this.ruleFor(m => m.nonMonetaryDeposits).setValidator(new F033_NonMonetaryDepositsValidator());
        this.ruleFor(m => m.buyBackDecision).setValidator(new F034_BuyBackDecisionValidator());
    }

    public validate(obj: A6Fields): boolean {
        let isValid = super.validate(obj);
        let valCtx = this.getValidationContext();

        let cntNotEmptyRepresentatives: number = ArrayHelper.queryable.from(obj.representatives.representativeList).where(m => !this.validationContext.isRecordEmpty(m) && m.recordOperation != RecordOperations.Erase).count();
        let wayOfRepresentationSelected: boolean = (obj.wayOfRepresentation.jointly || obj.wayOfRepresentation.severally || obj.wayOfRepresentation.otherWay) && obj.wayOfRepresentation.recordOperation != RecordOperations.Erase;

        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.representatives.representativeList, true)
            || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfRepresentation], true)) {

            if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfRepresentation, valCtx)) {
                if (cntNotEmptyRepresentatives > 1 && !wayOfRepresentationSelected) {
                    //Полето "Начин на представляване" е задължително, когато представителите са повече от един!
                    obj.wayOfRepresentation.clearErrors();
                    obj.wayOfRepresentation.addError(this.getMessage('CR_APP_00078_I'));
                    isValid = false;
                }

                if (wayOfRepresentationSelected && cntNotEmptyRepresentatives < 2) {

                    //Полето "Начин на представляване" трябва да се избере само когато представителите са повече от един!
                    obj.wayOfRepresentation.clearErrors();
                    obj.wayOfRepresentation.addError(this.getMessage('CR_APP_00055_E'));
                    isValid = false;
                }
            }
        }

        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList, true)) {

            //#region UnlimitedLiabilityPartners
            let cntNotEmptyUnlimitedLiabilityPartners: number = ArrayHelper.queryable.from(obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList).where(m => !this.validationContext.isRecordEmpty(m) && m.recordOperation != RecordOperations.Erase).count();

            if (cntNotEmptyUnlimitedLiabilityPartners < 1) {
                obj.unlimitedLiabilityPartners.clearErrors();
                //Задължително е попълването поне на един "Неограничено отговорен съдружник"
                obj.unlimitedLiabilityPartners.addError(this.getMessage('CR_APP_00048_E'));
                isValid = false;
            }
        }

        //#endregion

        //Поле 31
        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.funds], true)) {
            if (ObjectHelper.isStringNullOrEmpty(obj.funds.text)) {
                obj.funds.addError('text', this.getMessage('GL_INPUT_FIELD_MUST_E'));
                isValid = false;
            }
        }

        return isValid;
    }
}