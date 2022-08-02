package bg.registryagency.epzeu.pr.integration.reau.service.impl;

import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import bg.registryagency.epzeu.pr.integration.reau.service.ApplicationReauService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ApplicationReauServiceImpl implements ApplicationReauService {
    private final ApplicationWebClient applicationWebClient;

    @Override
    public Mono<ApplicationREAUDto> getApplication(String reauIncomingNumber, Long specificStatusId) {
        return applicationWebClient.getApplication(reauIncomingNumber, specificStatusId);
    }

    @Override
    public Flux<ApplicationStatusResultInfo> getStatusHistory(String incomingNumber) {
        return applicationWebClient.getStatusHistory(incomingNumber);
    }
}
