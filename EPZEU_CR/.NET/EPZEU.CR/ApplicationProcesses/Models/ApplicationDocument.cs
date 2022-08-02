using EPZEU.Utilities;
using Integration.EPZEU.Models;
using System;
using System.IO;

namespace EPZEU.CR.ApplicationProcesses.Models
{
    /// <summary>
    /// Модел на документите.
    /// </summary>
    public class ApplicationDocument
    {
        /// <summary>
        /// Уникален идентификатор на съдържание на пакети за вписване.
        /// </summary>
        [DapperColumn("application_document_id")]
        public long? ApplicationDocumentID { get; set; }

        //TODO: Да стане description
        /// <summary>
        /// Име на документа.
        /// </summary>
        [DapperColumn("name")]
        public string Name { get; set; }

        //todo tova hodi do bazata da se vidi
        /// <summary>
        /// Идентификатор на документа в ТР.
        /// </summary>
        [DapperColumn("backoffice_guid")]
        public string BackofficeGuid { get; set; }

        /// <summary>
        /// Идентификатор на заявление.
        /// </summary>
        [DapperColumn("application_id")]
        public long? ApplicationID { get; set; }

        /// <summary>
        /// Тип на приложения документ.
        /// </summary>
        [DapperColumn("document_type_id")]
        public string DocumentTypeID { get; set; }

        /// <summary>
        /// Флаг указващ документът е оригинал.
        /// </summary>
        [DapperColumn("is_original")]
        public bool? IsOriginal { get; set; }


        //TODO:Да се махне ако не се ползва
        /// <summary>
        /// Уникален идентификатор на пакет за отказано вписване.
        /// </summary>
        [DapperColumn("rejected_application_process_id")]
        public long? RejectedApplicationProcessID { get; set; }

        /// <summary>
        /// HTML съдържание на документа.
        /// </summary>
        [DapperColumn("html_template_content")]
        public string HtmlTemplateContent { get; set; }

        /// <summary>
        /// Идентификатор на заявката за подписване в модула за подписване.
        /// </summary>
        [DapperColumn("signing_guid")]
        public Guid? SigningGuid { get; set; }

        /// <summary>
        /// Входящ номер на заявленеито с което е вписан документа.
        /// </summary>
        [DapperColumn("incoming_number")]
        public string IncomingNumber { get; set; }
                               
        /// <summary>
        /// Мта данни за файла
        /// </summary>
        public FileMetadata FileMetadata { get; set; }

        public Stream Content { get; set; }
    }
}
