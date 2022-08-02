package bg.registryagency.epzeu.pr.integration.epzeu.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.epzeu.client.CmsWebClient;
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
public class CmsWebClientImpl implements CmsWebClient {
    private final WebClient epzeuNativeWebClient;
    private final AppParameterCache appParameterCache;

    @Override
    public Flux<ClientResponse> getPages(String lang, String tag) {
        return epzeuNativeWebClient.get()
            .uri("/cms/pages/" + lang + "?register=" + ApplicationConstants.REGISTER_ID)
            .header("if-none-match", tag)
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .exchange().flux()
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
