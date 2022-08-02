using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V23", Namespace = Namespaces.ApplicationsNamespace)]
	public class V23 : ApplicationFormVBase<V23Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V23; }
        }
    }

    
    [XmlType(TypeName = "V23Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V23Fields : ApplicationFormVFieldsBase
    {
        #region Fields
        [XmlElement(Order = 705)]
        public F705_StoppingEntry StoppingEntry { get; set; }

        [XmlElement(Order = 706)]
        public F706_NumberApplication NumberApplication { get; set; }

        [XmlElement(Order = 702)]
        public F702_TransformingCompanys TransformingCompanys { get; set; }

        [XmlElement(Order = 7021)]
        public F702a_TransformingCompanys2 TransformingCompanys2 { get; set; }

        [XmlElement(Order = 703)]
        public F703_Successors Successors703 { get; set; }

        #endregion
    }
}