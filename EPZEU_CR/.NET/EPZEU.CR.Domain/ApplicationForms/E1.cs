using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(ElementName = "E1", Namespace = Namespaces.ApplicationsNamespace)]
    public class E1 : ApplicationFormBase
    {
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.E1; }
        }

        [XmlElement(Order = 10)]
        public UIC UIC { get; set; }

        [XmlElement(Order = 100)]
        public ConformityWithLawReason ConformityWithLawReason { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }
    }


    public class ConformityWithLawReason
    {


        #region Json Properties

        [XmlIgnore]
        public bool EUContryCompanyFusion { get; set; }

        [XmlIgnore]
        public bool EUCountryCompanyEstablishing { get; set; }

        [XmlIgnore]
        public bool EUCompanySeatShifting { get; set; }

        [XmlIgnore]
        public bool EUCountryCoOperativeCompanyEstablishing { get; set; }

        [XmlIgnore]
        public bool EUCoOperativeCompanySeatShifting { get; set; }

        #endregion

        #region Xml Properties

        [XmlAttribute("EUContryCompanyFusion")]
        [JsonIgnore]
        public string FEUContryCompanyFusionText
        {
            get { return EUContryCompanyFusion ? "1" : "0"; }
            set { EUContryCompanyFusion = (value == "1"); }
        }

        [XmlAttribute("EUCountryCompanyEstablishing")]
        [JsonIgnore]
        public string EUCountryCompanyEstablishingText
        {
            get { return EUCountryCompanyEstablishing ? "1" : "0"; }
            set { EUCountryCompanyEstablishing = (value == "1"); }
        }

        [XmlAttribute("EUCompanySeatShifting")]
        [JsonIgnore]
        public string EUCompanySeatShiftingText
        {
            get { return EUCompanySeatShifting ? "1" : "0"; }
            set { EUCompanySeatShifting = (value == "1"); }
        }

        [XmlAttribute("EUCountryCoOperativeCompanyEstablishing")]
        [JsonIgnore]
        public string EUCountryCoOperativeCompanyEstablishingText
        {
            get { return EUCountryCoOperativeCompanyEstablishing ? "1" : "0"; }
            set { EUCountryCoOperativeCompanyEstablishing = (value == "1"); }
        }

        [XmlAttribute("EUCoOperativeCompanySeatShifting")]
        [JsonIgnore]
        public string EUCoOperativeCompanySeatShiftingText
        {
            get { return EUCoOperativeCompanySeatShifting ? "1" : "0"; }
            set { EUCoOperativeCompanySeatShifting = (value == "1"); }
        }

        #endregion
    }




}