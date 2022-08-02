package bg.registryagency.epzeu.pr.integration.pr.client.impl;

import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentTypePrDto;
import bg.registryagency.epzeu.pr.integration.cache.AppParameterCache;
import bg.registryagency.epzeu.pr.integration.conf.IntegrationConfiguration;
import bg.registryagency.epzeu.pr.integration.epzeu.AppParameterKey;
import bg.registryagency.epzeu.pr.integration.pr.client.BasePropertyRegisterPublicWebClient;
import bg.registryagency.epzeu.pr.integration.pr.client.NomenclaturePrWebClient;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Component
public class NomenclaturePrWebClientImpl extends BasePropertyRegisterPublicWebClient implements NomenclaturePrWebClient {

    public NomenclaturePrWebClientImpl(WebClient propertyRegisterPublicNativeWebClient, AppParameterCache appParameterCache) {
        super(propertyRegisterPublicNativeWebClient, appParameterCache);
    }

    @Override
    public Flux<BookDto> getBooks() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetBooks")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(BookDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ActDto> getActs(String bookId) {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri(uriBuilder -> uriBuilder.path("/CodedList/GetActsByBook")
                .queryParam("bookTypeId", bookId)
                .build())
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ActDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<RegistryOfficeDto> getRegistryOffices() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetRegistryOffices")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(RegistryOfficeDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<DocumentTypePrDto> getDocumentTypes() {
        return getPropertyRegisterPublicNativeWebClient().get()
                .uri("/CodedList/GetDocumentTypes")
                .accept(MediaType.APPLICATION_JSON)
                .acceptCharset(StandardCharsets.UTF_8)
                .retrieve().bodyToFlux(DocumentTypePrDto.class)
                .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                    .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                    .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<PlaceNomenclaturePrDto> getPlaces() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/Places/GetPlaces")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(PlaceNomenclaturePrDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<PropertyTypeNomDto> getPropertyTypes() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetPropertyTypes")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(PropertyTypeNomDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ApplicantCategoryDto> getApplicantCategories() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetCopyRoles")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ApplicantCategoryDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<ApplicantCategoryDto> getApplicantCategoriesForUpcomingDeal() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetUpcomingDealRoles")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(ApplicantCategoryDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<RegisterTypeDto> getRegisterTypes() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetRegisterTypes")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(RegisterTypeDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }

    @Override
    public Flux<PermanentUsageDto> getPermanentUsages() {
        return getPropertyRegisterPublicNativeWebClient().get()
            .uri("/CodedList/GetPermanentUsage")
            .accept(MediaType.APPLICATION_JSON)
            .acceptCharset(StandardCharsets.UTF_8)
            .retrieve().bodyToFlux(PermanentUsageDto.class)
            .retryWhen(IntegrationConfiguration.RETRY_ON_SPECIFIC_EXCEPTIONS
                .fixedBackoff(Duration.ofSeconds(super.appParameterCache.get(AppParameterKey.GL_API_RETRY_INTERVAL).getSecondsFromInterval()))
                .retryMax(super.appParameterCache.get(AppParameterKey.GL_API_TRY_COUNT).getValueInt()));
    }
}
