using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SupervisionBodyMemberFull", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisionBodyMemberFull", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F9150_SupervisionBodyMemberFull : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091510";

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

        //True - надзорен орган; False - комитет на кредиторите
        public string EntryType { get; set; }
    }

    [XmlType(TypeName = "SupervisionBodyFull", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SupervisionBodyFull", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F915_SupervisionBodyFull : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09151";

        [XmlElement(ElementName = "SupervisionBodyMemberFull")]
        public List<F9150_SupervisionBodyMemberFull> SupervisionBodyMemberFullList { get; set; }
    }
}
