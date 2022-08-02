namespace EPZEU.Common.Repositories
{
    /// <summary>
    /// Критерии за търсена на конфигурационни параметри на системата.
    /// </summary>
    public class AppParameterSearchCriteria
    {
        /// <summary>
        /// Колекция идентификатори на параметрите.
        /// </summary>
        public int[] AppParamIDs { get; set; }

        /// <summary>
        /// Портал/Система - идентификатор.
        /// </summary>
        public int? FunctionalityID { get; set; }

        /// <summary>
        /// Модул/Функционалност - идентификатор.
        /// </summary>
        public int? ModuleID { get; set; }

        /// <summary>
        /// Код на параметъра.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Описание на параметъра.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Флаг, указващ дали параметъра е системен.
        /// </summary>
        public bool IsSystem { get; set; }
    }
}
