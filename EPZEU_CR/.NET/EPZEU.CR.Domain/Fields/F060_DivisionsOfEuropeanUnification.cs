using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DivisionOfEuropeanUnification", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DivisionOfEuropeanUnification", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0600_DivisionOfEuropeanUnification : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "006000";

        public ForeignCompanyBaseData ForeignCompanyBaseData { get; set; }

        public Address Address { get; set; }
    }

    [XmlType(TypeName = "DivisionsOfEuropeanUnification", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DivisionsOfEuropeanUnification", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F060_DivisionsOfEuropeanUnification : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00600";

        [XmlElement(ElementName = "DivisionOfEuropeanUnification")]
        public List<F0600_DivisionOfEuropeanUnification> DivisionOfEuropeanUnificationList { get; set; }
    }
}