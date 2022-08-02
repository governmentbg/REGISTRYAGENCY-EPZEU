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
    /// Интерфейс за поддържане и съхранение на обекти от тип DocumentTemplateField.
    /// </summary>
    public interface IDocumentTemplateFieldRepository : 
        IRepository<DocumentTemplateField, string, ApplicationDocumentTemplateFieldSearchCriteria>,
        IRepositoryAsync<DocumentTemplateField, string, ApplicationDocumentTemplateFieldSearchCriteria>,
        ISearchCollectionInfo2<DocumentTemplateField, ApplicationDocumentTemplateFieldSearchCriteria>
    {
    }
    /// <summary>
    /// Реализация на интерфейс IDocumentTemplateFieldEntity за поддържане и съхранение на обекти от тип DocumentTemplateField.
    /// </summary>
    internal class DocumentTemplateFieldRepository : RepositoryBase<DocumentTemplateField, string, ApplicationDocumentTemplateFieldSearchCriteria, DocumentDataContext>, IDocumentTemplateFieldRepository
    {
        #region Constructors

        public DocumentTemplateFieldRepository(IDbContextProvider dbContextProvider) : base(dbContextProvider)
        {
        }

        #endregion

        #region ISearchCollectionInfo<ApplicationDocumentTemplateField, ApplicationDocumentTemplateFieldSearchCriteria>

        public Task<CollectionInfo<DocumentTemplateField>> SearchInfoAsync(ApplicationDocumentTemplateFieldSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return SearchInfoAsync(PagedDataState.CreateMaxPagedDataState(), searchCriteria, cancellationToken);
        }

        public Task<CollectionInfo<DocumentTemplateField>> SearchInfoAsync(PagedDataState state, ApplicationDocumentTemplateFieldSearchCriteria searchCriteria, CancellationToken cancellationToken)
        {
            return DoOperationAsync(async (dc, innerToken) =>
            {
                DateTime? lastUpdated = null;
                List<DocumentTemplateField> data = null;
                var res = await dc.ApplicationDocumentTemplateFieldSearchAsync(
                                                    searchCriteria.Keys,
                                                    state.StartIndex,
                                                    state.PageSize,
                                                    (state.StartIndex == 1),
                                                    innerToken);

                using (res.reader)
                {
                    data = await res.reader.ReadToListAsync<DocumentTemplateField>(innerToken);
                    state.Count = res.p_count ?? state.Count;
                    lastUpdated = res.p_last_updated_on;
                }

                return new CollectionInfo<DocumentTemplateField>()
                {
                    Data = data,
                    LastUpdatedOn = lastUpdated.GetValueOrDefault()
                };
            }, cancellationToken);
        }

        #endregion
    }

    /// <summary>
    /// Критерии за търсене за работа с полета от шаблони на документи
    /// </summary>
    public class ApplicationDocumentTemplateFieldSearchCriteria
    {
        /// <summary>
        /// Ключове
        /// </summary>
        public string[] Keys { get; set; }
    }
}
