using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DebtorOverSecureClaim", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DebtorOverSecureClaim", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F3010_DebtorOverSecureClaim : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "030100";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        public Address Address { get; set; }
    }


    [XmlType(TypeName = "DebtorOverSecureClaims", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DebtorOverSecureClaims", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F301_DebtorOverSecureClaims : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03010";

        [XmlElement(ElementName = "DebtorOverSecureClaim")]
        public List<F3010_DebtorOverSecureClaim> DebtorOverSecureClaimList { get; set; }
    }
}