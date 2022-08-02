using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "LegalForm", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "LegalForm", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]    
    public partial class F003_LegalForm : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00030";

        #region Properties

        [XmlAttribute("Text")]
        public string Text { get; set; }

        [XmlAttribute("Code")]
        public string Code { get; set; }
        
        #endregion
    }
}
