package bg.registryagency.epzeu.pr.integration.pr.client;

import reactor.core.publisher.Mono;

public interface FeeCalculatorWebClient {

    Mono<Double> calculateFee(String actId, double materialInterest);
}
