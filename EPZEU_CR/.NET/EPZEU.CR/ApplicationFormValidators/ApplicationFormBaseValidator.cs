using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace EPZEU.CR.ApplicationFormValidators
{
    public interface IApplicationFormValidator
    {
        IErrorCollection Validate(IApplicationForm application, bool isMainApplication);
    }

    internal abstract class ApplicationFormBaseValidator<TApp> : IApplicationFormValidator
        where TApp : IApplicationForm
    {
        const string EMAIL_PATTERN = @"(?=^.{1,64}@)^[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?=.{1,255}$|.{1,255};)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])(;(?=.{1,64}@)[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?=.{1,255}$|.{1,255};)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9]))*$";

        public IEkatte Ekatte { protected get; set; }

        public IApplicationDocumentTypes ApplicationDocumentTypes { protected get; set; }

        public IDeedReportServiceClient DeedReportServiceClient { protected get; set; }

        public IAssignmentReportServiceClient AssignmentReportServiceClient { protected get; set; }

        public IApplicationServiceClient ApplicationServiceClient { protected get; set; }

        public IErrorCollection Validate(IApplicationForm application, bool isMainApplication = true)
        {
            return ValidateInternal((TApp)application, isMainApplication);
        }

        protected virtual IErrorCollection ValidateInternal(TApp application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();
            if (isMainApplication && !(application is RequestForCertificateBase))
            {
                var gdprErrors = ValidateGDPRAgreement(application);
                if (gdprErrors != null)
                    errors.Add(gdprErrors);
            }

            return errors;
        }

        #region Helpers

        protected IError ValidateApplicationDocuments(IList<AttachedDocument> documents)
        {
            if (documents == null || documents.Count == 0)
                return new TextError("GL_NOATTACHED_DOCUMENTS_E", "GL_NOATTACHED_DOCUMENTS_E");

            return null;
        }

        protected IError ValidateGDPRAgreement(IApplicationForm application)
        {
            if (application.GDPRAgreement == null 
                || application.GDPRAgreement.IsGDPRAgreementAccepted != true
                || string.IsNullOrEmpty(application.GDPRAgreement.GDPRAgreementText))
                return new TextError("GL_APP_GDPR_GIVING_CONSENT_E", "GL_APP_GDPR_GIVING_CONSENT_E");

            return null;
        }

        protected IErrorCollection ValidateApplicantExchange(ApplicantExchange applicantExchange, bool validateAddress = true)
        {
            var errors = new ErrorCollection();

            if (applicantExchange != null)
            {
                if (applicantExchange.Agree == true)
                {
                    if (!IsValidMultiEmailAdresses(applicantExchange.Email))
                        errors.Add(new TextError("GL_INPUT_VALID_EMAIL_E", "GL_INPUT_VALID_EMAIL_E"));
                }

                if (validateAddress == true)
                {
                    var addressErrors = ValidateAddress(applicantExchange.Address, true);
                    if (addressErrors != null)
                        errors.Add(addressErrors);
                }
            }
            else
                errors.Add(new TextError("CR_APP_00006_E", "CR_APP_00006_E"));

            return errors;
        }

        protected IErrorCollection ValidateApplicantInfo(ApplicantInfo applicantInfo)
        {
            var errors = new ErrorCollection();
            IErrorCollection applicantErrors;

            if (applicantInfo == null)
            {
                errors.Add(new TextError("GL_INPUT_PERSON_NAME_E", "GL_INPUT_PERSON_NAME_E"));
                return errors;
            }

            if (applicantInfo.Applicants != null && applicantInfo.Applicants.ApplicantsList != null && applicantInfo.Applicants.ApplicantsList.Count > 0)
            {
                for (int i = 0; i < applicantInfo.Applicants.ApplicantsList.Count; i++)
                {
                    applicantErrors = ValidateApplicant(applicantInfo.Applicants.ApplicantsList[i]);
                    if (applicantErrors != null && applicantErrors.Count > 0)
                    {
                        errors.AddRange(applicantErrors);
                        break;
                    }
                }
            }
            else
                errors.Add(new TextError("GL_INPUT_PERSON_NAME_E", "GL_INPUT_PERSON_NAME_E"));

            //ApplicantRepresentative
            //TODO

            return errors;
        }

        protected IErrorCollection ValidateApplicant(Applicant applicant)
        {
            var errors = new ErrorCollection();

            if (applicant == null)
                errors.Add(new TextError("GL_INPUT_PERSON_NAME_E", "GL_INPUT_PERSON_NAME_E"));//Грешката се визуализира при невъведено име на физическо лице 
            else
            {
                var isValidApplicantIdent = applicant.Person.IndentType == IndentTypes.EGN || applicant.Person.IndentType == IndentTypes.LNCH || applicant.Person.IndentType == IndentTypes.BirthDate;

                var personErrors = ValidatePerson(applicant.Person);
                if (personErrors != null && personErrors.Count > 0)
                    errors.AddRange(personErrors);

                if (errors.Count > 0)
                    return errors;

                if (string.IsNullOrWhiteSpace(applicant.Person.Name))
                    errors.Add(new TextError("GL_INPUT_PERSON_NAME_E", "GL_INPUT_PERSON_NAME_E"));//Грешката се визуализира при невъведено име на физическо лице 

                if (string.IsNullOrWhiteSpace(applicant.Person.Indent))
                    errors.Add(new TextError("GL_INPUT_PERSON_ID_BIRTHDATE_E", "GL_INPUT_PERSON_ID_BIRTHDATE_E"));//Грешката трябва да се визуализира при непопълнена стойност в полето ЕГН/ЛНЧ/Дата на раждане

                if (applicant.Person.IndentType == IndentTypes.BirthDate)
                {
                    if (applicant.BirthPlace == null || string.IsNullOrWhiteSpace(applicant.BirthPlace.Country) || string.IsNullOrWhiteSpace(applicant.BirthPlace.Place))
                        errors.Add(new TextError("CR_APP_INPUT_BIRTHPLACE_E", "CR_APP_INPUT_BIRTHPLACE_E"));
                    else
                    {
                        var addressErrors = ValidateAddress(applicant.Address, false);
                        if (addressErrors != null)
                            errors.Add(addressErrors);
                    }
                }
            }

            return errors.Count > 0 ? errors : null;
        }

        /// <summary>
        /// базова контрола за физическо лице - име + идентификатор
        /// 1. Дали са попълнени и двете полета; 2. Дали идентификатора е валиден; 3. Дали името е валидно за физическо лице
        /// </summary>
        /// <returns>IErrorCollection</returns>
        protected IErrorCollection ValidatePerson(Person person)
        {
            var errors = new ErrorCollection();

            if (person != null)
            {
                var isForeignTrader = person.IsForeignTrader ?? false;

                //Грешката се визуализира когато има непопълнено поле Име на физическо лице и/или ЕГН/ЛНЧ/Дата на раждане 
                if (IsNameOrIdentRequired(person.Name, person.Indent, isForeignTrader))
                    errors.Add(new TextError("GL_INPUT_NAME_ID_E", "GL_INPUT_NAME_ID_E"));

                if (!isForeignTrader && !string.IsNullOrWhiteSpace(person.Indent) && !IsValidIdent(person.Indent))
                    errors.Add(new TextError("GL_INVALID_IDENTIFIER_E", "GL_INVALID_IDENTIFIER_E"));
                else
                {
                    if (person.IndentType == IndentTypes.Undefined || !IsValidIdent(IndentValidationMode.EgnLnchBd, person.Indent))
                        errors.Add(new TextError("GL_INVALID_IDENTIFIER_E", "GL_INVALID_IDENTIFIER_E"));//Грешката се визуализира когато е попълнена невалидна стойност в поле идентификатор (различна от ЕГН/ЛНЧ/Дата на раждане)
                }

                // Грешката се визуализира когато въведеното име на физическо лице не отговаря на Валидация за попълване на име на физическо лице
                if (!IsValidPersonName(person.Name))
                    errors.Add(new TextError("GL_INPUT_CORRECT_NAME_E", "GL_INPUT_CORRECT_NAME_E"));
            }
            else
                errors.Add(new TextError("GL_INPUT_NAME_ID_E", "GL_INPUT_NAME_ID_E"));

            return errors;
        }

        protected IErrorCollection ValidateSubjectFLE(Person subject)
        {
            var errors = new ErrorCollection();

            if (subject != null)
            {
                var isForeignTrader = subject.IsForeignTrader ?? false;

                if (!isForeignTrader && !string.IsNullOrWhiteSpace(subject.Indent) && !IsValidIdent(subject.Indent))
                    errors.Add(new TextError("GL_INVALID_IDENTIFIER_E", "GL_INVALID_IDENTIFIER_E"));

                //Грешката се визуалзира в случай, че е попълнено само едно от полетата Име или идентификатор или Чуждестранно юридическо лице:
                if (IsNameOrIdentRequired(subject.Name, subject.Indent, isForeignTrader))
                    errors.Add(new TextError("CR_APP_00016_Е", "CR_APP_00016_Е"));

                if (!isForeignTrader && !string.IsNullOrWhiteSpace(subject.Indent) && subject.IndentType == IndentTypes.Undefined)
                    errors.Add(new TextError("GL_INVALID_IDENTIFIER_E", "GL_INVALID_IDENTIFIER_E"));
            }
            else
                errors.Add(new TextError("GL_INPUT_NAME_ID_E", "GL_INPUT_NAME_ID_E"));

            return errors;
        }

        protected IError ValidateAddress(Address address, bool isFullAddressValidation)
        {
            var errorMsg = isFullAddressValidation ? "CR_APP_00006_E" : "CR_APP_00005_E";

            if (address != null)
            {
                var hasAreas = address.SettlementID != null && Ekatte.GetAreas().Any(x => x.SettlementID == address.SettlementID);

                if (address.CountryID == null)
                    return new TextError(errorMsg, errorMsg);
                else if (address.CountryCode != "BGR")//TODO: Кода да се изчита от конфигурация!
                {
                    if (string.IsNullOrWhiteSpace(address.ForeignPlace))
                        return new TextError(errorMsg, errorMsg);
                }
                else
                {
                    if (address.SettlementID == null || (hasAreas && address.AreaID == null) || string.IsNullOrWhiteSpace(address.PostCode))
                        return new TextError(errorMsg, errorMsg);

                    if (isFullAddressValidation)
                    {
                        if (string.IsNullOrWhiteSpace(address.HousingEstate) && string.IsNullOrWhiteSpace(address.Street))
                            return new TextError(errorMsg, errorMsg);

                        if (!string.IsNullOrWhiteSpace(address.HousingEstate))
                            if (string.IsNullOrWhiteSpace(address.Block) || string.IsNullOrWhiteSpace(address.Entrance) || string.IsNullOrWhiteSpace(address.Floor) || string.IsNullOrWhiteSpace(address.Apartment))
                                return new TextError(errorMsg, errorMsg);

                        if (!string.IsNullOrWhiteSpace(address.Street) && string.IsNullOrWhiteSpace(address.StreetNumber))
                            return new TextError(errorMsg, errorMsg);
                    }
                }
            }
            else
                return new TextError(errorMsg, errorMsg);

            return null;
        }

        protected IError ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return new TextError("GL_INPUT_VALID_EMAIL_E", "GL_INPUT_VALID_EMAIL_E");

            if (!Regex.IsMatch(email, EMAIL_PATTERN))
                return new TextError("GL_INVALID_EMAIL_E", "GL_INVALID_EMAIL_E");

            return null;
        }

        protected bool IsValidMultiEmailAdresses(string emailAdresseses)
        {
            if (string.IsNullOrWhiteSpace(emailAdresseses))
                return false;

            var emails = emailAdresseses.Split(';');

            for (int i = 0; i < emails.Length; i++)
            {
                if (!Regex.IsMatch(emails[i].Trim(), EMAIL_PATTERN))
                    return false;
            }

            return true;
        }

        protected bool IsNameOrIdentRequired(string name, string ident, bool isForeignTrader)
        {
            //Валидацията връща да, когато едно от полетата име или идентификатор липсва
            //При избрано чуждестранно юридическо лице, полето идентификатор може и да не е попълнено

            if ((!string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(ident) && !isForeignTrader)
                || (string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(ident))
                || (string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(ident) && isForeignTrader))
                return true;

            return false;
        }

        protected bool IsValidIdent(IndentValidationMode indentMode, string ident)
        {
            if (indentMode == IndentValidationMode.All)
            {
                if (!IsValidEGN(ident) && !IsValidLNCH(ident) && !IsValidBirthDate(ident) && !IsValidUIC(ident))
                    return false;
            }
            else if (indentMode == IndentValidationMode.EgnLnchBd)
            {
                if (!IsValidEGN(ident) && !IsValidLNCH(ident) && !IsValidBirthDate(ident))
                    return false;
            }
            else if (indentMode == IndentValidationMode.EgnLnch)
            {
                if (!IsValidEGN(ident) && !IsValidLNCH(ident))
                    return false;
            }
            else if (indentMode == IndentValidationMode.UIC)
            {
                if (!IsValidUIC(ident))
                    return false;
            }
            else if (indentMode == IndentValidationMode.EGN)
            {
                if (!IsValidEGN(ident))
                    return false;
            }

            return true;
        }

        protected bool IsValidPersonName(string name)
        {
            //Текстовото поле не трябва да съдържа символи различни от:
            //букви на кирилица
            //букви на латиница
            //други символи - празна позиция, тире и апостроф  

            if (string.IsNullOrWhiteSpace(name))
                return true;

            var pattern = @"^[А-Яа-яA-Za-z-' ]+$";

            if (!Regex.IsMatch(name, pattern))
                return false;

            return true;
        }

        protected bool IsValidIdent(string ident)
        {
            //допускат се само цифри от 0 до 9 с дължина от 6 до 10.  

            if (string.IsNullOrWhiteSpace(ident))
                return true;

            var pattern = @"^[0-9]{6,10}$";

            if (!Regex.IsMatch(ident, pattern))
                return false;

            return true;
        }

        protected bool IsValidCompanyName(string companyName)
        {
            //Полето трябва да е изписано на кирилица. 
            var pattern = @"^[А-Яа-я0-9-()!@${}^|%&<>\\\\.,?\';+ ~=""#*:\d_/]+$";

            if (string.IsNullOrWhiteSpace(companyName) || !Regex.IsMatch(companyName, pattern))
                return false;

            return true;
        }

        protected bool HasOneOrMoreMainDocUploaded(IApplicationForm app)
        {
            if (app.Documents == null)
                return false;

            DateTime? lastModified;
            var mainDocs = ApplicationDocumentTypes.GetApplicationDocumentTypes(((int)app.AppType).ToString(), out lastModified).Where(x => x.MinOccurs == 1 && x.MaxOccurs == 1);

            if (mainDocs.Count() > 0)
            {
                foreach (var mainDoc in mainDocs)
                {
                    if (app.Documents.Any(doc => doc.DocumentTypeID == mainDoc.DocumentTypeID))
                        return true;
                }
            }

            return false;
        }

        protected bool IsLeapYear(int year)
        {
            if (year % 400 == 0)
                return true;

            if (year % 100 == 0)
                return false;

            if (year % 4 == 0)
                return true;

            return false;
        }

        protected bool IsValidBirthDate(string birthDate)
        {
            if (birthDate.Length != 6)
                return false;

            var digits = GetIdentAsDigits(birthDate);

            int[] days = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

            //проверка за дата на раждане
            int dd = digits[4] * 10 + digits[5],
                mm = digits[2] * 10 + digits[3],
                yy = digits[0] * 10 + digits[1],
                yyyy = 0;

            if (mm >= 1 && mm <= 12) { yyyy = 1900 + yy; }
            else if (mm >= 21 && mm <= 32) { mm -= 20; yyyy = 1800 + yy; }
            else if (mm >= 41 && mm <= 52) { mm -= 40; yyyy = 2000 + yy; }
            else
                return false;

            days[1] += IsLeapYear(yyyy) ? 1 : 0;

            if (!(dd >= 1 && dd <= days[mm - 1]))
                return false;

            return true;
        }

        protected bool IsValidUIC(string ident)
        {
            int checksum = 0;
            var digits = GetIdentAsDigits(ident);

            if (digits.Count < 9)
                return false;

            for (int j = 0; j < (ident.Length - 1); j++)
            {
                checksum += digits[j] * (j + 1);
            }

            checksum %= 11;

            if (10 == checksum)
            {
                checksum = 0;

                for (int j = 0; j < (ident.Length - 1); j++)
                {
                    checksum += digits[j] * (j + 3);
                }

                checksum %= 11;

                if (10 == checksum)
                    checksum = 0;
            }

            if (digits[8] != checksum)
                return false;

            return true;
        }

        protected bool IsValidEGN(string Id)
        {
            var digits = GetIdentAsDigits(Id);

            if (digits.Count < 10)
                return false;

            int[] coeffs = { 2, 4, 8, 5, 10, 9, 7, 3, 6 };
            int[] days = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

            //проверка за дата на раждане
            if (!IsValidBirthDate(Id.Substring(0, 6))) return false;

            //	проверка за чексума
            int checksum = 0;

            for (int j = 0; j < coeffs.Length; j++)
            {
                checksum += digits[j] * coeffs[j];
            }

            checksum %= 11;

            if (10 == checksum)
                checksum = 0;

            if (digits[9] != checksum)
                return false;

            return true;
        }

        protected bool IsValidLNCH(string Id)
        {
            var digits = GetIdentAsDigits(Id);

            if (digits.Count < 10)
                return false;

            int[] coeffs = { 21, 19, 17, 13, 11, 9, 7, 3, 1 };
            int checksum = 0; // (digits[0] * 21 + digits[1] * 19 + digits[2] * 17 + digits[3] * 13 + digits[4] * 11 + digits[5] * 9 + digits[6] * 7 + digits[7] * 3 + digits[8] * 1) % 10;

            for (int j = 0; j < coeffs.Length; j++)
            {
                checksum += digits[j] * coeffs[j];
            }

            checksum %= 10;
            if (checksum == 10) checksum = 0;

            if (checksum != digits[9])
                return false;

            return true;
        }

        private List<int> GetIdentAsDigits(string ident)
        {
            if (!string.IsNullOrWhiteSpace(ident))
            {
                var digits = new List<int>();

                for (int i = 0; i < ident.Length; i++)
                {
                    int digitCandidate;

                    if (int.TryParse(ident[i].ToString(), out digitCandidate))
                        digits.Add(digitCandidate);
                }

                if (ident.Length == digits.Count)
                    return digits;
            }

            return new List<int>();
        }

        #endregion
    }

    internal enum IndentValidationMode
    {
        All, //egn, lnch, Uic, bulstat, birthdate
        EgnLnchBd, //egn, lnch, birthdate
        EgnLnch, //egn, lnch
        UIC,
        EGN
    }
}
