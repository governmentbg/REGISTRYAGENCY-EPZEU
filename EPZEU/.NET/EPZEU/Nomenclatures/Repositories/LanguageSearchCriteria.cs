/// <summary>
/// Критерии за търсене на език.
/// </summary>
namespace EPZEU.Nomenclatures.Repositories
{
    public class LanguageSearchCriteria
    {
        /// <summary>
        /// Идентификатор на език.
        /// </summary>
        public int? LanguageID { get; set; }

        /// <summary>
        /// Код на език.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Име на език.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Флаг, дали статусът е активен.
        /// </summary>
        public bool? IsActive { get; set; }
    }
}