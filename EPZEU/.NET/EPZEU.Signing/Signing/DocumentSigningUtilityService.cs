using EPZEU.Signing.BSecureDSSL;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace EPZEU.Signing
{
    public interface IDocumentSigningtUtilityService
    {
        /// <summary>
        /// Създава хаш на документ за подписване.
        /// </summary>
        /// <param name="ContentType">MIME тип на документа.</param>
        /// <param name="FileName">Име на документа.</param>
        /// <param name="content">Съдържание на документа.</param>
        /// <param name="digestMethod">Алгоритъм използван при подписването.</param>
        /// <param name="signingFormat">Формат на подписването.</param>
        /// <param name="signingPackingType">Вид пакетиране на подписа.</param>
        /// <param name="signingLevel">Ниво на подписване.</param>
        /// <param name="Base64SigningCert">Base64 кодиран цифров сертификат, с който ще бъде извършено подписването.</param>
        /// <param name="padesVisualSignature"></param>
        /// <returns>DigestResponseDto</returns>
        Task<DigestResponseDto> CreateDocumentHashAsync(string ContentType, string FileName, Stream content, string digestMethod, Models.SigningFormats signingFormat, string signingPackingType, Models.SigningLevels signingLevel, string Base64SigningCert, bool? padesVisualSignature = null);

        /// <summary>
        /// Сглобява документа с изчисления подпис.
        /// </summary>
        /// <param name="contentType">MIME тип на документа.</param>
        /// <param name="fileName">Име на документа.</param>
        /// <param name="content">Съдържание на документа.</param>
        /// <param name="digestMethod">Алгоритъм използван при подписването.</param>
        /// <param name="signingFormat">Формат на подписването.</param>
        /// <param name="signingPackingType">Вид пакетиране на подписа.</param>
        /// <param name="signingLevel">Ниво на подписване.</param>
        /// <param name="Base64SigningCert">Base64 кодиран цифров сертификат, с който ще бъде извършено подписването.</param>
        /// <param name="Base64DocSignature">Base64 кодиран положеният подпис.></param>
        /// <param name="hashTime">Времето на изчисляването на хеш-а на документа.</param>
        /// <param name="padesVisualSignature"></param>
        /// <returns>byte[]</returns>
        Task<Stream> AssembleDocumentWithSignatureAsync(string contentType, string fileName, Stream content, string digestMethod, Models.SigningFormats signingFormat, string signingPackingType, Models.SigningLevels signingLevel, string Base64SigningCert, string Base64DocSignature, long hashTime, bool? padesVisualSignature = null);

        /// <summary>
        /// Подписва.
        /// </summary>
        /// <param name="contentType">MIME тип на документа.</param>
        /// <param name="fileName">Име на документа.</param>
        /// <param name="content">Съдържание на документа.</param>
        /// <param name="digestMethod">Алгоритъм използван при подписването.</param>
        /// <param name="signingFormat">Формат на подписването.</param>
        /// <param name="signingPackingType">Вид пакетиране на подписа.</param>
        /// <param name="signingLevel">Ниво на подписване.</param>
        /// <param name="signCert">КЕП с който ще бъде извършено подписването.</param>
        /// <param name="padesVisualSignature"></param>
        /// <returns>Stream</returns>
        Task<Stream> SignAsync(string contentType, string fileName, Stream content, string digestMethod, Models.SigningFormats signingFormat, string signingPackingType, Models.SigningLevels signingLevel, X509Certificate2 signCert, bool? padesVisualSignature = null);

        /// <summary>
        /// Валидира положените подписи.
        /// </summary>
        /// <param name="signedContent">Съдържания на подписания документ.</param>
        /// <param name="fileName">Име на документа</param>
        /// <param name="leaveOpen">True не затваря потока signedContent, False затваря го.</param>
        /// <returns>ValidateDocumentResponseDto</returns>
        Task<ValidateDocumentResponseDto> SignaturesVerificationAsync(Stream signedContent, string fileName, bool leaveOpen = false);

        /// <summary>
        /// Връща сървърен сертификат на BTrust  за тестово подписване и за криптиране на комуникацията с BISS.
        /// </summary>
        /// <returns>X509Certificate2</returns>
        X509Certificate2 GeServerCert();
    }

    internal class DocumentSigningUtilityService : IDocumentSigningtUtilityService
    {
        private readonly IBSecureDsslClient _bSecureDsslClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        public DocumentSigningUtilityService(IBSecureDsslClient bSecureDsslClient, IConfiguration configuration, ILogger<DocumentSigningUtilityService> logger)
        {
            _bSecureDsslClient = bSecureDsslClient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<DigestResponseDto> CreateDocumentHashAsync(string contentType, string fileName, Stream content, string digestMethod, Models.SigningFormats signingFormat, string signingPackingType, Models.SigningLevels signingLevel, string Base64SigningCert, bool? padesVisualSignature = null)
        {
            DigestResponseDto bSecureResponse = null;
            byte[] certBytes = Convert.FromBase64String(Base64SigningCert);

            #region Обръщаме се към B-trust Web услугата, за да изчисли хеша на документа.

            //Забивка, защото услугата Bsecure DSSL не приема MediaType application/xml и работи само с text/xml.
            string mimeType = string.Compare(contentType, "application/xml", true) == 0 ? "text/xml" : contentType;
            FileParameter data = new FileParameter(new CNSys.IO.NonDisposingStream(content), fileName, mimeType);
            FileParameter cert = new FileParameter(new MemoryStream(certBytes), "userCert.cer", "application/x-x509-ca-cert");

            try
            {
                bSecureResponse = await _bSecureDsslClient.GetDigestUsingPOSTAsync("en",
                                            cert,
                                            data,
                                            digestMethod,
                                            padesVisualSignature.GetValueOrDefault(),
                                            GetSignatureLevel(signingFormat, signingLevel),
                                            signingPackingType);
            }
            finally
            {
                if (cert != null && cert.Data != null)
                {
                    cert.Data.Dispose();
                }
            }

            #endregion

            return bSecureResponse;
        }

        public async Task<Stream> AssembleDocumentWithSignatureAsync(string contentType, string fileName, Stream content, string digestMethod, Models.SigningFormats signingFormat, string signingPackingType, Models.SigningLevels signingLevel, string Base64SigningCert, string Base64DocSignature, long hashTime, bool? padesVisualSignature = null)
        {
            byte[] signatureBytes = Convert.FromBase64String(Base64DocSignature);
            byte[] certBytes = Convert.FromBase64String(Base64SigningCert);

            #region Обръщаме се към B-trust Web услугата, за да сглобим документа и подписа от BISS.

            //Забивка, защото услугата Bsecure DSSL не приема MediaType application/xml и работи само с text/xml.
            var mimeType = string.Compare(contentType, "application/xml", true) == 0 ? "text/xml" : contentType;
            FileParameter data = new FileParameter(new CNSys.IO.NonDisposingStream(content), fileName, mimeType);
            FileParameter signatuer = new FileParameter(new MemoryStream(signatureBytes), "signature.bin", "application/octet-stream");
            FileParameter userCert = new FileParameter(new MemoryStream(certBytes), "userCert.cer", "application/x-x509-ca-cert");

            try
            {
                DocumentResponseDto bSecureResponse = await _bSecureDsslClient.CreateSignedDocumentUsingPOSTAsync("en"
                    , userCert
                    , data
                    , digestMethod
                    , hashTime
                    , padesVisualSignature.GetValueOrDefault()
                    , signatuer
                    , GetSignatureLevel(signingFormat, signingLevel)
                    , signingPackingType
                    , digestMethod);

                return new MemoryStream(bSecureResponse.SignedData);
            }
            finally
            {
                if (signatuer != null && signatuer.Data != null)
                    signatuer.Data.Dispose();

                if (userCert != null && userCert.Data != null)
                    userCert.Data.Dispose();
            }

            #endregion
        }

        public async Task<ValidateDocumentResponseDto> SignaturesVerificationAsync(Stream signedContent, string fileName, bool leaveOpen = false)
        {
            long currStreamPosition = 0;
            try
            {
                currStreamPosition = signedContent.Position;
                FileParameter fileParameter = new FileParameter(leaveOpen ? new CNSys.IO.NonDisposingStream(signedContent) : signedContent, fileName);

                return await _bSecureDsslClient.ValidateSignedDocumentUsingPOSTAsync(
                    "en"
                    , true
                    , false
                    , null
                    , fileParameter
                    , (string)null
                    , cancellationToken: System.Threading.CancellationToken.None);
            }
            finally
            {
                if(leaveOpen)
                {
                    signedContent.Position = currStreamPosition;
                }
            }
        }

        public X509Certificate2 GeServerCert()
        {
            X509Certificate2 cert = null;

            using (X509Store store = new X509Store(StoreLocation.LocalMachine))
            {
                store.Open(OpenFlags.ReadOnly);

                string serverCertThumbprint = _configuration.GetEPZEUSection().GetValue<string>("EP_SIGN_BISS_CERT_THUMBPRINT");
                X509Certificate2Collection certCollection = store.Certificates.Find(X509FindType.FindByThumbprint, serverCertThumbprint, true);

                if (certCollection == null || certCollection.Count == 0)
                {
                    NotSupportedException ex = new NotSupportedException("Not found server certificate for BISS comunication and Test signeing.");
                    _logger.LogException(ex);

                    throw ex;
                }

                cert = certCollection[0];
            }

            return cert;
        }

        public async Task<Stream> SignAsync(string contentType, string fileName, Stream content, string digestMethod, Models.SigningFormats signingFormat, string signingPackingType, Models.SigningLevels signingLevel, X509Certificate2 signCert, bool? padesVisualSignature = null)
        {
            if (!content.CanSeek)
                throw new NotSupportedException("content must be seekable");

            var contentPosing = content.Position;

            byte[] signedData = null;
            string bas64SigningCert = Convert.ToBase64String(signCert.GetRawCertData());

            DigestResponseDto bSecureResponse = null;
            using (var nds = new CNSys.IO.NonDisposingStream(content))
            {
                bSecureResponse = await CreateDocumentHashAsync(
                    contentType
                    , fileName
                    , nds
                    , digestMethod
                    , signingFormat
                    , signingPackingType
                    , signingLevel
                    , bas64SigningCert
                    , padesVisualSignature);
            }

            using (RSA rsa = signCert.GetRSAPrivateKey())
            {
                signedData = rsa.SignData(bSecureResponse.DigestValue, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
            }
            
            content.Position = contentPosing;

            using (var nds = new CNSys.IO.NonDisposingStream(content))
            {
                return await AssembleDocumentWithSignatureAsync(
                    contentType
                    , fileName
                    , nds
                    , digestMethod
                    , signingFormat
                    , signingPackingType
                    , signingLevel
                    , bas64SigningCert
                    , Convert.ToBase64String(signedData)
                    , bSecureResponse.DigestTime.Value);
            }
        }

        #region Helpers

        private string GetSignatureLevel(Models.SigningFormats signingFormat, Models.SigningLevels signingLevel)
        {
            string signFormat = null;
            string signLevel = null;

            switch (signingFormat)
            {
                case Models.SigningFormats.PAdES:
                    signFormat = "PAdES";
                    break;
                case Models.SigningFormats.XAdES:
                    signFormat = "XAdES";
                    break;
                case Models.SigningFormats.CAdES:
                    signFormat = "CAdES";
                    break;
                default:
                    throw new NotSupportedException();
            }

            switch (signingLevel)
            {
                case Models.SigningLevels.BASELINE_B:
                    signLevel = "BASELINE_B";
                    break;
                case Models.SigningLevels.BASELINE_T:
                    signLevel = "BASELINE_T";
                    break;
                case Models.SigningLevels.BASELINE_LT:
                    signLevel = "BASELINE_LT";
                    break;
                case Models.SigningLevels.BASELINE_LTA:
                    signLevel = "BASELINE_LTA";
                    break;
                default:
                    throw new NotSupportedException();
            }


            return string.Format("{0}_{1}", signFormat, signLevel);
        }

        #endregion
    }
}
