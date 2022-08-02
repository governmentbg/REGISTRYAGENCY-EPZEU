using EPZEU.Utilities;
using NpgsqlTypes;
using System;

namespace EPZEU.Emails.Models
{
    /// <summary>
    /// Имейл съобщение.
    /// </summary>
    public class EmailMessage
    {
        /// <summary>
        /// Идентификатор на съобщение.
        /// </summary>
        [DapperColumn("email_id")]
        public int? EmailID { get; set; }

        /// <summary>
        /// Приоритет.
        /// </summary>
        [DapperColumn("priority")]
        public EmailPriority? Priority { get; set; }

        /// <summary>
        /// Статус.
        /// </summary>
        [DapperColumn("status")]
        public EmailStatues? Status { get; set; }

        /// <summary>
        /// Брой направени опити за изпращане - разлика спрямо фиксиран максимален брой възможни опити.
        /// </summary>
        [DapperColumn("try_count")]
        public int? TryCount { get; set; }

        /// <summary>
        /// Дата и час на изпращане.
        /// </summary>
        [DapperColumn("send_date")]
        public DateTime? SendDate { get; set; }

        /// <summary>
        /// Тема.
        /// </summary>
        [DapperColumn("subject")]
        public string Subject { get; set; }

        /// <summary>
        /// Тяло на съобщението.
        /// </summary>
        [DapperColumn("body")]
        public string Body { get; set; }

        /// <summary>
        /// Флаг, указващ дали съдържанието е HTML.
        /// </summary>
        [DapperColumn("is_body_html")]
        public bool IsBodyHtml { get; set; }

        /// <summary>
        /// Име на изпращаща услуга.
        /// </summary>
        [DapperColumn("sending_provider_name")]
        public string SendingProviderName { get; set; }

        /// <summary>
        /// Получатели на имейла.
        /// </summary>
        [DapperColumn("recipients")]
        public EmailRecipientDB[] Recipients { get; set; }

        /// <summary>
        /// Идентификатор на идемпотентна опепрация.
        /// </summary>
        [DapperColumn("operation_id")]
        public string OperationID { get; set; }
    }

    /// <summary>
    /// Получател на имейл
    /// </summary>
    public class EmailRecipientDB
    {
        public EmailRecipientDB()
        { }

        public EmailRecipientDB(EmailRecipient emailRecipient)
        {
            Address = emailRecipient.Address;
            DisplayName = emailRecipient.DisplayName;
            Type = emailRecipient.Type;
        }

        /// <summary>
        /// Адрес на електронна поща.
        /// </summary>
        [PgName("address")]
        public string Address { get; set; }

        /// <summary>
        /// Име на получател.
        /// </summary>
        [PgName("display_name")]
        public string DisplayName { get; set; }

        /// <summary>
        /// Тип на адрес. To - 1, Cc - 2, Bcc - 3
        /// </summary>
        [PgName("type")]
        public short? Type { get; set; }
    }
}