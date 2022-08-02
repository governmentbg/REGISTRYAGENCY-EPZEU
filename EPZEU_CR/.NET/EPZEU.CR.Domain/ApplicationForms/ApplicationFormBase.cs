using EPZEU.CR.Domain.Common;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    public interface IApplicationForm
    {
        ApplicationFormTypes AppType { get; }

        ApplicantInfo ApplicantInfo { get; set; }

        ApplicantExchange ApplicantExchange { get; set; }

        List<AttachedDocument> Documents { get; set; }

        GDPRAgreement GDPRAgreement { get; set; }
    }

    /// <summary>
    /// Базов обект за форма на заявление.
    /// </summary>
    public abstract class ApplicationFormBase : IApplicationForm
    {
        #region IApplicationForm

        /// <summary>
        /// Вид заявление.
        /// </summary>
        [XmlIgnore]
        public abstract ApplicationFormTypes AppType { get; }

        /// <summary>
        /// Данни за заявител.
        /// </summary>
        [XmlElement(Order = 1)]
        public ApplicantInfo ApplicantInfo { get; set; }

        /// <summary>
        /// Данни за контакт със заявител.
        /// </summary>
        [XmlElement(Order = 2)]
        public ApplicantExchange ApplicantExchange { get; set; }

        /// <summary>
        /// ГДПР съглашение.
        /// </summary>
        [XmlElement(Order = 1002)]
        public GDPRAgreement GDPRAgreement { get; set; }

        /// <summary>
        /// Прикачени документи.
        /// </summary>
        [XmlIgnore]
        public abstract List<AttachedDocument> Documents { get; set; }

        #endregion
    }

    /// <summary>
    /// ГДПР съглашение.
    /// </summary>
    public class GDPRAgreement
    {
        /// <summary>
        /// Текст на ГДПР.
        /// </summary>
        [XmlText]
        public string GDPRAgreementText { get; set; }

        #region IsGDPRAgreementAccepted

        /// <summary>
        /// Флаг дали е приет ГДПР.
        /// </summary>
        [XmlIgnore]
        public bool? IsGDPRAgreementAccepted { get; set; }

        /// <summary>
        /// Атрибут за флаг дали е приет ГДПР.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "IsGDPRAgreementAccepted")]
        public bool IsGDPRAgreementAcceptedAttribute
        {
            get
            {
                return IsGDPRAgreementAccepted.HasValue ? IsGDPRAgreementAccepted.Value : false;
            }
            set
            {
                IsGDPRAgreementAccepted = value;
            }
        }

        /// <summary>
        /// Флаг дали има  атрибут за флаг дали е приет ГДПР.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool IsGDPRAgreementAcceptedAttributeSpecified
        {
            get { return IsGDPRAgreementAccepted.HasValue; }
        }

        #endregion

    }
}