using EPZEU.CR.Domain.ApplicationForms;
using Integration.EPZEU.Models;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Базова реализация на интерфейс IApplicationWithFieldsForm за работа със съдържанието на заявления Б
    /// </summary>
    /// <typeparam name="TApplication">Тип на заявлението</typeparam>
    internal abstract class ApplicationFormBProviderBase<TApplication> : ApplicationWithFieldsFormProviderBase<TApplication>
        where TApplication : IApplicationWithFieldsForm
    {
        #region Overrided methods

       protected override async Task<CNSys.OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New && ((ApplicationWithFieldsInitParameters)initParams).DeedContext == null && !((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
                return ReturnErrorResult("GL_CR_COMPANY_NOT_FOUND_E");

            var onlyForChangeAndNewState = ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange || ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New;
            var appFields = (ApplicationFormBFieldsBase)application.GetFiledsContainer();
            var deedLegalForm = ((ApplicationWithFieldsInitParameters)initParams).DeedContext.LegalForm.Value;

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (string.IsNullOrWhiteSpace(((ApplicationWithFieldsInitParameters)initParams).UIC) && initParams.IsMainApplication.GetValueOrDefault() && !((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
                return ReturnErrorResult("GL_INVALID_IDENTIFIER_E");


            if (ApplicationForm.AppType == ApplicationFormTypes.B1)
            {
                switch (deedLegalForm)
                {
                    case LegalForms.KCHT: //A8 - "Чуждестранен търговец не може да регистрира прокура"
                        return ReturnErrorResult("CR_APP_00081_E");
                }
            }

            if (ApplicationForm.AppType == ApplicationFormTypes.B2)
            {
                switch (deedLegalForm)
                {
                    case LegalForms.KCHT: //A8 - "Чуждестранен търговец не може да регистрира клонове"
                        return ReturnErrorResult("CR_APP_00082_E");

                    case LegalForms.DEUIE: //A11 - "Поделение на европейско обединение по икономически интереси не може да регистрира клонове"
                        return ReturnErrorResult("CR_APP_00084_E");

                }
            }

            if (ApplicationForm.AppType == ApplicationFormTypes.B4)
            {
                switch (deedLegalForm)
                {
                    case LegalForms.TPP:
                        return ReturnErrorResult("CR_APP_00234_E");//A9 - С Търговец, публично предприятие не може да регистрира залог на търговско предприятие.
                    case LegalForms.TPPD:
                        return ReturnErrorResult("CR_APP_00235_E");//A9 - Държавно предприятие не може да регистрира залог на търговско предприятие.
                    case LegalForms.TPPO:
                        return ReturnErrorResult("CR_APP_00236_E");//A9 - Общинско предприятие не може да регистрира залог на търговско предприятие.
                    case LegalForms.ASSOC:
                        return ReturnErrorResult("CR_APP_00237_E");//A15 - Сдружение не може да регистрира залог на търговско предприятие.
                    case LegalForms.FOUND:
                        return ReturnErrorResult("CR_APP_00238_E");//A16 - Фондация не може да регистрира залог на търговско предприятие.
                    case LegalForms.CC:
                        return ReturnErrorResult("CR_APP_00239_E");//A17 - Народно читалище не може да регистрира залог на търговско предприятие.
                    case LegalForms.BFLE:
                        return ReturnErrorResult("CR_APP_00240_E");//A18 - Kлон на чуждестранно юридическо лице с нестопанска цел не може да регистрира залог на търговско предприятие.
                    case LegalForms.DEUIE:
                        return ReturnErrorResult("CR_APP_00086_E");//A11 - Поделение на европейско обединение по икономически интереси не може да регистрира залог на търговско предприятие.
                }
            }

            if (ApplicationForm.AppType == ApplicationFormTypes.B3 || ApplicationForm.AppType == ApplicationFormTypes.B5)
            {
                switch (deedLegalForm)
                {
                    case LegalForms.ET:
                        return ReturnErrorResult("CR_APP_00076_E");//A1 - Едноличен търговец не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.AD:
                    case LegalForms.EAD:
                    case LegalForms.IAD:
                    case LegalForms.IEAD:
                        return ReturnErrorResult("CR_APP_00078_E");//A5 - Акционерно дружество не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.K:
                        return ReturnErrorResult("CR_APP_00079_E");//A7 - Кооперация не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.KCHT:
                        return ReturnErrorResult("CR_APP_00080_E");//A8 - Клон на чуждестранен търговец не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.TPP:
                    case LegalForms.TPPD:
                    case LegalForms.TPPO:
                        return ReturnErrorResult("CR_APP_00083_E");//A9 - Търговец публично предприятие не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.DEUIE:
                        return ReturnErrorResult("CR_APP_00085_E");//A11 - Поделение на европейско обединение по икономически интереси не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.ED:
                        return ReturnErrorResult("CR_APP_00089_E");//A12 - Европейско дружество не може да регистрира запор и залог на дружествен дял.
                }
            }

            if (ApplicationForm.AppType == ApplicationFormTypes.B5)
            {
                switch (deedLegalForm)
                {
                    case LegalForms.ASSOC:
                        return ReturnErrorResult("CR_APP_00230_E");//A15 - Сдружение не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.FOUND:
                        return ReturnErrorResult("CR_APP_00231_E");//A16 - Фондация не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.CC:
                        return ReturnErrorResult("CR_APP_00232_E");//A17 - Народно читалище не може да регистрира запор и залог на дружествен дял.
                    case LegalForms.BFLE:
                        return ReturnErrorResult("CR_APP_00233_E");//A18 - Kлон на чуждестранно юридическо лице с нестопанска цел не може да регистрира запор и залог на дружествен дял.
                }
            }

            if (ApplicationForm.AppType == ApplicationFormTypes.B6)
            {
                switch (deedLegalForm)
                {
                    case LegalForms.ET:
                        return ReturnErrorResult("CR_APP_00077_E");//A1 - "Заявление за вписване на обстоятелства относно прекратяване и ликвидация не може да се подава за едноличен търговец
                    case LegalForms.DEUIE:
                        return ReturnErrorResult("CR_APP_00087_E");//A11 - "Заявление за вписване на обстоятелства относно прекратяване и ликвидация не може да се подава за поделение на европейско обединение по икономически интереси"
                    case LegalForms.KCHT:
                        return ReturnErrorResult("CR_APP_00245_E");//A8 - /клон на чуждестранен търговец/ - Заявление за вписване на обстоятелства относно прекратяване и ликвидация не може да се подава за клон на чуждестранен търговец.
                    case LegalForms.CHD:
                        return ReturnErrorResult("CR_APP_00246_E");//A14 - /дружество регистрирано в юрисдикция с преференциален данъчен режим/ Заявление за вписване на обстоятелства относно прекратяване и ликвидация не може да се подава за дружество регистрирано в юрисдикция с преференциален данъчен режим.
                    case LegalForms.BFLE:
                        return ReturnErrorResult("CR_APP_00247_E");//A18 - /клон на чуждестранно юридическо лице с нестопанска цел/ Заявление за вписване на обстоятелства относно прекратяване и ликвидация не може да се подава за клон на чуждестранно юридическо лице с нестопанска цел.
                }
            }

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.Preregistration)
            {
                //TODO: Login for preregistration
            }

            return result;
        }

        protected CNSys.OperationResult ReturnErrorResult(string errText)
        {
            return new CNSys.OperationResult(errText, errText);
        }

        #endregion
    }
}