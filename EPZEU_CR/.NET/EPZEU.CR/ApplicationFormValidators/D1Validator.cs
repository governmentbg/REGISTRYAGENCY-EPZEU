using CNSys;
using EPZEU.CR.Domain.ApplicationForms;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class D1Validator : ApplicationFormBaseValidator<D1>
    {
        protected override IErrorCollection ValidateInternal(D1 application, bool isMainApplication = true)
        {
            var errors = (ErrorCollection)base.ValidateInternal(application);

            var appInfoErrors = ValidateApplicantInfo(application.ApplicantInfo);
            if (appInfoErrors != null && appInfoErrors.Count > 0)
                errors.AddRange(appInfoErrors);

            var appExchangeErrors = ValidateApplicantExchange(application.ApplicantExchange);
            if (appExchangeErrors != null && appExchangeErrors.Count > 0)
                errors.AddRange(appExchangeErrors);

            if (application.Fields != null)
            {
                if (application.Fields.Company == null || !IsValidCompanyName(application.Fields.Company.Text))
                    errors.Add(new TextError("CR_APP_INPUT_COMPANY_NAME_E", "CR_APP_INPUT_COMPANY_NAME_E"));

                if (application.Fields.PersonConcerned != null)
                {
                    if (application.Fields.PersonConcerned.Subject != null)
                    {
                        var subjectErrors = ValidateSubjectFLE(application.Fields.PersonConcerned.Subject);
                        if (subjectErrors != null && subjectErrors.Count > 0)
                        {
                            foreach (var error in subjectErrors)
                            {
                                errors.Add(error);
                            }
                        }

                        if (string.IsNullOrWhiteSpace(application.Fields.PersonConcerned.Subject.Name))
                            errors.Add(new TextError("CR_FILL_NAME_E", "CR_FILL_NAME_E"));

                        if (application.Fields.PersonConcerned.Subject.IsForeignTrader == true)
                        {
                            var addressErrors = ValidateAddress(application.Fields.PersonConcerned.Address, false);
                            if (addressErrors != null)
                                errors.Add(addressErrors);
                        }
                    }
                }
                else
                    errors.Add(new TextError("CR_FILL_NAME_E", "CR_FILL_NAME_E"));

                if (application.ApplicationState == ProcessStates.ForChange)
                {
                    if (application.Fields.EraseReservation == null || application.Fields.EraseReservation.Cheked == false)
                        errors.Add(new TextError("CR_APP_00026_E", "CR_APP_00026_E"));
                }
            }
            else
                errors.Add(new TextError("CR_APP_INPUT_COMPANY_NAME_E", "CR_APP_INPUT_COMPANY_NAME_E"));

            var docErrors = ValidateApplicationDocuments(application.Documents);
            if (docErrors != null)
                errors.Add(docErrors);

            return errors;
        }
    }
}
