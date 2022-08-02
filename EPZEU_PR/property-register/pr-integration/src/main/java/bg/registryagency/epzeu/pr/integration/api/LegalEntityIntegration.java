package bg.registryagency.epzeu.pr.integration.api;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за юридическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LegalEntityIntegration", description = "Контейнер на данни за юридическо лице.")
public class LegalEntityIntegration {

    /** Име на фирма. */
    @Schema(name = "companyName", description = "Име на фирма.")
    private String companyName;

    /** Идентификатор на юридическо лиця. */
    @Schema(name = "legalEntityNumber", description = "Идентификатор на юридическо лиця.")
    private String legalEntityNumber;

    public LegalEntityIntegration(String companyName, String legalEntityNumber) {
        this.companyName = companyName;
        this.legalEntityNumber = legalEntityNumber;
    }
}
