using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    public partial class F32410_EntryIntoPledgeCreditorRight2 : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "032410";

        public Person Subject { get; set; }

        public Address Address { get; set; }
    }

    [XmlType(TypeName = "EntryIntoPledgeCreditorRights2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "EntryIntoPledgeCreditorRights2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F324a_EntryIntoPledgeCreditorRights2 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03241";

        [XmlElement(ElementName = "EntryIntoPledgeCreditorRight2")]
        public List<F32410_EntryIntoPledgeCreditorRight2> EntryIntoPledgeCreditorRight2List { get; set; }
    }
}
