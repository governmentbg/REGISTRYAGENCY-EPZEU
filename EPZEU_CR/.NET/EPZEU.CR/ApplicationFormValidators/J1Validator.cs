using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class J1Validator : ApplicationFormBaseValidator<J1>
    {
        protected override IErrorCollection ValidateInternal(J1 application, bool isMainApplication = true)
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

            var incomingNumberErr = ValidateIncomingNumber(application);
            if (incomingNumberErr != null)
                errors.Add(incomingNumberErr);

            return errors;
        }

        private IError ValidateIncomingNumber(J1 application)
        {
            if (application.IncomingNumber == null || string.IsNullOrWhiteSpace(application.IncomingNumber.IncomingNo))
                return new TextError("GL_INPUT_APPLICATION_NO_E", "GL_INPUT_APPLICATION_NO_E");

            var appInfo = ApplicationServiceClient.SearchApplicationInfoAsync(new Integration.EPZEU.Models.SearchCriteria.ApplicationInfoSearchCriteria()
            {
                IncomingNumber = application.IncomingNumber.IncomingNo,
                Mode = Integration.EPZEU.Models.SearchCriteria.ApplicationInfoSearchMode.IncomingNumberOrEntryNumber
            }).GetAwaiter().GetResult();

            if (appInfo.Count == 0)
                return new TextError("GL_INPUT_APPLICATION_NO_E", "GL_INPUT_APPLICATION_NO_E");

            return null;
        }
    }
}