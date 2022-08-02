using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SubjectToAdditionalBusinessActivity", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SubjectToAdditionalBusinessActivity", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F006g_SubjectToAdditionalBusinessActivity : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00064";
    }
}
