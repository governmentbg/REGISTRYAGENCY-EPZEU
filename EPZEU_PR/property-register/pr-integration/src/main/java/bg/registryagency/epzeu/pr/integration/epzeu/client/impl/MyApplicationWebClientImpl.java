package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.MyApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.EpzeuApplicationDto;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class MyApplicationWebClientImpl implements MyApplicationWebClient {
    private final WebClient epzeuNativeWebClient;
    private final TokenProvider tokenProvider;
    private final AppParameterCache appParameterCache;

    @Override
    public Mono<Void> createMyApplication(EpzeuApplicationDto application, TokenGrantType tokenGrantType) {
        return epzeuNativeWebClient.post()
            .uri("/Applications")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API, tokenGrantType).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(application)
            .retrieve().bodyToMono(Void.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<Void> updateMyApplication(EpzeuApplicationDto application, TokenGrantType tokenGrantType) {
        var applications = new ArrayList<EpzeuApplicationDto>();
        applications.add(application);

        return updateMyApplications(applications, tokenGrantType);
    }

    @Override
    public Mono<Void> updateMyApplications(List<EpzeuApplicationDto> applications, TokenGrantType tokenGrantType) {
        return epzeuNativeWebClient.put()
            .uri(uriBuilder -> {
                uriBuilder.path("/Applications");

                uriBuilder.queryParam("register", ApplicationConstants.REGISTER_ID);

                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API, tokenGrantType).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(applications)
            .retrieve().bodyToMono(Void.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
