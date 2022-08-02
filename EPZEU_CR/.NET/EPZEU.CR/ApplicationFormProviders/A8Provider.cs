using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А8 Заявление за вписване на обстоятелства относно клон на чуждестранен търговец"
    /// </summary>
    internal class A8Provider : ApplicationFormAProviderBase<A8>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.KCHT;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Representatives

            if (application.Fields.Representatives102 == null)
                application.Fields.Representatives102 = new F0102_Representatives102();

            if (application.Fields.Representatives102.RepresentativeList == null)
                application.Fields.Representatives102.RepresentativeList = new List<F01020_Representative102>();

            if (application.Fields.Representatives102.RepresentativeList.Count == 0)
            {
                var representative102 = new F01020_Representative102();

                application.Fields.Representatives102.RepresentativeList.Add(representative102);
                application.Fields.Representatives102.RepresentativeList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region InsolvenciesOfForeignTrader

            if (application.Fields.InsolvenciesOfForeignTrader == null)
                application.Fields.InsolvenciesOfForeignTrader = new F022b_InsolvenciesOfForeignTrader();

            if (application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList == null)
                application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList = new List<F02220_InsolvencyOfForeignTrader>();

            if (application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList.Count == 0)
            {
                var insolvencyOfForeignTrader = new F02220_InsolvencyOfForeignTrader();
                application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList.Add(insolvencyOfForeignTrader);
            }

            #endregion

            #region ForeignTraders

            if (application.Fields.ForeignTraders == null)
                application.Fields.ForeignTraders = new F022_ForeignTraders();

            if (application.Fields.ForeignTraders.ForeignTraderList == null)
                application.Fields.ForeignTraders.ForeignTraderList = new List<F0220_ForeignTrader>();

            if (application.Fields.ForeignTraders.ForeignTraderList.Count == 0)
            {
                var foreignTrader = new F0220_ForeignTrader();
                application.Fields.ForeignTraders.ForeignTraderList.Add(foreignTrader);
            }

            #endregion

            return result;
        }
    }
}
