using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "G3", Namespace = Namespaces.ApplicationsNamespace)]
	public class G3 : ApplicationFormGBase<G3Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.G3; }
        }
    }

    
    [XmlType(TypeName = "G3Fields", Namespace = Namespaces.FieldsNamespace)]
	public class G3Fields : ApplicationFormGFieldsBase
    {
    }
}