using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б1  Заявление за вписване на обстоятелства относно прокура"
    /// </summary>
    internal class B1Provider : ApplicationFormBProviderBase<B1>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B1_Procura;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00090_E");

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

       protected override async Task<CNSys.OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New && initParams.IsMainApplication.GetValueOrDefault())
            {
                var subDeed = await GetRequiredService<IDeedReportServiceClient>().SearchSubDeedSummariesAsync(((ApplicationWithFieldsInitParameters)initParams).UIC, SubUICTypes.B1_Procura);

                if (subDeed != null)
                    return ReturnErrorResult("CR_APP_00173_E");
            }

            var onlyForChangeAndNewState = ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange || ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New;
            var deedLegalForm = ((ApplicationWithFieldsInitParameters)initParams).DeedContext.LegalForm.Value;

            if (onlyForChangeAndNewState)
            {
                if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A8))
                {
                    return ReturnErrorResult("CR_APP_00081_E");//Чуждестранен търговец не може да регистрира прокура

                }
            }
                        
            #region Procurators

            if (application.Fields.Procurators == null)
                application.Fields.Procurators = new F041_Procurators();

            if (application.Fields.Procurators.ProcuratorsList == null)
                application.Fields.Procurators.ProcuratorsList = new List<F0410_Procurator>();

            if (application.Fields.Procurators.ProcuratorsList.Count == 0)
            {
                var procurator = new F0410_Procurator();
                application.Fields.Procurators.ProcuratorsList.Add(procurator);
            }

            if (application.Fields.SepcialPowers == null)
            {
                application.Fields.SepcialPowers = new F042_SepcialPowers();
                if(application.Fields.SepcialPowers.SepcialPowersList == null)
                {
                    application.Fields.SepcialPowers.SepcialPowersList = new List<F0420_SpecialPower>();
                }
            }

            if(application.Fields.SepcialPowers.SepcialPowersList == null)
                application.Fields.SepcialPowers.SepcialPowersList = new List<F0420_SpecialPower>();

            if (application.Fields.SepcialPowers.SepcialPowersList.Count == 0)
            {
                var specialPower = new F0420_SpecialPower();
                application.Fields.SepcialPowers.SepcialPowersList.Add(specialPower);
            }

            if(application.Fields.WayOfRepresentation == null)
            {
                application.Fields.WayOfRepresentation = new F043_WayOfRepresentation43();
            }

            if(application.Fields.EraseProcura == null)
            {
                application.Fields.EraseProcura = new F044_EraseProcura();
            }

            #endregion

            return result;
        }
    }
}
