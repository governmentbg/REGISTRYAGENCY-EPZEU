using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SupervisionBodyMember", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisionBodyMember", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F9150_SupervisionBodyMember : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091500";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }

        [XmlElement(ElementName = "Contacts")]
        public Contacts Contacts { get; set; }

        [XmlElement(ElementName = "ActData")]
        public BankruptcyAct ActData { get; set; }

        [XmlAttribute("InductionDate")]
        public string InductionDate { get; set; }

        [XmlAttribute("AcquittanseDate")]
        public string AcquittanseDate { get; set; }
    }

    [XmlType(TypeName = "SupervisionBody", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisionBody", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F915_SupervisionBody : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09150";

        [XmlElement(ElementName = "SupervisionBodyMember")]
        public List<F9150_SupervisionBodyMember> SupervisionBodyMemberList { get; set; }
    }
}
