package bg.registryagency.epzeu.pr.integration.bulstat.client;

import reactor.core.publisher.Mono;

public interface LegalEntityBulstatWebClient {
    Mono<Object> getLegalEntity(String legalEntityNumber);
}
