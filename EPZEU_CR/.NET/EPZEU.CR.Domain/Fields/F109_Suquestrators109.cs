using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Suquestrator109", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Suquestrator109", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1090_Suquestrator109 : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "010900";

        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "AppointedTill")]
        public string AppointedTill { get; set; }
    }

    [XmlType(TypeName = "Suquestrators109", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Suquestrators109", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F109_Suquestrators109 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01090";

        [XmlElement(ElementName = "Suquestrator109")]
        public List<F1090_Suquestrator109> SuquestratorList { get; set; }
    }
}
