using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A5", Namespace = Namespaces.ApplicationsNamespace)]
	public class A5 : ApplicationFormABase<A5Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A5; }
        }
    }

    
    [XmlType(TypeName = "A5Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A5Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 100)]
        public F010_Representatives Representatives { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 120)]
        public F012_BoardOfDirectors BoardOfDirectors { get; set; }

        [XmlElement(Order = 130)]
        public F013_BoardOfManagers2 BoardOfManagers2 { get; set; }

        [XmlElement(Order = 140)]
        public F014_SupervisingBoard SupervisingBoard { get; set; }

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