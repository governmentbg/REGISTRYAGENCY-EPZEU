using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A1", Namespace = Namespaces.ApplicationsNamespace)] 
	public class A1 : ApplicationFormABase<A1Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A1; }
        }
    }

        
	[XmlType(TypeName = "A1Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A1Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 180)]
        public F018_PhysicalPersonTrader PhysicalPersonTrader { get; set; }


        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}