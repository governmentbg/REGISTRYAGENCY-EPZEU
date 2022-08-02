using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "BoardManagersSupporter2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BoardManagersSupporter2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F01340_BoardManagersSupporter2 : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001340";

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }
    }

    [XmlType(TypeName = "BoardOfManagersSupporters2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "BoardOfManagersSupporters2", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F013v_BoardOfManagersSupporters2 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00134";

        [XmlElement(ElementName = "BoardManagersSupporter2")]
        public List<F01340_BoardManagersSupporter2> F01340_BoardManagersSupporter2List { get; set; }
    }
}