using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Потребител.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Уникален идентификатор на потребителски профил.
        /// </summary>
        [DapperColumn("user_id")]
        public int? UserID { get; set; }

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

        /// <summary>
        /// Данни за контакт.
        /// </summary>
        [DapperColumn("contact_data")]
        public string ContactData { get; set; }

        /// <summary>
        /// Организация и длъжност.
        /// </summary>
        [DapperColumn("organization")]
        public string Organization { get; set; }

        /// <summary>
        /// Вид външен потребител със специален достъп.
        /// </summary>
        [DapperColumn("special_access_user_type")]
        public SpecialAccessUserTypes? SpecialAccessUserType { get; set; }

        /// <summary>
        /// Съгласие за ел. бюлетин за ТРРЮЛНЦ.
        /// </summary>
        [DapperColumn("cr_bulletin_acceptance")]
        public bool? CRBulletinAcceptance { get; set; }

        /// <summary>
        /// Съгласие за ел. бюлетин за ИР.
        /// </summary>
        [DapperColumn("pr_bulletin_acceptance")]
        public bool? PRBulletinAcceptance { get; set; }

        /// <summary>
        /// Статус на профил: 0 -  Непотвърден, 1 - Активен, 2 - Неактивен.
        /// </summary>
        [DapperColumn("status")]
        public UserStatuses? Status { get; set; }

        /// <summary>
        /// Права на потребителя.
        /// </summary>
        public IEnumerable<UserPermission> UserPermissions { get; set; }

        /// <summary>
        /// Дата и час на последна промяна.
        /// </summary>
        [DapperColumn("updated_on")]
        public DateTime? UpdatedOn { get; set; }
    }    
}
