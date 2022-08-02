package bg.registryagency.epzeu.pr.integration.scheduler;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.cache.CacheManager;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import lombok.extern.slf4j.Slf4j;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

@Slf4j
public class PropertyRegisterCacheRefreshTrigger extends BaseCacheRefreshTrigger {

    private final CacheManager cacheManager;

    public PropertyRegisterCacheRefreshTrigger(AppParameterCache appParameterCache,
                                               CacheManager cacheManager,
                                               ApplicationIntegrationProperties properties) {
        super(properties, appParameterCache);

        this.cacheManager = cacheManager;
    }

    @Override
    public Duration getPollingInterval() {
        AppParameter pollingIntervalParameter = super.appParameterCache.get(AppParameterKey.PR_POLLING_INTERVAL);
        if(pollingIntervalParameter == null || !cacheManager.checkAllPrCachesAreLoaded()) {
            super.failCount++;

            return datatypeFactory.newDuration(properties.getCache().getRefreshInterval() * 1000);//Return duration from properties in seconds
        }

        super.failCount = 0;

        return pollingIntervalParameter.getValueInterval();
    }
}
