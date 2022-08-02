using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "SubjectOfActivity", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "SubjectOfActivity", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F006_SubjectOfActivity : TextRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00060";

        #region Properties

        [XmlAttribute("IsBank")]
        public bool IsBank { get; set; }

        [XmlAttribute("IsBankText")]
        public string IsBankText { get; set; }
       
        [XmlAttribute("IsInsurer")]
        public bool IsInsurer { get; set; }

        [XmlAttribute("IsInsurerText")]
        public string IsInsurerText { get; set; }

        #endregion
    }
}
