using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Базова реализация на интерфейс IApplicationWithFieldsForm за работа със съдържанието на заявления Г
    /// </summary>
    /// <typeparam name="TApplication">Тип на заявлението</typeparam>
    internal abstract class ApplicationFormGProviderBase<TApplication> : ApplicationWithFieldsFormProviderBase<TApplication>
        where TApplication : IApplicationWithFieldsForm
    {
        #region Overrided methods

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New && ((ApplicationWithFieldsInitParameters)initParams).DeedContext == null && !((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
                return ReturnErrorResult("GL_CR_COMPANY_NOT_FOUND_E");

            //TODO: КОгато е null Грешката трябва да е друга
            //Допълнителните пакети към заявленията за пререгистрация са без UIC
            if (string.IsNullOrWhiteSpace(((ApplicationWithFieldsInitParameters)initParams).UIC) && initParams.IsMainApplication.GetValueOrDefault() &&
                (((ApplicationWithFieldsInitParameters)initParams).Fields == null || !((ApplicationWithFieldsInitParameters)initParams).Fields.Any(f => f.FieldIdent == F001_UIC.FieldIdentCode)))
                return ReturnErrorResult("GL_INVALID_IDENTIFIER_E");

            return result;
        }

        #endregion

        #region Private helpers

        private OperationResult ReturnErrorResult(string errText)
        {
            return new OperationResult(errText, errText);
        }

        #endregion
    }
}