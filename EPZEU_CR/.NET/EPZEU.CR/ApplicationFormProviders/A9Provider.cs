using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationAProvider за работа със съдържанието на заявление "А9 Заявление за вписване на обстоятелства относно търговец, публично предприятие"
    /// </summary>
    internal class A9Provider : ApplicationFormAProviderBase<A9>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.MainCircumstances;

        public override Integration.EPZEU.Models.LegalForms LegalFormBase => Integration.EPZEU.Models.LegalForms.TPP;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

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

            #region BoardOfManagersSupporters

            if (application.Fields.BoardOfManagers == null)
                application.Fields.BoardOfManagers = new F013_BoardOfManagers();

            if (application.Fields.BoardOfManagers.BoardManagerList == null)
                application.Fields.BoardOfManagers.BoardManagerList = new List<F01301_BoardManager>();

            if (application.Fields.BoardOfManagers.BoardManagerList.Count == 0)
            {
                var boardManager = new F01301_BoardManager();

                application.Fields.BoardOfManagers.BoardManagerList.Add(boardManager);
                application.Fields.BoardOfManagers.BoardManagerList[0].Person = new Domain.Fields.Common.Person
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
                application.Fields.ControllingBoard.ControllingBoardPersonList[0].Person = new Domain.Fields.Common.Person()
                {
                    CountryName = bgCountry.Name,
                    CountryCode = bgCountry.Code,
                    CountryID = bgCountry.ID,
                    IsForeignTrader = false,
                    Type = Domain.Fields.Common.PersonType.Subject
                };
            }

            #endregion

            return result;
        }
    }
}
