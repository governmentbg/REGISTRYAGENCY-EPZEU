using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    public partial class F2231_EntryIntoPledgeCreditorRight : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "022310";

        public Person Subject { get; set; }

        public Address Address { get; set; }
    }

    [XmlType(TypeName = "EntryIntoPledgeCreditorRights", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "EntryIntoPledgeCreditorRights", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F223a_EntryIntoPledgeCreditorRights : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02231";

        [XmlElement(ElementName = "EntryIntoPledgeCreditorRight")]
        public List<F2231_EntryIntoPledgeCreditorRight> EntryIntoPledgeCreditorRightList { get; set; }
    }
}
