using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common
{
    /// <summary>
    /// Информация за заявител.
    /// </summary>
    [XmlType(TypeName = "ApplicantInfo", Namespace = Namespaces.ApplicationsNamespace)]
    public class ApplicantInfo
    {
        #region Properties

        /// <summary>
        /// Заявитело.
        /// </summary>
        [XmlElement(Order = 1)]
        public Applicants Applicants { get; set; }

        /// <summary>
        /// Качество на заявител.
        /// </summary>
        [XmlElement(Order = 2)]
        public ApplicantCapacity ApplicantCapacity { get; set; }

        /// <summary>
        /// Представител на заявител.
        /// </summary>
        [XmlElement(Order = 3)]
        public ApplicantRepresentative ApplicantRepresentative { get; set; }

        #endregion
    }

    #region Applicants

    /// <summary>
    /// Заявители.
    /// </summary>
    [XmlType(TypeName = "Applicants")]
    public class Applicants
    {     
        /// <summary>
        /// Списък със заявители.
        /// </summary>
        [XmlElement(ElementName = "Applicant")]
        public List<Applicant> ApplicantsList { get; set; }
    }

    /// <summary>
    /// Заявител.
    /// </summary>
    public class Applicant
    {
        #region Properties

        /// <summary>
        /// Човек.
        /// </summary>
        public Person Person { get; set; }

        /// <summary>
        /// Място на раждане.
        /// </summary>
        public BirthPlace BirthPlace { get; set; }

        /// <summary>
        /// Адрес.
        /// </summary>
        public Address Address { get; set; }

        /// <summary>
        /// Паспорт.
        /// </summary>
        public Passport Passport { get; set; }

        /// <summary>
        /// Заместник.
        /// </summary>
        public Deputy Deputy { get; set; }

        /// <summary>
        /// Гуид на заявител.
        /// </summary>
        [XmlAttribute]
        public string ApplicantGuid { get; set; }

        #endregion
    }

    #endregion

    #region ApplicantCapacity

    /// <summary>
    /// Качество на заявител.
    /// </summary>
    [XmlType(TypeName = "ApplicantCapacity")]
    public class ApplicantCapacity
    {
        #region Properties

        /// <summary>
        /// Търговец
        /// </summary>
        [XmlAttribute("Trader")]
        public bool Trader { get; set; }

        /// <summary>
        /// Адвокат и изрично пълномощно
        /// </summary>
        [XmlAttribute("LawyerWithLetter")]
        public bool LawyerWithLetter { get; set; }

        /// <summary>
        /// Друго лице в предвидените от закона случаи
        /// </summary>
        [XmlAttribute("AnotherFace")]
        public bool AnotherFace { get; set; }

        /// <summary>
        /// Счетоводител, който подава годишен отчет
        /// </summary>
        [XmlAttribute("FinancialAccountCreator")]
        public bool FinancialAccountCreator { get; set; }

        /// <summary>
        /// Заявител по първоначалното искане
        /// </summary>
        [XmlAttribute("AssignmentApplicant")]
        public bool AssignmentApplicant { get; set; }

        /// <summary>
        /// Назначено лице
        /// </summary>
        [XmlAttribute("AssignedExpert")]
        public bool AssignedExpert { get; set; }

        /// <summary>
        /// Адвокат на заявителя с изрично пълномощно
        /// </summary>
        [XmlAttribute("ApplicantLawyerWithPower")]
        public bool ApplicantLawyerWithPower { get; set; }

        /// <summary>
        /// Прокурист
        /// </summary>
        [XmlAttribute("Procurator")]
        public bool Procurator { get; set; }

        /// <summary>
        /// лице, представляващо фондацията
        /// </summary>
        [XmlAttribute("PersonRepresentingTheFoundation")]
        public bool PersonRepresentingTheFoundation { get; set; }

        /// <summary>
        /// лице, представляващо сдружението
        /// </summary>
        [XmlAttribute("PersonRepresentingTheAssociation")]
        public bool PersonRepresentingTheAssociation { get; set; }

        /// <summary>
        /// лице, представляващо читалището
        /// </summary>
        [XmlAttribute("PersonRepresentingCommunityCentrer")]
        public bool PersonRepresentingCommunityCentrer { get; set; }

        /// <summary>
        /// лице, представляващо клон на чуждестранно юридическо лице с нестопанска цел
        /// </summary>
        [XmlAttribute("PersonRepresentingBranchOfNonProfitForeignLegalEntity")]
        public bool PersonRepresentingBranchOfNonProfitForeignLegalEntity { get; set; }

        #endregion
    }

    #endregion

    #region ApplicantRepresentative

    /// <summary>
    /// Представител на заявител.
    /// </summary>
    [XmlType(TypeName = "ApplicantRepresentative")]
    public class ApplicantRepresentative
    {
        #region Properties

        /// <summary>
        /// Човел.
        /// </summary>
        public Person Person { get; set; }

        /// <summary>
        /// Място на раждане.
        /// </summary>
        public BirthPlace BirthPlace { get; set; }

        /// <summary>
        /// Адрес.
        /// </summary>
        public Address Address { get; set; }

        /// <summary>
        /// Паспорт.
        /// </summary>
        public Passport Passport { get; set; }

        /// <summary>
        /// Заместник.
        /// </summary>
        public Deputy Deputy { get; set; }

        #endregion
    }

    #endregion
}
