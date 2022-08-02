using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Nomenclatures;
using EPZEU.ServiceLimits.AspNetCore.Mvc;
using Integration.EPZEU.Models.Nomenclatures;
using Integration.EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Controllers
{
    /// <summary>
    /// Контролер реализиращ уеб услуга за работа с номенклатури.
    /// </summary>
    [Produces("application/json")]
    [ResponseCache(CacheProfileName= "Nomenclaturs")]
    [NoopServiceLimiter]
    public class NomenclaturesController : BaseApiController
    {
        //Обявени актове
        private const int ANNOUNCED_ACTS_GROUP_ID = 13;
        private const int GENERAL_INFORMATION = 414;

        /// <summary>
        /// Номенклатура FieldsGruopsSections
        /// </summary>
        private class FieldsGruopsSectionsResult
        {
            /// <summary>
            /// Полета.
            /// </summary>
            public IEnumerable<object> Fields { get; set; }

            /// <summary>
            /// Групи.
            /// </summary>
            public IEnumerable<object> Groups { get; set; }

            /// <summary>
            /// Секции.
            /// </summary>
            public IEnumerable<object> Sections { get; set; }
        }

        /// <summary>
        /// Операция за изчитане на Полета, Групи и Раздели по правна форма.
        /// </summary>
        /// <param name="legalForm">Правна форма.</param>
        /// <param name="excludeActs">Флаг указващ дали да изключи актовете.</param>
        /// <param name="getOnlyActs">Флаг указващ дали да вземе само актове.</param>
        /// <param name="legalFormFields">Интерфейс за работа с полета на правни форми.</param>
        /// <param name="sectionGroupFieldsService">Интерфейс за работа с раздели и групови полета.</param>
        /// <param name="stringLocalizer">Локализатор на стринг.</param>
        /// <returns></returns>
        [Route("FieldsGroupsSections")]
        [HttpGet]
        [ProducesResponseType(typeof(FieldsGruopsSectionsResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFieldsGruopsSectionsByLegalForm([FromQuery]int? legalForm, [FromQuery]bool? excludeActs, [FromQuery]bool? getOnlyActs,
            [FromServices]ILegalFormFields legalFormFields, [FromServices]ISectionGroupFields sectionGroupFieldsService, [FromServices]IStringLocalizer stringLocalizer)
        {
            await legalFormFields.EnsureLoadedAsync(CancellationToken.None);
            await sectionGroupFieldsService.EnsureLoadedAsync(CancellationToken.None);

            IEnumerable<LegalFormField> lfFields = legalForm == null ? legalFormFields.GetLegalFormFields() : legalFormFields.GetLegalFormFields().Where(lff => lff.LegalFormID == legalForm);
            IEnumerable<SectionGroupField> sectionGroupFields = lfFields.Select(lf => lf.FieldID).Distinct().Select(f => sectionGroupFieldsService.GetSectionGroupField(f));
        
            var fields = sectionGroupFields.Where(el => el.FieldIdent != null);

            var fieldsResult = fields.Select(f => new
            {
                Name = stringLocalizer[LocalizationHelper.GetFieldNameCode(f.FieldIdent)].Value,
                ID = f.FieldID,
                Order = f.FieldOrder,
                Code = f.FieldCode,
                ParentId = (string.Compare(f.FieldIdent, F001_UIC.FieldIdentCode, true) == 0 ? 415 : f.GroupID), //Issue TRIR-161	
                f.FieldIdent,
                f.IsAnnualActAnnouncement,
                f.IsDateNotifActAnnouncement
            }).OrderBy(x => x.FieldIdent);

            var sections = fields.Where(x => x.SectionID != 414 /*Премахваме секция "Обща информация" SectionID= 414 - Issue TRIR-161.*/ && getOnlyActs == true
            ? x.SectionID == ANNOUNCED_ACTS_GROUP_ID
            : excludeActs == true
                ? x.SectionID != GENERAL_INFORMATION && x.SectionID != ANNOUNCED_ACTS_GROUP_ID
                : x.SectionID != GENERAL_INFORMATION).Select(f => f.Section).Select(s => new
                {
                    Name = stringLocalizer[LocalizationHelper.GetSectionNameCode(s.FieldID.Value)].Value,
                    ID = s.FieldID,
                    Order = s.FieldOrder,
                    Code = s.FieldCode,
                    ParentId = (int?)null,
                    s.FieldIdent,
                    s.IsAnnualActAnnouncement,
                    s.IsDateNotifActAnnouncement
                }).Distinct().OrderBy(x => x.ID);

            var groups = fields.Select(f => f.Group).Select(g => new
            {
                Name = stringLocalizer[LocalizationHelper.GetGroupNameCode(g.FieldID.Value)].Value,
                ID = g.FieldID,
                Order = g.FieldOrder,
                Code = g.FieldCode,
                ParentId = g.SectionID,
                g.FieldIdent,
                g.IsAnnualActAnnouncement,
                g.IsDateNotifActAnnouncement
            }).Distinct().OrderBy(x => x.ID);

            return Ok(new FieldsGruopsSectionsResult () { Fields = fieldsResult, Groups = groups, Sections = sections });
        }
    }
}