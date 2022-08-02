using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "CoOperative2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "CoOperative2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F802a0_CoOperative2 :  Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "080210";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }
    }

    [XmlType(TypeName = "ReorganizeCoOperatives2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReorganizeCoOperatives2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F802a_ReorganizeCoOperatives2 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08021";

        [XmlElement(ElementName = "CoOperative2")]
        public List<F802a0_CoOperative2> CoOperative2List { get; set; }
    }
}
