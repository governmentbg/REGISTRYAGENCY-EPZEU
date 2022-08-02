using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V32", Namespace = Namespaces.ApplicationsNamespace)]
	public class V32 : ApplicationFormVBase<V32Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V32; }
        }
    }

    
    [XmlType(TypeName = "V32Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V32Fields : ApplicationFormVFieldsBase
    {
        #region Fields
        [XmlElement(Order = 801)]
        public F801_FormOfTransforming801 FormOfTransforming801 { get; set; }

        [XmlElement(Order = 802)]
        public F802_ReorganizeCoOperatives ReorganizeCoOperatives { get; set; }

        [XmlElement(Order = 803)]
        public F803_Successors803 Successors803 { get; set; }

        [XmlElement(Order = 804)]
        public F804_ReorgBranches Branches804 { get; set; }

        #endregion
    }
}