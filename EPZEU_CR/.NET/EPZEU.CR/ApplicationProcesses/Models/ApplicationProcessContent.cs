using EPZEU.Utilities;
using System.IO;

namespace EPZEU.CR.ApplicationProcesses.Models
{
    /// <summary>
    /// Тип на данните.
    /// </summary>
    public enum ApplicationProcessContentTypes
    {
        ApplicationJSON = 1,
        PackageXML = 2,
    }

    /// <summary>
    /// Модел на съдържание на пакети за вписване.
    /// </summary>
    public class ApplicationProcessContent
    {
        /// <summary>
        /// Уникален идентификатор на съдържание на пакети за вписване.
        /// </summary>
        [DapperColumn("application_process_content_id")]
        public long? ApplicationProcessContentID { get; set; }

        /// <summary>
        /// Идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        [DapperColumn("application_process_id")]
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// Тип на данните: 1 - application_json; 2 - package_xml;.
        /// </summary>
        [DapperColumn("type")]
        public ApplicationProcessContentTypes? Type { get; set; }

        /// <summary>
        /// Съдържание.
        /// </summary>
        [DapperColumn("content")]
        public Stream Content { get; set; }
    }
}
