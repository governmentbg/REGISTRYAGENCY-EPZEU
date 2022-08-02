using Integration.EPZEU.Models;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Модел на секция.
    /// </summary>
    public class Section
    {
        /// <summary>
        /// Тип раздел.
        /// </summary>
        public SubUICTypes? SubUICType { get; set; }

        /// <summary>
        /// Код на име на раздел.
        /// </summary>
        public string NameCode { get; set; }

        /// <summary>
        /// Поредност на секцията.
        /// </summary>
        public string Order { get; set; }

        /// <summary>
        /// Раздели.
        /// </summary>
        public List<SubDeed> SubDeeds { get; set; }
    }
}
