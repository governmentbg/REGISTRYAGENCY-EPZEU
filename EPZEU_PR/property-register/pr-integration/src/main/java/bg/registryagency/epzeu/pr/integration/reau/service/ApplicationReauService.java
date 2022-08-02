package bg.registryagency.epzeu.pr.integration.reau.service;

import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ApplicationReauService {
    Mono<ApplicationREAUDto> getApplication(String reauIncomingNumber, Long serviceProcessActionId);

    Flux<ApplicationStatusResultInfo> getStatusHistory(String incomingNumber);
}
