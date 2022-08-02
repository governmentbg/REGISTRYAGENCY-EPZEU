using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B3", Namespace = Namespaces.ApplicationsNamespace)]
	public class B3 : ApplicationFormBBase<B3Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B3; }
        }
    }

    
    [XmlType(TypeName = "B3Fields", Namespace = Namespaces.FieldsNamespace)]
	public class B3Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 2000)]
        public F200_PledgeDDIdentifier PledgeDDIdentifier { get; set; }

        [XmlElement(Order = 2010)]
        public F201_Pledgors Pledgors { get; set; }

        [XmlElement(Order = 2030)]
        public F203_SecuredClaimDebtors SecuredClaimDebtors { get; set; }

        [XmlElement(Order = 2050)]
        public F205_PledgeCreditors PledgeCreditors { get; set; }

        [XmlElement(Order = 2070)]
        public F207_SecuredClaimReason SecuredClaimReason { get; set; }

        [XmlElement(Order = 2071)]
        public F207a_ContractOfPledgeForShare ContractOfPledgeForShare { get; set; }

        [XmlElement(Order = 2080)]
        public F208_SecuredClaimSubject SecuredClaimSubject { get; set; }

        [XmlElement(Order = 2090)]
        public F209_SecuredClaimAmount SecuredClaimAmount { get; set; }

        [XmlElement(Order = 2100)]
        public F210_SecuredClaimInterests SecuredClaimInterests { get; set; }

        [XmlElement(Order = 2110)]
        public F211_SecuredClaimDelayInterests SecuredClaimDelayInterests { get; set; }

        [XmlElement(Order = 2120)]
        public F212_PledgeMoney PledgeMoney { get; set; }

        [XmlElement(Order = 2130)]
        public F213_PledgePropertyDescription PledgePropertyDescription { get; set; }

        [XmlElement(Order = 2140)]
        public F214_PledgePropertyPrice PledgePropertyPrice { get; set; }

        [XmlElement(Order = 2150)]
        public F215_ModalityDate ModalityDate { get; set; }

        [XmlElement(Order = 2160)]
        public F216_ModalityCondition ModalityCondition { get; set; }

        [XmlElement(Order = 2161)]
        public F216a_PledgedCreditorAgreement PledgedCreditorAgreement { get; set; }

        [XmlElement(Order = 2170)]
        public F217_PledgeExecutionClaim PledgeExecutionClaim { get; set; }

        [XmlElement(Order = 2180)]
        public F218_Partners218 Partners218 { get; set; }

        [XmlElement(Order = 2190)]
        public F219_PledgeExecutionDepozitar PledgeExecutionDepozitar { get; set; }

        [XmlElement(Order = 2200)]
        public F220_Depozitar Depozitar { get; set; }

        [XmlElement(Order = 2210)]
        public F221_DepozitarDistraintRemove DepozitarDistraintRemove { get; set; }

        [XmlElement(Order = 2220)]
        public F222_StopOfExecutionSize StopOfExecutionSize { get; set; }

        [XmlElement(Order = 2230)]
        public F223_StopOfExecutionProperty StopOfExecutionProperty { get; set; }

        [XmlElement(Order = 2240)]
        public F224_PledgeRenewDate PledgeRenewDate { get; set; }

        [XmlElement(Order = 2250)]
        public F225_PledgeAddemption PledgeAddemption { get; set; }

        [XmlElement(Order = 2231)]
        public F223a_EntryIntoPledgeCreditorRights EntryIntoPledgeCreditorRights { get; set; }

        #endregion
    }
}