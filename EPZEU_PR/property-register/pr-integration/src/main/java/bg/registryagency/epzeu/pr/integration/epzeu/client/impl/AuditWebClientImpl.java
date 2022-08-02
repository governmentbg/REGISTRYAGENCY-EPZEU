package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.AuditWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LogAction;
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

@Component
@RequiredArgsConstructor
public class AuditWebClientImpl implements AuditWebClient {
    private final WebClient epzeuNativeWebClient;
    private final TokenProvider tokenProvider;
    private final AppParameterCache appParameterCache;

    @Override
    public Mono<LogAction> createLogAction(LogAction logActionRequest, TokenGrantType tokenGrantType) {
        return epzeuNativeWebClient.post()
            .uri("/LogActions")
            .header("Authorization", "Bearer " +
                (tokenGrantType == TokenGrantType.CLIENT_CREDENTIALS ?
                    tokenProvider.provideClientAuthenticationToken(TokenScope.EPZEU_API).getToken() :
                    tokenProvider.provideToken(TokenScope.EPZEU_API).getToken()))
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .bodyValue(logActionRequest)
            .retrieve().bodyToMono(LogAction.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
