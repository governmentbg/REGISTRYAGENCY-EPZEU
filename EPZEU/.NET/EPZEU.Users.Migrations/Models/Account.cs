using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.Users.Migrations.Models
{
    /// <summary>
    /// Сметка.
    /// </summary>
    public class Account
    {
        /// <summary>
        /// Уникален идентификатор на профила в съответния регистър
        /// </summary> 
        [DapperColumn("adm_id")]
        public int? UserID { get; set; }

        /// <summary>
        /// Клиентски номер на потребител в съответния регистър
        /// </summary>               
        public int? ClientID { get; set; }

        /// <summary>
        /// Потребителското име на профила в съответния регистър
        /// </summary>    
        [DapperColumn("username")]
        public string Username { get; set; }

        /// <summary>
        /// Пълно име на профила в съответния регистър
        /// </summary>    
        [DapperColumn("fullname")]
        public string FullName { get; set; }

        /// <summary>
        /// Еmail на профила в съответния регистър
        /// </summary>    
        [DapperColumn("email")]
        public string Еmail { get; set; }

        /// <summary>
        /// Наличност по личната сметка на потребителя към момента на обединение
        /// </summary>
        [DapperColumn("freecredits_ra")]
        public decimal? Amount { get; set; }
    }
}
