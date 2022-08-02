namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Елемент за обект в поле.
    /// </summary>
    public class SubjectInFieldItem
    {
        /// <summary>
        /// Пълно име  на фирма.
        /// </summary>
        public string CompanyFullName { get; set; }

        /// <summary>
        /// Флаг за наставка на имена фирма.
        /// </summary>
        public string CompanyNameSuffixFlag { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC { get; set; }

        /// <summary>
        /// Име на поле.
        /// </summary>
        public string FieldName { get; set; }

        /// <summary>
        /// Текст на мандат.
        /// </summary>
        public string MandateText { get; set; }
    }
}
