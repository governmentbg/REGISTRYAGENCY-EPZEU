using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models
{
    /// <summary>
    /// Възел на дърво.
    /// </summary>
    public class TreeNode
    {
        /// <summary>
        /// Идентификатор на родител.
        /// </summary>
        public string ParentID { get; set; }

        /// <summary>
        /// Стойност.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Текст.
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// Флаг указващ дали е избран.
        /// </summary>
        public bool? Selected { get; set; }

        /// <summary>
        /// Непосредствено състояние.
        /// </summary>
        public bool? IntermediateState { get; set; }

        /// <summary>
        /// Флаг указващ дали е разширен.
        /// </summary>
        public bool? IsExtended { get; set; }

        /// <summary>
        /// Деца.
        /// </summary>
        public List<TreeNode> Children { get; set; }
    }

    /// <summary>
    /// Колекция с възли на дърво
    /// </summary>
    public class TreeNodeCollection
    {
        /// <summary>
        /// Възли на дърво.
        /// </summary>
        public List<TreeNode> Items { get; set; }
    }
}
