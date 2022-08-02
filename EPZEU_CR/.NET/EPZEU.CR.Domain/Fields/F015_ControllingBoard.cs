using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ControllingBoardPerson", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ControllingBoardPerson", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01501_ControllingBoardPerson : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001501";

        public Person Person { get; set; }
    }

    [XmlType(TypeName = "ControllingBoardMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ControllingBoardMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0150_ControllingBoardMandate : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001500";
    }

    [XmlType(TypeName = "ControllingBoard", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ControllingBoard", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F015_ControllingBoard : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00150";

        [XmlElement(ElementName = "ControllingBoardMandate")]
        public F0150_ControllingBoardMandate ControllingBoardMandate { get; set; }

        [XmlElement(ElementName = "ControllingBoardPerson")]
        public List<F01501_ControllingBoardPerson> ControllingBoardPersonList { get; set; }
    }
}