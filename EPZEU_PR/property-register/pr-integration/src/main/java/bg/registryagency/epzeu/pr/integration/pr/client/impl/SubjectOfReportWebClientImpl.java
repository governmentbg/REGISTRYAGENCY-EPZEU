package bg.registryagency.epzeu.pr.integration.pr.client.impl;

import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.pr.client.BasePropertyRegisterPublicWebClient;
import bg.registryagency.epzeu.pr.integration.pr.client.SubjectOfReportWebClient;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.time.Duration;

@Component
public class SubjectOfReportWebClientImpl extends BasePropertyRegisterPublicWebClient implements SubjectOfReportWebClient {

    public SubjectOfReportWebClientImpl(WebClient propertyRegisterPublicNativeWebClient, AppParameterCache appParameterCache) {
        super(propertyRegisterPublicNativeWebClient, appParameterCache);
    }

    @Override
    public Flux<DocumentOfReportDto> getDocuments(DocumentSearchCriteria documentSearchCriteria) {
        return getPropertyRegisterPublicNativeWebClient().post()
            .uri("/Act/SearchAct")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(new DocumentSearchRequest(documentSearchCriteria))
            .retrieve().bodyToFlux(DocumentSearchResponse.class)
            .flatMap(documentSearchResponse -> Flux.just(documentSearchResponse.asDocumentOfReportDto()))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<PersonOfReportDto> getIndividualPersons(IndividualSearchCriteriaDto individualSearchCriteria) {
        return getPropertyRegisterPublicNativeWebClient().post()
            .uri("/PersonSearch/SearchCitizen")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(new IndividualSearchRequest(individualSearchCriteria))
            .retrieve().bodyToFlux(IndividualSearchResponse.class)
            .flatMap(individualSearchResponse -> Flux.just(individualSearchResponse.asPersonOfReport()))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<PersonOfReportDto> getLegalEntityPersons(LegalEntitySearchCriteriaDto legalEntitySearchCriteria) {
        return getPropertyRegisterPublicNativeWebClient().post()
            .uri("/PersonSearch/SearchLegalEntity")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(new LegalEntitySearchRequest(legalEntitySearchCriteria))
            .retrieve().bodyToFlux(LegalEntitySearchResponse.class)
            .flatMap(legalEntitySearchResponse -> Flux.just(legalEntitySearchResponse.asPersonOfReport()))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<PropertyOfReportDto> getProperties(PropertySearchCriteriaDto propertySearchCriteria) {
        return getPropertyRegisterPublicNativeWebClient().post()
            .uri("/PropertySearch/SearchProperty")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(new PropertySearchRequest(propertySearchCriteria))
            .retrieve().bodyToFlux(PropertySearchResponse.class)
            .flatMap(propertySearchResponse -> Flux.just(propertySearchResponse.asProperty()))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<AccountPropertyOfReportDto> getAccountProperties(AccountPropertySearchCriteriaDto searchCriteriaDto) {
        return getPropertyRegisterPublicNativeWebClient().post()
            .uri("/PropertySearch/SearchPropertyLot")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(new AccountPropertySearchRequest(searchCriteriaDto))
            .retrieve().bodyToFlux(AccountPropertySearchResponse.class)
            .flatMap(propertySearchResponse -> Flux.just(propertySearchResponse.asAccountProperty()))
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
