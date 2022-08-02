using EPZEU.Web.IdentityServer.Common;
using EPZEU.Web.IdentityServer.Models;
using Microsoft.Extensions.Hosting;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;

namespace EPZEU.Web.IdentityServer.Controllers
{
    /// <summary>
    /// Начален контролер на приложението.
    /// </summary>
    public class HomeController : Controller
    {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IStringLocalizer Localizer;

        public HomeController(IStringLocalizer localizer, IIdentityServerInteractionService interaction)
        {
            Localizer = localizer;
            _interaction = interaction;
        }

        /// <summary>
        /// Операция за зареждане на начална страница.
        /// </summary>
        /// <returns>Начална страница.</returns>
        public IActionResult Index([FromServices] IWebHostEnvironment environment)
        {
            if (environment.IsDevelopmentLocal())
            {
                return View();
            }

            return NotFound();
        }

        /// <summary>
        /// Операция за зареждане на страница за грешка.
        /// </summary>
        /// <param name="errorId">Идентификатор на грешка.</param>
        /// <returns>Страница за грешка.</returns>
        public async Task<IActionResult> Error(string errorId)
        {
            ErrorViewModel model = null;
            await _interaction.GetErrorContextAsync(errorId).ContinueWith(r => {
                model = new ErrorViewModel() { Error = r.Result };
            });
            return View("Error", model);
        }

        /// <summary>
        /// Операция за зареждане на страница за грешка от приложението.
        /// </summary>
        /// <returns>Страница за грешка.</returns>
        public IActionResult AppError()
        {
            ErrorViewModel model = null;
            var exceptionHandlerPathFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            if (exceptionHandlerPathFeature.Error is AppException)
            {
                string error = ((AppException)exceptionHandlerPathFeature.Error).Message;
                model = new ErrorViewModel() { Error = new IdentityServer4.Models.ErrorMessage() { Error = error } };
            }
            
            return View("Error", model);
        }

        /// <summary>
        /// Операция за зареждане на страница за грешка по даден код на статус.
        /// </summary>
        /// <param name="statusCode">Код на статус.</param>
        /// <returns>Страница за грешка.</returns>
        [Route("/Home/ErrorStatusCodePage/{statusCode}")]
        public IActionResult ErrorStatusCodePage(string statusCode)
        {
            ErrorViewModel model = null;

            model = new ErrorViewModel();
            model.Error = new IdentityServer4.Models.ErrorMessage();

            if (statusCode == "401")
            {
                model.Error.Error = Localizer["GL_NO_RESOURCE_ACCESS_E"].Value;
            }
            else
                model.Error.Error = statusCode;

            return View("Error", model);

        }
    }
}
