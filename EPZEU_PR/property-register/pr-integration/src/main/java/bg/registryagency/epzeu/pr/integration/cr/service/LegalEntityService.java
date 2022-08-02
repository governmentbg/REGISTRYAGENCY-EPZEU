package bg.registryagency.epzeu.pr.integration.cr.service;

import bg.registryagency.epzeu.pr.integration.api.LegalEntityIntegration;
import reactor.core.publisher.Mono;

public interface LegalEntityService {
    Mono<Object> getLegalEntity(String legalEntityNumber);
}
