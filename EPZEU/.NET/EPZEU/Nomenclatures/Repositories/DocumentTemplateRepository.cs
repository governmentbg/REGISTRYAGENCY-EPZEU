using CNSys.Data;
using EPZEU.Nomenclatures.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Repositories
{
    /// <summary>
    /// Интерфейс за поддържане и съхранение на обекти от тип DocumentTemplate.
    /// </summary>
    public interface IDocumentTemplateRepository : 
        IRepository<DocumentTemplate, int?, ApplicationDocumentTemplateSearchCriteria>,
        IRepositoryAsync<DocumentTemplate, int?, ApplicationDocumentTemplateSearchCriteria>,
        ISearchCollectionInfo2<DocumentTemplate, ApplicationDocumentTemplateSearchCriteria>,
        ISearchCollectionInfo2<string, ApplicationDocumentTemplateContentSearchCriteria>
    { }

    /// <summary>
    /// Реализация на интерфейс IDocumentTemplateEntity за поддържане и съхранение на обекти от тип DocumentTemplate.
    /// </summary>
    internal class DocumentTemplateRepository : RepositoryBase<DocumentTemplate, int?, ApplicationDocumentTemplateSearchCriteria, DocumentDataContext>, IDocumentTemplateRepository
    {
        #region Constructors

        public DocumentTemplateRepository(IDbContextProvider dbContextProvider)
            : base(dbContextProvider)
        {
        }

        #endregion

        #region ISearchCollectionInfo<ApplicationDocumentTemplate, ApplicationDocumentTemplateSearchCriteria>

        public Task<CollectionInfo<DocumentTemplate>> SearchInfoAsync(ApplicationDocumentTemplateSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<DocumentTemplate>> SearchInfoAsync(PagedDataState state, ApplicationDocumentTemplateSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<DocumentTemplate> data = null;
                var res = await dc.ApplicationDocumentTemplateSearchAsync(
                                                    searchCriteria.DocumentTemplateIDs,
                                                    searchCriteria.DocumentTypeIDs,
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    innerToken);

                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<DocumentTemplate>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdated = res.p_last_updated_on;
                }

                return new CollectionInfo<DocumentTemplate>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };

            }, cancellationToken);
        }

        #endregion

        #region ISearchCollectionInfo<string, ApplicationDocumentTemplateContentSearchCriteria>

        public Task<CollectionInfo<string>> SearchInfoAsync(ApplicationDocumentTemplateContentSearchCriteria searchCriteria, CancellationToken cancellationTokena)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationTokena);
        }

        public Task<CollectionInfo<string>> SearchInfoAsync(PagedDataState state, ApplicationDocumentTemplateContentSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                string content = null;
                DateTime? lastUpdated = null;
                var res = await dc.ApplicationDocumentTemplateContentReadAsync(searchCriteria.DocumentTemplateID, innerToken);

                using (res.reader)
                {
                    content = res.p_content;
                }

                state.Count = string.IsNullOrEmpty(content)? 0 : 1;

                return new CollectionInfo<string>()
                {
                    Data = string.IsNullOrEmpty(content) ? null : new List<string>() { content },
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };

            }, cancellationToken);
        }

        #endregion

    }

    /// <summary>
    /// Критерии за търсене за работа с шаблони на документи
    /// </summary>
    public class ApplicationDocumentTemplateSearchCriteria
    {
        /// <summary>
        /// Уникални идентификатори на шаблони на документи
        /// </summary>
        public int[] DocumentTemplateIDs { get; set; }

        /// <summary>
        /// Уникални идентификатори на типове документи
        /// </summary>
        public string[] DocumentTypeIDs { get; set; }
    }

    /// <summary>
    /// Критерии за търсене за работа с съдържание на шаблони на документи
    /// </summary>
    public class ApplicationDocumentTemplateContentSearchCriteria
    {
        /// <summary>
        /// Уникален идентификатор на шаблон на документ
        /// </summary>
        public int? DocumentTemplateID { get; set; }
    }
}
