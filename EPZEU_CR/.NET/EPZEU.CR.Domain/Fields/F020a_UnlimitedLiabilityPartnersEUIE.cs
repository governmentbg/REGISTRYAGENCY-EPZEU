using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "UnlimitedLiabilityPartnerEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "UnlimitedLiabilityPartnerEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F0201_UnlimitedLiabilityPartnerEUIE : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002010";

        #region Private members

        private DateTime? _date;

        #endregion

        [XmlElement(ElementName = "Subject")]
        public Person Subject { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }

        [XmlIgnore]
        public bool? NoObligationsEUIE { get; set; }

        [XmlIgnore]
        public DateTime? Date
        {
            get { return _date; }
            set { _date = value; }
        }

        [JsonIgnore]
        public string NoObligationsEUIEText
        {
            get { return NoObligationsEUIE.HasValue && NoObligationsEUIE.Value ? "1" : "0"; }
            set { NoObligationsEUIE = (value == "1"); }
        }

        [JsonIgnore]
        public string DateOfAcceptanceEUIE
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
    }

    [XmlType(TypeName = "UnlimitedLiabilityPartnersEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "UnlimitedLiabilityPartnersEUIE", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F020a_UnlimitedLiabilityPartnersEUIE : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00201";

        [XmlElement(ElementName = "UnlimitedLiabilityPartnerEUIE")]
        public List<F0201_UnlimitedLiabilityPartnerEUIE> UnlimitedLiabilityPartnerEUIEList { get; set; }
    }
}