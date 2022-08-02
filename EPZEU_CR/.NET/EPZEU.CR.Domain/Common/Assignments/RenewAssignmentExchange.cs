using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Assignments
{
    [XmlType(TypeName = "RenewAssignmentExchange")]
    public class RenewAssignmentExchange
    {
        private bool _checked { get; set; }

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }
    }
}