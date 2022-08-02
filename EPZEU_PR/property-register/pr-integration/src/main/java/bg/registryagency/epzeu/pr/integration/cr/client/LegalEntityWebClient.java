package bg.registryagency.epzeu.pr.integration.cr.client;

import reactor.core.publisher.Flux;

public interface LegalEntityWebClient {

    Flux<Object> getLegalEntity(String legalEntityNumber);
}
