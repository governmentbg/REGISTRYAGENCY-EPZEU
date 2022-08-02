package bg.registryagency.epzeu.pr.integration.reau.client;

import bg.registryagency.epzeu.pr.integration.pr.dto.RegisterTypeDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import reactor.core.publisher.Flux;

public interface NomenclatureReauWebClient {

    Flux<ApplicationTypeReauNomDto> getApplicationTypes();

    Flux<ApplicationStatusNomDto> getApplicationStatuses();

    Flux<RegisterTypeDto> getRegisterTypes();
}
