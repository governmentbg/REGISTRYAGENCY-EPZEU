using EPZEU.CMS;
using EPZEU.CMS.Models;
using EPZEU.Common;
using EPZEU.Nomenclatures.Models;
using EPZEU.Web.Mvc;
using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Web.Api.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа с CMS.
    /// </summary>
    [Produces("application/json")]
    [ResponseCache(CacheProfileName = "Nomenclaturs")]
    [ApiParameter(Name = "If-None-Match", Type = typeof(string), Source = "header")]
    [ProducesResponseType(StatusCodes.Status304NotModified)]
    public class CMSController : BaseApiController
    {
        /// <summary>
        /// Операция за изчитане на CMS страници.
        /// </summary>
        /// <param name="lang">Език за локализация.</param>
        /// <param name="register">Регистър - 1 = Търговски Регистър.; 2 = Имотен Регистър</param>
        /// <param name="pages">Интерфейс за работа със CMS страници</param>
        /// <returns>CMS Страници.</returns>
        [HttpGet]
        [Route("pages/{lang}")]
        [ProducesResponseType(typeof(IEnumerable<Page>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPages(string lang, [FromQuery]Registers? register, [FromServices] IPages pages)
        {
            await pages.EnsureLoadedAsync(lang);
            var cachedPages = pages.GetPages(lang, out DateTime? lastModifiedDate);

            object result = null;

            if (register.HasValue)
            {
                result = cachedPages.Where(item => item.RegisterID == register);
            }
            else
            {
                result = cachedPages;
            }

            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(result, lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на статични страници.
        /// </summary>
        /// <param name="module">Модули: 1 = EPZEU.; 2 = EPZEU Търговски регистър.; 3 = EPZEU Имотен регистър.</param>
        /// <param name="staticPages">Интерфейс за работа със статични страници</param>
        /// <returns>статични страници.</returns>
        [HttpGet]
        [Route("staticPages")]
        [ProducesResponseType(typeof(IEnumerable<StaticPage>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStaticPages([FromQuery]Modules? module, [FromServices] IStaticPages staticPages)
        {
            await staticPages.EnsureLoadedAsync(CancellationToken.None);
            var cachedStaticPages = staticPages.GetStaticPages(out DateTime? lastModifiedDate);

            object result = null;

            if (module.HasValue)
            {
                result = cachedStaticPages.Where(item => item.ModuleID == module);
            }
            else
            {
                result = cachedStaticPages;
            }

            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(result, lastModifiedDate.Value.FormatForETag());
        }
    }
}