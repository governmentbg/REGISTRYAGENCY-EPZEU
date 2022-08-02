package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.AccountPropertyOfReportDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PropertyOfReportDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Контейнер на данни за партида, обект на справка.
 */
@Getter
@NoArgsConstructor
@Setter
@Schema(name = "RequestForReportOfAccountPropertyDto", description = "Контейнер на данни за партида, обект на справка.")
public class RequestForReportOfAccountPropertyDto {

    /** Партида, обект на справката. */
    @Schema(name = "accountPropertyOfReport", description = "Партида, обект на справката.")
    private AccountPropertyOfReportDto accountPropertyOfReport;

    /** Дължима такса. */
    @Schema(name = "cost", description = "Дължима такса.")
    private BigDecimal cost;

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;
}
