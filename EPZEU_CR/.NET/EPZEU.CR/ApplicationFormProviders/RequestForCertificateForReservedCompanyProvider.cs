using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.Security;
using Integration.EPZEU;
using System.IO;
using System.Threading.Tasks;
using System.Xml;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на "Удостоверение за запазена фирма"
    /// </summary>
    internal class RequestForCertificateForReservedCompanyProvider : ApplicationFormProviderBase<RequestForCertificateForReservedCompany>
    {
        protected async override Task<OperationResult> InitApplicationInternalAsync(ApplicationInitParameters initParams)
        {
            if (GetRequiredService<IEPZEUUserAccessor>()?.User?.IsUserIdentifiable != true)
            {
                return new OperationResult("GL_UAC_NEED_SERTIFICATE_AUTHENTICATION_Е", "GL_UAC_NEED_SERTIFICATE_AUTHENTICATION_Е");
            }

            var result = await base.InitApplicationInternalAsync(initParams);

            if (!result.IsSuccessfullyCompleted)
                return result;

            #region AdditionalData 

            if (initParams.AdditionalData != null)
            {
                if (application.Certificate == null)
                    application.Certificate = new CertificateForReservedCompany();

                if (initParams.AdditionalData.ContainsKey("companyName"))
                    application.Certificate.Firm = initParams.AdditionalData["companyName"];

                if (initParams.AdditionalData.ContainsKey("interestedPerson"))
                    application.Certificate.PersonConcernedName = initParams.AdditionalData["interestedPerson"];

                if (initParams.AdditionalData.ContainsKey("activeTo"))
                    application.Certificate.EndDate = initParams.AdditionalData["activeTo"];

                if (initParams.AdditionalData.ContainsKey("trasnliteration"))
                    application.Certificate.Translit = initParams.AdditionalData["trasnliteration"];

                if (initParams.AdditionalData.ContainsKey("activeFrom"))
                    application.Certificate.FromDate = initParams.AdditionalData["activeFrom"];
            }

            #endregion

            return result;
        }

        /// <summary>
        /// Стопиращи валидации
        /// </summary>
        /// <returns></returns>
        public override async Task<IErrorCollection> ValidateAsync()
        {
            var errors = await base.ValidateAsync();

            if (errors != null && errors.Count > 0)
            {
                return errors;
            }
            var xmlStream = new MemoryStream();

            using (var writer = XmlWriter.Create(xmlStream))
            {
                SaveAsXml(writer);
                xmlStream.Position = 0;
            }

            return await GetRequiredService<IApplicationServiceClient>().ValidateRequestForCertificateAsync(xmlStream);
        }
    }
}
