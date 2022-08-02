using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "WayOfRepresentation43", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "WayOfRepresentation43", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F043_WayOfRepresentation43 : MannerRecordHolder
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00430";
    }
}
