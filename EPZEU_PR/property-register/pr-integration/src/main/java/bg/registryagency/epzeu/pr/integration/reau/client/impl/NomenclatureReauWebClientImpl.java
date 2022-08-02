package bg.registryagency.epzeu.pr.integration.reau.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.pr.dto.RegisterTypeDto;
import bg.registryagency.epzeu.pr.integration.reau.client.BaseReauWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.NomenclatureReauWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
@Slf4j
public class NomenclatureReauWebClientImpl extends BaseReauWebClient implements NomenclatureReauWebClient {

    public NomenclatureReauWebClientImpl(WebClient reauWebClient, AppParameterCache appParameterCache) {
        super(reauWebClient, appParameterCache);
    }

    @Override
    public Flux<ApplicationTypeReauNomDto> getApplicationTypes() {
        return getReauWebClient().get()
            .uri("/nomenclatures/applicationtypes")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ApplicationTypeReauNomDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ApplicationStatusNomDto> getApplicationStatuses() {
        return getReauWebClient().get()
            .uri("/nomenclatures/applicationstatuses")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ApplicationStatusNomDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<RegisterTypeDto> getRegisterTypes() {
        return getReauWebClient().get()
            .uri("/nomenclatures/registertypes")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(RegisterTypeDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
