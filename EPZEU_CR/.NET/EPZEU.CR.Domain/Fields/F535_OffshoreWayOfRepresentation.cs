using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "OffshoreWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F535_OffshoreWayOfRepresentation : MannerRecordHolder
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05350";
    }
}