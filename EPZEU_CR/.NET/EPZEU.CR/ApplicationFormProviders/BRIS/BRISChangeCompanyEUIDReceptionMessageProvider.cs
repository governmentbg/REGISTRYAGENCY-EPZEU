using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Уведомление от системата за взаимно свързване на регистрите относно промяна на EUID на фирма".
    /// </summary>
    internal class BRISChangeCompanyEUIDReceptionMessageProvider : ApplicationFormProviderBase<BRISChangeCompanyEUIDReceptionMessage>
    {
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            return result;
        }
    }
}
