using EPZEU.Utilities;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Шаблон за документи.
    /// </summary>
    public class DocumentTemplate
    {
        /// <summary>
        /// Идентификатор на шаблон за документ.
        /// </summary>
        [DapperColumn("doc_template_id")]
        public int? DocumentTemplateID { get; set; }

        /// <summary>
        /// Идентификатор на версията на шаблона за документ.
        /// </summary>
        [DapperColumn("doc_template_ver_id")]
        public int? DocumentTemplateVerID { get; set; }

        /// <summary>
        /// Идентификатор на типа на документа.
        /// </summary>
        [DapperColumn("document_type_id")]
        public string DocumentTypeID { get; set; }
    }
}
