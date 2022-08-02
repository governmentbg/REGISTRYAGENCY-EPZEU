﻿using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DebtorBodiesSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DebtorBodiesSecIns", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F903_2_DebtorBodiesSecIns : BankruptcyRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "09032";

        [XmlAttribute]
        [JsonIgnore]
        public string Visible
        {
            get { return IsVisible ? "1" : "0"; }
            set { IsVisible = (value == "1"); }
        }
    }
}
