using EPZEU.Utilities;

namespace EPZEU.Nomenclatures.Models
{
    /// <summary>
    /// Вид потребител със специален достъп.
    /// </summary>
    public class SpecialAccessUserType
    {
        /// <summary>
        /// Уникален идентификатор на вид потребител със специален достъп.
        /// </summary>
        [DapperColumn("user_type_id")]
        public int UserTypeId { get; set; }

        /// <summary>
        /// Име на вид потребител със специален достъп.
        /// </summary>
        [DapperColumn("name")]
        public string Name { get; set; }
    }
}
