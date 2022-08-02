package bg.registryagency.epzeu.pr.integration.pr.client;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

public abstract class BasePropertyRegisterProcessorWebClient {

    protected final AppParameterCache appParameterCache;
    private WebClient propertyRegisterProcessorNativeWebClient;

    @Value("${" + AppParameterKey.PR_WEB_API + "}")
    private String prRegisterApiBase;

    protected BasePropertyRegisterProcessorWebClient(WebClient propertyRegisterProcessorNativeWebClient,
                                                     AppParameterCache appParameterCache) {
        this.propertyRegisterProcessorNativeWebClient = propertyRegisterProcessorNativeWebClient;
        this.appParameterCache = appParameterCache;
    }

    protected WebClient getPropertyRegisterProcessorNativeWebClient() {
        AppParameter apiBaseParameter = appParameterCache.get(AppParameterKey.PR_WEB_API);

        if(apiBaseParameter != null) {
            String apiBaseParameterValue = apiBaseParameter.getValueString();
            if (!apiBaseParameterValue.equals(prRegisterApiBase)) {
                propertyRegisterProcessorNativeWebClient = propertyRegisterProcessorNativeWebClient.mutate().baseUrl(apiBaseParameterValue).build();
                prRegisterApiBase = apiBaseParameterValue;
            }
        }

        return propertyRegisterProcessorNativeWebClient;
    }
}
