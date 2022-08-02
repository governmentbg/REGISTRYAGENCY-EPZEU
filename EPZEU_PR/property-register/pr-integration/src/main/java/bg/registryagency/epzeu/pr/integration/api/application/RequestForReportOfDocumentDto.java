package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.DocumentOfReportDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Контейнер на данни за документ, обект на справка.
 */
@Getter
@NoArgsConstructor
@Setter
@Schema(name = "RequestForReportOfDocumentDto", description = "Контейнер на данни за документ, обект на справка.")
public class RequestForReportOfDocumentDto {

    /** Документ, обект на справката. */
    @Schema(name = "document", description = "Документ, обект на справката.")
    private DocumentOfReportDto document;

    /** Дължима такса. */
    @Schema(name = "cost", description = "Дължима такса.")
    private BigDecimal cost;

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;
}
