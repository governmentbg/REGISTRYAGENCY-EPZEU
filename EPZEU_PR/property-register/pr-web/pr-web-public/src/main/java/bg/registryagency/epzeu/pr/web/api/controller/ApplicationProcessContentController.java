package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.domain.service.ApplicationProcessContentService;
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
import java.nio.charset.StandardCharsets;

/**
 * Контролер реализиращ уеб услуги за управление на съдържание на чернова на заявление.
 */
@Tag(name = "ApplicationProcessContentController", description = "Контролер реализиращ уеб услуги за управление на съдържание на чернова на заявление.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/ApplicationProcesses/{applicationProcessId}/Applications/{applicationId}/Content")
@RequiredArgsConstructor
@Validated
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class ApplicationProcessContentController {
    private final ApplicationProcessContentService applicationProcessContentService;

    /**
     * Операция за обновяване на съдържание на чернова на заявление.
     * @param applicationId Идентификатор на заявление.
     * @param content Съдържание на заявление.
     */
    @Operation(summary = "Операция за обновяване на съдържание на чернова на заявление.")
    @PutMapping
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success"),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public void updateApplicationProcessContent(@Parameter(description = "Идентификатор на процес по заявяване.") @Positive @PathVariable final long applicationProcessId,
                                                      @Parameter(description = "Идентификатор на заявление.") @Positive @PathVariable final long applicationId,
                                                      @Parameter(description = "Съдържание на заявление.") @RequestBody final String content) {
        applicationProcessContentService.updateContent(applicationId, content.getBytes(StandardCharsets.UTF_8));
    }
}
