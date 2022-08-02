using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V31", Namespace = Namespaces.ApplicationsNamespace)]
	public class V31 : ApplicationFormVBase<V31Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V31; }
        }
    }

    
    [XmlType(TypeName = "V31Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V31Fields : ApplicationFormVFieldsBase
    {
        #region Fields
        [XmlElement(Order = 801)]
        public F801_FormOfTransforming801 FormOfTransforming801 { get; set; }

        [XmlElement(Order = 802)]
        public F802_ReorganizeCoOperatives ReorganizeCoOperatives { get; set; }

        [XmlElement(Order = 803)]
        public F803_Successors803 Successors803 { get; set; }

        #endregion
    }
}