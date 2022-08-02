using Integration.EPZEU;
using Integration.EPZEU.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за данни за фирми от регистър Булстат.
    /// </summary>
    public class BulstatsController : BaseApiController
    {
        IBulstatReportServiceClient _bulstatReportServiceClient;
        public BulstatsController(IBulstatReportServiceClient bulstatReportServiceClient)
        {
            
            _bulstatReportServiceClient = bulstatReportServiceClient;
        }

        /// <summary>
        /// Операзия за изчитане на данни за фирма.
        /// </summary>
        /// <param name="uic">ЕИК</param>
        /// <returns>Данни за фирма</returns>
        [Route("{uic}/Summary")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BulstatSummary>), StatusCodes.Status200OK)]
        public async Task<BulstatSummary> GetBulstatSummary(string uic)
        {
            var a = await _bulstatReportServiceClient.GetBulstatSummaryAsync(uic);

            return a;
        }
    }
}
