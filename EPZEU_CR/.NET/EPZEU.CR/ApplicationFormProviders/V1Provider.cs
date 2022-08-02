using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationWithFieldsProvider за работа със съдържанието на заявление "В1  Заявление за вписване на обстоятелства относно прехвърляне на търговско предприятие"
    /// </summary>
    internal class V1Provider : ApplicationFormVProviderBase<V1>
    {
        public override Integration.EPZEU.Models.SubUICTypes SubUICType => Integration.EPZEU.Models.SubUICTypes.V1_Transfer;

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            #region F600_TransferringTypeOfTradeEnterprise

            if (application.Fields.TransferringTypeOfTradeEnterprise == null)
            {
                application.Fields.TransferringTypeOfTradeEnterprise = new F600_TransferringTypeOfTradeEnterprise();
            }

            bool noOptionSelected = !application.Fields.TransferringTypeOfTradeEnterprise.Fulltransfer
                && !application.Fields.TransferringTypeOfTradeEnterprise.Partialtransfer
                && !application.Fields.TransferringTypeOfTradeEnterprise.Taketransfer;

            if (noOptionSelected)
                application.Fields.TransferringTypeOfTradeEnterprise.Fulltransfer = true;

            #endregion

            #region AcquisitionEnterprises

            if (application.Fields.AcquisitionEnterprises == null)
            {
                application.Fields.AcquisitionEnterprises = new F602_AcquisitionEnterprises();
            }

            if (application.Fields.AcquisitionEnterprises.AcquisitionEnterpriseList == null)
            {
                application.Fields.AcquisitionEnterprises.AcquisitionEnterpriseList = new List<F6020_AcquisitionEnterprise>();
            }

            if (application.Fields.AcquisitionEnterprises.AcquisitionEnterpriseList.Count == 0)
            {
                var acquisitionEnterprise = new F6020_AcquisitionEnterprise();

                application.Fields.AcquisitionEnterprises.AcquisitionEnterpriseList.Add(acquisitionEnterprise);
            }

            #endregion


            return result;
        }
    }
}
