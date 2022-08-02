using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "Objectives", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Objectives", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F006b_Objectives : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "00062";

        #region Private members

        private string text = "";

        private string textExt = "";

        string rejectedText = "";

        #endregion

        #region Properties

        [XmlAttribute]
        public bool IsBFLE { get; set; }

        public string Text { get; set; }

        public string TextExt { get; set; }
        
        #endregion
    }
}