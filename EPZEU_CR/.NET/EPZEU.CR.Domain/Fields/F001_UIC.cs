using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "UIC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "UIC", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]    
    public partial class F001_UIC : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00010";

        #region Properties

        [XmlAttribute("uic")]
        public string Text { get; set; }

        [XmlAttribute("IsNew")]
        public bool IsNew { get; set; }

        public string CompanyControl { get; set; }

        public BulstatDeed BulstatDeed { get; set; }

        #endregion
    }

    [XmlType(TypeName = "UIC")]
    public partial class UIC
    {
        #region Properties

        [XmlAttribute("uic")]
        public string Text { get; set; }

        [XmlAttribute("IsNew")]
        public bool IsNew { get; set; }

        public string CompanyControl { get; set; }

        public BulstatDeed BulstatDeed { get; set; }

        #endregion
    }
}
