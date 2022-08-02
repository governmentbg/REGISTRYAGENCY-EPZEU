using EPZEU.CMS.Models;
using EPZEU.Nomenclatures.Models;

namespace EPZEU.CMS.Repositories
{
    /// <summary>
    /// Критерии за търсене на страници.
    /// </summary>
    public class PageSearchCriteria
    {
        /// <summary>
        /// Идентификатори на страница.
        /// </summary>
        public int[] PageIDs { get; set; }

        /// <summary>
        /// Идентификатор на родителски елемент.
        /// </summary>
        public int? ParentID { get; set; }

        /// <summary>
        /// Тип.
        /// </summary>
        public PageTypes? Type { get; set; }

        /// <summary>
        /// Идентификатор на регистър.
        /// </summary>
        public Registers? RegisterID { get; set; }

        /// <summary>
        /// Идентификатор на език.
        /// </summary>
        public int? LangID { get; set; }

        /// <summary>
        /// Флаг указващ дали да зареди съдържание.
        /// </summary>
        public bool? LoadContent { get; set; }

        /// <summary>
        /// Флаг указващ дали да зареди превод.
        /// </summary>
        public bool? LoadSeparateValueI18n { get; set; }

        /// <summary>
        /// Флаг указващ дали да зареди само непреведени.
        /// </summary>
        public bool? LoadOnlyUntranslated { get; set; }
    }
}