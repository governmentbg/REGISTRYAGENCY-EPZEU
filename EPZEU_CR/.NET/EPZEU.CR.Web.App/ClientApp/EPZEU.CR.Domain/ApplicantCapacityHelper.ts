import { ApplicationFormTypes } from 'EPZEU.CR.Core'
import { ApplicantCapacityType } from './UI/ApplicantCapacityUI';

export namespace ApplicantCapacityHelper {

    export function getApplicantCapacitiesByAppType(appType: ApplicationFormTypes): ApplicantCapacityType[] {
        switch (appType) {

            case ApplicationFormTypes.A15: return [ApplicantCapacityType.personRepresentingTheAssociation, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.anotherFace];
            case ApplicationFormTypes.A16: return [ApplicantCapacityType.personRepresentingTheFoundation, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.anotherFace]
            case ApplicationFormTypes.A17: return [ApplicantCapacityType.personRepresentingCommunityCentrer, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.anotherFace]
            case ApplicationFormTypes.A18: return [ApplicantCapacityType.personRepresentingBranchOfNonProfitForeignLegalEntity, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.anotherFace]

            case ApplicationFormTypes.G2:
            case ApplicationFormTypes.J1: return [ApplicantCapacityType.trader, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.financialAccountCreator, ApplicantCapacityType.procurator, ApplicantCapacityType.anotherFace]

            case ApplicationFormTypes.AppointingDeclaration:
            case ApplicationFormTypes.AppointingReportAndExamination:
            case ApplicationFormTypes.AttitudeOfChangeRequest:
            case ApplicationFormTypes.NotificationOfLackOfMeans:
            case ApplicationFormTypes.NotificationOfExaminationImpossibility:
                return [ApplicantCapacityType.assignedExpert]

            case ApplicationFormTypes.AppointingRequestForCorrection:
            case ApplicationFormTypes.AppointingControllerReward:
            case ApplicationFormTypes.AppointingChangeRequest:
            case ApplicationFormTypes.ReleaseAppointingExpert:
                return [ApplicantCapacityType.assignmentApplicant, ApplicantCapacityType.applicantLawyerWithPower, ApplicantCapacityType.assignedExpert]

            case ApplicationFormTypes.AppointingReleaseDeposit:
            case ApplicationFormTypes.AppointingPaidDeposit:
            case ApplicationFormTypes.AppointingContactAddressChange:
                return [ApplicantCapacityType.assignmentApplicant, ApplicantCapacityType.applicantLawyerWithPower]

            case ApplicationFormTypes.AppointingExpert: return [ApplicantCapacityType.assignmentApplicant, ApplicantCapacityType.applicantLawyerWithPower]

            case ApplicationFormTypes.RequestForCorrection: return [ApplicantCapacityType.trader, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.financialAccountCreator, ApplicantCapacityType.procurator, ApplicantCapacityType.anotherFace]

            default: return [ApplicantCapacityType.trader, ApplicantCapacityType.lawyerWithLetter, ApplicantCapacityType.procurator, ApplicantCapacityType.anotherFace]
        }
    }
}