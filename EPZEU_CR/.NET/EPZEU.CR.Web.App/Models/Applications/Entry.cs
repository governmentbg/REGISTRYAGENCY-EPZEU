using System;

namespace EPZEU.CR.Web.App.Models.Applications
{
    /// <summary>
    /// Входиране.
    /// </summary>
    public class Entry
    {
        /// <summary>
        /// Дата.
        /// </summary>
        public DateTime? Date { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC { get; set; }

        /// <summary>
        /// Пълноиме на фирма.
        /// </summary>
        public string CompanyFullName { get; set; }
    }
}
