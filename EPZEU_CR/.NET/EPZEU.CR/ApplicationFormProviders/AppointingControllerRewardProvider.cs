using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със "Искане за определяне на възнаграждение на контрольор".
    /// </summary>
    internal class AppointingControllerRewardProvider : AppointingDemandDocumentsProvider<AppointingControllerReward>
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