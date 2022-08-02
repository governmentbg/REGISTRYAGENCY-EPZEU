﻿import { ArrayHelper } from 'Cnsys.Core';
import { RecordOperations, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { A3 } from '../../ApplicationForms/ApplicationFormsA';
import { F005a_SeatForCorrespondenceValidator } from '../../Fields/Validators/F005a_SeatForCorrespondenceValidator';
import { F007a_AssignedManagersValidator } from '../../Fields/Validators/F007a_AssignedManagersValidator';
import { F008_WayOfManagementValidator } from '../../Fields/Validators/F008_WayOfManagementValidator';
import { F0101_Representatives101Validator } from '../../Fields/Validators/F0101_Representatives101Validator';
import { F011_WayOfRepresentationValidator } from '../../Fields/Validators/F011_WayOfRepresentationValidator';
import { F016_TermsOfPartnershipValidator } from '../../Fields/Validators/F016_TermsOfPartnershipValidator';
import { F017_SpecialConditionsValidator } from '../../Fields/Validators/F017_SpecialConditionsValidator';
import { F020_UnlimitedLiabilityPartnersValidators } from '../../Fields/Validators/F020_UnlimitedLiabilityPartnersValidators';
import { F021_LimitedLiabilityPartnersValidator } from '../../Fields/Validators/F021_LimitedLiabilityPartnersValidator';
import { F027_AddemptionOfTraderValidator } from '../../Fields/Validators/F027_AddemptionOfTraderValidator';
import { A3Fields } from '../ModelsAutoGenerated';
import { ApplicationFormAFieldsBaseValidator, ApplicationFormAValidator } from './ApplicationFormAValidator';

export class A3Validator extends ApplicationFormAValidator<A3> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new A3FieldsValidator());
    }

    public validate(obj: A3): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}

export class A3FieldsValidator extends ApplicationFormAFieldsBaseValidator<A3Fields>{

    constructor() {
        super();

        //Осн. обстоятелства 1
        this.ruleFor(m => m.seatForCorrespondence).setValidator(new F005a_SeatForCorrespondenceValidator());

        //Осн. обстоятелства 2
        this.ruleFor(m => m.assignedManagers).setValidator(new F007a_AssignedManagersValidator());
        this.ruleFor(m => m.wayOfManagement).setValidator(new F008_WayOfManagementValidator());
        this.ruleFor(m => m.representatives101).setValidator(new F0101_Representatives101Validator());
        this.ruleFor(m => m.wayOfRepresentation).setValidator(new F011_WayOfRepresentationValidator());

        //Осн. обстоятелства 3
        this.ruleFor(m => m.termsOfPartnership).setValidator(new F016_TermsOfPartnershipValidator());
        this.ruleFor(m => m.specialConditions).setValidator(new F017_SpecialConditionsValidator());
        this.ruleFor(m => m.unlimitedLiabilityPartners).setValidator(new F020_UnlimitedLiabilityPartnersValidators());

        //Осн. обстоятелства 4
        this.ruleFor(m => m.limitedLiabilityPartners).setValidator(new F021_LimitedLiabilityPartnersValidator());
        this.ruleFor(m => m.addemptionOfTrader).setValidator(new F027_AddemptionOfTraderValidator());
    }

    public validate(obj: A3Fields): boolean {
        let isValid = super.validate(obj);
        let valCtx = this.getValidationContext();

        let cntNotEmptyUnlimitedLiabilityPartners: number = ArrayHelper.queryable.from(obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList).where(m => !ValidatorHelpers.isObjectWithPersonEmpty(m, "subject") && m.recordOperation != RecordOperations.Erase).count();

        //#region AssignedManagers

        let cntNotEmptyManagers: number = ArrayHelper.queryable.from(obj.assignedManagers.assignedManageList).where(m => !ValidatorHelpers.isObjectWithPersonEmpty(m, "subject") && m.recordOperation != RecordOperations.Erase).count();
        let wayOfManagementSelected: boolean = (obj.wayOfManagement.jointly || obj.wayOfManagement.severally || obj.wayOfManagement.otherWay);

        if (!wayOfManagementSelected || obj.wayOfManagement.recordOperation == RecordOperations.Erase) {
            if (cntNotEmptyManagers == 0) {
                if (cntNotEmptyUnlimitedLiabilityPartners > 1) {

                    if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.assignedManagers.assignedManageList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfManagement], true)) {

                        if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfManagement, valCtx)) {
                            //Полето "Начин на управление" е задължително, когато броят на неограничено отговорните съдружници е повече от един и не е попълнен нито един управител.
                            obj.wayOfManagement.addError(this.getMessage('CR_APP_00050_E'));
                            isValid = false;
                        }
                    }
                }
            } else if (cntNotEmptyManagers > 1) {
                if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.assignedManagers.assignedManageList, true)
                    || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfManagement], true)) {

                    if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfManagement, valCtx)) {
                        //Полето "Начин на управление" е задължително, когато управителите са повече от един!
                        obj.wayOfManagement.addError(this.getMessage('CR_APP_00042_E'));
                        isValid = false;
                    }
                }
            }
        }

        if (wayOfManagementSelected && obj.wayOfManagement.recordOperation != RecordOperations.Erase) {
            if (cntNotEmptyManagers == 0) {
                if (cntNotEmptyUnlimitedLiabilityPartners < 2) {

                    if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.assignedManagers.assignedManageList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfManagement], true)) {

                        if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfManagement, valCtx)) {
                            //Полето "Начин на управление" трябва да се избере когато лицата, на които е възложено управлението са повече от един.
                            obj.wayOfManagement.addError(this.getMessage('CR_APP_00043_E'));
                            isValid = false;
                        }
                    }
                }
            } else if (cntNotEmptyManagers < 2) {

                if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.assignedManagers.assignedManageList, true)
                    || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfManagement], true)) {

                    if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfManagement, valCtx)) {
                        //Полето "Начин на управление" трябва да се избере когато лицата, на които е възложено управлението са повече от един.
                        obj.wayOfManagement.addError(this.getMessage('CR_APP_00043_E'));
                        isValid = false;
                    }
                }
            }
        }

        //#endregion

        //#region Representatives

        let cntNotEmptyRepresentatives = ArrayHelper.queryable.from(obj.representatives101.representativeList).where(m => !ValidatorHelpers.isObjectWithPersonEmpty(m, "subject") && m.recordOperation != RecordOperations.Erase).count();
        let wayOfRepresentationSelected: boolean = (obj.wayOfRepresentation.jointly || obj.wayOfRepresentation.severally || obj.wayOfRepresentation.otherWay);

        if (!wayOfRepresentationSelected || obj.wayOfRepresentation.recordOperation == RecordOperations.Erase) {
            if (cntNotEmptyRepresentatives == 0) {
                if (cntNotEmptyUnlimitedLiabilityPartners > 1) {

                    if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.representatives101.representativeList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfRepresentation], true)) {

                        if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfRepresentation, valCtx)) {
                            //Полето "Начин на представляване" е задължително, когато броят на неограничено отговорните съдружници е повече от един и не е попълнен нито един представител.
                            obj.wayOfRepresentation.addError(this.getMessage('CR_APP_00049_E'));
                            isValid = false;
                        }
                    }
                }
            } else if (cntNotEmptyRepresentatives > 1) {

                if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.representatives101.representativeList, true)
                    || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfRepresentation], true)) {

                    if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfRepresentation, valCtx)) {
                        //Полето "Начин на представляване" е задължително, когато представителите са повече от един!.
                        obj.wayOfRepresentation.addError(this.getMessage('CR_APP_00078_I'));
                        isValid = false;
                    }
                }
            }
        }

        if (wayOfRepresentationSelected && obj.wayOfRepresentation.recordOperation != RecordOperations.Erase) {
            if (cntNotEmptyRepresentatives == 0) {
                if (cntNotEmptyUnlimitedLiabilityPartners < 2) {

                    if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.representatives101.representativeList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList, true)
                        || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfRepresentation], true)) {

                        if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfRepresentation, valCtx)) {
                            //Полето "Начин на представляване" трябва да се избере само когато представителите са повече от един!
                            obj.wayOfRepresentation.addError(this.getMessage('CR_APP_00055_E'));
                            isValid = false;
                        }
                    }
                }
            } else if (cntNotEmptyRepresentatives < 2) {

                if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.representatives101.representativeList, true)
                    || ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, [obj.wayOfRepresentation], true)) {

                    if (ValidatorHelpers.canBeMarkedForErase(obj.wayOfRepresentation, valCtx)) {
                        //Полето "Начин на представляване" трябва да се избере само когато представителите са повече от един!
                        obj.wayOfRepresentation.addError(this.getMessage('CR_APP_00055_E'));
                        isValid = false;
                    }
                }
            }
        }

        //#endregion

        //#region UnlimitedLiabilityPartners 

        let cntEmptySubjectinList: number = 0;
        for (var i = 0; i < obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList.length; i++) {
            if (ValidatorHelpers.isEmptyBasePerson(obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList[i].subject.name, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList[i].subject.indent, null, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList[i].subject.isForeignTrader)
                && obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList[i].recordOperation != RecordOperations.Erase)
                cntEmptySubjectinList++;
        }

        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList, true)) {

            if (cntNotEmptyUnlimitedLiabilityPartners < 1 || (cntEmptySubjectinList == obj.unlimitedLiabilityPartners.unlimitedLiabilityPartnerList.length)) {
                obj.unlimitedLiabilityPartners.clearErrors();
                //Задължително е попълването поне на един "Неограничено отговорен съдружник"
                obj.unlimitedLiabilityPartners.addError(this.getMessage('CR_APP_00048_E'));
                isValid = false;
            }
        }

        //#endregion

        //#region LimitedLiabilityPartner

        let cntNotEmptyLiabilityPartners: number = ArrayHelper.queryable.from(obj.limitedLiabilityPartners.liabilityPartnerList).where(m => !this.validationContext.isRecordEmpty(m) && m.recordOperation != RecordOperations.Erase).count();

        cntEmptySubjectinList = 0;
        for (var i = 0; i < obj.limitedLiabilityPartners.liabilityPartnerList.length; i++) {
            if (ValidatorHelpers.isEmptyBasePerson(obj.limitedLiabilityPartners.liabilityPartnerList[i].subject.name, obj.limitedLiabilityPartners.liabilityPartnerList[i].subject.indent, null, obj.limitedLiabilityPartners.liabilityPartnerList[i].subject.isForeignTrader)
                && obj.limitedLiabilityPartners.liabilityPartnerList[i].recordOperation != RecordOperations.Erase)
                cntEmptySubjectinList++;
        }

        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.limitedLiabilityPartners.liabilityPartnerList, true)) {

            if (cntNotEmptyLiabilityPartners < 1 || (cntEmptySubjectinList == obj.limitedLiabilityPartners.liabilityPartnerList.length)) {
                obj.limitedLiabilityPartners.clearErrors();
                //Задължително е попълването поне на един "Ограничено отговорен съдружник"!
                obj.limitedLiabilityPartners.addError(this.getMessage('CR_APP_00051_E'));
                isValid = false;
            }
        }

        //#endregion

        return isValid;
    }
}