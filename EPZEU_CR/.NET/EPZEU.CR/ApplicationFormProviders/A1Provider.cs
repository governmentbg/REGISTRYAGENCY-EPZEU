using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А1 Заявление за вписване на обстоятелства относно едноличен търговец"
    /// </summary>
    internal class A1Provider : ApplicationFormAProviderBase<A1>
    {
        public override SubUICTypes SubUICType => SubUICTypes.MainCircumstances;

        public override LegalForms LegalFormBase => LegalForms.ET;

        protected override async Task<CNSys.OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Trader

            if (application.Fields.PhysicalPersonTrader == null)
            {
                application.Fields.PhysicalPersonTrader = new F018_PhysicalPersonTrader();
                application.Fields.PhysicalPersonTrader.Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            return result;
        }
    }
}
