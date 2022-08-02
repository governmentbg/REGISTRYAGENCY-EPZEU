using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със "Уведомление, че вещото лице не може да изготви експертизата в срок".
    /// </summary>
    internal class NotificationOfExaminationImpossibilityProvider : AppointingDemandDocumentsProvider<NotificationOfExaminationImpossibility>
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