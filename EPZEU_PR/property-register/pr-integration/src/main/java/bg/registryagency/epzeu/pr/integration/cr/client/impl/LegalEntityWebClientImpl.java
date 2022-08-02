package bg.registryagency.epzeu.pr.integration.cr.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.cr.client.BaseCommercialRegisterWebClient;
import bg.registryagency.epzeu.pr.integration.cr.client.LegalEntityWebClient;
import bg.registryagency.epzeu.pr.integration.cr.dto.LegalEntityCR;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
public class LegalEntityWebClientImpl extends BaseCommercialRegisterWebClient implements LegalEntityWebClient {

    private final TokenProvider tokenProvider;

    public LegalEntityWebClientImpl(WebClient commercialRegisterWebClient, AppParameterCache appParameterCache, TokenProvider tokenProvider) {
        super(commercialRegisterWebClient, appParameterCache);
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Flux<Object> getLegalEntity(String legalEntityNumber) {
        return getCommercialRegisterWebClient().get().uri(uriBuilder -> uriBuilder.path("Deeds/Summaries")
            .queryParam("UICs", legalEntityNumber)
            .build())
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.INTEGRATION_EPZEU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(LegalEntityCR.class)
            .flatMap(legalEntityCR -> Flux.just(legalEntityCR.asLegalEntityIntegration()))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
