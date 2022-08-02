package bg.registryagency.epzeu.pr.integration.reau.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.exception.IntegrationException;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.BaseReauWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import bg.registryagency.epzeu.pr.integration.reau.dto.UploadApplicationRequest;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;

@Component
@Slf4j
public class ApplicationWebClientImpl extends BaseReauWebClient implements ApplicationWebClient {
    private final TokenProvider tokenProvider;

    private final DefaultDataBufferFactory dataBufferFactory;

    public ApplicationWebClientImpl(WebClient reauWebClient, AppParameterCache appParameterCache, TokenProvider tokenProvider) {
        super(reauWebClient, appParameterCache);
        this.tokenProvider = tokenProvider;
        this.dataBufferFactory = new DefaultDataBufferFactory();
    }

    @Override
    public Mono<String> upload(Long processKey, Integer cin, List<UploadApplicationRequest> uploadApplicationRequests, String operationId, TokenGrantType tokenGrantType) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        for (UploadApplicationRequest uploadApplicationRequest : uploadApplicationRequests) {
            DataBuffer content = dataBufferFactory.allocateBuffer().write(uploadApplicationRequest.getContentBytes());
            builder.asyncPart(uploadApplicationRequest.getApplicatoinContentId().toString(), Flux.just(content), DataBuffer.class)
                .headers(h -> {
                    h.set("Content-Id", uploadApplicationRequest.getApplicatoinContentId().toString());
                    h.setContentDispositionFormData("files", "application-" + uploadApplicationRequest.getApplicatoinContentId() + ".xml");
                    h.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                });
        }

        builder.part("processKey", processKey);
        builder.part("cin", cin);

        return getReauWebClient().post()
            .uri("/applications")
            .header("Operation-Id", operationId)
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API, tokenGrantType).getToken())
            .bodyValue(builder.build())
            .retrieve().bodyToMono(String.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    /**
     * @param applicationIdentifier
     * @return
     */
    @Override
    public Mono<ClientResponse> getApplicationContent(String applicationIdentifier) {
        return getReauWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/applications/" + applicationIdentifier);
                uriBuilder.path("/content");
                uriBuilder.queryParam("LoadApplicationStatusResultInfo", true);
                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .accept(MediaType.APPLICATION_OCTET_STREAM)
            .exchange()
            .flatMap(clientResponse -> {
                if(clientResponse.statusCode() == HttpStatus.FORBIDDEN) {
                    return Mono.error(new AccessDeniedException("User do not have permissions to get application: " + applicationIdentifier));
                } else if(!clientResponse.statusCode().is2xxSuccessful()) {
                    return Mono.error(new IntegrationException("Cannot download application xml from REAU"));
                }

                return Mono.just(clientResponse);
            })
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<ApplicationREAUDto> getApplication(String reauIncomingNumber, Long specificStatusId) {
        return Mono.from(getReauWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/applications");
                if (StringUtils.hasText(reauIncomingNumber)) {
                    uriBuilder.queryParam("AppId", reauIncomingNumber);
                }
                if (specificStatusId != null) {
                    uriBuilder.queryParam("LoadSpecificStatusId", specificStatusId);
                }
                uriBuilder.queryParam("LoadApplicationStatusResultInfo", true);
                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ApplicationREAUDto.class))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()))
            .doOnError(throwable -> {
                if(throwable instanceof WebClientResponseException && ((WebClientResponseException) throwable).getStatusCode() == HttpStatus.FORBIDDEN) {
                    throw new AccessDeniedException("User do not have permissions to get application: " + reauIncomingNumber);
                }
            });
    }

    @Override
    public Flux<ApplicationStatusResultInfo> getStatusHistory(String reauIncomingNumber) {
        return getReauWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/applications/StatusHistory");
                uriBuilder.queryParam("applicationIdentifier", reauIncomingNumber);
                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ApplicationStatusResultInfo.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()))
            .doOnError(throwable -> {
                if(throwable instanceof WebClientResponseException && ((WebClientResponseException) throwable).getStatusCode() == HttpStatus.FORBIDDEN) {
                    throw new AccessDeniedException("User do not have permissions to get application: " + reauIncomingNumber);
                }
            });
    }
}
