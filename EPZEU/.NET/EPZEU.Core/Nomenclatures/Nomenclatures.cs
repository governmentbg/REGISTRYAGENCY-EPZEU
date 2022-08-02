using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures
{
    public interface ILoadable
    {
        ValueTask EnsureLoadedAsync(CancellationToken cancellationToken);
    }

    /// <summary>
    /// Интерфейс за работа със власт/съдилища.
    /// </summary>
    public interface IAuthorities : ILoadable
    {
        /// <summary>
        /// Вземане на всичките власт/съдилища.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Authority> GetAuthorities();

        /// <summary>
        /// Вземане на всичките власт/съдилища.
        /// </summary>
        /// <param name="lastDateModified">Вземане на всичките съдилища по дата на последна промяна.</param>
        /// <returns></returns>
        IEnumerable<Authority> GetAuthorities(out DateTime? lastDateModified);

        Authority GetAuthorityById(int id);

        Authority GetAuthorityByCourtCode(string code);
    }

    /// <summary>
    /// Номенклатура НКИД.
    /// </summary>
    public interface INKID : ILoadable
    {
        IEnumerable<NKID> GetNKID(out DateTime? lastDateModified);
    }

    /// <summary>
    /// Номеннклатура на правните форми.
    /// </summary>
    public interface ILegalForms : ILoadable
    {
        LegalForm GetLegalForm(int ID);

        IEnumerable<LegalForm> GetLegalForms();

        IEnumerable<LegalForm> GetLegalForms(out DateTime? lastDateModified);
    }

    /// <summary>
    /// Номенклатура на чуждестранните правни формни на търговците по БРИС.
    /// </summary>
    public interface IForeignLegalForms : ILoadable
    {
        ForeignLegalForm GetForeignLegalForm(string code);
        IEnumerable<ForeignLegalForm> GetForeignLegalForms();
        IEnumerable<ForeignLegalForm> GetForeignLegalForms(out DateTime? lastDateModified);
    }

    /// <summary>
    /// Номенклатура на чуждестранните регистри на търговците по БРИС.
    /// </summary>
    public interface IForeignComRegisters : ILoadable
    {
        ForeignComRegister GetForeignComRegister(string code);
        IEnumerable<ForeignComRegister> GetForeignComRegisters();
        IEnumerable<ForeignComRegister> GetForeignComRegisters(out DateTime? lastDateModified);
    }

    /// <summary>
    /// Номенклатура на актовете.
    /// </summary>
    public interface IActs : ILoadable
    {
        IEnumerable<Act> GetActs(out DateTime? lastDateModified);
    }

    /// <summary>
    /// Номенклатура на причините за освобождаване.
    /// </summary>
    public interface IReleaseReasons : ILoadable
    {
        ReleaseReason GetReleaseReason(int reasonID);
        IEnumerable<ReleaseReason> GetReleaseReasons();
        IEnumerable<ReleaseReason> GetReleaseReasons(out DateTime? lastDateModified);
    }

    /// <summary>
    /// Интерфейс за работа с етикети.
    /// </summary>
    public interface ILabels : ILoadable
    {
        /// <summary>
        /// Метод за достигане на ресурс по даден език.
        /// </summary>
        /// <param name="lang">Език, на който да бъдат върнати ресурсите.</param>
        /// <param name="labelCode">Код на етикета.</param>
        /// <returns>Връща ресурс по даден език и код на етикет.</returns>
        string GetLabel(string lang, string labelCode);

        /// <summary>
        /// Метод за достигане на всички ресурси по даден език.
        /// </summary>
        /// <param name="lang">Език, за който да бъдат върнати всички ресурси.</param>
        /// <returns>Връща всички ресурси</returns>
        IDictionary<string, string> GetLabels(string lang, out DateTime? lastModifiedDate);

        ValueTask EnsureLoadedAsync(string lang);
    }

    /// <summary>
    /// Интерфейс за работа с кеш на номеклатура на езиците.
    /// </summary>
    public interface ILanguages : ILoadable
    { 
        /// <summary>
        /// Взимане на даден език по код.
        /// </summary>
        /// <param name="code">Код по който да бъде върнат даден език.</param>
        /// <returns>Език</returns>
        Models.Language GetLanguage(string code);

        /// <summary>
        /// Връща всички езици от кеша.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Models.Language> GetLanguages();

        /// <summary>
        /// Връща всички езици.
        /// </summary>
        IEnumerable<Models.Language> GetLanguages(out DateTime? lastModifiedDate);

        /// <summary>
        /// Връша езикът по подразбиране.
        /// </summary>
        /// <returns></returns>
        Models.Language GetDefaultLanguage();
    }

    /// <summary>
    /// Интерфейс за работа с видове потребители със специален достъп.
    /// </summary>
    public interface ISpecialAccessUserTypes : ILoadable
    {

        /// <summary>
        /// Метод за достигане на всички видове потребители със специален достъп.
        /// </summary>
        /// <returns>Връща всички ресурси</returns>
        IEnumerable<SpecialAccessUserType> GetSpecialAccessUserTypes(out DateTime? lastModifiedDate);
    }

    public static class NomenclaturesExtensions
    {
        public static Models.Language GetLanguageOrDefault(this ILanguages languages, string code)
        {
            var language = languages.GetLanguage(code);

            if (language == null)
                language = languages.GetDefaultLanguage();

            return language;
        }
    }

    /// <summary>
    /// Интерфейс за работа със държави.
    /// </summary>
    public interface ICountries : ILoadable
    {
        /// <summary>
        /// Връща обект с данни за държавата България.
        /// </summary>
        Models.Country GetBGCountry();

        /// <summary>
        /// Връща всички държави.
        /// </summary>
        IEnumerable<Models.Country> GetCountries();

        /// <summary>
        /// Връща всички езици
        /// </summary>
        /// <param name="lastModifiedDate"></param>
        IEnumerable<Models.Country> GetCountries(out DateTime? lastModifiedDate);
    }

    /// <summary>
    /// Интерфейс за работа с типове на приложението.
    /// </summary>
    public interface IApplicationTypes : ILoadable
    {
        /// <summary>
        /// Връша всичките типове на приложението.
        /// </summary>
        /// <param name="langCode">Код на езика.</param>
        /// <param name="registerID">Идентификатор на регистъра.</param>
        /// <param name="lastModifiedDate">Дата на последна промяна.</param>
        /// <returns></returns>
        IEnumerable<Models.ApplicationType> GetApplicationTypes(string langCode, Registers? registerID, out DateTime? lastModifiedDate);

        ValueTask EnsureLoadedAsync(string lang);
    }

    /// <summary>
    /// Номенклатура ЕКАТТЕ.
    /// </summary>
    public interface IEkatte : ILoadable
    {
        IEnumerable<District> GetDistricts();
        IEnumerable<District> GetDistricts(out DateTime? lastDateModified);

        District GetDistrict(string districtCode);

        IEnumerable<Municipality> GetMunicipalities();
        IEnumerable<Municipality> GetMunicipalities(out DateTime? lastDateModified);

        Municipality GetMunicipality(string municipalityCode);

        IEnumerable<Settlement> GetSettlements();
        IEnumerable<Settlement> GetSettlements(out DateTime? lastDateModified);

        Settlement GetSettlement(string settlementCode);

        IEnumerable<Area> GetAreas();
        IEnumerable<Area> GetAreas(out DateTime? lastDateModified);

        Area GetArea(string areaCode);
    }

    /// <summary>
    /// Интерфейс за работа с типове на документите.
    /// </summary>
    public interface IDocumentTypes : ILoadable
    {
        /// <summary>
        /// Връща типа на документа.
        /// </summary>
        /// <param name="documentTypeID">Идентификатор на типа на документа.</param>
        Models.DocumentType GetDocumentType(string documentTypeID);

        /// <summary>
        /// връща всичките типове на документа.
        /// </summary>
        IEnumerable<Models.DocumentType> GetDocumentTypes();
    }

    /// <summary>
    /// Интерфейс за работа с типове на документ на приложение.
    /// </summary>
    public interface IApplicationDocumentTypes : ILoadable
    {
        IEnumerable<DocumentType> GetDocumentTypes(out DateTime? lastDateModified);
        IEnumerable<ApplicationDocumentType> GetApplicationDocumentTypes(out DateTime? lastDateModified);
        IEnumerable<ApplicationDocumentType> GetApplicationDocumentTypes(string appType, out DateTime? lastDateModified);
    }

    /// <summary>
    /// Интерфейс за работа с шаблони за документи.
    /// </summary>
    public interface IDocumentTemplates : ILoadable
    {
        /// <summary>
        /// Връща шаблона на документа.
        /// </summary>
        /// <param name="documentTypeID">Идентификатор на типа на документа.</param>
        Models.DocumentTemplate GetDocumentTemplate(string documentTypeID);

        /// <summary>
        /// Връща шаблоните на документа.
        /// </summary>
        IEnumerable<Models.DocumentTemplate> GetDocumentTemplates();

        /// <summary>
        /// Връща шаблоните на документа.
        /// </summary>
        /// <param name="lastModifiedDate">Дата на последна промяна.</param>
        IEnumerable<Models.DocumentTemplate> GetDocumentTemplates(out DateTime? lastModifiedDate);

        /// <summary>
        /// Връща активни полета на шаблон за документа
        /// </summary>
        IEnumerable<Models.DocumentTemplateField> GetDocumentTemplateFields();

        /// <summary>
        /// Връща активни полета на шаблон за документа
        /// </summary>
        /// <param name="lastModifiedDate">Дата на последна промяна.</param>
        IEnumerable<Models.DocumentTemplateField> GetDocumentTemplateFields(out DateTime? lastModifiedDate);

        /// <summary>
        /// Връща съдържанието на шаблона на документа.
        /// </summary>
        /// <param name="docTemplateID">Идентификатор на шаблона на документа.</param>
        string GetDocumentTemplateContent(int docTemplateID);

        /// <summary>
        /// Връща съдържанието на шаблона на документа.
        /// </summary>
        /// <param name="docTemplateID">Идентификатор на шаблона на документа.</param>
        /// <param name="lastModifiedDate">Дата на последна промяна.</param>
        string GetDocumentTemplateContent(int docTemplateID, out DateTime? lastModifiedDate);

        ValueTask EnsureLoadedDocumentTemplatesContentsAsync(int docTemplateID);
    }

    /// <summary>
    /// Интерфейс за работа с услуги.
    /// </summary>
    public interface IServices : ILoadable
    {
        /// <summary>
        /// Връща услуги за даден език.
        /// </summary>
        /// <param name="lang">език</param>
        IEnumerable<Models.Service> GetServices(string lang);

        /// <summary>
        /// Връща услуги за даден език.
        /// </summary>
        /// <param name="lang">език</param>
        /// <param name="lastModifiedDate">Дата на промяна</param>
        IEnumerable<Models.Service> GetServices(string lang, out DateTime? lastModifiedDate);

        ValueTask EnsureLoadedAsync(string lang);
    }

    /// <summary>
    /// Интерфейс за работа с административни услуги от ИИСДА
    /// </summary>
    public interface IIISDAServices : ILoadable
    {
        /// <summary>
        /// Връща административните услуги от ИИСДА.
        /// </summary>
        /// <param name="lastModifiedDate"></param>
        /// <returns></returns>
        IEnumerable<Models.IISDAService> GetIISDAServices(out DateTime? lastModifiedDate);

        /// <summary>
        /// Връща административните услуги от ИИСДА.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Models.IISDAService> GetIISDAServices();
    }
}
