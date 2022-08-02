namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Обект за физическо лице или фирма.
    /// </summary>
    public class PhysicalOrCompanyObj
    {
        /// <summary>
        /// Флаг указващ дали е физическо лице.
        /// </summary>
        public bool IsPhysical { get; set; }

        /// <summary>
        /// Идентификатор.
        /// </summary>
        public string Ident { get; set; }

        /// <summary>
        /// Име.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Пълно име на фирма.
        /// </summary>
        public string CompanyFullName { get; set; }
    }
}
