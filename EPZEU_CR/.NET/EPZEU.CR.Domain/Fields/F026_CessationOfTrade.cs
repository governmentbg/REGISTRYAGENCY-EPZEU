using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "CessationOfTrade", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "CessationOfTrade", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F026_CessationOfTrade : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00260";

        #region Json Properties

        [XmlIgnore]
        public bool Cheked { get; set; }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return Cheked ? "1" : "0"; }
            set { Cheked = (value == "1"); }
        }

        #endregion
    }
}
