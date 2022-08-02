namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Класификатор на икономически дейности.
    /// </summary>
    public class NKID
    {
        /// <summary>
        /// Идентификатор на класификатора.
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Код на класификатора.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Текст на класификатора.
        /// </summary>
        public string Text { get; set; }

        public int? ParentID { get; set; }
    }
}
