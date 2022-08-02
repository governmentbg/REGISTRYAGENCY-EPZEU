using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PledgeCreditor", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PledgeCreditor", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F2050_PledgeCreditor : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "020500";

        public Person Subject { get; set; }

        public Address Address { get; set; }
    }

    [XmlType(TypeName = "PledgeCreditors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PledgeCreditors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F205_PledgeCreditors : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02050";

        [XmlElement(ElementName = "PledgeCreditor")]
        public List<F2050_PledgeCreditor> PledgeCreditorsList { get; set; }
    }
}
