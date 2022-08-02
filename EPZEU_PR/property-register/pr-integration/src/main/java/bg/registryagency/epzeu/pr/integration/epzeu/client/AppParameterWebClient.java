package bg.registryagency.epzeu.pr.integration.epzeu.client;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.AppParameter;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Flux;

public interface AppParameterWebClient {
    Flux<ClientResponse> getAllParameters(String tag);
}
