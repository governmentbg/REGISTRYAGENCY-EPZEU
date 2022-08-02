package bg.registryagency.epzeu.pr.integration.pr.client;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

public abstract class BasePropertyRegisterPublicWebClient {

    protected final AppParameterCache appParameterCache;
    private WebClient propertyRegisterPublicNativeWebClient;

    @Value("${" + AppParameterKey.PR_WEB_API + "}")
    private String prRegisterApiBase;

    protected BasePropertyRegisterPublicWebClient(WebClient propertyRegisterPublicNativeWebClient,
                                                  AppParameterCache appParameterCache) {
        this.propertyRegisterPublicNativeWebClient = propertyRegisterPublicNativeWebClient;
        this.appParameterCache = appParameterCache;
    }

    protected WebClient getPropertyRegisterPublicNativeWebClient() {
        AppParameter apiBaseParameter = appParameterCache.get(AppParameterKey.PR_WEB_API);

        if(apiBaseParameter != null) {
            String apiBaseParameterValue = apiBaseParameter.getValueString();
            if (!apiBaseParameterValue.equals(prRegisterApiBase)) {
                propertyRegisterPublicNativeWebClient = propertyRegisterPublicNativeWebClient.mutate().baseUrl(apiBaseParameterValue).build();
                prRegisterApiBase = apiBaseParameterValue;
            }
        }

        return propertyRegisterPublicNativeWebClient;
    }
}
