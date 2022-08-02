namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Данни за документи на вписване.
    /// </summary>
    public class ApplicationDocumentType
    {
        /// <summary>
        /// Тип на заявление
        /// </summary>
        public string ApplicationTypeID { get; set; }

        /// <summary>
        /// Тип на приложения документ.
        /// </summary>
        public string DocumentTypeID { get; set; }

        /// <summary>
        /// Тип на регистъра
        /// </summary>
        public Registers? Register { get; set; }

        /// <summary>
        /// Флаг, указващ дали документът е проверен.
        /// </summary>
        public bool? IsScannedDocument { get; set; }

        /// <summary>
        /// Флаг, указващ дали докумнетът на приложението е ново.
        /// </summary>
        public bool? IsNew { get; set; }

        /// <summary>
        /// Флаг, указващ дали докумнетът на приложението е за промяна.
        /// </summary>
        public bool? IsForChange { get; set; }

        /// <summary>
        /// Флаг, указващ дали докумнетът на приложението е за пререгистрация.
        /// </summary>
        public bool? IsForPreregistration { get; set; }

        /// <summary>
        /// Флаг, указващ дали докумнетът на приложението е видим.
        /// </summary>
        public bool? IsPublicVisible { get; set; }

        public int? MinOccurs { get; set; }

        public int? MaxOccurs { get; set; }

        /// <summary>
        /// Тип на документа.
        /// </summary>
        public DocumentType DocumentType { get; set; }

        /// <summary>
        /// Име на документа
        /// </summary>
        public string DocumentName { get; set; }
    }
}
