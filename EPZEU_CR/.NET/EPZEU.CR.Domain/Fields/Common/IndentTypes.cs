using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Видове идентификатори: Стойности: 0 = Неопределен.; 1 = ЕГН.; 2 = ЛНЧ.; 3 = ЕИК.; 4 = БУЛСТАТ.; 5 = Дата на раждане.;
    /// </summary>
    public enum IndentTypes
    {
        /// <summary>
        /// Неопределен.
        /// </summary>
        [XmlEnum(Name = "Undefined")]
        Undefined,

        /// <summary>
        /// ЕГН.
        /// </summary>
        [XmlEnum(Name = "EGN")]
        EGN,

        /// <summary>
        /// ЛНЧ.
        /// </summary>
        [XmlEnum(Name = "LNCH")]
        LNCH,

        /// <summary>
        /// ЕИК.
        /// </summary>
        [XmlEnum(Name = "UIC")]
        UIC,

        /// <summary>
        /// БУЛСТАТ.
        /// </summary>
        [XmlEnum(Name = "Bulstat")]
        Bulstat,

        /// <summary>
        /// Дата на раждане.
        /// </summary>
        [XmlEnum(Name = "BirthDate")]
        BirthDate
    }
}
