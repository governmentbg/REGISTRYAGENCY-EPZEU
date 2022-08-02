using CNSys;
using CNSys.Data;
using EPZEU.Signing.BSecureDSSL;
using EPZEU.Signing.BtrustRemoteClient;
using EPZEU.Signing.Configuration;
using EPZEU.Signing.Models;
using EPZEU.Signing.Models.SearchCriteria;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing
{
    public interface IBTrustProcessorService
    {
        Task<OperationResult<BissSignRequestExtended>> CreateBissSignRequestAsync(Guid processID, string Base64SigningCert, CancellationToken cancellationToken);

        Task<OperationResult<BissSignRequestExtended>> CreateTestBissSignRequest(string UserCertBase64);

        Task<OperationResult> CompleteBissSignProcessAsync(Guid processID, string Base64SigningCert, string Base64DocSignature, long hashTime, long signerID, CancellationToken cancellationToken);

        Task<OperationResult> CompleteTestBissSignProcess(string Base64SigningCert, string Base64DocSignature, long hashTime);

        Task<OperationResult> CreateRemoteSignRequestAsync(Guid processID, long SignerID, BtrustUserInputRequest btrustUserInput, CancellationToken cancellationToken);

        Task<OperationResult<BtrustPullingResult>> TryCompleteRemoteSigning(Guid processID, long SignerID, CancellationToken cancellationToken);
    }

    internal class BTrustProcessorService : IBTrustProcessorService
    {
        #region Members

        private readonly static string _testSignXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><app:A1 xmlns:app=\"http://regisrtyagency.bg/comreg/v1/Applications\" xmlns:f=\"http://www.registryagency.bg/schemas/deedv2/Fields\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" ApplicationState=\"New\" SubUICType=\"MainCircumstances\"><app:ApplicantInfo><app:Applicants><app:Applicant><app:Person CompetentAuthorityForRegistration=\"\" CountryCode=\"\" CountryCodeBRIS=\"\" ForeignLegalFormCode=\"\" ForeignRegisterCode=\"\" IsForeignTraderText=\"0\" LegalForm=\"\" Position=\"\" RegistrationNumber=\"\"><app:Indent>1010101010</app:Indent><app:Name>Заявител Едно</app:Name><app:IndentType>EGN</app:IndentType><app:CountryID xsi:nil=\"true\" /></app:Person></app:Applicant></app:Applicants><app:ApplicantCapacity AnotherFace=\"false\" ApplicantLawyerWithPower=\"false\" AssignedExpert=\"false\" AssignmentApplicant=\"false\" FinancialAccountCreator=\"false\" LawyerWithLetter=\"false\" PersonRepresentingBranchOfNonProfitForeignLegalEntity=\"false\" PersonRepresentingCommunityCentrer=\"false\" PersonRepresentingTheAssociation=\"false\" PersonRepresentingTheFoundation=\"false\" Procurator=\"false\" Trader=\"true\" /></app:ApplicantInfo></app:A1>";

        private readonly ISigningProcessesService _signingProcessesService;
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;
        private readonly IBtrustRemoteClient _btrustRemoteClient;
        private readonly ILogger _logger;
        private readonly IOptionsMonitor<SignModuleGlobalOptions> _signModuleOptions;
        private readonly IDocumentSigningtUtilityService _documentSigningUtilityService;

        #endregion

        #region Constructor

        public BTrustProcessorService(ISigningProcessesService signingProcessesService
                                      , IDbContextOperationExecutor dbContextOperationExecutor
                                      , IBtrustRemoteClient btrustRemoteClient
                                      , ILogger<BTrustProcessorService> logger
                                      , IOptionsMonitor<SignModuleGlobalOptions> signModuleOptions
                                      , IDocumentSigningtUtilityService documentSigningUtilityService)
        {
            _signingProcessesService       = signingProcessesService;
            _dbContextOperationExecutor    = dbContextOperationExecutor;
            _btrustRemoteClient            = btrustRemoteClient;
            _logger                        = logger;
            _signModuleOptions             = signModuleOptions;
            _documentSigningUtilityService = documentSigningUtilityService;
        }

        #endregion

        #region IBTrustProcessorService

        #region BISS

        public async Task<OperationResult<BissSignRequestExtended>> CreateBissSignRequestAsync(Guid processID, string Base64SigningCert, CancellationToken cancellationToken)
        {
            SigningProcess process = null;
            try
            {
                process = (await _signingProcessesService.SearchAsync(new SigningProcessesSearchCriteria()
                {
                    ProcessID = processID,
                    LoadContent = true,
                    LoadSigners = true
                }, cancellationToken)).SingleOrDefault();

                if (process == null || process.Content == null)
                    return new OperationResult<BissSignRequestExtended>("EP_SIGN_NO_DATA_E", "EP_SIGN_NO_DATA_E");

                //Това е за да хванем ако има инициирано отдалечено подписване. 
                if (process.Signers.Any(s => s.Status == SignerSigningStatuses.StartSigning))
                    return new OperationResult<BissSignRequestExtended>("EP_SIGN_ONGOING_SIGNING_E", "EP_SIGN_ONGOING_SIGNING_E");

                return await CreateBissSignRequestInternal(process, Base64SigningCert);
            }
            finally
            {
                if(process != null && process.Content != null)
                {
                    process.Content.Dispose();
                }
            }
        }

        public async Task<OperationResult> CompleteBissSignProcessAsync(Guid processID, string Base64SigningCert, string Base64DocSignature, long hashTime, long signerID, CancellationToken cancellationToken)
        {
            SigningProcess process = null;

            try
            {
                process =(await _signingProcessesService.SearchAsync(new SigningProcessesSearchCriteria()
                {
                    ProcessID = processID,
                    LoadContent = true,
                    LoadSigners = true
                }, cancellationToken)).SingleOrDefault();

                if (process == null || process.Content == null)
                    return new OperationResult("GL_NO_DATA_FOUND_L", "GL_NO_DATA_FOUND_L");

                Signer currentSigner = process.Signers.SingleOrDefault(s => s.SignerID == signerID);

                if (currentSigner == null || currentSigner.Status == SignerSigningStatuses.Signed)
                    return new OperationResult("EP_SIGN_ONGOING_SIGNING_E", "EP_SIGN_ONGOING_SIGNING_E");

                using (Stream assembledDoc = await _documentSigningUtilityService.AssembleDocumentWithSignatureAsync(process.ContentType
                                                                                                , process.FileName
                                                                                                , process.Content
                                                                                                , process.DigestMethod.Value.ToString()
                                                                                                , process.Format.Value
                                                                                                , process.Type.Value.ToString()
                                                                                                , process.Level.Value
                                                                                                , Base64SigningCert
                                                                                                , Base64DocSignature
                                                                                                , hashTime
                                                                                                , process.Format == SigningFormats.PAdES))
                {
                    //Това се прави за оптимизация.
                    if (process.Content != null)
                    {
                        process.Content.Dispose();
                        process.Content = null;
                    }

                    return await _signingProcessesService.SignerSignedLocalAsync(processID, signerID, assembledDoc, cancellationToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                //Грешка при подписване. Моля, свържете се с администратор на Портала на Агенция по вписванията.
                //След отстраняване на проблема, опитайте да подпишете отново.
                return new OperationResult("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            finally
            {
                if (process != null && process.Content != null)
                {
                    process.Content.Dispose();
                    process.Content = null;
                }
            }
        }

        public async Task<OperationResult<BissSignRequestExtended>> CreateTestBissSignRequest(string UserCertBase64)
        {
            using(var ms = CNSys.Xml.XmlHelpers.GetStreamFromXmlDocument(_testSignXml))
            {
                SigningProcess process = new SigningProcess()
                {
                    FileName = "Document.xml",
                    ContentType = "text/xml",
                    Content = ms,
                    Format = SigningFormats.XAdES,
                    Level = SigningLevels.BASELINE_LT,
                    DigestMethod = DigestMethods.SHA256,
                    Type = SigningPackingTypes.ENVELOPED
                };

                return await CreateBissSignRequestInternal(process, UserCertBase64);
            }
        }

        public async Task<OperationResult> CompleteTestBissSignProcess(string Base64SigningCert, string Base64DocSignature, long hashTime)
        {
            SigningProcess process = null;
            try
            {
                process = new SigningProcess()
                {
                    FileName = "Document.xml",
                    ContentType = "text/xml",
                    Content = CNSys.Xml.XmlHelpers.GetStreamFromXmlDocument(_testSignXml),
                    Format = SigningFormats.XAdES,
                    Level = SigningLevels.BASELINE_LT,
                    DigestMethod = DigestMethods.SHA256,
                    Type = SigningPackingTypes.ENVELOPED
                };

                using (Stream assembledDoc = await _documentSigningUtilityService.AssembleDocumentWithSignatureAsync(process.ContentType
                                                                                                , process.FileName
                                                                                                , process.Content
                                                                                                , process.DigestMethod.Value.ToString()
                                                                                                , process.Format.Value
                                                                                                , process.Type.Value.ToString()
                                                                                                , process.Level.Value
                                                                                                , Base64SigningCert
                                                                                                , Base64DocSignature
                                                                                                , hashTime
                                                                                                , process.Format == SigningFormats.PAdES))
                {
                    if(process.Content != null)
                    {
                        process.Content.Dispose();
                        process.Content = null;
                    }

                    #region Валидация на подписите.

                    var validationResult = await _documentSigningUtilityService.SignaturesVerificationAsync(assembledDoc, process.FileName);
                    bool isValid = string.Compare(validationResult.DocumentStatusValid, "TRUE", true) == 0 && validationResult.Signatures.Count() > 0;

                    if (!isValid)
                    {
                        _logger.LogWarning("Неуспешна валидация на подпис. Съобщение за грешка: {message}. Брой валидни подписи: {validSignaturesCount}. Дата на валидация: {validationDateTime}. Подписи в документа: {newLine} {signatures}"
                        , validationResult.Message
                        , validationResult.ValidSignaturesCount
                        , validationResult.ValidationDateTime
                        , Environment.NewLine
                        , validationResult.Signatures != null && validationResult.Signatures.Any() ? string.Join(Environment.NewLine, validationResult.Signatures.Select(el => el.ToJson())) : "");

                        //В документа е положен невалиден подпис.
                        return new OperationResult("EP_SIGN_INAVLD_SIGNATURE_E", "EP_SIGN_INAVLD_SIGNATURE_E");
                    }

                    #endregion
                }

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                return new OperationResult("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            finally
            {
                if (process != null && process.Content != null)
                {
                    process.Content.Dispose();
                    process.Content = null;
                }
            }
        }

        #endregion

        #region Remote

        public async Task<OperationResult> CreateRemoteSignRequestAsync(Guid processID, long SignerID, BtrustUserInputRequest btrustUserInput, CancellationToken cancellationToken)
        {
            SigningProcess process = null;

            try
            {
                process = (await _signingProcessesService.SearchAsync(new SigningProcessesSearchCriteria()
                {
                    ProcessID = processID,
                    LoadContent = true,
                    LoadSigners = true
                }, cancellationToken)).SingleOrDefault();
                
                string clientTokenHeaderValue = null;
                if(btrustUserInput.InputType == BtrustUserInputTypes.PROFILE)
                {
                    //Проверка на потребителя.
                    var authInfo = new AuthInfo() { ProfileId = btrustUserInput.Input, Otp = btrustUserInput.Otp };
                    var authorizationResponse = await _btrustRemoteClient.ClientAuthUsingPOSTAsync("en", authInfo, _signModuleOptions.CurrentValue.EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID);

                    clientTokenHeaderValue = btrustUserInput.CreateClientTokenHeader(authorizationResponse.Data.ClientToken);
                }

                //1. Взимаме сертификата на потребителя
                ClientCertResponse clientCertResponse;
                if(btrustUserInput.InputType == BtrustUserInputTypes.PROFILE)
                {
                    clientCertResponse = await _btrustRemoteClient.GetCertUsingGETAsync("en", btrustUserInput.Input, _signModuleOptions.CurrentValue.EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID);
                }
                else
                {
                    var clientCertRes = await CheckAndGetUserCert(btrustUserInput.Input);

                    if (!clientCertRes.IsSuccessfullyCompleted)
                        return clientCertRes;

                    clientCertResponse = clientCertRes.Result;
                }

                //2. Генерира хеш на документа за подписване.
                DigestResponseDto bSecureHashResponse = null;
                using (process.Content)
                {
                    bSecureHashResponse = await _documentSigningUtilityService.CreateDocumentHashAsync(
                                                            process.ContentType
                                                            , process.FileName
                                                            , process.Content
                                                            , process.DigestMethod.Value.ToString()
                                                            , process.Format.Value
                                                            , process.Type.Value.ToString()
                                                            , process.Level.Value
                                                            , clientCertResponse.Data.EncodedCert
                                                            , process.Format == SigningFormats.PAdES);
                }

                //3. Създава заявка за подписване
                string fileName = process.FileName;
                if(process.FileName.Length > 120 && Regex.IsMatch(process.FileName, @"\p{IsCyrillic}"))
                {
                    //Това се прави защото в базата на Btrust колоната е VARCHAR(250), затова е необходимо понеже имената са 
                    //на кирилица да намалим на половин дължината и така да се вместят в тяхната колона.
                    fileName = string.Format("{0}-{1}", process.FileName.Substring(0, 59), process.FileName.Substring(process.FileName.Length - 60));
                }

                SignRequest signRequestBody = new SignRequest()
                {
                    Contents = new List<Content>()
                        {
                            new Content()
                            {
                                ContentFormat        = ContentFormat.DIGEST,
                                Data                 = Convert.ToBase64String(bSecureHashResponse.DigestValue),
                                FileName             = fileName,
                                HashAlgorithm        = (ContentHashAlgorithm)Enum.Parse(typeof(ContentHashAlgorithm), process.DigestMethod.ToString()),
                                SignatureType        = ContentSignatureType.SIGNATURE,
                                ToBeArchived         = false,
                                ConfirmText          = process.FileName,
                                PadesVisualSignature = null
                            }
                        },
                    IsLogin = false,
                    Payer = SignRequestPayer.CLIENT,
                    RelyingPartyCallbackId = Guid.NewGuid().ToString()
                };

                //4. Изпращаме заявката за подписване.
                SendSignResponse signResponse = await _btrustRemoteClient.SendSignRequestUsingPOSTAsync(
                    accept_language: "en"
                    , body: signRequestBody
                    , relyingPartyID: _signModuleOptions.CurrentValue.EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID
                    , rpToClientAuthorization: btrustUserInput.InputType == BtrustUserInputTypes.PROFILE ? clientTokenHeaderValue : btrustUserInput.CreateRpToClientAuthorizationHeder()
                    , cancellationToken: cancellationToken);


                if (signResponse == null || signResponse.Data == null || string.IsNullOrEmpty(signResponse.Data.CallbackId))
                {
                    throw new NotSupportedException("Missing TransactionID from Btrust.");
                }

                //5. Вкарваме подписващия в статус "започнало отдалечено подписване", записваме сесиините му данни 
                //и данните за транзакцията в системата доставчик на отдалечено подписване 
                RemoteSignRequestAdditionalData signRequestAdditionalData = new RemoteSignRequestAdditionalData()
                {
                    TransactionID = signResponse.Data.CallbackId,
                    DigestTime = bSecureHashResponse.DigestTime,
                    UserCert = clientCertResponse.Data.EncodedCert,
                    RelyingPartyCallbackId = signRequestBody.RelyingPartyCallbackId
                };

                OperationResult signerStartSigningResult = await _signingProcessesService.SignerStartRemoteSigningAsync(processID, SignerID, SigningChannels.BtrustRemote, signRequestAdditionalData, cancellationToken);

                return signerStartSigningResult;
            }
            catch (BSecureDSSL.SwaggerException ex1)
            {
                _logger.LogException(ex1);

                if (ex1.StatusCode == 500 && ex1 is BSecureDSSL.SwaggerException<InternalServerErrorResponseDto> genericEx)
                {
                    if (string.Compare(genericEx.Result.Code, "OTHER_ERROR", true) == 0
                        && string.Compare(genericEx.Result.Message, "This certificate is not in its validity period in the moment of signing.", true) == 0)
                    {
                        return new OperationResult("EP_SIGN_EXPIRED_CERTIFICATE_DATE_E ", "EP_SIGN_EXPIRED_CERTIFICATE_DATE_E ");
                    }
                }

                //Грешка при подписване. Моля, свържете се с администратор на Портала на Агенция по вписванията.
                //След отстраняване на проблема, опитайте да подпишете отново.
                return new OperationResult("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            catch (BtrustRemoteClient.SwaggerException ex2)
            {
                _logger.LogException(ex2);

                return new OperationResult(ConvertBtrustRemoteClientExceptionToIError(ex2));
            }
            catch (Exception ex3)
            {
                _logger.LogException(ex3);

                return new OperationResult("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            finally
            {
                if(process != null && process.Content != null)
                {
                    process.Content.Dispose();
                    process.Content = null;
                }
            }
        }

        public async Task<OperationResult<BtrustPullingResult>> TryCompleteRemoteSigning(Guid processID, long SignerID, CancellationToken cancellationToken)
        {
            SigningProcess process = null;

            try
            {
                process = (await _signingProcessesService.SearchAsync(new SigningProcessesSearchCriteria()
                {
                    ProcessID = processID,
                    LoadSigners = true,
                    LoadContent = true
                }, cancellationToken)).SingleOrDefault();

                if (process == null)
                {
                    return new OperationResult<BtrustPullingResult>(OperationResultTypes.SuccessfullyCompleted) { Result = new BtrustPullingResult() { Code = "OK", Status = BtrustDocStatus.SIGNED } };
                }

                Signer currentSigner = process.Signers.Single(s => s.SignerID == SignerID);

                if (currentSigner.Status != SignerSigningStatuses.StartSigning)
                {
                    return new OperationResult<BtrustPullingResult>(OperationResultTypes.SuccessfullyCompleted) { Result = new BtrustPullingResult() { Code = "NOK" } };
                }

                if (process.Signers.Count(s => s.Status == SignerSigningStatuses.StartSigning) > 1 /* Подписва само един другите чакат. */
                    || currentSigner.SigningChannel != SigningChannels.BtrustRemote
                    || currentSigner.SigningAdditionalData == null)
                    return new OperationResult<BtrustPullingResult>(OperationResultTypes.SuccessfullyCompleted) { Result = new BtrustPullingResult() { Code = "NOK" } };

                var additionalData = EPZEUJsonSerializer.Deserialize<RemoteSignRequestAdditionalData>(currentSigner.SigningAdditionalData);
                var signedContentResponse = await _btrustRemoteClient.GetSignedResultUsingGETAsync("en", currentSigner.TransactionID, _signModuleOptions.CurrentValue.EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID);

                if (signedContentResponse.Code.ToUpper() == "COMPLETED")
                {
                    var signedContentData = signedContentResponse.Data.Signatures.ElementAt(0);

                    if (signedContentData.Status == SignatureResponseStatus.RECEIVED
                        || signedContentData.Status == SignatureResponseStatus.SIGNED)
                    {
                        OperationResult signerSignRes = null;
                        //Статус RECEIVED, защото току що сме свалили документа. Статус SIGNED е когато документа е подписан но все още не е свален.
                        using (Stream assembledDoc = await _documentSigningUtilityService.AssembleDocumentWithSignatureAsync(process.ContentType
                                                                                                , process.FileName
                                                                                                , process.Content
                                                                                                , process.DigestMethod.Value.ToString()
                                                                                                , process.Format.Value
                                                                                                , process.Type.Value.ToString()
                                                                                                , process.Level.Value
                                                                                                , additionalData.UserCert
                                                                                                , signedContentData.Signature
                                                                                                , additionalData.DigestTime.Value
                                                                                                , process.Format == SigningFormats.PAdES))
                        {
                            //Това се прави за оптимизация.
                            if (process.Content != null)
                            {
                                process.Content.Dispose();
                                process.Content = null;
                            }

                            signerSignRes = await _signingProcessesService.SignerCompleteRemoteSigningAsync(processID, SignerID, assembledDoc, cancellationToken);
                        }

                        if (signerSignRes.IsSuccessfullyCompleted)
                        {
                            BtrustPullingResult resData = new BtrustPullingResult()
                            {
                                Code = "OK",
                                Status = BtrustDocStatus.SIGNED
                            };

                            return new OperationResult<BtrustPullingResult>(OperationResultTypes.SuccessfullyCompleted) { Result = resData };
                        }
                        else
                        {
                            var signerRejectRes = await _signingProcessesService.SignerRejectRemoteSigningAsync(processID, SignerID, signerSignRes.Errors.ElementAt(0).Message, cancellationToken);

                            if (!signerRejectRes.IsSuccessfullyCompleted)
                                throw new NotSupportedException(signerRejectRes.Errors.ElementAt(0).Message);
                        }
                    }
                    else
                    {
                        string reson = null;
                        switch (signedContentData.Status)
                        {
                            case SignatureResponseStatus.REJECTED:
                                reson = "EP_SIGN_REJECTED_E"; //Подписващият е отказал да подпише документа.
                                break;
                            case SignatureResponseStatus.EXPIRED:
                                reson = "EP_SIGN_BTRUST_EXPIRED_E"; //Документът не е подписан, поради изтичане на определеният за целта срок.
                                break;
                            case SignatureResponseStatus.ERROR:
                            case SignatureResponseStatus.REMOVED:
                                reson = "EP_SIGN_BTRUST_ERROR_E"; //Грешка при подписване e установена от B-Trust. Моля, свържете се с тях за изясняване на проблема или се опитайте да подпишете отново.
                                break;
                            default:
                                reson = "EP_SIGN_FAIL_E";
                                break;
                        }

                        var signerRejectRes = await _signingProcessesService.SignerRejectRemoteSigningAsync(processID, SignerID, reson, cancellationToken);

                        if (signerRejectRes.IsSuccessfullyCompleted)
                        {
                            BtrustPullingResult resData = new BtrustPullingResult()
                            {
                                Code = "OK",
                                Status = BtrustDocStatus.REJECTED,
                                RejectReson = reson
                            };

                            return new OperationResult<BtrustPullingResult>(OperationResultTypes.SuccessfullyCompleted) { Result = resData };
                        }
                    }
                }

                return new OperationResult<BtrustPullingResult>(OperationResultTypes.SuccessfullyCompleted) { Result = new BtrustPullingResult() { Code = "NOK" } };
            }
            catch (BSecureDSSL.SwaggerException ex1)
            {
                _logger.LogException(ex1);
                //Грешка при подписване. Моля, свържете се с администратор на Портала на Агенция по вписванията.
                //След отстраняване на проблема, опитайте да подпишете отново.
                return new OperationResult<BtrustPullingResult>("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            catch (BtrustRemoteClient.SwaggerException ex2)
            {
                _logger.LogException(ex2);

                return new OperationResult<BtrustPullingResult>(ConvertBtrustRemoteClientExceptionToIError(ex2));
            }
            catch (Exception ex3)
            {
                _logger.LogException(ex3);

                //Грешка при подписване. Моля, свържете се с администратор на Портала на Агенция по вписванията.
                //След отстраняване на проблема, опитайте да подпишете отново.
                return new OperationResult<BtrustPullingResult>("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            finally
            {
                if (process != null && process.Content != null)
                {
                    process.Content.Dispose();
                    process.Content = null;
                }
            }
        }

        #endregion

        #endregion

        #region Helpers

        private BissSignRequest generateBissSignRequest(byte[] digestValue, string userBase64Cert, string docConfirmText)
        {
            byte[] signedDigestValueHash = null;
            byte[] digestValueHash = null;
            BissSignRequest resultObj = null;

            #region Подписваме върнатия хеш

            //Локален сертификат, с който се подписва хеша така, че локалното BISS, да е сигурно че хеша не е подменен по време на кумуникацията.
            using (X509Certificate2 cert = _documentSigningUtilityService.GeServerCert())
            {
                //Генерираме Хеш на DigestValue.
                using (var crypt = new SHA256Managed())
                {
                    digestValueHash = crypt.ComputeHash(digestValue);
                }

                using (RSA rsa = cert.GetRSAPrivateKey())
                {
                    signedDigestValueHash = rsa.SignData(digestValueHash, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
                }

                string content = Convert.ToBase64String(digestValue);
                string signedContent = Convert.ToBase64String(signedDigestValueHash);
                string signedContentCert = Convert.ToBase64String(cert.RawData);

                resultObj = new BissSignRequest()
                {
                    Version              = "2.20",
                    SignatureType        = "signature",
                    ContentType          = "digest",
                    HashAlgorithm        = "SHA256",
                    Contents             = new string[]    { content           },
                    SignedContents       = new string[]    { signedContent     },
                    SignedContentsCert   = new string[]    { signedContentCert },
                    SignerCertificateB64 = userBase64Cert,
                    AdditonalConfirmText = docConfirmText,
                    ConfirmText          = new string[]    { "hash"            }
                };
            }

            #endregion

            return resultObj;
        }

        private IErrorCollection ConvertBtrustRemoteClientExceptionToIError(BtrustRemoteClient.SwaggerException ex)
        {
            var errors = new ErrorCollection();

            switch (ex.StatusCode)
            {
                case 206:
                    //Има файлове, чакащи за подпис
                    errors.Add(new TextError("EP_SIGN_BTRUST_ERR_FILESWAITING_I", "EP_SIGN_BTRUST_ERR_FILESWAITING_I"));
                    break;
                case 400:
                    //Изтекъл ауторизационен код или грешен идентификатор.
                    errors.Add(new TextError("EP_SIGN_INVLD_BTRUST_INPT_PARAM_E", "EP_SIGN_INVLD_BTRUST_INPT_PARAM_E"));
                    break;
                case 401:
                    //Неразрешен достъп.
                    errors.Add(new TextError("EP_SIGN_INVLD_BTRUST_INPT_PARAM_E", "EP_SIGN_INVLD_BTRUST_INPT_PARAM_E"));
                    break;
                case 404:
                    //Сертификатът не е намерен
                    errors.Add(new TextError("EP_SIGN_MISSING_CUSTMR_BTRUST_E", "EP_SIGN_MISSING_CUSTMR_BTRUST_E"));
                    break;
                default:
                    errors.Add(new TextError("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E"));
                    break;
            }

            return errors;
        }

        private async Task<OperationResult<BissSignRequestExtended>> CreateBissSignRequestInternal(SigningProcess process, string Base64SigningCert)
        {
            try
            {
                DigestResponseDto digestResponseDto = await _documentSigningUtilityService.CreateDocumentHashAsync(
                    process.ContentType
                    , process.FileName
                    , process.Content
                    , process.DigestMethod.Value.ToString()
                    , process.Format.Value
                    , process.Type.Value.ToString()
                    , process.Level.Value
                    , Base64SigningCert
                    , process.Format == SigningFormats.PAdES);

                BissSignRequest bissSignRequest = generateBissSignRequest(digestResponseDto.DigestValue, Base64SigningCert, process.FileName);

                OperationResult<BissSignRequestExtended> result = new OperationResult<BissSignRequestExtended>(OperationResultTypes.SuccessfullyCompleted)
                {
                    Result = new BissSignRequestExtended()
                    {
                        SignRequest      = bissSignRequest,
                        DocumentHashTime = digestResponseDto.DigestTime == null ? new long[] { } : new long[] { digestResponseDto.DigestTime.Value }
                    }
                };

                return result;
            }
            catch (BSecureDSSL.SwaggerException ex1)
            {
                _logger.LogException(ex1);

                if (ex1.StatusCode == 500 && ex1 is BSecureDSSL.SwaggerException<InternalServerErrorResponseDto> genericEx)
                {
                    if (string.Compare(genericEx.Result.Code, "OTHER_ERROR", true) == 0
                        && string.Compare(genericEx.Result.Message, "This certificate is not in its validity period in the moment of signing.", true) == 0)
                    {
                        return new OperationResult<BissSignRequestExtended>("EP_SIGN_EXPIRED_CERTIFICATE_DATE_E ", "EP_SIGN_EXPIRED_CERTIFICATE_DATE_E ");
                    }
                }

                //Грешка при подписване. Моля, свържете се с администратор на Портала на Агенция по вписванията.
                //След отстраняване на проблема, опитайте да подпишете отново.
                return new OperationResult<BissSignRequestExtended>("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                //Грешка при подписване. Моля, свържете се с администратор на Портала на Агенция по вписванията.
                //След отстраняване на проблема, опитайте да подпишете отново.
                return new OperationResult<BissSignRequestExtended>("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
        }

        private async Task<OperationResult<ClientCertResponse>> CheckAndGetUserCert(string identifier)
        {
            try
            {
                var clientCertResponse = await _btrustRemoteClient.GetCertByPersonalIdUsingGETAsync(
                    "en"
                    , identifier
                    , _signModuleOptions.CurrentValue.EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID);

                return new OperationResult<ClientCertResponse>(OperationResultTypes.SuccessfullyCompleted) { Result = clientCertResponse };
            }
            catch (BtrustRemoteClient.SwaggerException ex)
            {
                _logger.LogException(ex);

                var errCollection = ConvertBtrustRemoteClientExceptionToIError(ex);

                return new OperationResult<ClientCertResponse>(errCollection);
            }
        }

        #endregion
    }
}
