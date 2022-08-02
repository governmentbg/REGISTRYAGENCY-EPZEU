using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V21", Namespace = Namespaces.ApplicationsNamespace)]
	public class V21 : ApplicationFormVBase<V21Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V21; }
        }
    }

    
    [XmlType(TypeName = "V21Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V21Fields : ApplicationFormVFieldsBase
    {
        #region Fields

        [XmlElement(Order = 701)]
        public F701_FormOfTransforming701 FormOfTransforming701 { get; set; }

        [XmlElement(Order = 702)]
        public F702_TransformingCompanys TransformingCompanys { get; set; }

        [XmlElement(Order = 703)]
        public F703_Successors Successors703 { get; set; }

        #endregion
    }
}