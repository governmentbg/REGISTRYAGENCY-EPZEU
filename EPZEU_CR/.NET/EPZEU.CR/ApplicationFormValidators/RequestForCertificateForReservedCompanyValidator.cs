using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class RequestForCertificateForReservedCompanyValidator : ApplicationFormBaseValidator<RequestForCertificateForReservedCompany>
    {
        protected override IErrorCollection ValidateInternal(RequestForCertificateForReservedCompany application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            if (application != null && application.Certificate != null)
            {
                var emailErrors = ValidateEmail(application.Certificate.Email);
                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }
    }
}