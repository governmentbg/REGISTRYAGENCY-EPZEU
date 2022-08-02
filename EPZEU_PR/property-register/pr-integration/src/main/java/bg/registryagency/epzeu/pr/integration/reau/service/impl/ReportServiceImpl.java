package bg.registryagency.epzeu.pr.integration.reau.service.impl;

import bg.registryagency.epzeu.pr.integration.pr.client.FeeCalculatorWebClient;
import bg.registryagency.epzeu.pr.integration.reau.client.ReportWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResponse;
import bg.registryagency.epzeu.pr.integration.reau.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final ReportWebClient reportWebClient;
    private final FeeCalculatorWebClient feeCalculatorWebClient;

    @Override
    public Mono<ApplicationStatusResponse> getApplicationStatus(String reauIncomingNumber, String prIncomingNumber, String registerDate, String registerId, String registryOfficeId) {
        return reportWebClient.getApplicationStatus(reauIncomingNumber, prIncomingNumber, registerDate, registerId, registryOfficeId);
    }

    @Override
    public Mono<Double> calculateFee(String actId, double materialInterest) {
        return feeCalculatorWebClient.calculateFee(actId, materialInterest);
    }

    @Override
    public Flux<ApplicationREAUDto> getApplicationsAndCorrections() {
        return reportWebClient.getApplicationsAndCorrections();
    }
}
