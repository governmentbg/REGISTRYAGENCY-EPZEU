using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V25", Namespace = Namespaces.ApplicationsNamespace)]
    public class V25 : ApplicationFormVBase<V25Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V25; }
        }
    }


    [XmlType(TypeName = "V25Fields", Namespace = Namespaces.FieldsNamespace)]
    public class V25Fields : ApplicationFormVFieldsBase
    {
        #region Fields

        [XmlElement(Order = 701)]
        public F701_FormOfTransforming701 FormOfTransforming701 { get; set; }

        [XmlElement(Order = 702)]
        public F702b_TransformingNPOs TransformingNPOs { get; set; }

        [XmlElement(Order = 703)]
        public F703_Successors Successors703 { get; set; }

        #endregion
    }
}
