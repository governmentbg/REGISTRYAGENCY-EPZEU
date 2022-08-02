package bg.registryagency.epzeu.pr.integration.reau.client;

import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import bg.registryagency.epzeu.pr.integration.reau.dto.UploadApplicationRequest;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ApplicationWebClient {
    Mono<String> upload(Long applicationKey, Integer cin, List<UploadApplicationRequest> uploadApplicationRequests, String operationUuid, TokenGrantType tokenGrantType);

    Mono<ClientResponse> getApplicationContent(String applicationIdentifier);

    Mono<ApplicationREAUDto> getApplication(String reauIncomingNumber, Long serviceProcessActionId);

    Flux<ApplicationStatusResultInfo> getStatusHistory(String reauIncomingNumber);
}
