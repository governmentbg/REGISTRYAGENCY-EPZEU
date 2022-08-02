using CNSys.Data;
using EPZEU.Emails.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Emails.Repositories
{
    /// <summary>
    /// Критерии за търсене за работа с имейли.
    /// </summary>
    public class EmailSearchCriteria
    {
        /// <summary>
        /// Статус.
        /// </summary>
        public EmailStatues Status { get; set; }

        /// <summary>
        ///  Приоритет.
        /// </summary>
        public EmailPriority Priority { get; set; }

        /// <summary>
        /// Флаг за разграничаване на съобщенията, за които датата за обработка е (или не е) настъпила.
        /// </summary>
        public bool? IsDoNotProcessBeforeExpired { get; set; }

        /// <summary>
        /// Идентификатор на операция по създаване
        /// </summary>
        public string OperationID { get; set; }
    }

    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип EmailMessage.
    /// </summary>
    public interface IEmailRepository : 
        IRepository<EmailMessage, long?, EmailSearchCriteria>, 
        IRepositoryAsync<EmailMessage, long?, EmailSearchCriteria>
    {
        /// <summary>
        /// отбелязване на състоянието на имейл след опит за изпращане.      
        /// </summary>
        /// <param name="emailID">Идентификатор на съобщение.</param>
        /// <param name="isSend">Флаг, указващ дали съобщението е изпратено успешно.</param>
        /// <param name="cancellationToken"></param>
        Task<bool> SendAttemptAsync(int emailID, bool isSend, CancellationToken cancellationToken);

        /// <summary>
        /// Връща чакащите емайли за изпращане.
        /// </summary>
        /// <param name="maxFetched"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<EmailMessage>> GetPendingAsync(int maxFetched, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс IEmailEntity за поддържане и съхранение на обекти от тип EmailMessage.
    /// </summary>
    internal class EmailRepository : RepositoryBase<EmailMessage, long?, EmailSearchCriteria, EmailDataContext>, IEmailRepository
    {
        #region Constructors

        public EmailRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IEmailEntity

        protected override async Task CreateInternalAsync(EmailDataContext context, EmailMessage item, CancellationToken cancellationToken)
        {
            var emailID = await context.EmailCreateAsync((short?)item.Priority,
                                item.TryCount,
                                item.Subject,
                                item.Body, 
                                item.IsBodyHtml, 
                                item.SendingProviderName, 
                                item.Recipients,
                                item.OperationID,
                                cancellationToken);

            item.EmailID = emailID;
        }

        protected override async Task<IEnumerable<EmailMessage>> SearchInternalAsync(EmailDataContext dataContext, PagedDataState state, EmailSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<EmailMessage> emailMessages = null;
            var res = await dataContext.EmailSearchAsync((short?)searchCriteria.Priority,
                                                    (short?)searchCriteria.Status,
                                                    searchCriteria.IsDoNotProcessBeforeExpired,
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    searchCriteria.OperationID,
                                                    cancellationToken); 
            using (res.reader)
            {
                state.Count = res.count ?? state.Count;

                emailMessages = await res.reader.ReadToListAsync<EmailMessage>(cancellationToken);
            }

            return emailMessages;

        }

        protected override Task<IEnumerable<EmailMessage>> SearchInternalAsync(EmailDataContext context, EmailSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public async Task<bool> SendAttemptAsync(int emailID, bool isSend, CancellationToken cancellationToken)
        {
            if (IsReadOnly)
                throw new NotSupportedException("The entity is read-only!");

            bool? isFailedInt = null;
            await DoOperationAsync(async (dc, innerToken) =>
            {
                isFailedInt = await dc.EmailSendAttemptAsync(emailID,
                                isSend,
                                innerToken);
                
            }, cancellationToken);

            if (!isFailedInt.HasValue)
                throw new NotSupportedException("isFailedInt must have a value");

            var isFailed = isFailedInt.Value;
            return isFailed;
        }

        public Task<List<EmailMessage>> GetPendingAsync(int maxFetched, CancellationToken cancellationToken)
        {
            if (IsReadOnly)
                throw new NotSupportedException("The entity is read-only!");

            return DoOperationAsync(async(dc, innerToken) =>
            {
                using (var reader = await dc.GetPendingAsync(maxFetched, innerToken))
                {
                    var res = await reader.ReadToListAsync<EmailMessage>(innerToken);
                    return res;
                }
            }, cancellationToken);
        }

        #endregion
    }
}
