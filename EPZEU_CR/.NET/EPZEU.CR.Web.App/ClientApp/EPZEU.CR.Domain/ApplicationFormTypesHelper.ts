import { ApplicationFormTypes } from 'EPZEU.CR.Core'

export namespace ApplicationFormTypesHelper {

    export function applicationOnlyForNew(appType: ApplicationFormTypes): boolean {
        switch (appType) {
            case ApplicationFormTypes.G1: return true;
            case ApplicationFormTypes.G2: return true;
            case ApplicationFormTypes.G3: return true;
            case ApplicationFormTypes.E1: return true;
            case ApplicationFormTypes.J1: return true;

            default: return false;
        }
    }

    export function hasEntityIdentification(appType: ApplicationFormTypes): boolean {
        switch (appType) {
            case ApplicationFormTypes.B1: return true;
            case ApplicationFormTypes.B2: return true;
            case ApplicationFormTypes.B3: return true;
            case ApplicationFormTypes.B4: return true;
            case ApplicationFormTypes.B5: return true;
            case ApplicationFormTypes.B6: return true;
            case ApplicationFormTypes.B7: return true;
            case ApplicationFormTypes.G1: return true;
            case ApplicationFormTypes.G2: return true;
            case ApplicationFormTypes.G3: return true;

            default: return false;
        }
    }

    export function renderHelperTreeRadioButtons(mainAppType: any): boolean {
        if (mainAppType == ApplicationFormTypes.A1 ||
            mainAppType == ApplicationFormTypes.A2 ||
            mainAppType == ApplicationFormTypes.A3 ||
            mainAppType == ApplicationFormTypes.A4 ||
            mainAppType == ApplicationFormTypes.A5 ||
            mainAppType == ApplicationFormTypes.A6 ||
            mainAppType == ApplicationFormTypes.A7 ||
            mainAppType == ApplicationFormTypes.A8 ||
            mainAppType == ApplicationFormTypes.A9 ||
            mainAppType == ApplicationFormTypes.A15 ||
            mainAppType == ApplicationFormTypes.A16 ||
            mainAppType == ApplicationFormTypes.A17 ||
            mainAppType == ApplicationFormTypes.A18) return true;
        else return false;
    }

    export function renderHelperTwoRadioButtons(mainAppType: any): boolean {
        if (mainAppType == ApplicationFormTypes.B1 ||
            mainAppType == ApplicationFormTypes.B2 ||
            mainAppType == ApplicationFormTypes.B3 ||
            mainAppType == ApplicationFormTypes.B4 ||
            mainAppType == ApplicationFormTypes.B5 ||
            mainAppType == ApplicationFormTypes.B6 ||
            mainAppType == ApplicationFormTypes.B7 ||
            mainAppType == ApplicationFormTypes.D1 ||
            mainAppType == ApplicationFormTypes.A10 ||
            mainAppType == ApplicationFormTypes.A11 ||
            mainAppType == ApplicationFormTypes.A12 ||
            mainAppType == ApplicationFormTypes.A13 ||
            mainAppType == ApplicationFormTypes.A14) return true;
        else return false;
    }

    export function renderHelperOneRadioButtons(mainAppType: any): boolean {
        if (mainAppType == ApplicationFormTypes.V1 ||
            mainAppType == ApplicationFormTypes.V21 ||
            mainAppType == ApplicationFormTypes.V22 ||
            mainAppType == ApplicationFormTypes.V23 ||
            mainAppType == ApplicationFormTypes.V24 ||
            mainAppType == ApplicationFormTypes.V25 ||
            mainAppType == ApplicationFormTypes.V26 ||
            mainAppType == ApplicationFormTypes.V31 ||
            mainAppType == ApplicationFormTypes.V32 ||
            mainAppType == ApplicationFormTypes.V33 ||
            mainAppType == ApplicationFormTypes.G1 ||
            mainAppType == ApplicationFormTypes.G2 ||
            mainAppType == ApplicationFormTypes.G3 ||
            mainAppType == ApplicationFormTypes.E1 ||
            mainAppType == ApplicationFormTypes.J1) return true;
        else return false;
    }

    export function isTypeA(mainAppType: any): boolean {
        if (mainAppType == ApplicationFormTypes.A1 ||
            mainAppType == ApplicationFormTypes.A2 ||
            mainAppType == ApplicationFormTypes.A3 ||
            mainAppType == ApplicationFormTypes.A4 ||
            mainAppType == ApplicationFormTypes.A5 ||
            mainAppType == ApplicationFormTypes.A6 ||
            mainAppType == ApplicationFormTypes.A7 ||
            mainAppType == ApplicationFormTypes.A8 ||
            mainAppType == ApplicationFormTypes.A9 ||
            mainAppType == ApplicationFormTypes.AA ||
            mainAppType == ApplicationFormTypes.A10 ||
            mainAppType == ApplicationFormTypes.A11 ||
            mainAppType == ApplicationFormTypes.A12 ||
            mainAppType == ApplicationFormTypes.A13 ||
            mainAppType == ApplicationFormTypes.A14 ||
            mainAppType == ApplicationFormTypes.A15 ||
            mainAppType == ApplicationFormTypes.A16 ||
            mainAppType == ApplicationFormTypes.A17 ||
            mainAppType == ApplicationFormTypes.A18) return true;
        else return false;
    }

    export function isTypeV(mainAppType: ApplicationFormTypes): boolean {
        if (mainAppType == ApplicationFormTypes.V1 ||
            mainAppType == ApplicationFormTypes.V21 ||
            mainAppType == ApplicationFormTypes.V22 ||
            mainAppType == ApplicationFormTypes.V23 ||
            mainAppType == ApplicationFormTypes.V24 ||
            mainAppType == ApplicationFormTypes.V25 ||
            mainAppType == ApplicationFormTypes.V26 ||
            mainAppType == ApplicationFormTypes.V31 ||
            mainAppType == ApplicationFormTypes.V32 ||
            mainAppType == ApplicationFormTypes.V33) return true;
        else return false;
    }

    export function isTypeAorV(mainAppType: ApplicationFormTypes): boolean {
        return (isTypeA(mainAppType) || isTypeV(mainAppType));
    }
}