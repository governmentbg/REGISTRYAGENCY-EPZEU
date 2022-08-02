using CNSys.Data;
using EPZEU.Audit.Models;
using EPZEU.Common;
using System;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Audit.Repositories
{
    /// <summary>
    /// Критерии за търсене за работа с одит
    /// </summary>
    public class LogActionSearchCriteria
    {
        /// <summary>
        /// Период от.
        /// </summary>
        public DateTime? LogActionDateFrom { get; set; }

        /// <summary>
        /// Период до.
        /// </summary>
        public DateTime? LogActionDateTo { get; set; }

        /// <summary>
        /// Типа обект.
        /// </summary>
        public ObjectTypes? ObjectType { get; set; }

        /// <summary>
        /// Събитие.
        /// </summary>
        public ActionTypes? ActionType { get; set; }

        /// <summary>
        /// Модул/Функционалност.
        /// </summary>
        public Modules? Module { get; set; }

        /// <summary>
        /// Портал/Система.
        /// </summary>
        public Functionalities? Functionality { get; set; }

        /// <summary>
        /// Стойност на ключов атрибут на обекта - в зависимост от обекта това може да бъде ЕИК за партида в ТРРЮЛНЦ или потребителско име 
        /// за обект потребител или кадастрален номер на имот в ИР или ЕГН/ЛНЧ на лице за обект лице в ИР или номер на партида за партида в ИР.
        /// Ключовият атрибут за които се пази стойността е дефиниран в списъка на събитията и обектите за които се прави одитен запис.
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Профил на потребителят, извършващ действието - данни за връзка към потребителски профил. Запазват се само ако потребителят се е автентикирал.
        /// </summary>
        public int? UserID { get; set; }

        /// <summary>
        /// Потребителска сесия.
        /// </summary>
        public Guid? UserSessionID { get; set; }

        /// <summary>
        /// Логин сесия.
        /// </summary>
        public Guid? LoginSessionID { get; set; }

        /// <summary>
        /// IP адрес.
        /// </summary>
        public IPAddress IpAddress { get; set; }

        /// <summary>
        /// Системна връзка с обекта, за който се записват данните за одит.Възможно е няма такава връзка, когато събитието не е свързано с конкретен обект,
        /// като например ако има дефинирано одитиране на търсене в списъка на събитията и обектите за които се прави одитен запис.
        /// 
        /// Допълнителна информация към одитния запис - към основния одитен запис трябва да се съхранява, допълнителна информация като 
        /// например за критерии за търсене, направени промени в данните за обекта и други, които са специфични за конкретен обект и събитие. 
        /// </summary>
        public string AdditionalData { get; set; }
    }

    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип LogAction.
    /// </summary>
    public interface ILogActionRepository : IRepository<LogAction, long?, LogActionSearchCriteria>, IRepositoryAsync<LogAction, long?, LogActionSearchCriteria>
    {
        Task CreateAsync(LogActionRequest logActionRequest, CancellationToken cancellationToken);
    }
    /// <summary>
    /// Реализация на интерфeйс IEmailEntity за поддържане и съхранение на обекти от тип LogAction.
    /// </summary>
    internal class LogActionRepository : RepositoryBase<LogAction, long?, LogActionSearchCriteria, LogActionDataContext>, ILogActionRepository
    {
        #region Constructors

        public LogActionRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region ILogActionEntity

        public Task CreateAsync(LogActionRequest logActionRequest, CancellationToken cancellationToken) {
            return (DoOperationAsync(async(context, innerToken) =>
            {
                long? logActionID = await context.LogActionCreateAsync(logActionRequest.LogActionDate,
                                    (short)logActionRequest.ObjectType,
                                    (short?)logActionRequest.ActionType,
                                    (short)logActionRequest.Module,
                                    (short)logActionRequest.Functionality,
                                    logActionRequest.Key,
                                    logActionRequest.UserSessionID,
                                    logActionRequest.LoginSessionID,
                                    logActionRequest.UserID,
                                    logActionRequest.UserCIN,
                                    !string.IsNullOrEmpty(logActionRequest.IpAddress) ? IPAddress.Parse(logActionRequest.IpAddress) : null,
                                    logActionRequest.AdditionalData,
                                    logActionRequest.OperationID,
                                    innerToken);

                logActionRequest.LogActionID = logActionID;
            }, cancellationToken));
        }

        #endregion
    }
}
