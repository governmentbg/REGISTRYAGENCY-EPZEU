using CNSys.Data;
using EPZEU.Emails.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Emails.Repositories
{
    /// <summary>
    /// Критерии за търсене за работа с шаблони на имейли
    /// </summary>
    public class EmailTemplateSearchCriteria
    {
    }

    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип EmailTemplate.
    /// </summary>
    public interface IEmailTemplateRepository : 
        IRepository<EmailTemplate, long?, EmailTemplateSearchCriteria>,
        IRepositoryAsync<EmailTemplate, long?, EmailTemplateSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IEmailTemplateEntity за поддържане и съхранение на обекти от тип EmailMessage.
    /// </summary>
    internal class EmailTemplateRepository : RepositoryBase<EmailTemplate, long?, EmailTemplateSearchCriteria, EmailDataContext>, IEmailTemplateRepository
    {
        #region Constructors

        public EmailTemplateRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region IEmailTemplateEntity


        protected override async Task<IEnumerable<EmailTemplate>> SearchInternalAsync(EmailDataContext dataContext, PagedDataState state, EmailTemplateSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<EmailTemplate> emailTemplates = null;

            var res = await dataContext.EmailTemplateSearchAsync(
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    cancellationToken);
            using (res.reader)
            {
                state.Count = res.count ?? state.Count;

                emailTemplates = await res.reader.ReadToListAsync<EmailTemplate>(cancellationToken);
            }

            return emailTemplates;

        }

        protected override Task<IEnumerable<EmailTemplate>> SearchInternalAsync(EmailDataContext context, EmailTemplateSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
