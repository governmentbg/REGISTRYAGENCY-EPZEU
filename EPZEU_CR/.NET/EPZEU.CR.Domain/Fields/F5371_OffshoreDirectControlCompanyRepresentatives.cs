using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "OffshoreDirectControlCompanyRepresentative", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyRepresentative", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53710_OffshoreDirectControlCompanyRepresentative : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053710";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }

        [XmlElement(ElementName = "CountryOfResidence")]
        public Address CountryOfResidence { get; set; }
    }

    [XmlType(TypeName = "OffshoreDirectControlCompanyRepresentatives", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyRepresentatives", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F5371_OffshoreDirectControlCompanyRepresentatives : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05371";

        [XmlElement(ElementName = "OffshoreDirectControlCompanyRepresentative")]
        public List<F53710_OffshoreDirectControlCompanyRepresentative> OffshoreDirectControlCompanyRepresentativesList { get; set; }
    }
}
