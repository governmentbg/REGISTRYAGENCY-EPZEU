package bg.registryagency.epzeu.pr.integration.payment.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.payment.client.BasePaymentWebClient;
import bg.registryagency.epzeu.pr.integration.payment.client.PaymentWebClient;
import bg.registryagency.epzeu.pr.integration.payment.dto.ObligationDto;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
@Slf4j
public class PaymentWebClientImpl extends BasePaymentWebClient implements PaymentWebClient {
    private final TokenProvider tokenProvider;

    protected PaymentWebClientImpl(WebClient paymentWebClient, AppParameterCache appParameterCache,
                                   TokenProvider tokenProvider) {
        super(paymentWebClient, appParameterCache);
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Flux<ObligationDto> searchObligations(String[] incomingNumbers) {
        return getPaymentWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/Obligations");
                uriBuilder.queryParam("register", ApplicationConstants.REGISTER_ID);
                uriBuilder.queryParam("applicationNumbers", incomingNumbers);

                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.PAYMENT_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ObligationDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
