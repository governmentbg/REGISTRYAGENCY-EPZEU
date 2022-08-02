using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "D1", Namespace = Namespaces.ApplicationsNamespace)]
    public class D1 : ApplicationWithFieldsFormBase<D1Fields>
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.D1; }
        }
    }

    [XmlType(TypeName = "D1Fields", Namespace = Namespaces.FieldsNamespace)]
    public class D1Fields : ApplicationFormFieldsBase
    {
        #region Fields

        [XmlElement(Order = 20)]
        public F002_Company Company { get; set; }

        [XmlElement(Order = 30)]
        public F003_LegalForm LegalForm { get; set; }

        [XmlElement(Order = 40)]
        public F004_Transliteration Transliteration { get; set; }

        [XmlElement(Order = 290)]
        public F029_PersonConcerned PersonConcerned { get; set; }

        [XmlElement(Order = 272)]
        public F027b_EraseReservation EraseReservation { get; set; }

        #endregion
    }
}