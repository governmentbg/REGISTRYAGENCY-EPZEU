using CNSys;
using CNSys.Data;
using EPZEU.Common;
using EPZEU.Signing.BSecureDSSL;
using EPZEU.Signing.Configuration;
using EPZEU.Signing.Evrotrust;
using EPZEU.Signing.Helpers;
using EPZEU.Signing.Models;
using EPZEU.Signing.Models.SearchCriteria;
using EPZEU.Signing.ReMessageHandlers;
using EPZEU.Utilities;
using ICSharpCode.SharpZipLib.Zip;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing
{
    public interface IEvrotrustProcessorService
    {
        Task<OperationResult> CreateRemoteSignRequestAsync(Guid processID, long SignerID, UserIdentifyData userInfo, CancellationToken cancellationToken);

        Task AcceptRemoteCallbackNotificationAsync(string TransactionID, int? status, CancellationToken cancellationToken);

        Task ProcessRemoteCallbackNotificationAsync(string TransactionID, int? status, CancellationToken cancellationToken);
    }

    internal class EvrotrustProcessorService : IEvrotrustProcessorService
    {
        #region private members

        private readonly string _vendorNumber = null;
        private readonly string _apiKey = null;
        private readonly string _basCallbackUrl = null;
        private readonly ISigningProcessesService _signingProcessesService = null;
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;
        private readonly IEvrotrustClient _evrotrustClient = null;
        private readonly IActionDispatcher _actionDispatcher;
        private readonly ILogger _logger;
        private readonly IDocumentSigningtUtilityService _documentSigningUtilityService;

        #endregion

        #region Constructor

        public EvrotrustProcessorService(ISigningProcessesService signingProcessesService
            , IDbContextOperationExecutor dbContextOperationExecutor
            , IEvrotrustClient evrotrustClient
            , IActionDispatcher actionDispatcher
            , ILogger<EvrotrustProcessorService> logger
            , IOptionsMonitor<SignModuleGlobalOptions> signModuleOptions
            , IDocumentSigningtUtilityService documentSigningUtilityService)
        {
            _signingProcessesService = signingProcessesService;
            _dbContextOperationExecutor = dbContextOperationExecutor;
            _evrotrustClient = evrotrustClient;
            _actionDispatcher = actionDispatcher;
            _logger = logger;
            _documentSigningUtilityService = documentSigningUtilityService;

            _vendorNumber = signModuleOptions.CurrentValue.EP_SIGN_EVROTRUST_VENDOR_NUM;
            _apiKey = signModuleOptions.CurrentValue.EP_SIGN_EVROTRUST_VENDOR_API_KEY;
            _basCallbackUrl = signModuleOptions.CurrentValue.EP_SIGN_EVROTRUST_CALLBACK_BASE_URL;
        }

        #endregion

        public async Task<OperationResult> CreateRemoteSignRequestAsync(Guid processID, long SignerID, UserIdentifyData userInfo, CancellationToken cancellationToken)
        {
            try
            {
                //1. Проверка на потребителя
                OperationResult checkUserRes = await CheckUser(userInfo);

                if (!checkUserRes.IsSuccessfullyCompleted)
                {
                    return new OperationResult(checkUserRes.Errors);
                }

                //2. Взимаме сертификата на потребителя
                ResultGetUserCertificate certData = await GetUserCert(userInfo);

                //3. Създава и изпраща заявка за подписване
                RemoteSignRequestAdditionalData signRequestAdditionalData = await CreateSignRequest(processID, userInfo, certData, cancellationToken);

                //4. Вкарваме подписващия в статус "започнало отдалечено подписване", записваме сесиините му данни 
                //и данните за транзакцията в системата доставчик на отдалечено подписване 
                OperationResult signerStartSigningResult = await _signingProcessesService.SignerStartRemoteSigningAsync(processID, SignerID, SigningChannels.EvrotrustRemote, signRequestAdditionalData, cancellationToken);

                return signerStartSigningResult;
            }
            catch (BSecureDSSL.SwaggerException btrustEx)
            {
                _logger.LogException(btrustEx);

                return new OperationResult<object>("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
            catch (Evrotrust.SwaggerException evrotrustEx)
            {
                _logger.LogException(evrotrustEx);

                return new OperationResult<object>(ConvertEvrotrustExceptionToIError(evrotrustEx));
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                return new OperationResult<object>("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E");
            }
        }

        public async Task AcceptRemoteCallbackNotificationAsync(string TransactionID, int? status, CancellationToken cancellationToken)
        {
            _logger.LogInformation(string.Format("Evrotrust notification for Transaction: {0}, and status: {1}", TransactionID, status.HasValue ? status.Value.ToString() : ""));

            SigningProcess process = await _signingProcessesService.GetSigningProcessByChannelAndTransactionID(SigningChannels.EvrotrustRemote, TransactionID, cancellationToken, false);

            //Това служи само за бързодействие на кода.
            if (process == null)
            {
                return;
            }

            await _actionDispatcher.SendAsync(new EvrotrustProcessCallbackNotificationMessage() { TransactionID = TransactionID, Status = status });
        }

        public async Task ProcessRemoteCallbackNotificationAsync(string TransactionID, int? status, CancellationToken cancellationToken)
        {
            SigningProcess process = null;
            try
            {
                process = await _signingProcessesService.GetSigningProcessByChannelAndTransactionID(SigningChannels.EvrotrustRemote, TransactionID, cancellationToken, true);
                Signer currSigner = process?.Signers.Single(s => s.TransactionID != null && s.TransactionID == TransactionID);

                /*Това служи само за бързодействие на кода. В следващите методи има заключване и бизнес проверки !*/
                if (process == null || currSigner == null || process.Status == SigningRequestStatuses.Completing || process.Status == SigningRequestStatuses.Rejecting)
                    return;

                //status: 1 - Pending, 2 - Signed, 3 - Rejected, 4 - Expired, 5 - Canceled, 99 - On hold

                if (status == 2)
                {
                    if (process.Format == SigningFormats.PAdES)
                    {
                        await ProcessSignedPdfDocumentAsync(process, currSigner, cancellationToken);

                    }
                    else
                    {
                        await ProcessSignedDocumentByHashAsync(process, currSigner, cancellationToken);
                    }
                }
                else if (status == 3 || status == 4 || status == 5)
                {
                    //TODO:Да се направят ресурси след като се оточни с Evrotrust статусите + 99 - On hold
                    string reson = status == 3 ? "EP_SIGN_REJECTED_E" : status == 4 ? "EP_SIGN_BTRUST_EXPIRED_E" : "Отменено от Evrotrust.";
                    var res = await _signingProcessesService.SignerRejectRemoteSigningAsync(process.ProcessID.Value, currSigner.SignerID.Value, reson, cancellationToken);

                    if (res.IsSuccessfullyCompleted)
                        return;
                    else
                        throw new Exception("Exception in SignerRejectSigning method.");
                }
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

        #region Helper

        private IErrorCollection ConvertEvrotrustExceptionToIError(Evrotrust.SwaggerException ex)
        {
            var errors = new ErrorCollection();

            switch (ex.StatusCode)
            {
                case 438:
                    //Потребителя не е намерен
                    errors.Add(new TextError("EP_SIGN_MISSING_CUSTMR_EVROTRUST_E", "EP_SIGN_MISSING_CUSTMR_EVROTRUST_E"));
                    break;
                case 442:
                    //Сертификатът не е намерен
                    errors.Add(new TextError("EP_SIGN_MISSING_CERT_EVROTRUST_E", "EP_SIGN_MISSING_CERT_EVROTRUST_E"));
                    break;
                case 450:
                    //Превишен е допустимия размер на файл за подписване.
                    errors.Add(new TextError("EP_SIGN_SIZEOFFILE_LIMIT_EXCEEDED_E", "EP_SIGN_SIZEOFFILE_LIMIT_EXCEEDED_E"));
                    break;
                default:
                    errors.Add(new TextError("EP_SIGN_FAIL_E", "EP_SIGN_FAIL_E"));
                    break;
            }

            return errors;
        }

        private async Task<OperationResult> CheckUser(UserIdentifyData userInfo)
        {
            try
            {
                DataCheckUserInfo requestCheckUser = new DataCheckUserInfo()
                {
                    User = userInfo,
                    VendorNumber = _vendorNumber
                };
                string authorization = EvrotrustApiHelper.GetAuthorizationHeader(_apiKey, requestCheckUser.ToJson());
                await _evrotrustClient.CheckUserVendorAsync(authorization, requestCheckUser);

                return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
            }
            catch (Evrotrust.SwaggerException evrotrustEx)
            {
                _logger.LogException(evrotrustEx);

                string errCode = null;
                switch (evrotrustEx.StatusCode)
                {
                    case 400:
                    case 438:
                        errCode = "EP_SIGN_MISSING_CUSTMR_EVROTRUST_E";
                        break;
                    default:
                        errCode = "EP_SIGN_FAIL_E";
                        break;
                }

                return new OperationResult(errCode, errCode);
            }
        }

        private async Task<ResultGetUserCertificate> GetUserCert(UserIdentifyData userInfo)
        {
            DataUserCertificate requestData = new DataUserCertificate()
            {
                VendorNumber = _vendorNumber,
                User = userInfo,
                Certificate = new DataFilterGetCertificate()
                {
                    Coverage = 20000,
                    IsPidIncluded = false,
                    Type = 1
                }
            };
            string authorization = EvrotrustApiHelper.GetAuthorizationHeader(_apiKey, requestData.ToJson());

            return await _evrotrustClient.UserVendorCertificateAsync(authorization, requestData);
        }

        private async Task<RemoteSignRequestAdditionalData> CreateSignRequest(Guid processID, UserIdentifyData userInfo, ResultGetUserCertificate certData, CancellationToken cancellationToken)
        {
            SigningProcess process = null;
            try
            {
                EvrotrustCryptoUtils.RSAKeys.GenerateRSAToPem(2048, out string privateRsaKeyXml, out string publicRsaKey);
                process = (await _signingProcessesService.SearchAsync(new SigningProcessesSearchCriteria()
                {
                    ProcessID = processID,
                    LoadContent = true
                }, cancellationToken)).SingleOrDefault();

                if (process.Format == SigningFormats.PAdES)
                {
                    ResultDocumentTransaction signRequestResult = null;
                    using(process.Content)
                    using (var ms = new MemoryStream())
                    {
                        process.Content.CopyTo(ms);
                        process.Content.Dispose(); //За оптимизация.

                        ms.Position = 0;
                        string docHashInHex = null;

                        #region Изчислява хеш на PDF файла за подписване

                        byte[] docHash = null;

                        using (var crypt = new SHA512Managed())
                        {
                            docHash = crypt.ComputeHash(ms);
                        }

                        docHashInHex = EvrotrustConvUtils.BytesToHex(docHash);

                        #endregion

                        ms.Position = 0;

                        Evrotrust.FileParameter signFileData = new Evrotrust.FileParameter(ms, "document.pdf", process.ContentType);

                        var dataToCalcAuthorization = new
                        {
                            document = new
                            {
                                description = TransliterationHelper.Transliterate(process.FileName),
                                dateExpire = EvrotrustApiHelper.UnixTime(DateTime.Now.AddDays(3)),
                                coverage = 20000,
                                preview = 1,
                                checksumDocument = docHashInHex
                            },
                            signInfo = new
                            {
                                type = "PDF2",//Так го очакват.
                                algorithm = process.DigestMethod.Value.ToString()
                            },
                            urlCallback = _basCallbackUrl,
                            vendorNumber = _vendorNumber,
                            publicKey = publicRsaKey,
                            users = new List<object>(1) { userInfo }
                        };

                        string jsonToCalcAuthorization = EPZEUJsonSerializer.Serialize(dataToCalcAuthorization);
                        string authorization = EvrotrustApiHelper.GetAuthorizationHeader(_apiKey, jsonToCalcAuthorization);
                        signRequestResult = await _evrotrustClient.AddDocumentDocAsync(authorization, signFileData, jsonToCalcAuthorization);
                    }
                    if (signRequestResult == null
                        ||
                        (string.IsNullOrEmpty(signRequestResult.TransactionID)
                            && (signRequestResult.Transactions == null || signRequestResult.Transactions.Count() != 1 || string.IsNullOrEmpty(signRequestResult.Transactions.ElementAt(0).TransactionID))))
                    {
                        throw new NotSupportedException("Missing TransactionID from Evrotrust.");
                    }

                    if (string.IsNullOrEmpty(signRequestResult.TransactionID))
                    {
                        signRequestResult.TransactionID = signRequestResult.Transactions.ElementAt(0).TransactionID;
                    }

                    return new RemoteSignRequestAdditionalData() { TransactionID = signRequestResult.TransactionID, UserCert = certData.Certificate, RsaKeyForDecryption = privateRsaKeyXml };
                }
                else
                {
                    DigestResponseDto docHashResult = null;
                    using (process.Content)
                    {
                        docHashResult = await _documentSigningUtilityService.CreateDocumentHashAsync(process.ContentType
                                                                                        , process.FileName
                                                                                        , process.Content
                                                                                        , process.DigestMethod.Value.ToString()
                                                                                        , process.Format.Value
                                                                                        , process.Type.Value.ToString()
                                                                                        , process.Level.Value
                                                                                        , certData.Certificate
                                                                                        , process.Format == SigningFormats.PAdES);
                    }

                    DataDocument signRequestData = new DataDocument()
                    {
                        Document = new Document()
                        {
                            Hash = EvrotrustCryptoUtils.GetSha256ToB64(Encoding.UTF8.GetString(docHashResult.DigestValue)),
                            Description = TransliterationHelper.Transliterate(process.FileName),
                            DateExpire = (int)EvrotrustApiHelper.UnixTime(DateTime.Now.AddDays(1))
                        },
                        SignInfo = new SignInfoHash()
                        {
                            Algorithm = process.DigestMethod.ToString()
                        },
                        UrlCallback = _basCallbackUrl,
                        PublicKey = publicRsaKey,
                        CertificateSerialNumber = certData.SerialNumber,
                        VendorNumber = _vendorNumber,
                        User = userInfo
                    };

                    string authorization = EvrotrustApiHelper.GetAuthorizationHeader(_apiKey, signRequestData.ToJson());
                    ResultDocument responseToSignRequest = await _evrotrustClient.AddDocumentHashAsync(authorization, signRequestData);

                    return new RemoteSignRequestAdditionalData() { TransactionID = responseToSignRequest.TransactionID, UserCert = certData.Certificate, DigestTime = docHashResult.DigestTime, RsaKeyForDecryption = privateRsaKeyXml };
                }
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

        private async Task ProcessSignedDocumentByHashAsync(SigningProcess process, Signer Signer, CancellationToken cancellationToken)
        {
            try
            {
                string hashSignBase64 = Convert.ToBase64String(await DownloadSignedDataFromEvrotrust(Signer));
                SignerAdditionalData signerAdditionalData = EPZEUJsonSerializer.Deserialize<SignerAdditionalData>(Signer.SigningAdditionalData);
                OperationResult operationResult = null;
                using (Stream assembledDoc = await _documentSigningUtilityService.AssembleDocumentWithSignatureAsync(process.ContentType
                                                                                                    , process.FileName
                                                                                                    , process.Content
                                                                                                    , process.DigestMethod.Value.ToString()
                                                                                                    , process.Format.Value
                                                                                                    , process.Type.Value.ToString()
                                                                                                    , process.Level.Value
                                                                                                    , signerAdditionalData.UserCert
                                                                                                    , hashSignBase64
                                                                                                    , signerAdditionalData.DigestTime.Value
                                                                                                    , process.Format == SigningFormats.PAdES))
                {
                    //Това се прави за оптимизация.
                    if (process.Content != null)
                    {
                        process.Content.Dispose();
                        process.Content = null;
                    }

                    operationResult = await _signingProcessesService.SignerCompleteRemoteSigningAsync(process.ProcessID.Value, Signer.SignerID.Value, assembledDoc, cancellationToken);
                }

                if (!operationResult.IsSuccessfullyCompleted)
                {
                    //Това е случай който не би трябвало да се случи.
                    operationResult = await _signingProcessesService.SignerRejectRemoteSigningAsync(process.ProcessID.Value, Signer.SignerID.Value, operationResult.Errors.ElementAt(0).Message, cancellationToken);
                }

                if (!operationResult.IsSuccessfullyCompleted)
                    throw new NotSupportedException(operationResult.Errors.ElementAt(0).Message);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                throw;
            }
        }

        private async Task ProcessSignedPdfDocumentAsync(SigningProcess process, Signer Signer, CancellationToken cancellationToken)
        {
            try
            {
                byte[] signDataBytes = await DownloadSignedDataFromEvrotrust(Signer, true);
                OperationResult operationResult = null;

                using (MemoryStream ms = new MemoryStream(signDataBytes))
                {
                    operationResult = await _signingProcessesService.SignerCompleteRemoteSigningAsync(process.ProcessID.Value, Signer.SignerID.Value, ms, cancellationToken);
                }

                if (!operationResult.IsSuccessfullyCompleted)
                {
                    //Това е случай който не би трябвало да се случи.
                    operationResult = await _signingProcessesService.SignerRejectRemoteSigningAsync(process.ProcessID.Value, Signer.SignerID.Value, operationResult.Errors.ElementAt(0).Message, cancellationToken);
                }

                if (!operationResult.IsSuccessfullyCompleted)
                    throw new NotSupportedException(operationResult.Errors.ElementAt(0).Message);
            }
            catch (Exception ex)
            {
                _logger.LogException(ex);

                throw;
            }
        }

        private async Task<byte[]> DownloadSignedDataFromEvrotrust(Signer Signer, bool isPdf = false)
        {
            byte[] signedData = null;
            byte[] decryptedKey = null;
            byte[] iv = null;
            SignerAdditionalData signerAdditionalData = EPZEUJsonSerializer.Deserialize<SignerAdditionalData>(Signer.SigningAdditionalData);
            DataDocumentDownload dataDocumentDownload = new DataDocumentDownload()
            {
                TransactionID = Signer.TransactionID,
                VendorNumber = _vendorNumber
            };

            string authorization = EvrotrustApiHelper.GetAuthorizationHeader(_apiKey, dataDocumentDownload.ToJson());

            using (FileResponse fileResponse = await _evrotrustClient.DocumentDownloadAsync(authorization, dataDocumentDownload))
            using (MemoryStream msTmp = new MemoryStream())
            {
                fileResponse.Stream.CopyTo(msTmp);

                using (ZipFile zipFile = new ZipFile(msTmp))
                {
                    foreach (ZipEntry entry in zipFile)
                    {
                        if (entry.IsFile)
                        {
                            if (entry.Name.EndsWith("filename"))
                                continue;

                            using (Stream entryStream = zipFile.GetInputStream(entry))
                            using (MemoryStream ms = new MemoryStream())
                            {
                                entryStream.CopyTo(ms);

                                if (entry.Name.EndsWith("enc"))
                                {
                                    signedData = ms.ToArray();
                                }
                                else if (entry.Name.EndsWith("iv"))
                                {
                                    iv = ms.ToArray();
                                }
                                else if (entry.Name.EndsWith("key"))
                                {
                                    string key = Encoding.UTF8.GetString(ms.ToArray());
                                    byte[] keyBytes = Convert.FromBase64String(key);
                                    decryptedKey = EvrotrustCryptoUtils.Pkcs1Decrypt(keyBytes, signerAdditionalData.RsaKeyForDecryption, 2048);
                                }
                            }
                        }
                    }
                }
            }


            byte[] decryptedSignData = null;

            using (MemoryStream msTmp = new MemoryStream())
            {
                int chunckSize = 7296; //Размер на буфера, какъвто Evrotrust са дали в примера си.

                if (signedData.Length >= chunckSize)
                {
                    int offset = 0;
                    byte[] tmpBuffer = null;
                    try
                    {
                        tmpBuffer = ArrayPool<byte>.Shared.Rent(chunckSize);

                        while (offset != signedData.Length)
                        {
                            string base64 = null;
                            int remainingBytes = signedData.Length - offset;

                            if (remainingBytes >= chunckSize)
                            {
                                Buffer.BlockCopy(signedData, offset, tmpBuffer, 0, chunckSize);
                                base64 = Encoding.UTF8.GetString(tmpBuffer, 0, chunckSize);
                                offset += chunckSize;
                            }
                            else
                            {
                                Buffer.BlockCopy(signedData, offset, tmpBuffer, 0, remainingBytes);
                                base64 = Encoding.UTF8.GetString(tmpBuffer, 0, remainingBytes);
                                offset += remainingBytes;
                            }

                            string decodedBase64 = EvrotrustCryptoUtils.RijndaelDecrypt(base64, decryptedKey, iv);
                            byte[] decryptedChunck = Convert.FromBase64String(decodedBase64);

                            msTmp.Write(decryptedChunck, 0, decryptedChunck.Length);
                        }
                    }
                    finally
                    {
                        if (tmpBuffer != null)
                            ArrayPool<byte>.Shared.Return(tmpBuffer);
                    }
                }
                else
                {
                    string base64 = Encoding.UTF8.GetString(signedData);
                    string decodedBase64 = EvrotrustCryptoUtils.RijndaelDecrypt(base64, decryptedKey, iv);
                    byte[] decryptedChunck = Convert.FromBase64String(decodedBase64);

                    msTmp.Write(decryptedChunck, 0, decryptedChunck.Length);
                }

                if (msTmp.Position != 0)
                {
                    msTmp.Position = 0;
                }

                using (ZipFile zipFile = new ZipFile(msTmp))
                {
                    foreach (ZipEntry entry in zipFile)
                    {
                        if (entry.IsFile)
                        {
                            if (!isPdf || (isPdf && entry.Name.EndsWith(".pdf")))
                            {
                                using (Stream entryStream = zipFile.GetInputStream(entry))
                                using (MemoryStream ms = new MemoryStream())
                                {
                                    entryStream.CopyTo(ms);
                                    decryptedSignData = ms.ToArray();
                                }
                                break;
                            }
                        }
                    }
                }
            }

            return decryptedSignData;
        }

        #endregion
    }
}
