namespace EPZEU.Audit.Models
{
    /// <summary>
    /// Обект за отговор от работа с операция за създаване на запис в одита.
    /// </summary>
    public class LogActionResponse
    {
        /// <summary>
        /// Идентификатор на запис в одита.
        /// </summary>
        public long? LogActionID { get; set; }
    }
}
