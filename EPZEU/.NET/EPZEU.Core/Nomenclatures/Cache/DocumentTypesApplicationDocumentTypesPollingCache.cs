using EPZEU.Nomenclatures.Models;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Nomenclatures.Cache
{
    public class DocumentTypeApplicationDocumentTypeCacheItem
    {
        public List<DocumentType> DocumentTypes { get; private set; }

        public Dictionary<string, DocumentType> DocumentTypesByID { get; private set; }

        public Dictionary<string, List<ApplicationDocumentType>> ApplicationDocumentTypesByAppTypeID { get; private set; }

        #region Constructors

        public DocumentTypeApplicationDocumentTypeCacheItem(List<DocumentType> documentTypes, List<ApplicationDocumentType> applicationDocumentTypes)
        {
            DocumentTypes = documentTypes;
            DocumentTypesByID = new Dictionary<string, DocumentType>();

            foreach (var docType in documentTypes)
            {
                DocumentTypesByID[docType.DocumentTypeID] = docType;
            }

            ApplicationDocumentTypesByAppTypeID = new Dictionary<string, List<ApplicationDocumentType>>();
            foreach (var appDocType in applicationDocumentTypes)
            {
                DocumentType docType = null;

                if (DocumentTypesByID.TryGetValue(appDocType.DocumentTypeID, out docType))
                    appDocType.DocumentType = docType;

                if (!ApplicationDocumentTypesByAppTypeID.ContainsKey(appDocType.ApplicationTypeID))
                {
                    ApplicationDocumentTypesByAppTypeID[appDocType.ApplicationTypeID] = new List<ApplicationDocumentType>();
                }

                ApplicationDocumentTypesByAppTypeID[appDocType.ApplicationTypeID].Add(appDocType);
            }
        }

        #endregion
    }

    public class ApplicationDocumentTypesCR : IApplicationDocumentTypes
    {
        private readonly IDocumentTypesApplicationDocumentTypesDataCacheCR _nomCache;

        public ApplicationDocumentTypesCR(IDocumentTypesApplicationDocumentTypesDataCacheCR nomCache)
        {
            _nomCache = nomCache;

        }
     
        public IEnumerable<DocumentType> GetDocumentTypes(out DateTime? lastDateModified)
        {
            var data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            return data.Value.DocumentTypes;
        }

        public IEnumerable<ApplicationDocumentType> GetApplicationDocumentTypes(out DateTime? lastDateModified)
        {
            var data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            List<ApplicationDocumentType> res = null;

            if(data.Value.ApplicationDocumentTypesByAppTypeID != null)
            {
                res = new List<ApplicationDocumentType>();

                foreach (var kv in data.Value.ApplicationDocumentTypesByAppTypeID)
                {
                    res.AddRange(kv.Value);
                }
            }

            return res;
        }

        public IEnumerable<ApplicationDocumentType> GetApplicationDocumentTypes(string appType, out DateTime? lastDateModified)
        {
            var data = _nomCache.Get();

            lastDateModified = data.LastModifiedDate;

            data.Value.ApplicationDocumentTypesByAppTypeID.TryGetValue(appType, out List<ApplicationDocumentType> res);

            return res;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return _nomCache.EnsureCreatedAsync(cancellationToken);
        }
    }

    public interface IDocumentTypesApplicationDocumentTypesDataCacheCR
        : IDataCacheItem<CachedDataInfo<DocumentTypeApplicationDocumentTypeCacheItem>>
    {
    }

    internal class DocumentTypesApplicationDocumentTypesPollingCacheCR : PollingDataCacheItem<DocumentTypeApplicationDocumentTypeCacheItem>, IDocumentTypesApplicationDocumentTypesDataCacheCR
    {
        private readonly INomenclaturesServiceClient _nomenclaturesClient;

        public DocumentTypesApplicationDocumentTypesPollingCacheCR(ILogger<DocumentTypesApplicationDocumentTypesPollingCacheCR> logger, INomenclaturesServiceClient nomenclaturesClient, IPollingCacheInfrastructure pollingCacheInfrastructure) : base(logger, pollingCacheInfrastructure, null)
        {
            _nomenclaturesClient = nomenclaturesClient;
        }

        protected override async Task<CachedDataInfo<DocumentTypeApplicationDocumentTypeCacheItem>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var documentTypesTask = _nomenclaturesClient.LoadDocumentTypeAsync(etag, cancellationToken, Registers.CR);
            var appDocumentTypesTask = _nomenclaturesClient.LoadApplicationDocumentTypeAsync(etag, cancellationToken, Registers.CR);

            /*първо се пускат операциите, след това се изчакват за да се изпълняват паралелно*/
            var documentTypes = await documentTypesTask;
            var appDocumentTypes = await appDocumentTypesTask;

            return new CachedDataInfo<DocumentTypeApplicationDocumentTypeCacheItem>()
            {
                Value = (documentTypes.Data != null && appDocumentTypes.Data != null) ? new DocumentTypeApplicationDocumentTypeCacheItem(documentTypes.Data.ToList(), appDocumentTypes.Data.ToList()) : null,
                LastModifiedDate = documentTypes.ModifiedDate >= appDocumentTypes.ModifiedDate ? documentTypes.ModifiedDate : appDocumentTypes.ModifiedDate
            };
        }
    }
}
