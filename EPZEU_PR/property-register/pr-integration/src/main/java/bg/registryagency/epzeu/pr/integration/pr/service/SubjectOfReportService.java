package bg.registryagency.epzeu.pr.integration.pr.service;

import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import reactor.core.publisher.Flux;

public interface SubjectOfReportService{
    Flux<PropertyOfReportDto> getProperties(PropertySearchCriteriaDto propertySearchCriteria);

    Flux<AccountPropertyOfReportDto> getAccountProperties(AccountPropertySearchCriteriaDto searchCriteriaDto);

    Flux<PersonOfReportDto> getIndividualPersons(IndividualSearchCriteriaDto individualSearchCriteria);

    Flux<PersonOfReportDto> getLegalEntityPersons(LegalEntitySearchCriteriaDto legalEntitySearchCriteria);

    Flux<DocumentOfReportDto> getDocuments(DocumentSearchCriteria documentSearchCriteria);
}
