package bg.registryagency.epzeu.pr.integration.epzeu.client;

import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface NomenclatureEpzeuWebClient {

    Flux<ClientResponse> getLanguages(String tag);

    Mono<ClientResponse> getLabelsForLanguage(String lang, String prefixesOfLabelsForLoading, String tag);

    Mono<ClientResponse> getLabelsForLanguage(String lang, List<String> prefixesOfLabelsForLoading, String tag);

    Flux<ClientResponse> getCountries(String tag);

    Flux<ClientResponse> getEkatteSettlements(String tag);

    Flux<ClientResponse> getEkatteAreas(String tag);

    Flux<ClientResponse> getEkatteMunicipalities(String tag);

    Flux<ClientResponse> getEkatteDistricts(String tag);

    Flux<ClientResponse> getDocumentTypes(String tag);

    Flux<ClientResponse> getAuthorities(String tag);

    Flux<ClientResponse> getSpecialAccessTypes(String tag);

    Flux<ClientResponse> getApplicationTypes(String lang, String tag);

    Flux<ClientResponse> getServices(String lang, String tag);
}
