using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "RestoringManagementRight", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "RestoringManagementRight", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F320_RestoringManagementRight : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "03200";

        #region Json Properties

        [XmlIgnore]
        public bool Checked { get; set; }

        #endregion

        #region Xml Properties

        [JsonIgnore]
        [XmlText]
        public string Text
        {
            get { return Checked ? "1" : "0"; }
            set { Checked = (value == "1"); }
        }

        #endregion
    }
}
