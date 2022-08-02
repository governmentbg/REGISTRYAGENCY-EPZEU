using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using System.Collections.Generic;
using EPZEU.Nomenclatures;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А13 Заявление за вписване на обстоятелства относно европейско кооперативно дружество"
    /// </summary>
    internal class A13Provider : ApplicationFormAProviderBase<A13>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.EKD;

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

            #region AdministrativeBoard

            if (application.Fields.AdministrativeBoard == null)
            {
                application.Fields.AdministrativeBoard = new F012b_AdministrativeBoard();
            }

            if (application.Fields.AdministrativeBoard.AdministrativeBodyList == null)
            {
                application.Fields.AdministrativeBoard.AdministrativeBodyList = new List<F01221_AdministrativeBody>();
            }

            //Трябва да има поне един AdministrativeBody.
            if (application.Fields.AdministrativeBoard.AdministrativeBodyList.Count == 0)
            { 
                
                var AdministrativeBody = new F01221_AdministrativeBody()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };

                application.Fields.AdministrativeBoard.AdministrativeBodyList.Add(AdministrativeBody);
            }

            #endregion

            #region AdministrativeBoardSupporters

            if (application.Fields.AdministrativeBoardSupporters == null)
            {
                application.Fields.AdministrativeBoardSupporters = new F012v_AdministrativeBoardSupporters();
            }

            if (application.Fields.AdministrativeBoardSupporters.AdministrativeBoardSupporterList == null)
            {
                application.Fields.AdministrativeBoardSupporters.AdministrativeBoardSupporterList = new List<F01230_AdministrativeBoardSupporter>();
            }

            //Трябва да има поне един AdministrativeBoardSupporter.
            if (application.Fields.AdministrativeBoardSupporters.AdministrativeBoardSupporterList.Count == 0)
            {              
                var AdministrativeBoardSupporterList = new F01230_AdministrativeBoardSupporter()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };

                application.Fields.AdministrativeBoardSupporters.AdministrativeBoardSupporterList.Add(AdministrativeBoardSupporterList);
            }

            #endregion

            #region BoardOfManagersSupporters2

            if (application.Fields.BoardOfManagersSupporters2 == null)
            {
                application.Fields.BoardOfManagersSupporters2 = new F013v_BoardOfManagersSupporters2();
            }

            if (application.Fields.BoardOfManagersSupporters2.F01340_BoardManagersSupporter2List == null)
            {
                application.Fields.BoardOfManagersSupporters2.F01340_BoardManagersSupporter2List = new List<F01340_BoardManagersSupporter2>();
            }

            //Трябва да има поне един BoardManagersSupporter2.
            if (application.Fields.BoardOfManagersSupporters2.F01340_BoardManagersSupporter2List.Count == 0)
            {
               
                var AdministrativeBoardSupporter = new F01340_BoardManagersSupporter2()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };

                application.Fields.BoardOfManagersSupporters2.F01340_BoardManagersSupporter2List.Add(AdministrativeBoardSupporter);
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

            //Трябва да има поне един SupervisingBoard2.
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

            #region SupervisingBoardSupporters

            if (application.Fields.SupervisingBoardSupporters == null)
            {
                application.Fields.SupervisingBoardSupporters = new F014v_SupervisingBoardSupporters();
            }

            if (application.Fields.SupervisingBoardSupporters.SupervisingBoardSupporterList == null)
            {
                application.Fields.SupervisingBoardSupporters.SupervisingBoardSupporterList = new List<F01430_SupervisingBoardSupporter>();
            }

            //Трябва да има поне един SupervisingBoardSupporter.
            if (application.Fields.SupervisingBoardSupporters.SupervisingBoardSupporterList.Count == 0)
            {               
                var SupervisingBoardSupporter = new F01430_SupervisingBoardSupporter()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID,
                    }
                };
                
                application.Fields.SupervisingBoardSupporters.SupervisingBoardSupporterList.Add(SupervisingBoardSupporter);
                
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
