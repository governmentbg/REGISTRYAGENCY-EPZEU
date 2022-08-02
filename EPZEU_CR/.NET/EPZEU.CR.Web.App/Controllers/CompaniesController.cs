using EPZEU.CR.Web.Models;
using EPZEU.CR.Web.App.Models;
using EPZEU.Web.DataProtection;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за данни за фирми.
    /// </summary>
    public class CompaniesController : BaseApiController
    {
        private IApplicationServiceClient _integrationAppService = null;
        private ICompanyReportServiceClient _companyReportServiceClient = null;

        #region Constructors

        public CompaniesController(IApplicationServiceClient integrationAppService, ICompanyReportServiceClient companyReportServiceClient)
        {
            this._integrationAppService = integrationAppService;
            this._companyReportServiceClient = companyReportServiceClient;
        }

        #endregion

        /// <summary>
        /// Операция за изчитане на основни данни за фирми.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <param name="entryNumber">Номер на вписване.</param>
        /// <returns>Основни данни за фирми</returns>
        [Route("Summary")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CompanySummary>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCompanySummaryAsync([FromQuery]string incomingNumber, [FromQuery]string entryNumber)
        {
            var companies = await _companyReportServiceClient.SearchCompanySummary(incomingNumber, entryNumber);

            return Ok(companies);
        }

        /// <summary>
        /// Операция за изчитане на данни за преобразуване.
        /// </summary>
        /// <param name="incomingNumber">Входящ номер.</param>
        /// <returns>Данни за преобразуване</returns>
        #region Transformations
        [Route("GetTransformationInfo/{incomingNumber}")]
        [HttpGet]
        [ProducesResponseType(typeof(TransformationSummary), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTransformationInfo(string incomingNumber)
        {
            var result = await _integrationAppService.GetTransformationAsync(incomingNumber);

            return Ok(result);
        }

        /// <summary>
        /// Операция за изчитане на данни за запазено име на фирма.
        /// </summary>
        /// <param name="clearName">Пълно име на фирма</param>
        /// <returns>Данни за запазена фирма</returns>
        [Route("GetReservedCompany/{clearName}")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CompanyInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetReservedCompany(string clearName)
        {
            var result = await _companyReportServiceClient.SearchCompaniesAsync(new CompanySearchCriteria()
            {
                ClearName = clearName,
                SortOrder = SortOrder.DESC,
                IsActive = true,
            });

            return Ok(result.Data);
        }

        #endregion

        /// <summary>
        /// Операция за изчитане на фирмено дело
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="localizer">Локализатор</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns>Фирмено дело.</returns>
        [Route("CompanyCases/{uic}")]
        [HttpGet]
        [ProducesResponseType(typeof(TreeNodeCollection), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCompanyCasesAsync(string uic, [FromServices]IStringLocalizer localizer, [FromServices]IDataProtectorService protectorService)
        {
            var companyCases = await _companyReportServiceClient.SearchCompanyCasesAsync(uic);

            if (companyCases != null && companyCases.Any())
            {
                var result = new TreeNodeCollection() { Items = new List<TreeNode>() };

                foreach (var companyCase in companyCases)
                {
                    var tmpNode = new TreeNode()
                    {
                        IntermediateState = false,
                        IsExtended = false,
                        Selected = false,
                        Value = companyCase.Guid,
                        Text = companyCase.Name,
                        Children = new List<TreeNode>()
                    };

                    if (companyCase.Cases != null && companyCase.Cases.Any())
                    {
                        foreach (var c in companyCase.Cases)
                        {
                            var tmpCaseNode = new TreeNode()
                            {
                                IntermediateState = false,
                                IsExtended = false,
                                Selected = false,
                                Value = Guid.NewGuid().ToString(),
                                Text = c.Name,
                                ParentID = tmpNode.Value,
                                Children = new List<TreeNode>()
                            };

                            tmpNode.Children.Add(tmpCaseNode);

                            if ((c.Definitions != null && c.Definitions.Any())
                                || (c.LegalDecisions != null && c.LegalDecisions.Any())
                                || (c.OtherDecisions != null && c.OtherDecisions.Any()))
                            {
                                var desisions = new List<Decisions>();

                                if (c.Definitions != null)
                                    desisions.AddRange(c.Definitions);

                                if (c.LegalDecisions != null)
                                    desisions.AddRange(c.LegalDecisions);

                                if (c.OtherDecisions != null)
                                    desisions.AddRange(c.OtherDecisions);

                                foreach (var d in desisions)
                                {
                                    var tmpDesisionNode = new TreeNode()
                                    {
                                        IntermediateState = false,
                                        IsExtended = false,
                                        Selected = false,
                                        Value = Guid.NewGuid().ToString(),
                                        Text = d.Name,
                                        ParentID = tmpCaseNode.Value,
                                        Children = new List<TreeNode>()
                                    };

                                    if (d.Documents != null && d.Documents.Any())
                                    {
                                        for (var i = 0; i < d.Documents.Count; i++)
                                        {
                                            var doc = d.Documents[i];
                                            var docUrl = string.Format("{0}/{1}/{2}", LinkRoutes.DOCUMENT_ACCESS_UI_URL, uic, protectorService.CombineCompCaseDocGuidWithCtx(doc.Guid.ToString(), d.Name));
                                            TreeNode tmpDocNode = new TreeNode()
                                            {
                                                IntermediateState = false,
                                                IsExtended = false,
                                                Selected = false,
                                                Value = doc.Guid.ToString(),
                                                Text = string.Format("<i class='ui-icon ui-icon-download-color mr-1'></i><a href='{0}' target='_blank'>{1}</a><br/>{2}<span class='text-muted'>{3}</span><br/>"
                                                , docUrl
                                                , doc.FileName
                                                , string.IsNullOrEmpty(doc.Description) ? doc.DocumentTypeName : doc.Description
                                                , doc.PageNumbers > 0 ? string.Format(", {0}: {1}", localizer["GL_COUNT_PAGES_L"], doc.PageNumbers) : ""),
                                                ParentID = tmpDesisionNode.Value
                                            };

                                            tmpDesisionNode.Children.Add(tmpDocNode);
                                        }
                                    }

                                    tmpCaseNode.Children.Add(tmpDesisionNode);
                                }
                            }
                        }
                    }

                    result.Items.Add(tmpNode);
                }

                return Ok(result);
            }

            return NotFound();
        }
    }
}
