using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B4", Namespace = Namespaces.ApplicationsNamespace)]
	public class B4 : ApplicationFormBBase<B4Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B4; }
        }
    }

    
    [XmlType(TypeName = "B4Fields", Namespace = Namespaces.FieldsNamespace)]
	public class B4Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 3000)]
        public F300_ForfeitCompanyIdentifier ForfeitCompanyIdentifier { get; set; }

        [XmlElement(Order = 3010)]
        public F301_DebtorOverSecureClaims DebtorOverSecureClaims { get; set; }

        [XmlElement(Order = 3030)]
        public F303_AtPawnCreditors AtPawnCreditors { get; set; }

        [XmlElement(Order = 3050)]
        public F305_Reason Reason { get; set; }

        [XmlElement(Order = 3051)]
        public F305a_PledgeContractForTrader PledgeContractForTrader { get; set; }

        [XmlElement(Order = 3060)]
        public F306_Object306 Object306 { get; set; }

        [XmlElement(Order = 3070)]
        public F307_Size307 Size307 { get; set; }

        [XmlElement(Order = 3080)]
        public F308_Interest Interest { get; set; }

        [XmlElement(Order = 3090)]
        public F309_InterestAndDefaultForDelay InterestAndDefaultForDelay { get; set; }

        [XmlElement(Order = 3100)]
        public F310_Size310 Size310 { get; set; }

        [XmlElement(Order = 3110)]
        public F311_Description Description { get; set; }

        [XmlElement(Order = 3120)]
        public F312_Price312 Price312 { get; set; }

        [XmlElement(Order = 3130)]
        public F313_Term Term { get; set; }

        [XmlElement(Order = 3140)]
        public F314_Circumstances Circumstances { get; set; }

        [XmlElement(Order = 3141)]
        public F314a_PledgedCreditorAgreement2 PledgedCreditorAgreement2 { get; set; }

        [XmlElement(Order = 3150)]
        public F315_PartOfClaimwhatIsSeek PartOfClaimwhatIsSeek { get; set; }

        [XmlElement(Order = 3160)]
        public F316_PropertyOverExecution PropertyOverExecution { get; set; }

        [XmlElement(Order = 3170)]
        public F317_Depositor Depositor { get; set; }

        [XmlElement(Order = 3180)]
        public F318_InvitationForAppointingOfManager InvitationForAppointingOfManager { get; set; }

        [XmlElement(Order = 3190)]
        public F319_ManagerOfTradeEnterprise ManagerOfTradeEnterprise { get; set; }

        [XmlElement(Order = 3200)]
        public F320_RestoringManagementRight RestoringManagementRight { get; set; }

        [XmlElement(Order = 3210)]
        public F321_DistraintData DistraintData { get; set; }

        [XmlElement(Order = 3220)]
        public F322_RaiseDistraint RaiseDistraint { get; set; }

        [XmlElement(Order = 3230)]
        public F323_Size323 Size323 { get; set; }

        [XmlElement(Order = 3240)]
        public F324_StopExecutionOverProperty StopExecutionOverProperty { get; set; }

        [XmlElement(Order = 3241)]
        public F324a_EntryIntoPledgeCreditorRights2 EntryIntoPledgeCreditorRights2 { get; set; }

        [XmlElement(Order = 3250)]
        public F325_EraseDistraint EraseDistraint { get; set; }

        [XmlElement(Order = 3251)]
        public F325a_PartialEraseDistraint PartialEraseDistraint { get; set; }

        [XmlElement(Order = 3260)]
        public F326_DateOfRenewingDistraint DateOfRenewingDistraint { get; set; }

        #endregion
    }
}