using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class MannerRecordHolder : TextRecordField
    {
        #region Json Properties

        [XmlIgnore]
        public bool Jointly { get; set; }

        [XmlIgnore]
        public bool Severally { get; set; }

        [XmlIgnore]
        public bool OtherWay { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("jointly")]
        [JsonIgnore]
        public string JointlyText
        {
            get { return Jointly ? "1" : "0"; }
            set { Jointly = (value == "1"); }
        }

        [XmlAttribute("severally")]
        [JsonIgnore]
        public string SeverallyText
        {
            get { return Severally ? "1" : "0"; }
            set { Severally = (value == "1"); }
        }

        [XmlAttribute("otherWay")]
        [JsonIgnore]
        public string OtherWayText
        {
            get { return OtherWay ? "1" : "0"; }
            set { OtherWay = (value == "1"); }
        }

        #endregion
    }
}