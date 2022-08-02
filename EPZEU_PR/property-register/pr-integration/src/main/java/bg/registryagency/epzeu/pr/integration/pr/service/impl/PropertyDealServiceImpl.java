package bg.registryagency.epzeu.pr.integration.pr.service.impl;

import bg.registryagency.epzeu.pr.integration.pr.client.PropertyDealWebClient;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyDealResponseDto;
import bg.registryagency.epzeu.pr.integration.pr.service.PropertyDealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PropertyDealServiceImpl implements PropertyDealService {

    private final PropertyDealWebClient propertyDealWebClient;

    @Override
    public Mono<PropertyDealResponseDto> getPropertyDeals(String cadastreNumber) {
        return propertyDealWebClient.getPropertyDeals(cadastreNumber);
    }
}
