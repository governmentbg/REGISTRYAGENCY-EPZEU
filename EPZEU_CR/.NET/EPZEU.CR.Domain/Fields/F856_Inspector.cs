using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StabilizationInspectors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationInspectors", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8560_StabilizationInspectors : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08560";

        [XmlElement(ElementName = "StabilizationInspector")]
        public List<F85600_StabilizationInspector> StabilizationInspectorList { get; set; }

    }

    [XmlType(TypeName = "StabilizationInspector", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationInspector", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85600_StabilizationInspector : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085600";

        public Person Person { get; set; }
        public Address Address { get; set; }
        public Contacts Contacts { get; set; }
        public BankruptcyAct ActData { get; set; }

        [XmlIgnore]
        public bool FirstInstance { get; set; }
        [XmlIgnore]
        public bool SecondInstance { get; set; }
        [XmlIgnore]
        public bool ThirdInstance { get; set; }

        [XmlAttribute("firstInstance")]
        public string FirstInstanceText
        {
            get { return FirstInstance ? "1" : "0"; }
            set { FirstInstance = (value == "1"); }
        }

        [XmlAttribute("secondInstance")]
        public string SeconfInstanceText
        {
            get { return SecondInstance ? "1" : "0"; }
            set { SecondInstance = (value == "1"); }
        }

        [XmlAttribute("thirdInstance")]
        public string ThirdInstanceText
        {
            get { return ThirdInstance ? "1" : "0"; }
            set { ThirdInstance = (value == "1"); }
        }
    }
}
