using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "CommissionMember15b", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "CommissionMember15b", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F015b1_CommissionMember15b : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001521";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }
    }

    [XmlType(TypeName = "VerificationCommission15bMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "VerificationCommission15bMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F015b0_VerificationCommission15bMandate : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001520";
    }


    [XmlType(TypeName = "VerificationCommission15b", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "VerificationCommission15b", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F015b_VerificationCommission15b : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00152";

        [XmlElement(ElementName = "CommissionMember15b")]
        public List<F015b1_CommissionMember15b> CommissionMembers15bList { get; set; }

        public F015b0_VerificationCommission15bMandate VerificationCommission15bMandate { get; set; }
    }
}