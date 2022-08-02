package bg.registryagency.epzeu.pr.domain.service.impl;

import bg.registryagency.epzeu.pr.domain.service.NomenclaturesService;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import bg.registryagency.epzeu.pr.integration.cache.*;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.LanguageDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

/**
 * Реализация на интерфейс NomenclaturesService за работа с номенклатури.
 */
@Service
@RequiredArgsConstructor
public class NomenclaturesServiceImpl implements NomenclaturesService {

    private final BookNomenclatureCache bookNomenclatureCache;
    private final ActNomenclatureCache actNomenclatureCache;
    private final RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache;
    private final PlaceNomenclatureCache placeNomenclatureCache;
    private final PropertyTypeNomenclatureCache propertyTypeNomenclatureCache;
    private final ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache;
    private final ApplicationStatusNomenclatureCache applicationStatusNomenclatureCache;
    private final LanguageNomenclatureCache languageNomenclatureCache;
    private final ApplicantCategoryNomenclatureCache applicantCategoryNomenclatureCache;
    private final ApplicantCategoryForUpcomingDealNomenclatureCache applicantCategoryForUpcomingDealNomenclatureCache;
    private final RegisterTypeNomenclatureCache registerTypeNomenclatureCache;
    private final DocumentTypePrNomenclatureCache documentTypeNomenclatureCache;
    private final PermanentUsageNomenclatureCache permanentUsageNomenclatureCache;

    @Override
    public List<RegistryOfficeDto> getRegistryOffices() {
        List results = new ArrayList<>(registryOfficeNomenclatureCache.asMap().values());
        java.util.Collections.sort(results,  Comparator.comparing(RegistryOfficeDto::getName));
        return results;
    }

    @Override
    public List<BookDto> getBooks() {
        return new ArrayList<>(bookNomenclatureCache.asMap().values());
    }

    @Override
    public Set<ActDto> getActsByBook(String bookId) {
        return actNomenclatureCache.get(bookId);
    }

    @Override
    public List<PlaceNomenclaturePrDto> getPlaces() {
        return new ArrayList<>(placeNomenclatureCache.asMap().values());
    }

    @Override
    public List<PropertyTypeNomDto> getPropertyTypes() {
        return new ArrayList<>(propertyTypeNomenclatureCache.asMap().values());
    }

    @Override
    public List<ApplicationTypeReauNomDto> getApplicationTypes() {
        //TODO ApplicationTypes are loaded from REAU implement expiration policy
        return new ArrayList<>(applicationTypeNomenclatureCache.asMap().values());
    }

    @Override
    public List<ApplicationStatusNomDto> getApplicationStatuses() {
        //TODO ApplicationStatus are loaded from REAU implement expiration policy
        return new ArrayList<>(applicationStatusNomenclatureCache.asMap().values());
    }

    @Override
    public List<LanguageDto> getLanguages() {
        return new ArrayList<>(languageNomenclatureCache.asMap().values());
    }

    @Override
    public List<ApplicantCategoryDto> getApplicantCategories() {
        return new ArrayList<>(applicantCategoryNomenclatureCache.asMap().values());
    }

    @Override
    public List<ApplicantCategoryDto> getApplicantCategoriesForUpcomingDeal() {
        return new ArrayList<>(applicantCategoryForUpcomingDealNomenclatureCache.asMap().values());
    }

    @Override
    public List<RegisterTypeDto> getRegisterTypes() {
        return new ArrayList<>(registerTypeNomenclatureCache.asMap().values());
    }

    @Override
    public List<DocumentTypePrDto> getDocumentTypes() {
        return new ArrayList<>(documentTypeNomenclatureCache.asMap().values());
    }

    @Override
    public List<PermanentUsageDto> getPermanentUsages() {
        return new ArrayList<>(permanentUsageNomenclatureCache.asMap().values());
    }
}
