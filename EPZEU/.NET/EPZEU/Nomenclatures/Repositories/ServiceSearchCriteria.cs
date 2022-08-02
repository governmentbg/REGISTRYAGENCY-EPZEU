namespace EPZEU.Nomenclatures.Repositories
{
    public class ServiceSearchCriteria
    {
        public int[] ServiceIDs { get; set; }
        public short[] RegisterIDs { get; set; }
        public int[] Statuses { get; set; }
        public string Name { get; set; }
        public short[] AppTypeIDs { get; set; }
        public int LanguageID { get; set; }
        public bool LoadDecsription { get; set; }
        public bool LoadShortDescription { get; set; }
        public bool LoadSeparateValueI18N { get; set; }
        public bool LoadOnlyUntranslated { get; set; }
    }
}
