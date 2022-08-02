using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType("ShareTransfer")]
    public partial class F0240_ShareTransfer : Record
    {
        #region Private members

        private DateTime? _date;

        #endregion

        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002400";

        #region Properties

        public Person OldOwner { get; set; }

        public Person NewOwner { get; set; }

        public string ShareAmount { get; set; }

        [JsonIgnore]
        public string Date
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

        public long? OldOwnerCountryID { get; set; }

        public string OldOwnerCountryName { get; set; }

        public long? NewOwnerCountryID { get; set; }

        public string NewOwnerCountryName { get; set; }

        #endregion

        #region Json Properties

        [XmlIgnore]
        public DateTime? TransferDate
        {
            get { return _date; }
            set { _date = value; }
        }

        #endregion
    }

    [XmlType(TypeName = "ShareTransfers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "ShareTransfers", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F024_ShareTransfers : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00240";

        [XmlElement(ElementName = "ShareTransfer")]
        public List<F0240_ShareTransfer> ShareTransfersList { get; set; }
    }
}