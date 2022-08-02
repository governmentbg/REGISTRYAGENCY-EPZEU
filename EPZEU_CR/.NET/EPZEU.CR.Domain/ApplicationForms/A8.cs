using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A8", Namespace = Namespaces.ApplicationsNamespace)]
	public class A8 : ApplicationFormABase<A8Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A8; }
        }
    }

    
    [XmlType(TypeName = "A8Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A8Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 102)]
        public F0102_Representatives102 Representatives102 { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 541)]
        public F054a_VolumeOfRepresentationPower541 VolumeOfRepresentationPower541 { get; set; }

        [XmlElement(Order = 220)]
        public F022_ForeignTraders ForeignTraders { get; set; }

        [XmlElement(Order = 221)]
        public F022a_DiscontinuanceOfForeignTrader DiscontinuanceOfForeignTrader { get; set; }

        [XmlElement(Order = 222)]
        public F022b_InsolvenciesOfForeignTrader InsolvenciesOfForeignTrader { get; set; }

        [XmlElement(Order = 280)]
        public F028_ClosureBranchOfForeignTrader ClosureBranchOfForeignTrader { get; set; }

        #endregion
    }
}