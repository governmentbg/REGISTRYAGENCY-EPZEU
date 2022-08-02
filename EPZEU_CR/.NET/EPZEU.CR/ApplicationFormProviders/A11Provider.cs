using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А11 Заявление за вписване на обстоятелства относно поделение в Р. България на ЕОИИ със седалище в др. държава-членка"
    /// </summary>
    internal class A11Provider : ApplicationFormAProviderBase<A11>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.DEUIE;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            if (!result.IsSuccessfullyCompleted)
                return result;

            #region EuropeanEconomicInterestGrouping

            if (application.ApplicationState.HasValue && application.ApplicationState.Value == ProcessStates.ForChange)
            {
                if (application.Fields.EuropeanEconomicInterestGrouping == null)
                {
                    application.Fields.EuropeanEconomicInterestGrouping = InitEuropeanEconomicInterestGrouping();
                }
                else
                {
                    if (application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterList != null)
                    {
                        application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList = new List<F02235_EuropeanEconomicInterestRepresenter>();
                        application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList = new List<F02235_EuropeanEconomicInterestRepresenter>();
                        application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList = new List<F02235_EuropeanEconomicInterestRepresenter>();

                        foreach (var europeanEconomicInterestGrouping in application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterList)
                        {
                            switch (europeanEconomicInterestGrouping.RepresenterType)
                            {
                                case EuropeanEconomicInterestRepresenterTypes.Regular:
                                    application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList.Add(europeanEconomicInterestGrouping);
                                    break;
                                case EuropeanEconomicInterestRepresenterTypes.Liquidator:
                                    application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList.Add(europeanEconomicInterestGrouping);
                                    break;
                                case EuropeanEconomicInterestRepresenterTypes.Trustee:
                                    application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList.Add(europeanEconomicInterestGrouping);
                                    break;
                            }
                        }

                        if (application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList.Count == 0)
                        {
                            application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList.Add(new F02235_EuropeanEconomicInterestRepresenter()
                            { RepresenterType = EuropeanEconomicInterestRepresenterTypes.Regular });
                        }

                        if (application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList.Count == 0)
                        {
                            application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList.Add(new F02235_EuropeanEconomicInterestRepresenter()
                            { RepresenterType = EuropeanEconomicInterestRepresenterTypes.Liquidator });
                        }

                        if (application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList.Count == 0)
                        {
                            application.Fields.EuropeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList.Add(new F02235_EuropeanEconomicInterestRepresenter()
                            { RepresenterType = EuropeanEconomicInterestRepresenterTypes.Trustee });
                        }
                    }
                }
            }
            else
            {
                application.Fields.EuropeanEconomicInterestGrouping = InitEuropeanEconomicInterestGrouping();
            }

            #endregion

            #region RepresentersWayOfManagement

            if (application.Fields.EuropeanEconomicInterestGrouping.RepresentersWayOfManagement == null)
                application.Fields.EuropeanEconomicInterestGrouping.RepresentersWayOfManagement = new F02232_RepresentersWayOfManagement();

            #endregion

            #region InsolvenciesOfForeignTrader

            if (application.Fields.InsolvenciesOfEUIE == null)
                application.Fields.InsolvenciesOfEUIE = new F0225_InsolvenciesOfEUIE();

            if (application.Fields.InsolvenciesOfEUIE.InsolvencyOfEUIEList == null)
                application.Fields.InsolvenciesOfEUIE.InsolvencyOfEUIEList = new List<F02250_InsolvencyOfEUIE>();

            if (application.Fields.InsolvenciesOfEUIE.InsolvencyOfEUIEList.Count == 0)
            {
                var insolvencyOfEUIE = new F02250_InsolvencyOfEUIE();
                application.Fields.InsolvenciesOfEUIE.InsolvencyOfEUIEList.Add(insolvencyOfEUIE);
            }

            #endregion

            return result;
        }

        private F0223_EuropeanEconomicInterestGrouping InitEuropeanEconomicInterestGrouping()
        {
            var europeanEconomicInterestGrouping = new F0223_EuropeanEconomicInterestGrouping();

            if (europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList == null)
                europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList = new List<F02235_EuropeanEconomicInterestRepresenter>();

            if (europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList.Count == 0)
                europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterRegularList.Add(new F02235_EuropeanEconomicInterestRepresenter() { RepresenterType = EuropeanEconomicInterestRepresenterTypes.Regular });

            if (europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList == null)
                europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList = new List<F02235_EuropeanEconomicInterestRepresenter>();

            if (europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList.Count == 0)
                europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterLiquidatorList.Add(new F02235_EuropeanEconomicInterestRepresenter() { RepresenterType = EuropeanEconomicInterestRepresenterTypes.Liquidator });

            if (europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList == null)
                europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList = new List<F02235_EuropeanEconomicInterestRepresenter>();

            if (europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList.Count == 0)
                europeanEconomicInterestGrouping.EuropeanEconomicInterestRepresenterTrusteeList.Add(new F02235_EuropeanEconomicInterestRepresenter() { RepresenterType = EuropeanEconomicInterestRepresenterTypes.Trustee });

            return europeanEconomicInterestGrouping;
        }
    }
}