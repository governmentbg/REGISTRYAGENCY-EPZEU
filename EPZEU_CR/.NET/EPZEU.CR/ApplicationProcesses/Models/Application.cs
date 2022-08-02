using System.Collections.Generic;
using System.Text.Json;
using EPZEU.Utilities;
using Integration.EPZEU.Models;

namespace EPZEU.CR.ApplicationProcesses.Models
{
    /// <summary>
    /// Модел на заявление.
    /// </summary>
    public class Application
    {
        /// <summary>
        /// Уникален идентификатор на заявление.
        /// </summary>
        [DapperColumn("application_id")]
        public long? ApplicationID { get; set; }

        /// <summary>
        /// Идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        [DapperColumn("application_process_id")]
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// Тип на заявление.
        /// </summary>
        [DapperColumn("application_type_id")]
        public ApplicationFormTypes? Type { get; set; }

        /// <summary>
        /// Идентификатор на данни за съдържание на пакети (JSON).
        /// </summary>
        [DapperColumn("application_content_id")]
        public long? ApplicationContentID { get; set; }

        /// <summary>
        /// Номер на заявлението.
        /// </summary>
        [DapperColumn("order")]
        public short? Order { get; set; }

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
        /// Допълнителни данни описващи заявленията.
        /// </summary>       
        public AdditionalData AdditionalData { get; set; }

        /// <summary>
        /// Съдържание на пакети за вписване.
        /// </summary>
        public ApplicationProcessContent ApplicationContent { get; set; }

        /// <summary>
        /// Списък с документи.
        /// </summary>
        public List<ApplicationDocument> Documents { get; set; }
    }
}
