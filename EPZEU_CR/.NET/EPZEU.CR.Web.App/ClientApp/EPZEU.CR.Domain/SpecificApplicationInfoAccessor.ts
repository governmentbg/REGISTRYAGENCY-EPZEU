import { F070a_WayOfEstablishingEuropeanCooperativeSociety, F070_WayOfEstablishingEuropeanCompany } from "EPZEU.CR.Domain.Applications.A";
import { F600_TransferringTypeOfTradeEnterprise, F701_FormOfTransforming701, F703_Successors, F801a_FormOfTransforming801a, F803_Successors803, F601_TransferringEnterprise } from "EPZEU.CR.Domain.Applications.V";
import { F001_UIC, F002_Company, ProcessStates } from ".";

// Направихме го само заради валидациите на допълнителните заявления на V заявленията.
// Импортиране са класовете на полетата, но те се ползват само за Intellisense-a!!!
// Така "EPZEU.CR.Domain.Applications.A" не влиза в bundle-a!
// Да се внимава да не се импортира код от "EPZEU.CR.Domain.Applications.A" (изключваме случаите, когато се ползва само за Intellisense-a),
// защото това ще включи "EPZEU.CR.Domain.Applications.A" в този bundle!!!
export namespace SpecificApplicationInfoAccessor {
    export function getF001_UIC(application: any): F001_UIC {
        if (application && application.fields)
            return application.fields.uic;

        return null;
    }

    export function getF002_Company(application: any): F002_Company {
        if (application && application.fields)
            return application.fields.company;

        return null;
    }

    export function getF070_WayOfEstablishingEuropeanCompany(application: any): F070_WayOfEstablishingEuropeanCompany {
        if (application && application.fields)
            return application.fields.wayOfEstablishingEuropeanCompany;

        return null;
    }

    export function getF070a_WayOfEstablishingEuropeanCooperativeSociety(application: any): F070a_WayOfEstablishingEuropeanCooperativeSociety {
        if (application && application.fields)
            return application.fields.wayOfEstablishingEuropeanCooperativeSociety;

        return null;
    }

    export function isApplicationStateNew(application: any): boolean {
        return application && (application.applicationState == ProcessStates.New);
    }

    export function isApplicationStateForChange(application: any): boolean {
        return application && (application.applicationState == ProcessStates.ForChange);
    }

    export function getF600_TransferringTypeOfTradeEnterprise(application: any): F600_TransferringTypeOfTradeEnterprise {
        if (application && application.fields)
            return application.fields.transferringTypeOfTradeEnterprise;

        return null;
    }

    export function getF601_TransferringEnterprise(application: any): F601_TransferringEnterprise {
        if (application && application.fields)
            return application.fields.transferringEnterprise;

        return null;
    }
    
    export function getF701_FormOfTransforming701(application: any): F701_FormOfTransforming701 {
        if (application && application.fields)
            return application.fields.formOfTransforming701;

        return null;
    }

    export function getF7030_Successor(application: any): F703_Successors {
        if (application && application.fields)
            return application.fields.successors703;

        return null;
    }

    export function getF801a_FormOfTransforming801a(application: any): F801a_FormOfTransforming801a {
        if (application && application.fields)
            return application.fields.formOfTransforming801a;

        return null;
    }

    export function getF803_Successors803(application: any): F803_Successors803 {
        if (application && application.fields)
            return application.fields.successors803;

        return null;
    }
}