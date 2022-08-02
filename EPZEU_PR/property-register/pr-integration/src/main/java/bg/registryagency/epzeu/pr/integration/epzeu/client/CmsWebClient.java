package bg.registryagency.epzeu.pr.integration.epzeu.client;

import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface CmsWebClient {


    Flux<ClientResponse> getPages(String lang, String tag);
}
