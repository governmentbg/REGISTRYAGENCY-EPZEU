using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А2 Заявление за вписване на обстоятелства относно събирателно дружество"
    /// </summary>
    internal class A2Provider : ApplicationFormAProviderBase<A2>
    {
        public override SubUICTypes SubUICType => SubUICTypes.MainCircumstances;

        public override LegalForms LegalFormBase => LegalForms.SD;

       protected override async Task<CNSys.OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();            

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region AssignedManagers

            if (application.Fields.AssignedManagers == null)
            {
                application.Fields.AssignedManagers = new F007a_AssignedManagers();
            }

            if (application.Fields.AssignedManagers.AssignedManageList == null)
            {
                application.Fields.AssignedManagers.AssignedManageList = new List<F007a0_AssignedManager>();
            }

            //Трябва да има поне едно лице на което е възложено управлението.
            if (application.Fields.AssignedManagers.AssignedManageList.Count == 0)
            {
                var manager = new F007a0_AssignedManager();
                application.Fields.AssignedManagers.AssignedManageList.Add(manager);
                application.Fields.AssignedManagers.AssignedManageList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
                
            }

            #endregion

            #region Representatives

            if (application.Fields.Representatives101 == null)
            {
                application.Fields.Representatives101 = new F0101_Representatives101();
            }

            if (application.Fields.Representatives101.RepresentativeList == null)
            {
                application.Fields.Representatives101.RepresentativeList = new List<F01010_Representative101>();
            }

            //Трябва да има поне един представител.
            if (application.Fields.Representatives101.RepresentativeList.Count == 0)
            {
                var representative = new F01010_Representative101();

                application.Fields.Representatives101.RepresentativeList.Add(representative);
                application.Fields.Representatives101.RepresentativeList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region UnlimitedLiabilityPartners

            if (application.Fields.UnlimitedLiabilityPartners == null)
            {
                application.Fields.UnlimitedLiabilityPartners = new F020_UnlimitedLiabilityPartners();
            }

            if (application.Fields.UnlimitedLiabilityPartners.UnlimitedLiabilityPartnerList == null)
            {
                application.Fields.UnlimitedLiabilityPartners.UnlimitedLiabilityPartnerList = new List<F0200_UnlimitedLiabilityPartner>();
            }

            //Трябва да има поне един съдружник.
            if (application.Fields.UnlimitedLiabilityPartners.UnlimitedLiabilityPartnerList.Count == 0)
            {
                var partner = new F0200_UnlimitedLiabilityPartner();

                application.Fields.UnlimitedLiabilityPartners.UnlimitedLiabilityPartnerList.Add(partner);
            }

            #endregion

            return result;
        }
    }
}
