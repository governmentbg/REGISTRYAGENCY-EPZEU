using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със "Искане за корекция на назначенията."
    /// </summary>
    internal class AppointingRequestForCorrectionProvider : AppointingDemandDocumentsProvider<AppointingRequestForCorrection>
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