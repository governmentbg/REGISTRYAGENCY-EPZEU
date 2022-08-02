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
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "Б4  Заявление за вписване на обстоятелства относно залог на търговско предприятие"
    /// </summary>
    internal class B4Provider : ApplicationFormBProviderBase<B4>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.B4_Pledge_TP;

        protected override CNSys.OperationResult ValidateApplicationInitFields(List<IField> fields)
        {
            if (fields == null || fields.Count == 0)
                return ReturnErrorResult("CR_APP_00093_E");

            return new CNSys.OperationResult(CNSys.OperationResultTypes.SuccessfullyCompleted);
        }

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;


           

            #region F301_DebtorOverSecureClaims

                if (application.Fields.DebtorOverSecureClaims == null)
            {
                application.Fields.DebtorOverSecureClaims = new F301_DebtorOverSecureClaims();
            }

            if (application.Fields.DebtorOverSecureClaims.DebtorOverSecureClaimList == null)
            {
                application.Fields.DebtorOverSecureClaims.DebtorOverSecureClaimList = new List<F3010_DebtorOverSecureClaim>();
            }

            //Трябва да има поне един
            if (application.Fields.DebtorOverSecureClaims.DebtorOverSecureClaimList.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();

                var item = new F3010_DebtorOverSecureClaim()
                {
                    Address = new Domain.Fields.Common.Address(),
                    Subject = new Domain.Fields.Common.Person()
                };

                application.Fields.DebtorOverSecureClaims.DebtorOverSecureClaimList.Add(item);
            }

            #endregion


            #region F303_AtPawnCreditors

            if (application.Fields.AtPawnCreditors == null)
            {
                application.Fields.AtPawnCreditors = new F303_AtPawnCreditors();
            }

            if (application.Fields.AtPawnCreditors.AtPawnCreditorsList == null)
            {
                application.Fields.AtPawnCreditors.AtPawnCreditorsList = new List<F3030_AtPawnCreditor>();
            }

            //Трябва да има поне един
            if (application.Fields.AtPawnCreditors.AtPawnCreditorsList.Count == 0)
            {
                var countries = GetRequiredService<ICountries>();
                var item = new F3030_AtPawnCreditor()
                {
                    Address = new Domain.Fields.Common.Address(),
                    Subject = new Domain.Fields.Common.Person()
                };

                application.Fields.AtPawnCreditors.AtPawnCreditorsList.Add(item);
            }

            #endregion

            #region EntryIntoPledgeCreditorRights2

            if (application.Fields.EntryIntoPledgeCreditorRights2 == null)
                application.Fields.EntryIntoPledgeCreditorRights2 = new F324a_EntryIntoPledgeCreditorRights2();

            if (application.Fields.EntryIntoPledgeCreditorRights2.EntryIntoPledgeCreditorRight2List == null)
                application.Fields.EntryIntoPledgeCreditorRights2.EntryIntoPledgeCreditorRight2List = new List<F32410_EntryIntoPledgeCreditorRight2>();

            if (application.Fields.EntryIntoPledgeCreditorRights2.EntryIntoPledgeCreditorRight2List.Count == 0)
            {
                var entryIntoPledgeCreditorRight2 = new F32410_EntryIntoPledgeCreditorRight2();

                application.Fields.EntryIntoPledgeCreditorRights2.EntryIntoPledgeCreditorRight2List.Add(entryIntoPledgeCreditorRight2);
            }

                #endregion

            return result;

        }
    }
}