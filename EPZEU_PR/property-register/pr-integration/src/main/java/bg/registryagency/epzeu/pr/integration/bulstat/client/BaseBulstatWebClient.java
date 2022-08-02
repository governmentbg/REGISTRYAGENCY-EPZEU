package bg.registryagency.epzeu.pr.integration.bulstat.client;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.util.UrlUtil;

public abstract class BaseBulstatWebClient {

    protected final AppParameterCache appParameterCache;
    protected final SoapNativeWebClient nativeWebClient;

    private String bulstatApiBase;

    public BaseBulstatWebClient(AppParameterCache appParameterCache, SoapNativeWebClient nativeWebClient) {
        this.appParameterCache = appParameterCache;
        this.nativeWebClient = nativeWebClient;
    }

    protected String getBulstatApiBaseUrl() {
        AppParameter apiBaseParameter = appParameterCache.get(AppParameterKey.GL_BULSTAT_API);
        if(apiBaseParameter != null) {
            bulstatApiBase = UrlUtil.ensureTrailingSlashExists(apiBaseParameter.getValueString());
        }

        return bulstatApiBase;
    }

}
