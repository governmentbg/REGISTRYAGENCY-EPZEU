using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class RequestForCorrectionValidator : ApplicationFormBaseValidator<IncomingRequestForCorrection>
    {
        protected override IErrorCollection ValidateInternal(IncomingRequestForCorrection application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            var appInfoErrors = ValidateApplicantInfo(application.ApplicantInfo);
            if (appInfoErrors != null && appInfoErrors.Count > 0)
                errors.AddRange(appInfoErrors);

            var appExchangeErrors = ValidateApplicantExchange(application.ApplicantExchange);
            if (appExchangeErrors != null && appExchangeErrors.Count > 0)
                errors.AddRange(appExchangeErrors);

            if (!HasOneOrMoreMainDocUploaded(application))
                errors.Add(new TextError("GL_NOATTACHED_DOCUMENTS_E", "GL_NOATTACHED_DOCUMENTS_E"));

            if (application.RequestForCorrection != null)
            {
                if (string.IsNullOrWhiteSpace(application.RequestForCorrection.IncomingNumber) && string.IsNullOrWhiteSpace(application.RequestForCorrection.RegNumber))
                {
                    if (string.IsNullOrWhiteSpace(application.RequestForCorrection.IncomingNumber))
                        errors.Add(new TextError("GL_INPUT_INCOMING_NO_E", "GL_INPUT_INCOMING_NO_E"));
                    else if (string.IsNullOrWhiteSpace(application.RequestForCorrection.RegNumber))
                        errors.Add(new TextError("GL_INPUT_ENTRY_NO_E", "GL_INPUT_ENTRY_NO_E"));
                }

                if (application.RequestForCorrection.Subject == null || string.IsNullOrWhiteSpace(application.RequestForCorrection.Subject.Indent))
                    errors.Add(new TextError("GL_INPUT_FIELD_MUST_E", "GL_INPUT_FIELD_MUST_E"));
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }
    }
}