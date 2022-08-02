package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.provider.ApplicationFormProvider;
import bg.registryagency.epzeu.pr.application.provider.ApplicationFormProviderFactory;
import bg.registryagency.epzeu.pr.integration.api.application.segment.AttachedDocumentDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.UrlConstants;
import bg.registryagency.epzeu.pr.integration.exception.IntegrationException;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.integration.reau.client.ApplicationWebClient;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResultInfo;
import bg.registryagency.epzeu.pr.integration.reau.service.ApplicationReauService;
import bg.registryagency.epzeu.pr.integration.reau.service.ReportService;
import bg.registryagency.epzeu.pr.web.api.config.OpenApiConfiguration;
import bg.registryagency.epzeu.pr.web.common.annotation.RateLimit;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.List;

/**
 * Контролер реализиращ уеб услуги за работа с регистрирани заявления.
 */
@Tag(name = "ApplicationInfoController", description = "Контролер реализиращ уеб услуги за работа с регистрирани заявления.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + UrlConstants.APPLICATIONS_URL)
@RequiredArgsConstructor
@Validated
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class ApplicationInfoController {
    private static final String APPLICATION_TYPE_HEADER = "ApplicationInfo-ApplicationType";

    private final ApplicationWebClient applicationWebClient;
    private final ApplicationFormProviderFactory applicationFormProviderFactory;

    private final ApplicationReauService applicationReauService;

    /**
     * Операция по вземане на съдържанието на регистрирано заявление.
     * @param applicationIdentifier Идентификатор на заявление.
     * @return Съдържание на заявлението.
     */
    @Operation(summary = "Операция по вземане на съдържанието на регистрирано заявление.")
    @GetMapping(value = "/{applicationIdentifier}/Form", produces = MediaType.APPLICATION_JSON_VALUE)
    @RateLimit(serviceCodes = {RateLimitServiceCode.PR_APPLICATION_PREVIEW_LIMIT})
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Регистрирано заявление.", content = @Content(schema = @Schema(implementation = String.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<String> getApplicationForm(@Parameter(description = "Идентификатор на заявление.") @PathVariable final String applicationIdentifier) {
        return applicationWebClient.getApplicationContent(applicationIdentifier).flatMap(response -> {
            List<String> header = response.headers().header(APPLICATION_TYPE_HEADER);

            return response.bodyToMono(InputStreamResource.class).flatMap(inputStreamResource -> {
                String applicationType = header.get(0);
                ApplicationFormProvider applicationFormProvider = applicationFormProviderFactory.getApplicationFormProvider(ApplicationType.fromInteger(Integer.parseInt(applicationType)));
                String appJson;
                try {
                    appJson = applicationFormProvider.serializeXmlApplicationAsJsonString(inputStreamResource.getInputStream());
                } catch (IOException e) {
                    return Mono.error(new IntegrationException("Cannot download application xml from REAU", e));
                }

                return Mono.just(appJson);
            });
        });
    }

    /**
     * Операция по вземан на информация за статус на регистрирано заявление.
     * @param incomingNumber Входящ номер.
     * @param specificStatusId Идентификатор указващ зареждането на данни за определен статус свързан със заявлението.
     *                         Ако не бъде подаден идентификатор на статус ще се върне последния статус за даденото заявление.
     * @return Данни на заявление.
     */
    @Operation(summary = "Операция по вземан на информация за статус на регистрирано заявление.")
    @GetMapping(value = UrlConstants.STATUS_TEXT_URL + "/{incomingNumber}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Данни на заявление.", content = @Content(schema = @Schema(implementation = ApplicationREAUDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<ApplicationREAUDto> getApplicationInfo(@Parameter(description = "Входящ номер.") @PathVariable final String incomingNumber,
                                                       @Parameter(description = "Идентификатор указващ зареждането на данни за определен статус свързан със заявлението.")
                                                       @RequestParam(value = "spid", required = false) final Long specificStatusId) {
        return applicationReauService.getApplication(incomingNumber, specificStatusId);
    }

    /**
     * Операция по вземане на история на статусите на заявление.
     * @param incomingNumber Входящ номер.
     * @return Списък със статуси, през които е преминало заявлението.
     */
    @Operation(summary = "Операция по вземане на история на статусите на заявление.")
    @GetMapping(value = UrlConstants.STATUS_HISTORY_URL + "/{incomingNumber}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък със статуси, през които е преминало заявлението.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApplicationStatusResultInfo.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<ApplicationStatusResultInfo> getStatusHistory(@Parameter(description = "Входящ номер.") @PathVariable final String incomingNumber) {
        return applicationReauService.getStatusHistory(incomingNumber);
    }
}
