using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(Namespace = Namespaces.ApplicationsNamespace)]
    public class AppealRefusal : ApplicationFormBase
    {
        #region Properties

        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.Complaint; }
        }

        [XmlElement(Order = 10)]
        public UIC UIC { get; set; }

        /// <summary>
        /// Жалбоподатели
        /// </summary>
        [XmlElement(Order = 100)]
        public ComplaintPersons ComplaintPersons { get; set; }

        /// <summary>
        /// Заявление по което е отказа
        /// </summary>
        [XmlElement(Order = 101)]
        public Refusal Refusal { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }

        #endregion
    }

    #region Refusal

    [XmlType(TypeName = "Refusal", Namespace = Namespaces.ApplicationsNamespace)]
    public class Refusal
    {
        [XmlAttribute]
        public string IncomingNo { get; set; }

        [XmlAttribute]
        public string OutgoingNo { get; set; }

        public long? RefusalID { get; set; }

        [XmlAttribute]
        public string Indent { get; set; }

        [XmlAttribute]
        public string Name { get; set; }

        [XmlAttribute]
        public string Description { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }
    }

    #endregion

    #region ComplaintPersons

    [XmlType(TypeName = "ComplaintPersons", Namespace = Namespaces.ApplicationsNamespace)]
    public class ComplaintPersons
    {
        [XmlElement(ElementName = "ComplaintPerson")]
        public List<ComplaintPerson> ComplaintPersonsList { get; set; }
    }

    [XmlType(TypeName = "ComplaintPerson")]
    public class ComplaintPerson 
    {
        [XmlElement(ElementName = "Person")]
        public Person Person { get; set; }

        [XmlElement(ElementName = "Address")]
        public Address Address { get; set; }

        [XmlElement(ElementName = "Passport")]
        public Passport Passport { get; set; }

        [XmlAttribute]
        public string BirthCountry { get; set; }

        [XmlAttribute]
        public string BirthPlace { get; set; }

        [XmlIgnore]
        public bool IncludeApplicant { get; set; }

        [XmlAttribute("IncludeApplicant")]
        [JsonIgnore]
        public string IncludeApplicantText
        {
            get { return IncludeApplicant ? "1" : "0"; }
            set { IncludeApplicant = (value == "1"); }
        }
    }

    #endregion
}
