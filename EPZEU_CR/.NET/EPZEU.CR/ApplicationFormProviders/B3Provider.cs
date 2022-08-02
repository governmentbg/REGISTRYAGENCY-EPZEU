using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б3  Заявление за вписване на обстоятелства относно залог на дружествен дял"
    /// </summary>
    internal class B3Provider : ApplicationFormBProviderBase<B3>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B3_Pledge_DD;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00092_E");

            return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
        }

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);
            var onlyForChangeAndNewState = ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange || ((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.New;

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (((ApplicationWithFieldsInitParameters)initParams).State == ProcessStates.ForChange && !((ApplicationWithFieldsInitParameters)initParams).IsPreregistrationChildProcess)
            {
                //Няма намерена фирма/ЮЛНЦ
                if ((await GetRequiredService<IDeedReportServiceClient>().SearchSubDeedSummariesAsync(((ApplicationWithFieldsInitParameters)initParams).UIC, SubUICTypes.B3_Pledge_DD)).Count() == 0)
                    return ReturnErrorResult("GL_NOT_FOUND_COMPANY_E");

                if (string.IsNullOrEmpty(((ApplicationWithFieldsInitParameters)initParams).SubUIC))
                    throw new ArgumentNullException("SubUIC was not set.");
            }

            var deedLegalForm = ((ApplicationWithFieldsInitParameters)initParams).DeedContext.LegalForm.Value;

            if (onlyForChangeAndNewState)
            {
                if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A1))
                    return ReturnErrorResult("CR_APP_00076_E");//Едноличен търговец не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A5))
                    return ReturnErrorResult("CR_APP_00078_E");//Акционерно дружество не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A7))
                    return ReturnErrorResult("CR_APP_00079_E");//Кооперация не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A8))
                    return ReturnErrorResult("CR_APP_00080_E");//Клон на чуждестранен търговец не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A9))
                    return ReturnErrorResult("CR_APP_00083_E");//Търговец публично предприятие не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A11))
                    return ReturnErrorResult("CR_APP_00085_E");//Поделение на европейско обединение по икономически интереси не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A12))
                    return ReturnErrorResult("CR_APP_00089_E");//Европейско дружество не може да се регистрира запор и залог на дружествен дял
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A15))
                    return ReturnErrorResult("CR_APP_00230_E");//Сдружение не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A16))
                    return ReturnErrorResult("CR_APP_00231_E");//Фондация не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A17))
                    return ReturnErrorResult("CR_APP_00232_E");//Народно читалище не може да регистрира запор и залог на дружествен дял.
                else if ((DeedHelpers.GetApplicationTypeForLegalForm(deedLegalForm) == ApplicationFormTypes.A18))
                    return ReturnErrorResult("CR_APP_00233_E");//Kлон на чуждестранно юридическо лице с нестопанска цел не може да регистрира запор и залог на дружествен дял.
            }

            #region Pledgors

            if (application.Fields.Pledgors == null)
                application.Fields.Pledgors = new F201_Pledgors();

            if (application.Fields.Pledgors.PledgorList == null)
                application.Fields.Pledgors.PledgorList = new List<F2010_Pledgor>();

            if (application.Fields.Pledgors.PledgorList.Count == 0)
            {
                var pledgor = new F2010_Pledgor();

                application.Fields.Pledgors.PledgorList.Add(pledgor);
            }

            #endregion


            #region EntryIntoPledgeCreditorRights

            if (application.Fields.EntryIntoPledgeCreditorRights == null)
                application.Fields.EntryIntoPledgeCreditorRights = new F223a_EntryIntoPledgeCreditorRights();

            if (application.Fields.EntryIntoPledgeCreditorRights.EntryIntoPledgeCreditorRightList == null)
                application.Fields.EntryIntoPledgeCreditorRights.EntryIntoPledgeCreditorRightList = new List<F2231_EntryIntoPledgeCreditorRight>();

            if (application.Fields.EntryIntoPledgeCreditorRights.EntryIntoPledgeCreditorRightList.Count == 0)
            {
                var entryIntoPledgeCreditorRight = new F2231_EntryIntoPledgeCreditorRight();

                application.Fields.EntryIntoPledgeCreditorRights.EntryIntoPledgeCreditorRightList.Add(entryIntoPledgeCreditorRight);
            }

            #endregion


            #region SecuredClaimDebtors

            if (application.Fields.SecuredClaimDebtors == null)
                application.Fields.SecuredClaimDebtors = new F203_SecuredClaimDebtors();

            if (application.Fields.SecuredClaimDebtors.SecuredClaimDebtorList == null)
                application.Fields.SecuredClaimDebtors.SecuredClaimDebtorList = new List<F2030_SecuredClaimDebtor>();

            if (application.Fields.SecuredClaimDebtors.SecuredClaimDebtorList.Count == 0)
            {
                var securedClaimDebtor = new F2030_SecuredClaimDebtor();

                application.Fields.SecuredClaimDebtors.SecuredClaimDebtorList.Add(securedClaimDebtor);
            }

            #endregion

            #region PledgeCreditors

            if (application.Fields.PledgeCreditors == null)
                application.Fields.PledgeCreditors = new F205_PledgeCreditors();

            if (application.Fields.PledgeCreditors.PledgeCreditorsList == null)
                application.Fields.PledgeCreditors.PledgeCreditorsList = new List<F2050_PledgeCreditor>();

            if (application.Fields.PledgeCreditors.PledgeCreditorsList.Count == 0)
            {
                var pledgeCreditor = new F2050_PledgeCreditor();

                application.Fields.PledgeCreditors.PledgeCreditorsList.Add(pledgeCreditor);
            }

            #endregion

            #region Partners

            if (application.Fields.Partners218 == null)
                application.Fields.Partners218 = new F218_Partners218();

            if (application.Fields.Partners218.Partner218List == null)
                application.Fields.Partners218.Partner218List = new List<F2180_Partner218>();

            if (application.Fields.Partners218.Partner218List.Count == 0)
            {
                var partner = new F2180_Partner218();
                application.Fields.Partners218.Partner218List.Add(partner);
            }

            #endregion

            #region Depozitar

            if (application.Fields.Depozitar == null)
                application.Fields.Depozitar = new F220_Depozitar();

            if (application.Fields.Depozitar.DepozitarDistraintList == null)
                application.Fields.Depozitar.DepozitarDistraintList = new List<F22001_DepozitarDistraint>();

            if (application.Fields.Depozitar.DepozitarDistraintList.Count == 0)
            {
                var depozitar = new F22001_DepozitarDistraint();
                application.Fields.Depozitar.DepozitarDistraintList.Add(depozitar);
            }

            #endregion

            return result;
        }
    }
}