using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "V22", Namespace = Namespaces.ApplicationsNamespace)]
	public class V22 : ApplicationFormVBase<V22Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.V22; }
        }
    }

    
    [XmlType(TypeName = "V22Fields", Namespace = Namespaces.FieldsNamespace)]
	public class V22Fields : ApplicationFormVFieldsBase
    {
        #region Fields

        [XmlElement(Order = 701)]
        public F701_FormOfTransforming701 FormOfTransforming701 { get; set; }

        [XmlElement(Order = 702)]
        public F702_TransformingCompanys TransformingCompanys { get; set; }

        [XmlElement(Order = 703)]
        public F703_Successors Successors703 { get; set; }

        [XmlElement(Order = 704)]
        public F704_Branches704 Branches704 { get; set; }

        #endregion
    }
}