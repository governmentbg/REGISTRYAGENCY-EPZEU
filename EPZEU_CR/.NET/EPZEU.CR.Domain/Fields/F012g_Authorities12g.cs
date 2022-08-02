using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Authority12g", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Authority12g", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F012g_Authority12g : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "001240";

        [XmlText]
        public string Text { get; set; }
    }

    [XmlType(TypeName = "Authorities12g", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Authorities12g", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F012g_Authorities12g : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00124";

        [XmlElement(ElementName = "Authority12g")]
        public List<F012g_Authority12g> Authorities12gList { get; set; }
    }
}