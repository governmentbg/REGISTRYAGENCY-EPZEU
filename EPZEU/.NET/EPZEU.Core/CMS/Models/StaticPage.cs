using EPZEU.Common;
using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;

namespace EPZEU.CMS.Models
{
    /// <summary>
    /// Статична страница
    /// </summary>
    public class StaticPage
    {
        /// <summary>
        /// Ключ на страница.
        /// </summary>
        [DapperColumn("page_key")]
        public string PageKey { get; set; }

        /// <summary>
        /// Идентификатор на модул.
        /// </summary>
        [DapperColumn("module_id")]
        public Modules? ModuleID { get; set; }

        /// <summary>
        /// Ключ на етикет.
        /// </summary>
        [DapperColumn("label_key")]
        public string LabelKey { get; set; }

        /// <summary>
        /// URL.
        /// </summary>
        [DapperColumn("url")]
        public string Url { get; set; }
    }
}
