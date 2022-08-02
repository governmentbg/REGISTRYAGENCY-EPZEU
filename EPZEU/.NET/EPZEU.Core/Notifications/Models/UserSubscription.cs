using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;

namespace EPZEU.Notifications.Models
{
    /// <summary>
    /// Типове на идентификатор на събития в регистри.
    /// 1 = EGN_LNCH_UIC; 3 = UIC;
    /// </summary>
    public enum UserSubscriptionTypes
    {  
        /// <summary>
        /// EGN/LNCH/UIC
        /// </summary>
        EGN_LNCH_UIC = 1,

        /// <summary>
        /// ЕИК/Булстат
        /// </summary>
        UIC = 3
    }

    /// <summary>
    /// Клас капсулиращ данни за aбонамент за събития в регистри.
    /// </summary>
    public class UserSubscription
    {
        /// <summary>
        /// Уникален идентификатор на aбонамент за събития в регистри.
        /// </summary>
        [DapperColumn("usr_subsr_id")]
        public string UserSubscriptionID { get; set; }

        /// <summary>
        /// Клиентски идентификационене номер на потребителя абонирал се за събития в регистри.
        /// </summary>
        [DapperColumn("user_cin")]
        public int? UserCIN { get; set; }

        /// <summary>
        /// Идентификатор на регистър.
        /// </summary>       
        [DapperColumn("register_id")]
        public Registers? Register { get; set; }

        /// <summary>
        /// Тип на идентификатор на събития в регистри.
        /// </summary>
        [DapperColumn("type")]
        public UserSubscriptionTypes? Type { get; set; }

        /// <summary>
        /// Стойност на тип на партида/обект
        /// </summary>
        [DapperColumn("value")]
        public string Value { get; set; }

        /// <summary>
        /// Потребителя абонирал се за събития в регистри.
        /// </summary>
        public User User { get; set; }
    }

    /// <summary>
    /// Потребител.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Клиентски идентификационен номер.
        /// </summary>
        [DapperColumn("cin")]
        public int? CIN { get; set; }

        /// <summary>
        /// Електронна поща.
        /// </summary>
        [DapperColumn("email")]
        public string Email { get; set; }

        /// <summary>
        /// Име на потребителя.
        /// </summary>
        [DapperColumn("first_name")]
        public string FirstName { get; set; }

        /// <summary>
        /// Презиме на потребителя.
        /// </summary>
        [DapperColumn("middle_name")]
        public string MiddleName { get; set; }

        /// <summary>
        /// Фамилия на потребителя.
        /// </summary>
        [DapperColumn("family_name")]
        public string FamilyName { get; set; }
    }
}
