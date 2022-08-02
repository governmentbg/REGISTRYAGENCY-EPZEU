using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.CR.Web.Models
{
    /// <summary>
    /// Информация за заявление.
    /// </summary>
    public class ApplicationInfo
    {
        private string _incomingNumberWithCtx;

        /// <summary>
        /// Входящ номер на заявление с контекстна информация.
        /// </summary>
        public string IncomingNumberWithCtx
        {
            get
            {
                return !string.IsNullOrEmpty(_incomingNumberWithCtx) ? _incomingNumberWithCtx : IncomingNumber;
            }
            set
            {
                _incomingNumberWithCtx = value;
            }
        }


        /// <summary>
        /// Входящ номер на заявление.
        /// </summary>
        public string IncomingNumber { get; set; }

        /// <summary>
        /// Име на типа на заявлението.
        /// </summary>
        public string ApplicationTypeName { get; set; }

        /// <summary>
        /// Тип на заявление.
        /// </summary>       
        public ApplicationFormTypes? ApplicationType { get; set; }

        /// <summary>
        /// Статус на заявлението.
        /// </summary>
        public ApplicationStatuses? ApplicationStatus { get; set; }

        /// <summary>
        /// Място на подаване на заявлението.
        /// </summary>
        public PassedFrom? PassedFrom { get; set; }

        /// <summary>
        /// Статус на пакета
        /// </summary>
        public ApplicationState? ApplicationState { get; set; }

        /// <summary>
        /// Име на офиса
        /// </summary>
        public string OfficeName { get; set; }

        public DateTime? EntryDate { get; set; }

        /// <summary>
        /// Дата на входиране на заявление.
        /// </summary>       
        public DateTime? RegistrationDate { get; set; }

        /// <summary>
        /// Входящ номер на заявлението
        /// </summary>
        public string EntryNumber { get; set; }

        /// <summary>
        ///Вид на отказа ако иама отказ
        /// </summary>
        public RefusalTypes? RefusalType { get; set; }

        /// <summary>
        /// Номер на изходящ документ
        /// </summary>
        public string OutgoingNumber { get; set; }

        /// <summary>
        /// HTML резилтат от изпълнението на заявлението.
        /// </summary>       
        public string ResultHTML { get; set; }

        /// <summary>
        /// Партиди подадени за вписване в заявлението
        /// </summary>
        public List<DeedSummary> IncomingLinkedDeeds { get; set; }

        /// <summary>
        /// Партиди по които заявлението вписва данни
        /// </summary>
        public List<DeedSummary> EntryDeeds { get; set; }

        /// <summary>
        /// Дали има активна комуникация за текущата регистрация
        /// </summary>
        public bool? HasRequestsForCorrectionForScanning { get; set; }
    }
}
