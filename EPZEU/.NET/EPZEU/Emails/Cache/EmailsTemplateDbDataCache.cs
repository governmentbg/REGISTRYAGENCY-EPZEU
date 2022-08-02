using EPZEU.Emails.Models;
using EPZEU.Emails.Repositories;
using EPZEU.Utilities;
using CNSys.Caching;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EPZEU.Utilities.Caching;

namespace EPZEU.Emails.Cache
{
    internal class EmailsTemplateDbDataCache : DbDataCacheItem<Dictionary<int, EmailTemplate>>, IEmailsCache
    {
        private readonly IEmailTemplateRepository _emailTemplateRepository;

        public EmailsTemplateDbDataCache(ILogger<EmailsTemplateDbDataCache> logger, IDbCacheInvalidationDispatcher dbCacheInvalidationDispatcher, IEmailTemplateRepository emailTemplateRepository) :
            base(logger, dbCacheInvalidationDispatcher, null, new string[] { "eml.n_s_email_templates" })
        {
            _emailTemplateRepository = emailTemplateRepository;
        }

        protected override async Task<CachedDataInfo<Dictionary<int, EmailTemplate>>> GenerateCacheDataInfoAsync(DateTime? etag, CancellationToken cancellationToken)
        {
            var data = await _emailTemplateRepository.SearchAsync(new EmailTemplateSearchCriteria(), cancellationToken);

            return new CachedDataInfo<Dictionary<int, EmailTemplate>>() { Value = data?.ToDictionary((item) => { return item.TemplateID.Value; }) };
        }

        public EmailTemplate GetEmailTemplate(int emailTemplateID)
        {
            Get().Value.TryGetValue(emailTemplateID, out EmailTemplate ret);

            return ret;
        }

        public ValueTask EnsureLoadedAsync(CancellationToken cancellationToken)
        {
            return this.EnsureCreatedAsync(cancellationToken);
        }
    }
}
