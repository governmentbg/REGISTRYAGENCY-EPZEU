using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "PledgeRenewDate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "PledgeRenewDate", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F224_PledgeRenewDate : TextRecordField
    {
        [XmlIgnore]
        private bool? _processingRenewDistraintRequired;

        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02240";

        #region Json Properties

        [XmlIgnore]
        public DateTime? Date { get; set; }

        [XmlIgnore]
        public bool? ProcessingRenewDistraintRequired
        {
            get { return _processingRenewDistraintRequired; }
            set { _processingRenewDistraintRequired = value.GetValueOrDefault(); }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public override string Text
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

        [JsonIgnore]
        [XmlAttribute("ProcessingRenewDistraintRequired")]
        public string RenewDistraintText
        {
            get { return ProcessingRenewDistraintRequired.HasValue && ProcessingRenewDistraintRequired.Value ? "1" : "0"; }
            set { ProcessingRenewDistraintRequired = (value == "1"); }
        }

        #endregion
    }
}