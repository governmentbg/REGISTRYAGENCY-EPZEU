using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "LimitSubjectOfActivity101", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "LimitSubjectOfActivity101", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F101_LimitSubjectOfActivity101 : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01010";

        [XmlElement(ElementName = "FobiddenDeals")]
        public string FobiddenDeals { get; set; }

        [XmlElement(ElementName = "ForbiddenActivity")]
        public string ForbiddenActivity { get; set; }

        [XmlElement(ElementName = "FobiddenOperations")]
        public string FobiddenOperations { get; set; }
    }
}
