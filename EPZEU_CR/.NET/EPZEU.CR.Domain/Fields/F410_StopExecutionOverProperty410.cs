using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StopExecutionOverProperty410", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "StopExecutionOverProperty410", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]    
    public partial class F410_StopExecutionOverProperty410 : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "04100";
    }
}
