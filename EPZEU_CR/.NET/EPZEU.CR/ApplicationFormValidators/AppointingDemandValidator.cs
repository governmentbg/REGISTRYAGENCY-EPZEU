using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class AppointingDemandValidator : ApplicationFormBaseValidator<AppointingDemand>
    {
        protected override IErrorCollection ValidateInternal(AppointingDemand application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            if (application != null)
            {
                var appInfoErrors = ValidateApplicantInfo(application.ApplicantInfo);
                if (appInfoErrors != null && appInfoErrors.Count > 0)
                    errors.AddRange(appInfoErrors);

                var appExchangeErrors = ValidateApplicantExchange(application.ApplicantExchange);
                if (appExchangeErrors != null && appExchangeErrors.Count > 0)
                    errors.AddRange(appExchangeErrors);

                if (!HasOneOrMoreMainDocUploaded(application))
                    errors.Add(new TextError("GL_NOATTACHED_DOCUMENTS_E", "GL_NOATTACHED_DOCUMENTS_E"));

                if (application.AppointingType == null || application.AppointingType.AppointingExpertType == Domain.Common.AppointingExpertType.Undefined)
                    errors.Add(new TextError("CR_APP_SELECT_TYPE_OFFICIAL_APPOINMENT_E", "CR_APP_SELECT_TYPE_OFFICIAL_APPOINMENT_E"));
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors;
        }
    }
}