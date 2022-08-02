using EPZEU.Common.Models;
using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Applications.Models
{
    /// <summary>
    /// Критерии за търсене на заявление
    /// </summary>
    public class ApplicationSearchCriteria: BasePagedSearchCriteria
    {
        /// <summary>
        /// От дата на регистриране.
        /// </summary>
        public DateTime? FromRegistrationDate { get; set; }

        /// <summary>
        /// До дата на регистриране.
        /// </summary>
        public DateTime? ToRegistrationDate { get; set; }

        /// <summary>
        /// Входящи номера.
        /// </summary>
        public List<string> IncomingNumbers { get; set; }

        /// <summary>
        /// Идентификатор на тип на заявление.
        /// </summary>
        public short? ApplicationTypeID { get; set; }

        /// <summary>
        /// КИН на заявител.
        /// </summary>
        public int? ApplicantCIN { get; set; }

        /// <summary>
        /// Тип регистър - Стойности: 1 = Търговски Регистър; 2 = Имотен Регистър
        /// </summary>
        public Registers? Register { get; set; }
    }

    /// <summary>
    /// Критериии за търсене на чернова на заявление.
    /// </summary>
    public class ApplicationDraftSearchCriteria : BasePagedSearchCriteria
    {
        /// <summary>
        /// КИН на заявител.
        /// </summary>
        public int? ApplicantCIN { get; set; }
    }
}
