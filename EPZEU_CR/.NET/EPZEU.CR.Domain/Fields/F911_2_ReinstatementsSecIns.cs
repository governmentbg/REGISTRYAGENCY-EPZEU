using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ReinstatementSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F9110_2_ReinstatementSecIns : BankruptcyRecord
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091120";

        [XmlElement(ElementName = "Petitioner")]
        public Person Petitioner { get; set; }

        [XmlElement(ElementName = "SenderType")]
        public BankruptcySenderType SenderType { get; set; }
    }

    [XmlType(TypeName = "ReinstatementsSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementsSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911_2_ReinstatementsSecIns : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09112";

        [XmlElement(ElementName = "ReinstatementSecIns")]
        public List<F9110_2_ReinstatementSecIns> ReinstatementSecInsList { get; set; }
    }
}
