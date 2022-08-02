using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "AppointingType")]
    public class AppointingType
    {
        public AppointingExpertType AppointingExpertType { get; set; }

        [XmlAttribute("AppointingExpertType")]
        public string AppointingExpertTypeText
        {
            get { return this.AppointingExpertType.ToString(); }
        }
    }
}