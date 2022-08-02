using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models.Nomenclatures;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ReinstatementDisallowPetitionSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementDisallowPetitionSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911a0_2_ReinstatementDisallowPetitionSecIns : BankruptcyRecord
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "091140";

        [XmlElement(ElementName = "Petitioner")]
        public Person Petitioner { get; set; }

        [XmlElement(ElementName = "SenderType")]
        public BankruptcySenderType SenderType { get; set; }

        [XmlElement(ElementName = "InscribedAct")]
        public bool InscribedAct { get; set; }
    }

    [XmlType(TypeName = "ReinstatementsDisallowPetitionSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ReinstatementsDisallowPetitionSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F911a_2_ReinstatementsDisallowPetitionSecIns : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09114";

        [XmlElement(ElementName = "ReinstatementDisallowPetitionSecIns")]
        public List<F911a0_2_ReinstatementDisallowPetitionSecIns> ReinstatementDisallowPetitionSecInsList { get; set; }
    }
}