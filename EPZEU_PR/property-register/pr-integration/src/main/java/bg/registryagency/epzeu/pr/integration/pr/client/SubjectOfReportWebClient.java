package bg.registryagency.epzeu.pr.integration.pr.client;


import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import reactor.core.publisher.Flux;

public interface SubjectOfReportWebClient {

    Flux<DocumentOfReportDto> getDocuments(DocumentSearchCriteria documentSearchCriteria);

    Flux<PersonOfReportDto> getIndividualPersons(IndividualSearchCriteriaDto individualSearchCriteria);

    Flux<PersonOfReportDto> getLegalEntityPersons(LegalEntitySearchCriteriaDto legalEntitySearchCriteria);

    Flux<PropertyOfReportDto> getProperties(PropertySearchCriteriaDto searchPropertiesForReport);

    Flux<AccountPropertyOfReportDto> getAccountProperties(AccountPropertySearchCriteriaDto searchCriteriaDto);
}
