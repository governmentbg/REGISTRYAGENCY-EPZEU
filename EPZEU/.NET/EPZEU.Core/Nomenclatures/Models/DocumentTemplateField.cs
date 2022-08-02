using EPZEU.Utilities;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Активно поле в шаблон на документ.
    /// </summary>
    public class DocumentTemplateField
    {
        /// <summary>
        /// Ключ на активно поле в шаблон.
        /// </summary>
        [DapperColumn("key")]
        public string Key { get; set; }

        /// <summary>
        /// Описание на активно поле в шаблон.
        /// </summary>
        [DapperColumn("description")]
        public string Description { get; set; }
    }
}
