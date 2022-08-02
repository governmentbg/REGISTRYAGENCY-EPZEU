using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б2  Заявление за вписване на обстоятелства относно клон"
    /// </summary>
    internal class B2Provider : ApplicationFormBProviderBase<B2>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B2_Branch;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00091_E");

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

       protected override async Task<CNSys.OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            var onlyForChangeAndNewState = ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange || ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New;

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange && !((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
            {               
                //Няма залог на дружествен дял за избраното ЕИК. Заявлението трябва да се подава за първоначално вписване.
                if ((await GetRequiredService<IDeedReportServiceClient>().SearchSubDeedSummariesAsync(((ApplicationWithFieldsInitParameters)initParams).UIC, SubUICTypes.B2_Branch)).Count() == 0)
                    return ReturnErrorResult("CR_APP_00092_E");

                if (string.IsNullOrEmpty(((ApplicationWithFieldsInitParameters)initParams).SubUIC))
                    throw new ArgumentNullException("SubUIC was not set.");
            }

            var deedLegalForm = ((ApplicationWithFieldsInitParameters)initParams).DeedContext.LegalForm.Value;

            if (onlyForChangeAndNewState)
            {
                if (DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A8)
                    return ReturnErrorResult("CR_APP_00082_E");//Чуждестранен търговец не може да регистрира клонове
                else if (DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A11)
                    return ReturnErrorResult("CR_APP_00084_E"); //Поделение на европейско обединение по икономически интереси не може да регистрира клонове
                else if(DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A18)
                    return ReturnErrorResult("CR_APP_00229_E"); //Kлон на чуждестранно юридическо лице с нестопанска цел не може да регистрира клонове.
            }

            #region BranchManagers

            if (application.Fields.BranchManagers == null)
                application.Fields.BranchManagers = new F053_BranchManagers();

            if (application.Fields.BranchManagers.ManagersList == null)
                application.Fields.BranchManagers.ManagersList = new List<F0530_BranchManager>();

            //Трябва да има поне един управител.
            if (application.Fields.BranchManagers.ManagersList.Count == 0)
            {
                var manager = new F0530_BranchManager();

                application.Fields.BranchManagers.ManagersList.Add(manager);
            }

            var countries = GetRequiredService<ICountries>();
            var bgCountry = countries.GetBGCountry();

            if (application.Fields.BranchSeat == null)
                application.Fields.BranchSeat = new F051_BranchSeat();

            if (application.Fields.BranchSeat.Address == null)
                application.Fields.BranchSeat.Address = new Address();

            if (string.IsNullOrEmpty(application.Fields.BranchSeat.Address.Country))
            {
                application.Fields.BranchSeat.Address.Country = bgCountry.Name;
                application.Fields.BranchSeat.Address.CountryCode = bgCountry.Code;
                application.Fields.BranchSeat.Address.CountryID = bgCountry.ID;
            }

            #endregion

            return result;
        }
    }
}
