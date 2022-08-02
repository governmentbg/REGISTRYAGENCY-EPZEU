using CNSys.Data;
using EPZEU.Common;
using EPZEU.CR.ApplicationProcesses.Models;
using Microsoft.Extensions.Options;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.ApplicationProcesses.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип ApplicationProcessContent.
    /// </summary>
    public interface IApplicationProcessContentRepository : IRepositoryAsync<ApplicationProcessContent, long?, ApplicationProcessContentSearchCriteria>
    {
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationProcessContentEntity за поддържане и съхранение на обекти от тип ApplicationProcessContent.
    /// </summary>
    internal class ApplicationProcessContentRepository : RepositoryBase<ApplicationProcessContent, long?, ApplicationProcessContentSearchCriteria, ApplicationProcessDataContext>, IApplicationProcessContentRepository
    {
        private GlobalOptions _globalOptions;

        #region Constructors

        public ApplicationProcessContentRepository(IOptions<GlobalOptions> optionsAccessor, IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
            _globalOptions = optionsAccessor.Value;
        }


        #endregion

        #region CRUD

        protected async override Task CreateInternalAsync(ApplicationProcessDataContext context, ApplicationProcessContent item, CancellationToken cancellationToken)
        {
            item.ApplicationProcessContentID = await context.ApplicationProcessContentCreateAsync(item.ApplicationProcessID,
                                                    (short?)item.Type,
                                                    cancellationToken);

            if (item.ApplicationProcessContentID.HasValue && item.Content != null)
            {
                await UploadContent(item.Content, item.ApplicationProcessContentID.Value, context, cancellationToken);
            }
        }

        protected async override Task UpdateInternalAsync(ApplicationProcessDataContext context, ApplicationProcessContent item, CancellationToken cancellationToken)
        {
            await context.ApplicationProcessContentUpdate(item.ApplicationProcessContentID,
                                                item.ApplicationProcessID,
                                                (short?)item.Type,
                                                cancellationToken);

            if(item.Content != null)
            {
                await UploadContent(item.Content, item.ApplicationProcessContentID.Value, context, cancellationToken);
            }
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            if (key == null)
                throw new ArgumentNullException();

            return context.ApplicationProcessContentDelete(key, cancellationToken);
        }

        protected override Task DeleteInternalAsync(ApplicationProcessDataContext context, ApplicationProcessContent item, CancellationToken cancellationToken)
        {
            return DeleteInternalAsync(context, item.ApplicationProcessContentID, cancellationToken);
        }

        protected override Task<ApplicationProcessContent> ReadInternalAsync(ApplicationProcessDataContext context, long? key, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        protected async override Task<IEnumerable<ApplicationProcessContent>> SearchInternalAsync(ApplicationProcessDataContext context, PagedDataState state, ApplicationProcessContentSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            List<ApplicationProcessContent> contents = null;

            var res = await context.ApplicationProcessContentSearch(searchCriteria.ApplicationProcessID,
                    searchCriteria.ApplicationIDs?.ToArray(),
                    (short?)searchCriteria.Type,
                    state.StartIndex,
                    state.PageSize,
                    state.StartIndex == 1,
                    searchCriteria.MaxNumberOfRecords,
                    cancellationToken);

            using (var reader = res.reader)
            {
                state.Count = res.count ?? state.Count;
                contents = reader.ReadToList<ApplicationProcessContent>();
            }
            
            if (searchCriteria.LoadOption.LoadContent && contents != null)
            {
                foreach (var item in contents)
                {
                    item.Content = ApplicationProcessDataContext.CreateApplicationProcessContenReadStream(item.ApplicationProcessContentID.Value, DbContextProvider);
                }
            }

            return contents;
        }

        protected override Task<IEnumerable<ApplicationProcessContent>> SearchInternalAsync(ApplicationProcessDataContext context, ApplicationProcessContentSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInternalAsync(context, PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        #endregion

        #region Helpers

        private async Task UploadContent(Stream content, long applicationProcessContentID, ApplicationProcessDataContext context, CancellationToken cancellationToken)
        {
            if (content.Position != 0)
                throw new ArgumentException("The content stream must be in 0 position in order to be uploaded.");

            int chunkSize = _globalOptions.GL_COPY_BUFFER_SIZE;

            byte[] buffer = null;

            try
            {
                buffer = ArrayPool<byte>.Shared.Rent(chunkSize);
                int offset = 1;
                int bytesReaded = 0;

                while ((bytesReaded = content.Read(buffer, 0, chunkSize)) > 0)
                {
                    await context.ApplicationProcessContentUpload(applicationProcessContentID, buffer, offset, bytesReaded, cancellationToken);

                    offset += bytesReaded;
                }
            }
            finally
            {
                if (buffer != null)
                    ArrayPool<byte>.Shared.Return(buffer);
            }
        }

        #endregion
    }
}
