using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ActualOwner", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ActualOwner", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F5500_ActualOwner : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "055000";

        public Person Person { get; set; }

        public Address Address { get; set; }

        public string OwnedRights { get; set; }

        public Address CountryOfResidence { get; set; }
    }


    [XmlType(TypeName = "ActualOwners", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ActualOwners", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F550_ActualOwners : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05500";

        [XmlElement(ElementName = "ActualOwner")]
        public List<F5500_ActualOwner> ActualOwnersList { get; set; }

    }
}