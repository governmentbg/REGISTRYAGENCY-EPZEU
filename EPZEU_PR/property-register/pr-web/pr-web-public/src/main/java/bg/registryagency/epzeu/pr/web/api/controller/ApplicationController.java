package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.mapper.ApplicationDtoMapper;
import bg.registryagency.epzeu.pr.domain.service.ApplicationService;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.api.domain.ApplicationDto;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.web.api.config.OpenApiConfiguration;
import bg.registryagency.epzeu.pr.web.common.annotation.RateLimit;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

/**
 * Контролер реализиращ уеб услуги за управление на чернови на заявления.
 */
@Tag(name = "ApplicationController", description = "Контролер реализиращ уеб услуги за управление на чернови на заявления.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/ApplicationProcesses/{applicationProcessId}/Applications")
@RequiredArgsConstructor
@Validated
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class ApplicationController {
    private final ApplicationService applicationService;

    /**
     * Операция за изчитане на чернова на заявление.
     * @param applicationProcessId идентификатор на процес по заявяване.
     * @param applicationId идентификатор на чернова на заявление.
     * @return Заявление.
     */
    @Operation(summary = "Операция за изчитане на чернова на заявление.")
    @GetMapping(value = "/{applicationId}")
    @ResponseStatus(code = HttpStatus.OK)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Заявление.", content = @Content(schema = @Schema(implementation = ApplicationDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public ApplicationDto getApplication(@Parameter(description = "Идентификатор на процес по заявяване.") @Positive @PathVariable final long applicationProcessId,
                                         @Parameter(description = "Идентификатор на заявление.") @Positive @PathVariable final long applicationId) {
        Application application = applicationService.search(SearchCriteria
            .ApplicationSearchCriteria.builder()
            .applicationProcessId(applicationProcessId).applicationIds(applicationId)
            .build()).single();

        return ApplicationDtoMapper.asDto(application);
    }

    /**
     * Операция за създаване на чернова на заявление.
     * @param applicationProcessId Идентификатор на процес по заявяване.
     * @param applicationDto Заявление, което да бъде създадено.
     * @return Създадено заявление с идентификатор на заявлението.
     */
    @Operation(summary = "Операция за създаване на заявление.")
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Създадено заявление с идентификатор на заявлението.", content = @Content(schema = @Schema(implementation = ApplicationDto.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema(implementation = ApplicationError.class))),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public ApplicationDto createApplication(@Parameter(description = "Идентификатор на процес по заявяване.") @Positive @PathVariable final long applicationProcessId,
                                            @Parameter(description = "Заявление, което да бъде създадено.") @RequestBody final ApplicationDto applicationDto) throws ApplicationDataException {
        Application application = applicationService.create(applicationProcessId, ApplicationType.fromInteger(applicationDto.getType()), applicationDto.getOrder(), applicationDto.getAdditionalData());

        return ApplicationDtoMapper.asDto(application);
    }

    /**
     * Операция за изтриване на чернова на заявление.
     * @param applicationId Идентификатор на заявление.
     */
    @Operation(summary = "Операция за изтриване на чернова на заявление.")
    @DeleteMapping("/{applicationId}")
    @ResponseStatus(code = HttpStatus.OK)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void deleteApplication(@Parameter(description = "Идентификатор на процес по заявяване.") @Positive @PathVariable final long applicationProcessId,
                                        @Parameter(description = "Идентификатор на заявление.") @Positive @PathVariable final long applicationId) {
        applicationService.delete(applicationId, true);
    }
}
