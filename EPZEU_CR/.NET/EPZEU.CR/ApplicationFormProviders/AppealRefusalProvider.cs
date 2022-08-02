using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Подаване на жалба срещу отказ"
    /// </summary>
    internal class AppealRefusalProvider : ApplicationFormProviderBase<AppealRefusal>
    {
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
            {
                return result;
            }

            if (application.UIC == null)
            {
                application.UIC = new UIC() { IsNew = false };
            }

            #region ComplaintPersons

            if (application.ComplaintPersons == null)
            {
                application.ComplaintPersons = new ComplaintPersons();
                application.ComplaintPersons.ComplaintPersonsList = new List<ComplaintPerson>();

                var complaintPerson = new ComplaintPerson();

                application.ComplaintPersons.ComplaintPersonsList.Add(complaintPerson);
            }

            #endregion

            #region Refusal

            if (application.Refusal == null)
            {
                application.Refusal = new Refusal();
            }

            #endregion

            var appService = GetRequiredService<IApplicationServiceClient>();

            var appInfo = (await appService.SearchApplicationInfoAsync(new Integration.EPZEU.Models.SearchCriteria.ApplicationInfoSearchCriteria()
            {
                IncomingNumber = initParams.AdditionalData["incomingNumber"],
                Mode = Integration.EPZEU.Models.SearchCriteria.ApplicationInfoSearchMode.IncomingNumberOrEntryNumber
            })).Data.Single();

            if (appInfo.Refusal == null || !appInfo.Refusal.Type.HasValue
                || (appInfo.Refusal.Type.Value != Integration.EPZEU.Models.RefusalTypes.Full && appInfo.Refusal.Type.Value != Integration.EPZEU.Models.RefusalTypes.Partial)
                || appInfo.ApplicationType.Value == Integration.EPZEU.Models.ApplicationFormTypes.D1)
            {
                //За въведения вх. номер на заявление няма данни за поставен отказ!
                return new OperationResult("CR_APP_00182_E", "CR_APP_00182_E");
            }

            if (!FormHelper.IsApplicationType(appInfo.ApplicationType.Value))
            {
                //Няма заявление с този входящ номер.
                return new OperationResult("CR_GL_NO_APPL_WITH_THIS_INCOMING_NUMBER_E", "CR_GL_NO_APPL_WITH_THIS_INCOMING_NUMBER_E");
            }

            #region AdditionalData 

            if (initParams.AdditionalData.ContainsKey("incomingNumber"))
                application.Refusal.IncomingNo = initParams.AdditionalData["incomingNumber"];

            if (initParams.AdditionalData.ContainsKey("outgoingNumber"))
                application.Refusal.OutgoingNo = initParams.AdditionalData["outgoingNumber"];

            if (initParams.AdditionalData.ContainsKey("indent"))
            {
                string ident = initParams.AdditionalData["indent"];
                application.Refusal.Indent = ident;
                application.UIC.Text = ident;
            }

            if (initParams.AdditionalData.ContainsKey("name"))
            {
                string companyName = initParams.AdditionalData["name"];
                application.Refusal.Name = companyName;
                application.UIC.CompanyControl = companyName;
            }

            #endregion

            return result;
        }
    }
}
