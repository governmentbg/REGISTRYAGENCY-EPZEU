using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A18", Namespace = Namespaces.ApplicationsNamespace)]
	public class A18 : ApplicationFormABase<A18Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A18; }
        }
    }

    
    [XmlType(TypeName = "A18Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A18Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 103)]
        public F0103_Representatives103 Representatives103 { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }


        [XmlElement(Order = 171)]
        public F017a_DesignatedToPerformPublicBenefit DesignatedToPerformPublicBenefit { get; set; }

        [XmlElement(ElementName = "VolumeOfRepresentationPower541", Order = 541)]
        public F054a_VolumeOfRepresentationPower541 VolumeOfRepresentationPower { get; set; }

        [XmlElement(Order = 173)]
        public F017v_RestorationOfStatusInPublicBenefit RestorationOfStatusInPublicBenefit { get; set; }

        [XmlElement(Order = 174)]
        public F017g_DesignatedToCarryOutPrivateActivity DesignatedToCarryOutPrivateActivity { get; set; }

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