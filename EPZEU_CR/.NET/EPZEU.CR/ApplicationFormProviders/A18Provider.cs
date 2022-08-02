using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А18 Заявление за вписване на обстоятелства отностно клон на ЧЮЛНЦ"
    /// </summary>
    internal class A18Provider : ApplicationFormAProviderBase<A18>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.BFLE;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (application.Fields.Objectives == null)
            {
                application.Fields.Objectives = new F006b_Objectives();
                application.Fields.Objectives.IsBFLE = true;
            }
 

            #region Representatives

            if (application.Fields.Representatives103 == null)
            {
                application.Fields.Representatives103 = new F0103_Representatives103();
            }

            if (application.Fields.Representatives103.RepresentativeList == null)
            {
                application.Fields.Representatives103.RepresentativeList = new List<F0103_Representative103>();
            }

            //Трябва да има поне един
            if (application.Fields.Representatives103.RepresentativeList.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();

                var representative = new F0103_Representative103()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.Representatives103.RepresentativeList.Add(representative);
            }

            #endregion


            #region ForeignTraders

            if (application.Fields.ForeignTraders == null)
            {
                application.Fields.ForeignTraders = new F022_ForeignTraders();
            }

            if (application.Fields.ForeignTraders.ForeignTraderList == null)
            {
                application.Fields.ForeignTraders.ForeignTraderList = new List<F0220_ForeignTrader>();
            }

            //Трябва да има поне един
            if (application.Fields.ForeignTraders.ForeignTraderList.Count == 0)
            {
                var item = new F0220_ForeignTrader();

                application.Fields.ForeignTraders.ForeignTraderList.Add(item);
            }

            #endregion

            #region InsolvenciesOfForeignTrader

            if (application.Fields.InsolvenciesOfForeignTrader == null)
            {
                application.Fields.InsolvenciesOfForeignTrader = new F022b_InsolvenciesOfForeignTrader();
            }

            if (application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList == null)
            {
                application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList = new List<F02220_InsolvencyOfForeignTrader>();
            }

            //Трябва да има поне един
            if (application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList.Count == 0)
            {
                var item = new F02220_InsolvencyOfForeignTrader();

                application.Fields.InsolvenciesOfForeignTrader.InsolvencyOfForeignTraderList.Add(item);
            }

            #endregion

            return result;
        }
    }
}
