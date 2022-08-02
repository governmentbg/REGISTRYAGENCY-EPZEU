using System.Collections.Generic;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Единен класификатор на административно-териториалните и териториалните единици (ЕКАТТЕ).
    /// </summary>
    public class Ekatte
    {
        /// <summary>
        /// Идентификатор на ЕКАТТЕ.
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// Код на записа по ЕКАТТЕ.
        /// </summary>
        public string EkatteCode { get; set; }

        /// <summary>
        /// Име на за записа по ЕКАТТЕ.
        /// </summary>
        public string Name { get; set; }
    }

    /// <summary>
    /// Област по ЕКАТТЕ.
    /// </summary>
    public class District : Ekatte
    {
        /// <summary>
        /// Колекция на общините в дадена област по ЕКАТТЕ.
        /// </summary>
        public List<Municipality> Municipalities { get; set; }
    }

    /// <summary>
    /// Община по ЕКАТТЕ.
    /// </summary>
    public class Municipality : Ekatte
    {
        /// <summary>
        /// Идентификатор на община по ЕКАТТЕ.
        /// </summary>
        public int DistrictID { get; set; }

        /// <summary>
        /// Колекция с населени места в дадената община по ЕКАТТЕ.
        /// </summary>
        public List<Settlement> Settlements { get; set; }
    }

    /// <summary>
    /// Населено място по ЕКАТТЕ.
    /// </summary>
    public class Settlement : Ekatte
    {
        /// <summary>
        /// Идентификатор на община по ЕКАТТЕ.
        /// </summary>
        public int MunicipalityID { get; set; }

        /// <summary>
        /// Тип на населеното място.
        /// </summary>
        public string SettlementType { get; set; }

        /// <summary>
        /// Колекция с районите в даденото населено място по ЕКАТТЕ.
        /// </summary>
        public List<Area> Areas { get; set; }
    }

    /// <summary>
    /// Район по ЕКАТТЕ
    /// </summary>
    public class Area : Ekatte
    {
        /// <summary>
        /// Идентификатор на населено място.
        /// </summary>
        public int SettlementID { get; set; }
    }
}
