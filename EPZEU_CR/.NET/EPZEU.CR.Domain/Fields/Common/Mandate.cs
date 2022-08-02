using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public abstract partial class Mandate : Record
    {
        #region Json Properties

        [XmlIgnore]
        public DateTime? Date { get; set; }

        [XmlAttribute]
        public string MandateTypeText { get; set; }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return Date.HasValue ? Date.Value.ToString("dd.MM.yyyy") : ""; }
            set
            {
                DateTime tmpDate;

                if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out tmpDate))
                    Date = tmpDate;
                else
                    Date = null;
            }
        }

        #endregion
    }
}