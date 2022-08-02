using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System.Xml;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common
{
    /// <summary>
    /// Подпартида.
    /// </summary>
    [XmlRoot("SubDeed", Namespace = Namespaces.DeedsNamespace)]
    [XmlType("SubDeed", Namespace = Namespaces.DeedsNamespace)]
    public class SubDeed : FieldsList, ISubDeedSummary
    {
        /// <summary>
        /// ЕИК на подпартида.
        /// </summary>
        [XmlAttribute]
        public string SubUIC { get; set; }

        #region SubUICType

        /// <summary>
        ///  Вид ЕИК на подпартида.
        /// </summary>
        [XmlIgnore]
        public SubUICTypes? SubUICType { get; set; }

        /// <summary>
        /// Атрибут за вид ЕИК на подпартида.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "SubUICType")]
        public SubUICTypes SubUICTypeAttribute
        {
            get
            {
                return SubUICType.HasValue ? SubUICType.Value : SubUICTypes.Undefined;
            }
            set
            {
                SubUICType = value;
            }
        }

        /// <summary>
        /// ФЛаг указващ дали има атрибут за вид ЕИК на подпартида.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool SubUICTypeAttributeSpecified
        {
            get { return SubUICType.HasValue; }
        }

        #endregion

        #region Status

        /// <summary>
        /// Статус.
        /// </summary>
        [XmlIgnore]
        public SubDeedStatuses? Status { get; set; }

        /// <summary>
        /// Атрибут за статус.
        /// </summary>
        [JsonIgnore]
        [XmlAttribute(AttributeName = "SubDeedStatus")]
        public SubDeedStatuses StatusAttribute
        {
            get
            {
                return Status.HasValue ? Status.Value : SubDeedStatuses.Closed;
            }
            set
            {
                Status = value;
            }
        }

        /// <summary>
        /// Флаг указващ длаи има атрибут за статус.
        /// </summary>
        [JsonIgnore]
        [XmlIgnore]
        public bool StatusAttributeSpecified
        {
            get { return Status.HasValue; }
        }

        #endregion

        /// <summary>
        /// Име.
        /// </summary>
        [XmlAttribute(AttributeName = "SubUICName")]
        public string Name { get; set; }
    }
}
