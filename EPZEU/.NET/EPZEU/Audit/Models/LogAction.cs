using EPZEU.Common;
using EPZEU.Utilities;
using System;
using System.Net;

namespace EPZEU.Audit.Models
{
    /// <summary>
    /// Събитие за одит.
    /// </summary>
    public class LogAction
    {
        #region Constructors

        public LogAction()
        {
        }

        public LogAction(LogActionRequest request, string operationID)
        {
            ActionType = request.ActionType;
            AdditionalData = request.AdditionalData;
            IpAddress = !string.IsNullOrEmpty(request.IpAddress) ? IPAddress.Parse(request.IpAddress) : null;
            Key = request.Key;
            LogActionDate = request.LogActionDate;
            LogActionID = request.LogActionID;
            LoginSessionID = request.LoginSessionID;
            Module = request.Module;
            ObjectType = request.ObjectType;
            Functionality = request.Functionality;
            UserID = request.UserID;
            UserSessionID = request.UserSessionID;
            OperationID = operationID;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Идентификатор на събитието.
        /// </summary>
        [DapperColumn("log_action_id")]
        public long? LogActionID { get; set; }

        /// <summary>
        /// дата на събитието - дата и час на настъпване на събитието.
        /// </summary>
        [DapperColumn("log_action_date")]
        public DateTime? LogActionDate { get; set; }

        /// <summary>
        /// Тип на обект, за който е събитието.
        /// </summary>
        [DapperColumn("object_type_id")]
        public ObjectTypes? ObjectType { get; set; }

        /// <summary>
        /// Събитие, за което се записват данните за одит.
        /// </summary>
        [DapperColumn("action_type_id")]
        public ActionTypes? ActionType { get; set; }

        /// <summary>
        /// Функционалност/модул през който е настъпило събитието.
        /// </summary>
        [DapperColumn("module_id")]
        public Modules? Module { get; set; }

        /// <summary>
        /// Портал/Система в която е функционалността/модула през който е настъпило събитието.
        /// </summary>
        [DapperColumn("functionality_id")]
        public Functionalities? Functionality { get; set; }

        /// <summary>
        /// Стойност на ключов атрибут на обекта - в зависимост от обекта това може да бъде ЕИК за партида в ТРРЮЛНЦ или потребителско име 
        /// за обект потребител или кадастрален номер на имот в ИР или ЕГН/ЛНЧ на лице за обект лице в ИР или номер на партида за партида в ИР.
        /// Ключовият атрибут за които се пази стойността е дефиниран в списъка на събитията и обектите за които се прави одитен запис.
        /// </summary>
        [DapperColumn("key")]
        public string Key { get; set; }

        /// <summary>
        /// Идентификатор на потребителската сесия.
        /// </summary>
        [DapperColumn("user_session_id")]
        public Guid? UserSessionID { get; set; }

        /// <summary>
        /// Идентификатор на логин сесия.
        /// </summary>
        [DapperColumn("login_session_id")]
        public Guid? LoginSessionID { get; set; }

        /// <summary>
        /// Профил на потребителят, извършващ действието - данни за връзка към потребителски профил. Запазват се само ако потребителят се е автентикирал.
        /// </summary>
        [DapperColumn("user_id")]
        public int? UserID { get; set; }

        /// <summary>
        /// IP адрес на потребителя, извършващ действието.
        /// </summary>
        [DapperColumn("ip_address")]
        public IPAddress IpAddress { get; set; }

        /// <summary>
        /// Системна връзка с обекта, за който се записват данните за одит.Възможно е няма такава връзка, когато събитието не е свързано с конкретен обект,
        /// като например ако има дефинирано одитиране на търсене в списъка на събитията и обектите за които се прави одитен запис.
        /// 
        /// Допълнителна информация към одитния запис - към основния одитен запис трябва да се съхранява, допълнителна информация като 
        /// например за критерии за търсене, направени промени в данните за обекта и други, които са специфични за конкретен обект и събитие. 
        /// </summary>
        [DapperColumn("additional_data")]
        public object AdditionalData { get; set; }

        /// <summary>
        /// Идентификатор на идемпотентна опепрация.
        /// </summary>
        [DapperColumn("operation_id")]
        public string OperationID { get; set; }

        #endregion
    }

}
