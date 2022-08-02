using EPZEU.CR.Reports;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.Api.Private.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за работа с подадени заявявления
    /// </summary>
    [Authorize]
    public class ReportsController : EPZEU.Web.Mvc.BaseApiController
    {
        #region Properties

        private IStatisticReportService _statisticReportService = null;

        #endregion

        #region Constructors

        public ReportsController([FromServices]IStatisticReportService statisticReportService)
        {
            _statisticReportService = statisticReportService;
        }

        #endregion

        //REQ_D04_EPZU_00690
        /// <summary>
        /// Статистика за търговци/ЮЛНЦ.
        /// </summary>
        /// <param name="criteria">Критерии за търсене</param>       
        /// <returns>Заявления</returns>
        [Route("ExportMerchantStatistics")]
        [HttpGet]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> ExportMerchantStatisticsAsync([FromQuery]BaseReportSearchCriteria criteria)
        {
            var results = await _statisticReportService.ExportMerchantStatisticsAsync(criteria);

            if (results != null)
            {
                return File(results, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Export.xlsx");
            }

            return NotFound();
        }

        //REQ_D04_EPZU_00634
        /// <summary>
        ///  Статистика за броя заявении услуги по регистри за период от ТРРЮЛНЦ.
        /// </summary>
        /// <param name="criteria">Критерии за търсене</param>       
        /// <returns>Заявления</returns>
        [Route("ExportAppliedServicesStatistics")]
        [HttpGet]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> ExportAppliedServicesStatisticsAsync([FromQuery]BaseReportSearchCriteria criteria)
        {
            var results = await _statisticReportService.ExportAppliedServicesStatisticsAsync(criteria);

            if (results != null)
            {
                return File(results, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Export.xlsx");
            }

            return NotFound();
        }
    }
}
