using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А5 Заявление за вписване на обстоятелства относно акционерно дружество".
    /// </summary>
    internal class A5Provider : ApplicationFormAProviderBase<A5>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.AD;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            
            if (!result.IsSuccessfullyCompleted)
                return result;

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Representatives

            if (application.Fields.Representatives == null)
                application.Fields.Representatives = new F010_Representatives();

            if (application.Fields.Representatives.RepresentativeList == null)
                application.Fields.Representatives.RepresentativeList = new List<F0100_Representative>();

            if (application.Fields.Representatives.RepresentativeList.Count == 0)
            {
                var representatives = new F0100_Representative();
                application.Fields.Representatives.RepresentativeList.Add(representatives);

                application.Fields.Representatives.RepresentativeList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID                  
                };
            }

            #endregion

            #region BoardOfManagers

            if (application.Fields.BoardOfManagers2 == null)
                application.Fields.BoardOfManagers2 = new F013_BoardOfManagers2();

            if (application.Fields.BoardOfManagers2.BoardManager2List == null)
                application.Fields.BoardOfManagers2.BoardManager2List = new List<F01321_BoardManager2>();

            if (application.Fields.BoardOfManagers2.BoardManager2List.Count == 0)
            {
                var boardOfManagers = new F01321_BoardManager2();

                application.Fields.BoardOfManagers2.BoardManager2List.Add(boardOfManagers);
                application.Fields.BoardOfManagers2.BoardManager2List[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region SupervisingBoard

            if (application.Fields.SupervisingBoard == null)
                application.Fields.SupervisingBoard = new F014_SupervisingBoard();

            if (application.Fields.SupervisingBoard.SupervisorList == null)
                application.Fields.SupervisingBoard.SupervisorList = new List<F01401_Supervisor>();

            if (application.Fields.SupervisingBoard.SupervisorList.Count == 0)
            {
                var supervisor = new F01401_Supervisor();
                application.Fields.SupervisingBoard.SupervisorList.Add(supervisor);

                application.Fields.SupervisingBoard.SupervisorList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region BoardOfDirectors

            if (application.Fields.BoardOfDirectors == null)
                application.Fields.BoardOfDirectors = new F012_BoardOfDirectors();

            if (application.Fields.BoardOfDirectors.DirectorList == null)
                application.Fields.BoardOfDirectors.DirectorList = new List<F01201_Director>();

            if (application.Fields.BoardOfDirectors.DirectorList.Count == 0)
            {
                var director = new F01201_Director();
                application.Fields.BoardOfDirectors.DirectorList.Add(director);

                application.Fields.BoardOfDirectors.DirectorList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region EuropeanHoldingCompanysAsShareholders

            if (application.Fields.EuropeanHoldingCompanysAsShareholders == null)
                application.Fields.EuropeanHoldingCompanysAsShareholders = new F023b_EuropeanHoldingCompanysAsShareholders();

            if (application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList == null)
                application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList = new List<F02320_EuropeanHoldingCompanyAsShareholder>();

            if (application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList.Count == 0)
            {
                var europeanHoldingCompanyAsShareholder = new F02320_EuropeanHoldingCompanyAsShareholder();
                application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList.Add(europeanHoldingCompanyAsShareholder);
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

            #region Shares

            if (application.Fields.Shares == null)
                application.Fields.Shares = new F031a_Shares();

            if (application.Fields.Shares.ShareList == null)
                application.Fields.Shares.ShareList = new List<F0310a_Share>();

            if(application.Fields.Shares.ShareList.Count == 0)
            {
                var share = new F0310a_Share();
                application.Fields.Shares.ShareList.Add(share);
            }

            #endregion

            #region NonMonetaryDeposits

            if (application.Fields.NonMonetaryDeposits == null)
                application.Fields.NonMonetaryDeposits = new F033_NonMonetaryDeposits();

            if(application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList == null)
                application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList = new List<F0330_NonMonetaryDeposit>();

            if(application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList.Count == 0)
            { 
                var nonMonetaryDeposit = new F0330_NonMonetaryDeposit();
                application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList.Add(nonMonetaryDeposit);
            }

            #endregion

            return result;
        }
    }
}