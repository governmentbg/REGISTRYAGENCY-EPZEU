using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Successor703", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Successor703", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F7030_Successor : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "070300";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        [XmlElement(ElementName = "legalForm")]
        public string LegalForm { get; set; }
    }

    [XmlType(TypeName = "Successors703", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Successors703", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F703_Successors : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "07030";

        [XmlElement(ElementName = "Successor703")]
        public List<F7030_Successor> SuccessorList { get; set; }
    }
}
