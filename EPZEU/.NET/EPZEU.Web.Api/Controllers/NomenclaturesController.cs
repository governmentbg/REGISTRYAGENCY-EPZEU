using EPZEU.Nomenclatures;
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
    /// Контролер реализиращ уеб услуга за работа с номенклатури.
    /// Методите връщат ObjectResultWithETag, като резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана,
    /// защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!
    /// </summary>
    [Produces("application/json")]
    [ResponseCache(CacheProfileName = "Nomenclaturs")]
    [ApiParameter(Name = "If-None-Match", Type = typeof(string), Source = "header")]
    [ProducesResponseType(StatusCodes.Status304NotModified)]
    public class NomenclaturesController : BaseApiController
    {
        /// <summary>
        /// Операция за изчитане на номенклатурата за държави.
        /// </summary>
        /// <param name="countries">Интерфейс за работа с номенклатурата за държави</param>
        /// <returns>Номенклатури за държави.</returns>
        [HttpGet]
        [Route("countries")]
        [ProducesResponseType(typeof(IEnumerable<Country>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCountries([FromServices] Integration.EPZEU.Nomenclatures.ICountries countries)
        {
            await countries.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(countries.GetCountries(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за ЕКАТТЕ.
        /// </summary>
        /// <param name="ekatteType">тип на екате</param>
        /// <param name="ekatte">Интерфейс за работа с номенклатурата за ЕКАТТЕ</param>
        /// <returns>Номенклатура за ЕКАТТЕ.</returns>
        [HttpGet]
        [Route("ekatte/{ekatteType?}")]
        [ProducesResponseType(typeof(IEnumerable<Ekatte>), StatusCodes.Status200OK )]
        public async Task<IActionResult> GetEkatte(string ekatteType, [FromServices] Integration.EPZEU.Nomenclatures.IEkatte ekatte)
        {
            await ekatte.EnsureLoadedAsync(CancellationToken.None);

            if (string.IsNullOrEmpty(ekatteType))
                return LoadEkatteFull(ekatte);

            if (!Enum.TryParse(ekatteType, true, out EkatteTypes ekatteTypes))
                throw new InvalidOperationException();

            return LoadEkatte(ekatte, ekatteTypes);
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за НКИД.
        /// </summary>
        /// <param name="NKID">Интерфейс за работа с номенклатурата за НКИД</param>
        /// <returns>Номенклатура НКИД.</returns>
        [HttpGet]
        [Route("nkid")]
        [ProducesResponseType(typeof(IEnumerable<NKID>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetNKID([FromServices] Integration.EPZEU.Nomenclatures.INKID NKID)
        {
            await NKID.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(NKID.GetNKID(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        #region Labels

        /// <summary>
        /// Операция за изчитане на номенклатурата за етикети на ресурси.
        /// </summary>
        /// <param name="lang">Език за локализация.</param>
        /// <param name="prefixes">Префикси на кодове.</param>
        /// <param name="labels">Интерфейс за работа с етикети.</param>
        /// <returns>Номенклатура за етикети.</returns>
        [HttpGet]
        [Route("Labels/{lang?}")]
        [ProducesResponseType(typeof(IDictionary<string, string>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLabels(string lang, [FromQuery] string prefixes, [FromServices]ILabels labels)
        {
            if (string.IsNullOrEmpty(lang))
                lang = HttpContext.GetLanguage();

            await labels.EnsureLoadedAsync(lang);
            var cachedResources = labels.GetLabels(lang, out DateTime? lastModifiedDate);

            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(() =>
            {
                if (string.IsNullOrEmpty(prefixes))
                {
                    return cachedResources;
                }
                else
                {
                    var prefixesList = prefixes.Split(',');

                    return cachedResources.Where((item) => { return prefixesList.Any((prefix) => { return item.Key.StartsWith(prefix); }); })
                        .ToDictionary((item) => { return item.Key; }, (item) => { return item.Value; });
                }

            }, lastModifiedDate.Value.FormatForETag());
        }

        #endregion

        #region Languages

        /// <summary>
        /// Операция за изчитане на номенклатурата за езици за локализация.
        /// </summary>
        /// <param name="languages">Интерфейс за работа с езици за локализация.</param>
        /// <returns>Номенклатура на езици за локализация.</returns>
        [HttpGet]
        [Route("Languages")]
        [ProducesResponseType(typeof(IEnumerable<Language>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetLanguage([FromServices]ILanguages languages)
        {
            await languages.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(languages.GetLanguages(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        #endregion

        /// <summary>
        /// Операция за изчитане на номенклатурата за услуги.
        /// </summary>
        /// <param name="lang">Език за локализация.</param>
        /// <param name="registerID">Идентификатор на регистър.</param>
        /// <param name="services">Интерфейс за работа с номенклатурата на услугите.</param>
        /// <param name="languages">Интерфейс за работа с номенклатурата на езиците за локализация.</param>
        /// <returns>Номенклатура за услуги.</returns>
        [HttpGet]
        [Route("Services/{lang?}")]
        [ProducesResponseType(typeof(IEnumerable<Service>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetServices(string lang, Registers? registerID, [FromServices] IServices services, [FromServices] ILanguages languages)
        {
            if (string.IsNullOrEmpty(lang))
                lang = HttpContext.GetLanguage();

            await services.EnsureLoadedAsync(lang);

            var data = services.GetServices(string.IsNullOrEmpty(lang) ? languages.GetDefaultLanguage().Code : lang, out DateTime? lastModifiedDate);

            object result = null;

            if (registerID.HasValue)
            {
                result = data.Where(service => service.RegisterID == registerID);
            }
            else
            {
                result = data;
            }

            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(result, lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за власти.
        /// </summary>
        /// <param name="firmCourt">Флаг фирмено дело.</param>
        /// <param name="authorityTypes">Тип власти</param>
        /// <param name="authorities">Интерфейс за работа с номенклатурата за власти</param>
        /// <returns>Номенклатурата за власти.</returns>
        [HttpGet]
        [Route("Authorities")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Nomenclatures.Authority>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAuthorities(bool? firmCourt, int?[] authorityTypes, [FromServices]Integration.EPZEU.Nomenclatures.IAuthorities authorities)
        {
            await authorities.EnsureLoadedAsync(CancellationToken.None);

            IEnumerable<Integration.EPZEU.Models.Nomenclatures.Authority> data = authorities.GetAuthorities(out DateTime? lastModifiedDate);

            if (firmCourt != null)
            {
                var firmCourtValue = firmCourt == true ? "Y" : "N";
                data = data.Where(authority => authority.FirmCourt == firmCourtValue);
            }

            if (authorityTypes != null && authorityTypes.Length > 0)
            {
                data = data.Where(authority => authorityTypes.Contains(authority.AuthorityType));
            }


            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(data, lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за правни форми.
        /// </summary>
        /// <returns>Номенклатурата за правни форми.</returns>
        [HttpGet]
        [Route("LegalForms")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Nomenclatures.LegalForm>), StatusCodes.Status200OK)] 
        public async Task<IActionResult> GetLegalForms([FromServices] Integration.EPZEU.Nomenclatures.ILegalForms legalForms)
        {
            await legalForms.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(legalForms.GetLegalForms(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за видове заявления.
        /// </summary>
        /// <param name="lang">Език за локализация.</param>
        /// <param name="registerID">Идентификатор на регистър.</param>
        /// <param name="applicationTypes">Интерфейс за работа с номенклатурата на видове заявления.</param>
        /// <returns>Номенклатурата на видове заявления.</returns>
        [HttpGet]
        [Route("ApplicationTypes/{lang?}")]
        [ProducesResponseType(typeof(IEnumerable<ApplicationType>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationTypes(string lang, Registers? registerID, [FromServices]IApplicationTypes applicationTypes)
        {
            if (string.IsNullOrEmpty(lang))
                lang = HttpContext.GetLanguage();

            await applicationTypes.EnsureLoadedAsync(lang);
            return new ObjectResultWithETag(applicationTypes.GetApplicationTypes(lang, registerID, out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за видове документи.
        /// </summary>
        /// <param name="register">Тип на регистъра</param>
        /// <param name="applicationDocumentTypes">Интерфейс за работа с видове документи за заявления</param>
        /// <param name="prDocumentTypes">Интерфейс за работа с видове документи за Имотен Регистър</param>
        /// <returns>Номенклатурата за видове документи.</returns>
        [HttpGet]
        [Route("DocTypes")]
        [ProducesResponseType(typeof(IEnumerable<DocumentType>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentTypes(Registers? register,
            [FromServices] Integration.EPZEU.Nomenclatures.IApplicationDocumentTypes applicationDocumentTypes,
            [FromServices] PropertyRegister.Integration.Nomenclatures.IDocumentTypes prDocumentTypes)
        {
            List<DocumentType> res = new List<DocumentType>();

            DateTime lastModified = DateTime.MinValue;

            #region CR document types 

            if (register == Registers.CR || register == null)
            {
                await applicationDocumentTypes.EnsureLoadedAsync(CancellationToken.None);

                IEnumerable<Integration.EPZEU.Models.Nomenclatures.DocumentType> docTypes = null;

                docTypes = applicationDocumentTypes.GetDocumentTypes(out lastModified);

                res = docTypes.Select(dt => new DocumentType()
                {
                    DocumentTypeID = dt.DocumentTypeID,
                    Name = dt.Name,
                    IsRefusalAttachable = dt.IsRefusalAttachable,
                    ParentID = dt.ParentID,
                }).ToList();

            }
            #endregion

            #region PR document types 
            if (register == Registers.PR || register == null)
            {
                await prDocumentTypes.EnsureLoadedAsync(CancellationToken.None);

                DateTime? lastModifiedPR = DateTime.Now;
                res.AddRange(prDocumentTypes.GetDocumentTypes(out lastModifiedPR).Select(dt => new DocumentType
                {
                    DocumentTypeID = dt.Id,
                    Name = dt.Name,
                    IsRefusalAttachable = false,
                    ParentID = null
                }));

                if (lastModified > DateTime.MinValue)
                {
                    lastModified = DateTime.Compare(lastModified, lastModifiedPR.Value) < 0 ? lastModifiedPR.Value : lastModified;
                }
                else
                {
                    lastModified = lastModifiedPR.Value;
                }
            }
            #endregion

            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(res, lastModified.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за приложни документи към конкретно заявление.
        /// </summary>
        /// <param name="appType">Вид заявление.</param>
        /// <param name="register">Идентификатор на регистър.</param>
        /// <param name="applicationDocumentTypesCR">Интерфейс за работа с документи за ТР</param>
        /// <param name="applicationDocumentTypesPR">Интерфейс за работа с документи за ИР</param>
        /// <returns>Номенклатурата за приложни документи към конкретно заявление.</returns>
        [HttpGet]
        [Route("ApplicationDocTypes/{appType?}")]
        [ProducesResponseType(typeof(IEnumerable<ApplicationDocumentType>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetApplicationDocumentTypes(string appType, [FromQuery]Registers? register,
            [FromServices] Integration.EPZEU.Nomenclatures.IApplicationDocumentTypes applicationDocumentTypesCR,
            [FromServices] PropertyRegister.Integration.Nomenclatures.IApplicationDocumentTypes applicationDocumentTypesPR)
        {
            //TODO: Read By register
            List<ApplicationDocumentType> res = new List<ApplicationDocumentType>();

            DateTime lastModified = DateTime.Now;

            if (register == Registers.CR || register == null)
            {
                await applicationDocumentTypesCR.EnsureLoadedAsync(CancellationToken.None);

                IEnumerable<Integration.EPZEU.Models.Nomenclatures.ApplicationDocumentType> appDocTypes = null;

                if (!string.IsNullOrEmpty(appType))
                    appDocTypes = applicationDocumentTypesCR.GetApplicationDocumentTypes(appType, out lastModified);
                else
                    appDocTypes = applicationDocumentTypesCR.GetApplicationDocumentTypes(out lastModified);

                res = appDocTypes.Select(ad => new ApplicationDocumentType()
                {
                    ApplicationTypeID = ad.AppType,
                    DocumentTypeID = ad.DocumentTypeID,
                    IsNew = ad.IsNew,
                    IsForChange = ad.IsForChange,
                    IsForPreregistration = ad.IsForPreregistration,
                    IsPublicVisible = ad.IsPublicVisible,
                    IsScannedDocument = ad.IsScannedDocument,
                    Register = Registers.CR,
                    MinOccurs = ad.MinOccurs,
                    MaxOccurs = ad.MaxOccurs,
                    DocumentName = ad.DocumentName
                }).ToList();
            }

            if (register == Registers.PR || register == null)
            {
                await applicationDocumentTypesPR.EnsureLoadedAsync(CancellationToken.None);

                DateTime? lastModifiedPR = DateTime.Now;
                var appDocTypesPR = applicationDocumentTypesPR.GetApplicationDocumentTypes(out lastModifiedPR);
                if (register == null)
                {
                    lastModified = DateTime.Compare(lastModified, lastModifiedPR.Value) < 0 ? lastModifiedPR.Value : lastModified;
                }

                res = appDocTypesPR.Select(ad => new ApplicationDocumentType
                {
                    ApplicationTypeID = ad.ApplicationTypeId,
                    DocumentTypeID = ad.DocumentId,
                    IsNew = null,
                    IsForChange = null,
                    IsForPreregistration = null,
                    IsPublicVisible = null,
                    IsScannedDocument = null,
                    Register = Registers.PR,
                    MinOccurs = 0,
                    MaxOccurs = -1
                }).ToList();
            }
            /*резултата ТРЯБВА да бъде LINQ заявка, която да не е материализирана, 
             * защото в повечето случаи няма да трябва да се изпълнява. Ще се връща 304!*/
            return new ObjectResultWithETag(res, lastModified.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за активни полета на шаблон за документ.
        /// </summary>
        /// <param name="documentTemplates">Интерфейс за работа с номенклатурата на документни шаблони.</param>
        /// <returns>Номенклатурата за активни полета на шаблон за документ.</returns>
        [HttpGet]
        [Route("DocTemplateFields")]
        [ProducesResponseType(typeof(IEnumerable<DocumentTemplateField>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentTemplateFields([FromServices]IDocumentTemplates documentTemplates)
        {
            if (documentTemplates is null)
            {
                throw new ArgumentNullException(nameof(documentTemplates));
            }

            await documentTemplates.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(documentTemplates.GetDocumentTemplateFields(out DateTime? lastModifiedData), lastModifiedData.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за документни шаблони.
        /// </summary>
        /// <param name="documentTemplates">Интерфейс за работа с номенклатурата на документни шаблони.</param>
        /// <returns>Номенклатурата за документни шаблони.</returns>
        [HttpGet]
        [Route("DocTemplates")]
        [ProducesResponseType(typeof(IEnumerable<DocumentTemplate>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentTemplates([FromServices]IDocumentTemplates documentTemplates)
        {
            await documentTemplates.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(documentTemplates.GetDocumentTemplates(out DateTime? lastModifiedData), lastModifiedData.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за съдържание на документен шаблон.
        /// </summary>
        /// <param name="docTemplateID">Идентификатор на документен шаблон.</param>
        /// <param name="documentTemplates">Интерфейс за работа с номенклатурата на документни шаблони.</param>
        /// <returns>Съдържание на документен шаблон.</returns>
        [HttpGet]
        [Route("DocTemplates/{docTemplateID}/Content")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDocumentTemplatesContent(int docTemplateID, [FromServices]IDocumentTemplates documentTemplates)
        {
            await documentTemplates.EnsureLoadedDocumentTemplatesContentsAsync(docTemplateID);

            return new ObjectResultWithETag(documentTemplates.GetDocumentTemplateContent(docTemplateID, out DateTime? lastModifiedData), lastModifiedData.Value.FormatForETag());
        }

        #region ForeignComRegisters

        /// <summary>
        /// Операция за изчитане на номенклатурата за чуждестранни правни форми.
        /// </summary>
        /// <param name="foreignLegalForms">Интерфейс за работа с номенклатура на чуждестранни правни форми.</param>
        /// <returns>Номенклатурата за чуждестранни правни форми.</returns>
        [HttpGet]
        [Route("ForeignLegalForms")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Nomenclatures.ForeignLegalForm>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetForeignLegalForms([FromServices] Integration.EPZEU.Nomenclatures.IForeignLegalForms foreignLegalForms)
        {
            await foreignLegalForms.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(foreignLegalForms.GetForeignLegalForms(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        /// <summary>
        /// Операция за изчитане на номенклатурата за чуждестранни търговски регистри.
        /// </summary>
        /// <param name="foreignComRegisters">Интерфейс за работа с номенклатура с чуждестранни търговски регистри.</param>
        /// <returns>Номенклатурата за чуждестранни търговски регистри.</returns>
        [HttpGet]
        [Route("ForeignComRegisters")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Nomenclatures.ForeignComRegister>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetForeignComRegisters([FromServices] Integration.EPZEU.Nomenclatures.IForeignComRegisters foreignComRegisters)
        {
            await foreignComRegisters.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(foreignComRegisters.GetForeignComRegisters(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        #endregion

        #region ReleaseReasons

        /// <summary>
        /// Операция за изчитане на номенклатурата за причини за издаване.
        /// </summary>
        /// <param name="releaseReasons">Интерфейс за работа с номенклатура на причини за издаване.</param>
        /// <returns>Номенклатурата за причини за издаване.</returns>
        [HttpGet]
        [Route("ReleaseReasons")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Nomenclatures.ReleaseReason>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetReleaseReasons([FromServices]Integration.EPZEU.Nomenclatures.IReleaseReasons releaseReasons)
        {
            await releaseReasons.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(releaseReasons.GetReleaseReasons(out DateTime? lastModifiedDate).Where(x => x.IsActive == "1"), lastModifiedDate.Value.FormatForETag());
        }

        #endregion

        #region Acts

        /// <summary>
        /// Операция за изчитане на номенклатурата за актове.
        /// </summary>
        /// <param name="actsService">Интерфейс за работа с актове.</param>
        /// <returns>Номенклатурата за актове.</returns>
        [HttpGet]
        [Route("Acts")]
        [ProducesResponseType(typeof(IEnumerable<Integration.EPZEU.Models.Nomenclatures.Act>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActs([FromServices]Integration.EPZEU.Nomenclatures.IActs actsService)
        {
            await actsService.EnsureLoadedAsync(CancellationToken.None);

            return new ObjectResultWithETag(actsService.GetActs(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
        }

        #endregion

        #region SpecialAccessUserTypes

        /// <summary>
        /// Операция за изчитане на номенклатурата за видовете потребители със специален достъп.
        /// </summary>
        /// <param name="specialAccessUserTypes">ОИнтерфейс за работа с номенклатурата за видовете потребители със специален достъп.</param>
        /// <returns>Номенклатура за видовете потребители със специален достъп.</returns>
        [HttpGet]
        [Route("SpecialAccessUserTypes")]
        [ProducesResponseType(typeof(IEnumerable<SpecialAccessUserType>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSpecialAccessUserTypes([FromServices]ISpecialAccessUserTypes specialAccessUserTypes)
        {
            await specialAccessUserTypes.EnsureLoadedAsync(CancellationToken.None);
            ObjectResultWithETag objectResultWithETag = new ObjectResultWithETag(specialAccessUserTypes.GetSpecialAccessUserTypes(out DateTime? lastModifiedDate), lastModifiedDate.Value.FormatForETag());
            return objectResultWithETag;
        }


        #endregion

        private static IActionResult LoadEkatteFull(Integration.EPZEU.Nomenclatures.IEkatte ekatte)
        {
            var n_districts = ekatte.GetDistricts(out DateTime? lastDateModified);
            var n_munis = ekatte.GetMunicipalities();
            var n_settlements = ekatte.GetSettlements();
            var n_areas = ekatte.GetAreas();

            var settlements = n_settlements.Select(s => new Settlement()
            {
                ID = s.ID,
                EkatteCode = s.EkatteCode,
                Name = s.Name,
                MunicipalityID = s.MunicipalityID,
                Areas = n_areas.Where(a => a.SettlementID == s.ID).Select(a => new Area()
                {
                    ID = a.ID,
                    EkatteCode = a.EkatteCode,
                    Name = a.Name,
                    SettlementID = a.SettlementID
                }).ToList()
            }).ToList();

            var municipalities = n_munis.Select(s => new Municipality()
            {
                ID = s.ID,
                EkatteCode = s.EkatteCode,
                Name = s.Name,
                DistrictID = s.DistrictID,
                Settlements = settlements.Where(a => a.MunicipalityID == s.ID).ToList()
            }).ToList();

            var districts = n_districts.Select(s => new District()
            {
                ID = s.ID,
                EkatteCode = s.EkatteCode,
                Name = s.Name,
                Municipalities = municipalities.Where(a => a.DistrictID == s.ID).ToList()
            }).ToList();

            return new ObjectResultWithETag(districts, lastDateModified.Value.FormatForETag());
        }

        private static IActionResult LoadEkatte(Integration.EPZEU.Nomenclatures.IEkatte ekatte, EkatteTypes ekatteTypes)
        {
            DateTime? lastDateModified = null;
            object data = null;

            switch (ekatteTypes)
            {
                case EkatteTypes.District:

                    data = ekatte.GetDistricts(out lastDateModified);
                    break;
                case EkatteTypes.Municipality:

                    data = ekatte.GetMunicipalities(out lastDateModified);
                    break;

                case EkatteTypes.Settlement:

                    data = ekatte.GetSettlements(out lastDateModified);
                    break;

                case EkatteTypes.Area:

                    data = ekatte.GetAreas(out lastDateModified);
                    break;

                default:
                    throw new InvalidOperationException();
            }

            return new ObjectResultWithETag(data, lastDateModified.Value.FormatForETag());
        }
    }

    public enum EkatteTypes
    {
        District,
        Municipality,
        Settlement,
        Area
    }
}