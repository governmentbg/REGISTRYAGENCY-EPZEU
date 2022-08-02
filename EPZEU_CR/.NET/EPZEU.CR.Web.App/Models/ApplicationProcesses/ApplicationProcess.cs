using EPZEU.CR.ApplicationProcesses.Models;
using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.ApplicationProcesses
{
    /// <summary>
    /// Модел на данни за процеси на заявяване на услуга.
    /// </summary>
    public class ApplicationProcess
    {
        /// <summary>
        /// Уникален идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC { get; set; }

        /// <summary>
        /// Идентификатор на заявителя.
        /// </summary>
        public long? ApplicantID { get; set; }

        /// <summary>
        /// Статус на пакета: 1 - in_process; 2 - signing; 3 - signed;.
        /// </summary>
        public ProcessStatuses? Status { get; set; }

        /// <summary>
        /// Идентификатор на основно заявление.
        /// </summary>
        public long? MainApplicationID { get; set; }

        /// <summary>
        /// Тип на основно заявление.
        /// </summary>
        public ApplicationFormTypes? MainApplicationType { get; set; }

        /// <summary>
        /// Идентификатор на заявката за подписване в модула за подписване.
        /// </summary>
        public Guid? SigningGuid { get; set; }

        /// <summary>
        /// Уникален идентификатор родителския процес за заявяване на услуга.
        /// </summary>      
        public long? ParentApplicationProcessID { get; set; }

        /// <summary>
        /// Списък със под процесите по заявяване на услуга.
        /// </summary>
        public List<ApplicationProcess> ChildApplicationProcesses { get; set; }

        /// <summary>
        /// Списък със заявления.
        /// </summary>
        public List<Application> Applications { get; set; }

        /// <summary>
        /// Флаг указващ, дали има промяна в първоначалните данни на заявлението.
        /// </summary>
        public bool HasChangeInApplicationsInitialData { get; set; }

        /// <summary>
        /// Фла указващ, дали има промяна в номенклатурите след създаване на черновата.
        /// </summary>
        public bool HasChangesInApplicationsNomenclature { get; set; }

        /// <summary>
        /// Съобщение за грешка при обработката на процеса
        /// </summary>
        public string ErrorMessage { get; set; }
        
        /// <summary>
        /// Входящ номер на заявлението в CR
        /// </summary>
        public string IncomingNumber { get; set; }
    }
}
