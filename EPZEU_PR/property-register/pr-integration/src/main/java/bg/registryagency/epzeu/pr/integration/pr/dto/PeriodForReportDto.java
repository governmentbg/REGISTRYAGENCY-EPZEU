package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Контейнер на данни за период на справка.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PeriodForReportDto", description = "Контейнер на данни за период на справка.")
public class PeriodForReportDto {

    /** Начална дата за справка. */
    @Schema(name = "startDate", description = "Начална дата за справка.")
    private LocalDate startDate;

    /** Крайна дата за справка. */
    @Schema(name = "endDate", description = "Крайна дата за справка.")
    private LocalDate endDate;

    public PeriodForReportDto(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
