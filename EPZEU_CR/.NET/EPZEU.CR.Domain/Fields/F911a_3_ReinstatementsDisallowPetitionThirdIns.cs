using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ReinstatementDisallowPetitionThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementDisallowPetitionThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911a0_3_ReinstatementDisallowPetitionThirdIns : BankruptcyRecord
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091150";

        [XmlElement(ElementName = "Petitioner")]
        public Person Petitioner { get; set; }

        [XmlElement(ElementName = "SenderType")]
        public BankruptcySenderType SenderType { get; set; }

        [XmlElement(ElementName = "InscribedAct")]
        public bool InscribedAct { get; set; }
    }

    [XmlType(TypeName = "ReinstatementsDisallowPetitionThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementsDisallowPetitionThirdIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911a_3_ReinstatementsDisallowPetitionThirdIns : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09115";

        [XmlElement(ElementName = "ReinstatementDisallowPetitionThirdIns")]
        public List<F911a0_3_ReinstatementDisallowPetitionThirdIns> ReinstatementDisallowPetitionThirdInsList { get; set; }
    }
}