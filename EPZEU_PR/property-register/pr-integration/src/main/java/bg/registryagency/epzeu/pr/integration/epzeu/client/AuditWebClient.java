package bg.registryagency.epzeu.pr.integration.epzeu.client;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.LogAction;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import reactor.core.publisher.Mono;

public interface AuditWebClient {
    Mono<LogAction> createLogAction(LogAction logActionRequest, TokenGrantType tokenGrantType);
}
