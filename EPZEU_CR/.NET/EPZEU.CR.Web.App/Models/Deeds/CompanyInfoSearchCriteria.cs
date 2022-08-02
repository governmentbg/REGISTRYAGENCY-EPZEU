using EPZEU.Common.Models;
using EPZEU.Web.Models;
using System;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Критерии за търсене на информация за фирма.
    /// </summary>
    public class CompanyInfoSearchCriteria : BasePagedSearchCriteria
    {
        /// <summary>
        /// От дата.
        /// </summary>
        public DateTime? FromDate { get; set; }

        /// <summary>
        /// До дата.
        /// </summary>
        public DateTime? ToDate { get; set; }

        /// <summary>
        /// Първа буква на фирма.
        /// </summary>
        public string CompanyFirstLatter { get; set; }

        /// <summary>
        /// Начини на сортиране на колони с ред.
        /// </summary>
        public SortColumnsWithOrder? SortColumnOrder { get; set; }
    }

    /// <summary>
    /// Начини на сортиране на колони с ред.: 0 = Възходящ по "Име на фирма"; 1= Низходящ по "Име на фирма"; 2 = Възходящ по "Активен от"; 3 = Низходящ по "Активен от";
    /// </summary>
    public enum SortColumnsWithOrder
    {
        /// <summary>
        /// Възходящ по "Име на фирма"
        /// </summary>
        CompanyNameASC = 0,

        /// <summary>
        /// Низходящ по "Име на фирма"
        /// </summary>
        CompanyNameDESC = 1,

        /// <summary>
        /// Възходящ по "Активен от"
        /// </summary>
        ActiveFromASC = 2,

        /// <summary>
        /// Низходящ по "Активен от"
        /// </summary>
        ActiveFromDESC = 3
    }
}