using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A13", Namespace = Namespaces.ApplicationsNamespace)]
	public class A13 : ApplicationFormABase<A13Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A13; }
        }
    }

    
    [XmlType(TypeName = "A13Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A13Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 100)]
        public F010_Representatives Representatives { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 121)]
        public F012a_BoardOfManagers3 BoardOfManagers3 { get; set; }

        [XmlElement(Order = 122)]
        public F012b_AdministrativeBoard AdministrativeBoard { get; set; }

        [XmlElement(Order = 123)]
        public F012v_AdministrativeBoardSupporters AdministrativeBoardSupporters { get; set; }

        [XmlElement(Order = 133)]
        public F013v_BoardOfManagersSupporters2 BoardOfManagersSupporters2 { get; set; }

        [XmlElement(Order = 142)]
        public F014b_SupervisingBoard2 SupervisingBoard2 { get; set; }

        [XmlElement(Order = 143)]
        public F014v_SupervisingBoardSupporters SupervisingBoardSupporters { get; set; }

        [XmlElement(Order = 160)]
        public F016_TermsOfPartnership TermsOfPartnership { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        [XmlElement(Order = 271)]
        public F027a_AddemptionOfTraderSeatChange AddemptionOfTraderSeatChange { get; set; }

        [XmlElement(Order = 701)]
        public F070a_WayOfEstablishingEuropeanCooperativeSociety WayOfEstablishingEuropeanCooperativeSociety { get; set; }

        [XmlElement(Order = 710)]
        public F071_SeatChange SeatChange { get; set; }

        [XmlElement(Order = 312)]
        public F031b_MinimumAmount MinimumAmount { get; set; }

        [XmlElement(Order = 320)]
        public F032_DepositedFunds DepositedFunds { get; set; }

        [XmlElement(Order = 330)]
        public F033_NonMonetaryDeposits NonMonetaryDeposits { get; set; }

        [XmlElement(Order = 250)]
        public F025_SharePaymentResponsibility SharePaymentResponsibility { get; set; }


        #endregion
    }
}