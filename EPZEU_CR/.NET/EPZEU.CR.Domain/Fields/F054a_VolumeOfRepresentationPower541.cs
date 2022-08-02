using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "VolumeOfRepresentationPower541", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "VolumeOfRepresentationPower541", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]    
    public partial class F054a_VolumeOfRepresentationPower541 : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00541";
    }
}
