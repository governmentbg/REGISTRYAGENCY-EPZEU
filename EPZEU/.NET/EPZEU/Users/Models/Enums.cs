namespace EPZEU.Users.Models
{
    /// <summary>
    /// Вид специален достъп: 1 = Представител на изпълнителна, съдебна власт или друг орган; 2 = ЧСИ; 3 = ДСИ; 4 = Помощник нотариус; 5 = Лице с нотариална компетентност
    /// 6 = Нотариус; 7 = Съдия по вписванията;
    /// </summary>
    public enum SpecialAccessUserTypes : short
    {
        /// <summary>
        /// Представител на изпълнителна, съдебна власт или друг орган
        /// </summary>
        Representative = 1,
        /// <summary>
        /// ЧСИ
        /// </summary>        
        CSI = 2,
        /// <summary>
        /// ДСИ
        /// </summary>
        DSI = 3,
        /// <summary>
        /// Помощник нотариус
        /// </summary>
        NotaryAssistant = 4,
        /// <summary>
        /// Лице с нотариална компетентност
        /// </summary>
        PersonNotaryJurisdition = 5,
        /// <summary>
        /// Нотариус
        /// </summary>
        Notary = 6,
        /// <summary>
        /// Съдия по вписванията
        /// </summary>
        Judge = 7
    }

    /// <summary>
    /// Статус на профил: 0 = Непотвърден; 1 = Активен; 2 = Неактивен; 3 = Заключен;
    /// </summary>
    public enum UserStatuses : short
    {
        /// <summary>
        /// Непотвърден
        /// </summary>
        NotConfirmed = 0,
        /// <summary>
        /// Активен
        /// </summary>
        Active = 1,
        /// <summary>
        /// Неактивен
        /// </summary>
        Inactive = 2,
        /// <summary>
        /// Заключен
        /// </summary>
        Locked = 3
    }

    /// <summary>
    /// Начини на автентификация: 1 = потребителско име и парола; 2 = активна директория; 3 = електронен сертификат; 4 = вход с ПИК на НАП;
    /// </summary>
    public enum AuthenticationTypes : short
    {
        /// <summary>
        /// потребителско име и парола
        /// </summary>
        UsernamePassword = 1,

        /// <summary>
        /// активна директория
        /// </summary>
        ActiveDirectory = 2,

        /// <summary>
        /// електронен сертификат
        /// </summary>
        Certificate = 3,

        /// <summary>
        /// вход с ПИК на НАП
        /// </summary>
        NRA = 4
    }
}
