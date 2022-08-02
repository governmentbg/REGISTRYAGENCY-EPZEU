using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class CheckRecordField : RecordField
    {
        #region Json Properties

        [XmlIgnore]
        public bool Cheked { get; set; }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return Cheked ? "1" : "0"; }
            set { Cheked = (value == "1"); }
        }

        #endregion
    }
}
