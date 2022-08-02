package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.SigningServiceWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.SigningRequestDto;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.UUID;

@Component
@Slf4j
public class SigningServiceWebClientImpl implements SigningServiceWebClient {
    private final TokenProvider tokenProvider;
    private final WebClient epzeuNativeWebClient;
    private final DefaultDataBufferFactory dataBufferFactory;
    private final AppParameterCache appParameterCache;

    public SigningServiceWebClientImpl(WebClient epzeuNativeWebClient, TokenProvider tokenProvider, AppParameterCache appParameterCache) {
        this.tokenProvider = tokenProvider;
        this.epzeuNativeWebClient = epzeuNativeWebClient;
        this.dataBufferFactory = new DefaultDataBufferFactory();
        this.appParameterCache = appParameterCache;
    }

    @Override
    public Mono<UUID> sendDocumentToSign(SigningRequestDto signingRequest, byte[] contentBytes) {
        DataBuffer content =  dataBufferFactory.allocateBuffer().write(contentBytes);
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("DocumentToSign", content)
            .headers(h -> {
                h.setContentDispositionFormData("DocumentToSign", signingRequest.getFileName());
                h.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            });
        builder.part("SigningRequest", signingRequest);

        return epzeuNativeWebClient.post()
            .uri("/SigningProcessesPrivate")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.EPZEU_API).getToken())
            .bodyValue(builder.build())
            .retrieve().bodyToMono(UUID.class)
            .doOnError(error -> {
                log.error(error.getMessage(), error);
            })
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
