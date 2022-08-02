using System;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Уведомление.
    /// </summary>
    public class Notification
    {
        /// <summary>
        /// Изходящ номер.
        /// </summary>
        public string OutgoingNumber { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC { get; set; }

        /// <summary>
        /// Име на фирма.
        /// </summary>
        public string CompanyFullName { get; set; }

        /// <summary>
        /// Краен срок.
        /// </summary>
        public DateTime? DeadLine { get; set; }

        /// <summary>
        /// Линк за сваляне на документ.
        /// </summary>
        public string DownloadLink { get; set; }
    }                                   
}
