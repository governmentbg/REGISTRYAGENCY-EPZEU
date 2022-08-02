using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B5", Namespace = Namespaces.ApplicationsNamespace)]
	public class B5 : ApplicationFormBBase<B5Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B5; }
        }
    }

    
    [XmlType(TypeName = "B5Fields", Namespace = Namespaces.FieldsNamespace)]
	public class B5Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 4000)]
        public F400_DistraintIdentifier DistraintIdentifier { get; set; }

        [XmlElement(Order = 4010)]
        public F401_Distraints Distraints { get; set; }

        [XmlElement(Order = 4030)]
        public F403_Reason403 Reason403 { get; set; }

        [XmlElement(Order = 4040)]
        public F404_Size404 Size404 { get; set; }

        [XmlElement(Order = 4041)]
        public F404a_MoratoryRate MoratoryRate { get; set; }

        [XmlElement(Order = 4050)]
        public F405_Interests Interests { get; set; }

        [XmlElement(Order = 4060)]
        public F406_Descriptions Descriptions { get; set; }

        [XmlElement(Order = 4080)]
        public F408_LiftingDistraint LiftingDistraint { get; set; }

        [XmlElement(Order = 4090)]
        public F409_Size409 Size409 { get; set; }

        [XmlElement(Order = 4100)]
        public F410_StopExecutionOverProperty410 StopExecutionOverProperty410 { get; set; }

        

        #endregion
    }
}