using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Акт на съда по искова молба за оспорване на преобразуването"
    /// </summary>
    internal class ActOfContestationProvider : ApplicationFormProviderBase<ActOfContestation>
    {
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (application.ContestationAct == null)
            {
                application.ContestationAct = new ContestationAct() { SenderType = ActSenderType.InterestedPerson };
            }

            return result;
        }
    }
}
