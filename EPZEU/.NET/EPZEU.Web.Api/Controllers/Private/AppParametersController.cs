using EPZEU.Common.Cache;
using EPZEU.Web.Mvc;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers.Private
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа с конфигурационни параметри.
    /// </summary>
    [ResponseCache(CacheProfileName = "Nomenclaturs")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status304NotModified)]
    [ApiParameter(Name = "If-None-Match", Type = typeof(string), Source = "header")]
    public class AppParametersController : BaseApiController
    {

        /// <summary>
        /// Операция за изчитане на конфигурационните параметри от базата данни.
        /// </summary>
        /// <param name="appParameters">Интерфейс за работа конфигурационните параметри.</param>
        /// <returns>Конфигурационните параметри.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Common.Models.AppParameter>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromServices]IAppParameters appParameters)
        {
            await appParameters.EnsureLoadedAsync(CancellationToken.None);

            IEnumerable<Common.Models.AppParameter> data = appParameters.GetAppParameters(out DateTime? lastModifiedDate);

            return new ObjectResultWithETag(data, lastModifiedDate.Value.FormatForETag());
        }
    }
}