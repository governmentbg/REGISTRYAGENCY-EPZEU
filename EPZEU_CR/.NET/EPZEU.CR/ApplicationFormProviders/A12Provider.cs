using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А12 Заявление за вписване на обстоятелства относно европейско дружество"
    /// </summary>
    internal class A12Provider : ApplicationFormAProviderBase<A12>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.ED;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }
            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Representatives

            if (application.Fields.Representatives == null)
            {
                application.Fields.Representatives = new F010_Representatives();
            }

            if (application.Fields.Representatives.RepresentativeList == null)
            {
                application.Fields.Representatives.RepresentativeList = new List<F0100_Representative>();

            }

            //Трябва да има поне един представител.
            if (application.Fields.Representatives.RepresentativeList.Count == 0)
            {
                var representative = new F0100_Representative();

                application.Fields.Representatives.RepresentativeList.Add(representative);
                application.Fields.Representatives.RepresentativeList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };

                application.Fields.Representatives.RepresentativeList[0].Subject = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region BoardOfManagers3

            if (application.Fields.BoardOfManagers3 == null)
            {
                application.Fields.BoardOfManagers3 = new F012a_BoardOfManagers3();
            }

            if (application.Fields.BoardOfManagers3.BoardManagersList == null)
            {
                application.Fields.BoardOfManagers3.BoardManagersList = new List<F01211_BoardManager3>();
            }

            //Трябва да има поне един BoardOfManagers3.
            if (application.Fields.BoardOfManagers3.BoardManagersList.Count == 0)
            {                
                var BoardOfManager = new F01211_BoardManager3()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };

                application.Fields.BoardOfManagers3.BoardManagersList.Add(BoardOfManager);
            }

            #endregion

            #region LeadingBoard

            if (application.Fields.LeadingBoard == null)
            {
                application.Fields.LeadingBoard = new F013b_LeadingBoard();
            }

            if (application.Fields.LeadingBoard.LeaderList == null)
            {
                application.Fields.LeadingBoard.LeaderList = new List<F01331_Leader>();
            }

            //Трябва да има поне един Leader.
            if (application.Fields.LeadingBoard.LeaderList.Count == 0)
            {                
                var Leader = new F01331_Leader()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };
                application.Fields.LeadingBoard.LeaderList.Add(Leader);
            }

            #endregion

            #region SupervisingBoard2

            if (application.Fields.SupervisingBoard2 == null)
            {
                application.Fields.SupervisingBoard2 = new F014b_SupervisingBoard2();
            }

            if (application.Fields.SupervisingBoard2.Supervisor2List == null)
            {
                application.Fields.SupervisingBoard2.Supervisor2List = new List<F01421_Supervisor2>();
            }

            //Трябва да има поне един Supervisor2.
            if (application.Fields.SupervisingBoard2.Supervisor2List.Count == 0)
            {                
                var Supervisor2 = new F01421_Supervisor2()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };
                application.Fields.SupervisingBoard2.Supervisor2List.Add(Supervisor2);
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

            #region EuropeanHoldingCompanysAsShareholders

            if (application.Fields.EuropeanHoldingCompanysAsShareholders == null)
            {
                application.Fields.EuropeanHoldingCompanysAsShareholders = new F023b_EuropeanHoldingCompanysAsShareholders();
            }

            if (application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList == null)
            {
                application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList = new List<F02320_EuropeanHoldingCompanyAsShareholder>();
            }

            //Трябва да има поне един EuropeanHoldingCompanyAsShareholder.
            if (application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList.Count == 0)
            {
                var EuropeanHoldingCompanyAsShareholder = new F02320_EuropeanHoldingCompanyAsShareholder();

                application.Fields.EuropeanHoldingCompanysAsShareholders.EuropeanHoldingCompanyAsShareholderList.Add(EuropeanHoldingCompanyAsShareholder);
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

            //Трябва да има поне един Share.
            if (application.Fields.Shares.ShareList.Count == 0)
            {
                var Share = new F0310a_Share();

                application.Fields.Shares.ShareList.Add(Share);
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

            //Трябва да има поне един NonMonetaryDeposit.
            if (application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList.Count == 0)
            {
                var NonMonetaryDeposit = new F0330_NonMonetaryDeposit();

                application.Fields.NonMonetaryDeposits.NonMonetaryDepositsList.Add(NonMonetaryDeposit);
            }

            #endregion

            return result;
        }
    }
}
