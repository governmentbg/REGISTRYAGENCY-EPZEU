using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B2", Namespace = Namespaces.ApplicationsNamespace)]
	public class B2 : ApplicationFormBBase<B2Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B2; }
        }
    }

    
    [XmlType(TypeName = "B2Fields", Namespace = Namespaces.FieldsNamespace)]
	public class B2Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 511)]
        public F051a_BranchFirm BranchFirm { get; set; }

        [XmlElement(Order = 512)]
        public F051b_BranchIdentifier BranchIdentifier { get; set; }

        [XmlElement(Order = 510)]
        public F051_BranchSeat BranchSeat { get; set; }

        [XmlElement(Order = 520)]
        public F052_BranchSubjectOfActivity BranchSubjectOfActivity { get; set; }

        [XmlElement(Order = 521)]
        public F052a_MainActivityNKID MainActivityNKID { get; set; }

        [XmlElement(Order = 530)]
        public F053_BranchManagers BranchManagers { get; set; }

        [XmlElement(Order = 540)]
        public F054_VolumeOfRepresentationPower VolumeOfRepresentationPower { get; set; }

        [XmlElement(Order = 550)]
        public F055_BranchClosure BranchClosure { get; set; }

        #endregion
    }
}