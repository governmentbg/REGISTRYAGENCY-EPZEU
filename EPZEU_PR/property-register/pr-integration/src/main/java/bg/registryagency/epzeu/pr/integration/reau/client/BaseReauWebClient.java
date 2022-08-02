package bg.registryagency.epzeu.pr.integration.reau.client;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

public abstract class BaseReauWebClient {

    protected final AppParameterCache appParameterCache;
    private WebClient reauWebClient;

    @Value("${" + AppParameterKey.PR_REAU_API + "}")
    private String reauApiBase;

    protected BaseReauWebClient(WebClient reauWebClient, AppParameterCache appParameterCache) {
        this.reauWebClient = reauWebClient;
        this.appParameterCache = appParameterCache;
    }

    protected WebClient getReauWebClient() {
        AppParameter apiBaseParameter = appParameterCache.get(AppParameterKey.PR_REAU_API);
        if(apiBaseParameter != null) {
            String apiBaseParameterValue = apiBaseParameter.getValueString();

            if (!apiBaseParameterValue.equals(reauApiBase)) {
                reauWebClient = reauWebClient.mutate().baseUrl(apiBaseParameterValue).build();
                reauApiBase = apiBaseParameterValue;
            }
        }

        return reauWebClient;
    }
}
