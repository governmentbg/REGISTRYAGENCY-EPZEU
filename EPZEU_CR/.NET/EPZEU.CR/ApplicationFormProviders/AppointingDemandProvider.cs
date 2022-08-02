using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common.Assignments;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Искане за назначаване на вещи лица, проверител, контрольор или регистриран одитор"
    /// </summary>
    internal class AppointingDemandProvider : ApplicationFormProviderBase<AppointingDemand>
    {
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            #region Applicants

            if (application.AppointingFirms == null)
                application.AppointingFirms = new AppointingFirms();

            if (application.AppointingFirms.AppointingFirmList == null)
                application.AppointingFirms.AppointingFirmList = new List<AppointingFirm>();

            if (application.AppointingFirms.AppointingFirmList.Count == 0)
                application.AppointingFirms.AppointingFirmList.Add(new AppointingFirm());

            #endregion

            return result;
        }
    }
}