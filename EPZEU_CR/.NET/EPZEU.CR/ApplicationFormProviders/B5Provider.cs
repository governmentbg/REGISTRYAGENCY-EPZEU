using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б5  Заявление за вписване на обстоятелства относно запор върху дружествен дял"
    /// </summary>
    internal class B5Provider : ApplicationFormBProviderBase<B5>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B5_Distraint_DD;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00094_E");

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            #region Distraints

            if (application.Fields.Distraints == null)
            {
                application.Fields.Distraints = new F401_Distraints();
            }

            if (application.Fields.Distraints.DistraintsList == null)
            {
                application.Fields.Distraints.DistraintsList = new List<F4010_Distraint>();
            }

            if (application.Fields.Distraints.DistraintsList.Count == 0)
            {
                var distraint = new F4010_Distraint();

                application.Fields.Distraints.DistraintsList.Add(distraint);
            }

            #endregion

            #region Descriptions

            if (application.Fields.Descriptions == null)
            {
                application.Fields.Descriptions = new F406_Descriptions();
            }

            if (application.Fields.Descriptions.Description406List == null)
            {
                application.Fields.Descriptions.Description406List = new List<F040601_Description406>();
            }

            if (application.Fields.Descriptions.Description406List.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var bgCountry = countries.GetBGCountry();
                var description = new F040601_Description406();

                application.Fields.Descriptions.Description406List.Add(description);
                application.Fields.Descriptions.Description406List[0].Subject = new Domain.Fields.Common.Person
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