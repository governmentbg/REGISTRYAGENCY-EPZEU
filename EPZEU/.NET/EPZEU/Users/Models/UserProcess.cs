using EPZEU.Utilities;
using System;

namespace EPZEU.Users.Models
{
    /// <summary>
    /// Тип на процеса: 1 = Активиране на профил; 2 = Смяна на парола;
    /// </summary>
    public enum UserProcessTypes
    {
        /// <summary>
        /// Активиране на профил
        /// </summary>
        Activation = 1,

        /// <summary>
        /// Смяна на парола
        /// </summary>
        ChangePassword = 2
    }

    /// <summary>
    /// Процес по регистрация на потребител.
    /// </summary>
    public class UserProcess
    {
        /// <summary>
        /// Идентификатор на потребителски процес.
        /// </summary>
        [DapperColumn("process_guid")]
        public string ProcessGuid { get; set; }

        /// <summary>
        /// Идентификатор на потребител.
        /// </summary>
        [DapperColumn("user_id")]
        public int UserID { get; set; }

        /// <summary>
        /// Дата, след която процесът е невалиден.
        /// </summary>
        [DapperColumn("invalid_after")]
        public DateTime? InvalidAfter { get; set; }

        /// <summary>
        /// Статус на процес.
        /// </summary>
        [DapperColumn("status")]
        public int Status { get; set; }

        /// <summary>
        /// Статус на процес.
        /// </summary>
        [DapperColumn("process_type")]
        public UserProcessTypes? ProcessType { get; set; }
    }
}
