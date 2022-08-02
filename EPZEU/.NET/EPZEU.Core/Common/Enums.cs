namespace EPZEU.Common
{
    /// <summary>
    /// Функционалности:
    /// 1 = Одит.; 2 = Подаване на заявления.; 3 = Плащания.; 4 = Публични справки.; 5 = Потребители.; 6 = Услуги.; 7 = Съдържание.; 8 = Интеграция в ЕПЗЕУ; 9 = Система.;
    /// 10 = Интеграция в ТРРЮЛНЦ.; 11 = Интеграция в ИР.; 12 = Електронна поща;
    /// </summary>
    public enum Functionalities
    {
        /// <summary>
        /// Одит.
        /// </summary>
        Audit = 1,

        /// <summary>
        /// Подаване на заявления.
        /// </summary>
        Applications = 2,

        /// <summary>
        /// Плащания.
        /// </summary>
        Payments = 3,

        /// <summary>
        /// Публични справки.
        /// </summary>
        PublicReports = 4,

        /// <summary>
        /// Потребители.
        /// </summary>
        Users = 5,

        /// <summary>
        /// Услуги.
        /// </summary>
        Services = 6,

        /// <summary>
        /// Съдържание.
        /// </summary>
        Content = 7,

        /// <summary>
        /// Интеграция в ЕПЗЕУ
        /// </summary>
        EPZEUIntegration = 8,

        /// <summary>
        /// Система.
        /// </summary>
        System = 9,

        /// <summary>
        /// Интеграция в ТРРЮЛНЦ.
        /// </summary>
        TRULNCIntegration = 10,

        /// <summary>
        /// Интеграция в ИР.
        /// </summary>
        IRIntegration = 11,

        /// <summary>
        /// Електронна поща
        /// </summary>
        Email = 12
        
    }

    /// <summary>
    /// Модули: 1 = EPZEU.; 2 = EPZEU Търговски регистър.; 3 = EPZEU Имотен регистър.
    /// </summary>
    public enum Modules
    {
        /// <summary>
        /// EPZEU.
        /// </summary>
        EPZEU = 1,

        /// <summary>
        /// EPZEU Търговски регистър.
        /// </summary>
        EPZEU_CR = 2,

        /// <summary>
        /// EPZEU Имотен регистър.
        /// </summary>
        EPZEU_PR = 3
    }
}
