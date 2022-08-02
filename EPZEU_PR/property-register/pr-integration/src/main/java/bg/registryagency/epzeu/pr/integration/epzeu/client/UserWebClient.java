package bg.registryagency.epzeu.pr.integration.epzeu.client;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.LoginSessionDto;
import reactor.core.publisher.Mono;

public interface UserWebClient {
    Mono<LoginSessionDto> getLoginSessionInformation();

    Mono<LoginSessionDto> getLoginSessionWithUserProfileInformation();

    Mono<LoginSessionDto> getLoginSessionInformationWithOrganization();
}
