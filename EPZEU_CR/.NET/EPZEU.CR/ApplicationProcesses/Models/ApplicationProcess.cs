using Integration.EPZEU.Models;
using System.Collections.Generic;
using EPZEU.Utilities;
using System;
using System.Text.Json;

namespace EPZEU.CR.ApplicationProcesses.Models
{
    /// <summary>
    /// Типове статуси на пакета.:
    /// 1 = В процес на подаване; 2 = Впреоцес на подписване; 3 = С грешка при подписване; 4 = Чака приключване на пререгистрация; 5 = Готово за изпращане; 6 = Изпраща се;
    /// 7 = Прието; 8 = Грешка при приемане; 9 = Приключен;
    /// </summary>
    public enum ProcessStatuses
    {
        /// <summary>
        /// В процес на подаване
        /// </summary>
        InProcess = 1,

        /// <summary>
        /// Впреоцес на подписване
        /// </summary>
        Signing = 2,

        /// <summary>
        /// С грешка при подписване
        /// </summary>
        ErrorInSignature = 3,

        /// <summary>
        /// Чака приключване на пререгистрация
        /// </summary>
        WaitPreregistrationCompletion = 4,

        /// <summary>
        /// Готово за изпращане
        /// </summary>
        ReadyForSending = 5,

        /// <summary>
        /// Изпраща се
        /// </summary>
        Sending = 6,

        /// <summary>
        /// Прието
        /// </summary>
        Accepted = 7,

        /// <summary>
        /// Грешка при приемане
        /// </summary>
        ErrorInAccepting = 8,

        /// <summary>
        /// Приключен
        /// </summary>
        Completed = 9
    }

    /// <summary>
    /// Модел на данни за процеси на заявяване на услуга.
    /// </summary>
    public class ApplicationProcess
    {
        /// <summary>
        /// Уникален идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        [DapperColumn("application_process_id")]
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        [DapperColumn("uic")]
        public string UIC { get; set; }

        /// <summary>
        /// Идентификатор на заявителя.
        /// </summary>
        [DapperColumn("applicant_id")]
        public int? ApplicantID { get; set; }

        /// <summary>
        /// Статус на пакета: 1 - in_process; 2 - signing; 3 - signed;.
        /// </summary>
        [DapperColumn("status")]
        public ProcessStatuses? Status { get; set; }

        /// <summary>
        /// Идентификатор на основно заявление.
        /// </summary>
        [DapperColumn("main_application_id")]
        public long? MainApplicationID { get; set; }

        /// <summary>
        /// Тип на основно заявление.
        /// </summary>
        [DapperColumn("main_application_type_id")]
        public ApplicationFormTypes? MainApplicationType { get; set; }

        /// <summary>
        /// Идентификатор на заявката за подписване в модула за подписване.
        /// </summary>
        [DapperColumn("signing_guid")]
        public Guid? SigningGuid { get; set; }
        
        /// <summary>
        /// Дата на създаване на черновата 
        /// </summary>
        [DapperColumn("created_on")]
        public DateTime? CreatedOn { get; set; }

        /// <summary>
        /// Дата на поселедна редакция на черновата
        /// </summary>
        [DapperColumn("updated_on")]
        public DateTime? UpdatedOn { get; set; }

        /// <summary>
        /// Уникален идентификатор родителския процес за заявяване на услуга.
        /// </summary>
        [DapperColumn("parent_application_process_id")]
        public long? ParentApplicationProcessID { get; set; }

        /// <summary>
        /// Съобщение за грешка при обработката на процеса
        /// </summary>
        [DapperColumn("error_message")]
        public string ErrorMessage { get; set; }


        /// <summary>
        /// Входящ номер на заявлението в CR
        /// </summary>
        [DapperColumn("incoming_number")]
        public string IncomingNumber { get; set; }

        /// <summary>
        /// Допълнителни данни описващи заявленията.
        /// </summary>
        [DapperColumn("additional_data")]
        public string AdditionalDataString
        {
            get
            {
                return EPZEUJsonSerializer.Serialize(AdditionalData);
            }
            set
            {
                AdditionalData = EPZEUJsonSerializer.Deserialize<AdditionalData>(value);
            }
        }

        /// <summary>
        /// Допълнителни данни за процеса по заявяване.
        /// </summary>    
        public AdditionalData AdditionalData { get; set; }

        /// <summary>
        /// Списък със под процесите по заявяване на услуга.
        /// </summary>
        public List<ApplicationProcess> ChildApplicationProcesses { get; set; }

        /// <summary>
        /// Списък със заявления.
        /// </summary>
        public List<Application> Applications { get; set; }
    }
}
