using EPZEU.Common;
using System;

namespace EPZEU.Audit.Models
{
    /// <summary>
    /// Request за събитие за одит.
    /// </summary>
    public class LogActionRequest
    {
        #region Properties

        /// <summary>
        /// Идентификатор на събитието.
        /// </summary>
        public long? LogActionID { get; set; }

        /// <summary>
        /// дата на събитието - дата и час на настъпване на събитието.
        /// </summary>
        public DateTime? LogActionDate { get; set; }

        /// <summary>
        /// Тип на обект, за който е събитието.
        /// </summary>
        public ObjectTypes? ObjectType { get; set; }

        /// <summary>
        /// Събитие, за което се записват данните за одит.
        /// </summary>
        public ActionTypes? ActionType { get; set; }

        /// <summary>
        /// Функционалност/модул през който е настъпило събитието.
        /// </summary>
        public Modules? Module { get; set; }

        /// <summary>
        /// Портал/Система в която е функционалността/модула през който е настъпило събитието.
        /// </summary>
        public Functionalities? Functionality { get; set; }

        /// <summary>
        /// Стойност на ключов атрибут на обекта - в зависимост от обекта това може да бъде ЕИК за партида в ТРРЮЛНЦ или потребителско име 
        /// за обект потребител или кадастрален номер на имот в ИР или ЕГН/ЛНЧ на лице за обект лице в ИР или номер на партида за партида в ИР.
        /// Ключовият атрибут за които се пази стойността е дефиниран в списъка на събитията и обектите за които се прави одитен запис.
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Идентификатор на потребителската сесия.
        /// </summary>
        public Guid? UserSessionID { get; set; }

        /// <summary>
        /// Идентификатор на логин сесия.
        /// </summary>
        public Guid? LoginSessionID { get; set; }

        /// <summary>
        /// Профил на потребителят, извършващ действието - данни за връзка към потребителски профил. Запазват се само ако потребителят се е автентикирал.
        /// </summary>
        public int? UserID { get; set; }

        /// <summary>
        /// КИН на потребителят, извършващ действието - данни за връзка към потребителски профил.
        /// </summary>
        public int? UserCIN { get; set; }

        /// <summary>
        /// IP адрес на потребителя, извършващ действието.
        /// </summary>
        public string IpAddress { get; set; }

        /// <summary>
        /// Системна връзка с обекта, за който се записват данните за одит.Възможно е няма такава връзка, когато събитието не е свързано с конкретен обект,
        /// като например ако има дефинирано одитиране на търсене в списъка на събитията и обектите за които се прави одитен запис.
        /// 
        /// Допълнителна информация към одитния запис - към основния одитен запис трябва да се съхранява, допълнителна информация като 
        /// например за критерии за търсене, направени промени в данните за обекта и други, които са специфични за конкретен обект и събитие. 
        /// </summary>
        public object AdditionalData { get; set; }

        /// <summary>
        /// Идентификатор на идемпотентна опепрация.
        /// </summary>
        public string OperationID { get; set; }

        #endregion
    }
}
