using Integration.EPZEU.Models;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Резултат от справка вписано обстоятелство или обявен акт.
    /// </summary>
    public class VerificationActsSubSearchCriteriaResult
    {
        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC { get; set; }

        /// <summary>
        /// Пълно име на фирма.
        /// </summary>
        public string CompanyFullName { get; set; }

        /// <summary>
        /// Клонове.
        /// </summary>
        public TreeNodeCollection Nodes { get; set; }
    }
}
