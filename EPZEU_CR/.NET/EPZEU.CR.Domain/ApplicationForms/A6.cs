using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A6", Namespace = Namespaces.ApplicationsNamespace)]
	public class A6 : ApplicationFormABase<A6Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A6; }
        }
    }

    
    [XmlType(TypeName = "A6Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A6Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 100)]
        public F010_Representatives Representatives { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 120)]
        public F012_BoardOfDirectors BoardOfDirectors { get; set; }

        [XmlElement(Order = 160)]
        public F016_TermsOfPartnership TermsOfPartnership { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 200)]
        public F020_UnlimitedLiabilityPartners UnlimitedLiabilityPartners { get; set; }

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