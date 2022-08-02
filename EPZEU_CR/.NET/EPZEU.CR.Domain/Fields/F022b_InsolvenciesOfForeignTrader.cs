using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "InsolvencyOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "InsolvencyOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F02220_InsolvencyOfForeignTrader : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "002220";

        #region Json Properties

        [XmlIgnore]
        public bool Decision759 { get; set; }

        [XmlIgnore]
        public bool Decision760 { get; set; }

        [XmlIgnore]
        public DateTime? Date { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("InsolvencyText")]
        public string InsolvencyText { get; set; }

        [XmlAttribute("ActNumber")]
        public string ActNumber { get; set; }

        [XmlAttribute("ActDate")]
        [JsonIgnore]
        public string ActDate
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

        [XmlAttribute("JudicialCode")]
        public string JudicialCode { get; set; }

        [XmlAttribute("Decision759")]
        [JsonIgnore]
        public string Decision759Text
        {
            get { return Decision759 ? "1" : "0"; }
            set { Decision759 = (value == "1"); }
        }

        [XmlAttribute("Decision760")]
        [JsonIgnore]
        public string Decision760Text
        {
            get { return Decision760 ? "1" : "0"; }
            set { Decision760 = (value == "1"); }
        }

        #endregion
    }

    [XmlType(TypeName = "InsolvenciesOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "InsolvenciesOfForeignTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F022b_InsolvenciesOfForeignTrader : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00222";

        [XmlElement(ElementName = "InsolvencyOfForeignTrader")]
        public List<F02220_InsolvencyOfForeignTrader> InsolvencyOfForeignTraderList { get; set; }
    }
}