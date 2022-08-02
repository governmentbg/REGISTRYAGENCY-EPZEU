using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А7 Заявление за вписване на обстоятелства относно кооперация"
    /// </summary>
    internal class A7Provider : ApplicationFormAProviderBase<A7>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.K;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region ChairMan

            if (application.Fields.ChairMan == null)
            {
                application.Fields.ChairMan = new F009_ChairMan();
                application.Fields.ChairMan.Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region BoardOfManagers

            if (application.Fields.BoardOfManagers == null)
                application.Fields.BoardOfManagers = new F013_BoardOfManagers();

            if (application.Fields.BoardOfManagers.BoardManagerList == null)
                application.Fields.BoardOfManagers.BoardManagerList = new List<F01301_BoardManager>();

            if (application.Fields.BoardOfManagers.BoardManagerList.Count == 0)
            {
                var boardOfManagers = new F01301_BoardManager();

                application.Fields.BoardOfManagers.BoardManagerList.Add(boardOfManagers);
                application.Fields.BoardOfManagers.BoardManagerList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region BoardOfManagersSupporters

            if (application.Fields.BoardOfManagersSupporters == null)
                application.Fields.BoardOfManagersSupporters = new F013a_BoardOfManagersSupporters();

            if (application.Fields.BoardOfManagersSupporters.BoardOfManagersSupportersPersonList == null)
                application.Fields.BoardOfManagersSupporters.BoardOfManagersSupportersPersonList = new List<F01310_BoardOfManagersSupportersPerson>();
            
            if (application.Fields.BoardOfManagersSupporters.BoardOfManagersSupportersPersonList.Count == 0)
            {
                var boardOfManagersSupporters = new F01310_BoardOfManagersSupportersPerson();

                application.Fields.BoardOfManagersSupporters.BoardOfManagersSupportersPersonList.Add(boardOfManagersSupporters);
                application.Fields.BoardOfManagersSupporters.BoardOfManagersSupportersPersonList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            #region ControllingBoard

            if (application.Fields.ControllingBoard == null)
                application.Fields.ControllingBoard = new F015_ControllingBoard();

            if (application.Fields.ControllingBoard.ControllingBoardPersonList == null)
                application.Fields.ControllingBoard.ControllingBoardPersonList = new List<F01501_ControllingBoardPerson>();

            if (application.Fields.ControllingBoard.ControllingBoardPersonList.Count == 0)
            {
                var controllingBoardPerson = new F01501_ControllingBoardPerson();

                application.Fields.ControllingBoard.ControllingBoardPersonList.Add(controllingBoardPerson);
                application.Fields.ControllingBoard.ControllingBoardPersonList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false,
                    Type = Domain.Fields.Common.PersonType.Subject
                };
            }

            #endregion

            #region ControllingBoardSupporters

            if (application.Fields.ControllingBoardSupporters == null)
                application.Fields.ControllingBoardSupporters = new F015a_ControllingBoardSupporters();

            if (application.Fields.ControllingBoardSupporters.ControllingBoardSupportersPersonList == null)
                application.Fields.ControllingBoardSupporters.ControllingBoardSupportersPersonList = new List<F01510_ControllingBoardSupportersPerson>();

            if (application.Fields.ControllingBoardSupporters.ControllingBoardSupportersPersonList.Count == 0)
            {
                var controllingBoardSupporters = new F01510_ControllingBoardSupportersPerson();

                application.Fields.ControllingBoardSupporters.ControllingBoardSupportersPersonList.Add(controllingBoardSupporters);
                application.Fields.ControllingBoardSupporters.ControllingBoardSupportersPersonList[0].Person = new Domain.Fields.Common.Person
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false
                };
            }

            #endregion

            return result;
        }
    }
}
