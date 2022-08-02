import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { IApplicationFormManager, ApplicationProviderBase, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { AppointingDemandDocumentsValidator } from '../Models/Validators/AppointingDemandDocumentsValidator';
import { AppointingDemandDocumentsUI } from '../UI/AppointingDemandDocumentsUI';
import { AppointingDemandDocumentsStartUI } from '../UI/AppointingDemandDocumentsStartUI';
import { AppointingDemandDocumentsFormManager } from './AppointingDemandDocumentsFormManager';

export class AppointingDemandDocumentsProvider extends ApplicationProviderBase {

    //#region IApplicationProvider

    private _appType: ApplicationFormTypes = null;

    constructor(appType: ApplicationFormTypes) {
        super()

        this._appType = appType;
    }

    getStartUIComponentType(): any {
        return AppointingDemandDocumentsStartUI;
    }

    getUIComponentType(): any {
        return AppointingDemandDocumentsUI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {

        switch (this._appType) {
            case ApplicationFormTypes.AppointingReleaseDeposit:
                return [
                    { isApplicationTitle: true, label: moduleContext.resourceManager.getResourceByKey("CR_APP_REQUEST_L") },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("CR_APP_APPOINTMENT_DATA_L"), anchor: "appointmentData" },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_L"), anchor: "applicant" },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("CR_APP_00001_SHORT_L"), anchor: "applicantExchange" },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), anchor: "documents" }
                ];
            case ApplicationFormTypes.AppointingRequestForCorrection:
            case ApplicationFormTypes.AppointingControllerReward:
            case ApplicationFormTypes.AppointingChangeRequest:
            case ApplicationFormTypes.ReleaseAppointingExpert:
            case ApplicationFormTypes.AppointingPaidDeposit:
            case ApplicationFormTypes.AppointingContactAddressChange:
            case ApplicationFormTypes.AppointingDeclaration:
            case ApplicationFormTypes.AppointingReportAndExamination:
            case ApplicationFormTypes.AttitudeOfChangeRequest:
            case ApplicationFormTypes.NotificationOfLackOfMeans:
            case ApplicationFormTypes.NotificationOfExaminationImpossibility:
                return [
                    { isApplicationTitle: true, label: moduleContext.resourceManager.getResourceByKey(this.getTitleLabelKey(this._appType)) },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("CR_APP_APPOINTMENT_DATA_L"), anchor: "appointmentData" },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_L"), anchor: "applicant" },
                    { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), anchor: "documents" }
                ];
        }

        return null;
    }

    private getTitleLabelKey(applFormType: ApplicationFormTypes): string {
        switch (this._appType) {
            case ApplicationFormTypes.AppointingRequestForCorrection:
            case ApplicationFormTypes.AppointingControllerReward:
            case ApplicationFormTypes.AppointingChangeRequest:
                return "CR_APP_REQUEST_L"
            case ApplicationFormTypes.ReleaseAppointingExpert:
                return "GL_APPLICATION_L"
            case ApplicationFormTypes.AppointingPaidDeposit:
                return "CR_GL_ACCEPTANCE_DEPOSIT_L"
            case ApplicationFormTypes.AppointingDeclaration:
                return "GL_MANIFEST_L"
            case ApplicationFormTypes.AppointingReportAndExamination:
                return "CR_GL_REPORT_EXPERTISE_L"
            case ApplicationFormTypes.AttitudeOfChangeRequest:
                return "CR_GL_OPINION_L"
            case ApplicationFormTypes.AppointingContactAddressChange:
            case ApplicationFormTypes.NotificationOfLackOfMeans:
            case ApplicationFormTypes.NotificationOfExaminationImpossibility:
                return "CR_GL_NOTIFICATION_L"
            default:
                return "";
        }

        
    }

    getApplicationManager(): IApplicationFormManager {
        return new AppointingDemandDocumentsFormManager();
    }

    getValidator(): AppointingDemandDocumentsValidator {
        return new AppointingDemandDocumentsValidator(this._appType);
    }

    get applicationType(): ApplicationFormTypes {

        return this._appType;
    }

    //#endregion
}
