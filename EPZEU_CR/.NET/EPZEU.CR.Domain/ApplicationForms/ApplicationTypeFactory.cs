using Integration.EPZEU.Models;
using System;

namespace EPZEU.CR.Domain.ApplicationForms
{
    public static class ApplicationTypeFactory
    {
        public static Type GetApplicationType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.A1:
                    return typeof(A1);
                case ApplicationFormTypes.A2:
                    return typeof(A2);
                case ApplicationFormTypes.A3:
                    return typeof(A3);
                case ApplicationFormTypes.A4:
                    return typeof(A4);
                case ApplicationFormTypes.A5:
                    return typeof(A5);
                case ApplicationFormTypes.A6:
                    return typeof(A6);
                case ApplicationFormTypes.A7:
                    return typeof(A7);
                case ApplicationFormTypes.A8:
                    return typeof(A8);
                case ApplicationFormTypes.A9:
                    return typeof(A9);
                case ApplicationFormTypes.A10:
                    return typeof(A10);
                case ApplicationFormTypes.A11:
                    return typeof(A11);
                case ApplicationFormTypes.A12:
                    return typeof(A12);
                case ApplicationFormTypes.A13:
                    return typeof(A13);
                case ApplicationFormTypes.A14:
                    return typeof(A14);
                case ApplicationFormTypes.A15:
                    return typeof(A15);
                case ApplicationFormTypes.A16:
                    return typeof(A16);
                case ApplicationFormTypes.A17:
                    return typeof(A17);
                case ApplicationFormTypes.A18:
                    return typeof(A18);
                case ApplicationFormTypes.B1:
                    return typeof(B1);
                case ApplicationFormTypes.B2:
                    return typeof(B2);
                case ApplicationFormTypes.B3:
                    return typeof(B3);
                case ApplicationFormTypes.B4:
                    return typeof(B4);
                case ApplicationFormTypes.B5:
                    return typeof(B5);
                case ApplicationFormTypes.B6:
                    return typeof(B6);
                case ApplicationFormTypes.B7:
                    return typeof(B7);
                case ApplicationFormTypes.G1:
                    return typeof(G1);
                case ApplicationFormTypes.G2:
                    return typeof(G2);
                case ApplicationFormTypes.G3:
                    return typeof(G3);
                case ApplicationFormTypes.Complaint:
                    return typeof(AppealRefusal);
                case ApplicationFormTypes.ActOfContestation:
                    return typeof(ActOfContestation);
                case ApplicationFormTypes.AppointingExpert:
                    return typeof(AppointingDemand);
                case ApplicationFormTypes.RequestForCorrection:
                    return typeof(IncomingRequestForCorrection);
                case ApplicationFormTypes.AppointingDeclaration:
                    return typeof(AppointingDeclaration);
                case ApplicationFormTypes.AppointingReportAndExamination:
                    return typeof(AppointingReportAndExamination);
                case ApplicationFormTypes.AppointingRequestForCorrection:
                    return typeof(AppointingRequestForCorrection);
                case ApplicationFormTypes.AppointingControllerReward:
                    return typeof(AppointingControllerReward);
                case ApplicationFormTypes.AppointingReleaseDeposit:
                    return typeof(AppointingReleaseDeposit);
                case ApplicationFormTypes.AppointingChangeRequest:
                    return typeof(AppointingChangeRequest);
                case ApplicationFormTypes.ReleaseAppointingExpert:
                    return typeof(ReleaseAppointingExpert);
                case ApplicationFormTypes.AppointingPaidDeposit:
                    return typeof(AppointingPaidDeposit);
                case ApplicationFormTypes.AttitudeOfChangeRequest:
                    return typeof(AttitudeOfChangeRequest);
                case ApplicationFormTypes.NotificationOfLackOfMeans:
                    return typeof(NotificationOfLackOfMeans);
                case ApplicationFormTypes.AppointingContactAddressChange:
                    return typeof(AppointingContactAddressChange);
                case ApplicationFormTypes.NotificationOfExaminationImpossibility:
                    return typeof(NotificationOfExaminationImpossibility);
                default:
                    throw new ArgumentException("There isn't ApplicationType for: " + appType.ToString());
            }
        }
    }
}
