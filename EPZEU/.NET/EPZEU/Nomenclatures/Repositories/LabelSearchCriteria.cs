namespace EPZEU.Nomenclatures.Repositories
{
    /// <summary>
    /// Критерии за търсене на превод на ресурс от чужд език.
    /// </summary>
    public class LabelSearchCriteria
    {
        /// <summary>
        /// Колекция от уникални идентификатори на етикети.
        /// </summary>
        public int[] LabelIDs { get; set; }

        /// <summary>
        /// Уникален идентификатор на запис за език.
        /// </summary>
        public int? LanguageID { get; set; }

        /// <summary>
        /// Код на запис на етикет.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Текст ан превод на етикет.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Флаг, указващ дали да бъде заредено описанието на етикета.
        /// </summary>
        public bool LoadDecsription { get; set; }

        /// <summary>
        /// Флаг, указващ дали превода да се зареди в отделни полета.
        /// </summary>
        public bool LoadSeparateValueI18N { get; set; }

        /// <summary>
        /// Флаг, указващ дали да бъдат заредени само тези, които не са преведени.
        /// </summary>
        public bool LoadOnlyUntranslated { get; set; }
    }
}
