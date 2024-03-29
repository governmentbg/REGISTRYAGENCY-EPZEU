﻿using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{

    [XmlType(TypeName = "AddemptionOfTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "AddemptionOfTrader", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F027_AddemptionOfTrader : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00270";

        #region Private members 

        private bool _checked;

        #endregion

        #region Json Properties

        [XmlIgnore]
        public bool Cheked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        #endregion

        #region Xml Properties

        [XmlText]
        [JsonIgnore]
        public string Text
        {
            get { return _checked ? "1" : "0"; }
            set { _checked = (value == "1"); }
        }

        #endregion
    }
}