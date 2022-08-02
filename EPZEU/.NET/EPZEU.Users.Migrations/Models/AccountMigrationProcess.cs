using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations.Models
{
    /// <summary>
    /// Статус на процеса по миграция:
    /// 1 = Готов за обработка; 2= Обработва се; 3 = Обработва се, парите вече са прехвърлени; 4 = Акаунта е мигриран успешно;
    /// </summary>
    public enum AccountMgrProcessStatuses
    { 
        /// <summary>
        /// Готов за обработка
        /// </summary>
        ReadyForProcessing = 1,

        /// <summary>
        /// Обработва се 
        /// </summary>
        Processing = 2,
        
        /// <summary>
        /// Обработва се, парите вече са прехвърлени
        /// </summary>
        ProcessingMoneyProcessed = 3,

        /// <summary>
        /// Акаунта е мигриран успешно
        /// </summary>
        Completed = 4
    }

    /// <summary>
    /// Процес по мигриране на потребителски профил
    /// </summary>
    public class AccountMigrationProcess
    {
        /// <summary>
        /// Уникален идентификатор на процес по мигриране на потребителски профил
        /// </summary>
        [DapperColumn("account_migr_process_id")]
        public int? MigrationProcessID { get; set; }

        /// <summary>
        /// КИН на профил в ЕПЗЕУ
        /// </summary>
        [DapperColumn("cin")]
        public int? UserCIN { get; set; }

        /// <summary>
        /// Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR)
        /// </summary>
        [DapperColumn("register_id")]
        public Registers? Register { get; set; }

        /// <summary>
        /// Потребителското име на профила в съответния регистър
        /// </summary>
        [DapperColumn("migr_username")]
        public string MigrantUsername { get; set; }

        /// <summary>
        /// Уникален идентификатор на профила в съответния регистър
        /// </summary>
        [DapperColumn("migr_user_id")]
        public int? MigrantUserID { get; set; }

        /// <summary>
        /// Клиентски номер на потребител в съответния регистър
        /// </summary>
        [DapperColumn("migr_client_id")]
        public int? MigrantClientID { get; set; }

        /// <summary>
        /// Наличност по личната сметка на потребителя към момента на обединение
        /// </summary>
        [DapperColumn("migr_amount")]
        public decimal? MigrantAmount { get; set; }

        /// <summary>
        /// Статус на процеса по миграция
        /// </summary>
        [DapperColumn("status")]
        public AccountMgrProcessStatuses? Status { get; set; }

        /// <summary>
        /// Системното време на последна промяна на статуса на миграцията
        /// </summary>
        [DapperColumn("migration_date")]
        public DateTime? MigrationData { get; set; }
    }
}
