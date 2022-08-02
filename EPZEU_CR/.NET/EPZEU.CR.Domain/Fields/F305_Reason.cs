using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Reason", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Reason", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F305_Reason : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03050";

        #region Private members

        private DateTime? _date;

        #endregion

        [XmlText]
        public string Text { get; set; }


        #region Json Properties

        [XmlIgnore]
        public bool Contract { get; set; }

        [XmlIgnore]
        public bool CourtOrder { get; set; }

        [XmlIgnore]
        public bool AdministrativAct { get; set; }

        [XmlIgnore]
        public bool OtherSource { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("Contract")]
        [JsonIgnore]
        public string ContractText
        {
            get { return Contract ? "1" : "0"; }
            set { Contract = (value == "1"); }
        }

        [XmlAttribute("CourtOrder")]
        [JsonIgnore]
        public string CourtOrderText
        {
            get { return CourtOrder ? "1" : "0"; }
            set { CourtOrder = (value == "1"); }
        }

        [XmlAttribute("AdministrativAct")]
        [JsonIgnore]
        public string AdministrativActText
        {
            get { return AdministrativAct ? "1" : "0"; }
            set { AdministrativAct = (value == "1"); }
        }

        [XmlAttribute("OtherSource")]
        [JsonIgnore]
        public string OtherSourceText
        {
            get { return OtherSource ? "1" : "0"; }
            set { OtherSource = (value == "1"); }
        }

        [XmlAttribute("Date")]
        [JsonIgnore]
        public string DateText
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

        #region Json Properties

        [XmlIgnore]
        public DateTime? Date
        {
            get { return _date; }
            set { _date = value; }
        }

        #endregion
    }
}
