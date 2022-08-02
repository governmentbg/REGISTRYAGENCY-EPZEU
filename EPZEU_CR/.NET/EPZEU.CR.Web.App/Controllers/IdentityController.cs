using EPZEU.Common;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на потребителските профили.
    /// </summary>
    [NoopServiceLimiter]
    public class IdentityController : Controller
    {
        /// <summary>
        /// Операция за зареждане на страницата за влизане в профила.
        /// </summary>
        /// <returns></returns>
        public IActionResult SignIn()
        {
            return View();
        }

        /// <summary>
        /// Операция за зареждане на страницата за подновяване на потребителския тоукън.
        /// </summary>
        /// <returns></returns>
        public IActionResult Renew()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="iss">iss.</param>
        /// <param name="sid">sid.</param>
        /// <param name="logger">Логер.</param>
        /// <param name="options">Глобални параметрии.</param>
        /// <returns></returns>
        public IActionResult FrontChannelLogout(string iss, string sid, 
            [FromServices] ILogger<IdentityController> logger, [FromServices] IOptions<GlobalOptions> options)
        {
            logger.LogInformation($"Called FrontChannelLogout iis {iss} sid {sid}");

            if (string.Compare(iss, options.Value.GL_IDSRV_URL, System.StringComparison.OrdinalIgnoreCase) != 0)
                return BadRequest();

            return View();
        }
    }
}
