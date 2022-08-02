package bg.registryagency.epzeu.pr.integration.epzeu.client;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.EpzeuApplicationDto;
import bg.registryagency.epzeu.pr.integration.security.TokenGrantType;
import reactor.core.publisher.Mono;

import java.util.List;

public interface MyApplicationWebClient {
    Mono<Void> createMyApplication(EpzeuApplicationDto application, TokenGrantType tokenGrantType);

    Mono<Void> updateMyApplication(EpzeuApplicationDto application, TokenGrantType tokenGrantType);

    Mono<Void> updateMyApplications(List<EpzeuApplicationDto> applications, TokenGrantType tokenGrantType);
}
