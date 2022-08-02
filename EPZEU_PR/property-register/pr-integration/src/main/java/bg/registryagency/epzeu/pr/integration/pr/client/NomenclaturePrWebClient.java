package bg.registryagency.epzeu.pr.integration.pr.client;

import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import reactor.core.publisher.Flux;

public interface NomenclaturePrWebClient {
    Flux<BookDto> getBooks();

    Flux<ActDto> getActs(String bookId);

    Flux<RegistryOfficeDto> getRegistryOffices();

    Flux<DocumentTypePrDto> getDocumentTypes();

    Flux<PlaceNomenclaturePrDto> getPlaces();

    Flux<PropertyTypeNomDto> getPropertyTypes();

    Flux<ApplicantCategoryDto> getApplicantCategories();

    Flux<RegisterTypeDto> getRegisterTypes();

    Flux<PermanentUsageDto> getPermanentUsages();

    Flux<ApplicantCategoryDto> getApplicantCategoriesForUpcomingDeal();
}
