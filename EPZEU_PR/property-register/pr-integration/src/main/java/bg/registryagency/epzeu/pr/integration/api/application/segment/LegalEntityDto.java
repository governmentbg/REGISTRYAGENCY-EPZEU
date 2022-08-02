package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import bg.registryagency.epzeu.pr.integration.pr.dto.CompanyCaseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за Юридическо лице.
 */
@Getter
@Setter
@Schema(name = "LegalEntityDto", description = "Контейнер на данни за Юридическо лице.")
public class LegalEntityDto {

    /** Идентификатор на чуждестранно Юридическо лице. */
    @Schema(name = "id", description = "Идентификатор на чуждестранно Юридическо лице.")
    private String id;

    /** Държава */
    @Schema(name = "country", description = "Държава")
    private CountryDto country;

    /** Идентификатор на Юридическо лице (ЕИК / БУЛСТАТ). */
    @Schema(name = "legalEntityNumber", description = "Идентификатор на Юридическо лице (ЕИК / БУЛСТАТ).")
    private String legalEntityNumber;

    /** Наименование на фирма с включена правна форма. */
    @Schema(name = "companyName", description = "Наименование на фирма с включена правна форма.")
    private String companyName;

    /** Фирмено дело. */
    @Schema(name = "companyCase", description = "Фирмено дело.")
    private CompanyCaseDto companyCase;

    public LegalEntityDto() {
        this(true);
    }

    public LegalEntityDto(boolean createAll) {
        if(createAll) {
            this.country = new CountryDto();
            this.companyCase = new CompanyCaseDto();
        }
    }
}
