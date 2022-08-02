using EPZEU.Common.Models;
using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations.Models
{
    /// <summary>
    /// Процес по мигриране на потребителски профил.
    /// </summary>
    public class AccountMigrationProcessSearchCriteria 
    {
        /// <summary>
        /// Уникален идентификатор на процес по мигриране на потребителски профил
        /// </summary>
        public int? MigrationProcessID { get; set; }

        /// <summary>
        /// КИН на профил в ЕПЗЕУ
        /// </summary>      
        public int? UserCIN { get; set; }

        /// <summary>
        /// Потребителското име на профила в съответния регистър
        /// </summary>       
        public string MigrantUsername { get; set; }

        /// <summary>
        /// Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR)
        /// </summary>
        public Registers? Register { get; set; }
    }

    /// <summary>
    /// Критерии за търсене на процес по мигриране на потребителски профил.
    /// </summary>
    public class AccountSearchCriteria
    {
        /// <summary>
        /// Тип на регистъра.
        /// Стойности: 1 = Търговски Регистър; 2 = Имотен Регистър
        /// </summary>
        public Registers? Register { get; set; }

        /// <summary>
        /// Потребителско име.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Парола.
        /// </summary>
        public string Password { get; set; }
    }
}
