package bg.registryagency.epzeu.pr.integration.reau.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationDocumentFileWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.BaseReauWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.UploadDocumentResponse;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.UUID;

@Component
@Slf4j
public class ApplicationDocumentFileWebClientImpl extends BaseReauWebClient implements ApplicationDocumentFileWebClient {
    private final TokenProvider tokenProvider;

    public ApplicationDocumentFileWebClientImpl(WebClient reauWebClient, AppParameterCache appParameterCache,TokenProvider tokenProvider) {
        super(reauWebClient, appParameterCache);
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Mono<UploadDocumentResponse> upload(Resource resource, String originalFilename) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", resource)
            .headers(h -> {
                h.setContentDispositionFormData("file", originalFilename);
                h.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            });

        return getReauWebClient().post()
            .uri("/documents")
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .bodyValue(builder.build())
            .retrieve().bodyToMono(UploadDocumentResponse.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<ClientResponse> download(String uuid) {
        return getReauWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/documents/" + uuid);

                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .accept(MediaType.APPLICATION_OCTET_STREAM)
            .exchange()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<Void> delete(UUID uuid) {
        return getReauWebClient().delete()
            .uri("/documents/{uuid}", uuid.toString())
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .retrieve()
            .bodyToMono(Void.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
