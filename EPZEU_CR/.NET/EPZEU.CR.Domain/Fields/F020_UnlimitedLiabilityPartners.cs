using EPZEU.CR.Domain.Fields.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "UnlimitedLiabilityPartner", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "UnlimitedLiabilityPartner", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0200_UnlimitedLiabilityPartner : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002000";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }
    }

    [XmlType(TypeName = "UnlimitedLiabilityPartners", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "UnlimitedLiabilityPartners", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F020_UnlimitedLiabilityPartners : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00200";

        [XmlElement(ElementName = "UnlimitedLiabilityPartner")]
        public List<F0200_UnlimitedLiabilityPartner> UnlimitedLiabilityPartnerList { get; set; }
    }
}
