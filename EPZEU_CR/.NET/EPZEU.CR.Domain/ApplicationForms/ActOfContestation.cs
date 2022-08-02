using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(Namespace = Namespaces.ApplicationsNamespace)]
    public class ActOfContestation : ApplicationFormBase
    {
        #region Properties

        [XmlIgnore]
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.ActOfContestation; }
        }

        [XmlElement(Order = 100)]
        public ContestationAct ContestationAct { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }

        #endregion
    }

    #region ContestationAct

    [XmlType(TypeName = "ContestationAct", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace /*Namespaces.ApplicationsNamespace*/)]
    [XmlRoot(ElementName = "ContestationAct", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public class ContestationAct : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "X0110";

        [XmlAttribute]
        public string IncomingNumber { get; set; }

        [XmlIgnore]
        public DateTime? FromDate { get; set; }

        [XmlAttribute("FromDate")]
        [JsonIgnore]
        public string FromDateAttribute
        {
            get
            {
                return FromDate.HasValue ? FromDate.Value.ToString("dd.MM.yyyy") : null;
            }
            set
            {
                if (DateTime.TryParseExact(value, "dd.MM.yyyy", null, new System.Globalization.DateTimeStyles(), out DateTime tmpDate))
                {
                    FromDate = tmpDate;
                }
                else
                {
                    FromDate = null;
                }
            }
        }

        [XmlAttribute]
        public string CourtCode { get; set; }

        [XmlAttribute]
        public string OutgoingNumber { get; set; }

        [XmlAttribute]
        public string ActNumber { get; set; }

        [XmlElement(ElementName = "SenderType")]
        public ActSenderType SenderType { get; set; }
    }

    public enum ActSenderType
    {
        [XmlEnum("Undefined")]
        Undefined = 0,

        [XmlEnum("Officially")]
        Officially = 1,

        [XmlEnum("PublicProsecutor")]
        PublicProsecutor = 2,

        [XmlEnum("InterestedPerson")]
        InterestedPerson = 3
    }

    #endregion
}
