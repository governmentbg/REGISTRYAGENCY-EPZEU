using CNSys.Data;
using EPZEU.CR.ApplicationProcesses.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationProcesses.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип ApplicationDocument.
    /// </summary>
    public interface IApplicationDocumentRepository : IRepositoryAsync<ApplicationDocument, long?, ApplicationDocumentSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationDocumentEntity за поддържане и съхранение на обекти от тип ApplicationDocument.
    /// </summary>
    internal class ApplicationDocumentRepository : RepositoryBase<ApplicationDocument, long?, ApplicationDocumentSearchCriteria, ApplicationProcessDataContext>, IApplicationDocumentRepository
    {
        #region Constructors

        public ApplicationDocumentRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected async override Task CreateInternalAsync(ApplicationProcessDataContext context, ApplicationDocument item, CancellationToken cancellationToken)
        {
            item.ApplicationDocumentID = await context.ApplicationDocumentCreate(item.Name,
                                                 item.BackofficeGuid,
                                                 item.ApplicationID,
                                                 item.DocumentTypeID,
                                                 item.IsOriginal,
                                                 item.RejectedApplicationProcessID,
                                                 item.HtmlTemplateContent,
                                                 item.SigningGuid,
                                                 item.IncomingNumber,
                                                 cancellationToken);
        }

        protected override Task UpdateInternalAsync(ApplicationProcessDataContext context, ApplicationDocument item, CancellationToken cancellationToken)
        {
            return context.ApplicationDocumentUpdateAsync(item.ApplicationDocumentID,
                                             item.Name,
                                             item.BackofficeGuid,
                                             item.ApplicationID,
                                             item.DocumentTypeID,
                                             item.IsOriginal,
                                             item.RejectedApplicationProcessID,
                                             item.HtmlTemplateContent,
                                             item.SigningGuid,
                                             item.IncomingNumber,
                                             cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            if (key == null)
                throw new ArgumentNullException();

            return context.ApplicationDocumentDeleteAsync(key.Value, cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, ApplicationDocument item, CancellationToken cancellationToken)
        {
            return DeleteInternalAsync(context, item.ApplicationDocumentID, cancellationToken);
        }

        protected async override Task<ApplicationDocument> ReadInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            return (await SearchInternalAsync(context, new ApplicationDocumentSearchCriteria() { ApplDocumentIDs = new List<long>() { key.Value } }, cancellationToken)).SingleOrDefault();
        }

        protected async override Task<IEnumerable<ApplicationDocument>> SearchInternalAsync(ApplicationProcessDataContext context, PagedDataState state, ApplicationDocumentSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var res = await context.ApplicationDocumentSearchAsync(
                    searchCriteria.ApplicationIDs?.ToArray(),
                    searchCriteria.ApplDocumentIDs?.ToArray(),
                    searchCriteria.ApplDocumentGUIDs?.ToArray(),
                    searchCriteria.SigningGiud,
                    state.StartIndex,
                    state.PageSize,
                    (state.StartIndex == 1),
                    searchCriteria.MaxNumberOfRecords,
                    cancellationToken);

            List<ApplicationDocument> docs = null;

            using (var reader = res.reader)
            {
                docs = reader.ReadToList<ApplicationDocument>();
            }
            state.Count = res.count ?? state.Count;

            return docs;
        }

        protected override Task<IEnumerable<ApplicationDocument>> SearchInternalAsync(ApplicationProcessDataContext context, ApplicationDocumentSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion
    }
}
