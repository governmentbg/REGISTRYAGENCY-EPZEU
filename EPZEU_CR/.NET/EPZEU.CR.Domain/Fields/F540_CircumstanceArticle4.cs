using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "CircumstanceArticle4", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "CircumstanceArticle4", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F540_CircumstanceArticle4 : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05400";

        [XmlAttribute]
        public bool IsArticle2 { get; set; }

        [XmlAttribute]
        public bool IsArticle3 { get; set; }

        [XmlAttribute]
        public bool IsArticle5 { get; set; }

        [XmlAttribute]
        public bool IsArticle6 { get; set; }

        [XmlAttribute]
        public bool IsArticle7 { get; set; }

        [XmlAttribute]
        public bool IsArticle8 { get; set; }
    }
}
