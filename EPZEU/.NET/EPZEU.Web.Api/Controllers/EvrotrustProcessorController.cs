using CNSys;
using EPZEU.Signing;
using EPZEU.Signing.Evrotrust;
using EPZEU.Web.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers
{
    [Produces("application/json")]
    public class EvrotrustProcessorController : BaseApiController
    {
        #region Private members

        private IEvrotrustProcessorService _evrotrustProcessorService = null;
        private readonly ILogger _logger;

        #endregion

        #region Constructor

        public EvrotrustProcessorController(IEvrotrustProcessorService evrotrustProcessorService, ILogger<EvrotrustProcessorController> logger)
        {
            _evrotrustProcessorService = evrotrustProcessorService;
            _logger = logger;
        }

        #endregion

        /// <summary>
        /// Операцията създава заявка за подписване към Evrotrust.
        /// </summary>
        /// <param name="evrotrustSignRequest">Данни за заявката.</param>
        /// <param name="cancellationToken">Токен по отказване.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("CreateSignRequest")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateSignRequest([FromBody]EvrotrustSignRequest evrotrustSignRequest, CancellationToken cancellationToken)
        {
            UserIdentifyData userInfo = new UserIdentifyData()
            {
                IdentificationNumber = evrotrustSignRequest.IdentType.Value == EvrotrustUserIdentTypes.Ident ? evrotrustSignRequest.UserIdent : null,
                Email = evrotrustSignRequest.IdentType.Value == EvrotrustUserIdentTypes.Email ? evrotrustSignRequest.UserIdent : null,
                Phone = evrotrustSignRequest.IdentType.Value == EvrotrustUserIdentTypes.Phone ? evrotrustSignRequest.UserIdent : null
            };

            var result = await _evrotrustProcessorService.CreateRemoteSignRequestAsync(evrotrustSignRequest.ProcessID.Value, evrotrustSignRequest.SignerID.Value, userInfo, cancellationToken);

            return OperationResult(result);
        }
    }
}
