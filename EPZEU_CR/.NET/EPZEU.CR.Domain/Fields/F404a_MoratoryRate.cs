using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "MoratoryRate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "MoratoryRate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F404a_MoratoryRate : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "04041";
        #region Private members

        private DateTime? _date;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public DateTime? Date
        {
            get { return _date; }
            set { _date = value; }
        }

        #endregion

        #region Xml Properties

        public Price Price { get; set; }

        [XmlElement]
        [JsonIgnore]
        public string DateOfCalculation
        {
            get { return _date.HasValue ? _date.Value.ToString("dd.MM.yyyy") : ""; }
            set
            {
                DateTime tmpDate;

                if (DateTime.TryParseExact(value, "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out tmpDate))
                    _date = tmpDate;
                else
                    _date = null;
            }
        }

        #endregion
    }
}