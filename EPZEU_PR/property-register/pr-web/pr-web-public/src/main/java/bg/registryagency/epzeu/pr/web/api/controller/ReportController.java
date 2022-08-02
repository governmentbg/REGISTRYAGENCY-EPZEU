package bg.registryagency.epzeu.pr.web.api.controller;

import bg.registryagency.epzeu.pr.integration.conf.ApplicationConstants;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyDealResponseDto;
import bg.registryagency.epzeu.pr.integration.pr.service.PropertyDealService;
import bg.registryagency.epzeu.pr.integration.ratelimit.enums.RateLimitServiceCode;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationREAUDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationStatusResponse;
import bg.registryagency.epzeu.pr.integration.reau.service.ReportService;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


/**
 * Контролер реализиращ уеб услуги за управление на справки.
 */
@Tag(name = "ReportController", description = "Контролер реализиращ уеб услуги за управление на справки.")
@RestController
@RequestMapping(ApplicationConstants.BASE_API_PATH + "/Reports")
@RequiredArgsConstructor
@RateLimit(serviceCodes = {RateLimitServiceCode.BASE_DATA_SERVICE_LIMIT})
public class ReportController {
    private final ReportService reportService;
    private final PropertyDealService propertyDealService;

    /**
     * Операция за вземане на заявления в статус Без движение.
     * @return Списък със заявления в статус Без движение.
     */
    @Operation(summary = "Операция за вземане на заявления в статус Без движение.")
    @SecurityRequirement(name = OpenApiConfiguration.SECURITY_SCHEME_NAME)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Списък със заявления в статус Без движение.",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApplicationREAUDto.class)))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    @GetMapping("/applicationsWithoutMovement")
    public Flux<ApplicationREAUDto> getApplicationsWithoutMovement() {
        return reportService.getApplicationsAndCorrections();
    }

    /**
     * Операция за проверка на статус на заявление.
     * @param reauIncomingNumber Входящ номер от РЕАУ.
     * @param prIncomingNumber Входящ номер от Имотен регистър.
     * @param registerDate Дата на регистрация в Имотен регистър.
     * @param registerId Идентификатор на регистрация в Имотен регистър.
     * @param registryOfficeId Идентификатор на служба по вписвания.
     * @return Статус на заявление.
     */
    @Operation(summary = "Операция за проверка на статус на заявление.")
    @GetMapping("/ApplicationStatus")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Статус на заявление.",
            content = @Content(schema = @Schema(implementation = ApplicationStatusResponse.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    @RateLimit(serviceCodes = {RateLimitServiceCode.PR_REPORT_LIMIT})
    public Mono<ApplicationStatusResponse> getApplicationStatus(@Parameter(description = "Входящ номер от РЕАУ.") @RequestParam(required = false) String reauIncomingNumber,
                                                                @Parameter(description = "Входящ номер от Имотен регистър.") @RequestParam(required = false) String prIncomingNumber,
                                                                @Parameter(description = "Дата на регистрация в Имотен регистър.") @RequestParam(required = false) String registerDate,
                                                                @Parameter(description = "Идентификатор на регистрация в Имотен регистър.") @RequestParam(required = false) String registerId,
                                                                @Parameter(description = "Идентификатор на служба по вписвания.") @RequestParam(required = false) String registryOfficeId) {
        return reportService.getApplicationStatus(reauIncomingNumber, prIncomingNumber, registerDate, registerId, registryOfficeId);
    }

    /**
     * Калкулатор на държавни такси.
     * @param actId Номер на акт.
     * @param materialInterest Материален интерес.
     * @return Дължима такса.
     */
    @Operation(summary = "Калкулатор на държавни такси.")
    @GetMapping("/FeeCalculator")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Дължима такса.",
            content = @Content(schema = @Schema(implementation = Double.class))),
        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
    })
    public Mono<Double> calculateFee(@Parameter(description = "Номер на акт.") @RequestParam String actId,
                                     @Parameter(description = "Материален интерес.") @RequestParam double materialInterest) {
        return reportService.calculateFee(actId, materialInterest);
    }

//    /**
//     * Операция за извличане на всички сделки за имот по кадастрален идентификатор.
//     * @param cadastreNumber Кадастрален идентификатор.
//     * @return Всички сделки за имот.
//     */
//    @Operation(summary = "Операция за извличане на всички сделки за имот по кадастрален идентификатор.")
//    @GetMapping("/PropertyDeals")
//    @RateLimit(serviceCodes = {RateLimitServiceCode.PR_REPORT_LIMIT})
//    @ApiResponses(value = {
//        @ApiResponse(responseCode = "200", description = "Всички сделки за имот",
//            content = @Content(schema = @Schema(implementation = PropertyDealResponseDto.class))),
//        @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(schema = @Schema())),
//        @ApiResponse(responseCode = "429", description = "Too Many Requests", content = @Content(schema = @Schema())),
//        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content(schema = @Schema()))
//    })
//    public Mono<PropertyDealResponseDto> getPropertyDeals(@Parameter(description = "Кадастрален идентификатор.") @RequestParam String cadastreNumber) {
//        return propertyDealService.getPropertyDeals(cadastreNumber);
//    }
}
