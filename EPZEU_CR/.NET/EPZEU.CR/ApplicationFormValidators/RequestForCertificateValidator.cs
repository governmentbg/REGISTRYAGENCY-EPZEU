using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class RequestForCertificateValidator<T> : ApplicationFormBaseValidator<T>
        where T : IApplicationForm
    {
        protected override IErrorCollection ValidateInternal(T application, bool isMainApplication = true)
        {
            var errors = new ErrorCollection();

            if (application.AppType == ApplicationFormTypes.ActualStateCertificate)
            {
                // 1.Удостоверение за актуално състояние
                var actualStateCertificateErrors = ActualStateCertificateValidator(application as RequestForActualStateCertificate);

                if (actualStateCertificateErrors != null && actualStateCertificateErrors.Count > 0)
                    errors.AddRange(actualStateCertificateErrors);
            }
            else if (application.AppType == ApplicationFormTypes.EntryByPeriodCertificate)
            {
                // 2. Удостоверение за вписвания за определен период (извлечение)
                var entryByPeriodCertificateErrors = EntryByPeriodCertificateValidator(application as RequestForEntryByPeriodCertificate);

                if (entryByPeriodCertificateErrors != null && entryByPeriodCertificateErrors.Count > 0)
                    errors.AddRange(entryByPeriodCertificateErrors);
            }
            else if (application.AppType == ApplicationFormTypes.PublicationByPeriodCertificate)
            {
                // 3. Удостоверение за обявявания за определен период (извлечение)
                var publicationByPeriodCertificateErrors = PublicationByPeriodCertificateValidator(application as RequestForPublicationByPeriodCertificate);

                if (publicationByPeriodCertificateErrors != null && publicationByPeriodCertificateErrors.Count > 0)
                    errors.AddRange(publicationByPeriodCertificateErrors);
            }
            else if (application.AppType == ApplicationFormTypes.EnteredCircumstancesCertificate)
            {
                // 4. Удостоверение за вписано обстоятелство
                var enteredCircumstancesCertificateErrors = EnteredCircumstancesCertificateValidator(application as RequestForEnteredCircumstancesCertificate);

                if (enteredCircumstancesCertificateErrors != null && enteredCircumstancesCertificateErrors.Count > 0)
                    errors.AddRange(enteredCircumstancesCertificateErrors);
            }
            else if (application.AppType == ApplicationFormTypes.ActOrCopyOfActCertificate)
            {
                // 5. Удостоверение за обявяване или копие от обявен акт
                var actOrCopyOfActCertificateErrors = ActOrCopyOfActCertificateValidator(application as RequestForActOrCopyOfActCertificate);

                if (actOrCopyOfActCertificateErrors != null && actOrCopyOfActCertificateErrors.Count > 0)
                    errors.AddRange(actOrCopyOfActCertificateErrors);
            }
            else if (application.AppType == ApplicationFormTypes.MissingActsCertificate)
            {
                // 6. Удостоверение за липса на вписано обстоятелство или обявен акт в търговския регистър MissingActsCertificate
                var missingActsCertificateErrors = MissingActsCertificateValidator(application as RequestForMissingActsCertificate);

                if (missingActsCertificateErrors != null && missingActsCertificateErrors.Count > 0)
                    errors.AddRange(missingActsCertificateErrors);
            }

            return errors;
        }

        #region Sub validators

        private IErrorCollection ActualStateCertificateValidator(RequestForActualStateCertificate actualStateCertificate)
        {
            var errors = new ErrorCollection();

            if (actualStateCertificate != null && actualStateCertificate.Certificate != null)
            {
                var dateToErrors = ValidateDateTo(actualStateCertificate.Certificate.DateTo);

                if (dateToErrors != null)
                    errors.Add(dateToErrors);

                var emailErrors = ValidateEmail(actualStateCertificate.Certificate.Email);

                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }

        private IErrorCollection EntryByPeriodCertificateValidator(RequestForEntryByPeriodCertificate entryByPeriodCertificate)
        {
            var errors = new ErrorCollection();

            if (entryByPeriodCertificate != null && entryByPeriodCertificate.Certificate != null)
            {
                var datePeriodErrors = ValidateDatePeriod(entryByPeriodCertificate.Certificate.DateFrom, entryByPeriodCertificate.Certificate.DateTo);

                if (datePeriodErrors != null)
                    errors.AddRange(datePeriodErrors);

                var emailErrors = ValidateEmail(entryByPeriodCertificate.Certificate.Email);

                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }

        private IErrorCollection PublicationByPeriodCertificateValidator(RequestForPublicationByPeriodCertificate publicationByPeriodCertificate)
        {
            var errors = new ErrorCollection();

            if (publicationByPeriodCertificate != null && publicationByPeriodCertificate.Certificate != null)
            {
                var datePeriodErrors = ValidateDatePeriod(publicationByPeriodCertificate.Certificate.DateFrom, publicationByPeriodCertificate.Certificate.DateTo);

                if (datePeriodErrors != null)
                    errors.AddRange(datePeriodErrors);

                var emailErrors = ValidateEmail(publicationByPeriodCertificate.Certificate.Email);

                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }

        private IErrorCollection EnteredCircumstancesCertificateValidator(RequestForEnteredCircumstancesCertificate enteredCircumstancesCertificate)
        {
            var errors = new ErrorCollection();

            if (enteredCircumstancesCertificate != null && enteredCircumstancesCertificate.Certificate != null)
            {
                var dateToErrors = ValidateDateTo(enteredCircumstancesCertificate.Certificate.DateTo);

                if (dateToErrors != null)
                    errors.Add(dateToErrors);
                else
                {
                    var fieldIdentsErrors = ValidateFieldIdents(enteredCircumstancesCertificate.Certificate.FieldIdents,
                        enteredCircumstancesCertificate.Certificate.UICNumber,
                        enteredCircumstancesCertificate.Certificate.DateTo,
                        enteredCircumstancesCertificate.Certificate.IncludeHistory);

                    if (fieldIdentsErrors != null)
                        errors.Add(fieldIdentsErrors);
                }

                var emailErrors = ValidateEmail(enteredCircumstancesCertificate.Certificate.Email);

                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }

        private IErrorCollection MissingActsCertificateValidator(RequestForMissingActsCertificate missingActsCertificate)
        {
            var errors = new ErrorCollection();

            if (missingActsCertificate != null && missingActsCertificate.Certificate != null)
            {
                var dateToErrors = ValidateDateTo(missingActsCertificate.Certificate.DateTo);

                if (dateToErrors != null)
                    errors.Add(dateToErrors);

                var emailErrors = ValidateEmail(missingActsCertificate.Certificate.Email);

                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }

        private IErrorCollection ActOrCopyOfActCertificateValidator(RequestForActOrCopyOfActCertificate actOrCopyOfActCertificate)
        {
            var errors = new ErrorCollection();

            if (actOrCopyOfActCertificate != null && actOrCopyOfActCertificate.Certificate != null)
            {

                var fieldIdentsErrors = ValidateFieldIdents(actOrCopyOfActCertificate.Certificate.FieldIdents,
                    actOrCopyOfActCertificate.Certificate.UICNumber,
                    actOrCopyOfActCertificate.Certificate.DateTo,
                    actOrCopyOfActCertificate.Certificate.IncludeHistory,
                    "CR_APP_SELECT_ACT_E");

                if (fieldIdentsErrors != null)
                    errors.Add(fieldIdentsErrors);

                var emailErrors = ValidateEmail(actOrCopyOfActCertificate.Certificate.Email);

                if (emailErrors != null)
                    errors.Add(emailErrors);
            }
            else
                errors.Add(new TextError("GL_INVALID_MANDATORY_DATA_E", "GL_INVALID_MANDATORY_DATA_E"));

            return errors.Count > 0 ? errors : null;
        }

        #endregion

        #region Validation helpers

        private IError ValidateDateTo(DateTime? date)
        {
            if (date == null)
                return new TextError("GL_INPUT_DATE_E", "GL_INPUT_DATE_E");

            var dt =  new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            dt = dt.AddDays(1);

            if (date.Value >= dt)
                return new TextError("CR_APP_00228_E", "CR_APP_00228_E");

            return null;
        }

        private IErrorCollection ValidateDatePeriod(DateTime? dateFrom, DateTime? dateTo)
        {
            var errors = new ErrorCollection();

            var dateToErrors = ValidateDateTo(dateTo);
            if (dateToErrors != null)
                errors.Add(dateToErrors);

            if (dateFrom == null)
                errors.Add(new TextError("GL_INPUT_DATE_E", "GL_INPUT_DATE_E"));

            if (dateFrom != null && dateTo != null && dateFrom > dateTo)
                errors.Add(new TextError("GL_PERIOD_START_DATE_MUST_LESS_E", "GL_PERIOD_START_DATE_MUST_LESS_E"));

            return errors.Count > 0 ? errors : null;
        }

        private IError ValidateFieldIdents(IList<string> fieldIdents, string uic, DateTime? dateTo, bool? includeHistory, string noFieldIdentsSelectedMsgKey = "CR_GL_SELECT_SECTION_GROUP_FIELD_E")
        {
            if (fieldIdents == null || fieldIdents.Count == 0)
                return new TextError("CR_GL_SELECT_SECTION_GROUP_FIELD_E", noFieldIdentsSelectedMsgKey);
            else
            {
                var fieldIdentsResponse = DeedReportServiceClient.GetFieldIdentsAsync(uic, new DeedLoadOption()
                {
                    EntryDate = dateTo,
                    LoadLinkedDeeds = true,
                    LoadErasedFields = includeHistory ?? false,
                    CheckHasInstructions = true,
                    SearchByFullFieldIndent = true,
                }).GetAwaiter().GetResult().ToList();

                var hasMatch = false;

                for (var i = 0; i < fieldIdents.Count; i++)
                {

                    for (var j = 0; j < fieldIdentsResponse.Count; j++)
                    {
                        if (fieldIdents[i] == fieldIdentsResponse[j])
                        {
                            hasMatch = true;
                            break;
                        }
                    }

                    if (hasMatch)
                        break;
                }

                if (!hasMatch)
                    return new TextError("CR_GL_NO_RESULTS_E", "CR_GL_NO_RESULTS_E");
            }

            return null;
        }

        #endregion
    }
}