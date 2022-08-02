using EPZEU.Common;
using EPZEU.CR.Web.App.Code;
using EPZEU.CR.Web.Models;
using EPZEU.Web.DataProtection;
using EPZEU.Web.Utilities;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер за работа с инструкции.
    /// </summary>
    public class InstructionsController : BaseApiController
    {
        private IInstructionServiceClient _instructionServiceClient = null;
        private readonly IStringLocalizer _localizer = null;
        private readonly GlobalOptions _globalOptions;
        private readonly string _lang;

        #region Constructors

        public InstructionsController(
            IInstructionServiceClient instructionServiceClient,
            IStringLocalizer localizer,
            IOptionsMonitor<GlobalOptions> globalOptionsAccessor,
            IHttpContextAccessor httpContextAccessor)
        {
            _instructionServiceClient = instructionServiceClient;
            _localizer = localizer;
            _globalOptions = globalOptionsAccessor.CurrentValue;
            _lang = httpContextAccessor.HttpContext.GetLanguage();
        }

        #endregion

        /// <summary>
        /// Операция за изчитане на инструкции.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns></returns>
        [Route("")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Instruction>), StatusCodes.Status200OK)]
        [ReportPagedContextLimiter(GenerationContextID = "Instructions")]
        public async Task<IActionResult> GetInstructionsAsync([FromQuery]InstructionSearchCriteria criteria, [FromServices]IDataProtectorService protectorService)
        {
            var res = await _instructionServiceClient.SearchInstruction(criteria);

            if (res.Data != null && res.Data.Any())
            {
                if (criteria.Mode == InstructionSearchMode.ByIncomingNumber)
                {
                    var dateFormat = string.Format("dd.MM.yyyy {0} HH:mm:ss", _localizer["GL_YEAR_ABBREVIATION_L"]);

                    var resVM = res.Data
                    .OrderByDescending(inst => inst.InstructionDate)
                    .Select(instruction => new {
                        DownloadLink = string.Format("<a href='{0}/{1}' target='_blank'>{2}</a>",
                                                        LinkRoutes.DOCUMENT_ACCESS_UI_URL
                                                        , protectorService.CombineDocGuidWithCtx(instruction.InstructionDocGuid, instruction.IncomingNumber, criteria.UIC)
                                                        , string.Format("{0} {1}", _localizer["GL_INSTRUCTIONS_DATE_L"], instruction.InstructionDate.Value.ToString(dateFormat))),
                        instruction.InstructionReason
                    });

                    return Ok(resVM);
                }
                if (criteria.Mode == InstructionSearchMode.ByUIC)
                {
                    var baseUrl = _lang == "bg" ? UrlHelpers.PrepareUrl(_globalOptions.GL_CR_PUBLIC_UI_URL) : UrlHelpers.PrepareUrl(string.Format("{0}/{1}/", _globalOptions.GL_CR_PUBLIC_UI_URL, _lang));

                    var resVM = res.Data.OrderByDescending(inst => inst.InstructionDate).Select(instr => new
                    {
                        instr.IncomingNumber,
                        FromDate = instr.InstructionDate,
                        EndDate = instr.MaxWaitInstructionDate,
                        Link = string.Format("<a href='{0}' target='_blank'>{1}</a>", UrlHelpers.PrepareUrl(string.Format("{0}{1}?incomingNumber={2}", baseUrl, PagesURLs.InstructionsURL, instr.IncomingNumber)), _localizer["GL_INSTRUCTIONS_L"])
                    });

                    return PagedResult(resVM, res.Count);
                }
                if (criteria.Mode == InstructionSearchMode.DocumentsWithoutDeed)
                {
                    var baseUrl = _lang == "bg" ? UrlHelpers.PrepareUrl(_globalOptions.GL_CR_PUBLIC_UI_URL) : UrlHelpers.PrepareUrl(string.Format("{0}/{1}/", _globalOptions.GL_CR_PUBLIC_UI_URL, _lang));

                    var resVM = res.Data.OrderByDescending(inst => inst.InstructionDate).Select(instr => new
                    {
                        instr.IncomingNumber,
                        Link = UrlHelpers.PrepareUrl(string.Format("{0}{1}?incomingNumber={2}", baseUrl, PagesURLs.InstructionsURL, instr.IncomingNumber)),
                        FromDate = instr.InstructionDate,
                        EndDate = instr.MaxWaitInstructionDate,
                        DeedSummary = GetDeedSummaryAsString(instr.IncomingLinkedDeeds != null && instr.IncomingLinkedDeeds.Count > 0 ? instr.IncomingLinkedDeeds[0] : null, instr.WaitingTransformationCompanies),
                    });

                    return PagedResult(resVM, res.Count);
                }
            }

            return Ok(null);
        }

        #region Private helpers

        private IEnumerable<string> GetDeedSummaryAsString(DeedSummary IncomingLinkedDeed, IEnumerable<IndexedField> transformationCompanies)
        {
            var deedResultArr = new List<string>();
            var result = new List<string>();

            if (IncomingLinkedDeed != null)
            {
                if (IncomingLinkedDeed.UIC != null && IncomingLinkedDeed.UIC != "")
                    deedResultArr.Add(IncomingLinkedDeed.UIC);

                if (IncomingLinkedDeed.CompanyFullName != null && IncomingLinkedDeed.CompanyFullName != "")
                    deedResultArr.Add(IncomingLinkedDeed.CompanyFullName);

                if (deedResultArr.Count > 0)
                    result.Add(string.Join(", ", deedResultArr));
            }

            var label = "";

            if (transformationCompanies != null)
            {
                result.Clear();
                var tmpResult = new List<string>();

                foreach (var transformationCompany in transformationCompanies)
                {
                    label = _localizer[Nomenclatures.LocalizationHelper.GetFieldNameCode(transformationCompany.FieldIdent)];
                    label = Regex.Replace(label, @"[\d]+[\w?]+.\s{0,}", "");

                    result.Add(label + ":");

                    if (!string.IsNullOrWhiteSpace(transformationCompany.Ident))
                        tmpResult.Add(transformationCompany.Ident);

                    if (!string.IsNullOrWhiteSpace(transformationCompany.Name))
                        tmpResult.Add(transformationCompany.Name);

                    result.Add(string.Join(", ", tmpResult));
                    tmpResult.Clear();
                }
            }

            return result;
        }

        #endregion
    }
}
