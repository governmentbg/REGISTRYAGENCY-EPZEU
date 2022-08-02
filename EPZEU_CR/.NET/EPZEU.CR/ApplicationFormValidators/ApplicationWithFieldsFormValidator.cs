using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.CR.ApplicationFormValidators
{
    internal class ApplicationWithFieldsFormValidator<T> : ApplicationFormBaseValidator<T>
        where T : IApplicationWithFieldsForm
    {
        public List<Func<IApplicationWithFieldsForm, RecordField>> AdemptionFieldFunc { get; set; }

        public List<Func<RecordField, bool>> FuncAdemptionFieldChecked { get; set; }

        protected override IErrorCollection ValidateInternal(T application, bool isMainApplication = true)
        {
            var errors = (ErrorCollection)base.ValidateInternal(application, isMainApplication);

            //Ако е от тип А, Б, В, Г или Д заявление
            if (isMainApplication)
            {
                var appInfoErrors = ValidateApplicantInfo(application.ApplicantInfo);
                if (appInfoErrors != null && appInfoErrors.Count > 0)
                    errors.AddRange(appInfoErrors);

                var appExchangeErrors = ValidateApplicantExchange(application.ApplicantExchange);
                if (appExchangeErrors != null && appExchangeErrors.Count > 0)
                    errors.AddRange(appExchangeErrors);
            }

            if (application.AppType != ApplicationFormTypes.G1 && application.AppType != ApplicationFormTypes.G2 && application.AppType != ApplicationFormTypes.G3)
            {
                var docErrors = ValidateApplicationDocuments(application.Documents);
                if (docErrors != null)
                    errors.Add(docErrors);
            }

            if (application.ApplicationState == ProcessStates.ForChange && application.AppType != ApplicationFormTypes.D1 && application.AppType != ApplicationFormTypes.J1)
            {
                if (AdemptionFieldFunc != null && AdemptionFieldFunc.Count > 0)
                {
                    for (int i = 0; i < AdemptionFieldFunc.Count; i++)
                    {
                        var ademptionField = AdemptionFieldFunc[i](application);

                        if (ademptionField != null && (ademptionField.RecordOperation == RecordOperations.Add || ademptionField.RecordOperation == RecordOperations.Current)
                           && FuncAdemptionFieldChecked[i](ademptionField) == true && application.GetFiledsContainer().GetFields().Any(x => x != ademptionField
                           && ((x is CompositeField)
                           || ((x is RecordField) && ((RecordField)x).RecordOperation == RecordOperations.Add || ((RecordField)x).RecordOperation == RecordOperations.Erase))))
                        {
                            if (IsApplicationAType(application.AppType))
                            {
                                errors.Add(new TextError("CR_APP_00052_E", "CR_APP_00052_E"));
                            }
                            else if (application.AppType == ApplicationFormTypes.B1)
                            {
                                errors.Add(new TextError("CR_APP_00263_E", "CR_APP_00263_E")); //Избраната прокура е маркирана за заличаване и има полета за вписване.
                            }
                            else if (application.AppType == ApplicationFormTypes.B2)
                            {
                                errors.Add(new TextError("CR_APP_00264_E", "CR_APP_00264_E")); //Избраният клон е маркиран за закриване и има полета за вписване.
                            }
                            else if (application.AppType == ApplicationFormTypes.B6)
                            {
                                errors.Add(new TextError("CR_APP_00262_E", "CR_APP_00262_E")); //Ликвидацията е маркирана за прекратяване (избрано е продължаване/ възстановяване на дейността) и има полета за вписване.
                            }
                            else if(application.AppType == ApplicationFormTypes.B7)
                            {
                                errors.Add(new TextError("CR_APP_00261_E", "CR_APP_00261_E")); //Посочените действителни собственици са маркирани за заличаване и има полета за вписване. 
                            }
                            else //B3, B4, B5
                            {
                                errors.Add(new TextError("CR_APP_00161_E", "CR_APP_00161_E")); //Избраният залог/запор е маркиран за заличаване и има полета за вписване.
                            }

                            break;
                        }
                    }
                }
            }
            else if (application.ApplicationState == ProcessStates.Preregistration)
            {
                //TODO
            }

            return errors;
        }

        private bool IsApplicationAType(ApplicationFormTypes appType)
        {
            switch (appType)
            {
                case ApplicationFormTypes.A1:
                case ApplicationFormTypes.A2:
                case ApplicationFormTypes.A3:
                case ApplicationFormTypes.A4:
                case ApplicationFormTypes.A5:
                case ApplicationFormTypes.A6:
                case ApplicationFormTypes.A7:
                case ApplicationFormTypes.A8:
                case ApplicationFormTypes.A9:
                case ApplicationFormTypes.A10:
                case ApplicationFormTypes.A11:
                case ApplicationFormTypes.A12:
                case ApplicationFormTypes.A13:
                case ApplicationFormTypes.A14:
                case ApplicationFormTypes.A15:
                case ApplicationFormTypes.A16:
                case ApplicationFormTypes.A17:
                case ApplicationFormTypes.A18:
                    return true;
            }

            return false;
        }
    }
}