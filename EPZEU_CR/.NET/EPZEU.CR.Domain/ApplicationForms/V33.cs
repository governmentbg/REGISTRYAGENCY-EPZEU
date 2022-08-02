using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V33", Namespace = Namespaces.ApplicationsNamespace)]
	public class V33 : ApplicationFormVBase<V33Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V33; }
        }
    }

    
    [XmlType(TypeName = "V33Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V33Fields : ApplicationFormVFieldsBase
    {
        #region Fields
        [XmlElement(Order = 801)]
        public F801a_FormOfTransforming801a FormOfTransforming801a { get; set; }

        [XmlElement(Order = 802)]
        public F802a_ReorganizeCoOperatives2 ReorganizeCoOperatives2 { get; set; }

        [XmlElement(Order = 803)]
        public F803_Successors803 Successors803 { get; set; }

        #endregion
    }
}