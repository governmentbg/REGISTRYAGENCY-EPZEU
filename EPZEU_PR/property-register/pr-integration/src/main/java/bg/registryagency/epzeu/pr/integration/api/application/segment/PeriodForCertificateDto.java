package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.PeriodForReportDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Контейнер на данни за период, за който да бъде предоставени данни в заявление.
 */
@Getter
@Setter
@Schema(name = "PeriodForCertificateDto", description = "Контейнер на данни за период, за който да бъде предоставени данни в заявление.")
public class PeriodForCertificateDto {

    /** Период на справката. */
    @Schema(name = "periodForReport", description = "Период на справката.")
    private PeriodForReportDto periodForReport;

    /** Очаквана дата на регистрация. */
    @Schema(name = "expectedRegistrationDate", description = "Очаквана дата на регистрация.")
    private LocalDate expectedRegistrationDate;

    public PeriodForCertificateDto() {
        this(true);
    }

    public PeriodForCertificateDto(boolean createAll) {
        if(createAll) {
            this.periodForReport = new PeriodForReportDto();
        }
    }
}
