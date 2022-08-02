using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Branch704Subject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Branch704Subject", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F7040_Branch704Subject : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "070400";

        [XmlElement(ElementName = "BranchSubject")]
        public Person BranchSubject { get; set; }

        [XmlArray("Branches")]
        [XmlArrayItem("Branch")]
        public List<Branch> Branches { get; set; }
    }

    [XmlType(TypeName = "Branches704", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Branches704", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F704_Branches704 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "07040";

        [XmlElement(ElementName = "Branch704Subject")]
        public List<F7040_Branch704Subject> BranchList { get; set; }
    }
}
