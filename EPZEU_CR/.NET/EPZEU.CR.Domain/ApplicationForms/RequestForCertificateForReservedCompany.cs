using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    [XmlRoot(Namespace = Namespaces.ApplicationsNamespace)]
    public class RequestForCertificateForReservedCompany : RequestForCertificateBase
    {
        [XmlIgnore]
        public override ApplicationFormTypes AppType
        {
            get { return ApplicationFormTypes.CertificateForReserveFirm; }
        }

        [XmlElement(Order = 1)]
        public CertificateForReservedCompany Certificate { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }
    }

    public class CertificateForReservedCompany
    {
        #region Fields

        private string _firm = "";

        private string _personConcernedName = "";

        private string _personConcernedQuality = "";

        private string _endDate = "";

        private string _fromDate = "";

        private string _applicantName = "";

        private string _translit = "";

        private string _date = "";

        private string _period = "";

        private string _email = "";

        #endregion

        #region Properties

        public string Firm
        {
            get { return _firm; }
            set { _firm = value ?? _firm; }
        }

        public string PersonConcernedName
        {
            get { return _personConcernedName; }
            set { _personConcernedName = value ?? _personConcernedName; }
        }

        public string PersonConcernedQuality
        {
            get { return _personConcernedQuality; }
            set { _personConcernedQuality = value ?? _personConcernedQuality; }
        }

        public string EndDate
        {
            get { return _endDate; }
            set { _endDate = value ?? _endDate; }
        }

        public string FromDate
        {
            get { return _fromDate; }
            set { _fromDate = value ?? _fromDate; }
        }

        public string ApplicantName
        {
            get { return _applicantName; }
            set { _applicantName = value ?? _applicantName; }
        }

        public string Translit
        {
            get { return _translit; }
            set { _translit = value ?? _translit; }
        }

        public string Number { get; set; }

        public string Date
        {
            get { return _date; }
            set { _date = value ?? _date; }
        }

        public string Period
        {
            get { return _period; }
            set { _period = value ?? _period; }
        }

        //Обекта в който се десерилизира в ТР е с малки букви. Когато се оправи обекта в ТР да се изправи и тук серилизацията.
        [XmlElement("email")]
        public string Email
        {
            get { return _email; }
            set { _email = value ?? _email; }
        }

        #endregion
    }
}