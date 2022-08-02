using System;

namespace EPZEU.Web.Api.Models
{
    /// <summary>
    /// Заявка за сглобяване на документа и подписа.
    /// </summary>
    public class AssembleSignatureWithDocumentRequest
    {
        /// <summary>
        /// Идентификатор на процеса за подписване
        /// </summary>
        public Guid? ProcessID { get; set; }

        /// <summary>
        /// Сертификат за подписване във формат Base64.
        /// </summary>
        public string Base64SigningCert { get; set; }

        /// <summary>
        /// Подпис на документа във формат Base64.
        /// </summary>
        public string Base64DocSignature { get; set; }

        /// <summary>
        /// Време на полагане на подписа.
        /// </summary>
        public long HashTime { get; set; }

        /// <summary>
        /// Идентификатор на подписващия.
        /// </summary>
        public long SignerID { get; set; }
    }
}
