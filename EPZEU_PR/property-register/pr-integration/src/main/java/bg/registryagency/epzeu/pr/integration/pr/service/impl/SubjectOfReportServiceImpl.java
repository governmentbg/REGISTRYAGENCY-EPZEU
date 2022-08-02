package bg.registryagency.epzeu.pr.integration.pr.service.impl;

import bg.registryagency.epzeu.pr.integration.pr.client.SubjectOfReportWebClient;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import bg.registryagency.epzeu.pr.integration.pr.service.SubjectOfReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class SubjectOfReportServiceImpl implements SubjectOfReportService {

    private final SubjectOfReportWebClient subjectOfReportWebClient;

    @Override
    public Flux<PropertyOfReportDto> getProperties(PropertySearchCriteriaDto propertySearchCriteria) {
        return subjectOfReportWebClient.getProperties(propertySearchCriteria);
    }

    @Override
    public Flux<AccountPropertyOfReportDto> getAccountProperties(AccountPropertySearchCriteriaDto searchCriteriaDto) {
        return subjectOfReportWebClient.getAccountProperties(searchCriteriaDto);
    }

    @Override
    public Flux<PersonOfReportDto> getIndividualPersons(IndividualSearchCriteriaDto individualSearchCriteria) {
        return subjectOfReportWebClient.getIndividualPersons(individualSearchCriteria);
    }

    @Override
    public Flux<PersonOfReportDto> getLegalEntityPersons(LegalEntitySearchCriteriaDto legalEntitySearchCriteria) {
        return subjectOfReportWebClient.getLegalEntityPersons(legalEntitySearchCriteria);
    }

    @Override
    public Flux<DocumentOfReportDto> getDocuments(DocumentSearchCriteria documentSearchCriteria) {
        return subjectOfReportWebClient.getDocuments(documentSearchCriteria);
    }
}
