package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PeriodForReportDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.PersonOfReportDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


/**
 * Контейнер на данни за лице, обект на справка.
 */
@Getter
@NoArgsConstructor
@Setter
@Schema(name = "RequestForReportOfPersonDto", description = "Контейнер на данни за лице, обект на справка.")
public class RequestForReportOfPersonDto {

    /** Лице, обект на справката. */
    @Schema(name = "personOfReport", description = "Лице, обект на справката.")
    private PersonOfReportDto personOfReport;

    /** Дължима такса. */
    @Schema(name = "cost", description = "Дължима такса.")
    private BigDecimal cost;

    /** Период на справката. */
    @Schema(name = "periodForReport", description = "Период на справката.")
    private PeriodForReportDto periodForReport;

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;
}
