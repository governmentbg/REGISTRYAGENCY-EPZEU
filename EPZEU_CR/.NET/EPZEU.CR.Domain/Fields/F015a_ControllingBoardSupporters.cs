using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ControllingBoardSupportersPerson", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ControllingBoardSupportersPerson", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01510_ControllingBoardSupportersPerson : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001510";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }
    }

    [XmlType(TypeName = "ControllingBoardSupporters", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ControllingBoardSupporters", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F015a_ControllingBoardSupporters : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00151";

        [XmlElement(ElementName = "ControllingBoardSupportersPerson")]
        public List<F01510_ControllingBoardSupportersPerson> ControllingBoardSupportersPersonList { get; set; }
    }
}