using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using System;
using System.Globalization;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class AppointingDemandDocumentsValidator : ApplicationFormBaseValidator<AppointingDemandDocuments>
    {
        protected override IErrorCollection ValidateInternal(AppointingDemandDocuments application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            #region Common Validation

            var valdiateApplicantExchangeAddress = application.AppType == ApplicationFormTypes.AppointingContactAddressChange;

            var appInfoErrors = ValidateApplicantInfo(application.ApplicantInfo);
            if (appInfoErrors != null && appInfoErrors.Count > 0)
                errors.AddRange(appInfoErrors);

            if (application.ApplicantInfo != null && application.ApplicantInfo.ApplicantCapacity != null && application.ApplicantInfo.ApplicantCapacity.AssignedExpert == false)
            {
                var appExchangeErrors = ValidateApplicantExchange(application.ApplicantExchange, valdiateApplicantExchangeAddress);
                if (appExchangeErrors != null && appExchangeErrors.Count > 0)
                    errors.AddRange(appExchangeErrors);
            }

            if (!IsValidateOutgoingNumberX108(application))
                errors.Add(new TextError("CR_GL_INVALID_OUTGOING_NO_Е", "CR_GL_INVALID_OUTGOING_NO_Е"));
            else
            {
                var assignmentExpertTypeError = ValidateAssignmentExpertType(application);
                if (assignmentExpertTypeError != null)
                    errors.Add(assignmentExpertTypeError);
            }

            if (!HasOneOrMoreMainDocUploaded(application))
                errors.Add(new TextError("GL_NOATTACHED_DOCUMENTS_E", "GL_NOATTACHED_DOCUMENTS_E"));

            #endregion

            if (application.AppType == ApplicationFormTypes.AppointingDeclaration
                || application.AppType == ApplicationFormTypes.AppointingChangeRequest
                || application.AppType == ApplicationFormTypes.ReleaseAppointingExpert
                || application.AppType == ApplicationFormTypes.AttitudeOfChangeRequest)
            {
                if (!IsValidateAssignedExpert(application))
                    errors.Add(new TextError("CR_APP_REQIURED_CHOICE_E", "CR_APP_REQIURED_CHOICE_E"));
            }

            if (application.AppType == ApplicationFormTypes.AppointingChangeRequest
                || application.AppType == ApplicationFormTypes.ReleaseAppointingExpert)
            {
                if (!IsValidateReleaseReaseonsX110(application))
                    errors.Add(new TextError("CR_APP_CHOOSE_REASON_RELEASE_E", "CR_APP_CHOOSE_REASON_RELEASE_E"));
            }

            if (application.AppType == ApplicationFormTypes.AttitudeOfChangeRequest)
            {
                if (!IsValidAssignmentCorrectionNumber(application))
                    errors.Add(new TextError("CR_APP_NO_REQUEST_FOR_CORRECTION_E", "CR_APP_NO_REQUEST_FOR_CORRECTION_E"));
            }

            if (application.AppType == ApplicationFormTypes.AppointingContactAddressChange)
            {
                if (application.RenewAssignmentExchange == null || application.RenewAssignmentExchange.Cheked == false)
                    errors.Add(new TextError("CR_APP_REQIURED_CHOICE_E", "CR_APP_REQIURED_CHOICE_E"));
            }

            return errors;
        }

        #region Validation helpers

        private bool IsValidateOutgoingNumberX108(AppointingDemandDocuments app)
        {
            if (app.OutgoingNumberX108 == null || app.OutgoingNumberX108.Parts == null || string.IsNullOrWhiteSpace(app.OutgoingNumberX108.Parts.IncomingNumber)
                || app.OutgoingNumberX108.Parts.OutgoingDate == null || app.OutgoingNumberX108.AppointingExpertType == AppointingExpertType.Undefined)
            {
                return false;
            }

            return true;
        }

        private bool IsValidateAssignedExpert(AppointingDemandDocuments app)
        {
            if (app.AssignedExperts == null || app.AssignedExperts.AssignedExpertList == null || app.AssignedExperts.AssignedExpertList.Count == 0
                || string.IsNullOrWhiteSpace(app.AssignedExperts.AssignedExpertList[0].ExpertGuid)
                || string.IsNullOrWhiteSpace(app.AssignedExperts.AssignedExpertList[0].Name))
                return false;

            return true;
        }

        private bool IsValidateReleaseReaseonsX110(AppointingDemandDocuments app)
        {
            if (app.ReleaseReaseonsX110 == null || string.IsNullOrWhiteSpace(app.ReleaseReaseonsX110.ReleaseReasonText) || app.ReleaseReaseonsX110.ReleaseReasonID < 0)
                return false;

            return true;
        }

        private bool IsValidAssignmentCorrectionNumber(AppointingDemandDocuments app)
        {
            if (IsValidateOutgoingNumberX108(app))
            {
                if (app.AssignmentCorrectionNumber == null || string.IsNullOrWhiteSpace(app.AssignmentCorrectionNumber.Value))
                    return false;
            }

            return true;
        }

        private IError ValidateAssignmentExpertType(AppointingDemandDocuments app)
        {
            if (app.OutgoingNumberX108 == null || app.OutgoingNumberX108.Parts == null || string.IsNullOrWhiteSpace(app.OutgoingNumberX108.Parts.IncomingNumber) || app.OutgoingNumberX108.Parts.OutgoingDate == null)
                return new TextError("CR_GL_INVALID_OUTGOING_NO_Е", "CR_GL_INVALID_OUTGOING_NO_Е");

            var dateStr = app.OutgoingNumberX108.Parts.OutgoingDate.Value.ToString("dd.MM.yyyy");
            var docNumber = app.OutgoingNumberX108.Parts.DocNumber != null ? app.OutgoingNumberX108.Parts.DocNumber : 1;
            var assignment = AssignmentReportServiceClient.GetAssignmentAsync(new AssignmentSearchCriteria
            {
                OutgoingIncomingNumber = app.OutgoingNumberX108.Parts.IncomingNumber,
                OutgoingSeqNumber = docNumber,
                OutgoingNumberDate = DateTime.ParseExact(dateStr, "dd.MM.yyyy", CultureInfo.InvariantCulture)
            }).GetAwaiter().GetResult();

            if (assignment == null || assignment.Experts == null || assignment.Experts.Count == 0)
                return new TextError("CR_GL_INVALID_OUTGOING_NO_Е", "CR_GL_INVALID_OUTGOING_NO_Е");
            else
            {
                if ((AppointingExpertType)assignment.AssignmentExpertType == AppointingExpertType.Liquidator &&
                    !(app.AppType == ApplicationFormTypes.AppointingRequestForCorrection || app.AppType == ApplicationFormTypes.AppointingDeclaration ||
                        app.AppType == ApplicationFormTypes.NotificationOfLackOfMeans || app.AppType == ApplicationFormTypes.AppointingReleaseDeposit
                        || app.AppType == ApplicationFormTypes.AppointingPaidDeposit))
                {
                    return new TextError("CR_APP_00177_E", "CR_APP_00177_E");

                }
                else if ((AppointingExpertType)assignment.AssignmentExpertType != AppointingExpertType.Liquidator && app.AppType == ApplicationFormTypes.NotificationOfLackOfMeans)
                    return new TextError("CR_APP_00178_E", "CR_APP_00178_E");
            }

            return null;
        }

        #endregion
    }
}