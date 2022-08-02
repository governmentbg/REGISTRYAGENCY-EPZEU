using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "OffshoreNoDirectControlCompanyRepresentative", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyRepresentative", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53810_OffshoreNoDirectControlCompanyRepresentative : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053810";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }

        [XmlElement(ElementName = "CountryOfResidence")]
        public Address CountryOfResidence { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompanyRepresentatives", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyRepresentatives", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F5381_OffshoreNoDirectControlCompanyRepresentatives : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05381";

        [XmlElement(ElementName = "OffshoreNoDirectControlCompanyRepresentative")]
        public List<F53810_OffshoreNoDirectControlCompanyRepresentative> OffshoreNoDirectControlCompanyRepresentativesList { get; set; }
    }
}
