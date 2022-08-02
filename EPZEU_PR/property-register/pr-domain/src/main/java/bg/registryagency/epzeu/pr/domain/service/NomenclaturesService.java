package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LanguageDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;

import java.util.List;
import java.util.Set;

/**
 * Интерфейс на услуга за работа с номенклатури.
 *
 * {@link RegistryOfficeDto , Book}
 */
public interface NomenclaturesService {
    /**
     * @return всички служби по вписвания от ИКАР.
     */
    List<RegistryOfficeDto> getRegistryOffices();

    /**
     * @return списък на всички книги от ИКАР
     */
    List<BookDto> getBooks();

    Set<ActDto> getActsByBook(String bookId);

    List<PlaceNomenclaturePrDto> getPlaces();

    List<PropertyTypeNomDto> getPropertyTypes();

    List<ApplicationTypeReauNomDto> getApplicationTypes();

    List<ApplicationStatusNomDto> getApplicationStatuses();

    List<LanguageDto> getLanguages();

    List<ApplicantCategoryDto> getApplicantCategories();

    List<ApplicantCategoryDto> getApplicantCategoriesForUpcomingDeal();

    List<RegisterTypeDto> getRegisterTypes();

    List<DocumentTypePrDto> getDocumentTypes();

    List<PermanentUsageDto> getPermanentUsages();
}
