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
    /// Интерфейс за поддържане и съхранение на обекти от тип Application.
    /// </summary>
    public interface IApplicationRepository : IRepositoryAsync<Application, long?, ApplicationSearchCriteria>
    {
        Task<bool> HasUserDocumentDraftAccess(string docGuid, int cin, bool isUserIdentifiable, CancellationToken cancellationToken);
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationEntity за поддържане и съхранение на обекти от тип Application.
    /// </summary>
    internal class ApplicationRepository : RepositoryBase<Application, long?, ApplicationSearchCriteria, ApplicationProcessDataContext>, IApplicationRepository
    {
        #region Constructors

        public ApplicationRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region CRUD

        protected async override Task CreateInternalAsync(ApplicationProcessDataContext context, Application item, CancellationToken cancellationToken)
        {
            item.ApplicationID = await context.ApplicationCreateAsync(item.ApplicationProcessID,
                                          (short?)item.Type,
                                          item.ApplicationContentID,
                                          item.Order,
                                          item.AdditionalDataString,
                                          cancellationToken);
        }

        protected override Task UpdateInternalAsync(ApplicationProcessDataContext context, Application item, CancellationToken cancellationToken)
        {
            return context.ApplicationUpdateAsync(item.ApplicationID,
                                      item.ApplicationProcessID,
                                      (short?)item.Type,
                                      item.ApplicationContentID,
                                      item.AdditionalDataString,
                                      item.Order,
                                      cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            if (key == null)
                throw new ArgumentNullException();

            return context.ApplicationDeleteAsync(key, cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, Application item, CancellationToken cancellationToken)
        {
            return DeleteInternalAsync(context, item.ApplicationID, cancellationToken);
        }

        protected override Task<Application> ReadInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            return base.ReadInternalAsync(context, key, cancellationToken);
        }

        protected override Application ReadInternal(ApplicationProcessDataContext context, long? key)
        {
            var data = SearchInternal(context, new ApplicationSearchCriteria { ApplicationIDs = new List<long>() { key.Value } }).ToList();

            if (data == null || data.Count != 1)
                throw new NotSupportedException("Read must return exactly one item");

            return data[0];
            throw new NotImplementedException();
        }

        protected async override Task<IEnumerable<Application>> SearchInternalAsync(ApplicationProcessDataContext context, PagedDataState state, ApplicationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            var res = await context.ApplicationSearchAsync(
                    searchCriteria.ApplicationProcessID,
                    searchCriteria.ApplicationIDs?.ToArray(),
                    searchCriteria.LoadOption?.LoadApplicationDocuments,
                    searchCriteria.LoadOption?.LoadApplicationContent,
                    state.StartIndex,
                    state.PageSize,
                    state.StartIndex == 1,
                    searchCriteria.MaxNumberOfRecords,
                    cancellationToken);

            List<Application> applications = null;

            using (var reader = res.reader)
            {
                applications = reader.Read<Application>().ToList();

                List<ApplicationDocument> applDocuments = new List<ApplicationDocument>();

                if (searchCriteria.LoadOption != null && searchCriteria.LoadOption.LoadApplicationDocuments.GetValueOrDefault())
                {
                    applDocuments = reader.Read<ApplicationDocument>().ToList();
                }

                List<ApplicationProcessContent> applicationContents = new List<ApplicationProcessContent>();

                if (searchCriteria.LoadOption != null && searchCriteria.LoadOption.LoadApplicationContent.GetValueOrDefault())
                {
                    applicationContents = reader.Read<ApplicationProcessContent>().ToList();
                }

                if (applDocuments.Any() || applicationContents.Any())
                {
                    foreach (var application in applications)
                    {
                        if (applDocuments.Any())
                        {
                            application.Documents = applDocuments.Where(x => x.ApplicationID == application.ApplicationID).ToList();
                        }
                        if (applicationContents.Any())
                        {
                            application.ApplicationContent = applicationContents.SingleOrDefault(x => x.ApplicationProcessContentID == application.ApplicationContentID);
                            application.ApplicationContent.Content = ApplicationProcessDataContext.CreateApplicationProcessContenReadStream(application.ApplicationContent.ApplicationProcessContentID.Value, DbContextProvider);
                        }
                    }
                }
            }

            state.Count = res.count ?? state.Count;

            return applications;
        }

        protected override Task<IEnumerable<Application>> SearchInternalAsync(ApplicationProcessDataContext context, ApplicationSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<bool> HasUserDocumentDraftAccess(string docGuid, int cin, bool isUserIdentifiable, CancellationToken cancellationToken)
        {
            return DoOperationAsync((ctx, token) => 
            {
                return ctx.HasUserDocumentDraftAccessAsync(docGuid, cin, isUserIdentifiable, token);
            }, cancellationToken);
        }

        #endregion
    }
}
