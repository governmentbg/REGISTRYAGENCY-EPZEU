using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Г1  Заявление за обявяване на актове"
    /// </summary>
    internal class G1Provider : ApplicationFormGProviderBase<G1>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.G1_ActAnnouncement;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }
       
            if (application.ActsCompanies == null)
                application.ActsCompanies = new ActsCompanies();

            if (application.ActsCompanies.ActsCompaniesList == null)
                application.ActsCompanies.ActsCompaniesList = new List<ActCompany>();

            if (application.ActsCompanies.ActsCompaniesList.Count == 0)
            {
                var actCompany = new ActCompany();

                application.ActsCompanies.ActsCompaniesList.Add(actCompany);
            }

            return result;
        }
    }
}