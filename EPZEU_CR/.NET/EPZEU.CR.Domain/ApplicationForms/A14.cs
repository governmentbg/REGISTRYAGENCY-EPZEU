using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A14", Namespace = Namespaces.ApplicationsNamespace)]
	public class A14 : ApplicationFormABase<A14Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A14; }
        }
    }

    
    [XmlType(TypeName = "A14Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A14Fields : ApplicationFormAFieldsBase
    {
        #region Fields
               
        [XmlElement(Order = 100)]
        public F010_Representatives Representatives { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(ElementName = "AddemptionOfTraderEraseForeignTrader", Order = 273)]
        public F027v_AddemptionOfTraderEraseForeignTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}