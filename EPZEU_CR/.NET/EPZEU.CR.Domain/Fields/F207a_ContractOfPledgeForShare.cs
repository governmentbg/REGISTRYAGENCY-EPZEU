using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "ContractOfPledgeForShare", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "ContractOfPledgeForShare", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F207a_ContractOfPledgeForShare : TextRecordField
    {
        #region Private members

        private DateTime? _date;

        #endregion

        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02071";

        #region Json Properties

        [XmlIgnore]
        public DateTime? Date
        {
            get { return _date; }
            set { _date = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public override string Text
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

        [XmlAttribute]
        public string TermType { get; set; }

        #endregion
    }
}
