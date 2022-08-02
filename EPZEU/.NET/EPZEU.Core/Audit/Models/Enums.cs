using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.Audit.Models
{
    /// <summary>
    /// Видове обекти: 1 = Заявление за ЕАУ.; 2 = Заявка за регистрация на потребител.; 3 = Партида в ТРРЮЛНЦ.; 4 = Потребителски профил.; 5 = Права за достъп.;
    /// 6 = Заявка за специален достъп.; 7 = Средство за автентикация.; 8 = Файлово съдържание.;
    /// </summary>
    public enum ObjectTypes
    {
        /// <summary>
        /// Заявление за ЕАУ.
        /// </summary>
        EAUApplication = 1,

        /// <summary>
        /// Заявка за регистрация на потребител.
        /// </summary>
        UserRegistrationRequest = 2,

        /// <summary>
        /// Партида в ТРРЮЛНЦ.
        /// </summary>
        TRRULNCBatch = 3,

        /// <summary>
        /// Потребителски профил.
        /// </summary>
        UserProfile = 4,

        /// <summary>
        /// Права за достъп.
        /// </summary>
        Permission = 5,

        /// <summary>
        /// Заявка за специален достъп.
        /// </summary>
        SpecialAccessRequest = 6,

        /// <summary>
        /// Средство за автентикация.
        /// </summary>
        UserCertificate = 7,

        /// <summary>
        /// Файлово съдържание.
        /// </summary>
        FileContent = 8,
    }

    /// <summary>
    /// Видове действия: 1 = Подаване.; 2 = Преглед.; 3 = Редакция.; 4 = Регистрация.; 5 = Одобряване.; 6 = Отхвърляне.; 7 = Прикачане на документ.; 8 = Потвърждаване.;
    /// 9 = Логин.; 10 = Добавяне.; 11 = Изтриване.; 12 = Изтегляне.; 13 = Зареждане на данни при подаване на заявление за промяна на обстоятелства в ТР.;
    /// </summary>
    public enum ActionTypes
    {
        /// <summary>
        /// Подаване.
        /// </summary>
        Submission = 1,

        /// <summary>
        /// Преглед.
        /// </summary>
        Preview = 2,

        /// <summary>
        /// Редакция.
        /// </summary>
        Edit = 3,

        /// <summary>
        /// Регистрация.
        /// </summary>
        Registration = 4,

        /// <summary>
        /// Одобряване.
        /// </summary>
        Approval = 5,

        /// <summary>
        /// Отхвърляне.
        /// </summary>
        Rejection = 6,

        /// <summary>
        /// Прикачане на документ.
        /// </summary>
        AttachDocument = 7,

        /// <summary>
        /// Потвърждаване.
        /// </summary>
        Confirmation = 8,

        /// <summary>
        /// Логин.
        /// </summary>
        Login = 9,

        /// <summary>
        /// Добавяне.
        /// </summary>
        Add = 10,

        /// <summary>
        /// Изтриване.
        /// </summary>
        Delete = 11,

        /// <summary>
        /// Изтегляне.
        /// </summary>
        Downlaod = 12,

        /// <summary>
        /// Зареждане на данни при подаване на заявление за промяна на обстоятелства в ТР.
        /// </summary>
        LoadDataForChange = 13
    }
}
