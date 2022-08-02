package bg.registryagency.epzeu.pr.integration.pr.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.pr.client.BasePropertyRegisterProcessorWebClient;
import bg.registryagency.epzeu.pr.integration.pr.client.PropertyDealWebClient;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyDealResponseDto;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
public class PropertyDealWebClientImpl extends BasePropertyRegisterProcessorWebClient implements PropertyDealWebClient {

    public PropertyDealWebClientImpl(WebClient propertyRegisterProcessorNativeWebClient, AppParameterCache appParameterCache) {
        super(propertyRegisterProcessorNativeWebClient, appParameterCache);
    }

    @Override
    public Mono<PropertyDealResponseDto> getPropertyDeals(String cadastreNumber) {
        return getPropertyRegisterProcessorNativeWebClient().get()
            .uri(uriBuilder -> uriBuilder.path("/RegisterProcessor/GetPropertyDeals")
                .queryParam("cadastreNumber", cadastreNumber)
                .build())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToMono(PropertyDealResponseDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
