package bg.registryagency.epzeu.pr.integration.payment.client;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;

public abstract class BasePaymentWebClient {

    protected final AppParameterCache appParameterCache;
    private WebClient paymentWebClient;

    @Value("${" + AppParameterKey.GL_PAYMENTS_API + "}")
    private String paymentApiBase;

    protected BasePaymentWebClient(WebClient paymentWebClient,
                                   AppParameterCache appParameterCache) {
        this.paymentWebClient = paymentWebClient;
        this.appParameterCache = appParameterCache;
    }

    protected WebClient getPaymentWebClient() {
        AppParameter apiBaseParameter = appParameterCache.get(AppParameterKey.GL_PAYMENTS_API);
        String apiBaseParameterValue = apiBaseParameter.getValueString();
        if(!apiBaseParameterValue.equals(paymentApiBase)) {
            paymentWebClient = paymentWebClient.mutate().baseUrl(apiBaseParameterValue).build();
            paymentApiBase = apiBaseParameterValue;
        }

        return paymentWebClient;
    }
}
