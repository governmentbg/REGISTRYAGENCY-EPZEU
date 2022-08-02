package bg.registryagency.epzeu.pr.integration.pr.dto;

import bg.registryagency.epzeu.pr.integration.epzeu.dto.CountryDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за физическо лице от справка чрез отдалечен достъп.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "IndividualOfReportDto", description = "Контейнер на данни за физическо лице от справка чрез отдалечен достъп.")
public class IndividualOfReportDto {

    /** Националност на лицето. */
    @Schema(name = "personNationality", description = "Националност на лицето.")
    private CountryDto personNationality;

    /** Идентификатор на физическо лице. */
    @Schema(name = "identity", description = "Идентификатор на физическо лице.")
    private String identity;

    /** Име на заявител. */
    @Schema(name = "applicantName", description = "Име на заявител.")
    private NameDto applicantName;
}
