using EPZEU.Utilities;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Етикет
    /// </summary>
    public class Label
    {
        /// <summary>
        /// Уникален идентификатор на етикет.
        /// </summary>
        [DapperColumn("label_id")]
        public int LabelID { get; set; }

        /// <summary>
        /// Код на етикет.
        /// </summary>
        [DapperColumn("code")]
        public string Code { get; set; }

        /// <summary>
        /// Описание на етикет.
        /// </summary>
        [DapperColumn("description")]
        public string Description { get; set; }

        /// <summary>
        /// Стойност на етикет.
        /// </summary>
        [DapperColumn("value")]
        public string Value { get; set; }
    }
}
