using EPZEU.Common.Models;
using EPZEU.Nomenclatures.Models;
using System.Collections.Generic;

namespace EPZEU.Notifications.Models
{
    /// <summary>
    /// Опции за зареждане на aбонамент за събития в регистри.
    /// </summary>
    public class UserSubscriptionLoadOption
    {
        /// <summary>
        /// Флаг оказващ дали да зареди даните за потребителя
        /// </summary>
        public bool? LoadUserData { get; set; }       
    }

    /// <summary>
    /// Критерии за търсене на aбонамент за събития в регистри
    /// </summary>
    public class UserSubscriptionSearchCriteria : BasePagedSearchCriteria
    {
        /// <summary>
        /// Списък с уникален идентификатори на aбонамент за събития в регистри.
        /// </summary>
        public List<string> UserSubscriptionIDs { get; set; }

        /// <summary>
        /// Клиентски идентификационене номер на потребителя абонирал се за събития в регистри.
        /// </summary>
        public int? UserCIN { get; set; }

        /// <summary>
        /// Идентификатор на регистър.
        /// </summary>    
        public Registers? Register { get; set; }

        /// <summary>
        /// Тип на идентификатор на събития в регистри.
        /// </summary>
        public UserSubscriptionTypes? Type { get; set; }

        /// <summary>
        /// Стойност на тип на партида/обект
        /// </summary>
        public List<string> Values { get; set; }

        /// <summary>
        /// Опции за зареждане.
        /// </summary>
        public UserSubscriptionLoadOption LoadOption = new UserSubscriptionLoadOption();
    }
}
