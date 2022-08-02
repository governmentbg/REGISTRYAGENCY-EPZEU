using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V26", Namespace = Namespaces.ApplicationsNamespace)]
    public class V26 : ApplicationFormVBase<V26Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V26; }
        }
    }

    [XmlType(TypeName = "V26Fields", Namespace = Namespaces.FieldsNamespace)]
    public class V26Fields : ApplicationFormVFieldsBase
    {
        #region Fields

        [XmlElement(Order = 701)]
        public F701_FormOfTransforming701 FormOfTransforming701 { get; set; }

        [XmlElement(Order = 702)]
        public F702b_TransformingNPOs TransformingNPOs { get; set; }

        [XmlElement(Order = 703)]
        public F703_Successors Successors703 { get; set; }

        [XmlElement(Order = 704)]
        public F704_Branches704 Branches704 { get; set; }

        #endregion
    }
}
