using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Company", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Company", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]    
    public partial class F002_Company : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00020";
    }
}
