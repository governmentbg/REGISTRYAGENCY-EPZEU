using CNSys;
using CNSys.Data;
using EPZEU.Signing.Models;
using EPZEU.Signing.Models.SearchCriteria;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing
{
    public interface ITestSignService
    {
        Task<OperationResult> TestSignAsync(Guid processID, CancellationToken cancellationToken);
    }

    internal class TestSignService : ITestSignService
    {
        #region Members

        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;
        private readonly ISigningProcessesService _signingProcessesService;
        private readonly IDocumentSigningtUtilityService _docSigningUtilityService;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        #endregion

        #region Constructor

        public TestSignService(
            IDbContextOperationExecutor dbContextOperationExecutor
            , ISigningProcessesService signingProcessesService
            , IDocumentSigningtUtilityService docSigningUtilityService
            , IConfiguration configuration
            , ILogger<TestSignService> logger)
        {
            _dbContextOperationExecutor = dbContextOperationExecutor;
            _signingProcessesService = signingProcessesService;
            _docSigningUtilityService = docSigningUtilityService;
            _configuration = configuration;
            _logger = logger;
        }

        #endregion

        public async Task<OperationResult> TestSignAsync(Guid processID, CancellationToken cancellationToken)
        {
            if (_configuration.GetEPZEUSection().GetValue<int>("EP_SIGN_ALLOW_TEST_SIGN") == 0)
                throw new NotSupportedException("Method not allowed.");

            SigningProcess process = null;

            try
            {
                process = (await _signingProcessesService.SearchAsync(new SigningProcessesSearchCriteria()
                {
                    ProcessID = processID,
                    LoadSigners = true,
                    LoadContent = true
                }, cancellationToken)).SingleOrDefault();

                if (process == null || process.Content == null || process.Signers == null)
                {
                    return new OperationResult("GL_NO_DATA_FOUND_L", "GL_NO_DATA_FOUND_L");
                }

                if (process.Signers.Count > 1)
                {
                    return new OperationResult("Тестовото подписване работи само с един подписващ", "Тестовото подписване работи само с един подписващ");
                }

                using (MemoryStream bufferingContent = new MemoryStream())
                {
                    using (process.Content)
                    {
                        process.Content.CopyTo(bufferingContent);
                    }

                    bufferingContent.Position = 0;

                    using (Stream signedContent = await _docSigningUtilityService.SignAsync(
                            process.ContentType
                            , process.FileName
                            , bufferingContent
                            , process.DigestMethod.ToString()
                            , process.Format.Value
                            , process.Type.Value.ToString()
                            , process.Level.Value
                            , _docSigningUtilityService.GeServerCert()
                            , process.Format == SigningFormats.PAdES))
                    {
                        OperationResult signResult = await _signingProcessesService.SignerSignedLocalAsync(processID, process.Signers[0].SignerID.Value, signedContent, cancellationToken);

                        return signResult;
                    }
                }
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
                }
            }
        }
    }
}
