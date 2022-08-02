using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class E1Validator : ApplicationFormBaseValidator<E1>
    {
        protected override IErrorCollection ValidateInternal(E1 application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            var appInfoErrors = ValidateApplicantInfo(application.ApplicantInfo);
            if (appInfoErrors != null && appInfoErrors.Count > 0)
                errors.AddRange(appInfoErrors);

            var appExchangeErrors = ValidateApplicantExchange(application.ApplicantExchange);
            if (appExchangeErrors != null && appExchangeErrors.Count > 0)
                errors.AddRange(appExchangeErrors);

            var docErrors = ValidateApplicationDocuments(application.Documents);
            if (docErrors != null)
                errors.Add(docErrors);

            return errors;
        }
    }
}