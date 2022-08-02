package bg.registryagency.epzeu.pr.integration.reau.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.reau.client.BaseReauWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.ReportWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusEnum;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResponse;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.security.TokenProvider;
import bg.registryagency.epzeu.pr.integration.security.TokenScope;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
@Slf4j
public class ReportWebClientImpl extends BaseReauWebClient implements ReportWebClient {
    private final TokenProvider tokenProvider;

    protected ReportWebClientImpl(WebClient reauWebClient, AppParameterCache appParameterCache, TokenProvider tokenProvider) {
        super(reauWebClient, appParameterCache);
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Mono<ApplicationStatusResponse> getApplicationStatus(String reauIncomingNumber, String prIncomingNumber, String registerDate, String registerId, String registryOfficeId) {
        return getReauWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/applications/statuscheck");

                if (StringUtils.hasText(reauIncomingNumber)) {
                    uriBuilder.queryParam("AppId", reauIncomingNumber);
                } else {
                    uriBuilder.queryParam("RegisterNumber", prIncomingNumber);
                    uriBuilder.queryParam("RegisterDate", registerDate);
                    uriBuilder.queryParam("RegisterId", registerId);
                    uriBuilder.queryParam("SiteId", registryOfficeId);
                }

                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToMono(ApplicationStatusResponse.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ApplicationREAUDto> getApplicationsAndCorrections() {
        return getReauWebClient().get()
            .uri(uriBuilder -> {
                uriBuilder.path("/applications/applicationsAndCorrections");
                uriBuilder.queryParam("AppStatus", ApplicationStatusEnum.WITHOUT_MOVEMENT.getId());
                uriBuilder.queryParam("LoadApplicationStatusResultInfo", true);
                return uriBuilder.build();
            })
            .header("Authorization", "Bearer " + tokenProvider.provideToken(TokenScope.REAU_API).getToken())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve()
            .bodyToFlux(ApplicationREAUDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
