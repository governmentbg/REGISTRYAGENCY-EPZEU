using CNSys;
using EPZEU.CR.Domain.ApplicationForms;
using EPZEU.CR.Domain.Common.Certificates;
using EPZEU.Security;
using Integration.EPZEU;
using System.IO;
using System.Threading.Tasks;
using System.Xml;

namespace EPZEU.CR.ApplicationFormProviders
{
    /// <summary>
    /// Реализация на интерфейс IApplicationProvider за работа със съдържанието на "Удостоверение за вписано обстоятелство"
    /// </summary>
    internal class RequestForEnteredCircumstancesCertificateProvider : ApplicationFormProviderBase<RequestForEnteredCircumstancesCertificate>
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
                    application.Certificate = new RequestForCertificate();

                if (initParams.AdditionalData.ContainsKey("name"))
                    application.Certificate.FirmName = initParams.AdditionalData["name"];

                if (initParams.AdditionalData.ContainsKey("indent"))
                    application.Certificate.UICNumber = initParams.AdditionalData["indent"];

                if (initParams.AdditionalData.ContainsKey("legalFormFull"))
                    application.Certificate.LegalFormFull = initParams.AdditionalData["legalFormFull"];
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