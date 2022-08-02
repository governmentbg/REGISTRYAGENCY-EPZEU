using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Модел на група.
    /// </summary>
    public class Group
    {
        /// <summary>
        /// Идентификатор на групата.
        /// </summary>
        public int? GroupID { get; set; }

        /// <summary>
        /// Код на ресурс за името на групата.
        /// </summary>
        public string NameCode { get; set; }

        /// <summary>
        /// Поредност.
        /// </summary>
        public string Order { get; set; }

        /// <summary>
        /// Полета.
        /// </summary>
        public List<Field> Fields { get; set; }
    }
}
