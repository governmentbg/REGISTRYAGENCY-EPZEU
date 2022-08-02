using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A2", Namespace = Namespaces.ApplicationsNamespace)]
	public class A2 : ApplicationFormABase<A2Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A2; }
        }
    }

    
    [XmlType(TypeName = "A2Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A2Fields : ApplicationFormAFieldsBase
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

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}
