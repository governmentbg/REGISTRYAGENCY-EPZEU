using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Branch804Subject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Branch804Subject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8040_ReorgBranch : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "080400";

        [XmlElement(ElementName = "BranchSubject")]
        public Person BranchSubject { get; set; }

        [XmlArray("Branches")]
        [XmlArrayItem("Branch")]
        public List<Branch> Branches { get; set; }
    }

    [XmlType(TypeName = "Branches804", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Branches804", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F804_ReorgBranches : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08040";

        [XmlElement(ElementName = "Branch804Subject")]
        public List<F8040_ReorgBranch> BranchList { get; set; }
    }
}
