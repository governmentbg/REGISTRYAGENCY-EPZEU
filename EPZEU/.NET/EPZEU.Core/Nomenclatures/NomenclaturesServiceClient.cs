using EPZEU.CMS.Models;
using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures
{
    public struct NomenclatureResult<T>
    {
        public NomenclatureResult(T data, DateTime? modifiedData)
        {
            Data = data;
            ModifiedDate = modifiedData;
        }

        public readonly T Data;
        public readonly DateTime? ModifiedDate;
    }

    /// <summary>
    /// Интерфейс на http клиент за работа с номенклатури.
    /// </summary>
    public interface INomenclaturesServiceClient
    {
        /// <summary>
        /// Зарежда номенклатурата с държавите.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Country>>> LoadCountriesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с класификатор на икономически дейности.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<NKID>>> LoadNKIDAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с областите.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<District>>> LoadDistrictsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с общините.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Municipality>>> LoadMunicipaliesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с населените места.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Settlement>>> LoadSettlementsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с районите.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Area>>> LoadAreasAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с ресурсите.
        /// </summary>
        Task<NomenclatureResult<Dictionary<string, string>>> LoadLabelsAsync(string languageCode, string prefixes, DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с езиците.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Language>>> LoadLanguagesAsync(string key, DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с видовете потребители със специален достъп.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<SpecialAccessUserType>>> LoadSpecialAccessUserTypesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);


        /// <summary>
        /// Зарежда номенклатурата със съдилищата/власт.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Authority>>> LoadAuthoritiesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с услугите.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Models.Service>>> LoadServicesAsync(string languageCode, short? registerID, DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с типовеете заявления.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Models.ApplicationType>>> LoadApplicationTypesAsync(string languageCode, short? registerID, DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата със типовете документи на приложението.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Models.ApplicationDocumentType>>> LoadApplicationDocumentTypeAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken, Registers? register = null);

        /// <summary>
        /// Зарежда номенклатурата със типовете документи.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Models.DocumentType>>> LoadDocumentTypeAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken, Registers? register = null);

        /// <summary>
        /// Зарежда номенклатурата с шаблоните на документите.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Models.DocumentTemplate>>> LoadDocumentTemplatesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата с активни полета за шаблон.
        /// </summary>
        Task<NomenclatureResult<IEnumerable<Models.DocumentTemplateField>>> LoadDocumentTemplateFieldsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        /// <summary>
        /// Зарежда номенклатурата със съдържанието на шаблоните на документа.
        /// </summary>
        Task<NomenclatureResult<string>> LoadDocumentTemplateContentAsync(int? docTemplateID, DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        Task<NomenclatureResult<IEnumerable<LegalForm>>> LoadLegalFormsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        Task<NomenclatureResult<IEnumerable<ForeignLegalForm>>> LoadForeignLegalFormsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        Task<NomenclatureResult<IEnumerable<ForeignComRegister>>> LoadForeignComRegistersAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        Task<NomenclatureResult<IEnumerable<Act>>> LoadActsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);

        Task<NomenclatureResult<IEnumerable<ReleaseReason>>> LoadReleaseReasonsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс INomenclaturesServiceClient за работа с номенклатури.
    /// </summary>
    public class NomenclaturesServiceClient : INomenclaturesServiceClient
    {
        private readonly HttpClient _client;

        public NomenclaturesServiceClient(HttpClient client) => 
            _client = client ?? throw new ArgumentNullException("client");

        public Task<NomenclatureResult<IEnumerable<Country>>> LoadCountriesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Country>("nomenclatures/countries", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<NKID>>> LoadNKIDAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<NKID>("nomenclatures/nkid", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<District>>> LoadDistrictsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<District>("nomenclatures/ekatte/district", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Municipality>>> LoadMunicipaliesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Municipality>("nomenclatures/ekatte/municipality", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Settlement>>> LoadSettlementsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Settlement>("nomenclatures/ekatte/settlement", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<StaticPage>>> LoadStaticPagesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadNomAsync<IEnumerable<StaticPage>>("nomenclatures/staticPages", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Area>>> LoadAreasAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Area>("nomenclatures/ekatte/area", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<Dictionary<string, string>>> LoadLabelsAsync(string languageCode, string prefixes, DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            string uri = "nomenclatures/labels/"
                    + (string.IsNullOrEmpty(languageCode) ? "bg" : languageCode)
                    + (string.IsNullOrEmpty(prefixes) ? "" : ("?prefixes=" + prefixes));

            return LoadNomAsync<Dictionary<string, string>>(uri, loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Language>>> LoadLanguagesAsync(string key, DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Language>("nomenclatures/languages/" + key, loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<SpecialAccessUserType>>> LoadSpecialAccessUserTypesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<SpecialAccessUserType>("nomenclatures/SpecialAccessUserTypes/", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Authority>>> LoadAuthoritiesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Authority>("nomenclatures/authorities", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Models.Service>>> LoadServicesAsync(string languageCode, short? registerID, DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            string uri = "nomenclatures/services/" + languageCode
                    + (registerID.HasValue ? ("registerid=" + registerID.Value) : "");

            return LoadEnumerableNomAsync<Models.Service>(uri, loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<ApplicationType>>> LoadApplicationTypesAsync(string languageCode, short? registerID, DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            string uri = "nomenclatures/ApplicationTypes/" + languageCode
                    + (registerID.HasValue ? ("registerid=" + registerID.Value) : "");

            return LoadEnumerableNomAsync<Models.ApplicationType>(uri, loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<ApplicationDocumentType>>> LoadApplicationDocumentTypeAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken, Registers? register = null)
        {
            string queryString = register.HasValue ? ("?register=" + register.Value) : "";

            return LoadEnumerableNomAsync<ApplicationDocumentType>(string.Format("{0}{1}", "nomenclatures/ApplicationDocTypes", queryString), loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<DocumentType>>> LoadDocumentTypeAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken, Registers? register = null)
        {
            string queryString = register.HasValue ? ("?register=" + register.Value) : "";

            return LoadEnumerableNomAsync<DocumentType>(string.Format("{0}{1}", "nomenclatures/DocTypes", queryString), loadIfModifiedSince, cancellationToken);
        }

        private Task<NomenclatureResult<IEnumerable<T>>> LoadEnumerableNomAsync<T>(string uri, DateTime? ifNoneMatch, CancellationToken cancellationToken)
        {
            return LoadNomAsync<IEnumerable<T>>(uri, ifNoneMatch, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<DocumentTemplate>>> LoadDocumentTemplatesAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<DocumentTemplate>("nomenclatures/DocTemplates", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<DocumentTemplateField>>> LoadDocumentTemplateFieldsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<DocumentTemplateField>("nomenclatures/DocTemplateFields", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<string>> LoadDocumentTemplateContentAsync(int? docTemplateID, DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadNomAsync<string>(string.Format("nomenclatures/DocTemplates/{0}/Content", docTemplateID), loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<LegalForm>>> LoadLegalFormsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<LegalForm>("nomenclatures/LegalForms", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<ForeignLegalForm>>> LoadForeignLegalFormsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<ForeignLegalForm>("nomenclatures/ForeignLegalForms", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<ForeignComRegister>>> LoadForeignComRegistersAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<ForeignComRegister>("nomenclatures/ForeignComRegisters", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<Act>>> LoadActsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<Act>("nomenclatures/Acts", loadIfModifiedSince, cancellationToken);
        }

        public Task<NomenclatureResult<IEnumerable<ReleaseReason>>> LoadReleaseReasonsAsync(DateTime? loadIfModifiedSince, CancellationToken cancellationToken)
        {
            return LoadEnumerableNomAsync<ReleaseReason>("nomenclatures/ReleaseReasons", loadIfModifiedSince, cancellationToken);
        }

        private async Task<NomenclatureResult<T>> LoadNomAsync<T>(string uri, DateTime? ifNoneMatch, CancellationToken cancellationToken)
        {
            var result = await _client.GetWithIfNoneMatchAsync<T>(uri, ifNoneMatch, cancellationToken);

            return new NomenclatureResult<T>(result.Data, result.ModifiedDate);
        }
    }
}
