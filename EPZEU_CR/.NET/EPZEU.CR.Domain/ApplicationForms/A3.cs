using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A3", Namespace = Namespaces.ApplicationsNamespace)]
	public class A3 : ApplicationFormABase<A3Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A3; }
        }
    }

    
    [XmlType(TypeName = "A3Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A3Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 71)]
        public F007a_AssignedManagers AssignedManagers { get; set; }

        [XmlElement(Order = 80)]
        public F008_WayOfManagement WayOfManagement { get; set; }

        [XmlElement(Order = 100)]
        public F0101_Representatives101 Representatives101 { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 160)]
        public F016_TermsOfPartnership TermsOfPartnership { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 200)]
        public F020_UnlimitedLiabilityPartners UnlimitedLiabilityPartners { get; set; }

        [XmlElement(Order = 210)]
        public F021_LimitedLiabilityPartners LimitedLiabilityPartners { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}
