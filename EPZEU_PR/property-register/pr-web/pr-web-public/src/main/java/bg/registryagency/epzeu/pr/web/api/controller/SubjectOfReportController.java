package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.pr.dto.*;
import bg.registryagency.epzeu.pr.integration.pr.service.SubjectOfReportService;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.web.api.config.OpenApiConfiguration;
import bg.registryagency.epzeu.pr.web.common.annotation.RateLimit;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

/**
 * Контролер реализиращ уеб услуги за управление на обектите на справки чрез отдалечен достъп.
 */
@Tag(name = "SubjectOfReportController", description = "Контролер реализиращ уеб услуги за управление на обектите на справки чрез отдалечен достъп.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/SubjectOfReport")
@RequiredArgsConstructor
@Validated
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT, RateLimitServiceCode.PR_SEARCH_FOR_AN_OBJECT_LIMIT})
public class SubjectOfReportController {
    private final SubjectOfReportService subjectOfReportService;

    /**
     * Операция за вземане на документи обект на справка в имотен регистър.
     * @param documentSearchCriteria Критерии за търсене на документ.
     * @return Документи обект на справка.
     */
    @Operation(summary = "Операция за вземане на документи обект на справка в имотен регистър.")
    @GetMapping("/documents")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Документи обект на справка.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = DocumentOfReportDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<DocumentOfReportDto> getDocuments(@Parameter(description = "Критерии за търсене на документ.") final DocumentSearchCriteria documentSearchCriteria) {
       return subjectOfReportService.getDocuments(documentSearchCriteria);
    }

    /**
     * Операция за вземане на физически лица обект на справка в имотен регистър.
     * @param individualSearchCriteria Критерии за търсене на физическо лице.
     * @return Лица обект на справка.
     */
    @Operation(summary = "Операция за вземане на физически лица обект на справка в имотен регистър.")
    @GetMapping("/individualPersons")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Физически лица обект на справка.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = PersonOfReportDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<PersonOfReportDto> getIndividualPersons(@Parameter(description = "Критерии за търсене на физическо лице.") final IndividualSearchCriteriaDto individualSearchCriteria){
        return subjectOfReportService.getIndividualPersons(individualSearchCriteria);
    }

    /**
     * Операция за вземане на юридически лица обект на справка в имотен регистър.
     * @param legalEntitySearchCriteria Критерии за търсене на физическо лице.
     * @return Лица обект на справка.
     */
    @Operation(summary = "Операция за вземане на юридически лица обект на справка в имотен регистър.")
    @GetMapping("/legalEntityPersons")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Юридически лица обект на справка.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = PersonOfReportDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<PersonOfReportDto> getLegalEntityPersons(@Parameter(description = "Критерии за търсене на физическо лице.") final LegalEntitySearchCriteriaDto legalEntitySearchCriteria){
        return subjectOfReportService.getLegalEntityPersons(legalEntitySearchCriteria);
    }

    /**
     * Операция за вземане на имоти обект на справка в имотен регистър.
     * @param propertySearchCriteria Критерии за търсене на имот.
     * @return Имоти обект на справка.
     */
    @Operation(summary = "Операция за вземане на имоти обект на справка в имотен регистър.")
    @GetMapping("/properties")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Имоти обект на справка.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = PropertyOfReportDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<PropertyOfReportDto> getProperties(@Parameter(description = "Критерии за търсене на имот.") final PropertySearchCriteriaDto propertySearchCriteria){
        return subjectOfReportService.getProperties(propertySearchCriteria);
    }

    /**
     * Операция за вземане на имотни партиди обект на справка в имотен регистър.
     * @param propertySearchCriteria Критерии за търсене на имотни партиди.
     * @return Имотни партиди обект на справка.
     */
    @Operation(summary = "Операция за вземане на имотни партиди обект на справка в имотен регистър.")
    @GetMapping("/accountProperties")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Имотни партиди обект на справка.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = AccountPropertyOfReportDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Flux<AccountPropertyOfReportDto> getAccountProperties(@Parameter(description = "Критерии за търсене на имотни партиди.") final AccountPropertySearchCriteriaDto propertySearchCriteria){
        return subjectOfReportService.getAccountProperties(propertySearchCriteria);
    }
}
