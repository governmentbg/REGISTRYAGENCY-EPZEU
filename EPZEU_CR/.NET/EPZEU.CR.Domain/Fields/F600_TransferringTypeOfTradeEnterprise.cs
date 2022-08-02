using EPZEU.CR.Domain.Fields.Common;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "TransferringTypeOfTradeEnterprise", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "TransferringTypeOfTradeEnterprise", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F600_TransferringTypeOfTradeEnterprise : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "06000";

        [XmlIgnore]
        public bool Fulltransfer { get; set; }
        [XmlIgnore]
        public bool Partialtransfer { get; set; }
        [XmlIgnore]
        public bool Taketransfer { get; set; }


        [XmlAttribute("FullTransfer")]
        [JsonIgnore]
        public string FullTransferText
        {
            get { return Fulltransfer ? "1" : "0"; }
            set { Fulltransfer = (value == "1"); }
        }

        [XmlAttribute("PartialTransfer")]
        [JsonIgnore]
        public string PartialTransferText
        {
            get { return Partialtransfer ? "1" : "0"; }
            set { Partialtransfer = (value == "1"); }
        }

        [XmlAttribute("TakeTransfer")]
        [JsonIgnore]
        public string TakeTransferText
        {
            get { return Taketransfer ? "1" : "0"; }
            set { Taketransfer = (value == "1"); }
        }
    }
}
