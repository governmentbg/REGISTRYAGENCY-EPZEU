package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.NomenclatureEpzeuWebClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NomenclatureEpzeuWebClientImpl implements NomenclatureEpzeuWebClient {
    private final WebClient epzeuNativeWebClient;
    private final AppParameterCache appParameterCache;

    @Override
    public Flux<ClientResponse> getLanguages(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/languages")
            .header("if-none-match", tag)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<ClientResponse> getLabelsForLanguage(String lang, String prefixesOfLabelsForLoading, String tag) {
        return epzeuNativeWebClient.get()
            .uri(uriBuilder -> {
                uriBuilder.path("/nomenclatures/labels/" + lang);

                uriBuilder.queryParam("prefixes", prefixesOfLabelsForLoading);

                return uriBuilder.build();
            })
            .header("if-none-match", tag)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Mono<ClientResponse> getLabelsForLanguage(String lang, List<String> prefixesOfLabelsForLoading, String tag) {
        return getLabelsForLanguage(lang, String.join(",", prefixesOfLabelsForLoading), tag);
    }

    @Override
    public Flux<ClientResponse> getCountries(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/countries")
            .accept(MediaType.APPLICATION_JSON)
            .header("if-none-match", tag)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getEkatteSettlements(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/ekatte/Settlement")
            .accept(MediaType.APPLICATION_JSON)
            .header("if-none-match", tag)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getEkatteAreas(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/ekatte/Area")
            .accept(MediaType.APPLICATION_JSON)
            .header("if-none-match", tag)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getEkatteMunicipalities(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/ekatte/Municipality")
            .accept(MediaType.APPLICATION_JSON)
            .header("if-none-match", tag)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getEkatteDistricts(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/ekatte/District")
            .accept(MediaType.APPLICATION_JSON)
            .header("if-none-match", tag)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getDocumentTypes(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/docTypes?register=" + ApplicationConstants.REGISTER_ID)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .header("if-none-match", tag)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getAuthorities(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/Authorities?register=" + ApplicationConstants.REGISTER_ID)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .header("if-none-match", tag)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getSpecialAccessTypes(String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/specialAccessUserTypes")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .header("if-none-match", tag)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getApplicationTypes(String lang, String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/applicationTypes/" + lang + "?registerID=" + ApplicationConstants.REGISTER_ID)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .header("if-none-match", tag)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ClientResponse> getServices(String lang, String tag) {
        return epzeuNativeWebClient.get()
            .uri("/nomenclatures/services/" + lang + "?registerID=" + ApplicationConstants.REGISTER_ID)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .header("if-none-match", tag)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
