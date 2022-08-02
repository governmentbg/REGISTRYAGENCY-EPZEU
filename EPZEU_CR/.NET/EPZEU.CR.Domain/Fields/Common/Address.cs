using CNSys;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Адрес.
    /// </summary>
    public partial class Address
    {
        #region Properties

        /// <summary>
        /// Идентификатор на държава.
        /// </summary>
        [XmlElement(IsNullable = true)]
        public long? CountryID { get; set; }

        /// <summary>
        /// Код на държава.
        /// </summary>
        public string CountryCode { get; set; }

        /// <summary>
        /// Държава.
        /// </summary>
        public string Country { get; set; }

        //Когато нямаме стойност искаме по подразбиране да е true
        /// <summary>
        /// Флаг указващ дали е чужденец.
        /// </summary>
        [EmptyCheckIgnore]
        public bool? IsForeign
        {
            get
            {
                return CountryCode == null || string.Compare(CountryCode, "BGR", true) != 0;
            }
            set
            {
            }
        }

        /// <summary>
        /// Идентификатор на област.
        /// </summary>
        [XmlElement(IsNullable = true)]
        public long? DistrictID { get; set; }

        /// <summary>
        /// Екате област.
        /// </summary>
        public string DistrictEkatte { get; set; }

        /// <summary>
        /// Област
        /// </summary>
        public string District { get; set; }

        /// <summary>
        /// Идентификатор на община.
        /// </summary>
        [XmlElement(IsNullable = true)]
        public long? Municipalityid { get; set; }

        /// <summary>
        /// Екате община
        /// </summary>
        public string MunicipalityEkatte { get; set; }

        /// <summary>
        /// Община.
        /// </summary>
        public string Municipality { get; set; }

        /// <summary>
        /// Идентификатор на населено място.
        /// </summary>
        [XmlElement(IsNullable = true)]
        public long? SettlementID { get; set; }

        /// <summary>
        /// Екате населено място.
        /// </summary>
        public string SettlementEKATTE { get; set; }

        /// <summary>
        /// Населено място.
        /// </summary>
        public string Settlement { get; set; }

        /// <summary>
        /// Идентификатор на район.
        /// </summary>
        [XmlElement(IsNullable = true)]
        public long? AreaID { get; set; }

        /// <summary>
        /// Район.
        /// </summary>
        public string Area { get; set; }

        /// <summary>
        /// Екате район.
        /// </summary>
        public string AreaEkatte { get; set; }

        /// <summary>
        /// Пощенски код.
        /// </summary>
        public string PostCode { get; set; }

        /// <summary>
        /// Място в чужбина.
        /// </summary>
        public string ForeignPlace { get; set; }

        /// <summary>
        /// Квартал.
        /// </summary>
        public string HousingEstate { get; set; }

        /// <summary>
        /// Улица.
        /// </summary>
        public string Street { get; set; }

        /// <summary>
        /// Номер на улица.
        /// </summary>
        public string StreetNumber { get; set; }

        /// <summary>
        /// Блок.
        /// </summary>
        public string Block { get; set; }

        /// <summary>
        /// Вход.
        /// </summary>
        public string Entrance { get; set; }

        /// <summary>
        /// Етаж.
        /// </summary>
        public string Floor { get; set; }

        /// <summary>
        /// Апартамент.
        /// </summary>
        public string Apartment { get; set; }

        #endregion
    }
}
