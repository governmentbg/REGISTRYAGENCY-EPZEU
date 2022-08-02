namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Тип на документа.
    /// </summary>
    public class DocumentType
    {
        /// <summary>
        /// Идентификатор на типа на документа.
        /// </summary>
        public string DocumentTypeID { get; set; }

        /// <summary>
        /// Име на типа на документа.
        /// </summary>
        public string Name { get; set; }

        public bool IsRefusalAttachable { get; set; }

        public string ParentID { get; set; }
    }

    /// <summary>
    /// Тип на регистъра.
    /// Стойности: 1 = Търговски Регистър; 2 = Имотен Регистър
    /// </summary>
    public enum Registers
    {
        /// <summary>
        /// Търговски Регистър.
        /// </summary>
        CR = 1,

        /// <summary>
        /// Имотен Регистър.
        /// </summary>
        PR = 2
    }
}
