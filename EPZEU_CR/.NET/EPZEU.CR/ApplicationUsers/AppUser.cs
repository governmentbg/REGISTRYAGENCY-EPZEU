using EPZEU.Utilities;

namespace EPZEU.CR.ApplicationUsers
{
    /// <summary>
    /// Потребител.
    /// </summary>
    public class AppUser
    {
        /// <summary>
        /// Уникален идентификатор на локалната връзка на потребителския профил.
        /// </summary>
        [DapperColumn("user_id")]
        public int UserID { get; set; }

        /// <summary>
        /// КИН на потребителския профил.
        /// </summary>
        [DapperColumn("cin")]
        public int CIN { get; set; }

        /// <summary>
        /// Текст за представяне на потребителския профил
        /// </summary>
        [DapperColumn("display_name")]
        public string DisplayName { get; set; }

        /// <summary>
        /// Флаг, дали е системен потребителският профил
        /// </summary>
        [DapperColumn("is_system")]
        public bool IsSystem { get; set; }
    }
}
