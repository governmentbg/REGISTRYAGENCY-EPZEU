using EPZEU.Utilities;
using Integration.EPZEU.Models;
using System.Text.Json;

namespace EPZEU.CR.Web.App.Models.ApplicationProcesses
{
    /// <summary>
    /// Модел на заявление.
    /// </summary>
    public class Application
    {
        /// <summary>
        /// Уникален идентификатор на заявление.
        /// </summary>
        public long? ApplicationID { get; set; }

        /// <summary>
        /// Идентификатор на данни за процеси на заявяване на услуга.
        /// </summary>
        public long? ApplicationProcessID { get; set; }

        /// <summary>
        /// Тип на заявление.
        /// </summary>
        public ApplicationFormTypes? Type { get; set; }

        /// <summary>
        /// Номер на заявлението.
        /// </summary>
        public short? Order { get; set; }

        /// <summary>
        /// Идентификатор на данни за съдържание на пакети (JSON).
        /// </summary>
        public long? ApplicationContentID { get; set; }       

        /// <summary>
        /// Съдържание.
        /// </summary>
        public JsonElement? Content { get; set; }

        /// <summary>
        /// Допълнителни данни.
        /// </summary>
        public AdditionalData AdditionalData { get; set; }
    }
}
