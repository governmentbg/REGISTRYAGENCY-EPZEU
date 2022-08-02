using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "BRISChangeCompanyEUIDReceptionMessage", Namespace = Namespaces.ApplicationsNamespace)]
    public class BRISChangeCompanyEUIDReceptionMessage : ApplicationWithFieldsFormBase<BRISFields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.BRISChangeCompanyEUIDReceptionMessage; }
        }
    }
}