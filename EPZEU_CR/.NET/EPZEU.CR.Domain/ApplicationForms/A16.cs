using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "A16", Namespace = Namespaces.ApplicationsNamespace)]
	public class A16 : ApplicationFormABase<A16Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.A16; }
        }
    }

    
    [XmlType(TypeName = "A16Fields", Namespace = Namespaces.FieldsNamespace)]
	public class A16Fields : ApplicationFormAFieldsBase
    {
        #region Fields

        [XmlElement(Order = 103)]
        public F0103_Representatives103 Representatives103 { get; set; }

        [XmlElement(Order = 110)]
        public F011_WayOfRepresentation WayOfRepresentation { get; set; }

        [XmlElement(Order = 124)]
        public F012g_Authorities12g Authorities12g { get; set; }

        [XmlElement(Order = 125)]
        public F012d_ManagementBodies12d ManagementBodies12d { get; set; }

        [XmlElement(ElementName = "TermОfЕxistenceNonProfitLegalEntity", Order = 163)]
        public F016v_TermOfExistenceNonProfitLegalEntity TermOfExistenceNonProfitLegalEntity { get; set; }

        [XmlElement(Order = 170)]
        public F017_SpecialConditions SpecialConditions { get; set; }

        [XmlElement(Order = 171)]
        public F017a_DesignatedToPerformPublicBenefit DesignatedToPerformPublicBenefit { get; set; }

        [XmlElement(Order = 173)]
        public F017v_RestorationOfStatusInPublicBenefit RestorationOfStatusInPublicBenefit { get; set; }

        [XmlElement(Order = 174)]
        public F017g_DesignatedToCarryOutPrivateActivity DesignatedToCarryOutPrivateActivity { get; set; }

        [XmlElement(Order = 252)]
        public F025b_TotalAmountOfInitialPropertyContributions TotalAmountOfInitialPropertyContributions { get; set; }

        [XmlElement(Order = 270)]
        public F027_AddemptionOfTrader AddemptionOfTrader { get; set; }

        #endregion
    }
}