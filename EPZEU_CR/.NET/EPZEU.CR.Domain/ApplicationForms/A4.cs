using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A4", Namespace = Namespaces.ApplicationsNamespace)]  
	public class A4 : ApplicationFormABase<A4Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A4; }
        }
    }

    
    [XmlType(TypeName = "A4Fields", Namespace = Namespaces.FieldsNamespace)]    
    public class A4Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 70)]
        public F007_Managers Managers { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 160)]
        public F016_TermsOfPartnership TermsOfPartnership { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 190)]
        public F019_Partners Partners { get; set; }

        [XmlElement(Order = 230)]
        public F023_SoleCapitalOwner SoleCapitalOwner { get; set; }

        [XmlElement(Order = 240)]
        public F024_ShareTransfers ShareTransfers { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        [XmlElement(Order = 310)]
        public F031_Funds Funds { get; set; }

        [XmlElement(Order = 320)]
        public F032_DepositedFunds DepositedFunds { get; set; }

        [XmlElement(Order = 330)]
        public F033_NonMonetaryDeposits NonMonetaryDeposits { get; set; }

        #endregion
    }
}