using System;
using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures.Cache;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на заявление "Искане за изправяне на грешки и непълноти"
    /// </summary>
    internal class IncomingRequestForCorrectionProvider : ApplicationFormProviderBase<IncomingRequestForCorrection>
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

            #region RequestForCorrection

            if (application.RequestForCorrection == null)
            {
                application.RequestForCorrection = new RequestForCorrection();
            }
            if (application.RequestForCorrection.Subject == null)
            {
                application.RequestForCorrection.Subject = new Person();
            }

            if (application.RequestForCorrection.OutgoingNumber == null)
            {
                application.RequestForCorrection.OutgoingNumber = new OutgoingNumber();
            }

            #endregion

            #region AdditionalData 

            if (initParams.AdditionalData != null)
            {
                if (initParams.AdditionalData.ContainsKey("incomingNumber"))
                {
                    application.RequestForCorrection.IncomingNumber = initParams.AdditionalData["incomingNumber"];
                }

                if (initParams.AdditionalData.ContainsKey("registrationNumber"))
                {
                    application.RequestForCorrection.RegNumber = initParams.AdditionalData["registrationNumber"];
                }

                if (application.RequestForCorrection.Subject == null)
                {
                    application.RequestForCorrection.Subject = new Person();
                }
                if (initParams.AdditionalData.ContainsKey("indent"))
                {
                    string ident = initParams.AdditionalData["indent"];
                    application.RequestForCorrection.Subject.Indent = ident;
                    application.RequestForCorrection.Subject.IndentType = IndentTypes.UIC;
                    application.UIC.Text = ident;
                }

                if (initParams.AdditionalData.ContainsKey("name"))
                {
                    string companyName = initParams.AdditionalData["name"];
                    application.RequestForCorrection.Subject.Name = companyName;
                    application.UIC.CompanyControl = companyName;
                }
            }

            #endregion

            return result;
        }
    }
}