using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А10 Заявление за вписване на обстоятелства относно ЕОИИ"
    /// </summary>
    internal class A10Provider : ApplicationFormAProviderBase<A10>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.EUIE;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            if (!result.IsSuccessfullyCompleted)
                return result;

            #region Managers

            if (application.Fields.Managers == null)
                application.Fields.Managers = new F007_Managers();

            if (application.Fields.Managers.ManagersList == null)
                application.Fields.Managers.ManagersList = new List<F0070_Manager>();

            if (application.Fields.Managers.ManagersList.Count == 0)
            {
                var manager = new F0070_Manager()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };


                application.Fields.Managers.ManagersList.Add(manager);
            }

            #endregion

            #region DivisionOfEuropeanUnification

            if (application.Fields.DivisionsOfEuropeanUnification == null)
                application.Fields.DivisionsOfEuropeanUnification = new F060_DivisionsOfEuropeanUnification();

            if (application.Fields.DivisionsOfEuropeanUnification.DivisionOfEuropeanUnificationList == null)
                application.Fields.DivisionsOfEuropeanUnification.DivisionOfEuropeanUnificationList = new List<F0600_DivisionOfEuropeanUnification>();

            if (application.Fields.DivisionsOfEuropeanUnification.DivisionOfEuropeanUnificationList.Count == 0)
            {
                var divisionOfEuropeanUnification = new F0600_DivisionOfEuropeanUnification();

                application.Fields.DivisionsOfEuropeanUnification.DivisionOfEuropeanUnificationList.Add(divisionOfEuropeanUnification);
            }

            #endregion

            #region UnlimitedLiabilityPartnersEUIE

            if (application.Fields.UnlimitedLiabilityPartnersEUIE == null)
                application.Fields.UnlimitedLiabilityPartnersEUIE = new F020a_UnlimitedLiabilityPartnersEUIE();

            if (application.Fields.UnlimitedLiabilityPartnersEUIE.UnlimitedLiabilityPartnerEUIEList == null)
                application.Fields.UnlimitedLiabilityPartnersEUIE.UnlimitedLiabilityPartnerEUIEList = new List<F0201_UnlimitedLiabilityPartnerEUIE>();

            if (application.Fields.UnlimitedLiabilityPartnersEUIE.UnlimitedLiabilityPartnerEUIEList.Count == 0)
            {
                var unlimitedLiabilityPartnerEUIE = new F0201_UnlimitedLiabilityPartnerEUIE();

                application.Fields.UnlimitedLiabilityPartnersEUIE.UnlimitedLiabilityPartnerEUIEList.Add(unlimitedLiabilityPartnerEUIE);
            }

            #endregion

            return result;
        }
    }
}