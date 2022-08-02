using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "WayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "WayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]   
    public partial class F011_WayOfRepresentation : MannerRecordHolder
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00110";
    }
}
