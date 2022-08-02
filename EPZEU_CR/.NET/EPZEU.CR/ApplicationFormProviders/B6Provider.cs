using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б6  Заявление за вписване на обстоятелства относно прекратяване и ликвидация"
    /// </summary>
    internal class B6Provider : ApplicationFormBProviderBase<B6>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B6_Liquidation;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00095_E");

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New && initParams.IsMainApplication.GetValueOrDefault())
            {
                if (!((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
                {                   
                    var subDeeds = await GetRequiredService<IDeedReportServiceClient>().SearchSubDeedSummariesAsync(((ApplicationWithFieldsInitParameters)initParams).UIC, SubUICTypes.B6_Liquidation);
                    if (subDeeds?.Any(t => t.Status == SubDeedStatuses.Active) == true)
                        return ReturnErrorResult("CR_APP_00088_E");
                }
                else
                {
                    //TODO: При пререгистрация даа се прави проверка дали в главното заявление вече има B6 и ако има да не може да се добавя, да се скрие и записа от UI
                }
            }   

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            #region Liquidators

            if (application.Fields.Liquidators == null)
            {
                application.Fields.Liquidators = new F502_Liquidators();
            }

            if (application.Fields.Liquidators.LiquidatorList == null)
            {
                application.Fields.Liquidators.LiquidatorList = new List<F5020_Liquidator>();
            }

            //Трябва да има поне един
            if (application.Fields.Liquidators.LiquidatorList.Count == 0)
            {
                var item = new F5020_Liquidator()
                {
                    Subject = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };

                application.Fields.Liquidators.LiquidatorList.Add(item);
            }

            #endregion

            #region Representative503

            if (application.Fields.Representative503 == null)
            {
                application.Fields.Representative503 = new F503_Representative503()
                {
                    Person = new Domain.Fields.Common.Person()
                    {
                        CountryName = bgCountry.Name,
                        CountryCode = bgCountry.Code,
                        CountryID = bgCountry.ID
                    }
                };
            }

            #endregion

            return result;
        }
    }
}