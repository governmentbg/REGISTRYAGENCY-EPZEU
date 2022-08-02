using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "BoardManager", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BoardManager", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01301_BoardManager : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001301";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }
    }

    [XmlType(TypeName = "ManagerMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ManagerMandate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0130_ManagerMandate : Mandate
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001300";
    }

    [XmlType(TypeName = "BoardOfManagers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BoardOfManagers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F013_BoardOfManagers : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00130";

        [XmlElement(ElementName = "ManagerMandate")]
        public F0130_ManagerMandate ManagerMandate { get; set; }

        [XmlElement(ElementName = "BoardManager")]
        public List<F01301_BoardManager> BoardManagerList { get; set; }
    }
}