using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "G2", Namespace = Namespaces.ApplicationsNamespace)]
	public class G2 : ApplicationFormGBase<G2Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.G2; }
        }
    }

    
    [XmlType(TypeName = "G2Fields", Namespace = Namespaces.FieldsNamespace)]
	public class G2Fields : ApplicationFormGFieldsBase
    {
    }
}