namespace EPZEU.Emails.Models
{
    /// <summary>
    /// Получател на имейл
    /// </summary>
    public class EmailRecipient
    {
        /// <summary>
        /// Адрес на електронна поща.
        /// </summary>      
        public string Address { get; set; }

        /// <summary>
        /// Име на получател.
        /// </summary>     
        public string DisplayName { get; set; }

        /// <summary>
        /// Тип на адрес. To - 1, Cc - 2, Bcc - 3
        /// </summary>     
        public short? Type { get; set; }
    }
}
