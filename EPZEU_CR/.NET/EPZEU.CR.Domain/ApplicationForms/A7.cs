using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A7", Namespace = Namespaces.ApplicationsNamespace)]
	public class A7 : ApplicationFormABase<A7Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A7; }
        }
    }

    
    [XmlType(TypeName = "A7Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A7Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 90)]
        public F009_ChairMan ChairMan { get; set; }

        [XmlElement(Order = 130)]
        public F013_BoardOfManagers BoardOfManagers { get; set; }

        [XmlElement(Order = 131)]
        public F013a_BoardOfManagersSupporters BoardOfManagersSupporters { get; set; }

        [XmlElement(Order = 150)]
        public F015_ControllingBoard ControllingBoard { get; set; }

        [XmlElement(Order = 151)]
        public F015a_ControllingBoardSupporters ControllingBoardSupporters { get; set; }

        [XmlElement(Order = 250)]
        public F025_SharePaymentResponsibility SharePaymentResponsibility { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}