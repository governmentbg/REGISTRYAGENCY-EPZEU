package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер за информация за GDPR споразумение.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "GdprAgreementDto", description = "Контейнер за информация за GDPR споразумение.")
public class GdprAgreementDto {

    /** Текст на споразумението. */
    @Schema(name = "gdprAgreementText", description = "Текст на споразумението.")
    private String gdprAgreementText;

    /** Флаг, индикиращ дали споразумението е прието. */
    @Schema(name = "gdprAgreementAcceptance", description = "Флаг, индикиращ дали споразумението е прието.")
    private Boolean gdprAgreementAcceptance;
}
