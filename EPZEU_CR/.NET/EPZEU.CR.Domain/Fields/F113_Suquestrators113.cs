using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Suquestrator113", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Suquestrator113", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1130_Suquestrator113 : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "011300";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "AppointedTill")]
        public string AppointedTill { get; set; }
    }

    [XmlType(TypeName = "Suquestrators113", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Suquestrators113", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F113_Suquestrators113 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01130";

        [XmlElement(ElementName = "Suquestrator113")]
        public List<F1130_Suquestrator113> SuquestratorsList { get; set; }
    }
}
