using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    public partial class F03110_CredentialsForDifferentTypes : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "003110";
    }

    public partial class F03111_SpecialConditionsForTransfer : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "003111";
    }

    [XmlType(TypeName = "Share", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Share", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0310a_Share : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "003112";

        public string Type { get; set; }

        public string Count { get; set; }

        public string NominalValue { get; set; }
    }

    [XmlType(TypeName = "Shares", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Shares", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F031a_Shares : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00311";

        public F03110_CredentialsForDifferentTypes CredentialsForDifferentTypes { get; set; }

        public F03111_SpecialConditionsForTransfer SpecialConditionsForTransfer { get; set; }

        [XmlElement(ElementName = "Share")]
        public List<F0310a_Share> ShareList { get; set; }
    }
}