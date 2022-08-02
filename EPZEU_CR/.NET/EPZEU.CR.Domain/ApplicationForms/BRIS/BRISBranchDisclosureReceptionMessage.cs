using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "BRISBranchDisclosureReceptionMessage", Namespace = Namespaces.ApplicationsNamespace)]
    public class BRISBranchDisclosureReceptionMessage : ApplicationWithFieldsFormBase<BRISFields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.BRISBranchDisclosureReceptionMessage; }
        }
    }
}