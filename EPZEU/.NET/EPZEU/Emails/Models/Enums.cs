using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Emails.Models
{
    /// <summary>
    /// Статус на имейл
    /// </summary>
    public enum EmailStatues : byte
    {
        /// <summary>
        /// Pending.
        /// </summary>
        Pending = 1,

        /// <summary>
        /// Send.
        /// </summary>
        Sent = 2,

        /// <summary>
        /// Failed.
        /// </summary>
        Failed = 3
    }

    /// <summary>
    /// Вид адрес
    /// </summary>
    public enum AddressTypes : byte
    {
        /// <summary>
        /// To.
        /// </summary>
        To = 1,

        /// <summary>
        /// Cc.
        /// </summary>
        Cc = 2,

        /// <summary>
        /// Bcc.
        /// </summary>
        Bcc = 3
    }
}
