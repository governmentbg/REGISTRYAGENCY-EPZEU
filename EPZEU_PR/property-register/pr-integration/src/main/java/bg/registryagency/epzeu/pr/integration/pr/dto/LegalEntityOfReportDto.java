package bg.registryagency.epzeu.pr.integration.pr.dto;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за юридическо лице от справка чрез отдалечен достъп.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LegalEntityOfReportDto", description = "Контейнер на данни за юридическо лице от справка чрез отдалечен достъп.")
public class LegalEntityOfReportDto {

    /** Идентификатор на юридическо лице. */
    @Schema(name = "legalEntityNumber", description = "Идентификатор на юридическо лице.")
    private String legalEntityNumber;

    /** Име на фирма. */
    @Schema(name = "companyName", description = "Име на фирма.")
    private String companyName;

    /** Фирмено дело. */
    @Schema(name = "companyCase", description = "Фирмено дело.")
    private CompanyCaseDto companyCase;

    /** Държава */
    @Schema(name = "country", description = "Държава")
    private CountryDto country;
}
