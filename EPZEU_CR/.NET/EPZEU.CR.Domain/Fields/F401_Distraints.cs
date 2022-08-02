using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Distraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Distraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F4010_Distraint : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "040100";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }
    }

    [XmlType(TypeName = "Distraints", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Distraints", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F401_Distraints : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "04010";

        [XmlElement(ElementName = "Distraint")]
        public List<F4010_Distraint> DistraintsList { get; set; }
    }
}
