using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{

    [XmlType(TypeName = "LimitInsuaranceActivity106", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "LimitInsuaranceActivity106", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F1060_LimitInsuaranceActivity106 : Record
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "010600";

        [XmlAttribute("insuaranceType")]
        public string InsuaranceType { get; set; }

        [XmlIgnore]
        public bool ForbiddanceOfNewContracts { get; set; }

        [XmlAttribute("forbiddanceOfNewContracts")]
        [JsonIgnore]
        public string ForbiddanceOfNewContractsText
        {
            get { return ForbiddanceOfNewContracts ? "1" : "0"; }
            set { ForbiddanceOfNewContracts = (value == "1"); }
        }

        [XmlIgnore]
        public bool ForbiddanceToExtendContracts { get; set; }

        [XmlAttribute("forbiddanceToExtendContracts")]
        [JsonIgnore]
        public string ForbiddanceToExtendContractsText
        {
            get { return ForbiddanceToExtendContracts ? "1" : "0"; }
            set { ForbiddanceToExtendContracts = (value == "1"); }
        }

        [XmlIgnore]
        public bool ForbiddanceToWidenContracts { get; set; }

        [XmlAttribute("forbiddanceToWidenContracts")]
        [JsonIgnore]
        public string ForbiddanceToWidenContractsText
        {
            get { return ForbiddanceToWidenContracts ? "1" : "0"; }
            set { ForbiddanceToWidenContracts = (value == "1"); }
        }

        [XmlAttribute("fobiddenTill")]
        public string FobiddenTill { get; set; }
    }

    [XmlType(TypeName = "LimitSubjectOfActivity106", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "LimitSubjectOfActivity106", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F106_LimitSubjectOfActivity106 : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "01060";

        [XmlElement(ElementName = "LimitInsuaranceActivity106")]
        public List<F1060_LimitInsuaranceActivity106> LimitInsuaranceActivityList { get; set; }
    }
}
