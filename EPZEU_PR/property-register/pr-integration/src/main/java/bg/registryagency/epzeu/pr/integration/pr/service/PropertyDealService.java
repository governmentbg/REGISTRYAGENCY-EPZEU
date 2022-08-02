package bg.registryagency.epzeu.pr.integration.pr.service;

import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import reactor.core.publisher.Mono;

public interface PropertyDealService {

    Mono<PropertyDealResponseDto> getPropertyDeals(String cadastreNumber);
}
