using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Д1  Заявление за запазване на фирма/наименование"
    /// </summary>
    internal class D1Provider : ApplicationWithFieldsFormProviderBase<D1>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.FirmReserve;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (application.Fields.PersonConcerned == null)
            {
                application.Fields.PersonConcerned = new F029_PersonConcerned();
            }

            return result;
        }
    }
}