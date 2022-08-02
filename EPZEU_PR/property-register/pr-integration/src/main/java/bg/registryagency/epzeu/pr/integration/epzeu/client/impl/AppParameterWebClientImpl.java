package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ConfigDefaults;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.AppParameterWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
@RequiredArgsConstructor
public class AppParameterWebClientImpl implements AppParameterWebClient {
    private final WebClient epzeuNativeWebClient;
    private final TokenProvider tokenProvider;

    @Override
    public Flux<ClientResponse> getAllParameters(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/AppParameters")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API).getToken())
            .header("if-none-match", tag)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(ConfigDefaults.Retry.duration))
                .retryMax(ConfigDefaults.Retry.retryCount));
    }
}
