using EPZEU.Nomenclatures.Models;
using EPZEU.Utilities;

namespace EPZEU.CMS.Models
{
    /// <summary>
    /// Тип на страница. 1 = страници с услуги.; 2 = страница със заявления/искания/удостоверения.; 3 = страница с образци на документи.; 4 = страница с нормативната уредба.
    /// </summary>
    public enum PageTypes
    {
        /// <summary>
        /// страници с услуги.
        /// </summary>
        Service = 1,

        /// <summary>
        /// страница със заявления/искания/удостоверения.
        /// </summary>
        Application = 2,

        /// <summary>
        /// страница с образци на документи.
        /// </summary>
        Pattern = 3,

        /// <summary>
        /// страница с нормативната уредба.
        /// </summary>
        Legislation = 4
    }

    /// <summary>
    /// Страница
    /// </summary>
    public class Page
    {
        /// <summary>
        /// Идентификатор на страница.
        /// </summary>
        [DapperColumn("page_id")]
        public int? PageID { get; set; }

        /// <summary>
        /// Идентификатор на регистър.
        /// </summary>
        [DapperColumn("register_id")]
        public Registers? RegisterID { get; set; }

        /// <summary>
        /// Заглавие.
        /// </summary>
        [DapperColumn("title")]
        public string Title { get; set; }

        /// <summary>
        /// Съдържание.
        /// </summary>
        [DapperColumn("content")]
        public string Content { get; set; }

        /// <summary>
        /// Тип.
        /// </summary>
        [DapperColumn("type")]
        public PageTypes? Type { get; set; }

        /// <summary>
        /// Идентификатор на заявление.
        /// </summary>
        [DapperColumn("application_id")]
        public int? ApplicationID { get; set; }

        /// <summary>
        /// Идентификатор на услуга.
        /// </summary>
        [DapperColumn("service_id")]
        public int? ServiceID { get; set; }

        /// <summary>
        /// Идентификатор на родителски елемент.
        /// </summary>
        [DapperColumn("parent_id")]
        public int? ParentID { get; set; }

        /// <summary>
        /// Пореден номер.
        /// </summary>
        [DapperColumn("order_num")]
        public int? OrderNum { get; set; }

        /// <summary>
        /// Флаг указващ дали е група.
        /// </summary>
        [DapperColumn("is_group")]
        public bool? IsGroup { get; set; }
    }
}
