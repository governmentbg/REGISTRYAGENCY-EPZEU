﻿using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "EraseProcura", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "EraseProcura", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F044_EraseProcura : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00440";

        [XmlIgnore]
        public bool Cheked { get; set; }

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return Cheked ? "1" : "0"; }
            set { Cheked = (value == "1"); }
        }
    }
}