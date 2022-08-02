package bg.registryagency.epzeu.pr.integration.scheduler;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationIntegrationProperties;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

public class EpzeuCacheRefreshTrigger extends BaseCacheRefreshTrigger {

    public EpzeuCacheRefreshTrigger(AppParameterCache appParameterCache,
                                    ApplicationIntegrationProperties properties) {
        super(properties, appParameterCache);
    }

    @Override
    public Duration getPollingInterval() {
        AppParameter pollingIntervalParameter = super.appParameterCache.get(AppParameterKey.GL_POLLING_INTERVAL);
        if(pollingIntervalParameter == null) {
            super.failCount++;
            return datatypeFactory.newDuration(1000);
        }

        super.failCount = 0;

        return pollingIntervalParameter.getValueInterval();
    }
}
