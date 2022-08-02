using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{

    [XmlType(TypeName = "TemporarilySuspendedStatusForPublicBenefits", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "TemporarilySuspendedStatusForPublicBenefits", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F017b_TemporarilySuspendedStatusForPublicBenefits : CheckRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00172";
    }
}