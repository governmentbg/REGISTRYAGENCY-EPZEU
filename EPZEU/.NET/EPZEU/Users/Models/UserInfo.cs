using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Основна информация за потребител.
    /// </summary>
    public class UserInfo
    {
        /// <summary>
        /// Клиентски идентификационен номер.
        /// </summary>
        public int? CIN { get; set; }

        /// <summary>
        /// Електронна поща.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Име на потребителя.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Презиме на потребителя.
        /// </summary>
        public string MiddleName { get; set; }

        /// <summary>
        /// Фамилия на потребителя.
        /// </summary>
        public string FamilyName { get; set; }

        /// <summary>
        /// Дата и час на последна промяна.
        /// </summary>
        public DateTime? UpdatedOn { get; set; }

        /// <summary>
        /// Права за достъп
        /// </summary>
        public string[] Permissions { get; set; }

        /// <summary>
        /// Вид специален достъп.
        /// </summary>
        public int? SpecialAccessUserType { get; set; }
    }    
}
