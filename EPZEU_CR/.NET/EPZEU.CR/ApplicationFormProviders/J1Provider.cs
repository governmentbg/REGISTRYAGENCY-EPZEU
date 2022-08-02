using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Fields;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Ж1  Заявление за отстраняване на нередовности"
    /// </summary>
    internal class J1Provider : ApplicationFormProviderBase<J1>
    {
        private readonly static Lazy<Regex> _incomingNumberRegex = new Lazy<Regex>(() => new Regex(@"^[0-9]{14}$"), true);

        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            if (application.UIC == null)
                application.UIC = new UIC() { IsNew = true };

            if (application.IncomingNumber == null)
                application.IncomingNumber = new IncomingNumber();

            #region AdditionalData 

            if (initParams.AdditionalData != null)
            {
                if (initParams.AdditionalData.ContainsKey("uic"))
                {
                    string uic = initParams.AdditionalData["uic"];
                    application.UIC.Text = uic;
                    application.IncomingNumber.Indent = uic;
                }

                if (initParams.AdditionalData.ContainsKey("incomingNumber"))
                {
                    var tempIncomingNumber = initParams.AdditionalData["incomingNumber"];
                    if (_incomingNumberRegex.Value.IsMatch(tempIncomingNumber))
                    {
                        application.IncomingNumber.IncomingNo = initParams.AdditionalData["incomingNumber"];
                    }
                }

                if (initParams.AdditionalData.ContainsKey("outgoingNumber"))
                    application.IncomingNumber.OutgoingNo = initParams.AdditionalData["outgoingNumber"];

                if (initParams.AdditionalData.ContainsKey("companyName"))
                {
                    string companyName = initParams.AdditionalData["companyName"];
                    application.IncomingNumber.Name = companyName;
                    application.UIC.CompanyControl = companyName;
                }
            }

            #endregion

            return result;
        }
    }
}