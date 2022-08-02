using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А6 Заявление за вписване на обстоятелства относно командитно дружество с акции"
    /// </summary>
    internal class A6Provider : ApplicationFormAProviderBase<A6>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.KDA;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region Representatives

            if (application.Fields.Representatives == null)
            {
                application.Fields.Representatives = new F010_Representatives();
            }

            if (application.Fields.Representatives.RepresentativeList == null)
            {
                application.Fields.Representatives.RepresentativeList = new List<F0100_Representative>();
            }

            //Трябва да има поне един
            if (application.Fields.Representatives.RepresentativeList.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();
                var representative = new F0100_Representative()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    },
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.Representatives.RepresentativeList.Add(representative);
            }

            #endregion

            #region BoardOfDirectors

            if (application.Fields.BoardOfDirectors == null)
            {
                application.Fields.BoardOfDirectors = new F012_BoardOfDirectors();
            }

            if (application.Fields.BoardOfDirectors.BoardOfDirectorsMandate == null)
            {
                application.Fields.BoardOfDirectors.BoardOfDirectorsMandate = new F01200_BoardOfDirectorsMandate();
            }

            if (application.Fields.BoardOfDirectors.DirectorList == null)
            {
                application.Fields.BoardOfDirectors.DirectorList = new List<F01201_Director>();
            }

            //Трябва да има поне един
            if (application.Fields.BoardOfDirectors.DirectorList.Count == 0)
            {
                var director = new F01201_Director();

                application.Fields.BoardOfDirectors.DirectorList.Add(director);
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

            //Трябва да има поне един
            if (application.Fields.UnlimitedLiabilityPartners.UnlimitedLiabilityPartnerList.Count == 0)
            {
                var partner = new F0200_UnlimitedLiabilityPartner();

                application.Fields.UnlimitedLiabilityPartners.UnlimitedLiabilityPartnerList.Add(partner);
            }

            #endregion

            #region Shares

            if (application.Fields.Shares == null)
            {
                application.Fields.Shares = new F031a_Shares();
            }

            if (application.Fields.Shares.ShareList == null)
            {
                application.Fields.Shares.ShareList = new List<F0310a_Share>();
            }

            //Трябва да има поне един
            if (application.Fields.Shares.ShareList.Count == 0)
            {
                var share = new F0310a_Share();

                application.Fields.Shares.ShareList.Add(share);
            }

            #endregion

            #region NonMonetaryDeposits

            if (application.Fields.NonMonetaryDeposits == null)
            {
                application.Fields.NonMonetaryDeposits = new F033_NonMonetaryDeposits();
            }

            if (application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList == null)
            {
                application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList = new List<F0330_NonMonetaryDeposit>();
            }

            //Трябва да има поне една непарична вноска.
            if (application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList != null && application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList.Count == 0)
            {
                var nonMonetaryDeposit = new F0330_NonMonetaryDeposit();

                application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList.Add(nonMonetaryDeposit);
            }

            #endregion

            return result;
        }
    }
}
