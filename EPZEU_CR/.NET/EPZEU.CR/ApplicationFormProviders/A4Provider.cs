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
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А4 Заявление за вписване на обстоятелства относно дружество с ограничена отговорност"
    /// </summary>
    internal class A4Provider : ApplicationFormAProviderBase<A4>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.OOD;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            
            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region Managers

            if (application.Fields.Managers == null)
            {
                application.Fields.Managers = new F007_Managers();
            }

            if (application.Fields.Managers.ManagersList == null)
            {
                application.Fields.Managers.ManagersList = new List<F0070_Manager>();
            }

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();
            //Трябва да има поне един управител.
            if (application.Fields.Managers.ManagersList.Count == 0)
            {
                var manager = new F0070_Manager();

                application.Fields.Managers.ManagersList.Add(manager);
                application.Fields.Managers.ManagersList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region Partners

            if (application.Fields.Partners == null)
            {
                application.Fields.Partners = new F019_Partners();
            }

            if (application.Fields.Partners.PartnersList == null)
            {
                application.Fields.Partners.PartnersList = new List<F0190_Partner>();
            }

            //Трябва да има поне един съдружник.
            if (application.Fields.Partners.PartnersList.Count == 0)
            {
                var partner = new F0190_Partner();
                application.Fields.Partners.PartnersList.Add(partner);
                application.Fields.Partners.PartnersList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region SoleCapitalOwner

            if (application.Fields.SoleCapitalOwner == null)
            {
                application.Fields.SoleCapitalOwner = new F023_SoleCapitalOwner();
                application.Fields.SoleCapitalOwner.Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
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

            #region ShareTransfers

            if (application.Fields.ShareTransfers == null)
            {
                application.Fields.ShareTransfers = new F024_ShareTransfers();
            }

            if (application.Fields.ShareTransfers.ShareTransfersList == null)
            {
                application.Fields.ShareTransfers.ShareTransfersList = new List<F0240_ShareTransfer>();
            }

            if (application.Fields.ShareTransfers.ShareTransfersList != null && application.Fields.ShareTransfers.ShareTransfersList.Count == 0)
            {
                var shareTransfer = new F0240_ShareTransfer();

                application.Fields.ShareTransfers.ShareTransfersList.Add(shareTransfer);

                application.Fields.ShareTransfers.ShareTransfersList[0].NewOwnerCountryID = bgCountry.ID;
                application.Fields.ShareTransfers.ShareTransfersList[0].NewOwnerCountryName = bgCountry.Name;

                application.Fields.ShareTransfers.ShareTransfersList[0].OldOwnerCountryID = bgCountry.ID;
                application.Fields.ShareTransfers.ShareTransfersList[0].OldOwnerCountryName = bgCountry.Name;
            }

            #endregion 

            return result;
        }
    }
}
