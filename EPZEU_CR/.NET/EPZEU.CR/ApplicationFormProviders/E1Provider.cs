using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Е1  Заявление за издаване на удостоверение за законосъобразност"
    /// </summary>
    internal class E1Provider : ApplicationFormProviderBase<E1>
    {  
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (application.UIC == null)
            {
                application.UIC = new UIC() { IsNew = true };
            }
   
            if (initParams.AdditionalData.ContainsKey("uic"))
            {
                string uic = initParams.AdditionalData["uic"];
                application.UIC.Text = uic;

                LegalForms? legalForm = null;

                if (initParams.AdditionalData.ContainsKey("legalForm"))
                {                   
                    legalForm = (LegalForms)int.Parse(initParams.AdditionalData["legalForm"]);
                }

                if (legalForm == null)
                {
                    return new CNSys.OperationResult("GL_CR_COMPANY_NOT_FOUND_E", "GL_CR_COMPANY_NOT_FOUND_E");
                }

                switch (legalForm)
                {
                    case LegalForms.ASSOC:
                        return ReturnErrorResult("CR_APP_00241_E");//А15 - Сдружение
                    case LegalForms.FOUND:
                        return ReturnErrorResult("CR_APP_00242_E");//А16 - Фондация                    
                    case LegalForms.CC:
                        return ReturnErrorResult("CR_APP_00244_E");//А17 - Народно читалище                    
                    case LegalForms.BFLE:
                        return ReturnErrorResult("CR_APP_00243_E");//А18 - Kлон на чуждестранно юридическо лице с нестопанска цел 
                }
            }

            return result;
        }
        protected CNSys.OperationResult ReturnErrorResult(string errText)
        {
            return new CNSys.OperationResult(errText, errText);
        }
    }
}