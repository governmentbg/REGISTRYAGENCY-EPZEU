using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "AssignedManager", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AssignedManager", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F007a0_AssignedManager : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "000710";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "AssignedManagers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AssignedManagers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F007a_AssignedManagers : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00071";

        [XmlElement(ElementName = "AssignedManager")]
        public List<F007a0_AssignedManager> AssignedManageList { get; set; }
    }
}
