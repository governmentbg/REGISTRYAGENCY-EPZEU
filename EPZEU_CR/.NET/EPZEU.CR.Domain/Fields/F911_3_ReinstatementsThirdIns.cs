using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ReinstatementThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F9110_3_ReinstatementThirdIns : BankruptcyRecord
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091130";

        [XmlElement(ElementName = "Petitioner")]
        public Person Petitioner { get; set; }

        [XmlElement(ElementName = "SenderType")]
        public BankruptcySenderType SenderType { get; set; }
    }

    [XmlType(TypeName = "ReinstatementsThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementsThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911_3_ReinstatementsThirdIns : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09113";

        [XmlElement(ElementName = "ReinstatementThirdIns")]
        public List<F9110_3_ReinstatementThirdIns> ReinstatementThirdInsList { get; set; }
    }
}
