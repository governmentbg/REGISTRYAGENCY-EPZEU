using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class AppealRefusalValidator : ApplicationFormBaseValidator<AppealRefusal>
    {
        protected override IErrorCollection ValidateInternal(AppealRefusal application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            if (!HasOneOrMoreMainDocUploaded(application))
                errors.Add(new TextError("GL_NOATTACHED_DOCUMENTS_E", "GL_NOATTACHED_DOCUMENTS_E"));

            if (application.Refusal != null)
            {
                if (string.IsNullOrWhiteSpace(application.Refusal.IncomingNo))
                    errors.Add(new TextError("GL_INPUT_INCOMING_NO_E", "GL_INPUT_INCOMING_NO_E"));
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            if (application.ComplaintPersons != null && application.ComplaintPersons.ComplaintPersonsList != null && application.ComplaintPersons.ComplaintPersonsList.Count > 0)
            {
                for (int i = 0; i < application.ComplaintPersons.ComplaintPersonsList.Count; i++)
                {
                    var complaintPersonsErrors = ValidateComplaintPerson(application.ComplaintPersons.ComplaintPersonsList[i]);
                    if (complaintPersonsErrors != null && complaintPersonsErrors.Count > 0)
                    {
                        errors.AddRange(complaintPersonsErrors);
                        break;
                    }
                }

                if (!application.ComplaintPersons.ComplaintPersonsList.Any(x => x.IncludeApplicant))
                    errors.Add(new TextError("CR_APP_00183_E", "CR_APP_00183_E")); //Изберете поне един заявител
            }
            else
                errors.Add(new TextError("CR_APP_00025_E", "CR_APP_00025_E"));//Изберете поне един жалбоподател

            return errors;
        }

        private IErrorCollection ValidateComplaintPerson(ComplaintPerson complaintPerson)
        {
            var errors = new ErrorCollection();

            if (complaintPerson == null)
                errors.Add(new TextError("GL_INPUT_PERSON_NAME_E", "GL_INPUT_PERSON_NAME_E"));//Грешката се визуализира при невъведено име на физическо лице 
            else
            {
                var personErrors = ValidatePerson(complaintPerson.Person);
                if (personErrors != null && personErrors.Count > 0)
                    errors.AddRange(personErrors);

                if (errors.Count > 0)
                    return errors;

                if (IsValidBirthDate(complaintPerson.Person.Indent))
                {
                    if (string.IsNullOrWhiteSpace(complaintPerson.BirthCountry) || string.IsNullOrWhiteSpace(complaintPerson.BirthPlace))
                        errors.Add(new TextError("CR_APP_INPUT_BIRTHPLACE_E", "CR_APP_INPUT_BIRTHPLACE_E"));
                    else
                    {
                        var addressErrors = ValidateAddress(complaintPerson.Address, false);
                        if (addressErrors != null)
                            errors.Add(addressErrors);
                    }
                }
            }

            return errors.Count > 0 ? errors : null;
        }
    }
}