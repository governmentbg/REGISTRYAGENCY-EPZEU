using EPZEU.CR.Nomenclatures;
using Integration.EPZEU.Models;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Модел на раздел.
    /// </summary>
    public class SubDeed
    {
        /// <summary>
        /// Идентификатор на раздел.
        /// </summary>
        public string SubUIC { get; set; }

        /// <summary>
        /// Тип раздел.
        /// </summary>
        public SubUICTypes SubUICType { get; set; }

        /// <summary>
        /// Статус на раздела.
        /// </summary>
        public SubDeedStatuses SubDeedStatus { get; set; }

        /// <summary>
        /// Име за линк, който след натискане се разгъва и показва допълнителна информация.
        /// </summary>
        public string ColapsableLinkName { get; set; }

        /// <summary>
        /// Име на секция.
        /// </summary>
        public string SectionName
        {
            get { return LocalizationHelper.GetSectionNameCode((int)SubUICType); }
        }

        /// <summary>
        /// Флаг, указващ дали раздела е затворен.
        /// </summary>
        public bool SubDeedIsClosed
        {
            get { return SubDeedStatus == SubDeedStatuses.Closed; }
        }

        /// <summary>
        /// Групи.
        /// </summary>
        public List<Group> Groups { get; set; }
    }
}
