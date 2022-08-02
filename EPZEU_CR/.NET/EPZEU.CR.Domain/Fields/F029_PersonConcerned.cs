using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PersonConcerned", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PersonConcerned", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F029_PersonConcerned : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00290";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        public Address Address { get; set; }

        [XmlAttribute("Quality")]
        public string Quality { get; set; }
    }
}
