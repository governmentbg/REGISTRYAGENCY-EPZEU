using EPZEU.Nomenclatures.Models;
using EPZEU.Nomenclatures.Repositories;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EPZEU.Utilities.Caching;

namespace EPZEU.Nomenclatures.Cache
{
    public struct DocumentTemplatesCacheItem
    {
        public readonly List<DocumentTemplate> DocumentTemplates;
        public readonly List<DocumentTemplateField> DocumentTemplateFields;

        public DocumentTemplatesCacheItem(List<DocumentTemplate> documentTemplates, List<DocumentTemplateField> documentTemplateFields)
        {
            DocumentTemplates = documentTemplates;
            DocumentTemplateFields = documentTemplateFields;
        }
    }
 
    public class DocumentTemplates : IDocumentTemplates
    {
        private readonly IDocumentTemplatesDataCache _nomCache;
        private readonly IDocumentTemplatesContentDbCache _nomContentCache;

        public DocumentTemplates(IDocumentTemplatesDataCache nomCache, IDocumentTemplatesContentDbCache nomContentCache)
        {
            _nomCache = nomCache;
            _nomContentCache = nomContentCache;
        }

        public DocumentTemplate GetDocumentTemplate(string documentTypeID)
        {
            return GetDocumentTemplates().SingleOrDefault(t => t.DocumentTypeID == documentTypeID);
        }

        public IEnumerable<DocumentTemplate> GetDocumentTemplates()
        {
            return _nomCache.Get().Value.DocumentTemplates;
        }

        public IEnumerable<DocumentTemplate> GetDocumentTemplates(out DateTime? lastModifiedDate)
        {
            var data = _nomCache.Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value.DocumentTemplates;
        }

        public IEnumerable<Models.DocumentTemplateField> GetDocumentTemplateFields()
        {
            return _nomCache.Get().Value.DocumentTemplateFields;
        }

        public IEnumerable<DocumentTemplateField> GetDocumentTemplateFields(out DateTime? lastModifiedDate)
        {
            var data = _nomCache.Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value.DocumentTemplateFields;
        }

        public string GetDocumentTemplateContent(int docTemplateID)
        {
            return _nomContentCache.GetItem(docTemplateID).Get().Value;
        }

        public string GetDocumentTemplateContent(int docTemplateID, out DateTime? lastModifiedDate)
        {
            var data = _nomContentCache.GetItem(docTemplateID).Get();

            lastModifiedDate = data.LastModifiedDate;

            return data.Value;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }

        public ValueTask EnsureLoadedDocumentTemplatesContentsAsync(int docTemplateID)
        {
            return _nomContentCache.GetItem(docTemplateID).EnsureCreatedAsync(CancellationToken.None);
        }
    }

    public interface IDocumentTemplatesDataCache
       : IDataCacheItem<CachedDataInfo<DocumentTemplatesCacheItem>>
    {
    }

    public class DocumentTemplatesDbCache : DbDataCacheItem<DocumentTemplatesCacheItem>, IDocumentTemplatesDataCache
    {
        private readonly IDocumentTemplateRepository _documentTemplateRepository;
        private readonly IDocumentTemplateFieldRepository _documentTemplateFieldRepository;

        public DocumentTemplatesDbCache(ILogger<DocumentTemplatesDbCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher, IDocumentTemplateRepository documentTemplateRepository, IDocumentTemplateFieldRepository documentTemplateFieldRepository) :
            base(logger, dbCacheInvalidationDispatcher, null, new string[] { "nom.d_document_templates", "nom.s_document_template_fields" })
        {
            _documentTemplateRepository = documentTemplateRepository;
            _documentTemplateFieldRepository = documentTemplateFieldRepository;
        }

        protected override async Task<CachedDataInfo<DocumentTemplatesCacheItem>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var data = await _documentTemplateRepository.SearchInfoAsync(new ApplicationDocumentTemplateSearchCriteria(), cancellationToken);
            var dataFields = await _documentTemplateFieldRepository.SearchInfoAsync(new ApplicationDocumentTemplateFieldSearchCriteria(), cancellationToken);

            return new CachedDataInfo<DocumentTemplatesCacheItem>()
            {
                LastModifiedDate = data.LastUpdatedOn >= dataFields.LastUpdatedOn ? data.LastUpdatedOn : dataFields.LastUpdatedOn,
                Value = new DocumentTemplatesCacheItem(data.Data.ToList(), dataFields.Data.ToList())
            };
        }
    }

    public interface IDocumentTemplatesContentDbCache : IDataCacheItems<CachedDataInfo<string>, int>
    {
    }

    public class DocumentTemplatesContentDbCache : DataCacheItems<CachedDataInfo<string>, int>, IDocumentTemplatesContentDbCache
    {
        private readonly IDocumentTemplateRepository _documentTemplateRepository;
        private readonly ILogger _logger;
        private readonly IDbCacheInvalidationDispatcher _dbCacheInvalidationDispatcher;
        private readonly string[] _depencyTableNames = new string[] { "nom.d_document_templates" };

        public DocumentTemplatesContentDbCache(
            IDocumentTemplateRepository documentTemplateRepository
            , ILogger<DocumentTemplatesContentDbCache> logger
            , IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher)
        {
            _documentTemplateRepository = documentTemplateRepository;
            _logger = logger;
            _dbCacheInvalidationDispatcher = dbCacheInvalidationDispatcher;
        }

        protected override IDataCacheItem<CachedDataInfo<string>> CreateCacheItem(int key)
        {
            return new DbDataCacheItem<string>(_logger, _dbCacheInvalidationDispatcher, async (etag, cancellationToken) =>
            {
                var data = await _documentTemplateRepository.SearchInfoAsync(new ApplicationDocumentTemplateContentSearchCriteria() { DocumentTemplateID = key }, cancellationToken);

                return await Task.FromResult(new CachedDataInfo<string>()
                {
                    LastModifiedDate = data.LastUpdatedOn,
                    Value = data.Data.SingleOrDefault()
                });
            }, _depencyTableNames);
        }
    }
}
