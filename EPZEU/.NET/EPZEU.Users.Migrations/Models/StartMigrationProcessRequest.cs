using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations.Models
{
    /// <summary>
    /// Заявка за започване на процес по миграция.
    /// </summary>
    public class StartMigrationProcessRequest
    {
        /// <summary>
        /// Потребителско име на мигрирания.
        /// </summary>
        public string MigrantUsername { get; set; }

        /// <summary>
        /// Парола на мигрирания.
        /// </summary>
        public string MigrantPassword { get; set; }

        /// <summary>
        /// Регистър.
        /// </summary>
        public Registers? Register { get; set; }        
    }
}
