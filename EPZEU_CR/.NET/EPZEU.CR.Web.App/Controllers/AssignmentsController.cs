using EPZEU.CR.Web.App.Code;
using EPZEU.CR.Web.App.Models.Assignments;
using EPZEU.CR.Web.Common;
using EPZEU.Web.DataProtection;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на назначенията.
    /// </summary>
    public class AssignmentsController : BaseApiController
    {
        private IAssignmentReportServiceClient _integrationAssignmentService = null;
        private IDataProtectorService _dataProtectorService = null;

        

        public AssignmentsController(IAssignmentReportServiceClient integrationAssignmentService, IDataProtectorService dataProtectorService)
        {
            _integrationAssignmentService = integrationAssignmentService;
            _dataProtectorService = dataProtectorService;
        }

        /// <summary>
        /// Операция за изчитане на назначенията.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <param name="docNumber">Номер на документа.</param>
        /// <param name="outgoingDate">Дата на изходящ номер.</param>
        /// <returns>Данни за назначенията</returns>
        [Route("{incomingNumber}-{docNumber}/{outgoingDate}/Assignment")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AssignmentSummary>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAssignment(string incomingNumber, int docNumber, string outgoingDate)
        {
            var assignment = await _integrationAssignmentService.GetAssignmentAsync(new AssignmentSearchCriteria
            {
                OutgoingIncomingNumber = incomingNumber,
                OutgoingSeqNumber = docNumber,
                OutgoingNumberDate = DateTime.ParseExact(outgoingDate, "dd.MM.yyyy", CultureInfo.InvariantCulture)
            });

            return Ok(assignment);
        }

        /// <summary>
        /// Операция за изчитане на назначенията.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="applicationConverter">Конвертор на заявление.</param>
        /// <returns>Данни за назначенията</returns>
        [Route("AssignmentMasterApplications")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Assignments_AssignmentMasterApplications")]
        [ProducesResponseType(typeof(IEnumerable<AssignmentMasterApplicationsItem>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAssignmentMasterApplications([FromQuery]MasterAssignmentSearchCriteria criteria, [FromServices]IApplicationConverter applicationConverter)
        {
            string companyName = null;
            criteria.UIC = _dataProtectorService.ExtractUicWithCtx(criteria.UIC, ref companyName);

            if (criteria.OutgoingNumberDate.HasValue)
                criteria.OutgoingNumberDate = new DateTime(criteria.OutgoingNumberDate.Value.Year, criteria.OutgoingNumberDate.Value.Month, criteria.OutgoingNumberDate.Value.Day);

            var res = await _integrationAssignmentService.SearchMasterAssignmentApplicationsAsync(criteria);

            if (res.Data != null && res.Data.Any())
            {
                var resVM = res.Data.Select(el => new AssignmentMasterApplicationsItem()
                {
                    MasterApplication = applicationConverter.ConvertToUIApplication(el.MasterApplication, criteria.UIC, companyName),
                    RelatedApplication = el.RelatedApplication != null && el.RelatedApplication.Any() ?
                        el.RelatedApplication.Select(rapp => applicationConverter.ConvertToUIApplication(rapp, criteria.UIC, companyName)) : null
                });

                return PagedResult(resVM, res.Count);
            }

            return Ok(null);
        }

        /// <summary>
        /// Справка Документи без назначение.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="applicationConverter"></param>
        /// <returns>Документи без назначение.</returns>
        [Route("DocumentsWithoutAppointment")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "Assignments_DocumentsWithoutAppointment")]
        [ProducesResponseType(typeof(IEnumerable<EPZEU.CR.Web.Models.ApplicationInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentsWithoutAppointmentAsync([FromQuery]UnassignedAssignmentSearchCriteria criteria, [FromServices]IApplicationConverter applicationConverter)
        {
            var res = await _integrationAssignmentService.SearchUnassignedAssignmentApplicationsAsync(criteria);

            if (res.Data != null && res.Data.Any())
            {
                var resVM = res.Data.Select(el => applicationConverter.ConvertToUIApplication(el));

                return PagedResult(resVM, res.Count);
            }

            return Ok(null);
        }
    }
}