using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B7", Namespace = Namespaces.ApplicationsNamespace)]
	public class B7 : ApplicationFormBBase<B7Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B7; }
        }
    }

    
    [XmlType(TypeName = "B7Fields", Namespace = Namespaces.FieldsNamespace)]
	public class B7Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 120)]
        public F001b_NumberNationalRegister1b NumberNationalRegister1b { get; set; }

        [XmlElement(Order = 5290)]
        public F529_ReasonForEntry529 ReasonForEntry529 { get; set; }

        [XmlElement(Order = 5310)]
        public F531_OffshoreCompany OffshoreCompany { get; set; }

        [XmlElement(Order = 5320)]
        public F532_OffshoreTransliteration OffshoreTransliteration { get; set; }

        [XmlElement(Order = 5330)]
        public F533_OffshoreSeat OffshoreSeat { get; set; }

        [XmlElement(Order = 5340)]
        public F534_OffshoreRepresentatives OffshoreRepresentatives { get; set; }

        [XmlElement(Order = 5350)]
        public F535_OffshoreWayOfRepresentation OffshoreWayOfRepresentation { get; set; }

        [XmlElement(Order = 5360)]
        public F536_OffshoreSpecialConditions OffshoreSpecialConditions { get; set; }

        [XmlElement(Order = 5370)]
        public F537_OffshoreDirectControlCompanies OffshoreDirectControlCompanies { get; set; }

        [XmlElement(Order = 5371)]
        public F5371_OffshoreDirectControlCompanyRepresentatives OffshoreDirectControlCompanyRepresentatives { get; set; }

        [XmlElement(Order = 5380)]
        public F538_OffshoreNoDirectControlCompanies OffshoreNoDirectControlCompanies { get; set; }

        [XmlElement(Order = 5381)]
        public F5381_OffshoreNoDirectControlCompanyRepresentatives OffshoreNoDirectControlCompanyRepresentatives { get; set; }

        [XmlElement(ElementName = "CircumstanceArticle4", Order = 5400)]
        public F540_CircumstanceArticle4 Article4 { get; set; }

        [XmlElement(Order = 5500)]
        public F550_ActualOwners ActualOwners { get; set; }

        [XmlElement(Order = 5501)]
        public F550a_ContactPerson550a ContactPerson550a { get; set; }

        [XmlElement(Order = 5510)]
        public F551_EraseActualOwner EraseActualOwner { get; set; }

        #endregion
    }
}