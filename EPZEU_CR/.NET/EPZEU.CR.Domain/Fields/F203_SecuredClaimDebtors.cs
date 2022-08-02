using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SecuredClaimDebtor", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SecuredClaimDebtor", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F2030_SecuredClaimDebtor : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "020300";

        public Person Subject { get; set; }

        public Address Address { get; set; }
    }

    [XmlType(TypeName = "SecuredClaimDebtors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SecuredClaimDebtors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F203_SecuredClaimDebtors : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02030";

        [XmlElement(ElementName = "SecuredClaimDebtor")]
        public List<F2030_SecuredClaimDebtor> SecuredClaimDebtorList { get; set; }
    }
}
