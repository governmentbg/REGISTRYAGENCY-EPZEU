package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.application.validator.ApplicationError;
import bg.registryagency.epzeu.pr.integration.api.LegalEntityIntegration;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.cr.service.LegalEntityService;
import bg.registryagency.epzeu.pr.integration.epzeu.client.UserWebClient;
import bg.registryagency.epzeu.pr.integration.exception.IntegrationException;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletResponse;

/**
 * Контролер реализиращ операции с юридически лица.
 */
@Tag(name = "LegalEntityController", description = "Контролер реализиращ операции с юридически лица.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/LegalEntity")
@RequiredArgsConstructor
@Validated
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class LegalEntityController {

    private final LegalEntityService legalEntityService;
    private final UserWebClient userWebClient;
    private final LabelMessageSource labelMessageSource;

    /**
     * Операция за изтегляне на информация за юридическо лице.
     * @param legalEntityNumber Идентификатор на юридическо лице.
     * @param response
     * @return Юридическо лице.
     */
    @Operation(summary = "Операция за изтегляне на информация за юридическо лице.")
    @GetMapping("/{legalEntityNumber}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Юридическо лице или грешка в случай, че има проблем при вземането на юридическо лице.",
            content = @Content(schema = @Schema(implementation = Object.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<Object> getLegalEntity(@Parameter(description = "Идентификатор на юридическо лице.") @PathVariable final String legalEntityNumber, HttpServletResponse response) {
        return legalEntityService.getLegalEntity(legalEntityNumber).onErrorResume( e -> {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            if(e instanceof IntegrationException) {
                return Mono.just(new ApplicationError(((IntegrationException) e).getCode(), e.getMessage()));
            }

            return Mono.just(new ApplicationError("GL_ERROR_L", labelMessageSource.getMessage("GL_ERROR_L")));
        });
    }


    /**
     * Операция по изтегляне на идентификатор на юридическо лице.
     * @return Юридическо лице.
     */
    @Operation(summary = "Операция по изтегляне на идентификатор на юридическо лице.")
    @GetMapping
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Юридическо лице.",
            content = @Content(schema = @Schema(implementation = LegalEntityIntegration.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<LegalEntityIntegration> getLegalEntityNumber() {
        return userWebClient.getLoginSessionInformationWithOrganization().flatMap(loginSessionDto -> {
            String organizationIdentifier = null;
            if (loginSessionDto.getCertificateInfo() != null) {
               organizationIdentifier = loginSessionDto.getCertificateInfo().getOrganizationIdentifier();
            }

            return Mono.just(new LegalEntityIntegration(null, organizationIdentifier));
        });
    }
}
