package bg.registryagency.epzeu.pr.integration.pr.client;

import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyDealResponseDto;
import reactor.core.publisher.Mono;

public interface PropertyDealWebClient {

    Mono<PropertyDealResponseDto> getPropertyDeals(String cadastreNumber);
}
