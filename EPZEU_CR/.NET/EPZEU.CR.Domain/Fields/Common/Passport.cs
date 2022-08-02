using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Паспорт.
    /// </summary>
    public partial class Passport
    {
        private DateTime? _issuedDate;

        #region Json Properties

        /// <summary>
        /// Дата на издаване.
        /// </summary>
        [XmlIgnore]
        public DateTime? IssuedDate
        {
            get { return _issuedDate; }
            set { _issuedDate = value; }
        }

        #endregion

        #region Xml Properties

        /// <summary>
        /// Номер.
        /// </summary>
        public string Number { get; set; }

        /// <summary>
        /// Датана издаване.
        /// </summary>
        [JsonIgnore]
        public string IssueDate
        {
            get { return _issuedDate.HasValue ? _issuedDate.Value.ToString("dd.MM.yyyy") : ""; }
            set
            {
                DateTime tmpDate;

                if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out tmpDate))
                    _issuedDate = tmpDate;
                else
                    _issuedDate = null;
            }
        }

        /// <summary>
        /// Издаден от.
        /// </summary>
        public string IssuedFrom { get; set; }

        #endregion
    }
}