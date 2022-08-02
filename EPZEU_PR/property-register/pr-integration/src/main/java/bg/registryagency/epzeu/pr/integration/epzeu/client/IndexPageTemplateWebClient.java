package bg.registryagency.epzeu.pr.integration.epzeu.client;

import reactor.core.publisher.Mono;

public interface IndexPageTemplateWebClient {

    Mono<String> getIndex(String language);
}
