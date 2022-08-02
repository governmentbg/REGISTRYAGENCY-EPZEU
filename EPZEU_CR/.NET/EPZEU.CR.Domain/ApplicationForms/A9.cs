using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A9", Namespace = Namespaces.ApplicationsNamespace)]
	public class A9 : ApplicationFormABase<A9Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A9; }
        }
    }

    
    [XmlType(TypeName = "A9Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A9Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 70)]
        public F007_Managers Managers { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 130)]
        public F013_BoardOfManagers BoardOfManagers { get; set; }

        [XmlElement(Order = 150)]
        public F015_ControllingBoard ControllingBoard { get; set; }

        [XmlElement(Order = 161)]
        public F016a_TermOfExisting TermOfExisting { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 231)]
        public F023a_Owner Owner { get; set; }

        [XmlElement(Order = 251)]
        public F025a_ConcededEstateValue ConcededEstateValue { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}