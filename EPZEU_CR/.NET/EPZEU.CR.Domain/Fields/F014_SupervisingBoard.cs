using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Supervisor", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Supervisor", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01401_Supervisor : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001401";

        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "SupervisingBoardMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisingBoardMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0140_SupervisingBoardMandate : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001400";
    }

    [XmlType(TypeName = "SupervisingBoard", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisingBoard", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F014_SupervisingBoard : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00140";

        [XmlElement(ElementName = "SupervisingBoardMandate")]
        public F0140_SupervisingBoardMandate SupervisingBoardMandate { get; set; }

        [XmlElement(ElementName = "Supervisor")]
        public List<F01401_Supervisor> SupervisorList { get; set; }
    }
}