﻿using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със "Искане за промяна на лицето".
    /// </summary>
    internal class AppointingChangeRequestProvider : AppointingDemandDocumentsProvider<AppointingChangeRequest>
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