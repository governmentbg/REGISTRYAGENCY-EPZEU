using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class ActOfContestationValidator : ApplicationFormBaseValidator<ActOfContestation>
    {
        protected override IErrorCollection ValidateInternal(ActOfContestation application, bool isMainApplication = true)
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

            if (application.ContestationAct != null)
            {
                var contestationActErrors = ValidateContestationAct(application.ContestationAct);
                if (contestationActErrors != null && contestationActErrors.Count > 0)
                    errors.AddRange(contestationActErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors;
        }

        private IErrorCollection ValidateContestationAct(ContestationAct contestationAct)
        {
            var errors = new ErrorCollection();

            if (string.IsNullOrWhiteSpace(contestationAct.IncomingNumber))
                errors.Add(new TextError("GL_INPUT_FIELD_MUST_E", "GL_INPUT_FIELD_MUST_E"));
            else if (string.IsNullOrWhiteSpace(contestationAct.CourtCode))
                errors.Add(new TextError("CR_APP_INPUT_COURT_CODE_NAME_E", "CR_APP_INPUT_COURT_CODE_NAME_E"));
            else if (string.IsNullOrWhiteSpace(contestationAct.OutgoingNumber))
                errors.Add(new TextError("GL_INPUT_FIELD_MUST_E", "GL_INPUT_FIELD_MUST_E"));
            else if (string.IsNullOrWhiteSpace(contestationAct.ActNumber))
                errors.Add(new TextError("GL_INPUT_FIELD_MUST_E", "GL_INPUT_FIELD_MUST_E"));
            else if (contestationAct.FromDate == null)
                errors.Add(new TextError("GL_INPUT_FIELD_MUST_E", "GL_INPUT_FIELD_MUST_E"));

            return errors.Count > 0 ? errors : null;
        }
    }
}