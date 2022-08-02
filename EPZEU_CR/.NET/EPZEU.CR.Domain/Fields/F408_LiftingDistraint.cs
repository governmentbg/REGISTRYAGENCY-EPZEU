using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "LiftingDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "LiftingDistraint", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F408_LiftingDistraint : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "04080";

        #region Xml Properties

        [XmlAttribute("CourtLegalExecutor")]
        public string CourtLegalExecutor { get; set; }

        [XmlAttribute("CaseNumber")]
        public string CaseNumber { get; set; }

        #endregion
    }
}