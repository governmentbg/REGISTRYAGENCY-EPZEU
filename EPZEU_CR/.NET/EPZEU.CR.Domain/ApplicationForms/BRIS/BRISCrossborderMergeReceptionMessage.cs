using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Common.BRIS;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "BRISCrossborderMergeReceptionMessage", Namespace = Namespaces.ApplicationsNamespace)]
    public class BRISCrossborderMergeReceptionMessage : ApplicationWithFieldsFormBase<BRISFields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.BRISCrossborderMergeReceptionMessage; }
        }
    }

    [XmlType(TypeName = "BRISFields", Namespace = Namespaces.FieldsNamespace)]
    public class BRISFields : ApplicationFormFieldsBase
    {
        #region Fields

        [XmlElement(Order = 10, ElementName = "UIC", Namespace = Namespaces.FieldsNamespace)]
        public F001_UIC UICElement { get; set; }

        [XmlElement(Order = 1010, Namespace = Namespaces.FieldsNamespace)]
        public BRISMesageDetails BRISMesageDetails { get; set; }

        [XmlElement(Order = 1020, Namespace = Namespaces.FieldsNamespace)]
        public BRISCompanies BRISCompanies { get; set; }

        #endregion
    }
}
