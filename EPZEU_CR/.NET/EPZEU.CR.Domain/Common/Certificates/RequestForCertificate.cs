using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common.Certificates
{
    public class RequestForCertificate
    {
        #region Fields

        private string _nameOfType = "";

        private string _uicNumber = "";

        private string _firmName = "";

        private string _email = "";

        #endregion

        #region Xml Properties

        public string NameOfType
        {
            get { return _nameOfType; }
            set { _nameOfType = value ?? _nameOfType; }
        }

        public string UICNumber
        {
            get { return _uicNumber; }
            set { _uicNumber = value ?? _uicNumber; }
        }

        public string FirmName
        {
            get { return _firmName; }
            set { _firmName = value ?? _firmName; }
        }

        [JsonIgnore]
        public string FromDate
        {
            get { return DateFrom.HasValue ? DateFrom.Value.ToString("dd.MM.yyyy") : ""; }
            set
            {
                DateTime tmpDate;

                if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out tmpDate))
                    DateFrom = tmpDate;
                else
                    DateFrom = null;
            }
        }

        [JsonIgnore]
        public string ToDate
        {
            get { return DateTo.HasValue ? DateTo.Value.ToString("dd.MM.yyyy") : ""; }
            set
            {
                DateTime tmpDate;

                if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out tmpDate))
                    DateTo = tmpDate;
                else
                    DateTo = null;
            }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value ?? _email; }
        }

        [XmlArrayItem("FieldIdent")]
        public List<string> FieldIdents { get; set; }

        [XmlIgnore]
        public List<string> DraftFieldIdents { get; set; }

        #endregion

        #region Json Properties

        [XmlIgnore]
        public DateTime? DateFrom { get; set; }
      
        [XmlIgnore]
        public DateTime? DateTo { get; set; }

        [XmlIgnore]
        public bool? IncludeHistory { get; set; }

        [XmlIgnore]
        public string LegalFormFull { get; set; }

        #endregion
    }
}