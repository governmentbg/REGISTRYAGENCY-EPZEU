using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    /// <summary>
    /// Седалище.
    /// </summary>
    [XmlType(TypeName = "Seat", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "Seat", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F005_Seat : SeatRecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        /// <summary>
        /// Идентификатор на поле.
        /// </summary>
        public const string FieldIdentCode = "00050";
    }
}
