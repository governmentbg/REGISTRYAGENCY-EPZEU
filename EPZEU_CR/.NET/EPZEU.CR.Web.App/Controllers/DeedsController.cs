
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.CR.Reports;
using EPZEU.CR.Web.App.Code;
using EPZEU.CR.Web.App.FieldViews;
using EPZEU.CR.Web.App.FieldViews.Common;
using EPZEU.CR.Web.App.Models;
using EPZEU.CR.Web.App.Models.Deeds;
using EPZEU.CR.Web.Common;
using EPZEU.CR.Web.Models;
using EPZEU.Security;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using EPZEU.Web.DataProtection;
using EPZEU.Web.Mvc.Filters;
using Integration.EPZEU;
using Integration.EPZEU.Models;
using Integration.EPZEU.Models.Nomenclatures;
using Integration.EPZEU.Models.SearchCriteria;
using Integration.EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.ObjectPool;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DomModels = Integration.EPZEU.Models;
using LegalFormEnum = Integration.EPZEU.Models.LegalForms;
using LocalizationHelper = EPZEU.CR.Nomenclatures.LocalizationHelper;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуги за управление на партиди.
    /// </summary>
    public class DeedsController : BaseApiController
    {
        #region static members

        private struct SubDeedTypeInfo
        {
            public string StatusClosedName;
        }

        private static readonly Dictionary<SubUICTypes, SubDeedTypeInfo> collabsableSubDeedTypes = new Dictionary<SubUICTypes, SubDeedTypeInfo> {
                { SubUICTypes.B2_Branch,
                    new SubDeedTypeInfo() {
                        StatusClosedName = "GL_CLOSED_L"
                    }
                },
                { SubUICTypes.B3_Pledge_DD,
                    new SubDeedTypeInfo() {
                        StatusClosedName = "GL_DELETED_L"
                    }
                },
                { SubUICTypes.B4_Pledge_TP,
                    new SubDeedTypeInfo() {
                        StatusClosedName = "GL_DELETED_L"
                    }
                },
                { SubUICTypes.B5_Distraint_DD,
                    new SubDeedTypeInfo() {
                        StatusClosedName = "GL_LIFTED_L"
                    }
                },
                { SubUICTypes.B6_Liquidation,
                    new SubDeedTypeInfo() {
                        StatusClosedName = String.Empty
                    }
                },
                { SubUICTypes.B7_ActualOwner,
                    new SubDeedTypeInfo() {
                        StatusClosedName = "GL_DELETED_L"
                    }
                },
                { SubUICTypes.V1_Transfer,
                    new SubDeedTypeInfo() {
                        StatusClosedName = String.Empty
                    }
                },
                { SubUICTypes.V2_Conversion,
                    new SubDeedTypeInfo() {
                        StatusClosedName = String.Empty
                    }
                },
                { SubUICTypes.V3_Reorganization_K,
                    new SubDeedTypeInfo() {
                        StatusClosedName = String.Empty
                    }
                }
            };

        #endregion

        private readonly IDataProtectorService _dataProtectorService = null;
        private readonly IDeedReportService deedReportService = null;
        private readonly IAuditServiceClient auditServiceClient = null;
        private readonly IFieldViewFactory fieldViewFactory = null;
        private readonly IStringLocalizer localizer = null;
        private readonly IFieldViewHelper fieldViewHelper = null;
        private readonly IEPZEUUserAccessor _EPZEUUserAccessor;
        private readonly ObjectPool<StringBuilder> _stringBuilderPool = null;
        private readonly IFieldViewsNomenclaturesEnsurer _fieldViewsNomenclaturesEnsurer = null;

        #region Constructors

        public DeedsController(
            IDataProtectorService dataProtectorService,
            IDeedReportService deedReportService,
            IFieldViewFactory fieldViewFactory,
            IStringLocalizer localizer,
            IFieldViewHelper fieldViewHelper,
            IAuditServiceClient auditServiceClient,
            IEPZEUUserAccessor EPZEUUserAccessor,
            ObjectPool<StringBuilder> stringBuilderPool,
            IFieldViewsNomenclaturesEnsurer fieldViewsNomenclaturesEnsurer)
        {
            _dataProtectorService = dataProtectorService;
            this.deedReportService = deedReportService;
            this.fieldViewFactory = fieldViewFactory;
            this.localizer = localizer;
            this.fieldViewHelper = fieldViewHelper;
            this.auditServiceClient = auditServiceClient;
            _EPZEUUserAccessor = EPZEUUserAccessor;
            _stringBuilderPool = stringBuilderPool;
            _fieldViewsNomenclaturesEnsurer = fieldViewsNomenclaturesEnsurer;
        }

        #endregion

        /// <summary>
        /// Операция за изчитане на данни за партида.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="entryDate">Дата на вписване.</param>
        /// <param name="loadFieldsFromAllLegalForms">Флаг указващ дали да се заредят полета за всички правни  форми.</param>
        /// <param name="sectionGroupFields">Интерфейс за работа с групи раздели.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns>Данни за партида</returns>
        [Route("{uic}")]
        [HttpGet]
        [ReportUICContextLimiter(GenerationContextID = "Deed")]
        [ProducesResponseType(typeof(Models.Deeds.Deed), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedAsync(
            string uic,
            [FromQuery]DateTime? entryDate,
            [FromQuery]bool? loadFieldsFromAllLegalForms,
            [FromServices]ISectionGroupFields sectionGroupFields,
            [FromServices]IDataProtectorService protectorService)
        {
            await _fieldViewsNomenclaturesEnsurer.EnsureNomenclaturesAsync(CancellationToken.None);

            var domDeed = await deedReportService.GetDeedAsync(uic, new DeedLoadOption()
            {
                EntryDate = entryDate,
                LoadLinkedDeeds = true,
                LoadErasedFields = true,
                CheckHasInstructions = true,
                CheckHasAssignments = true,

                CheckHasCompanyCases = true,
                CheckHasNotifications = true,
                LoadFieldsFromAllLegalForms = loadFieldsFromAllLegalForms.GetValueOrDefault()
            });

            //Само за тест.
            //var domDeed = GetDeedByXmlOnlyTest();

            if (domDeed == null)
            {
                return Ok();
            }

            var auditRequest = new LogActionRequest()
            {
                ObjectType = ObjectTypes.TRRULNCBatch,
                ActionType = ActionTypes.Preview,
                Module = Modules.EPZEU_CR,
                Functionality = Functionalities.PublicReports,
                Key = uic,
                UserSessionID = _EPZEUUserAccessor.UserSessionID,
                IpAddress = _EPZEUUserAccessor.RemoteIpAddress.ToString(),
                UserCIN = _EPZEUUserAccessor.User?.CIN,
                LoginSessionID = _EPZEUUserAccessor.User?.LoginSessionID,
                OperationID = Guid.NewGuid().ToString()
            };

            // TODO Idempotent operations
            // при всеки клик на 'Търси' ли ще правим лог, или ще вържем по логин сесия/еик ?
            await auditServiceClient.CreateLogActionAsync(auditRequest);

            var deed = ConvertToUIObject(sectionGroupFields, domDeed, protectorService);
            deed.EntryDate = entryDate;

            deed.UICWithCtx = _dataProtectorService.CombineUicWithCtx(deed.UIC, deed.CompanyName);
            return Ok(deed);
        }

        /// <summary>
        /// Операция за изчитане на TRULNC представители.
        /// </summary>
        /// <param name="uic">ЕИК</param>
        /// <param name="ident">Идентификатор</param>
        /// <returns></returns>
        [Route("{uic}/TRRULNCRepresentatives")]
        [Route("{uic}/{ident}/TRRULNCRepresentatives")]
        [HttpGet]
        [ServiceLimiter(ServiceCode = "MAX_COUNT_REQUEST_SERVICE_POWER")]
        [ProducesResponseType(typeof(Domain.Common.Deed), StatusCodes.Status200OK)] 
        public async Task<IActionResult> GetTRRULNCRepresentativesAsync(string uic, string ident)
        {
            var deed = await deedReportService.GetTRRULNCRepresentativesAsync(uic, ident);

            return Ok(deed);
        }

        /// <summary>
        /// Операция за изчитане на идентификатори на партиди.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="entryDate">Дата на входиране.</param>
        /// <param name="includeHistory">Флаг указващ дали да се включи история.</param>
        /// <param name="deedServiceClient">Интерфейс за работа с партиди.</param>
        /// <returns></returns>
        [Route("{uic}/DeedFieldIdents")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedFieldIdents(string uic, [FromQuery]DateTime? entryDate, [FromQuery]bool? includeHistory, [FromServices]IDeedReportServiceClient deedServiceClient)
        {
            var fieldIdents = await deedServiceClient.GetFieldIdentsAsync(uic, new DeedLoadOption()
            {
                EntryDate = entryDate,
                LoadLinkedDeeds = true,
                LoadErasedFields = includeHistory,
                CheckHasInstructions = true,
                SearchByFullFieldIndent = true,
            });

            if (fieldIdents != null)
                return Ok(fieldIdents);

            return Ok();
        }

        /// <summary>
        /// Операция за изчитане на данни за справка "Списък със запазени фирми/ наименования"
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="companyReportServiceClient"></param>
        /// <returns>Списък със запазени фирми/ наименования.</returns>
        [Route("PreservedNames")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsPreservedNames")]
        [ProducesResponseType(typeof(IEnumerable<Models.Deeds.CompanyInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedPreservedNamesAsync(
            [FromQuery]CompanyInfoSearchCriteria criteria,
            [FromServices] ICompanyReportServiceClient companyReportServiceClient)
        {
            var domainCriteria = Mapper.Map<CompanySearchCriteria>(criteria);
            var pResult = await companyReportServiceClient.SearchCompaniesAsync(domainCriteria);

            return PagedResult<IEnumerable<DomModels.CompanyInfo>, IEnumerable<Models.Deeds.CompanyInfo>>(pResult.Data, pResult.Count);
        }

        /// <summary>
        /// Справки за права върху фирма/ наименование
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="companyReportServiceClient">Интерфейс за работа с доклади на фирма.</param>
        /// <returns>Списък със права върху фирма/ наименование</returns>
        [Route("RightsCompanies")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsRightsCompanies")]
        [ProducesResponseType(typeof(IEnumerable<Models.Deeds.ProtectedRightsCompanyInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRightsCompaniesAsync(
            [FromQuery]CompanyProtrectionRightsSearchCriteria criteria,
            [FromServices] ICompanyReportServiceClient companyReportServiceClient)
        {
            var pResult = await companyReportServiceClient.SearchProtectedRightsCompaniesAsync(criteria);

            return PagedResult<IEnumerable<DomModels.ProtectedRightsCompanyInfo>, IEnumerable<Models.Deeds.ProtectedRightsCompanyInfo>>(pResult.Data, pResult.Count);
        }

        /// <summary>
        /// Търсене по юридическо лице.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="deedReportServiceClient">Интерфейс за работа с доклад по партида.</param>
        /// <returns>Списък с юридически лица.</returns>
        [Route("Summary")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsSummary")]
        [ProducesResponseType(typeof(IEnumerable<PhysicalOrCompanyObj>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedsSummryAsync(
            [FromQuery]VerificationPersonOrgSearchCriteria criteria,
            [FromServices] IDeedReportServiceClient deedReportServiceClient)
        {
            var domCriteria = Mapper.Map<DeedSummarySearchCriteria>(criteria);
            var pResult = await deedReportServiceClient.SearchDeedSummaryAsync(domCriteria);
            List<PhysicalOrCompanyObj> result = null;

            if (pResult.Data != null && pResult.Data.Any())
            {
                result = pResult.Data.Select(ds => new PhysicalOrCompanyObj()
                {
                    IsPhysical = false,
                    CompanyFullName = ds.CompanyFullName,
                    Name = ds.CompanyName,
                    Ident = ds.UIC
                }).ToList();
            }

            return PagedResult(result, pResult.Count);
        }

        /// <summary>
        /// Търсене по физическо лице
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="deedReportServiceClient">Интерфейс за работа с справки по партида.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns>Списък с физически лица.</returns>
        [Route("Subjects")]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsSubjects")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<PhysicalOrCompanyObj>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSubjectsSummryAsync(
            [FromQuery]VerificationPersonOrgSearchCriteria criteria,
            [FromServices] IDeedReportServiceClient deedReportServiceClient,
            [FromServices] IDataProtectorService protectorService)
        {
            var domCriteria = Mapper.Map<SubjectSearchCriteria>(criteria);
            var pResult = await deedReportServiceClient.SearchSubjectsAsync(domCriteria);
            List<PhysicalOrCompanyObj> result = null;

            if (pResult.Data != null && pResult.Data.Any())
            {
                result = pResult.Data.Select(ss => new PhysicalOrCompanyObj()
                {
                    IsPhysical = true,
                    CompanyFullName = null,
                    Name = ss.Name,
                    Ident = protectorService.Protect(ss.Ident)
                }).ToList();
            }

            return PagedResult(result, pResult.Count);
        }

        /// <summary>
        /// Справка по физическо или юридическо лицe
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="deedReportServiceClient">Интерфейс за работа с справки по партида.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns>Списък с резултати по полета в партида.</returns>
        [Route("SubjectInFields")]
        /*За тази справка не слагаме лимитиране за сега поради усложнения.*/
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SubjectInFieldItem>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSubjectInFieldsAsync(
            [FromQuery]SubjectInFieldSearchCriteria criteria,
            [FromServices] IDeedReportServiceClient deedReportServiceClient,
            [FromServices] IDataProtectorService protectorService)
        {
            if (criteria.Type == SubjectInFieldTypes.Individuals)
            {
                criteria.UID = protectorService.Unprotect(criteria.UID);
            }

            var res = await deedReportServiceClient.SearchSubjectInFieldsAsync(criteria);
            var result = new List<SubjectInFieldItem>();

            if (res != null && res.Any())
            {

                result = res.Select(sf => Mapper.Map<SubjectInFieldItem>(sf)).ToList();
            }

            return Ok(result);
        }

        /// <summary>
        /// Търсене на Пререгистрирани търговци/ ЮЛНЦ.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="deedReportServiceClient">Интерфейс за работа с справки по партида.</param>
        /// <returns>Списък с юридически лица.</returns>
        [Route("BulstatDeeds")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsBulstatDeeds")]
        [ProducesResponseType(typeof(IEnumerable<DeedSummary>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetBulstatDeedsAsync(
            [FromQuery]BulstatDeedsSearchCriteria criteria,
            [FromServices] IDeedReportServiceClient deedReportServiceClient)
        {
            var domCriteria = Mapper.Map<DeedSummarySearchCriteria>(criteria);
            var pResult = await deedReportServiceClient.SearchDeedSummaryAsync(domCriteria);

            return PagedResult(pResult.Data, pResult.Count);
        }

        /// <summary>
        /// Справка вписано обстоятелство или обявен акт.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="includeHistory">Флаг указващ дали да се включи история.</param>
        /// <param name="legalFormFields">Интерфейс за работа с Поле Правна форма.</param>
        /// <param name="isectionGroupFields">Интерфейс за работа с раздели групи полета.</param>
        /// <param name="iSectionGroupFieldsCache">Интерфейс за работа кеш за раздели групи полета.</param>
        /// <param name="memoryCache">Интерфейс за работа с кеш</param>
        /// <returns>Обстоятелство или обявен акт.</returns>
        [Route("VerificationActs/{uic}")]
        [HttpGet]
        [ReportUICContextLimiter(GenerationContextID = "Deed")]
        [ProducesResponseType(typeof(VerificationActsSubSearchCriteriaResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetVerificationActs(
            string uic,
            [FromQuery]bool? includeHistory,
            [FromServices]ILegalFormFields legalFormFields,
            [FromServices]ISectionGroupFields isectionGroupFields,
            [FromServices]Integration.EPZEU.Nomenclatures.Cache.ISectionGroupFieldsCache iSectionGroupFieldsCache,
            [FromServices]IMemoryCache memoryCache)
        {
            VerificationActsSubSearchCriteriaResult result = null;

            await _fieldViewsNomenclaturesEnsurer.EnsureNomenclaturesAsync(CancellationToken.None);

            var deedSummery = await deedReportService.GetDeedSummaryAsync(uic);

            if (deedSummery != null)
            {
                var treeNodes = memoryCache.GetOrCreate("VerificationActsTree_" + (includeHistory.GetValueOrDefault() ? "All" : deedSummery.LegalForm.Value.ToString()), (entry) =>
                {
                    var nodes = new TreeNodeCollection() { Items = new List<TreeNode>() };

                    var lfFields = includeHistory.GetValueOrDefault() ? legalFormFields.GetLegalFormFields() : legalFormFields.GetLegalFormFields().Where(lff => lff.LegalFormID == (int)deedSummery.LegalForm.Value);
                    var sectionGroupFields = lfFields.Select(lf => lf.FieldID).Distinct().Select(f => isectionGroupFields.GetSectionGroupField(f));
                    var fields = sectionGroupFields.Where(el => el.FieldIdent != null);

                    //Премахваме секция "Обща информация" SectionID= 414 - Issue TRIR-161.
                    var sections = fields.Where(f => f.SectionID != 414).Select(f => f.Section).Distinct();

                    var groups = fields.GroupBy(f =>
                    {
                        //Issue TRIR-161	
                        if (string.Compare(f.FieldIdent, F001_UIC.FieldIdentCode, true) == 0)
                            return isectionGroupFields.GetSectionGroupField(415);
                        else
                            return isectionGroupFields.GetField(f.FieldIdent).Group;
                    }).Select(g =>
                    {
                        return new TreeNode()
                        {
                            ParentID = g.Key.SectionID.Value.ToString(),
                            Value = g.Key.FieldID.Value.ToString(),
                            Text = localizer[LocalizationHelper.GetGroupNameCode(g.Key.FieldID.Value)],
                            Selected = false,
                            IntermediateState = false,
                            Children = g.OrderBy(el => el.FieldOrder).Select(el => new TreeNode()
                            {
                                ParentID = g.Key.FieldID.Value.ToString(),
                                Value = el.FieldIdent,
                                Text = localizer[LocalizationHelper.GetFieldNameCode(el.FieldIdent)],
                                Selected = false,
                                IntermediateState = false,
                                IsExtended = false
                            }).ToList()
                        };
                    });

                    sections.OrderBy(s => s.FieldOrder).ToList().ForEach(s =>
                    {
                        var sectionGroups = groups.Where(g => string.Compare(g.ParentID, s.SectionID.Value.ToString(), true) == 0).ToList();

                        var tmpSection = new TreeNode()
                        {
                            ParentID = null,
                            Value = s.FieldID.Value.ToString(),
                            Text = localizer[LocalizationHelper.GetSectionNameCode(s.FieldID.Value)],
                            Selected = false,
                            IntermediateState = false,
                            IsExtended = false,
                            Children = sectionGroups
                        };

                        nodes.Items.Add(tmpSection);
                    });

                    entry.AddExpirationToken(iSectionGroupFieldsCache.GetChangeToken());

                    return nodes;
                });
                               
                var deletedDeedNameSufixx = (deedSummery.Status == DeedStatuses.ExistingClosed || deedSummery.Status == DeedStatuses.NewClosed) ? string.Format(" - {0}", localizer["GL_DELETED_TRADER_NPO_L"]) : "";

                result = new VerificationActsSubSearchCriteriaResult()
                {
                    UIC = deedSummery.UIC,
                    Nodes = treeNodes,
                    CompanyFullName = deedSummery.CompanyFullName + deletedDeedNameSufixx
                };
            }

            return Ok(result);
        }

        /// <summary>
        /// Справка за вписано обстоятелство или обявен акт
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="sectionGroupFields">номенклатура раздели групи полета.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns>Вписано обстоятелство или обявен акт.</returns>
        [Route("VerificationActs/{uic}/ActiveCondition")]
        [HttpGet]
        //[ReportPagedContextLimiter(GenerationContextID = "DeedsVerificationActsActiveCondition")]
        [ReportUICContextLimiter(GenerationContextID = "Deed")]
        [ProducesResponseType(typeof(Models.Deeds.Deed), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetVerificationActSubResult(
            string uic
            , [FromQuery]VerificationActsSubSearchCriteria criteria
            , [FromServices]ISectionGroupFields sectionGroupFields
            , [FromServices]IDataProtectorService protectorService)
        {
            await _fieldViewsNomenclaturesEnsurer.EnsureNomenclaturesAsync(CancellationToken.None);

            var domDeed = await deedReportService.GetDeedAsync(uic, new DeedLoadOption()
            {
                FieldIdents = criteria.SelectedFields.Split(',').ToList(),
                LoadLinkedDeeds = true,
                LoadErasedFields = true,
                CheckHasInstructions = true,
                CheckHasAssignments = true,

                CheckHasCompanyCases = true,
                CheckHasNotifications = true
            });

            if (domDeed == null)
            {
                return Ok(null);
            }

            var deed = ConvertToUIObject(sectionGroupFields, domDeed, protectorService);

            if (deed != null)
            {
                deed.EntryDate = DateTime.Now;
            }

            return Ok(deed);
        }

        /// <summary>
        /// Операция за изчитане на основни данни за партида.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <returns>Основни данни за партида.</returns>
        [Route("{uic}/Summary")]
        [HttpGet]
        /*Тази справка няма лимитиране на бизнес ниво*/
        [ProducesResponseType(typeof(DeedSummary), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedSummaryAsync(string uic)
        {
            var deed = await deedReportService.GetDeedSummaryAsync(uic);

            return Ok(deed);
        }

        /// <summary>
        /// Операция за изчитане на данни за седалище.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <returns>Данни за седалище.</returns>
        [Route("{uic}/Seat")]
        [HttpGet]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(F005_Seat), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSeatAsync(string uic)
        {
            var seat = await deedReportService.GetCompanySeatAsync(uic);

            return Ok(seat);
        }

        /// <summary>
        /// Операция за изчитане на данни за клонове на фирма.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <returns>Данни за клонове на фирма.</returns>
        [Route("{uic}/CompanyBranches")]
        [HttpGet]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(IEnumerable<CompanyBranch>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCompanyBranchesAsync(string uic)
        {
            var domDeed = await deedReportService.GetDeedAsync(uic, new DeedLoadOption()
            {
                SubUICType = SubUICTypes.B2_Branch,
                FieldIdents = new List<string>() { F051a_BranchFirm.FieldIdentCode, F051b_BranchIdentifier.FieldIdentCode }
            });

            if (domDeed == null)
            {
                return Ok();
            }

            var branches = domDeed.SubDeeds?.Where(subDeed => subDeed.SubUICType == SubUICTypes.B2_Branch).Select(subDeed =>
            {
                var branchCode = ((F051b_BranchIdentifier)subDeed.Fields.Single(f => ((IField)f).FieldIdent == F051b_BranchIdentifier.FieldIdentCode)).Text;
                var branchName = ((F051a_BranchFirm)subDeed.Fields.Single(f => ((IField)f).FieldIdent == F051a_BranchFirm.FieldIdentCode)).Text;

                return new CompanyBranch()
                {
                    FirmName = branchName,
                    BranchCode = branchCode
                };
            });

            return Ok(branches);
        }

        /// <summary>
        /// Операция за изчитане на данни за раздел.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="subUICType">Тип раздел.</param>
        /// <returns>Данни за раздели</returns>
        [Route("{uic}/SubDeeds/{subUICType}/Summary")]
        [HttpGet]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(IEnumerable<SubDeedSummary>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSubDeedSummaryAsync(string uic, SubUICTypes subUICType)
        {
            var subDeeds = await deedReportService.SearchSubDeedSummariesAsync(uic, subUICType, null);

            if (subDeeds != null && subDeeds.Count() > 0)
            {
                foreach (var subDeed in subDeeds)
                {
                    InitSubDeedName(subDeed);
                }
            }

            return Ok(subDeeds);
        }

        /// <summary>
        /// Операция за изчитане на история на полета.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="subUICType">Тип раздел.</param>
        /// <param name="subUic">Идентификатор на раздел.</param>
        /// <param name="fieldIdent">Идентификатор на поле.</param>
        /// <returns>История на полета.</returns>
        [Route("{uic}/SubDeeds/{subUICType}/Fields/{fieldIdent}/History")]
        [Route("{uic}/SubDeeds/{subUICType}/{subUic}/Fields/{fieldIdent}/History")]
        [HttpGet]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(IEnumerable<Models.Deeds.Field>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFieldHistoryAsync(string uic, SubUICTypes subUICType, string subUic, string fieldIdent)
        {
            await _fieldViewsNomenclaturesEnsurer.EnsureNomenclaturesAsync(CancellationToken.None);
            var fieldHistory = await deedReportService.SearchFieldHistoryAsync(uic, subUICType, subUic, fieldIdent);
            List<Models.Deeds.Field> result = null;

            if (fieldHistory != null && fieldHistory.Any())
            {
                StringBuilder stringBuilder = _stringBuilderPool.Get();
                try
                {
                    using (var writer = new StringWriter(stringBuilder))
                    {
                        result = fieldHistory.Select(f =>
                                    {
                                        (fieldViewFactory.CreateFieldView(f)).HtmlDisplay(writer, f, true);
                                        var htmlData = writer.ToString();

                                        writer.GetStringBuilder().Clear();

                                        return new Models.Deeds.Field()
                                        {
                                            FieldEntryNumber = f.FieldEntryNumber,
                                            RecordMinActionDate = f.RecordMinActionDate,
                                            FieldEntryDate = f.FieldEntryDate,
                                            FieldActionDate = f.FieldActionDate,
                                            FieldIdent = f.FieldIdent,
                                            FieldOperation = f.FieldOperation,
                                            EntryApplicationType = f.EntryApplicationType,
                                            NameCode = LocalizationHelper.GetFieldNameCode(f.FieldIdent),
                                            HtmlData = htmlData
                                        };
                                    }).ToList();
                    }
                }
                finally
                {
                    _stringBuilderPool.Return(stringBuilder);
                }
            }


            return Ok(result);
        }

        /// <summary>
        /// Операция за изчитане на документи към поле.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="subUICType">Тип раздел.</param>
        /// <param name="subUic">Идентификатор на раздел.</param>
        /// <param name="fieldIdent">Идентификатор на поле.</param>
        /// <param name="entryDate">Дата на вписване.</param>
        /// <returns>Документи към поле</returns>
        [Route("{uic}/SubDeeds/{subUICType}/Fields/{fieldIdent}/Documents")]
        [Route("{uic}/SubDeeds/{subUICType}/{subUic}/Fields/{fieldIdent}/Documents")]
        [HttpGet]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(IEnumerable<Models.Applications.ApplicationDocumentInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFieldDocumentsAsync(string uic, SubUICTypes subUICType, string subUic, string fieldIdent, [FromQuery]DateTime? entryDate)
        {
            var fieldDocs = await deedReportService.SearchFieldDocumentsAsync(uic, subUICType, subUic, fieldIdent, entryDate, true);
            if (fieldDocs != null && fieldDocs.Any())
            {
                var result = fieldDocs.Select(fd =>
                {
                    var doc = Mapper.Map<Models.Applications.ApplicationDocumentInfo>(fd);
                    doc.GuidWithCtx = _dataProtectorService.CombineDocGuidWithCtx(fd.Guid, null, uic);
                    return doc;

                }).ToList();

                return Ok(result);
            }

            return Ok(null);
        }

        /// <summary>
        /// Операция за изчитане на фирмено дело.
        /// </summary>
        /// <param name="uic">ЕИК.</param>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="appClient">Интерфейс за работа със заявленмия.</param>
        /// <param name="applicationConverter">Конвертор на заявления.</param>
        /// <returns></returns>
        [Route("{uic}/Applications")]
        [HttpGet]
        [SkipValidateModel]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(IEnumerable<EPZEU.CR.Web.Models.ApplicationInfo>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedCaseAsync(string uic, [FromQuery]BasePagedSearchCriteria criteria, [FromServices]IApplicationServiceClient appClient, [FromServices]IApplicationConverter applicationConverter)
        {
            string companyName = null;
            var uicExtracted = _dataProtectorService.ExtractUicWithCtx(uic, ref companyName);
            ApplicationInfoSearchCriteria domCriteria = null;

            if (criteria == null)
            {
                domCriteria = new ApplicationInfoSearchCriteria() { UIC = uicExtracted, Mode = ApplicationInfoSearchMode.DeedCase };
            }
            else
            {
                domCriteria = new ApplicationInfoSearchCriteria() { UIC = uicExtracted, Page = criteria.Page, Count = criteria.Count, PageSize = criteria.PageSize, Mode = ApplicationInfoSearchMode.DeedCase };
            }

            var pagedResult = await appClient.SearchApplicationInfoAsync(domCriteria);

            return PagedResult(pagedResult.Data == null ? null : pagedResult.Data.Select(app => applicationConverter.ConvertToUIApplication(app, uicExtracted, companyName)), pagedResult.Count);
        }

        /// <summary>
        /// Операция за изчитане на изявление.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="serviceClient">Клиент за работа с справки по партида.</param>
        /// <returns>изявления.</returns>
        [Route("Statements")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedStatements")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Statement>), StatusCodes.Status200OK)] 
        public async Task<IActionResult> GetStatements([FromQuery]StatementSearchCriteria criteria, [FromServices] IDeedReportServiceClient serviceClient)
        {
            var pResult = await serviceClient.SearchStatementsAsync(criteria);

            return PagedResult(pResult.Data == null ? null : pResult.Data.Select(t =>
            {
                t.ActDocumentGuid = _dataProtectorService.CombineDocGuidWithCtx(t.ActDocumentGuid, null, t.Deeds.UIC);
                return t;
            }), pResult.Count);
        }

        /// <summary>
        /// Изчитане на партиди в стабилизация.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="serviceClient">Клиент за работа с справки по партида.</param>
        /// <returns>Партиди в стабилизация.</returns>
        [Route("Stabilization")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsInStabilizations")]
        [ProducesResponseType(typeof(IEnumerable<DeedSummary>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedsInStabilizationAsync([FromQuery]DeedsInStabilizationSearchCriteria criteria, [FromServices] IDeedReportServiceClient serviceClient)
        {
            var pResult = await serviceClient.SearchDeedsInStabilizations(criteria);

            return PagedResult(pResult.Data == null ? null : pResult.Data, pResult.Count);
        }

        /// <summary>
        /// Операция за изчитане на уведомления под НПО.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="serviceClient">Клиент за работа с справки по партида.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns>Уведомления под НПО.</returns>
        [Route("NotificationsUnderNPO")]
        [HttpGet]
        [ReportPagedContextLimiter(GenerationContextID = "DeedsNotificationsUnderNPO")]
        [ProducesResponseType(typeof(IEnumerable<Models.Deeds.Notification>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetNotificationsUnderNPO([FromQuery]NotificationSearchCriteria criteria, [FromServices]IDeedReportServiceClient serviceClient, [FromServices]IDataProtectorService protectorService)
        {
            PagedResult<IEnumerable<Integration.EPZEU.Models.Notification>> pResult = await serviceClient.GetNotificationsAsync(criteria);

            return PagedResult(pResult.Data == null ? null : pResult.Data.Select(r =>
            new Models.Deeds.Notification()
            {
                OutgoingNumber = r.OutgoingNumber,
                UIC = r.Deed.UIC,
                CompanyFullName = r.Deed.CompanyFullName,
                DeadLine = r.DeadLine,
                DownloadLink = string.Format("<a href='{0}/{1}' target='_blank'>{2}</a>",
                                                        LinkRoutes.DOCUMENT_ACCESS_UI_URL
                                                        , protectorService.CombineDocGuidWithCtx(r.DocumentGuid, null, r.Deed.UIC)
                                                        , r.OutgoingNumber)
            }), pResult.Count);
        }

        /// <summary>
        /// Операция за изчитане на уведомления към партида.
        /// </summary>
        /// <param name="criteria">Критерии за търсене.</param>
        /// <param name="serviceClient">Клиент за работа с справки по партида.</param>
        /// <param name="protectorService">Интерфейс за работа със защита на данни.</param>
        /// <returns></returns>
        [Route("DeedNotifications")]
        [HttpGet]
        [ReportUICContextLimiter(AdditionalAllowedContextIDs = new string[] { "Deed" })]
        [ProducesResponseType(typeof(IEnumerable<Models.Deeds.Notification>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDeedNotifications([FromQuery]NotificationSearchCriteria criteria, [FromServices]IDeedReportServiceClient serviceClient, [FromServices]IDataProtectorService protectorService)
        {
            PagedResult<IEnumerable<Integration.EPZEU.Models.Notification>> pResult = await serviceClient.GetNotificationsAsync(criteria);

            return PagedResult(pResult.Data == null ? null : pResult.Data.Select(r =>
            new Models.Deeds.Notification()
            {
                OutgoingNumber = r.OutgoingNumber,
                UIC = r.Deed.UIC,
                CompanyFullName = r.Deed.CompanyFullName,
                DeadLine = r.DeadLine,
                DownloadLink = string.Format("<a href='{0}/{1}' target='_blank'>{2}</a>",
                                                        LinkRoutes.DOCUMENT_ACCESS_UI_URL
                                                        , protectorService.CombineDocGuidWithCtx(r.DocumentGuid, null, r.Deed.UIC)
                                                        , r.DocumentTypeName)
            }), pResult.Count);
        }

        #region Helpers

        #region Deed Helpers

        private Models.Deeds.Deed ConvertToUIObject(ISectionGroupFields sectionGroupFields, EPZEU.CR.Domain.Common.Deed domDeed, IDataProtectorService protectorService)
        {
            if (domDeed == null ||
                domDeed.SubDeeds == null ||
                domDeed.SubDeeds.Count == 0)
                return null;

            var deletedDeedNameSufixx = (domDeed.Status == DeedStatuses.ExistingClosed || domDeed.Status == DeedStatuses.NewClosed) ? string.Format("<span class=\"text-dark\">&nbsp;-&nbsp;{0}</span>", localizer["GL_DELETED_TRADER_NPO_L"]) : "";

            var deed = new Models.Deeds.Deed()
            {
                DeedStatus = domDeed.Status.Value,
                CompanyName = domDeed.CompanyName,
                CompanyNameSuffixFlag = domDeed.CompanyNameSuffixFlag,
                ElementHolderAdditionFlag = domDeed.ElementHolderAdditionFlag,
                LegalForm = domDeed.LegalForm,
                UIC = domDeed.UIC,
                FullName = (this.fieldViewHelper.DisplayCompanyName(domDeed.LegalForm, domDeed.CompanyName, domDeed.CompanyNameSuffixFlag) + deletedDeedNameSufixx),
                HasInstructions = domDeed.HasInstructions,
                HasAssignments = domDeed.HasAssignments,
                HasCompanyCasees = domDeed.HasCompanyCases,
                HasLegalFormChange = domDeed.IsTranfsormedWithLegalFormChanged,
                HasNotifications = domDeed.HasNotifications
            };

            deed.Sections = new List<Section>();
            StringBuilder stringBuilder = _stringBuilderPool.Get();
            try
            {
                using (var writer = new StringWriter(stringBuilder))
                {
                    #region  За всеки SubDeed създаваме UI SubDeed

                    var subDeeds = domDeed.SubDeeds.Select((sd) =>
                    {
                        InitSubDeedName(sd);
                        List<Group> groupFields;

                        //групират се полетатта по групи от номенклатурата
                        groupFields = sd.Fields.GroupBy((item) =>
                                {
                                    //TODO: Issue TRIR-161	
                                    if (string.Compare(((IField)item).FieldIdent, F001_UIC.FieldIdentCode, true) == 0)
                                        return sectionGroupFields.GetSectionGroupField(415);
                                    else
                                        return sectionGroupFields.GetField(((IField)item).FieldIdent).Group;
                                }).Select((g) =>
                                {
                                    var actGroups = new int[] { 451, 42, 625 };
                                    bool isGroupInActGroups = actGroups.Contains(g.Key.FieldID.Value);

                                    //За всяка група съдаваме UI група и се извличат полетата и като се превръщат в UI полета.
                                    return new Group()
                                    {
                                        GroupID = g.Key.FieldID.Value,
                                        NameCode = LocalizationHelper.GetGroupNameCode(g.Key.FieldID.Value),
                                        Order = g.Key.FieldOrder,
                                        Fields = g.Select((field) =>
                                        {
                                            var ifield = (IField)field;

                                            //В актуално състояние искаме да има линк за сваляне на документ, в който при изтегляне да се отбелязва в одита към кое ЕИК е документа.
                                            if (ifield is IStatements actField)
                                            {
                                                actField.StatementsList?.ForEach(act => { act.ActID = protectorService.CombineDocGuidWithCtx(act.ActID, null, deed.UIC); });
                                            }

                                            this.fieldViewHelper.HtmlDisplay(writer, domDeed, sd.Status.Value, ifield);
                                            var htmlData = writer.ToString();

                                            writer.GetStringBuilder().Clear();

                                            return new Models.Deeds.Field()
                                            {
                                                FieldEntryNumber = ifield.FieldEntryNumber,
                                                RecordMinActionDate = ifield.RecordMinActionDate,
                                                FieldEntryDate = ifield.FieldEntryDate,
                                                FieldActionDate = ifield.FieldActionDate,
                                                FieldIdent = ifield.FieldIdent,
                                                FieldOperation = ifield.FieldOperation,
                                                Order = sectionGroupFields.GetField(ifield.FieldIdent).FieldOrder,
                                                NameCode = isGroupInActGroups ? "CR_F_1001_L" : LocalizationHelper.GetFieldNameCode(ifield.FieldIdent),
                                                HtmlData = htmlData
                                            };
                                        }).OrderBy(f => f.Order).ToList()
                                    };
                                }).OrderBy(g => g.Order).ToList();


                        return new Models.Deeds.SubDeed()
                        {
                            SubDeedStatus = sd.Status.Value,
                            SubUIC = sd.SubUIC,
                            SubUICType = sd.SubUICType.Value,
                            ColapsableLinkName = CreateCollapsableLinkName(sd),
                            Groups = groupFields
                        };
                    });

                    #endregion

                    #region Групираме получената колекция от UI SubDeed по SubUICType и създаваме секциите

                    foreach (var subUICTypeGroup in subDeeds.GroupBy((sd) => { return sd.SubUICType; }))
                    {
                        var subUICType = subUICTypeGroup.Key;

                        if (subUICType == SubUICTypes.G1_ActAnnouncement)
                        {
                            #region Специфичен случай, в който за всяка група от секцията добавяме допълнителна секция.
                            /*
                             за тип раздел G1_ActAnnouncement създаваме секция за всяка група от този раздел.
                             */
                            var newSections = subUICTypeGroup.SelectMany(sd => { return sd.Groups.Where(g => g.Fields.Any(f => f.FieldOperation != FieldOperations.Erase)); }).Select((group) =>
                            {
                                var sectionOrder = sectionGroupFields.GetSectionGroupField(group.GroupID.Value).FieldOrder;

                                return new Section()
                                {
                                    NameCode = LocalizationHelper.GetGroupNameCode(group.GroupID.Value),
                                    SubUICType = subUICType,
                                    SubDeeds = new List<Models.Deeds.SubDeed>()
                                            {
                                        new Models.Deeds.SubDeed() {
                                            Groups = new List<Group>() { group },
                                            SubUICType = subUICType,
                                            SubUIC = subUICTypeGroup.ElementAt(0).SubUIC
                                        }
                                            },
                                    Order = sectionOrder
                                };
                            });

                            var announcedActSection = newSections.FirstOrDefault(s => s.NameCode == "CR_GL_ANNOUNCED_ACTS_L");
                            var currentConstutiveActSection = newSections.FirstOrDefault(s => s.NameCode == "CR_GL_CURRENT_CONSTUTIVE_ACT_L");
                            if (announcedActSection != null && currentConstutiveActSection != null)
                            {
                                //Взимаме всички - Актуален дружествен договор/учредителен акт/устав
                                List<Field> currentConstutiveActFields = currentConstutiveActSection.SubDeeds[0].Groups[0].Fields.Where(f => f.FieldIdent == "1001AJ").ToList();
                                
                                if(currentConstutiveActFields != null && currentConstutiveActFields.Any())
                                {
                                    //Взимаме всички "Актуален учредителен актове" и ги премахваме.
                                    List<Field> announcedActFields = announcedActSection.SubDeeds[0].Groups[0].Fields.Where(f => string.Compare(f.FieldIdent, "10019A", true) == 0).ToList();

                                    announcedActFields.ForEach(a => 
                                    {
                                        announcedActSection.SubDeeds[0].Groups[0].Fields.Remove(a);
                                    });

                                }

                                if(announcedActSection.SubDeeds[0].Groups[0].Fields.Count() == 0)
                                {
                                    newSections = newSections.Where(s => s.NameCode != "CR_GL_ANNOUNCED_ACTS_L");
                                }
                            }

                            deed.Sections.AddRange(newSections);

                            #endregion
                        }
                        else
                        {
                            var nomSectionID = sectionGroupFields.GetSectionGroupField(subUICTypeGroup.ToArray().ElementAt(0).Groups.ElementAt(0).GroupID.Value).ParentID;
                            var sectionOrder = sectionGroupFields.GetSectionGroupField(nomSectionID.Value).FieldOrder;

                            #region Създаване на раздел 

                            var section = new Section()
                            {
                                NameCode = LocalizationHelper.GetSectionNameCode((int)subUICType),
                                SubUICType = subUICType,
                                SubDeeds = subUICTypeGroup.OrderBy(sd => sd.SubUICType).ThenBy(sd => sd.SubUIC).ToList(),
                                Order = sectionOrder
                            };

                            deed.Sections.Add(section);

                            #endregion
                        }
                    }

                    #endregion

                    deed.Sections = deed.Sections.OrderBy(s => s.Order).ToList();

                    #region Добавяне на секция Праводатели/Правоприемници

                    var vXDomSubDeeds = domDeed.SubDeeds.Where(sd =>
                        sd.SubUICType == SubUICTypes.V1_Transfer ||
                        sd.SubUICType == SubUICTypes.V2_Conversion ||
                        sd.SubUICType == SubUICTypes.V3_Reorganization_K).OrderBy(sd => sd.SubUICType).ToList();

                    if (vXDomSubDeeds.Count > 0)
                    {
                        //Добавяме допълнителна секция в UI-a "Праводатели и правоприемници"
                        var giversTakersSection = new Section()
                        {
                            NameCode = "CR_GL_PROV_RIGHT_SUCCESSORS_L",
                            SubUICType = SubUICTypes.Undefined,
                            SubDeeds = new List<Models.Deeds.SubDeed>()
                        };

                        foreach (var osd in vXDomSubDeeds)
                        {
                            var groups = osd.Fields.GroupBy(f =>
                            {
                                if (DeedHelpers.IsGiverField(((IField)f).FieldIdent))
                                    return "CR_GL_PROV_RIGHT_L"; //Праводатели
                                else if (DeedHelpers.IsTakerField(((IField)f).FieldIdent))
                                    return "CR_GL_SUCCESSORS_L"; //Правоприемници
                                else
                                    return "OTHER"; //Други
                            }).Where(g => g.Key != "OTHER").Select(g =>
                            {
                                var fields = new List<Models.Deeds.Field>();
                                string clientLang = HttpContext.GetLanguage();

                                g.ToList().ForEach(f =>
                                {
                                    var subjects = GetGiversTakersSubject((IField)f);
                                    string htmlData = null;

                                    subjects = subjects?.Where(p => p.IndentType != IndentTypes.UIC || string.Compare(p.Indent, domDeed.UIC, true) != 0)?.ToArray();

                                    if (subjects != null)
                                    {
                                        for (var i = 0; i < subjects.Length; i++)
                                        {
                                            Person currSubject = subjects[i];
                                            //if (currSubject.IndentType == IndentTypes.UIC && string.Compare(currSubject.Indent, domDeed.UIC, true) == 0)
                                            //    continue;

                                            LegalFormEnum? currSubjectLegalForm = null;
                                            string currSubjectName = currSubject.Name;
                                            if (domDeed.LinkedDeeds != null && domDeed.LinkedDeeds.Any())
                                            {
                                                var deedSummary = domDeed.LinkedDeeds.SingleOrDefault(ld => string.Compare(ld.UIC, currSubject.Indent, true) == 0);

                                                if(deedSummary != null)
                                                {
                                                    currSubjectLegalForm = deedSummary.LegalForm;
                                                    currSubjectName = fieldViewHelper.DisplayCompanyName(currSubjectLegalForm, deedSummary.CompanyName, deedSummary.CompanyNameSuffixFlag);
                                                }
                                            }

                                            if (string.IsNullOrEmpty(currSubject.Indent))
                                            {
                                                htmlData = string.Format("<div class='record-container record-container--preview'><p class='field-text'>{0}</p></div>{1}"
                                                    , currSubjectName
                                                    , i != (subjects.Length - 1) ? "<hr class=\"hr--preview\">" : "");
                                            }
                                            else
                                            {
                                                var url = string.Format("{0}{1}", ((string.IsNullOrEmpty(clientLang) || string.Compare(clientLang, "bg", true) == 0) ? "" : clientLang + "/"), "Reports/ActiveConditionTabResult?uic=" + currSubject.Indent);

                                                htmlData = string.Format("<div class='record-container record-container--preview'><p class='field-text'><a href='{0}' target='_blank'>{1}</a>{2}</p></div>{3}"
                                                , Url.Content("~/" + url)
                                                , currSubjectName
                                                , string.Format(", {0} {1}", localizer["CR_GL_COMPANY_ID_L"], currSubject.Indent)
                                                , i != (subjects.Length - 1) ? "<hr class=\"hr--preview\">" : "");
                                            }

                                            if (!string.IsNullOrEmpty(htmlData))
                                            {
                                                var field = (IField)f;

                                                fields.Add(new Models.Deeds.Field()
                                                {
                                                    FieldEntryNumber = field.FieldEntryNumber,
                                                    RecordMinActionDate = field.RecordMinActionDate,
                                                    FieldEntryDate = field.FieldEntryDate,
                                                    FieldActionDate = field.FieldActionDate,
                                                    FieldIdent = field.FieldIdent,
                                                    FieldOperation = field.FieldOperation,
                                                    NameCode = LocalizationHelper.GetFieldNameCode(field.FieldIdent),
                                                    HtmlData = htmlData
                                                });
                                            }
                                        }
                                    }
                                });

                                return new Group()
                                {
                                    NameCode = g.Key,
                                    Fields = fields
                                };
                            }).Where(g => g.Fields.Count > 0).ToList();

                            if(groups != null && groups.Count > 0)
                            {
                                var uiSubDeed = subDeeds.Single(sd => sd.SubUICType == osd.SubUICType && sd.SubUIC == osd.SubUIC);

                                giversTakersSection.SubDeeds.Add(new Models.Deeds.SubDeed()
                                {
                                    ColapsableLinkName = uiSubDeed.ColapsableLinkName,
                                    Groups = groups,
                                    SubUIC = osd.SubUIC,
                                    SubDeedStatus = uiSubDeed.SubDeedStatus,
                                    SubUICType = uiSubDeed.SubUICType
                                });
                            }
                        }

                        if (giversTakersSection.SubDeeds.Any())
                            deed.Sections.Add(giversTakersSection);
                    }

                    #endregion
                }
            }
            finally
            {
                _stringBuilderPool.Return(stringBuilder);
            }

            return deed;
        }

        private string CreateCollapsableLinkName(EPZEU.CR.Domain.Common.SubDeed subDeed)
        {
            SubDeedTypeInfo subDeedTypeInfo;

            if (!collabsableSubDeedTypes.TryGetValue(subDeed.SubUICType.Value, out subDeedTypeInfo))
                return null;


            StringBuilder linkText = _stringBuilderPool.Get();

            try
            {
                if (subDeed.SubUICType == SubUICTypes.B6_Liquidation)
                {
                    //Ликвидация
                    linkText.Append(this.localizer["CR_APP_LIQUIDATION_L"]);

                    if (subDeed.Status == SubDeedStatuses.Closed)
                    {
                        bool hasStopOfLiquidation = false;
                        var stopOfLiquidationField = subDeed.Fields?.FirstOrDefault(f => ((IField)f).FieldIdent == F505_StopOfLiquidation.FieldIdentCode);
                        if (stopOfLiquidationField != null)
                        {
                            var deserializedField = (F505_StopOfLiquidation)stopOfLiquidationField;
                            if (deserializedField.StoppingOfLiquidation)
                            {
                                linkText.AppendFormat(" - {0}", localizer["CR_APP_STOP_PROCESS_LIQUIDATION_L"]);
                                hasStopOfLiquidation = true;
                            }
                            if (deserializedField.CessationOfLiquidation)
                            {
                                linkText.AppendFormat(" - {0}", localizer["CR_APP_TERMINATION_PROCESS_LIQUIDATION_L"]);
                                hasStopOfLiquidation = true;
                            }
                        }

                        if (!hasStopOfLiquidation)
                        {
                            var field = subDeed.Fields?.FirstOrDefault(f => ((IField)f).FieldIdent == F504_ContinuingTradeActivity.FieldIdentCode);

                            if (field != null)
                            {
                                var deserializedField = (F504_ContinuingTradeActivity)field;
                                var fieldResult = string.Format("{0}{1}"
                                    , deserializedField.Continue ? localizer["CR_APP_CONTINUATION_ENTITY_EEIG_L"] : ""
                                    , deserializedField.Restore ? deserializedField.Continue ? " - " + localizer["CR_APP_RESUMPTION_ACTIVITY_CCS_ECS_L"] : localizer["CR_APP_RESUMPTION_ACTIVITY_CCS_ECS_L"] : "");

                                linkText.AppendFormat(" - {0}", fieldResult);
                            }
                        }
                    }
                }
                else
                {
                    linkText.Append(subDeed.Name);
                }

                return linkText.ToString();
            }
            finally
            {
                _stringBuilderPool.Return(linkText);
            }
        }

        private Person[] GetGiversTakersSubject(IField field)
        {
            switch (field.FieldIdent)
            {
                case F601_TransferringEnterprise.FieldIdentCode:
                    {
                        F601_TransferringEnterprise f = (F601_TransferringEnterprise)field;

                        return f.FieldOperation == FieldOperations.Erase ? null : new Person[] { f.Subject };
                    }
                case F602_AcquisitionEnterprises.FieldIdentCode:
                    {
                        F602_AcquisitionEnterprises f = (F602_AcquisitionEnterprises)field;

                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.AcquisitionEnterpriseList.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F702_TransformingCompanys.FieldIdentCode:
                    {
                        var f = (F702_TransformingCompanys)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.TransformingCompanyList.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F702a_TransformingCompanys2.FieldIdentCode:
                    {
                        var f = (F702a_TransformingCompanys2)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.TransformingCompany2List.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F702b_TransformingNPOs.FieldIdentCode:
                    {
                        var f = (F702b_TransformingNPOs)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.TransformingNPOList.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F703_Successors.FieldIdentCode:
                    {
                        var f = (F703_Successors)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.SuccessorList.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F802_ReorganizeCoOperatives.FieldIdentCode:
                    {
                        var f = (F802_ReorganizeCoOperatives)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.CoOperativeList.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F802a_ReorganizeCoOperatives2.FieldIdentCode:
                    {
                        var f = (F802a_ReorganizeCoOperatives2)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.CoOperative2List.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                case F803_Successors803.FieldIdentCode:
                    {
                        var f = (F803_Successors803)field;
                        var subjects = f.FieldOperation == FieldOperations.Erase ? null : f.SuccessorList.Where(el => el.RecordOperation != RecordOperations.Erase).Select(p => p.Subject);

                        return subjects != null && subjects.Any() ? subjects.ToArray() : null;
                    }
                default:
                    throw new NotSupportedException("field is not giver or taker");
            }
        }

        private void InitSubDeedName(ISubDeedSummary subDeed)
        {
            if (!string.IsNullOrEmpty(subDeed.Name) && subDeed.Name.Contains("{F_"))
            {
                var fieldIdents = System.Text.RegularExpressions.Regex.Split(subDeed.Name, "{F_").Where(item => item.Contains("}")).Select(item => item.Substring(0, item.IndexOf("}")));

                if (subDeed.Status == SubDeedStatuses.Closed && collabsableSubDeedTypes.ContainsKey(subDeed.SubUICType.Value))
                {
                    var subDeedTypeInfo = collabsableSubDeedTypes[subDeed.SubUICType.Value];

                    foreach (var fieldIdent in fieldIdents)
                    {
                        var fieldNameCode = LocalizationHelper.GetFieldNameCode(fieldIdent);
                        string fieldName = this.localizer[fieldNameCode];

                        if (subDeed.SubUICType == SubUICTypes.B6_Liquidation)
                        {
                            //ако раздела е в ликвидация, показваме само данните от първото поле! 

                            subDeed.Name = subDeed.Name.Replace("{F_" + fieldIdent + "}", fieldName.Substring(fieldName.IndexOf(". ") + 2));

                            if (subDeed.Name.Contains(", {F_"))
                            {
                                subDeed.Name = subDeed.Name.Substring(0, subDeed.Name.IndexOf(", {F_"));
                            }

                            break;
                        }
                        else
                        {
                            subDeed.Name = subDeed.Name.Replace("{F_" + fieldIdent + "}", fieldName == null ? fieldNameCode : fieldName.Substring(fieldName.IndexOf(". ") + 2));
                        }
                    }

                    subDeed.Name += " - " + (string.IsNullOrEmpty(subDeedTypeInfo.StatusClosedName) ? "" : this.localizer[subDeedTypeInfo.StatusClosedName]);
                }
                else
                {
                    foreach (var fieldIdent in fieldIdents)
                    {
                        var fieldNameCode = LocalizationHelper.GetFieldNameCode(fieldIdent);
                        string fieldName = this.localizer[fieldNameCode];

                        //TODO:Грешно да се ползват отделни ключове за имената без номер на полето.
                        subDeed.Name = subDeed.Name.Replace("{F_" + fieldIdent + "}", fieldName == null ? fieldNameCode : fieldName.Substring(fieldName.IndexOf(". ") + 2));
                    }
                }
            }
        }

        private List<object> GetFilteredDeedRepresentativeFields(List<object> fields, string ident)
        {
            var result = new List<object>();
            var hasIdent = !string.IsNullOrEmpty(ident);

            foreach (IField field in fields)
            {

                if (field.FieldIdent == F502_Liquidators.FieldIdentCode)
                {
                    result.Add(new F502_Liquidators()
                    {
                        LiquidatorList = ((F502_Liquidators)field).LiquidatorList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Subject.Indent == ident)).ToList()
                    });
                }
                else if (field.FieldIdent == F912_Trustees.FieldIdentCode)
                {
                    result.Add(new F912_Trustees()
                    {
                        TrusteeList = ((F912_Trustees)field).TrusteeList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Person.Indent == ident)).ToList()
                    });
                }
                else if (field.FieldIdent == F018_PhysicalPersonTrader.FieldIdentCode)
                {
                    if (!hasIdent || ((F018_PhysicalPersonTrader)field).Person.Indent == ident)
                        result.Add(field);
                }
                else if (field.FieldIdent == F010_Representatives.FieldIdentCode)
                {
                    result.Add(new F010_Representatives()
                    {
                        RepresentativeList = ((F010_Representatives)field).RepresentativeList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Person.Indent == ident)).ToList()
                    });
                }
                else if (field.FieldIdent == F0101_Representatives101.FieldIdentCode)
                {
                    result.Add(new F0101_Representatives101()
                    {
                        RepresentativeList = ((F0101_Representatives101)field).RepresentativeList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Subject.Indent == ident)).ToList()
                    });
                }
                else if (field.FieldIdent == F0102_Representatives102.FieldIdentCode)
                {
                    result.Add(new F0102_Representatives102()
                    {
                        RepresentativeList = ((F0102_Representatives102)field).RepresentativeList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Person.Indent == ident)).ToList()
                    });
                }
                else if (field.FieldIdent == F007_Managers.FieldIdentCode)
                {
                    result.Add(new F007_Managers()
                    {
                        ManagersList = ((F007_Managers)field).ManagersList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Person.Indent == ident)).ToList()
                    });
                }
                else if (field.FieldIdent == F009_ChairMan.FieldIdentCode)
                {
                    if (!hasIdent || ((F009_ChairMan)field).Person.Indent == ident)
                        result.Add(field);
                }
                else if (field.FieldIdent == F0103_Representatives103.FieldIdentCode)
                {
                    result.Add(new F0103_Representatives103()
                    {
                        RepresentativeList = ((F0103_Representatives103)field).RepresentativeList
                        .Where(el => el.RecordOperation != RecordOperations.Erase && (!hasIdent || el.Person.Indent == ident)).ToList()
                    });
                }
            }

            return result;
        }

        private List<string> GetRepresentativeFieldIdents(LegalForms? legalForm, CompanyNameSuffixFlags? companyNameSuffixFlags)
        {
            var fieldIdents = new List<string>();

            if (companyNameSuffixFlags == CompanyNameSuffixFlags.Liquidation)
            {
                fieldIdents.Add("05020");
            }
            else if (companyNameSuffixFlags == CompanyNameSuffixFlags.Insolvency
                || companyNameSuffixFlags == CompanyNameSuffixFlags.InsolvencySecIns
                || companyNameSuffixFlags == CompanyNameSuffixFlags.InsolvencyThirdIns)
            {
                fieldIdents.Add("09120");
            }
            else if (legalForm == LegalForms.ET)
            {
                fieldIdents.Add("00180");
            }
            else if (legalForm == LegalForms.SD || legalForm == LegalForms.KD || legalForm == LegalForms.AD || legalForm == LegalForms.KDA || legalForm == LegalForms.KCHT || legalForm == LegalForms.EAD
                || legalForm == LegalForms.IAD || legalForm == LegalForms.IEAD || legalForm == LegalForms.ED || legalForm == LegalForms.EKD || legalForm == LegalForms.LEKD || legalForm == LegalForms.BFLE)
            {
                fieldIdents.AddRange(new List<string>() { "00100", "00101", "00102" });
            }
            else if (legalForm == LegalForms.OOD || legalForm == LegalForms.TPP || legalForm == LegalForms.EOOD || legalForm == LegalForms.TPPD || legalForm == LegalForms.TPPO || legalForm == LegalForms.EUIE)
            {
                fieldIdents.Add("00070");
            }
            else if (legalForm == LegalForms.K)
            {
                fieldIdents.Add("00090");
            }
            else if (legalForm == LegalForms.ASSOC || legalForm == LegalForms.FOUND || legalForm == LegalForms.CC)
            {
                fieldIdents.Add("00103");
            }

            return fieldIdents;
        }

        #endregion

        #endregion
    }

    public class SectionGroupFieldComperer : IComparer<DomModels.Nomenclatures.SectionGroupField>
    {
        public int Compare([AllowNull] SectionGroupField x, [AllowNull] SectionGroupField y)
        {
            if ((x.GroupID == x.SectionID &&
               y.GroupID == y.SectionID) ||
               (x.GroupID != x.SectionID && string.IsNullOrEmpty(x.FieldIdent) &&
               y.GroupID != y.SectionID && string.IsNullOrEmpty(y.FieldIdent)) ||
               (x.GroupID != x.SectionID && !string.IsNullOrEmpty(x.FieldIdent) &&
               y.GroupID != y.SectionID && !string.IsNullOrEmpty(y.FieldIdent)))
            {
                return x.FieldOrder.CompareTo(y.FieldOrder);
            }

            if (x.GroupID == x.SectionID ||
                (x.GroupID != x.SectionID && y.GroupID != y.SectionID && string.IsNullOrEmpty(x.FieldIdent)))
            {
                return 1;
            }

            return -1;
        }
    }
}
