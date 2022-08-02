package bg.registryagency.epzeu.pr.integration.payment.client;


import bg.registryagency.epzeu.pr.integration.payment.dto.ObligationDto;
import reactor.core.publisher.Flux;

import javax.validation.constraints.NotNull;

public interface PaymentWebClient {
    Flux<ObligationDto> searchObligations(@NotNull String[] incomingNumbers);
}
