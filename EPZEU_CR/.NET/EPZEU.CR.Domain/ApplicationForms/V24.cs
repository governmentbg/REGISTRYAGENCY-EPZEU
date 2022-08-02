using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V24", Namespace = Namespaces.ApplicationsNamespace)]
	public class V24 : ApplicationFormVBase<V24Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V24; }
        }
    }

    
    [XmlType(TypeName = "V24Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V24Fields : ApplicationFormVFieldsBase
    {
        #region Fields
        [XmlElement(Order = 701)]
        public F701_FormOfTransforming701 FormOfTransforming701 { get; set; }

        [XmlElement(Order = 702)]
        public F702a_TransformingCompanys2 TransformingCompanys2 { get; set; }

        [XmlElement(Order = 703)]
        public F703_Successors Successors703 { get; set; }
        #endregion
    }
}