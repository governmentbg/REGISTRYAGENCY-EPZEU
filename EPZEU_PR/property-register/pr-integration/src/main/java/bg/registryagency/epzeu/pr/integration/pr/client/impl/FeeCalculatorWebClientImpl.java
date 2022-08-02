package bg.registryagency.epzeu.pr.integration.pr.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.pr.client.BasePropertyRegisterPublicWebClient;
import bg.registryagency.epzeu.pr.integration.pr.client.FeeCalculatorWebClient;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
public class FeeCalculatorWebClientImpl extends BasePropertyRegisterPublicWebClient implements FeeCalculatorWebClient {

    public FeeCalculatorWebClientImpl(WebClient propertyRegisterPublicNativeWebClient, AppParameterCache appParameterCache) {
        super(propertyRegisterPublicNativeWebClient, appParameterCache);
    }

    @Override
    public Mono<Double> calculateFee(String actId, double materialInterest) {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri(uriBuilder -> uriBuilder.path("/ActFee/CalculateFee")
                .queryParam("actTypeId", actId)
                .queryParam("materialInterest", materialInterest)
                .build())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToMono(Double.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
