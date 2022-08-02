package bg.registryagency.epzeu.pr.integration.cr.client;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

public abstract class BaseCommercialRegisterWebClient {

    protected final AppParameterCache appParameterCache;
    private WebClient commercialRegisterWebClient;

    @Value("${" + AppParameterKey.CR_REGISTER_API + "}")
    private String commercialRegisterApiBase;

    protected BaseCommercialRegisterWebClient(WebClient commercialRegisterWebClient, AppParameterCache appParameterCache) {
        this.commercialRegisterWebClient = commercialRegisterWebClient;
        this.appParameterCache = appParameterCache;
    }

    protected WebClient getCommercialRegisterWebClient() {
        AppParameter apiBaseParameter = appParameterCache.get(AppParameterKey.CR_REGISTER_API);

        if(apiBaseParameter != null) {
            String apiBaseParameterValue = apiBaseParameter.getValueString();

            if (!apiBaseParameterValue.equals(commercialRegisterApiBase)) {
                commercialRegisterWebClient = commercialRegisterWebClient.mutate().baseUrl(apiBaseParameterValue).build();
                commercialRegisterApiBase = apiBaseParameterValue;
            }
        }

        return commercialRegisterWebClient;
    }
}
