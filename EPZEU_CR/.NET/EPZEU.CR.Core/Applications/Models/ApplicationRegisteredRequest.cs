using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.CR.Applications.Models
{
    /// <summary>
    /// Заявка за регистрирани заявления
    /// </summary>
    public class ApplicationRegisteredRequest
    {
        /// <summary>
        /// Ключ на заявление.
        /// </summary>
        public string ApplicationKey { get; set; }

        /// <summary>
        /// Заявление.,
        /// </summary>
        public ApplicationInfo Application { get; set; }
    }
}
