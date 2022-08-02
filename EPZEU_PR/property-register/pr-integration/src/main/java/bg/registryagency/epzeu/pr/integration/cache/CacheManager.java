package bg.registryagency.epzeu.pr.integration.cache;

import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.epzeu.client.AppParameterWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.client.CmsWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.client.NomenclatureEpzeuWebClient;
import bg.registryagency.epzeu.pr.integration.epzeu.dto.*;
import bg.registryagency.epzeu.pr.integration.pr.client.NomenclaturePrWebClient;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import bg.registryagency.epzeu.pr.integration.reau.client.NomenclatureReauWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationTypeReauNomDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ServicePriceDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ServiceTypeNom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class CacheManager {
    private final static String ETAG_HEADER_KEY = "Etag";
    private final static String REGISTRATION_AGENCY_ID = "10000800000000015192";
    //TODO think about move constant below in properties file
    private final String LABELS_PREFIXES_FOR_LOAD = "GL,EP_GL,EP_SIGN,PR,EP_USR_EXTRENAL_USER_KIND_L,EP_DATE_APPLICATION_RECEPTION_L,EP_USR_AUTHENTICATION_KIND_L,EP_APPL_SUBMISS_PERIOD_L";

    //Property Register's caches
    private final BookNomenclatureCache bookNomenclatureCache;
    private final RegistryOfficeNomenclatureCache registryOfficeNomenclatureCache;
    private final DocumentTypePrNomenclatureCache documentTypeNomenclatureCache;
    private final DocumentTypeEpzeuNomenclatureCache documentTypeEpzeuNomenclatureCache;
    private final PlaceNomenclatureCache placeNomenclatureCache;
    private final PropertyTypeNomenclatureCache propertyTypeNomenclatureCache;
    private final ApplicationTypeReauNomenclatureCache applicationTypeNomenclatureCache;
    private final ApplicantCategoryNomenclatureCache applicantCategoryNomenclatureCache;
    private final ApplicantCategoryForUpcomingDealNomenclatureCache applicantCategoryForUpcomingDealNomenclatureCache;
    private final ActNomenclatureCache actNomenclatureCache;
    private final PermanentUsageNomenclatureCache permanentUsageNomenclatureCache;
    private final RegisterTypeNomenclatureCache registerTypeNomenclatureCache;
    private final ApplicationStatusNomenclatureCache applicationStatusNomenclatureCache;

    //EPZEU caches
    private final AppParameterCache appParameterCache;
    private final ApplicationTypeEpzeuNomenclatureCache applicationTypeEpzeuNomenclatureCache;
    private final LanguageNomenclatureCache languageNomenclatureCache;
    private final LabelNomenclatureCache labelNomenclatureCache;
    private final CountriesCache countriesCache;
    private final SpecialAccessTypeNomenclatureCache specialAccessTypeNomenclatureCache;
    private final CmsPageCache cmsPageCache;
    private final ServiceNomenclatureCache serviceNomenclatureCache;
    private final EkatteSettlementNomenclatureCache ekatteSettlementNomenclatureCache;
    private final EkatteAreaNomenclatureCache ekatteAreaNomenclatureCache;
    private final EkatteMunicipalityNomenclatureCache ekatteMunicipalityNomenclatureCache;
    private final EkatteDistrictNomenclatureCache ekatteDistrictNomenclatureCache;
    private final AuthorityNomenclatureCache authorityNomenclatureCache;

    //Web Clients
    private final NomenclaturePrWebClient nomenclaturePrWebClient;
    private final AppParameterWebClient appParameterWebClient;
    private final NomenclatureReauWebClient nomenclatureReauWebClient;
    private final NomenclatureEpzeuWebClient nomenclatureEpzeuWebClient;
    private final CmsWebClient cmsWebClient;

    public long getSumHashOfAllNomenclatureCaches() {
        long hashSum = bookNomenclatureCache.getCacheHash() +
            registryOfficeNomenclatureCache.getCacheHash() +
            documentTypeNomenclatureCache.getCacheHash() +
            placeNomenclatureCache.getCacheHash() +
            propertyTypeNomenclatureCache.getCacheHash() +
            applicationTypeNomenclatureCache.getCacheHash() +
            applicantCategoryNomenclatureCache.getCacheHash() +
            applicantCategoryForUpcomingDealNomenclatureCache.getCacheHash() +
            actNomenclatureCache.getCacheHash() +
            registerTypeNomenclatureCache.getCacheHash() +
            permanentUsageNomenclatureCache.getCacheHash() +
            countriesCache.getCacheHash() +
            ekatteSettlementNomenclatureCache.getCacheHash() +
            ekatteAreaNomenclatureCache.getCacheHash() +
            ekatteMunicipalityNomenclatureCache.getCacheHash() +
            ekatteDistrictNomenclatureCache.getCacheHash() +
            documentTypeEpzeuNomenclatureCache.getCacheHash() +
            authorityNomenclatureCache.getCacheHash();

        return hashSum;
    }

    private Flux<BookDto> refreshBooksAndActsForBooks() {
        return nomenclaturePrWebClient.getBooks().doOnNext(book -> {
            if(log.isTraceEnabled()) {
                log.trace("New Book item received: " + book.getId() + ", " + book.getName());
            }

            bookNomenclatureCache.put(book.getId(), book);

            nomenclaturePrWebClient.getActs(book.getId()).doOnNext(act -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Act item received: " + act.getId() + ", " + act.getName());
                }
                Set<ActDto> actDtos = actNomenclatureCache.get(book.getId());
                if(actDtos == null) {
                    actDtos = new HashSet<>();
                    actNomenclatureCache.put(book.getId(), actDtos);
                }
                actDtos.add(act);
            }).doOnError(error -> {
                log.error("Error during refreshing of acts for books nomenclatures: " + error.getMessage());
            }).doOnComplete(() -> {
                if(log.isDebugEnabled()) {
                    log.debug("Acts nomenclatures received successfully for book: " + book.getId());
                }
                actNomenclatureCache.calculateCacheHash();
            }).subscribe();
        }).doOnError(error -> {
            log.error("Error during refreshing of books nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Books nomenclatures received successfully!");
            }
            bookNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<ActDto> refreshActs(String bookId) {
        return nomenclaturePrWebClient.getActs(bookId).doOnNext(act -> {
            if(log.isTraceEnabled()) {
                log.trace("New Act item received: " + act.getId() + ", " + act.getName());
            }

            Set<ActDto> actDtos = actNomenclatureCache.get(bookId);
            if(actDtos == null) {
                actDtos = new HashSet<>();
                actNomenclatureCache.put(bookId, actDtos);
            }
            actDtos.add(act);
        }).doOnError(error -> {
            log.error("Error during refreshing of acts for books nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            actNomenclatureCache.calculateCacheHash();
            if(log.isDebugEnabled()) {
                log.debug("Acts nomenclatures received successfully for book: " + bookId);
            }
        });
    }

    private Flux<RegistryOfficeDto> refreshRegistryOffices() {
        //Adds in cache only registry offices, skip item with id 10000800000000015192 because it is not registry office.
        //Item with this id is Registration Agency
        //It is impossible to be removed from source so we filter it before add to cache
        return nomenclaturePrWebClient.getRegistryOffices()
            .filter(ro -> !ro.getId().equals(REGISTRATION_AGENCY_ID))
            .doOnNext(registryOffice -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Registry Office item received: " + registryOffice.getId() + ", " + registryOffice.getName());
                }

                registryOfficeNomenclatureCache.put(registryOffice.getId(), registryOffice);
        }).doOnError(error -> {
            log.error("Error during refreshing of registry offices nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Registry Office nomenclatures received successfully!");
            }
            registryOfficeNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<DocumentTypePrDto> refreshDocumentTypesPr() {
        return nomenclaturePrWebClient.getDocumentTypes().doOnNext(documentType -> {
            if(log.isTraceEnabled()) {
                log.trace("New Document Type from PR item received: " + documentType.getId() + ", " + documentType.getName());
            }

            documentTypeNomenclatureCache.put(documentType.getId(), documentType);
        }).doOnError(error -> {
            log.error("Error during refreshing of DocumentTypes nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Document Type from PR nomenclatures received successfully!");
            }
            documentTypeNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<PlaceNomenclaturePrDto> refreshPlaces() {
        return nomenclaturePrWebClient.getPlaces().doOnNext(place -> {
            if(log.isTraceEnabled()) {
                log.trace("New Place item received: " + place.getPlaceId() + ", " + place.getName());
            }

            placeNomenclatureCache.put(place.getPlaceId(), place);
        }).doOnError(error -> {
            log.error("Error during refreshing of Places nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Place nomenclatures received successfully!");
            }
            placeNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<ApplicationTypeReauNomDto> refreshApplicationTypesFromReau() {
        return nomenclatureReauWebClient.getApplicationTypes().doOnNext(applicationType -> {
            if(log.isTraceEnabled()) {
                log.trace("New Application Type item from REAU received: " + applicationType.getAppType() + ", " + applicationType.getName());
            }

            List<ServicePriceDto> prices = applicationType.getPrices();
            for (ServicePriceDto servicePrice : prices) {
                if(servicePrice.getPrServiceTypeID() != null) {
                    servicePrice.setEpzeuServiceTypeID(ServiceTypeNom.fromPrId(servicePrice.getPrServiceTypeID()).getEpzeuId());
                }
            }
            applicationTypeNomenclatureCache.put(applicationType.getAppType(), applicationType);
        }).doOnError(error -> {
            log.error("Error during refreshing of ApplicationTypes nomenclatures from REAU: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Application Type nomenclatures from REAU received successfully!");
            }

            applicationTypeNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<ApplicationStatusNomDto> refreshApplicationStatus() {
        return nomenclatureReauWebClient.getApplicationStatuses().doOnNext(applicationStatus -> {
            if(log.isTraceEnabled()) {
                log.trace("New Application Status item received: " + applicationStatus.getId() + ", " + applicationStatus.getName());
            }
            applicationStatusNomenclatureCache.put(applicationStatus.getId(), applicationStatus);
        }).doOnError(error -> {
            log.error("Error during refreshing of ApplicationStatus nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Application Status nomenclatures received successfully!");
            }
        });
    }

    private Flux<EkatteDto> refreshEkatteNomenclature() {
        return Flux.merge(refreshEkatteSettlements(), refreshEkatteAreas(), refreshEkatteMunicipalities(), refreshEkatteDistricts());
    }

    private Flux<EkatteDto> refreshEkatteSettlements() {
        String lastUpdatedDate = ekatteSettlementNomenclatureCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getEkatteSettlements(lastUpdatedDate).flatMap(clientResponse -> {
            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
            if (etagList != null && !etagList.isEmpty()) {
                ekatteSettlementNomenclatureCache.setLastUpdatedDate(etagList.get(0));
            }

            return clientResponse.bodyToFlux(EkatteDto.class);
        }).doOnNext(ekatte -> {
            if(log.isTraceEnabled()) {
                log.trace("New Ekatte Settlement item received: " + ekatte.getId() + ", " + ekatte.getEkatteCode() + ", " + ekatte.getName());
            }
            ekatteSettlementNomenclatureCache.put(ekatte.getEkatteCode(), ekatte);
        }).doOnError(error -> {
            log.error("Error during refreshing of \n nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(ekatteSettlementNomenclatureCache.getLastUpdatedDate() != null && !ekatteSettlementNomenclatureCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                ekatteSettlementNomenclatureCache.calculateCacheHash();
            }

            if(log.isDebugEnabled()) {
                log.debug("Ekatte Settlements nomenclatures received successfully!");
            }
        });
    }

    private Flux<AreaDto> refreshEkatteAreas() {
        String lastUpdatedDate = ekatteAreaNomenclatureCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getEkatteAreas(lastUpdatedDate).flatMap(clientResponse -> {
            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
            if (etagList != null && !etagList.isEmpty()) {
                ekatteAreaNomenclatureCache.setLastUpdatedDate(etagList.get(0));
            }

            return clientResponse.bodyToFlux(AreaDto.class);
        }).doOnNext(ekatte -> {
            if(log.isTraceEnabled()) {
                log.trace("New Ekatte Area item received: " + ekatte.getId() + ", " + ekatte.getEkatteCode() + ", " + ekatte.getName());
            }
            ekatteAreaNomenclatureCache.put(ekatte.getId(), ekatte);
        }).doOnError(error -> {
            log.error("Error during refreshing of EkatteAreas nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(ekatteAreaNomenclatureCache.getLastUpdatedDate() != null && !ekatteAreaNomenclatureCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                ekatteAreaNomenclatureCache.calculateCacheHash();
            }

            if(log.isDebugEnabled()) {
                log.debug("Ekatte Areas nomenclatures received successfully!");
            }
        });
    }

    private Flux<EkatteDto> refreshEkatteMunicipalities() {
        String lastUpdatedDate = ekatteMunicipalityNomenclatureCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getEkatteMunicipalities(lastUpdatedDate).flatMap(clientResponse -> {
            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
            if (etagList != null && !etagList.isEmpty()) {
                ekatteMunicipalityNomenclatureCache.setLastUpdatedDate(etagList.get(0));
            }

            return clientResponse.bodyToFlux(EkatteDto.class);
        }).doOnNext(ekatte -> {
            if(log.isTraceEnabled()) {
                log.trace("New Ekatte Municipality item received: " + ekatte.getId() + ", " + ekatte.getEkatteCode() + ", " + ekatte.getName());
            }
            ekatteMunicipalityNomenclatureCache.put(ekatte.getId(), ekatte);
        }).doOnError(error -> {
            log.error("Error during refreshing of EkatteMunicipalities nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(ekatteMunicipalityNomenclatureCache.getLastUpdatedDate() != null && !ekatteMunicipalityNomenclatureCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                ekatteMunicipalityNomenclatureCache.calculateCacheHash();
            }

            if(log.isDebugEnabled()) {
                log.debug("Ekatte Municipality nomenclatures received successfully!");
            }
        });
    }

//    private Mono<List<EkatteDto>> refreshEkatteDistricts() {
//        return nomenclatureEpzeuWebClient.getEkatteDistricts(ekatteDistrictNomenclatureCache.getLastUpdatedDate()).flatMap(clientResponse -> {
//            log.info("Ekatte Districts nomenclatures flatmap!");
//            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
//            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
//            if (etagList != null && !etagList.isEmpty()) {
//                ekatteDistrictNomenclatureCache.setLastUpdatedDate(etagList.get(0));
//            }
//
//            return clientResponse.bodyToFlux(EkatteDto.class).collect(Collectors.toList());
//        }).doOnError(error -> {
//            log.error("Error during refreshing of EkatteDistricts nomenclatures: " + error.getMessage());
//        }).doOnSuccess(ekatteList -> {
//            ekatteList.stream().forEach(ekatte -> ekatteDistrictNomenclatureCache.put(ekatte.getId(), ekatte));
//
//            log.info("Ekatte Districts nomenclatures received successfully!");
//            if(log.isDebugEnabled()) {
//                log.debug("Ekatte Districts nomenclatures received successfully!");
//            }
//        });
//    }

    private Flux<EkatteDto> refreshEkatteDistricts() {
        String lastUpdatedDate = ekatteDistrictNomenclatureCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getEkatteDistricts(lastUpdatedDate)
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if (etagList != null && !etagList.isEmpty()) {
                    ekatteDistrictNomenclatureCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(EkatteDto.class);
            }).doOnNext(ekatte -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Ekatte District item received: " + ekatte.getId() + ", " + ekatte.getEkatteCode() + ", " + ekatte.getName());
                }
                ekatteDistrictNomenclatureCache.put(ekatte.getId(), ekatte);
            }).doOnError(error -> {
                log.error("Error during refreshing of EkatteDistricts nomenclatures: " + error.getMessage());
            }).doOnComplete(() -> {
                if(ekatteDistrictNomenclatureCache.getLastUpdatedDate() != null
                        && !ekatteDistrictNomenclatureCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                    ekatteDistrictNomenclatureCache.calculateCacheHash();
                }

                if(log.isDebugEnabled()) {
                    log.debug("Ekatte Districts nomenclatures received successfully!");
                }
            });
    }

//    private Mono<List<EkatteDto>> refreshEkatteDistricts() {
//        return nomenclatureEpzeuWebClient.getEkatteDistricts(ekatteDistrictNomenclatureCache.getLastUpdatedDate()).flatMap(clientResponse -> {
//            log.info("Ekatte Districts nomenclatures flatmap!");
//            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
//            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
//            if (etagList != null && !etagList.isEmpty()) {
//                ekatteDistrictNomenclatureCache.setLastUpdatedDate(etagList.get(0));
//            }
//
//            Flux<EkatteDto> ekatteDtoFlux = clientResponse.bodyToFlux(EkatteDto.class);
//            ekatteDtoFlux.doOnNext(ekatte -> {
//                ekatteDistrictNomenclatureCache.put(ekatte.getId(), ekatte);
//
//                log.info("Ekatte Districts nomenclatures received successfully!");
//                if(log.isDebugEnabled()) {
//                    log.debug("Ekatte Districts nomenclatures received successfully!");
//                }
//            });
//
//            return ekatteDtoFlux.collect(Collectors.toList());
//        }).doOnError(error -> {
//            log.error("Error during refreshing of EkatteDistricts nomenclatures: " + error.getMessage());
//        }).doOnSuccess(ekatteList -> {
////            ekatteList.stream().forEach(ekatte -> ekatteDistrictNomenclatureCache.put(ekatte.getId(), ekatte));
//
//            log.info("Ekatte Districts nomenclatures received successfully!");
//            if(log.isDebugEnabled()) {
//                log.debug("Ekatte Districts nomenclatures received successfully!");
//            }
//        });
//    }

    private Flux<DocumentTypeEpzeuDto> refreshDocumentTypesEpzeu() {
        String lastUpdatedDate = documentTypeEpzeuNomenclatureCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getDocumentTypes(lastUpdatedDate).flatMap(clientResponse -> {
            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
            if (etagList != null && !etagList.isEmpty()) {
                documentTypeEpzeuNomenclatureCache.setLastUpdatedDate(etagList.get(0));
            }

            return clientResponse.bodyToFlux(DocumentTypeEpzeuDto.class);
        }).doOnNext(documentType -> {
            if(log.isTraceEnabled()) {
                log.trace("New Document Type from EPZEU item received: " + documentType.getDocumentTypeID() + ", " + documentType.getName());
            }
            documentTypeEpzeuNomenclatureCache.put(documentType.getDocumentTypeID(), documentType);
        }).doOnError(error -> {
            log.error("Error during refreshing of DocumentTypesEpzeu nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(documentTypeEpzeuNomenclatureCache.getLastUpdatedDate() != null && !documentTypeEpzeuNomenclatureCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                documentTypeEpzeuNomenclatureCache.calculateCacheHash();
            }

            if(log.isDebugEnabled()) {
                log.debug("Document Type from EPZEU nomenclatures received successfully!");
            }
        });
    }

    private Flux<LanguageDto> refreshLanguages() {
        return nomenclatureEpzeuWebClient.getLanguages(languageNomenclatureCache.getLastUpdatedDate()).flatMap(clientResponse -> {
            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
            if(etagList != null && !etagList.isEmpty()) {
                languageNomenclatureCache.setLastUpdatedDate(etagList.get(0));
            }

            return clientResponse.bodyToFlux(LanguageDto.class);
        }).doOnNext(language -> {
            if(log.isTraceEnabled()) {
                log.trace("New Language item received: " + language.getLanguageID() + ", " + language.getCode() + ", " + language.getName());
            }
            languageNomenclatureCache.put(language.getCode(), language);
        }).doOnError(error -> {
            log.error("Error during refreshing of Languages nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("Language nomenclatures received successfully!");
            }
        });
    }

    private Mono<Map> refreshLabelsByLanguage(String language) {
        return nomenclatureEpzeuWebClient.getLabelsForLanguage(language, LABELS_PREFIXES_FOR_LOAD, labelNomenclatureCache.getModificationEtagForLanguage(language))
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    labelNomenclatureCache.putModificationEtagForLanguage(language, etagList.get(0));
                }

                return clientResponse.bodyToMono(Map.class);
            }).doOnNext(labelsMap -> {
                labelNomenclatureCache.put(language, labelsMap);
                if(log.isTraceEnabled()) {
                    log.trace("Labels nomenclatures received successfully for language: " + language);
                }
            }).doOnError(error -> {
                log.error("Error during refreshing of LabelsByLanguage nomenclatures: " + error.getMessage());
            }).doOnSuccess(response -> {
                if(log.isDebugEnabled()) {
                    log.debug("Labels nomenclatures received successfully for language!");
                }
            });
    }

    private Flux<Map> refreshLabels() {
        //label nomenclature for language are loaded in cache lazily by changing of language by user
        //Labels for languages which are already loaded will have modification etag
        //Refresh only labels which are already loaded
        Set<String> languages = labelNomenclatureCache.getModificationEtags().keySet();

        if(languages != null && !languages.isEmpty()) {
            return Flux.fromIterable(languages).flatMap(language -> refreshLabelsByLanguage(language));
        } else {
            return refreshLabelsByLanguage(ApplicationConstants.LANGUAGE_DEFAULT).flux();
        }
    }

    private Flux<AppParameter> refreshAppParameters() {
        return appParameterWebClient.getAllParameters(appParameterCache.getLastUpdatedDate()).flatMap(clientResponse -> {
            HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
            List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
            if(etagList != null && !etagList.isEmpty()) {
                appParameterCache.setLastUpdatedDate(etagList.get(0));
            }

            return clientResponse.bodyToFlux(AppParameter.class);
        });
    }

    private Flux<ApplicationTypeEpzeuNomDto> refreshApplicationTypesFromEpzeu() {
        return nomenclatureEpzeuWebClient.getApplicationTypes(ApplicationConstants.LANGUAGE_DEFAULT, applicationTypeEpzeuNomenclatureCache.getLastUpdatedDate())
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    applicationTypeEpzeuNomenclatureCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(ApplicationTypeEpzeuNomDto.class);
            }).doOnNext(appType -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Application Type from EPZEU item received: " + appType.getAppType() + ", " + appType.getName());
                }
                applicationTypeEpzeuNomenclatureCache.put(appType.getAppType(), appType);
            }).doOnError(error -> {
                log.error("Error during refreshing of Application Type nomenclatures from EPZEU: " + error.getMessage());
            }).doOnComplete(() -> {
                if(log.isDebugEnabled()) {
                    log.debug("Application Types nomenclatures from EPZEU received successfully!");
                }
            });
    }

    private Flux<CmsPageDto> refreshCmsPages() {
        return cmsWebClient.getPages(ApplicationConstants.LANGUAGE_DEFAULT, cmsPageCache.getLastUpdatedDate())
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    cmsPageCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(CmsPageDto.class);
            }).doOnNext(cmsPage -> {
                if(log.isTraceEnabled()) {
                    log.trace("New CMS Page item received: " + cmsPage.getPageId() + ", " + cmsPage.getTitle());
                }
                cmsPageCache.put(cmsPage.getPageId(), cmsPage);
            }).doOnError(error -> {
                log.error("Error during refreshing of CMS Pages: " + error.getMessage());
            }).doOnComplete(() -> {
                if(log.isDebugEnabled()) {
                    log.debug("CMS Pages received successfully!");
                }
            });
    }

    private Flux<ServiceNomDto> refreshServiceNomenclatures() {
        return nomenclatureEpzeuWebClient.getServices(ApplicationConstants.LANGUAGE_DEFAULT, cmsPageCache.getLastUpdatedDate())
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    serviceNomenclatureCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(ServiceNomDto.class);
            }).doOnNext(service -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Service nomenclature item received: " + service.getServiceId() + ", " + service.getName());
                }
                serviceNomenclatureCache.put(service.getServiceId(), service);
            }).doOnError(error -> {
                log.error("Error during refreshing of Service nomenclatures: " + error.getMessage());
            }).doOnComplete(() -> {
                if(log.isDebugEnabled()) {
                    log.debug("Service nomenclatures received successfully!");
                }
            });
    }

    private Flux<CountryDto> refreshCountries() {
        String lastUpdatedDate = countriesCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getCountries(lastUpdatedDate)
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    countriesCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(CountryDto.class);
            }).doOnNext(country -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Country item received: " + country.getCode() + ", " + country.getName());
                }
                if(country.getCode() != null) {
                    countriesCache.put(country.getCode(), country);
                }
            }).doOnError(error -> {
                log.error("Error during refreshing of Countries nomenclatures: " + error.getMessage());
            }).doOnComplete(() -> {
                if(countriesCache.getLastUpdatedDate() != null && !countriesCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                    countriesCache.calculateCacheHash();
                }

                if(log.isDebugEnabled()) {
                    log.debug("Country nomenclatures received successfully!");
                }
            });
    }

    private Flux<AuthorityNomDto> refreshAuthorities() {
        String lastUpdatedDate = authorityNomenclatureCache.getLastUpdatedDate();

        return nomenclatureEpzeuWebClient.getAuthorities(lastUpdatedDate)
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    authorityNomenclatureCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(AuthorityNomDto.class);
            }).doOnNext(authority -> {
                if(log.isTraceEnabled()) {
                    log.trace("New Authority item received: " + authority.getAuthorityID() + ", " + authority.getAuthorityName());
                }
                authorityNomenclatureCache.put(authority.getAuthorityID(), authority);
            }).doOnError(error -> {
                log.error("Error during refreshing of Authorities nomenclatures: " + error.getMessage());
            }).doOnComplete(() -> {
                if(authorityNomenclatureCache.getLastUpdatedDate() != null && !authorityNomenclatureCache.getLastUpdatedDate().equals(lastUpdatedDate)) {
                    authorityNomenclatureCache.calculateCacheHash();
                }

                if(log.isDebugEnabled()) {
                    log.debug("Authority nomenclatures received successfully!");
                }
            });
    }

    private Flux<SpecialAccessTypeDto> refreshSpecialAccessTypes() {
        return nomenclatureEpzeuWebClient.getSpecialAccessTypes(specialAccessTypeNomenclatureCache.getLastUpdatedDate())
            .flatMap(clientResponse -> {
                HttpHeaders httpHeaders = clientResponse.headers().asHttpHeaders();
                List<String> etagList = httpHeaders.get(ETAG_HEADER_KEY);
                if(etagList != null && !etagList.isEmpty()) {
                    specialAccessTypeNomenclatureCache.setLastUpdatedDate(etagList.get(0));
                }

                return clientResponse.bodyToFlux(SpecialAccessTypeDto.class);
            }).doOnNext(specialAccessType -> {
                if(log.isTraceEnabled()) {
                    log.trace("Special Access Type item received: " + specialAccessType.getUserTypeId() + ", " + specialAccessType.getName());
                }
                specialAccessTypeNomenclatureCache.put(specialAccessType.getUserTypeId(), specialAccessType);
            }).doOnError(error -> {
                log.error("Error during refreshing of SpecialAccessTypes nomenclatures: " + error.getMessage());
            }).doOnComplete(() -> {
                if(log.isDebugEnabled()) {
                    log.debug("Special Access Types nomenclatures received successfully!");
                }
            });
    }

    private Flux<PropertyTypeNomDto> refreshPropertyTypes() {
        return nomenclaturePrWebClient.getPropertyTypes().doOnNext(propertyType -> {
            if(log.isTraceEnabled()) {
                log.trace("New PropertyTypes item received: " + propertyType.getId() + ", " + propertyType.getName());
            }
            propertyTypeNomenclatureCache.put(propertyType.getId(), propertyType);
        }).doOnError(error -> {
            log.error("Error during refreshing of PropertyTypes nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("PropertyTypes nomenclatures received successfully!");
            }
            propertyTypeNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<ApplicantCategoryDto> refreshApplicantCategories() {
        return nomenclaturePrWebClient.getApplicantCategories().doOnNext(applicantCategory -> {
            if(log.isTraceEnabled()) {
                log.trace("New ApplicantCategory item received: " + applicantCategory.getId() + ", " + applicantCategory.getName());
            }
            applicantCategoryNomenclatureCache.put(applicantCategory.getId(), applicantCategory);
        }).doOnError(error -> {
            log.error("Error during refreshing of ApplicantCategories nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("ApplicantCategories nomenclatures received successfully!");
            }

            applicantCategoryNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<ApplicantCategoryDto> refreshApplicantCategoriesForUpcomingDeal() {
        return nomenclaturePrWebClient.getApplicantCategoriesForUpcomingDeal().doOnNext(applicantCategory -> {
            if(log.isTraceEnabled()) {
                log.trace("New ApplicantCategory item received: " + applicantCategory.getId() + ", " + applicantCategory.getName());
            }
            applicantCategoryForUpcomingDealNomenclatureCache.put(applicantCategory.getId(), applicantCategory);
        }).doOnError(error -> {
            log.error("Error during refreshing of ApplicantCategoriesForUpcomingDeal nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("ApplicantCategories for Upcoming Deal nomenclatures received successfully!");
            }

            applicantCategoryForUpcomingDealNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<RegisterTypeDto> refreshRegisterTypes() {
        return nomenclatureReauWebClient.getRegisterTypes().doOnNext(registerType -> {
            if(log.isTraceEnabled()) {
                log.trace("New RegisterTypes item received: " + registerType.getId() + ", " + registerType.getName());
            }
            registerTypeNomenclatureCache.put(registerType.getId(), registerType);
        }).doOnError(error -> {
            log.error("Error during refreshing of RegisterTypes nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("RegisterTypes nomenclatures received successfully!");
            }

            registerTypeNomenclatureCache.calculateCacheHash();
        });
    }

    private Flux<PermanentUsageDto> refreshPermanentUsages() {
        return nomenclaturePrWebClient.getPermanentUsages().doOnNext(permanentUsageDto -> {
            if(log.isTraceEnabled()) {
                log.trace("New PermanentUsage item received: " + permanentUsageDto.getId() + ", " + permanentUsageDto.getName());
            }
            permanentUsageNomenclatureCache.put(permanentUsageDto.getId(), permanentUsageDto);
        }).doOnError(error -> {
            log.error("Error during refreshing of PermanentUsages nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("PermanentUsage nomenclatures received successfully!");
            }

            permanentUsageNomenclatureCache.calculateCacheHash();
        });
    }

    public boolean checkAllPrCachesAreLoaded() {
        return Stream.of(this.bookNomenclatureCache, this.actNomenclatureCache, this.registryOfficeNomenclatureCache,
            this.documentTypeNomenclatureCache, this.placeNomenclatureCache, this.applicationTypeNomenclatureCache,
            this.propertyTypeNomenclatureCache, this.applicantCategoryNomenclatureCache,
            this.applicantCategoryForUpcomingDealNomenclatureCache,
            this.registerTypeNomenclatureCache, this.applicationStatusNomenclatureCache, this.permanentUsageNomenclatureCache)
            .allMatch(cache -> !cache.asMap().isEmpty());
    }

    /**
     * Refresh Property Register's caches async.
     * Items in these caches do not have expiration policy,
     * because if policy is set, expiration will be item by item and refresh is also be item by item. We have to refresh items in these caches
     * at the same time with one request to external system, not to call this system for each item.
     */
    public void refreshEternalPrCaches() {
        refreshBooksAndActsForBooks().subscribe();
        refreshRegistryOffices().subscribe();
        refreshDocumentTypesPr().subscribe();
        refreshPlaces().subscribe();
        refreshApplicationTypesFromReau().subscribe();
        refreshPropertyTypes().subscribe();
        refreshApplicantCategories().subscribe();
        refreshApplicantCategoriesForUpcomingDeal().subscribe();
        refreshRegisterTypes().subscribe();
        refreshApplicationStatus().subscribe();
        refreshPermanentUsages().subscribe();
    }

    /**
     * Refresh EPZEU's caches async.
     * Items in these caches do not have expiration policy,
     * because if policy is set, expiration will be item by item and refresh is also be item by item. We have to refresh items in these caches
     * at the same time with one request to external system, not to call this system for each item.
     */
    public void refreshEternalEpzeuCaches() {
        refreshAppParameters().doOnNext(appParameter -> {
            if(log.isTraceEnabled()) {
                log.trace("New app parameter received: " + appParameter.getCode());
            }
            appParameterCache.put(appParameter.getCode(), appParameter);
        }).doOnError(error -> {
            log.error("Error during refreshing of AppParameters nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("App parameters received successfully!");
            }
        }).subscribe();

        refreshLanguages().subscribe();
        refreshLabels().subscribe();
        refreshCountries().subscribe();
        refreshEkatteNomenclature().subscribe();
        refreshDocumentTypesEpzeu().subscribe();
        refreshAuthorities().subscribe();
        refreshSpecialAccessTypes().subscribe();
        refreshCmsPages().subscribe();
        refreshApplicationTypesFromEpzeu().subscribe();
        refreshServiceNomenclatures().subscribe();
    }

    /**
     * Refresh all caches async.
     * All nomenclatures in caches depends on App Parameters they have to be refreshed only after App Parameters are obtain successfully.
     * First App Parameter cache is refreshed and when it is completed successfully other caches are refreshed.
     */
    public void refreshAllEternalCaches() {
        //All nomenclatures depends on App Parameters they have to be refreshed only after App Parameters are obtain successfully
        refreshAppParameters().doOnNext(appParameter -> {
            if(log.isTraceEnabled()) {
                log.trace("New app parameter received: " + appParameter.getCode());
            }
            appParameterCache.put(appParameter.getCode(), appParameter);
        }).doOnError(error -> {
            log.error("Error during refreshing of all nomenclatures: " + error.getMessage());
        }).doOnComplete(() -> {
            if(log.isDebugEnabled()) {
                log.debug("App parameters received successfully!");
            }

            refreshLanguages().subscribe();
            refreshCountries().subscribe();
            refreshRegistryOffices().subscribe();
            refreshPlaces().subscribe();
            refreshApplicationTypesFromReau().subscribe();
            refreshPropertyTypes().subscribe();
            refreshApplicantCategories().subscribe();
            refreshApplicantCategoriesForUpcomingDeal().subscribe();
            refreshRegisterTypes().subscribe();
            refreshApplicationStatus().subscribe();
            refreshBooksAndActsForBooks().subscribe();
            refreshDocumentTypesPr().subscribe();
            refreshPermanentUsages().subscribe();
            refreshLabels().subscribe();
            refreshEkatteNomenclature().subscribe();
            refreshDocumentTypesEpzeu().subscribe();
            refreshAuthorities().subscribe();
            refreshSpecialAccessTypes().subscribe();
            refreshCmsPages().subscribe();
            refreshApplicationTypesFromEpzeu().subscribe();
            refreshServiceNomenclatures().subscribe();
        }).subscribe();
    }

    public void initEternalLabelsCacheForLanguage(String language) {
        String modificationEtag = labelNomenclatureCache.getModificationEtagForLanguage(language);
        if(modificationEtag == null) {
            refreshLabelsByLanguage(language).subscribe();
        }
    }
}
