package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.domain.model.User;
import bg.registryagency.epzeu.pr.domain.service.ApplicationDocumentService;
import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.conf.UrlConstants;
import bg.registryagency.epzeu.pr.integration.exception.IntegrationException;
import bg.registryagency.epzeu.pr.integration.i18n.LabelMessageSource;
import bg.registryagency.epzeu.pr.integration.ratelimit.RateLimitService;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyExtractors;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

/**
 * Контролер реализиращ функционалност за изтегляне на документ.
 */
@Tag(name = "DocumentController", description = "Контролер реализиращ функционалност за изтегляне на документ.")
@SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + UrlConstants.DOCUMENT_URL)
@RequiredArgsConstructor
@Validated
@Slf4j
public class DocumentController {
    private static final RateLimitServiceCode[] RATE_LIMIT_SERVICE_CODES = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT, RateLimitServiceCode.PR_DOWNLOAD_DOCUMENT_LIMIT};

    private final ApplicationDocumentService applicationDocumentService;
    private final RateLimitService rateLimitService;

    private final LabelMessageSource labelMessageSource;

    /**
     * Операция по изтегляне на документ.
     * @param documentId Идентификатор на документ.
     * @param servletResponse
     * @return Съдържание на документ или текст описващ проблем свързан с изтеглянето на документ.
     */
    @Operation(summary = "Операция по изтегляне на документ")
    @GetMapping("/{documentId}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Съдържание на документ или текст описващ проблем свързан с изтеглянето на документ.",
            content = @Content(schema = @Schema(implementation = Object.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<Object> download(@Parameter(description = "идентификатор на документ") @PathVariable String documentId,
                                 @Parameter(description = "") HttpServletRequest servletRequest,
                                 @Parameter(description = "") HttpServletResponse servletResponse) throws IOException {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(rateLimitService.isReachedLimit(user != null ? user.getCin() : null, servletRequest.getRemoteAddr(), RATE_LIMIT_SERVICE_CODES)) {
            String language = LocaleContextHolder.getLocale().getLanguage();
            servletResponse.sendRedirect(servletRequest.getContextPath() + "/" + language + "/DocumentLimit");

            return Mono.empty();
        }

        Locale locale = LocaleContextHolder.getLocale();

        return applicationDocumentService.download(documentId).flatMap(response -> {
            HttpHeaders httpHeaders = response.headers().asHttpHeaders();

            if(response.statusCode().equals(HttpStatus.OK)) {
                try {
                    servletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, httpHeaders.getContentDisposition().toString());
                    return DataBufferUtils.write(response.body(BodyExtractors.toDataBuffers()), servletResponse.getOutputStream())
                        .doOnNext(DataBufferUtils::release)
                        .then();
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                    return Mono.error(new IntegrationException("There is problem with output stream for downloading", e));
                }
            } else {
                log.error("Returned status from REAU during downloading of document is: " + response.statusCode().toString());

                String message = labelMessageSource.getMessage("PR_DOCUMENT_NOT_FOUND_E", null, locale != null ? locale : Locale.forLanguageTag("BG"));

                return Mono.just(message);
            }
        });
    }
}
