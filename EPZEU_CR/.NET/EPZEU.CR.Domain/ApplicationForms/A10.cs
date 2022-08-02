using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A10", Namespace = Namespaces.ApplicationsNamespace)]   
	public class A10 : ApplicationFormABase<A10Fields>
    {       
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A10; }
        }
    }

    
    [XmlType(TypeName = "A10Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A10Fields : ApplicationFormAFieldsBase
    {
        [XmlElement(Order = 70)]
        public F007_Managers Managers { get; set; }

        [XmlElement(Order = 80)]
        public F008_WayOfManagement WayOfManagement { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 162)]
        public F016b_TermOfExistingEUIE TermOfExistingEUIE { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 201)]
        public F020a_UnlimitedLiabilityPartnersEUIE UnlimitedLiabilityPartnersEUIE { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        [XmlElement(Order = 271)]
        public F027a_AddemptionOfTraderSeatChange AddemptionOfTraderSeatChange { get; set; }

        [XmlElement(Order = 710)]
        public F071_SeatChange SeatChange { get; set; }

        [XmlElement(Order = 600)]
        public F060_DivisionsOfEuropeanUnification DivisionsOfEuropeanUnification { get; set; }
    }
}