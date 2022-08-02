using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A12", Namespace = Namespaces.ApplicationsNamespace)]
	public class A12 : ApplicationFormABase<A12Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A12; }
        }
    }

    
    [XmlType(TypeName = "A12Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A12Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 100)]
        public F010_Representatives Representatives { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 121)]
        public F012a_BoardOfManagers3 BoardOfManagers3 { get; set; }

        [XmlElement(Order = 132)]
        public F013b_LeadingBoard LeadingBoard { get; set; }

        [XmlElement(Order = 142)]
        public F014b_SupervisingBoard2 SupervisingBoard2 { get; set; }

        [XmlElement(Order = 160)]
        public F016_TermsOfPartnership TermsOfPartnership { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 230)]
        public F023_SoleCapitalOwner SoleCapitalOwner { get; set; }

        [XmlElement(Order = 232)]
        public F023b_EuropeanHoldingCompanysAsShareholders EuropeanHoldingCompanysAsShareholders { get; set; }

        [XmlElement(Order = 241)]
        public F024a_HiddenNonMonetaryDeposit HiddenNonMonetaryDeposit { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        [XmlElement(Order = 271)]
        public F027a_AddemptionOfTraderSeatChange AddemptionOfTraderSeatChange { get; set; }

        [XmlElement(Order = 700)]
        public F070_WayOfEstablishingEuropeanCompany WayOfEstablishingEuropeanCompany { get; set; }

        [XmlElement(Order = 710)]
        public F071_SeatChange SeatChange { get; set; }

        [XmlElement(Order = 310)]
        public F031_Funds Funds { get; set; }

        [XmlElement(Order = 311)]
        public F031a_Shares Shares { get; set; }

        [XmlElement(Order = 320)]
        public F032_DepositedFunds DepositedFunds { get; set; }

        [XmlElement(Order = 330)]
        public F033_NonMonetaryDeposits NonMonetaryDeposits { get; set; }

        [XmlElement(Order = 340)]
        public F034_BuyBackDecision BuyBackDecision { get; set; }


        #endregion
    }
}