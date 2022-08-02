using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "B1", Namespace = Namespaces.ApplicationsNamespace)]
    public class B1 : ApplicationFormBBase<B1Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.B1; }
        }
    }


    [XmlType(TypeName = "B1Fields", Namespace = Namespaces.FieldsNamespace)]
    public class B1Fields : ApplicationFormBFieldsBase
    {
        #region Fields

        [XmlElement(Order = 410)]
        public F041_Procurators Procurators { get; set; }

        [XmlElement(Order = 420)]
        public F042_SepcialPowers SepcialPowers { get; set; }

        [XmlElement(ElementName = "WayOfRepresentation43", Order = 430)]
        public F043_WayOfRepresentation43 WayOfRepresentation { get; set; }

        [XmlElement(Order = 440)]
        public F044_EraseProcura EraseProcura { get; set; }

        #endregion
    }
}