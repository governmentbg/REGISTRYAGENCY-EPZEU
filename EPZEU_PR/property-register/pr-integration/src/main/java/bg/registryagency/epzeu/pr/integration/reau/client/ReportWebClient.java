package bg.registryagency.epzeu.pr.integration.reau.client;

import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResponse;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ReportWebClient {

    Mono<ApplicationStatusResponse> getApplicationStatus(String reauIncomingNumber, String prIncomingNumber, String registerDate, String registerId, String registryOfficeId);

    Flux<ApplicationREAUDto> getApplicationsAndCorrections();
}
