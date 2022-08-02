using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A11", Namespace = Namespaces.ApplicationsNamespace)]
	public class A11 : ApplicationFormABase<A11Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A11; }
        }
    }

    
    [XmlType(TypeName = "A11Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A11Fields : ApplicationFormAFieldsBase
    {
        [XmlElement(Order = 223)]
        public F0223_EuropeanEconomicInterestGrouping EuropeanEconomicInterestGrouping { get; set; }

        [XmlElement(Order = 224)]
        public F0224_DiscontinuanceOfTheEUIE DiscontinuanceOfTheEUIE { get; set; }

        [XmlElement(Order = 225)]
        public F0225_InsolvenciesOfEUIE InsolvenciesOfEUIE { get; set; }

        [XmlElement(Order = 228)]
        public F028a_AddemptionOfEUIE AddemptionOfEUIE { get; set; }
    }
}